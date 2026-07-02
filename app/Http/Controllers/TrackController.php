<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrackRequest;
use App\Services\TrackingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function index()
    {
        return Inertia::render('new-track', [
            'maxCodes' => config('awbtracking.max_codes'),
        ]);
    }

    public function track(TrackRequest $request, TrackingService $trackingService)
    {
        $raw = $trackingService->lookup($request->parsedCodes());

        $results = array_map([$this, 'formatResult'], $raw);

        return Inertia::render('new-track', [
            'maxCodes' => config('awbtracking.max_codes'),
            'results' => $results,
            'query' => $request->input('codes'),
        ]);
    }

    public function lookupOne(Request $request, TrackingService $trackingService)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255'],
        ]);

        $code = strtoupper(trim($validated['code']));

        $raw = $trackingService->lookup([$code]);

        return response()->json($this->formatResult($raw[0]));
    }

    /**
     * @param  array<string, mixed>  $result
     * @return array<string, mixed>
     */
    private function formatResult(array $result): array
    {
        return [
            'awb' => $result['code'],
            'logistic_company' => $result['company'],
            'weight' => $result['weight'],
            'processed_date' => $result['processed_date'],
            'tab_date' => $result['tab_date'],
            'freight_date' => $result['freight_date'],
            'type' => $result['type'],
            'status' => $result['found'] ? 'processed' : 'not_found',
        ];
    }
}
