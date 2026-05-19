<?php

namespace App\Http\Controllers;

use App\Models\Stasiun;
use App\Services\RuteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    public function __construct(private RuteService $ruteService) {}

    public function tampilkan(Request $request): Response
    {
        $rute = null;
        $dariStasiun = null;
        $keStasiun = null;
        $tidakDitemukan = false;

        if ($request->filled('dari') && $request->filled('ke')) {
            $dariStasiun = Stasiun::with('kota')->find($request->input('dari'));
            $keStasiun = Stasiun::with('kota')->find($request->input('ke'));

            if ($dariStasiun && $keStasiun) {
                $rute = $this->ruteService->cariRute($dariStasiun->id, $keStasiun->id);
                $tidakDitemukan = $rute === null;
            }
        }

        return Inertia::render('rute/tampilkan', [
            'rute' => $rute,
            'dariStasiun' => $dariStasiun,
            'keStasiun' => $keStasiun,
            'tidakDitemukan' => $tidakDitemukan,
        ]);
    }

    public function cariStasiun(Request $request): JsonResponse
    {
        $query = $request->input('q', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $results = $this->ruteService->cariStasiun($query);

        return response()->json($results);
    }
}
