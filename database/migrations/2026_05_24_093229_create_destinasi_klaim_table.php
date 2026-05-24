<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinasi_klaim', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('destinasi_id')->constrained('destinasi')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('keterangan');
            $table->string('status', 20)->default('menunggu'); // menunggu|disetujui|ditolak
            $table->text('catatan_admin')->nullable();
            $table->timestamps();
            $table->unique(['destinasi_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinasi_klaim');
    }
};
