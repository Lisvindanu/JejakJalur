<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Destinasi;
use App\Models\Ulasan;
use App\Models\User;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function destinasi(): StreamedResponse
    {
        $rows = Destinasi::with('stasiun.kota')
            ->orderByDesc('created_at')
            ->get();

        return $this->csvResponse('destinasi', ['ID', 'Nama', 'Kategori', 'Stasiun', 'Kota', 'Rating', 'Terverifikasi', 'Dibuat'], $rows->map(fn (Destinasi $d) => [
            $d->id,
            $d->nama,
            $d->kategori,
            $d->stasiun?->nama,
            $d->stasiun?->kota?->nama,
            $d->rating,
            $d->is_verified ? 'Ya' : 'Tidak',
            $d->created_at->format('Y-m-d'),
        ])->all());
    }

    public function ulasan(): StreamedResponse
    {
        $rows = Ulasan::with(['user', 'destinasi'])
            ->orderByDesc('created_at')
            ->get();

        return $this->csvResponse('ulasan', ['ID', 'Pengguna', 'Destinasi', 'Rating', 'Judul', 'Konten', 'Dibuat'], $rows->map(fn (Ulasan $u) => [
            $u->id,
            $u->user?->name,
            $u->destinasi?->nama,
            $u->rating,
            $u->judul,
            $u->konten,
            $u->created_at->format('Y-m-d'),
        ])->all());
    }

    public function pengguna(): StreamedResponse
    {
        $rows = User::orderByDesc('created_at')->get();

        return $this->csvResponse('pengguna', ['ID', 'Nama', 'Email', 'Admin', 'Bergabung'], $rows->map(fn (User $u) => [
            $u->id,
            $u->name,
            $u->email,
            $u->is_admin ? 'Ya' : 'Tidak',
            $u->created_at->format('Y-m-d'),
        ])->all());
    }

    private function csvResponse(string $nama, array $headers, array $rows): StreamedResponse
    {
        $filename = "{$nama}-".now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($headers, $rows) {
            $handle = fopen('php://output', 'w');
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF)); // BOM UTF-8
            fputcsv($handle, $headers);
            foreach ($rows as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
