<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stasiun', function (Blueprint $table) {
            // Koordinat untuk custom subway-map SVG (keperluan visualisasi frontend)
            $table->decimal('lat', 10, 7)->nullable()->after('kode_stasiun');
            $table->decimal('lng', 10, 7)->nullable()->after('lat');
        });
    }

    public function down(): void
    {
        Schema::table('stasiun', function (Blueprint $table) {
            $table->dropColumn(['lat', 'lng']);
        });
    }
};
