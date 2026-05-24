<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('destinasi', function (Blueprint $table) {
            // MM-DD format, e.g. "12-20" = 20 Desember. Null = tersedia sepanjang tahun.
            $table->string('musim_mulai', 5)->nullable()->after('views');
            $table->string('musim_selesai', 5)->nullable()->after('musim_mulai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinasi', function (Blueprint $table) {
            $table->dropColumn(['musim_mulai', 'musim_selesai']);
        });
    }
};
