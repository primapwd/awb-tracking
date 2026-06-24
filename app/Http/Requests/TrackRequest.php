<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrackRequest extends FormRequest
{
    private array $parsed = [];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'codes' => ['required', 'string'],
        ];
    }

    protected function passedValidation(): void
    {
        $raw = $this->validated()['codes'];

        $codes = collect(
            preg_split('/[\n,]+/', $raw)
        )->map(fn ($code) => trim(strtoupper($code)))
            ->filter()
            ->unique()
            ->values()
            ->take(config('awbtracking.max_codes'))
            ->toArray();

        $this->parsed = $codes;
    }

    public function parsedCodes(): array
    {
        return $this->parsed;
    }
}
