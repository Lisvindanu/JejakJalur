<?php

namespace App\Services;

use App\Models\Destinasi;
use App\Models\DestinasiGaleri;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

class DestinasiService
{
    private const JUMLAH_PER_HALAMAN = 12;

    private const DIREKTORI_FOTO = 'destinasi';

    public function __construct(
        private FotoService $fotoService,
        private JejakAiService $jejakAi,
    ) {}

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

        if (! empty($filter['min_rating'])) {
            $query->where('rating', '>=', (float) $filter['min_rating']);
        }

        if (! empty($filter['harga'])) {
            match ($filter['harga']) {
                'gratis' => $query->where('harga_min', 0),
                'berbayar' => $query->where('harga_min', '>', 0),
                default => null,
            };
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
            'galeri',
            'ulasan' => fn ($q) => $q->where('is_hidden', false)->withCount('likes')->latest(),
            'ulasan.user',
            'ulasan.komentar.user',
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

    public function destinasiBaru(int $jumlah = 6): Collection
    {
        return Destinasi::with('stasiun.kota')
            ->verified()
            ->where('created_at', '>=', now()->subDays(30))
            ->orderByDesc('created_at')
            ->limit($jumlah)
            ->get();
    }

    public function destinasiTrending(int $jumlah = 6): Collection
    {
        $cutoff = now()->subDays(7)->toDateTimeString();

        return Destinasi::with('stasiun.kota')
            ->verified()
            ->orderByRaw('(
                (SELECT COUNT(*) FROM ulasan WHERE destinasi.id = ulasan.destinasi_id AND ulasan.created_at >= ?) * 0.5 +
                (SELECT COUNT(*) FROM bookmarks WHERE destinasi.id = bookmarks.destinasi_id AND bookmarks.created_at >= ?) * 0.3 +
                (SELECT COUNT(*) FROM kunjungan WHERE destinasi.id = kunjungan.destinasi_id AND kunjungan.created_at >= ?) * 0.2
            ) DESC', [$cutoff, $cutoff, $cutoff])
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

    /**
     * @param  UploadedFile[]  $files
     */
    public function simpanGaleri(Destinasi $destinasi, array $files): void
    {
        $urutan = $destinasi->galeri()->max('urutan') ?? -1;
        foreach ($files as $file) {
            $url = $this->fotoService->simpan($file, self::DIREKTORI_FOTO);
            DestinasiGaleri::create(['destinasi_id' => $destinasi->id, 'url' => $url, 'urutan' => ++$urutan]);
        }
    }

    public function hapusGaleriFoto(DestinasiGaleri $foto): void
    {
        $foto->delete();
    }

    public function buatDestinasi(array $data, ?UploadedFile $foto = null): Destinasi
    {
        if ($foto) {
            $data['foto'] = $this->fotoService->simpan($foto, self::DIREKTORI_FOTO);
        }

        $destinasi = Destinasi::create($data);
        $this->terapkanTagAi($destinasi);

        return $destinasi;
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

        // Regenerate tags if description changed
        if (isset($data['deskripsi'])) {
            $this->terapkanTagAi($destinasi->fresh());
        }

        return $destinasi->fresh();
    }

    private function terapkanTagAi(Destinasi $destinasi): void
    {
        if (empty($destinasi->deskripsi)) {
            return;
        }

        try {
            $tags = $this->jejakAi->sarankanTag(
                $destinasi->nama,
                $destinasi->deskripsi,
                $destinasi->kategori,
            );

            if (! empty($tags)) {
                $destinasi->update(['tags' => $tags]);
            }
        } catch (\Exception) {
            // Non-critical — tags stay null if AI unavailable
        }
    }

    public function hapusDestinasi(Destinasi $destinasi): void
    {
        // Tidak hapus file dari R2 — content-addressed storage, bisa dipakai destinasi lain
        $destinasi->delete();
    }
}
