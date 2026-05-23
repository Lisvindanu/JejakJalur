<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DestinasiSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('destinasi')->exists()) {
            return;
        }

        DB::unprepared(file_get_contents(database_path('data/destinasi.sql')));
    }
}
