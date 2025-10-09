<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class PageController extends Controller
{

    public function getBySlug(Request $request, string $slug)
    {
        $locale = $request->get('locale', 'tr');

        $page = Page::active()
            ->where('slug', $slug)
            ->with([
                'contents' => fn($q) => $q->where('locale', $locale),
                'components' => function ($q) use ($locale) {
                    $q->with(['contents' => fn($q2) => $q2->where('locale', $locale)->where('is_active', true)])
                        ->wherePivot('is_visible', true)
                        ->orderBy('page_components.order');
                }
            ])
            ->first();

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'page' => $page,
                'content' => $page->content($locale),
                'components' => $page->components->map(function ($component) {
                    return [
                        'id' => $component->id,
                        'name' => $component->name,
                        'type' => $component->type,
                        'order' => $component->pivot->order,
                        'settings' => $component->pivot->settings,
                        'data' => $component->contents->first()?->data ?? []
                    ];
                })
            ]
        ]);
    }

    // Admin API - Tüm sayfaları listele
    public function index(Request $request)
    {
        $locale = $request->get('locale');
        $template = $request->get('template');
        $status = $request->get('status'); // active, inactive, all

        $query = Page::with(['contents', 'components'])
            ->orderBy('order', 'asc');

        if ($locale) {
            $query->forLocale($locale);
        }

        if ($template) {
            $query->where('template', $template);
        }

        if ($status === 'active') {
            $query->active();
        } elseif ($status === 'inactive') {
            $query->where('is_active', false);
        }

        $pages = $query->get();

        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    // Admin API - Tekil sayfa detayı
    public function show(Page $page, Request $request)
    {
        $locale = $request->get('locale');

        $page->load([
            'contents' => fn($q) => $locale ? $q->where('locale', $locale) : $q,
            'components.contents' => fn($q) => $locale ? $q->where('locale', $locale) : $q
        ]);

        return response()->json([
            'success' => true,
            'data' => $page
        ]);
    }

    // Admin API - Yeni sayfa oluştur
    public function store(Request $request)
    {
        // Sadece adminler sayfa oluşturabilir
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can create pages'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|unique:pages,slug',
            'template' => 'required|string',
            'is_active' => 'boolean',
            'is_homepage' => 'boolean',
            'order' => 'integer',
            'meta' => 'nullable|array',
            'contents' => 'required|array',
            'contents.*.locale' => 'required|string|size:2',
            'contents.*.title' => 'required|string',
            'contents.*.subtitle' => 'nullable|string',
            'contents.*.description' => 'nullable|string',
            'contents.*.seo' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Eğer homepage seçiliyse, diğer homepage'leri kaldır
            if ($request->get('is_homepage')) {
                Page::where('is_homepage', true)->update(['is_homepage' => false]);
            }

            $page = Page::create([
                'slug' => $request->slug,
                'template' => $request->template,
                'is_active' => $request->get('is_active', true),
                'is_homepage' => $request->get('is_homepage', false),
                'order' => $request->get('order', 0),
                'meta' => $request->meta,
                'created_by' => auth()->id(),
            ]);

            // İçerikleri oluştur
            foreach ($request->contents as $content) {
                PageContent::create([
                    'page_id' => $page->id,
                    'locale' => $content['locale'],
                    'title' => $content['title'],
                    'subtitle' => $content['subtitle'] ?? null,
                    'description' => $content['description'] ?? null,
                    'seo' => $content['seo'] ?? null,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Page created successfully',
                'data' => $page->load('contents')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create page',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Admin API - Sayfa güncelle
    public function update(Request $request, Page $page)
    {
        // Herkes düzenleyebilir (editor, admin, super_admin)
        if (!auth()->user()->canEdit()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to edit pages'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'slug' => 'sometimes|string|unique:pages,slug,' . $page->id,
            'template' => 'sometimes|string',
            'is_active' => 'boolean',
            'is_homepage' => 'boolean',
            'order' => 'integer',
            'meta' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Homepage kontrolü
            if ($request->get('is_homepage') && !$page->is_homepage) {
                Page::where('is_homepage', true)->update(['is_homepage' => false]);
            }

            $page->update(array_merge(
                $request->only(['slug', 'template', 'is_active', 'is_homepage', 'order', 'meta']),
                ['updated_by' => auth()->id()]
            ));

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Page updated successfully',
                'data' => $page->fresh()
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update page',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Admin API - Sayfa içeriğini güncelle (çoklu dil)
    public function updateContent(Request $request, Page $page)
    {
        if (!auth()->user()->canEdit()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to edit content'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'seo' => 'nullable|array',
            'seo.title' => 'nullable|string',
            'seo.description' => 'nullable|string',
            'seo.keywords' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $content = PageContent::updateOrCreate(
            [
                'page_id' => $page->id,
                'locale' => $request->locale,
            ],
            $request->only(['title', 'subtitle', 'description', 'seo'])
        );

        return response()->json([
            'success' => true,
            'message' => 'Page content updated successfully',
            'data' => $content
        ]);
    }

    // Admin API - Sayfaya component ekle
    public function attachComponent(Request $request, Page $page)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can attach components'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'component_id' => 'required|exists:components,id',
            'order' => 'integer',
            'settings' => 'nullable|array',
            'is_visible' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $page->components()->attach($request->component_id, [
            'order' => $request->get('order', 0),
            'settings' => $request->get('settings'),
            'is_visible' => $request->get('is_visible', true),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Component attached successfully',
            'data' => $page->fresh('components')
        ]);
    }

    // Admin API - Component'i sayfadan çıkar
    public function detachComponent(Request $request, Page $page)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can detach components'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'component_id' => 'required|exists:components,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $page->components()->detach($request->component_id);

        return response()->json([
            'success' => true,
            'message' => 'Component detached successfully'
        ]);
    }

    // Admin API - Component sırasını güncelle
    public function updateComponentOrder(Request $request, Page $page)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can update component order'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'components' => 'required|array',
            'components.*.id' => 'required|exists:components,id',
            'components.*.order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            foreach ($request->components as $component) {
                $page->components()->updateExistingPivot($component['id'], [
                    'order' => $component['order']
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Component order updated successfully',
                'data' => $page->fresh('components')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Admin API - Sayfa sil
    public function destroy(Page $page)
    {
        // Sadece adminler sayfa silebilir
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can delete pages'
            ], 403);
        }

        // Homepage silinemez
        if ($page->is_homepage) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete homepage'
            ], 422);
        }

        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted successfully'
        ]);
    }

    // Admin API - Sayfayı klonla
    public function duplicate(Page $page)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can duplicate pages'
            ], 403);
        }

        DB::beginTransaction();
        try {
            // Yeni sayfa oluştur
            $newPage = $page->replicate();
            $newPage->slug = $page->slug . '-copy-' . time();
            $newPage->is_homepage = false;
            $newPage->is_active = false; // Kopyalanan sayfa inaktif başlar
            $newPage->created_by = auth()->id();
            $newPage->save();

            // İçerikleri kopyala
            foreach ($page->contents as $content) {
                $newContent = $content->replicate();
                $newContent->page_id = $newPage->id;
                $newContent->save();
            }

            // Component ilişkilerini kopyala
            foreach ($page->components as $component) {
                $newPage->components()->attach($component->id, [
                    'order' => $component->pivot->order,
                    'settings' => $component->pivot->settings,
                    'is_visible' => $component->pivot->is_visible,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Page duplicated successfully',
                'data' => $newPage->load(['contents', 'components'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to duplicate page',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
