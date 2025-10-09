<?php
// database/migrations/2024_01_01_000002_create_welcome_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('welcome_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('image_url')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('gradient_from', 20)->nullable();
            $table->string('gradient_via', 20)->nullable();
            $table->string('gradient_to', 20)->nullable();
            $table->json('paragraphs')->comment('Array of paragraph texts');
            $table->string('signature_name', 100)->nullable();
            $table->string('signature_title', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('welcome_configs');
    }
};
