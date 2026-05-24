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
        Schema::create('ulasan_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('ulasan_id');
            $table->foreign('ulasan_id')->references('id')->on('ulasan')->cascadeOnDelete();
            $table->string('alasan', 200)->nullable();
            $table->unique(['user_id', 'ulasan_id']);
            $table->timestamps();
        });

        // Add reports_count + is_hidden columns to ulasan
        Schema::table('ulasan', function (Blueprint $table) {
            $table->unsignedSmallInteger('reports_count')->default(0)->after('foto');
            $table->boolean('is_hidden')->default(false)->after('reports_count');
        });
    }

    public function down(): void
    {
        Schema::table('ulasan', function (Blueprint $table) {
            $table->dropColumn(['reports_count', 'is_hidden']);
        });
        Schema::dropIfExists('ulasan_reports');
    }
};
