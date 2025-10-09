<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TreatmentsConfig extends Model
{
    protected $fillable = [
        'locale',
        'background_logo',
        'treatments',
    ];

    protected $casts = [
        'treatments' => 'array',
    ];
}
