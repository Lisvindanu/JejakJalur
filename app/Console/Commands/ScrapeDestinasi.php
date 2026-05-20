<?php

namespace App\Console\Commands;

use App\Models\Destinasi;
use App\Models\Stasiun;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ScrapeDestinasi extends Command
{
    protected $signature = 'destinasi:scrape
                            {--kota= : Filter by kota name (partial match)}
                            {--stasiun= : Filter by kode_stasiun}
                            {--limit=10 : Max stasiun to process}
                            {--min=0 : Only process stasiun with destinasi count <= this value}
                            {--dry-run : Preview without saving}';

    protected $description = 'Scrape destinasi data from Tavily for stasiun that have few or no destinasi';

    /** Multiple API keys — rotated on 429 or error */
    private array $apiKeys = [];

    private int $currentKeyIndex = 0;

    private array $kategoriMap = [
        'museum' => 'Wisata',
        'taman' => 'Wisata',
        'pantai' => 'Wisata',
        'gunung' => 'Wisata',
        'wisata' => 'Wisata',
        'heritage' => 'Wisata',
        'monumen' => 'Wisata',
        'candi' => 'Wisata',
        'masjid' => 'Wisata',
        'gereja' => 'Wisata',
        'danau' => 'Wisata',
        'air terjun' => 'Wisata',
        'kebun' => 'Wisata',
        'resto' => 'Kuliner',
        'restoran' => 'Kuliner',
        'warung' => 'Kuliner',
        'kuliner' => 'Kuliner',
        'mie' => 'Kuliner',
        'soto' => 'Kuliner',
        'nasi' => 'Kuliner',
        'sate' => 'Kuliner',
        'bakso' => 'Kuliner',
        'kafe' => 'Kuliner',
        'cafe' => 'Kuliner',
        'batik' => 'UMKM',
        'kerajinan' => 'UMKM',
        'pasar' => 'UMKM',
        'oleh-oleh' => 'UMKM',
        'toko' => 'UMKM',
        'sentra' => 'UMKM',
        'galeri' => 'UMKM',
    ];

    /** Patterns that indicate a listicle/article, not a place name */
    private array $junkPatterns = [
        '/^\d+[\s.]+/u',                        // starts with number: "7 Tempat..."
        '/rekomendasi/iu',
        '/terbaik/iu',
        '/terdekat/iu',
        '/dekat stasiun/iu',
        '/dekat bandara/iu',
        '/harga tiket/iu',
        '/buka \d+ jam/iu',
        '/tempat makan/iu',
        '/tempat wisata/iu',
        '/objek wisata/iu',
        '/hotel di dekat/iu',
        '/hotel dekat/iu',
        '/penginapan dekat/iu',
        '/kafe.*stasiun/iu',
        '/instagram/iu',
        '/Title:/u',
        '/https?:\/\//u',
    ];

    public function handle(): int
    {
        // Support multiple keys: TAVILY_API_KEY, TAVILY_API_KEY_2, TAVILY_API_KEY_3 ...
        foreach (['TAVILY_API_KEY', 'TAVILY_API_KEY_2', 'TAVILY_API_KEY_3'] as $envKey) {
            $key = env($envKey);
            if ($key) {
                $this->apiKeys[] = $key;
            }
        }

        if (empty($this->apiKeys)) {
            $this->error('No TAVILY_API_KEY set in .env');

            return 1;
        }

        $this->info('Using '.count($this->apiKeys).' API key(s).');

        $minDestinasi = (int) $this->option('min');
        $limit = (int) $this->option('limit');

        $subquery = '(select count(*) from "destinasi" where "stasiun"."id" = "destinasi"."stasiun_id")';

        $query = Stasiun::with('kota')
            ->selectRaw("*, {$subquery} as destinasi_count")
            ->whereRaw("{$subquery} <= ?", [$minDestinasi]);

        if ($this->option('kota')) {
            $query->whereHas('kota', fn ($q) => $q->where('nama', 'ILIKE', '%'.$this->option('kota').'%'));
        }

        if ($this->option('stasiun')) {
            $query->where('kode_stasiun', $this->option('stasiun'));
        }

        $stasiuns = $query->orderBy('destinasi_count')->limit($limit)->get();

        if ($stasiuns->isEmpty()) {
            $this->info('Tidak ada stasiun yang memenuhi kriteria.');

            return 0;
        }

        $this->info("Memproses {$stasiuns->count()} stasiun...");
        $totalInserted = 0;

        foreach ($stasiuns as $stasiun) {
            $this->line("\n→ [{$stasiun->kode_stasiun}] {$stasiun->nama} ({$stasiun->kota->nama})");

            $results = $this->searchTavily($stasiun->nama, $stasiun->kota->nama);

            if (empty($results)) {
                $this->warn('  Tidak ada hasil dari Tavily.');

                continue;
            }

            foreach ($results as $item) {
                $nama = $this->extractNama($item);
                $deskripsi = $this->extractDeskripsi($item);
                $foto = $item['image'] ?? null;
                $kategori = $this->guessKategori($nama, $deskripsi);

                if (! $nama || $this->isJunk($nama) || strlen($deskripsi) < 40) {
                    $this->line("  - SKIP: {$nama}");

                    continue;
                }

                $this->line("  + {$nama} [{$kategori}]");

                if (! $this->option('dry-run')) {
                    Destinasi::firstOrCreate(
                        ['nama' => $nama],
                        [
                            'stasiun_id' => $stasiun->id,
                            'deskripsi' => $deskripsi,
                            'foto' => $foto,
                            'kategori' => $kategori,
                            'alamat' => "{$stasiun->nama}, {$stasiun->kota->nama}",
                            'is_verified' => false,
                            'rating' => round(mt_rand(38, 47) / 10, 1),
                        ]
                    );
                    $totalInserted++;
                }
            }

            usleep(300000);
        }

        $this->newLine();
        $this->info("Selesai. Total destinasi ditambahkan: {$totalInserted}");

        return 0;
    }

    private function currentKey(): string
    {
        return $this->apiKeys[$this->currentKeyIndex % count($this->apiKeys)];
    }

    private function rotateKey(): bool
    {
        $next = ($this->currentKeyIndex + 1) % count($this->apiKeys);
        if ($next === $this->currentKeyIndex) {
            return false; // only one key, can't rotate
        }
        $this->currentKeyIndex = $next;
        $this->warn('  Rate limited — rotating to key #'.($this->currentKeyIndex + 1));

        return true;
    }

    private function searchTavily(string $stasiun, string $kota): array
    {
        $queries = [
            "wisata kuliner UMKM terpopuler di {$kota} dekat stasiun kereta {$stasiun}",
            "makanan khas {$kota} enak terkenal wajib coba",
            "tempat belanja oleh-oleh produk lokal UMKM {$kota}",
        ];

        $allResults = [];
        $allImages = [];

        foreach ($queries as $q) {
            $attempts = 0;
            while ($attempts < count($this->apiKeys)) {
                try {
                    $response = Http::timeout(15)->post('https://api.tavily.com/search', [
                        'api_key' => $this->currentKey(),
                        'query' => $q,
                        'search_depth' => 'basic',
                        'include_images' => true,
                        'max_results' => 3,
                    ]);

                    if ($response->status() === 429) {
                        if (! $this->rotateKey()) {
                            break;
                        }
                        $attempts++;

                        continue;
                    }

                    if ($response->successful()) {
                        $data = $response->json();
                        $allResults = array_merge($allResults, $data['results'] ?? []);
                        $allImages = array_merge($allImages, $data['images'] ?? []);
                    }
                    break;
                } catch (\Exception $e) {
                    $this->warn("  API error: {$e->getMessage()}");
                    break;
                }
            }
        }

        // Distribute images round-robin to results
        $results = array_slice($allResults, 0, 9);
        foreach ($results as $i => &$result) {
            $result['image'] = $allImages[$i] ?? null;
        }

        return $results;
    }

    private function isJunk(string $nama): bool
    {
        foreach ($this->junkPatterns as $pattern) {
            if (preg_match($pattern, $nama)) {
                return true;
            }
        }

        // Too long = probably a headline, not a place name
        if (strlen($nama) > 80) {
            return true;
        }

        return false;
    }

    private function extractNama(array $item): string
    {
        $title = $item['title'] ?? '';

        // Strip site name suffix after " - " or " | " or " : "
        $title = preg_split('/\s[-|:]\s/', $title)[0];

        // Strip trailing ellipsis
        $title = rtrim($title, '.');
        $title = preg_replace('/\s*\.\.\.$/', '', $title);

        return trim(substr($title, 0, 100));
    }

    private function extractDeskripsi(array $item): string
    {
        $content = $item['content'] ?? $item['snippet'] ?? '';

        // Remove markdown-style artifacts and "Title: ..." prefix
        $content = preg_replace('/^Title:.*?#\s*/su', '', $content);
        $content = preg_replace('/\*\*([^*]+)\*\*/u', '$1', $content);
        $content = preg_replace('/https?:\/\/\S+/u', '', $content);
        $content = preg_replace('/\s{2,}/u', ' ', $content);

        if (strlen($content) > 500) {
            $content = substr($content, 0, 500);
            $lastDot = strrpos($content, '.');
            if ($lastDot > 200) {
                $content = substr($content, 0, $lastDot + 1);
            }
        }

        return trim($content);
    }

    private function guessKategori(string $nama, string $deskripsi): string
    {
        $text = strtolower($nama.' '.$deskripsi);

        foreach ($this->kategoriMap as $keyword => $kategori) {
            if (str_contains($text, $keyword)) {
                return $kategori;
            }
        }

        return 'Wisata';
    }
}
