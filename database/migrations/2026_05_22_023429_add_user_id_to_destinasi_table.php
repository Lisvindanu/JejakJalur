<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('destinasi', function (Blueprint $table) {
            $table->foreignUuid('user_id')->nullable()->after('stasiun_id')
                ->constrained('users')->nullOnDelete();
            $table->index('user_id', 'idx_destinasi_user_id');
        });
    }

    public function down(): void
    {
        Schema::table('destinasi', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });
    }
};
