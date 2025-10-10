<?php
// app/Http/Controllers/Api/MediaController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * GET /api/admin/media
     */
    public function index(Request $request)
    {
        $query = Media::query()->orderBy('created_at', 'desc');

        // Type filter
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Pagination
        $perPage = $request->get('per_page', 24);
        $media = $query->paginate($perPage);

        return response()->json($media);
    }

    /**
     * GET /api/admin/media/{id}
     */
    public function show(Media $media)
    {
        return response()->json([
            'success' => true,
            'data' => $media
        ]);
    }

    /**
     * POST /api/admin/media/upload
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp,mp4,webm,pdf|max:10240', // 10MB
        ]);

        try {
            $file = $request->file('file');

            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            // Store in public/uploads folder
            $path = $file->storeAs('uploads', $filename, 'public');

            // Get full URL
            $url = Storage::url($path);
            $fullUrl = url($url);

            // Determine type
            $mimeType = $file->getMimeType();
            if (str_starts_with($mimeType, 'image/')) {
                $type = 'image';
            } elseif (str_starts_with($mimeType, 'video/')) {
                $type = 'video';
            } else {
                $type = 'document';
            }

            // Format size
            $size = $file->getSize();
            $sizeFormatted = $this->formatBytes($size);

            // Save to database
            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'filename' => $filename,
                'path' => $path,
                'url' => $fullUrl,
                'mime_type' => $mimeType,
                'size' => $size,
                'size_formatted' => $sizeFormatted,
                'type' => $type,
                'collection' => $request->get('collection', 'general'),
                'uploaded_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => $media
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /api/admin/media/upload-multiple
     */
    public function uploadMultiple(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|mimes:jpeg,png,jpg,gif,webp,mp4,webm,pdf|max:10240',
        ]);

        try {
            $uploadedFiles = [];

            foreach ($request->file('files') as $file) {
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('uploads', $filename, 'public');
                $url = Storage::url($path);
                $mimeType = $file->getMimeType();

                if (str_starts_with($mimeType, 'image/')) {
                    $type = 'image';
                } elseif (str_starts_with($mimeType, 'video/')) {
                    $type = 'video';
                } else {
                    $type = 'document';
                }

                $size = $file->getSize();
                $sizeFormatted = $this->formatBytes($size);

                $media = Media::create([
                    'name' => $file->getClientOriginalName(),
                    'filename' => $filename,
                    'path' => $path,
                    'url' => url($url),
                    'mime_type' => $mimeType,
                    'size' => $size,
                    'size_formatted' => $sizeFormatted,
                    'type' => $type,
                    'collection' => $request->get('collection', 'general'),
                    'uploaded_by' => auth()->id(),
                ]);

                $uploadedFiles[] = $media;
            }

            return response()->json([
                'success' => true,
                'message' => 'Files uploaded successfully',
                'data' => $uploadedFiles
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload files',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE /api/admin/media/{id}
     */
    public function destroy(Media $media)
    {
        try {
            // Delete file from storage
            if (Storage::disk('public')->exists($media->path)) {
                Storage::disk('public')->delete($media->path);
            }

            // Delete from database
            $media->delete();

            return response()->json([
                'success' => true,
                'message' => 'Media deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete media',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /api/admin/media/delete-multiple
     */
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:media,id',
        ]);

        try {
            $media = Media::whereIn('id', $request->ids)->get();

            foreach ($media as $item) {
                if (Storage::disk('public')->exists($item->path)) {
                    Storage::disk('public')->delete($item->path);
                }
                $item->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'Media files deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete files',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Format bytes to human readable
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
