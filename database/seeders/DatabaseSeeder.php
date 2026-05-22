<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            KotaSeeder::class,
            KotaFotoSeeder::class,
            StasiunSeeder::class,
            StasiunLatLngSeeder::class,
            KoneksiStasiunSeeder::class,
            DestinasiSeeder::class,
            DestinasiKota2Seeder::class,
            UlasanSeeder::class,
        ]);
    }
}
