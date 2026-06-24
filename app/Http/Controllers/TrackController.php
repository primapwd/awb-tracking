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
        $results = $trackingService->lookup($request->parsedCodes());

        return Inertia::render('track', [
            'maxCodes' => config('awbtracking.max_codes'),
            'results' => $results,
            'query' => $request->input('codes'),
        ]);
    }
}
