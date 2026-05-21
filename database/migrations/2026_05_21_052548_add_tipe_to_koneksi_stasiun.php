<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->string('tipe', 20)->default('antarkota')->after('jarak_km');
        });

        DB::statement("UPDATE koneksi_stasiun SET tipe = 'antarkota' WHERE tipe IS NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->dropColumn('tipe');
        });
    }
};
