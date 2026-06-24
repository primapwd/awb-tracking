<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FreightType;
use App\Models\TrackingCache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'cachedCount' => TrackingCache::count(),
            'freightTypes' => FreightType::with('spreadsheets')->get()->map(fn ($t) => [
                'key' => $t->key,
                'label' => $t->label,
                'enabled' => $t->enabled,
                'spreadsheets_count' => $t->spreadsheets->count(),
                'spreadsheets_enabled' => $t->spreadsheets->where('enabled', true)->count(),
            ]),
        ]);
    }
}
