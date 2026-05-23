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
            $table->string('telepon', 20)->nullable()->after('alamat');
            $table->string('website', 255)->nullable()->after('telepon');
            $table->unsignedInteger('harga_min')->nullable()->after('website');
            $table->unsignedInteger('harga_max')->nullable()->after('harga_min');
        });
    }

    public function down(): void
    {
        Schema::table('destinasi', function (Blueprint $table) {
            $table->dropColumn(['telepon', 'website', 'harga_min', 'harga_max']);
        });
    }
};
