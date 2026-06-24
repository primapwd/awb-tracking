<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackingCache extends Model
{
    protected $table = 'tracking_cache';

    public $timestamps = false;

    protected $fillable = [
        'code',
        'freight_type',
        'company',
        'weight',
        'processed_date',
        'tab_date',
        'freight_date',
        'source_label',
        'cached_at',
    ];

    protected function casts(): array
    {
        return [
            'cached_at' => 'integer',
        ];
    }
}
