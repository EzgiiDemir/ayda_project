<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('template')->default('default');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_homepage')->default(false);
            $table->integer('order')->default(0);
            $table->json('meta')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 5)->default('tr');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->json('seo')->nullable();
            $table->timestamps();

            $table->unique(['page_id', 'locale']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
        Schema::dropIfExists('pages');
    }
};
