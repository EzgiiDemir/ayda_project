<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Component extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'is_global',
        'schema',
    ];

    protected $casts = [
        'is_global' => 'boolean',
        'schema' => 'array',
    ];

    // İlişkiler
    public function contents(): HasMany
    {
        return $this->hasMany(ComponentContent::class);
    }

    public function content(string $locale = 'tr')
    {
        return $this->contents()
            ->where('locale', $locale)
            ->where('is_active', true)
            ->first();
    }

    public function pages()
    {
        return $this->belongsToMany(Page::class, 'page_components')
            ->withPivot('order', 'settings', 'is_visible')
            ->withTimestamps();
    }

    // Scopes
    public function scopeGlobal($query)
    {
        return $query->where('is_global', true);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
