<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use App\Services\DestinasiService;
use App\Services\KotaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinasiController extends Controller
{
    public function __construct(
        private DestinasiService $destinasiService,
        private KotaService $kotaService,
    ) {}

    public function indeks(Request $request): Response
    {
        $filter = $request->only(['kata_kunci', 'kota_id', 'stasiun_id', 'kategori']);

        $destinasi = $this->destinasiService->daftarDestinasiTerfilter($filter);
        $semuaKota = $this->kotaService->semuaKotaDenganStasiun();

        $bookmarkedIds = auth()->check()
            ? auth()->user()->bookmarks()->pluck('destinasi_id')->toArray()
            : [];

        return Inertia::render('Destinasi/Indeks', [
            'destinasi' => $destinasi,
            'semuaKota' => $semuaKota,
            'filter' => $filter,
            'bookmarked_ids' => $bookmarkedIds,
        ]);
    }

    public function detail(Destinasi $destinasi): Response
    {
        $destinasiLengkap = $this->destinasiService->detailDestinasi($destinasi);

        $isBookmarked = auth()->check()
            && auth()->user()->bookmarks()->where('destinasi_id', $destinasi->id)->exists();

        return Inertia::render('Destinasi/Detail', [
            'destinasi' => $destinasiLengkap,
            'is_bookmarked' => $isBookmarked,
        ]);
    }
}
