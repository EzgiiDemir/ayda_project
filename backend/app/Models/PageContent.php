<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'locale',
        'title',
        'subtitle',
        'hero_image',
        'description',
        'seo',
    ];

    protected $casts = [
        'seo' => 'array',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
