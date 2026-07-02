<?php

use App\Models\FreightType;
use App\Models\TrackingCache;
use App\Services\SnapshotStore;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('lookup endpoint returns a single processed result as json', function () {
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

    $response = $this->postJson('/api/track/lookup', [
        'code' => 'swx971370000029924295',
    ]);

    $response->assertOk()->assertJson([
        'awb' => 'SWX971370000029924295',
        'logistic_company' => 'Rasine Rokadji',
        'status' => 'processed',
    ]);
});

test('lookup endpoint returns not_found for an unknown code', function () {
    FreightType::create([
        'key' => 'air',
        'label' => 'Air',
        'enabled' => true,
        'cache_ttl_min' => 1440,
        'snapshot_ttl_sec' => 60,
    ]);

    $snapshotStore = Mockery::mock(SnapshotStore::class);
    $snapshotStore->shouldReceive('getSnapshot')->once()->andReturn([]);
    $this->app->instance(SnapshotStore::class, $snapshotStore);

    $response = $this->postJson('/api/track/lookup', [
        'code' => 'UNKNOWNCODE123',
    ]);

    $response->assertOk()->assertJson([
        'awb' => 'UNKNOWNCODE123',
        'status' => 'not_found',
    ]);
});

test('lookup endpoint requires a code', function () {
    $response = $this->postJson('/api/track/lookup', []);

    $response->assertStatus(422);
});
