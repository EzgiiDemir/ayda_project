<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqConfig extends Model
{
    protected $fillable = [
        'locale',
        'hero_image',
        'title',
        'subtitle',
        'faqs',
    ];

    protected $casts = [
        'faqs' => 'array',
    ];
}
