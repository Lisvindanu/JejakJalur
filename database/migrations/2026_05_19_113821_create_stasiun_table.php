<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stasiun', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('kota_id')->constrained('kota')->cascadeOnDelete();
            $table->string('nama')->unique();
            $table->string('kode_stasiun', 10);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stasiun');
    }
};
