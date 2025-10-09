<?php
// database/migrations/2024_01_01_000005_create_footer_configs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_configs', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2)->unique();
            $table->string('address_icon')->nullable();
            $table->text('address_text')->nullable();
            $table->string('address_iso_logo')->nullable();
            $table->string('contact_icon')->nullable();
            $table->string('contact_phone', 20)->nullable();
            $table->string('contact_email', 100)->nullable();
            $table->json('social_links')->nullable()->comment('Array of {id, platform, url}');
            $table->string('quick_access_icon')->nullable();
            $table->json('quick_access_links')->nullable()->comment('Array of {id, label, href}');
            $table->string('copyright_text')->nullable();
            $table->string('copyright_logo')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_configs');
    }
};
