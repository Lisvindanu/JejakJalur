<?php

namespace App\Services;

use App\Models\Destinasi;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class DestinasiService
{
    private const JUMLAH_PER_HALAMAN = 12;

    private const DIREKTORI_FOTO = 'destinasi';

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
            $data['foto'] = $foto->store(self::DIREKTORI_FOTO, 'public');
        }

        return Destinasi::create($data);
    }

    public function perbaruiDestinasi(Destinasi $destinasi, array $data, ?UploadedFile $fotoBarу = null): Destinasi
    {
        if ($fotoBarу) {
            $this->hapusFotoLama($destinasi->foto);
            $data['foto'] = $fotoBarу->store(self::DIREKTORI_FOTO, 'public');
        }

        $destinasi->update($data);

        return $destinasi->fresh();
    }

    public function hapusDestinasi(Destinasi $destinasi): void
    {
        $this->hapusFotoLama($destinasi->foto);
        $destinasi->delete();
    }

    private function hapusFotoLama(?string $pathFoto): void
    {
        if ($pathFoto && Storage::disk('public')->exists($pathFoto)) {
            Storage::disk('public')->delete($pathFoto);
        }
    }
}
