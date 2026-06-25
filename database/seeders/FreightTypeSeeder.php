<?php

namespace Database\Seeders;

use App\Models\FreightType;
use Illuminate\Database\Seeder;

class FreightTypeSeeder extends Seeder
{
    public function run(): void
    {
        FreightType::create([
            'key' => 'air',
            'label' => 'Air Freight',
            'col_awb' => 'C',
            'col_company' => 'B',
            'col_name' => 'E',
            'col_weight' => 'D',
            'col_processed_date' => 'A',
            'data_start_row' => 12,
            'freight_date_cell' => 'B6',
        ]);

        FreightType::create([
            'key' => 'ocean',
            'label' => 'Ocean Freight',
        ]);
    }
}
