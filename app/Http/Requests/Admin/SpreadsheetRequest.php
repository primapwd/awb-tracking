<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SpreadsheetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'freight_type_id' => ['required', 'exists:freight_types,id'],
            'label' => ['required', 'string', 'max:255'],
            'spreadsheet_id' => ['required', 'string'],
            'enabled' => ['boolean'],
            'sort_order' => ['integer'],
        ];
    }
}
