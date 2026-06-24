<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('freight_types', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('label');
            $table->string('col_processed_date')->default('A');
            $table->string('col_awb')->default('B');
            $table->string('col_name')->default('C');
            $table->string('col_weight')->default('D');
            $table->string('col_company')->default('E');
            $table->string('data_columns')->default('A:E');
            $table->integer('data_start_row')->default(8)->comment('minimum 1; values < 1 fall back to default');
            $table->string('freight_date_cell')->default('B6');
            $table->string('tab_ignore')->nullable()->comment('comma-separated tab names to skip');
            $table->integer('cache_ttl_min')->default(1440);
            $table->integer('snapshot_ttl_sec')->default(60);
            $table->boolean('enabled')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freight_types');
    }
};
