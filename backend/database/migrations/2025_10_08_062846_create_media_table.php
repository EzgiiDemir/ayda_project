<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_name');
            $table->string('mime_type');
            $table->string('path');
            $table->string('disk')->default('public');
            $table->unsignedBigInteger('size');
            $table->json('metadata')->nullable();
            $table->string('collection')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['collection', 'mime_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
