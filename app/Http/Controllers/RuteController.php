<?php

namespace App\Http\Controllers;

use App\Services\KotaService;
use App\Services\StasiunService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    public function __construct(
        private KotaService $kotaService,
        private StasiunService $stasiunService,
    ) {}

    public function tampilkan(): Response
    {
        return Inertia::render('Rute/Tampilkan', [
            'semuaKota' => $this->kotaService->semuaKotaDenganStasiun(),
        ]);
    }

    public function cariStasiun(Request $request): JsonResponse
    {
        $stasiun = $this->stasiunService->semuaStasiunDenganKota()
            ->filter(fn ($s) => str_contains(strtolower($s->nama), strtolower($request->string('q'))))
            ->values();

        return response()->json($stasiun);
    }
}
