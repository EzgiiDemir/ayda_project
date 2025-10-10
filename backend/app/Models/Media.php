<?php
// app/Models/Media.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'name',
        'filename',
        'path',
        'url',
        'mime_type',
        'size',
        'size_formatted',
        'type',
        'collection',
        'uploaded_by',
    ];

    protected $casts = [
        'size' => 'integer',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeInCollection($query, string $collection)
    {
        return $query->where('collection', $collection);
    }
}
