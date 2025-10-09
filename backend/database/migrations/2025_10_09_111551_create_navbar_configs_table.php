<?php
// database/migrations/2024_01_01_000004_create_navbar_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navbar_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('logo_url')->nullable();
            $table->string('logo_alt')->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->json('about_links')->nullable()->comment('Array of {id, label, href}');
            $table->json('treatments_links')->nullable()->comment('Array of {id, label, href}');
            $table->json('regular_links')->nullable()->comment('Array of {id, label, href}');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navbar_configs');
    }
};
