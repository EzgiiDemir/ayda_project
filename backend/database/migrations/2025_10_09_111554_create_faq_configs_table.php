<?php
// database/migrations/2024_01_01_000007_create_faq_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faq_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('hero_image')->nullable();
            $table->string('title')->nullable();
            $table->text('subtitle')->nullable();
            $table->json('faqs')->comment('Array of {id, question, answer}');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faq_configs');
    }
};
