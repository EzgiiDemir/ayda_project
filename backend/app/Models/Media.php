<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'file_name',
        'mime_type',
        'path',
        'disk',
        'size',
        'metadata',
        'collection',
        'uploaded_by',
    ];

    protected $casts = [
        'metadata' => 'array',
        'size' => 'integer',
    ];

    protected $appends = ['url', 'size_formatted'];

    // Accessor
    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }

    public function getSizeFormattedAttribute(): string
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    // Relations
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Scopes
    public function scopeImages($query)
    {
        return $query->where('mime_type', 'like', 'image/%');
    }

    public function scopeVideos($query)
    {
        return $query->where('mime_type', 'like', 'video/%');
    }

    public function scopeDocuments($query)
    {
        return $query->whereIn('mime_type', [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]);
    }

    public function scopeInCollection($query, string $collection)
    {
        return $query->where('collection', $collection);
    }
}
