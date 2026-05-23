<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KoneksiStasiunSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('koneksi_stasiun')->exists()) {
            return;
        }

        DB::unprepared(file_get_contents(database_path('data/koneksi_stasiun.sql')));
    }
}
