<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Spreadsheet extends Model
{
    protected $fillable = [
        'freight_type_id',
        'label',
        'spreadsheet_id',
        'enabled',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function freightType(): BelongsTo
    {
        return $this->belongsTo(FreightType::class);
    }

    public function scopeEnabled($query)
    {
        return $query->where('enabled', true);
    }
}
