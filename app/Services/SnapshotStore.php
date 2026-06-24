<?php

namespace App\Services;

use App\Models\FreightType;
use Illuminate\Cache\LockTimeoutException;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Cache;

class SnapshotStore
{
    public function __construct(
        private Repository $cache,
        private SheetClient $sheetClient,
    ) {}

    public function getSnapshot(FreightType $type): array
    {
        $version = $this->cache->get("snapshot_version:{$type->key}", 0);
        $key = "snapshot:{$type->key}:v{$version}";

        try {
            return Cache::lock("snapshot-build:{$type->key}", 120)
                ->block(10, function () use ($key, $type) {
                    return $this->cache->remember(
                        $key,
                        $type->snapshot_ttl_sec,
                        fn () => $this->buildSnapshot($type),
                    );
                });
        } catch (LockTimeoutException $e) {
            return $this->cache->get($key, []);
        }
    }

    public function buildSnapshot(FreightType $type): array
    {
        $spreadsheets = $type->spreadsheets;
        $allEntries = [];

        foreach ($spreadsheets as $sheet) {
            $tabs = $this->sheetClient->getTabs($sheet->spreadsheet_id);
            $ignored = $type->ignoredTabs();
            $filteredTabs = array_values(array_filter(
                $tabs,
                fn (string $tab) => ! in_array(trim($tab), $ignored, true),
            ));

            if (empty($filteredTabs)) {
                continue;
            }

            $ranges = [];
            $tabNames = [];
            foreach ($filteredTabs as $tab) {
                $tab = trim($tab);
                $ranges[] = "'{$tab}'!{$type->freight_date_cell}";
                $ranges[] = "'{$tab}'!" . $this->buildDataRange($type);
                $tabNames[] = $tab;
            }

            $valueRanges = $this->sheetClient->batchGet($sheet->spreadsheet_id, $ranges);

            $companyIdx = $this->colIndex($type->col_company);
            $weightIdx = $this->colIndex($type->col_weight);
            $processedDateIdx = $this->colIndex($type->col_processed_date);

            foreach ($tabNames as $i => $tab) {
                $freightDateIdx = $i * 2;
                $dataIdx = $i * 2 + 1;

                $freightDate = null;
                if (isset($valueRanges[$freightDateIdx])) {
                    $vals = $valueRanges[$freightDateIdx]->getValues();
                    $freightDate = $vals[0][0] ?? null;
                }

                $rows = [];
                if (isset($valueRanges[$dataIdx])) {
                    $rows = $valueRanges[$dataIdx]->getValues() ?? [];
                }

                $awbIdx = $this->colIndex($type->col_awb);

                foreach ($rows as $row) {
                    $awb = trim((string) ($row[$awbIdx] ?? ''));
                    if ($awb === '') {
                        continue;
                    }
                    $code = strtoupper($awb);
                    $allEntries[$code] = [
                        'code' => $code,
                        'company' => $row[$companyIdx] ?? null,
                        'weight' => $row[$weightIdx] ?? null,
                        'processed_date' => $row[$processedDateIdx] ?? null,
                        'tab_date' => $tab,
                        'freight_date' => $freightDate,
                        'freight_type' => $type->key,
                        'source_label' => $sheet->label,
                    ];
                }
            }
        }

        return $allEntries;
    }

    public function bumpVersion(FreightType $type): void
    {
        $this->cache->increment("snapshot_version:{$type->key}");
    }

    private function colIndex(string $letter): int
    {
        $letter = strtoupper($letter);
        $index = 0;
        for ($i = 0; $i < strlen($letter); $i++) {
            $index = $index * 26 + (ord($letter[$i]) - ord('A') + 1);
        }

        return $index - 1;
    }

    private function buildDataRange(FreightType $type): string
    {
        $cols = $type->data_columns ?? config('awbtracking.defaults.data_columns');
        $startRow = $type->data_start_row ?? config('awbtracking.defaults.data_start_row');
        if ($startRow < 1) {
            $startRow = config('awbtracking.defaults.data_start_row');
        }
        [$start, $end] = explode(':', $cols, 2);

        return "{$start}{$startRow}:{$end}";
    }
}
