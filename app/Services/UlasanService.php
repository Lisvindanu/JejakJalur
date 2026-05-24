<?php

namespace App\Services;

use App\Models\Destinasi;
use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\UploadedFile;

class UlasanService
{
    public function __construct(
        private FotoService $fotoService,
        private JejakAiService $jejakAi,
    ) {}

    /** @param UploadedFile[] $fotoFiles */
    public function buatUlasan(array $data, User $pengguna, Destinasi $destinasi, array $fotoFiles = []): Ulasan
    {
        $fotoArr = array_map(
            fn (UploadedFile $f) => $this->fotoService->simpan($f, 'ulasan'),
            $fotoFiles,
        );

        $ulasan = $destinasi->ulasan()->create([
            'user_id' => $pengguna->id,
            'judul' => $data['judul'] ?? null,
            'konten' => $data['konten'],
            'rating' => $data['rating'],
            'foto' => $fotoArr ?: null,
        ]);

        try {
            $sentiment = $this->jejakAi->analisisSentimen($ulasan->konten, (float) $ulasan->rating);
            $ulasan->update(['sentiment' => $sentiment]);
        } catch (\Exception) {
            // Non-critical — sentiment stays null if AI unavailable
        }

        return $ulasan->fresh();
    }

    public function perbaruiUlasan(Ulasan $ulasan, array $data, User $pengguna): Ulasan
    {
        $this->pastikanPemilikUlasan($ulasan, $pengguna);

        $ulasan->update([
            'judul' => $data['judul'] ?? $ulasan->judul,
            'konten' => $data['konten'],
            'rating' => $data['rating'],
        ]);

        return $ulasan->fresh();
    }

    public function hapusUlasan(Ulasan $ulasan, User $pengguna): void
    {
        $this->pastikanPemilikUlasan($ulasan, $pengguna);
        $ulasan->delete();
    }

    private function pastikanPemilikUlasan(Ulasan $ulasan, User $pengguna): void
    {
        if ($ulasan->user_id !== $pengguna->id) {
            throw new AuthorizationException('Kamu tidak berhak mengubah ulasan ini.');
        }
    }
}
