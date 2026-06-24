<?php

return [
    /*
    | Path to the Google service-account JSON key (relative to storage/app/).
    */
    'google_credentials' => env('GOOGLE_CREDENTIALS', 'credentials.json'),

    /*
    | Max tracking codes accepted per /track request.
    */
    'max_codes' => (int) env('AWB_MAX_CODES', 100),

    /*
    | Default column mappings (letters match the Google Sheets UI).
    | Overridden per freight type in the database.
    */
    'defaults' => [
        'col_processed_date' => 'A',
        'col_awb' => 'B',
        'col_name' => 'C',
        'col_weight' => 'D',
        'col_company' => 'E',
        'data_columns' => 'A:E',
        'data_start_row' => 8,
        'freight_date_cell' => 'B6',
        'cache_ttl_min' => 1440,
        'snapshot_ttl_sec' => 60,
    ],
];
