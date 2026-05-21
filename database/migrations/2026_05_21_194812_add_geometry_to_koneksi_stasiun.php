<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tambah kolom geometry JSONB untuk simpan GeoJSON LineString
     * tiap koneksi_stasiun edge. Polyline rute ikut lengkungan rel asli
     * (data OpenStreetMap via Overpass API), bukan straight-line antar stasiun.
     */
    public function up(): void
    {
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->jsonb('geometry')->nullable()->after('jarak_km');
        });
    }

    public function down(): void
    {
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->dropColumn('geometry');
        });
    }
};
