<?php
// app/Models/HeroConfig.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroConfig extends Model
{
    protected $fillable = [
        'locale',
        'slides',
        'dots_pattern',
        'auto_play',
        'auto_play_interval',
        'show_indicators',
    ];

    protected $casts = [
        'slides' => 'array',
        'auto_play' => 'boolean',
        'show_indicators' => 'boolean',
        'auto_play_interval' => 'integer',
    ];
}
