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
        ]);

        FreightType::create([
            'key' => 'ocean',
            'label' => 'Ocean Freight',
        ]);
    }
}
