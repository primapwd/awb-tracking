<?php

namespace App\Services;

use Google\Client;
use Google\Service\Sheets;

class SheetClient
{
    private ?Client $client = null;

    private ?Sheets $sheets = null;

    private string $credentialsPath;

    public function __construct()
    {
        $this->credentialsPath = storage_path('app/' . config('awbtracking.google_credentials'));
    }

    public function getTabs(string $spreadsheetId): array
    {
        $spreadsheet = $this->sheets()->spreadsheets->get($spreadsheetId);

        return array_map(
            fn ($sheet) => $sheet->getProperties()->getTitle(),
            $spreadsheet->getSheets(),
        );
    }

    public function batchGet(string $spreadsheetId, array $ranges): array
    {
        $response = $this->sheets()->spreadsheets_values->batchGet($spreadsheetId, ['ranges' => $ranges]);

        return $response->getValueRanges();
    }

    private function client(): Client
    {
        if ($this->client === null) {
            $this->client = new Client;
            $this->client->setScopes([Sheets::SPREADSHEETS_READONLY]);
            $this->client->setAuthConfig($this->credentialsPath);
        }

        return $this->client;
    }

    private function sheets(): Sheets
    {
        if ($this->sheets === null) {
            $this->sheets = new Sheets($this->client());
        }

        return $this->sheets;
    }
}
