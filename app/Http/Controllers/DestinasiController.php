<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestinasiSubmissionRequest;
use App\Models\Destinasi;
use App\Models\Stasiun;
use App\Models\UlasanLike;
use App\Services\DestinasiService;
use App\Services\KotaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
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
        $filter = $request->only(['kata_kunci', 'kota_id', 'stasiun_id', 'kategori', 'urut', 'min_rating', 'harga']);

        $destinasi = $this->destinasiService->daftarDestinasiTerfilter($filter, hanyaVerified: true);
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
        // Destinasi belum diverifikasi hanya boleh dilihat pemiliknya / admin.
        if (! $destinasi->is_verified) {
            $user = auth()->user();
            abort_unless($user && ($user->is_admin || $destinasi->user_id === $user->id), 404);
        }

        // Increment view counter tanpa menyentuh timestamps
        $destinasi->incrementQuietly('views');

        $destinasiLengkap = $this->destinasiService->detailDestinasi($destinasi);

        $isBookmarked = auth()->check()
            && auth()->user()->bookmarks()->where('destinasi_id', $destinasi->id)->exists();

        $isVisited = auth()->check()
            && auth()->user()->kunjungan()->where('destinasi_id', $destinasi->id)->exists();

        $likedUlasanIds = auth()->check()
            ? UlasanLike::where('user_id', auth()->id())
                ->whereIn('ulasan_id', $destinasiLengkap->ulasan->pluck('id'))
                ->pluck('ulasan_id')
                ->toArray()
            : [];

        return Inertia::render('Destinasi/Detail', [
            'destinasi' => $destinasiLengkap,
            'is_bookmarked' => $isBookmarked,
            'is_visited' => $isVisited,
            'destinasi_terkait' => $this->destinasiService->destinasiTerkait($destinasi),
            'liked_ulasan_ids' => $likedUlasanIds,
        ]);
    }

    public function milikSaya(): Response
    {
        $destinasi = $this->destinasiService->daftarDestinasiMilikUser(auth()->id());

        return Inertia::render('Destinasi/MilikSaya', [
            'destinasi' => $destinasi,
        ]);
    }

    public function formulir(): Response
    {
        return Inertia::render('Destinasi/Formulir', [
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
        ]);
    }

    public function simpan(DestinasiSubmissionRequest $request): RedirectResponse
    {
        $this->destinasiService->buatDestinasiOlehUser(
            userId: auth()->id(),
            data: $request->safe()->except('foto'),
            foto: $request->file('foto'),
        );

        return redirect()->route('destinasi.milik-saya')
            ->with('sukses', 'Destinasi berhasil dikirim dan menunggu verifikasi admin.');
    }

    public function formulirEdit(Destinasi $destinasi): Response
    {
        $this->pastikanPemilikDanBelumVerified($destinasi);

        return Inertia::render('Destinasi/Formulir', [
            'destinasi' => $destinasi,
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
        ]);
    }

    private function daftarStasiunUntukDropdown(): Collection
    {
        return Stasiun::with('kota:id,nama')
            ->orderBy('nama')
            ->get(['id', 'nama', 'kota_id']);
    }

    public function perbarui(DestinasiSubmissionRequest $request, Destinasi $destinasi): RedirectResponse
    {
        $this->pastikanPemilikDanBelumVerified($destinasi);

        $this->destinasiService->perbaruiDestinasi(
            destinasi: $destinasi,
            data: $request->safe()->except('foto'),
            fotoBaru: $request->file('foto'),
        );

        return redirect()->route('destinasi.milik-saya')
            ->with('sukses', 'Destinasi berhasil diperbarui.');
    }

    public function hapus(Destinasi $destinasi): RedirectResponse
    {
        $this->pastikanPemilikDanBelumVerified($destinasi);

        $this->destinasiService->hapusDestinasi($destinasi);

        return redirect()->route('destinasi.milik-saya')
            ->with('sukses', 'Destinasi berhasil dihapus.');
    }

    private function pastikanPemilikDanBelumVerified(Destinasi $destinasi): void
    {
        abort_unless($destinasi->user_id === auth()->id(), 403, 'Bukan pemilik destinasi.');
        abort_if($destinasi->is_verified, 403, 'Destinasi sudah diverifikasi, hubungi admin untuk perubahan.');
    }
}
