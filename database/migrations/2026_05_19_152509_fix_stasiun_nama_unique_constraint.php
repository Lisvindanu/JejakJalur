<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stasiun', function (Blueprint $table) {
            $table->dropUnique('stasiun_nama_unique');
            $table->unique(['nama', 'kota_id'], 'stasiun_nama_kota_unique');
        });
    }

    public function down(): void
    {
        Schema::table('stasiun', function (Blueprint $table) {
            $table->dropUnique('stasiun_nama_kota_unique');
            $table->unique('nama', 'stasiun_nama_unique');
        });
    }
};
