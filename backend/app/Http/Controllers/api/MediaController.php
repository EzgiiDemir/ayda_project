<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    // Media listele
    public function index(Request $request)
    {
        $collection = $request->get('collection');
        $type = $request->get('type'); // image, video, document
        $perPage = $request->get('per_page', 20);

        $query = Media::with('uploader')
            ->orderBy('created_at', 'desc');

        if ($collection) {
            $query->inCollection($collection);
        }

        if ($type === 'image') {
            $query->images();
        } elseif ($type === 'video') {
            $query->videos();
        } elseif ($type === 'document') {
            $query->documents();
        }

        $media = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $media
        ]);
    }

    // Tekil media detayı
    public function show(Media $media)
    {
        $media->load('uploader');

        return response()->json([
            'success' => true,
            'data' => $media
        ]);
    }

    // Dosya yükle
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|max:10240', // Max 10MB
            'collection' => 'nullable|string',
            'name' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $mimeType = $file->getMimeType();
            $size = $file->getSize();

            // Dosya adını oluştur (benzersiz)
            $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME))
                . '-' . time()
                . '.' . $extension;

            // Collection'a göre path belirle
            $collection = $request->get('collection', 'general');
            $path = $file->storeAs("media/{$collection}", $fileName, 'public');

            // Metadata oluştur (görsel ise boyutları al)
            $metadata = [];
            if (str_starts_with($mimeType, 'image/')) {
                $imageSize = getimagesize($file->getRealPath());
                $metadata = [
                    'width' => $imageSize[0] ?? null,
                    'height' => $imageSize[1] ?? null,
                ];
            }

            // Veritabanına kaydet
            $media = Media::create([
                'name' => $request->get('name', pathinfo($originalName, PATHINFO_FILENAME)),
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'path' => $path,
                'disk' => 'public',
                'size' => $size,
                'metadata' => $metadata,
                'collection' => $collection,
                'uploaded_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => $media
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Çoklu dosya yükle
    public function uploadMultiple(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'files' => 'required|array',
            'files.*' => 'file|max:10240',
            'collection' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $uploadedMedia = [];
        $errors = [];

        foreach ($request->file('files') as $index => $file) {
            try {
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $mimeType = $file->getMimeType();
                $size = $file->getSize();

                $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME))
                    . '-' . time() . '-' . $index
                    . '.' . $extension;

                $collection = $request->get('collection', 'general');
                $path = $file->storeAs("media/{$collection}", $fileName, 'public');

                $metadata = [];
                if (str_starts_with($mimeType, 'image/')) {
                    $imageSize = getimagesize($file->getRealPath());
                    $metadata = [
                        'width' => $imageSize[0] ?? null,
                        'height' => $imageSize[1] ?? null,
                    ];
                }

                $media = Media::create([
                    'name' => pathinfo($originalName, PATHINFO_FILENAME),
                    'file_name' => $fileName,
                    'mime_type' => $mimeType,
                    'path' => $path,
                    'disk' => 'public',
                    'size' => $size,
                    'metadata' => $metadata,
                    'collection' => $collection,
                    'uploaded_by' => auth()->id(),
                ]);

                $uploadedMedia[] = $media;

            } catch (\Exception $e) {
                $errors[] = [
                    'file' => $originalName ?? "file_{$index}",
                    'error' => $e->getMessage()
                ];
            }
        }

        return response()->json([
            'success' => count($errors) === 0,
            'message' => count($uploadedMedia) . ' files uploaded successfully',
            'data' => $uploadedMedia,
            'errors' => $errors
        ], count($errors) > 0 ? 207 : 201); // 207 Multi-Status
    }

    // Media güncelle (sadece metadata)
    public function update(Request $request, Media $media)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string',
            'collection' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $media->update($request->only(['name', 'collection']));

        return response()->json([
            'success' => true,
            'message' => 'Media updated successfully',
            'data' => $media->fresh()
        ]);
    }

    // Media sil
    public function destroy(Media $media)
    {
        // Sadece adminler veya yükleyen kişi silebilir
        if (!auth()->user()->isAdmin() && $media->uploaded_by !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to delete this file'
            ], 403);
        }

        try {
            // Dosyayı fiziksel olarak sil
            Storage::disk($media->disk)->delete($media->path);

            // Veritabanından sil
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

    // Çoklu media sil
    public function destroyMultiple(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:media,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $deleted = 0;
        $errors = [];

        foreach ($request->ids as $id) {
            try {
                $media = Media::find($id);

                if (!auth()->user()->isAdmin() && $media->uploaded_by !== auth()->id()) {
                    $errors[] = [
                        'id' => $id,
                        'error' => 'Permission denied'
                    ];
                    continue;
                }

                Storage::disk($media->disk)->delete($media->path);
                $media->delete();
                $deleted++;

            } catch (\Exception $e) {
                $errors[] = [
                    'id' => $id,
                    'error' => $e->getMessage()
                ];
            }
        }

        return response()->json([
            'success' => count($errors) === 0,
            'message' => "{$deleted} files deleted successfully",
            'errors' => $errors
        ]);
    }
}
