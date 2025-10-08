<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'component_id',
        'locale',
        'data',
        'is_active',
    ];

    protected $casts = [
        'data' => 'array',
        'is_active' => 'boolean',
    ];

    public function component()
    {
        return $this->belongsTo(Component::class);
    }
}
