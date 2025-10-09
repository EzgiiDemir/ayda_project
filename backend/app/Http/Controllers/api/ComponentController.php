<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\ComponentContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ComponentController extends Controller
{
    // ==============================
    // Frontend API
    // ==============================
    public function getByName(Request $request, string $name)
    {
        $locale = $request->get('locale', 'tr');

        $component = Component::where('name', $name)
            ->with(['contents' => fn($q) => $q->where('locale', $locale)->where('is_active', true)])
            ->first();

        if (!$component) {
            return response()->json([
                'success' => false,
                'message' => 'Component not found'
            ], 404);
        }

        $content = $component->contents->first();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $component->id,
                'name' => $component->name,
                'type' => $component->type,
                'is_global' => $component->is_global,
                'schema' => $component->schema,
                'content' => $content ? $content->data : []
            ]
        ]);
    }

    // ==============================
    // Admin API
    // ==============================

    // Listeleme
    public function index(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $type = $request->get('type');
        $status = $request->get('status'); // active, inactive, all

        $query = Component::with(['contents' => fn($q) => $q->where('locale', $locale)]);

        if ($type) {
            $query->where('type', $type);
        }

        if ($status === 'active') {
            $query->whereHas('contents', fn($q) => $q->where('locale', $locale)->where('is_active', true));
        } elseif ($status === 'inactive') {
            $query->whereDoesntHave('contents', fn($q) => $q->where('locale', $locale)->where('is_active', true));
        }

        $components = $query->get();

        return response()->json([
            'success' => true,
            'data' => $components
        ]);
    }

    // Tekil detay
    public function show(Component $component, Request $request)
    {
        $locale = $request->get('locale');

        $component->load([
            'contents' => fn($q) => $locale ? $q->where('locale', $locale) : $q
        ]);

        return response()->json([
            'success' => true,
            'data' => $component
        ]);
    }

    // Oluştur
    public function store(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can create components'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:components,name',
            'type' => 'required|in:layout,section,widget',
            'description' => 'nullable|string',
            'is_global' => 'boolean',
            'schema' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $component = Component::create(array_merge(
            $request->only(['name', 'type', 'description', 'is_global', 'schema']),
            ['created_by' => auth()->id()]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Component created successfully',
            'data' => $component
        ], 201);
    }

    // Güncelle
    public function update(Request $request, Component $component)
    {
        if (!auth()->user()->canEdit()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to edit components'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|unique:components,name,' . $component->id,
            'type' => 'sometimes|in:layout,section,widget',
            'description' => 'nullable|string',
            'is_global' => 'boolean',
            'schema' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $component->update(array_merge(
            $request->only(['name', 'type', 'description', 'is_global', 'schema']),
            ['updated_by' => auth()->id()]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Component updated successfully',
            'data' => $component
        ]);
    }

    // İçerik güncelle
    public function updateContent(Request $request, Component $component)
    {
        if (!auth()->user()->canEdit()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to edit content'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'data' => 'required|array',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $content = ComponentContent::updateOrCreate(
            [
                'component_id' => $component->id,
                'locale' => $request->locale,
            ],
            [
                'data' => $request->data,
                'is_active' => $request->get('is_active', true),
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Component content updated successfully',
            'data' => $content
        ]);
    }

    // Sil
    public function destroy(Component $component)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can delete components'
            ], 403);
        }

        $component->delete();

        return response()->json([
            'success' => true,
            'message' => 'Component deleted successfully'
        ]);
    }

    // Klonla
    public function duplicate(Component $component)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can duplicate components'
            ], 403);
        }

        DB::beginTransaction();
        try {
            $newComponent = $component->replicate();
            $newComponent->name = $component->name . '-copy-' . time();
            $newComponent->is_active = false;
            $newComponent->created_by = auth()->id();
            $newComponent->save();

            foreach ($component->contents as $content) {
                $newContent = $content->replicate();
                $newContent->component_id = $newComponent->id;
                $newContent->save();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Component duplicated successfully',
                'data' => $newComponent->load('contents')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to duplicate component',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
