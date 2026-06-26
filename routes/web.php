<?php

use App\Http\Controllers\Admin\CacheController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FreightTypeController;
use App\Http\Controllers\Admin\SpreadsheetController;
use App\Http\Controllers\TrackController;
use App\Models\FreightType;
use App\Models\TrackingCache;
use Illuminate\Support\Facades\Route;

Route::get('/', [TrackController::class, 'index'])->name('track');
Route::get('/track', fn () => redirect()->route('track'));
Route::post('/track', [TrackController::class, 'track'])
    ->middleware('throttle:60,1')
    ->name('track.submit');

Route::get('/new', [TrackController::class, 'newIndex'])->name('track.new');
Route::post('/new', [TrackController::class, 'newTrack'])
    ->middleware('throttle:60,1')
    ->name('track.new.submit');

Route::get('/new-card', [TrackController::class, 'newCardIndex'])->name('track.new_card');
Route::post('/new-card', [TrackController::class, 'newCardTrack'])
    ->middleware('throttle:60,1')
    ->name('track.new_card.submit');

Route::get('/healthz', function () {
    return response()->json([
        'ok' => true,
        'cached_count' => TrackingCache::count(),
        'types' => FreightType::select('key', 'label', 'enabled')->get(),
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/freight/{type}/edit', [FreightTypeController::class, 'edit'])->name('admin.freight.edit');
    Route::put('/admin/freight/{type}', [FreightTypeController::class, 'update'])->name('admin.freight.update');
    Route::get('/admin/spreadsheets', [SpreadsheetController::class, 'index'])->name('admin.spreadsheets');
    Route::post('/admin/spreadsheets', [SpreadsheetController::class, 'store'])->name('admin.spreadsheets.store');
    Route::put('/admin/spreadsheets/{spreadsheet}', [SpreadsheetController::class, 'update'])->name('admin.spreadsheets.update');
    Route::delete('/admin/spreadsheets/{spreadsheet}', [SpreadsheetController::class, 'destroy'])->name('admin.spreadsheets.destroy');
    Route::post('/admin/cache/refresh', [CacheController::class, 'refresh'])->name('admin.cache.refresh');
});

require __DIR__ . '/settings.php';
