<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FreightType extends Model
{
    protected $fillable = [
        'key',
        'label',
        'col_processed_date',
        'col_awb',
        'col_name',
        'col_weight',
        'col_company',
        'data_columns',
        'data_start_row',
        'freight_date_cell',
        'tab_ignore',
        'cache_ttl_min',
        'snapshot_ttl_sec',
        'enabled',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'data_start_row' => 'integer',
            'cache_ttl_min' => 'integer',
            'snapshot_ttl_sec' => 'integer',
        ];
    }

    public function spreadsheets(): HasMany
    {
        return $this->hasMany(Spreadsheet::class);
    }

    public function normalizeCode(string $code): string
    {
        return strtoupper(trim($code));
    }

    public function freshCacheCutoff(): ?int
    {
        if ($this->cache_ttl_min === 0) {
            return null;
        }

        return now()->subMinutes($this->cache_ttl_min)->timestamp;
    }

    public function ignoredTabs(): array
    {
        if (empty($this->tab_ignore)) {
            return [];
        }

        return array_map('trim', explode(',', $this->tab_ignore));
    }
}
