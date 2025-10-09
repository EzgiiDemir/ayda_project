<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactConfig extends Model
{
    protected $fillable = [
        'locale',
        'hero_image',
        'form_subjects',
        'form_api_endpoint',
        'map_url',
        'map_image',
        'show_iframe',
    ];

    protected $casts = [
        'form_subjects' => 'array',
        'show_iframe' => 'boolean',
    ];
}
