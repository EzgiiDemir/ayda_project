<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterConfig extends Model
{
    protected $fillable = [
        'locale',
        'address_icon',
        'address_text',
        'address_iso_logo',
        'contact_icon',
        'contact_phone',
        'contact_email',
        'social_links',
        'quick_access_icon',
        'quick_access_links',
        'copyright_text',
        'copyright_logo',
    ];

    protected $casts = [
        'social_links' => 'array',
        'quick_access_links' => 'array',
    ];
}
