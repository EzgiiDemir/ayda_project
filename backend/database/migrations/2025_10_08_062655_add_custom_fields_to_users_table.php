<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Mevcut tabloya eklemeler
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['super_admin', 'admin', 'editor'])->default('editor')->after('password');
            }
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('role');
            }
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes()->after('updated_at');
            }
        });

        // Password reset tokens tablosu yoksa oluştur
        if (!Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }

        // Sessions tablosu yoksa oluştur
        if (!Schema::hasTable('sessions')) {
            Schema::create('sessions', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->foreignId('user_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->longText('payload');
                $table->integer('last_activity')->index();
            });
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active', 'avatar', 'deleted_at']);
        });

        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
