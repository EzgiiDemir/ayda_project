<?php
// database/migrations/2024_01_01_000006_create_contact_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('hero_image')->nullable();
            $table->json('form_subjects')->nullable()->comment('Array of subject strings');
            $table->string('form_api_endpoint')->nullable();
            $table->text('map_url')->nullable();
            $table->string('map_image')->nullable();
            $table->boolean('show_iframe')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_configs');
    }
};
