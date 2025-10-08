<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Page extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'template',
        'is_active',
        'is_homepage',
        'order',
        'meta',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_homepage' => 'boolean',
        'meta' => 'array',
    ];

    // İlişkiler
    public function contents(): HasMany
    {
        return $this->hasMany(PageContent::class);
    }

    public function content(string $locale = 'tr')
    {
        return $this->contents()->where('locale', $locale)->first();
    }

    public function components(): BelongsToMany
    {
        return $this->belongsToMany(Component::class, 'page_components')
            ->withPivot('order', 'settings', 'is_visible')
            ->withTimestamps()
            ->orderBy('page_components.order');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForLocale($query, string $locale)
    {
        return $query->with(['contents' => function ($q) use ($locale) {
            $q->where('locale', $locale);
        }]);
    }
}
