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
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->decimal('jarak_km', 8, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('koneksi_stasiun', function (Blueprint $table) {
            $table->smallInteger('jarak_km')->nullable()->change();
        });
    }
};
