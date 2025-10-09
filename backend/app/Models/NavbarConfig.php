<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavbarConfig extends Model
{
    protected $fillable = [
        'locale',
        'logo_url',
        'logo_alt',
        'phone_number',
        'about_links',
        'treatments_links',
        'regular_links',
    ];

    protected $casts = [
        'about_links' => 'array',
        'treatments_links' => 'array',
        'regular_links' => 'array',
    ];
}
