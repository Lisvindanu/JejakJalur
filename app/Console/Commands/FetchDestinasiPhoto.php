<?php

namespace App\Console\Commands;

use App\Models\Destinasi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchDestinasiPhoto extends Command
{
    protected $signature = 'destinasi:fetch-foto
                            {--limit=50 : Max destinasi to process}
                            {--dry-run : Preview without saving}';

    protected $description = 'Fetch and update foto for destinasi that have no photo using Tavily image search';

    private array $apiKeys = [];

    private int $currentKeyIndex = 0;

    public function handle(): int
    {
        foreach (['services.tavily.key', 'services.tavily.key_2', 'services.tavily.key_3'] as $configKey) {
            $key = config($configKey);
            if ($key) {
                $this->apiKeys[] = $key;
            }
        }

        if (empty($this->apiKeys)) {
            $this->error('No TAVILY_API_KEY set in .env');

            return 1;
        }

        $this->info('Using '.count($this->apiKeys).' API key(s).');

        $destinasis = Destinasi::with('stasiun.kota')
            ->whereNull('foto')
            ->limit((int) $this->option('limit'))
            ->get();

        if ($destinasis->isEmpty()) {
            $this->info('Semua destinasi sudah punya foto.');

            return 0;
        }

        $this->info("Memproses {$destinasis->count()} destinasi tanpa foto...\n");

        $updated = 0;
        $failed = 0;

        foreach ($destinasis as $destinasi) {
            $kota = $destinasi->stasiun?->kota?->nama ?? '';
            $query = trim("{$destinasi->nama} {$kota}");

            $this->line("→ {$destinasi->nama}".($kota ? " ({$kota})" : ''));

            $foto = $this->fetchImage($query);

            if (! $foto) {
                $this->warn('  Tidak ada gambar ditemukan.');
                $failed++;
                usleep(200000);

                continue;
            }

            $this->line("  + {$foto}");

            if (! $this->option('dry-run')) {
                $destinasi->update(['foto' => $foto]);
                $updated++;
            }

            usleep(300000);
        }

        $this->newLine();
        $this->info("Selesai. Updated: {$updated}, Tidak ditemukan: {$failed}");

        return 0;
    }

    private function fetchImage(string $query): ?string
    {
        $attempts = 0;

        while ($attempts < count($this->apiKeys)) {
            try {
                $response = Http::timeout(15)->post('https://api.tavily.com/search', [
                    'api_key' => $this->currentKey(),
                    'query' => $query,
                    'search_depth' => 'basic',
                    'include_images' => true,
                    'max_results' => 3,
                ]);

                if ($response->status() === 429 || $response->status() === 432) {
                    if (! $this->rotateKey()) {
                        return null;
                    }
                    $attempts++;

                    continue;
                }

                if ($response->successful()) {
                    $images = $response->json('images') ?? [];

                    // Filter valid image URLs
                    foreach ($images as $img) {
                        if (is_string($img) && str_starts_with($img, 'http') && preg_match('/\.(jpg|jpeg|png|webp)/i', $img)) {
                            return $img;
                        }
                    }

                    // Fallback: check per-result image field
                    foreach ($response->json('results') ?? [] as $result) {
                        $img = $result['image'] ?? null;
                        if ($img && str_starts_with($img, 'http')) {
                            return $img;
                        }
                    }
                }

                return null;
            } catch (\Exception $e) {
                $this->warn("  API error: {$e->getMessage()}");

                return null;
            }
        }

        return null;
    }

    private function currentKey(): string
    {
        return $this->apiKeys[$this->currentKeyIndex % count($this->apiKeys)];
    }

    private function rotateKey(): bool
    {
        $next = ($this->currentKeyIndex + 1) % count($this->apiKeys);
        if ($next === $this->currentKeyIndex) {
            return false;
        }
        $this->currentKeyIndex = $next;
        $this->warn('  Rate limited — rotating to key #'.($this->currentKeyIndex + 1));

        return true;
    }
}
