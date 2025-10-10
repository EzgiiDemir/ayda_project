<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Component;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getPage(Request $request, string $slug)
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

        $content = $page->contents->first();

        return response()->json([
            'success' => true,
            'data' => [
                'page' => [
                    'id' => $page->id,
                    'slug' => $page->slug,
                    'template' => $page->template,
                ],
                'content' => [
                    'id' => $content->id,
                    'title' => $content->title,
                    'subtitle' => $content->subtitle,
                    'hero_image' => $content->hero_image, // ← BUNU EKLE
                    'description' => $content->description,
                    'seo' => $content->seo,
                ],
                'components' => $page->components->map(function ($component) {
                    $componentContent = $component->contents->first();
                    return [
                        'id' => $component->id,
                        'name' => $component->name,
                        'type' => $component->type,
                        'order' => $component->pivot->order,
                        'data' => $componentContent?->data ?? []
                    ];
                })
            ]
        ]);
    }
    public function getComponent(Request $request, string $name)
    {
        $locale = $request->get('locale', 'en');

        $component = Component::where('name', $name)->first();

        if (!$component) {
            return response()->json([
                'success' => false,
                'message' => 'Component not found'
            ], 404);
        }

        $content = $component->content($locale);

        if (!$content) {
            return response()->json([
                'success' => false,
                'message' => 'Content not found for this locale'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $content->data
        ]);
    }
}
