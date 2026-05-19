<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kota', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('nama')->unique();
            $table->string('kode_ibukota', 10);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kota');
    }
};
