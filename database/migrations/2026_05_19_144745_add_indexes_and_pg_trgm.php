<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Pastikan extension aktif (idempotent — aman dijalankan ulang)
        DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');

        // GIN index fuzzy search — idempotent
        DB::statement('CREATE INDEX IF NOT EXISTS destinasi_nama_trgm ON destinasi USING GIN (nama gin_trgm_ops)');
        DB::statement('CREATE INDEX IF NOT EXISTS destinasi_deskripsi_trgm ON destinasi USING GIN (deskripsi gin_trgm_ops)');

        // B-tree indexes per SDD
        Schema::table('stasiun', function (Blueprint $table) {
            $table->index('kota_id', 'idx_stasiun_kota_id');
        });

        Schema::table('destinasi', function (Blueprint $table) {
            $table->index('stasiun_id', 'idx_destinasi_stasiun_id');
            $table->index('kategori', 'idx_destinasi_kategori');
            $table->index('is_verified', 'idx_destinasi_is_verified');
        });

        Schema::table('ulasan', function (Blueprint $table) {
            $table->index('destinasi_id', 'idx_ulasan_destinasi_id');
            $table->index('user_id', 'idx_ulasan_user_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->index('google_id', 'idx_users_google_id');
            $table->index('github_id', 'idx_users_github_id');
        });
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS destinasi_nama_trgm');
        DB::statement('DROP INDEX IF EXISTS destinasi_deskripsi_trgm');

        Schema::table('stasiun', fn (Blueprint $t) => $t->dropIndex('idx_stasiun_kota_id'));
        Schema::table('destinasi', function (Blueprint $table) {
            $table->dropIndex('idx_destinasi_stasiun_id');
            $table->dropIndex('idx_destinasi_kategori');
            $table->dropIndex('idx_destinasi_is_verified');
        });
        Schema::table('ulasan', function (Blueprint $table) {
            $table->dropIndex('idx_ulasan_destinasi_id');
            $table->dropIndex('idx_ulasan_user_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('idx_users_google_id');
            $table->dropIndex('idx_users_github_id');
        });
    }
};
