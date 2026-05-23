<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KotaSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('kota')->exists()) {
            return;
        }

        DB::unprepared(file_get_contents(database_path('data/kota.sql')));
    }
}
