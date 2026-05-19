<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nama')->after('id');
            $table->string('password')->nullable()->change();
            $table->string('google_id')->nullable()->after('email');
            $table->string('github_id')->nullable()->after('google_id');
            $table->boolean('is_admin')->default(false)->after('github_id');
            $table->boolean('consent_given')->default(false)->after('is_admin');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nama', 'google_id', 'github_id', 'is_admin', 'consent_given']);
            $table->string('password')->nullable(false)->change();
        });
    }
};
