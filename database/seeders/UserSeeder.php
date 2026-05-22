<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@jejakjalur.id'],
            [
                'nama' => 'Admin JejakJalur',
                'name' => 'Admin JejakJalur',
                'email' => 'admin@jejakjalur.id',
                'password' => Hash::make('admin123!'),
                'is_admin' => true,
                'consent_given' => true,
            ]
        );

        User::firstOrCreate(
            ['email' => 'demo@jejakjalur.id'],
            [
                'nama' => 'Pengguna Demo',
                'name' => 'Pengguna Demo',
                'email' => 'demo@jejakjalur.id',
                'password' => Hash::make('demo123!'),
                'is_admin' => false,
                'consent_given' => true,
            ]
        );
    }
}
