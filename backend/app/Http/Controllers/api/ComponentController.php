<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\ComponentContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComponentController extends Controller
{
    // Frontend API - Component verilerini getir
    public function getByName(Request $request, string $name)
    {
        $locale = $request->get('locale', 'tr');

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

    // Admin API - Tüm componentleri listele
    public function index(Request $request)
    {
        $type = $request->get('type');
        $locale = $request->get('locale', 'tr');

        $query = Component::with(['contents' => function ($q) use ($locale) {
            $q->where('locale', $locale);
        }]);

        if ($type) {
            $query->byType($type);
        }

        $components = $query->get();

        return response()->json([
            'success' => true,
            'data' => $components
        ]);
    }

    // Admin API - Component oluştur
    public function store(Request $request)
    {
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

        $component = Component::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Component created successfully',
            'data' => $component
        ], 201);
    }

    // Admin API - Component güncelle
    public function update(Request $request, Component $component)
    {
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

        $component->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Component updated successfully',
            'data' => $component
        ]);
    }

    // Admin API - Component içeriğini güncelle
    public function updateContent(Request $request, Component $component)
    {
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

    // Admin API - Component sil
    public function destroy(Component $component)
    {
        $component->delete();

        return response()->json([
            'success' => true,
            'message' => 'Component deleted successfully'
        ]);
    }
}
