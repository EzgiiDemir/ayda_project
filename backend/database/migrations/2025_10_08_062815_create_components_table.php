<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('type');
            $table->text('description')->nullable();
            $table->boolean('is_global')->default(false);
            $table->json('schema')->nullable();
            $table->timestamps();
        });

        Schema::create('component_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 5)->default('tr');
            $table->json('data');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['component_id', 'locale']);
        });

        Schema::create('page_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->foreignId('component_id')->constrained()->cascadeOnDelete();
            $table->integer('order')->default(0);
            $table->json('settings')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->unique(['page_id', 'component_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_components');
        Schema::dropIfExists('component_contents');
        Schema::dropIfExists('components');
    }
};
