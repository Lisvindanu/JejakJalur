<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destinasi;
use App\Models\Stasiun;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportController extends Controller
{
    private const KATEGORI_VALID = ['Wisata', 'Kuliner', 'UMKM'];

    public function formulir(): Response
    {
        return Inertia::render('Admin/Destinasi/Import', [
            'contoh_csv' => $this->contohCsv(),
        ]);
    }

    public function proses(Request $request): RedirectResponse
    {
        $request->validate([
            'csv' => ['required', 'file', 'mimes:csv,txt', 'max:2048'],
        ]);

        $path = $request->file('csv')->getRealPath();
        $handle = fopen($path, 'r');

        if ($handle === false) {
            return back()->with('error', 'Gagal membuka file CSV.');
        }

        // Parse header row — normalize to lowercase, trim whitespace
        $rawHeader = fgetcsv($handle);
        if (! $rawHeader) {
            fclose($handle);

            return back()->with('error', 'File CSV kosong atau header tidak ditemukan.');
        }

        $header = array_map(fn ($h) => strtolower(trim((string) $h)), $rawHeader);

        // Build index map
        $idx = [];
        foreach (['nama', 'kategori', 'stasiun', 'alamat', 'deskripsi', 'telepon', 'website', 'harga_min', 'harga_max'] as $col) {
            $idx[$col] = array_search($col, $header, true);
        }

        if ($idx['nama'] === false || $idx['kategori'] === false || $idx['stasiun'] === false) {
            fclose($handle);

            return back()->with('error', 'Kolom wajib tidak ditemukan. Pastikan ada kolom: nama, kategori, stasiun.');
        }

        // Pre-load all stasiun for lookup
        $stasiunMap = Stasiun::pluck('id', 'nama')->toArray();
        $stasiunKodeMap = Stasiun::pluck('id', 'kode_stasiun')->toArray();

        $imported = 0;
        $skipped = 0;
        $errors = [];
        $rowNum = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $rowNum++;

            if (empty(array_filter($row))) {
                continue;
            }

            $nama = trim((string) ($row[$idx['nama']] ?? ''));
            $kategori = trim((string) ($row[$idx['kategori']] ?? ''));
            $stasiunCari = trim((string) ($row[$idx['stasiun']] ?? ''));

            if (empty($nama) || empty($kategori) || empty($stasiunCari)) {
                $errors[] = "Baris {$rowNum}: kolom nama/kategori/stasiun kosong.";
                $skipped++;

                continue;
            }

            if (! in_array($kategori, self::KATEGORI_VALID, true)) {
                $errors[] = "Baris {$rowNum}: kategori '{$kategori}' tidak valid (Wisata/Kuliner/UMKM).";
                $skipped++;

                continue;
            }

            // Stasiun lookup by name first, then by kode
            $stasiunId = $stasiunMap[$stasiunCari]
                ?? $stasiunKodeMap[strtoupper($stasiunCari)]
                ?? null;

            if (! $stasiunId) {
                $errors[] = "Baris {$rowNum}: stasiun '{$stasiunCari}' tidak ditemukan.";
                $skipped++;

                continue;
            }

            // Duplicate check by nama + stasiun_id
            if (Destinasi::where('nama', $nama)->where('stasiun_id', $stasiunId)->exists()) {
                $errors[] = "Baris {$rowNum}: '{$nama}' di stasiun ini sudah ada (duplikat, dilewati).";
                $skipped++;

                continue;
            }

            Destinasi::create([
                'stasiun_id' => $stasiunId,
                'user_id' => auth()->id(),
                'nama' => $nama,
                'kategori' => $kategori,
                'alamat' => $idx['alamat'] !== false ? trim((string) ($row[$idx['alamat']] ?? '')) : null,
                'deskripsi' => $idx['deskripsi'] !== false ? trim((string) ($row[$idx['deskripsi']] ?? '')) : null,
                'telepon' => $idx['telepon'] !== false ? trim((string) ($row[$idx['telepon']] ?? '')) ?: null : null,
                'website' => $idx['website'] !== false ? trim((string) ($row[$idx['website']] ?? '')) ?: null : null,
                'harga_min' => $idx['harga_min'] !== false ? (int) ($row[$idx['harga_min']] ?? 0) ?: null : null,
                'harga_max' => $idx['harga_max'] !== false ? (int) ($row[$idx['harga_max']] ?? 0) ?: null : null,
                'is_verified' => true,
            ]);

            $imported++;
        }

        fclose($handle);

        $pesan = "{$imported} destinasi berhasil diimpor, {$skipped} dilewati.";
        if (! empty($errors)) {
            return redirect()->route('admin.destinasi.import')
                ->with('sukses', $pesan)
                ->with('import_errors', array_slice($errors, 0, 20));
        }

        return redirect()->route('admin.destinasi.indeks')
            ->with('sukses', $pesan);
    }

    private function contohCsv(): string
    {
        return implode("\n", [
            'nama,kategori,stasiun,alamat,deskripsi,telepon,website,harga_min,harga_max',
            'Warung Makan Bu Sari,Kuliner,Gambir,"Jl. Medan Merdeka No.1","Warung tradisional dengan menu sederhana",081234567890,,15000,35000',
            'Alun-alun Kidul,Wisata,Yogyakarta,"Jl. Alun-Alun Kidul","Alun-alun bersejarah di pusat kota",,https://example.com,0,0',
        ]);
    }
}
