<?php

use App\Models\FreightType;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        FreightType::where('key', 'air')->update([
            'col_awb' => 'C',
            'col_company' => 'B',
            'col_name' => 'E',
            'data_start_row' => 12,
        ]);
    }

    public function down(): void
    {
        FreightType::where('key', 'air')->update([
            'col_awb' => 'B',
            'col_company' => 'E',
            'col_name' => 'C',
            'data_start_row' => 8,
        ]);
    }
};
