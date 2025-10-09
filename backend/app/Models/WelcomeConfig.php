<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WelcomeConfig extends Model
{
    protected $fillable = [
        'locale',
        'image_url',
        'image_alt',
        'gradient_from',
        'gradient_via',
        'gradient_to',
        'paragraphs',
        'signature_name',
        'signature_title',
    ];

    protected $casts = [
        'paragraphs' => 'array',
    ];
}
