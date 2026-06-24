<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FreightTypeRequest;
use App\Models\FreightType;
use App\Models\TrackingCache;
use App\Services\SnapshotStore;
use Inertia\Inertia;

class FreightTypeController extends Controller
{
    public function edit(string $key)
    {
        $freightType = FreightType::where('key', $key)->firstOrFail();

        return Inertia::render('admin/freight-edit', [
            'freightType' => $freightType,
        ]);
    }

    public function update(string $key, FreightTypeRequest $request, SnapshotStore $snapshotStore)
    {
        $type = FreightType::where('key', $key)->firstOrFail();
        $type->update($request->validated());

        $snapshotStore->bumpVersion();
        TrackingCache::where('freight_type', $type->key)->delete();

        return redirect()->back()->with('flash', 'Freight type updated.');
    }
}
