<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only run if notifications.notifiable_id is still bigint
        $column = DB::selectOne("
            SELECT data_type FROM information_schema.columns
            WHERE table_name = 'notifications' AND column_name = 'notifiable_id'
        ");

        if (! $column || $column->data_type === 'uuid') {
            return;
        }

        // Drop existing morph index
        Schema::table('notifications', function ($table) {
            $table->dropIndex(['notifiable_type', 'notifiable_id']);
        });

        // Truncate stale bigint notifications (incompatible with uuid users)
        DB::table('notifications')->truncate();

        // Alter column type to uuid
        DB::statement('ALTER TABLE notifications ALTER COLUMN notifiable_id TYPE uuid USING NULL');

        // Recreate index
        Schema::table('notifications', function ($table) {
            $table->index(['notifiable_type', 'notifiable_id']);
        });
    }

    public function down(): void
    {
        // Not reversible without data loss
    }
};
