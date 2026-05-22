<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FotoService
{
    private const DISK = 'r2';

    /**
     * Upload foto ke R2 dengan content hashing untuk deduplication.
     * File dengan konten identik menghasilkan hash yang sama → tidak di-upload ulang.
     */
    public function simpan(UploadedFile $file, string $direktori): string
    {
        $hash = hash('sha256', file_get_contents($file->getRealPath()));
        $ekstensi = strtolower($file->getClientOriginalExtension());
        $path = "{$direktori}/{$hash}.{$ekstensi}";

        if (! Storage::disk(self::DISK)->exists($path)) {
            Storage::disk(self::DISK)->put($path, file_get_contents($file->getRealPath()), 'public');
        }

        return $path;
    }

    public function url(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk(self::DISK)->url($path);
    }
}
