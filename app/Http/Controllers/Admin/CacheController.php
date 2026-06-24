<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FreightType;
use App\Services\SnapshotStore;
use App\Services\TrackingService;
use Illuminate\Http\Request;

class CacheController extends Controller
{
    public function refresh(Request $request, TrackingService $trackingService, SnapshotStore $snapshotStore)
    {
        $type = $request->input('type');

        $trackingService->clearCache($type);

        $types = $type
            ? FreightType::where('key', $type)->get()
            : FreightType::all();

        foreach ($types as $ft) {
            $snapshotStore->bumpVersion($ft->key);
        }

        return redirect()->back()->with('flash', 'Cache cleared.');
    }
}
