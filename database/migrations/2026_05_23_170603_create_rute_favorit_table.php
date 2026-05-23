<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rute_favorit', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama', 100);
            $table->string('dari_kode', 10);
            $table->string('ke_kode', 10);
            $table->string('dari_nama', 100);
            $table->string('ke_nama', 100);
            $table->string('mode', 20)->default('antarkota');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rute_favorit');
    }
};
