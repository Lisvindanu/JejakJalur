<?php

namespace App\Http\Controllers;

use App\Services\DestinasiService;
use App\Services\KotaService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private DestinasiService $destinasiService,
        private KotaService $kotaService,
    ) {}

    public function tampilkan(): Response
    {
        $destinasiFeatured = $this->destinasiService->destinasiFeatured(6);
        $semuaKota = $this->kotaService->semuaKotaDenganStasiun();
        $destinasiPopuler = $this->destinasiService->destinasiPopulerBulanIni(6);

        return Inertia::render('welcome', [
            'destinasiFeatured' => $destinasiFeatured,
            'semuaKota' => $semuaKota,
            'destinasiPopuler' => $destinasiPopuler,
        ]);
    }
}
