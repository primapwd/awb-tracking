<?php

namespace App\Services;

use App\Models\FreightType;
use App\Models\TrackingCache;
use Illuminate\Contracts\Cache\Repository;

class TrackingService
{
    public function __construct(
        private SnapshotStore $snapshotStore,
        private Repository $cache,
    ) {}

    public function lookup(array $codes): array
    {
        $codes = array_values(array_unique(array_map(
            fn (string $c) => strtoupper(trim($c)),
            $codes,
        )));
        $codes = array_slice($codes, 0, config('awbtracking.max_codes'));

        $cachedRows = TrackingCache::whereIn('code', $codes)->get()->keyBy('code');
        $freightTypes = FreightType::all()->keyBy('key');
        $freshCutoffs = [];
        foreach ($freightTypes as $ft) {
            $freshCutoffs[$ft->key] = $ft->freshCacheCutoff();
        }

        $found = [];
        $missCodes = [];

        foreach ($codes as $code) {
            if (isset($cachedRows[$code])) {
                $row = $cachedRows[$code];
                $cutoff = $freshCutoffs[$row->freight_type] ?? null;
                if ($cutoff !== null && $row->cached_at !== null && $row->cached_at >= $cutoff) {
                    $found[$code] = $row;

                    continue;
                }
            }
            $missCodes[] = $code;
        }

        $enabledTypes = FreightType::where('enabled', true)->get();

        foreach ($enabledTypes as $type) {
            $snapshot = $this->snapshotStore->getSnapshot($type);

            foreach ($missCodes as $i => $code) {
                if (! isset($snapshot[$code])) {
                    continue;
                }

                $entry = $snapshot[$code];
                $found[$code] = $entry;
                unset($missCodes[$i]);

                TrackingCache::updateOrInsert(
                    ['code' => $code],
                    [
                        'company' => $entry['company'],
                        'weight' => $entry['weight'],
                        'processed_date' => $entry['processed_date'],
                        'tab_date' => $entry['tab_date'],
                        'freight_date' => $entry['freight_date'],
                        'source_label' => $entry['source_label'],
                        'freight_type' => $type->key,
                        'cached_at' => now()->timestamp,
                    ],
                );
            }
        }

        $results = [];
        foreach ($codes as $code) {
            if (isset($found[$code])) {
                $entry = $found[$code];
                $results[] = [
                    'code' => $entry['code'] ?? $code,
                    'found' => true,
                    'company' => $entry['company'] ?? null,
                    'weight' => $entry['weight'] ?? null,
                    'processed_date' => $entry['processed_date'] ?? null,
                    'tab_date' => $entry['tab_date'] ?? null,
                    'freight_date' => $entry['freight_date'] ?? null,
                    'type' => $entry['freight_type'] ?? null,
                    'source_label' => $entry['source_label'] ?? null,
                ];
            } else {
                $results[] = [
                    'code' => $code,
                    'found' => false,
                    'company' => null,
                    'weight' => null,
                    'processed_date' => null,
                    'tab_date' => null,
                    'freight_date' => null,
                    'type' => null,
                    'source_label' => null,
                ];
            }
        }

        return $results;
    }

    public function clearCache(?string $freightTypeKey = null): void
    {
        $query = TrackingCache::query();
        if ($freightTypeKey !== null) {
            $query->where('freight_type', $freightTypeKey);
        }
        $query->delete();
    }
}
