<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('destinasi_id')->constrained('destinasi')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'destinasi_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
