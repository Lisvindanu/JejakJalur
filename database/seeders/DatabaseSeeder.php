<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            KotaSeeder::class,
            StasiunSeeder::class,
            KoneksiStasiunSeeder::class,
            DestinasiSeeder::class,
            UserSeeder::class,
        ]);
    }
}
