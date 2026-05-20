<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Requires pgvector extension: CREATE EXTENSION IF NOT EXISTS vector;
        DB::statement('ALTER TABLE kota ADD COLUMN IF NOT EXISTS embedding vector(768)');
        DB::statement('ALTER TABLE stasiun ADD COLUMN IF NOT EXISTS embedding vector(768)');
        DB::statement('ALTER TABLE destinasi ADD COLUMN IF NOT EXISTS embedding vector(768)');

        DB::statement('CREATE INDEX IF NOT EXISTS kota_embedding_idx ON kota USING hnsw (embedding vector_cosine_ops)');
        DB::statement('CREATE INDEX IF NOT EXISTS stasiun_embedding_idx ON stasiun USING hnsw (embedding vector_cosine_ops)');
        DB::statement('CREATE INDEX IF NOT EXISTS destinasi_embedding_idx ON destinasi USING hnsw (embedding vector_cosine_ops)');
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS kota_embedding_idx');
        DB::statement('DROP INDEX IF EXISTS stasiun_embedding_idx');
        DB::statement('DROP INDEX IF EXISTS destinasi_embedding_idx');

        DB::statement('ALTER TABLE kota DROP COLUMN IF EXISTS embedding');
        DB::statement('ALTER TABLE stasiun DROP COLUMN IF EXISTS embedding');
        DB::statement('ALTER TABLE destinasi DROP COLUMN IF EXISTS embedding');
    }
};
