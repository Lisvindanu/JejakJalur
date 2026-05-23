<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
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
        $destinasiBaru = $this->destinasiService->destinasiBaru(6);

        $topReviewer = Ulasan::selectRaw(
            'user_id, COUNT(*) as jumlah_ulasan, ROUND(AVG(rating)::numeric, 1) as rata_rating'
        )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('user_id')
            ->orderByDesc('jumlah_ulasan')
            ->orderByDesc('rata_rating')
            ->limit(10)
            ->with('user:id,name,avatar')
            ->get()
            ->map(fn ($row) => [
                'id' => $row->user_id,
                'name' => $row->user->name,
                'avatar' => $row->user->avatar,
                'jumlah_ulasan' => $row->jumlah_ulasan,
                'rata_rating' => $row->rata_rating,
            ]);

        return Inertia::render('welcome', [
            'destinasiFeatured' => $destinasiFeatured,
            'semuaKota' => $semuaKota,
            'destinasiPopuler' => $destinasiPopuler,
            'destinasiBaru' => $destinasiBaru,
            'topReviewer' => $topReviewer,
        ]);
    }
}
