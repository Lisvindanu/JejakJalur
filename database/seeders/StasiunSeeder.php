<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StasiunSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('stasiun')->exists()) {
            return;
        }

        DB::unprepared(file_get_contents(database_path('data/stasiun.sql')));
    }
}
