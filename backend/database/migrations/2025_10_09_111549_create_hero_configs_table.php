<?php
// database/migrations/xxxx_create_hero_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->json('slides')->comment('Array of {title, subtitle, image}');
            $table->string('dots_pattern')->nullable();
            $table->boolean('auto_play')->default(true);
            $table->integer('auto_play_interval')->default(5000);
            $table->boolean('show_indicators')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_configs');
    }
};
