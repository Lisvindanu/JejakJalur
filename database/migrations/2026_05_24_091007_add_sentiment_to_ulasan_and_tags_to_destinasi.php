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
        Schema::table('ulasan', function (Blueprint $table) {
            $table->string('sentiment', 10)->nullable()->after('is_hidden');
        });

        Schema::table('destinasi', function (Blueprint $table) {
            $table->jsonb('tags')->nullable()->after('website');
        });
    }

    public function down(): void
    {
        Schema::table('ulasan', function (Blueprint $table) {
            $table->dropColumn('sentiment');
        });

        Schema::table('destinasi', function (Blueprint $table) {
            $table->dropColumn('tags');
        });
    }
};
