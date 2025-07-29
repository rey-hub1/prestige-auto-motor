<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'category',
        'year',
        'price_per_day',
        'color',
        'transmission',
        'fuel_type',
        'seating_capacity',
        'engine_specification',
        'features',
        'image_url',
        'status',
    ];

    protected $casts = [
        'features' => 'array', // Ini penting agar Laravel tahu 'features' adalah array/json
    ];
}
