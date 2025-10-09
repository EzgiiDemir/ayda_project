<?php
// database/migrations/2024_01_01_000003_create_treatments_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('treatments_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('background_logo')->nullable();
            $table->json('treatments')->comment('Array of {id, label, href}');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treatments_configs');
    }
};
