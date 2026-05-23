<?php

namespace App\Services;

use App\Models\Destinasi;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

class DestinasiService
{
    private const JUMLAH_PER_HALAMAN = 12;

    private const DIREKTORI_FOTO = 'destinasi';

    public function __construct(private FotoService $fotoService) {}

    public function daftarDestinasiTerfilter(array $filter, bool $hanyaVerified = false): LengthAwarePaginator
    {
        $query = Destinasi::with('stasiun.kota')->withCount('ulasan');

        if ($hanyaVerified) {
            $query->verified();
        }

        if (! empty($filter['kata_kunci'])) {
            $query->search($filter['kata_kunci']);
        }

        if (! empty($filter['stasiun_id'])) {
            $query->where('stasiun_id', $filter['stasiun_id']);
        }

        if (! empty($filter['kategori'])) {
            $query->where('kategori', $filter['kategori']);
        }

        if (! empty($filter['kota_id'])) {
            $query->whereHas('stasiun', fn ($q) => $q->where('kota_id', $filter['kota_id']));
        }

        match ($filter['urut'] ?? 'rating') {
            'terbaru' => $query->orderByDesc('created_at'),
            'ulasan' => $query->orderByDesc('ulasan_count'),
            default => $query->orderByDesc('rating'),
        };

        return $query->paginate(self::JUMLAH_PER_HALAMAN)->withQueryString();
    }

    public function destinasiTerkait(Destinasi $destinasi, int $jumlah = 4): Collection
    {
        return Destinasi::with('stasiun.kota')
            ->verified()
            ->where('stasiun_id', $destinasi->stasiun_id)
            ->where('id', '!=', $destinasi->id)
            ->orderByDesc('rating')
            ->limit($jumlah)
            ->get();
    }

    public function detailDestinasi(Destinasi $destinasi): Destinasi
    {
        return $destinasi->load([
            'stasiun.kota',
            'ulasan' => fn ($q) => $q->withCount('likes')->latest(),
            'ulasan.user',
        ]);
    }

    public function destinasiPopulerBulanIni(int $jumlah = 6): Collection
    {
        return Destinasi::with('stasiun.kota')
            ->verified()
            ->whereHas('ulasan', fn ($q) => $q->where('created_at', '>=', now()->subDays(30)))
            ->withCount(['ulasan as ulasan_bulan_ini' => fn ($q) => $q->where('created_at', '>=', now()->subDays(30))])
            ->orderByDesc('ulasan_bulan_ini')
            ->limit($jumlah)
            ->get();
    }

    public function destinasiFeatured(int $jumlah = 6): Collection
    {
        return Destinasi::with('stasiun.kota')
            ->verified()
            ->orderByDesc('rating')
            ->limit($jumlah)
            ->get();
    }

    public function buatDestinasi(array $data, ?UploadedFile $foto = null): Destinasi
    {
        if ($foto) {
            $data['foto'] = $this->fotoService->simpan($foto, self::DIREKTORI_FOTO);
        }

        return Destinasi::create($data);
    }

    /**
     * Submission destinasi oleh user biasa. Auto set user_id & is_verified=false.
     */
    public function buatDestinasiOlehUser(string $userId, array $data, ?UploadedFile $foto = null): Destinasi
    {
        $data['user_id'] = $userId;
        $data['is_verified'] = false;

        return $this->buatDestinasi($data, $foto);
    }

    public function daftarDestinasiMilikUser(string $userId): LengthAwarePaginator
    {
        return Destinasi::with('stasiun.kota')
            ->milikUser($userId)
            ->orderByDesc('created_at')
            ->paginate(self::JUMLAH_PER_HALAMAN)
            ->withQueryString();
    }

    public function perbaruiDestinasi(Destinasi $destinasi, array $data, ?UploadedFile $fotoBaru = null): Destinasi
    {
        if ($fotoBaru) {
            $data['foto'] = $this->fotoService->simpan($fotoBaru, self::DIREKTORI_FOTO);
        }

        $destinasi->update($data);

        return $destinasi->fresh();
    }

    public function hapusDestinasi(Destinasi $destinasi): void
    {
        // Tidak hapus file dari R2 — content-addressed storage, bisa dipakai destinasi lain
        $destinasi->delete();
    }
}
