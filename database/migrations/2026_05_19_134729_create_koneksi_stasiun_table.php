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
        Schema::create('koneksi_stasiun', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('stasiun_dari_id')->constrained('stasiun')->cascadeOnDelete();
            $table->foreignUuid('stasiun_ke_id')->constrained('stasiun')->cascadeOnDelete();
            $table->unsignedSmallInteger('jarak_km')->nullable();
            $table->timestamps();

            $table->unique(['stasiun_dari_id', 'stasiun_ke_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('koneksi_stasiun');
    }
};
