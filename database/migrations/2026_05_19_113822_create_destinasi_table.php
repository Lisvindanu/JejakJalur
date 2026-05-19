<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Aktifkan pg_trgm sebelum GIN index dibuat
        DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');

        Schema::create('destinasi', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('stasiun_id')->constrained('stasiun')->cascadeOnDelete();
            $table->string('nama');
            $table->text('deskripsi');
            $table->string('alamat');
            $table->enum('kategori', ['Wisata', 'Kuliner', 'UMKM']);
            $table->decimal('rating', 3, 2)->default(0);
            $table->string('foto')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });

        // GIN index untuk fuzzy search (nama + deskripsi)
        DB::statement('CREATE INDEX destinasi_nama_trgm ON destinasi USING GIN (nama gin_trgm_ops)');
        DB::statement('CREATE INDEX destinasi_deskripsi_trgm ON destinasi USING GIN (deskripsi gin_trgm_ops)');
    }

    public function down(): void
    {
        Schema::dropIfExists('destinasi');
    }
};
