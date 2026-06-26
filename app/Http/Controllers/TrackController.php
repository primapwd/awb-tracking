<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrackRequest;
use App\Services\TrackingService;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function index()
    {
        return Inertia::render('track', [
            'maxCodes' => config('awbtracking.max_codes'),
        ]);
    }

    public function track(TrackRequest $request, TrackingService $trackingService)
    {
        $raw = $trackingService->lookup($request->parsedCodes());

        $results = array_map(fn ($r) => [
            'awb' => $r['code'],
            'logistic_company' => $r['company'],
            'weight' => $r['weight'],
            'processed_date' => $r['processed_date'],
            'tab_date' => $r['tab_date'],
            'freight_date' => $r['freight_date'],
            'type' => $r['type'],
            'status' => $r['found'] ? 'processed' : 'not_found',
        ], $raw);

        return Inertia::render('track', [
            'maxCodes' => config('awbtracking.max_codes'),
            'results' => $results,
            'query' => $request->input('codes'),
        ]);
    }

    public function newIndex()
    {
        return Inertia::render('new-track', [
            'maxCodes' => config('awbtracking.max_codes'),
        ]);
    }

    public function newTrack(TrackRequest $request, TrackingService $trackingService)
    {
        $raw = $trackingService->lookup($request->parsedCodes());

        $results = array_map(fn ($r) => [
            'awb' => $r['code'],
            'logistic_company' => $r['company'],
            'weight' => $r['weight'],
            'processed_date' => $r['processed_date'],
            'tab_date' => $r['tab_date'],
            'freight_date' => $r['freight_date'],
            'type' => $r['type'],
            'status' => $r['found'] ? 'processed' : 'not_found',
        ], $raw);

        return Inertia::render('new-track', [
            'maxCodes' => config('awbtracking.max_codes'),
            'results' => $results,
            'query' => $request->input('codes'),
        ]);
    }

    public function newCardIndex()
    {
        return Inertia::render('new-track-card', [
            'maxCodes' => config('awbtracking.max_codes'),
        ]);
    }

    public function newCardTrack(TrackRequest $request, TrackingService $trackingService)
    {
        $raw = $trackingService->lookup($request->parsedCodes());

        $results = array_map(fn ($r) => [
            'awb' => $r['code'],
            'logistic_company' => $r['company'],
            'weight' => $r['weight'],
            'processed_date' => $r['processed_date'],
            'tab_date' => $r['tab_date'],
            'freight_date' => $r['freight_date'],
            'type' => $r['type'],
            'status' => $r['found'] ? 'processed' : 'not_found',
        ], $raw);

        return Inertia::render('new-track-card', [
            'maxCodes' => config('awbtracking.max_codes'),
            'results' => $results,
            'query' => $request->input('codes'),
        ]);
    }
}
