<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracking_cache', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('freight_type');
            $table->string('company')->nullable();
            $table->string('weight')->nullable();
            $table->string('processed_date')->nullable();
            $table->string('tab_date')->nullable();
            $table->string('freight_date')->nullable();
            $table->string('source_label')->nullable();
            $table->integer('cached_at');
            $table->unique('code');
            $table->index('code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracking_cache');
    }
};
