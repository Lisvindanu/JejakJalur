<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destinasi;
use App\Models\Kota;
use App\Models\Stasiun;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function tampilkan(): Response
    {
        $statistik = [
            'jumlah_kota' => Kota::count(),
            'jumlah_stasiun' => Stasiun::count(),
            'jumlah_destinasi' => Destinasi::count(),
            'destinasi_verified' => Destinasi::where('is_verified', true)->count(),
            'jumlah_pengguna' => User::count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'statistik' => $statistik,
        ]);
    }
}
