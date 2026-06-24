<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SpreadsheetRequest;
use App\Models\FreightType;
use App\Models\Spreadsheet;
use App\Services\SnapshotStore;
use Inertia\Inertia;

class SpreadsheetController extends Controller
{
    public function index()
    {
        $spreadsheets = FreightType::with('spreadsheets')->get()->map(fn ($ft) => [
            'freight_type' => ['id' => $ft->id, 'key' => $ft->key, 'label' => $ft->label],
            'spreadsheets' => $ft->spreadsheets,
        ]);

        return Inertia::render('admin/spreadsheets-index', [
            'groups' => $spreadsheets,
            'freightTypes' => FreightType::select('id', 'label')->get(),
        ]);
    }

    public function store(SpreadsheetRequest $request, SnapshotStore $snapshotStore)
    {
        $type = FreightType::findOrFail($request->validated()['freight_type_id']);
        Spreadsheet::create($request->validated());
        $snapshotStore->bumpVersion($type);

        return redirect()->back()->with('flash', 'Spreadsheet created.');
    }

    public function update(SpreadsheetRequest $request, Spreadsheet $spreadsheet, SnapshotStore $snapshotStore)
    {
        $spreadsheet->update($request->validated());
        $snapshotStore->bumpVersion($spreadsheet->freightType);

        return redirect()->back()->with('flash', 'Spreadsheet updated.');
    }

    public function destroy(Spreadsheet $spreadsheet, SnapshotStore $snapshotStore)
    {
        $type = $spreadsheet->freightType;
        $spreadsheet->delete();
        $snapshotStore->bumpVersion($type);

        return redirect()->back()->with('flash', 'Spreadsheet deleted.');
    }
}
