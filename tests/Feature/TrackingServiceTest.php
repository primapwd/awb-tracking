<?php

use App\Models\FreightType;
use App\Models\TrackingCache;
use App\Services\SnapshotStore;
use App\Services\TrackingService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('skips snapshot fetch when all codes are already fresh in the db cache', function () {
    $type = FreightType::create([
        'key' => 'air',
        'label' => 'Air',
        'enabled' => true,
        'cache_ttl_min' => 1440,
        'snapshot_ttl_sec' => 60,
    ]);

    TrackingCache::create([
        'code' => 'SWX971370000029924295',
        'freight_type' => $type->key,
        'company' => 'Rasine Rokadji',
        'weight' => '0.1',
        'processed_date' => '2/27',
        'tab_date' => '3/3 Flight',
        'freight_date' => 'Paramaribo Suriname',
        'cached_at' => now()->timestamp,
    ]);

    $snapshotStore = Mockery::mock(SnapshotStore::class);
    $snapshotStore->shouldNotReceive('getSnapshot');

    $service = new TrackingService($snapshotStore, app('cache.store'));

    $results = $service->lookup(['SWX971370000029924295']);

    expect($results)->toHaveCount(1)
        ->and($results[0]['found'])->toBeTrue()
        ->and($results[0]['company'])->toBe('Rasine Rokadji');
});

test('fetches snapshot only for codes missing from the db cache', function () {
    $type = FreightType::create([
        'key' => 'air',
        'label' => 'Air',
        'enabled' => true,
        'cache_ttl_min' => 1440,
        'snapshot_ttl_sec' => 60,
    ]);

    $snapshotStore = Mockery::mock(SnapshotStore::class);
    $snapshotStore->shouldReceive('getSnapshot')
        ->once()
        ->with(Mockery::on(fn ($arg) => $arg->key === $type->key))
        ->andReturn([]);

    $service = new TrackingService($snapshotStore, app('cache.store'));

    $results = $service->lookup(['UNKNOWNCODE123']);

    expect($results)->toHaveCount(1)
        ->and($results[0]['found'])->toBeFalse();
});
