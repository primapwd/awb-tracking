<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FreightTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $type = $this->route('type');

        return [
            'key' => ['required', 'string', 'max:50', 'unique:freight_types,key,' . $type],
            'label' => ['required', 'string', 'max:255'],
            'col_processed_date' => ['nullable', 'regex:/^[A-Z]+$/'],
            'col_awb' => ['nullable', 'regex:/^[A-Z]+$/'],
            'col_name' => ['nullable', 'regex:/^[A-Z]+$/'],
            'col_weight' => ['nullable', 'regex:/^[A-Z]+$/'],
            'col_company' => ['nullable', 'regex:/^[A-Z]+$/'],
            'freight_date_cell' => ['nullable', 'regex:/^[A-Z]+\d+$/'],
            'data_columns' => ['nullable', 'regex:/^[A-Z]+:[A-Z]+$/'],
            'data_start_row' => ['nullable', 'integer', 'min:1'],
            'cache_ttl_min' => ['nullable', 'integer', 'min:0'],
            'snapshot_ttl_sec' => ['nullable', 'integer', 'min:0'],
            'enabled' => ['boolean'],
        ];
    }
}
