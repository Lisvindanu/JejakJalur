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

    public function daftarDestinasiTerfilter(array $filter): LengthAwarePaginator
    {
        $query = Destinasi::with('stasiun.kota');

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

        return $query->orderByDesc('rating')->paginate(self::JUMLAH_PER_HALAMAN)->withQueryString();
    }

    public function detailDestinasi(Destinasi $destinasi): Destinasi
    {
        return $destinasi->load([
            'stasiun.kota',
            'ulasan.user',
        ]);
    }

    public function destinasiFeatured(int $jumlah = 6): Collection
    {
        return Destinasi::with('stasiun.kota')
            ->where('is_verified', true)
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
