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

    private string $apiKey;

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

    public function handle(): int
    {
        $this->apiKey = config('services.tavily.key');

        if (! $this->apiKey) {
            $this->error('TAVILY_API_KEY not set in .env');

            return 1;
        }

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

                if (! $nama || strlen($deskripsi) < 30) {
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

            usleep(500000);
        }

        $this->newLine();
        $this->info("Selesai. Total destinasi ditambahkan: {$totalInserted}");

        return 0;
    }

    private function searchTavily(string $stasiun, string $kota): array
    {
        $queries = [
            "tempat wisata menarik dekat Stasiun {$stasiun} {$kota} Indonesia",
            "kuliner khas {$kota} dekat Stasiun {$stasiun}",
            "UMKM kerajinan oleh-oleh khas {$kota} dekat stasiun kereta",
        ];

        $allResults = [];
        $allImages = [];

        foreach ($queries as $q) {
            try {
                $response = Http::timeout(15)->post('https://api.tavily.com/search', [
                    'api_key' => $this->apiKey,
                    'query' => $q,
                    'search_depth' => 'basic',
                    'include_images' => true,
                    'max_results' => 3,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $allResults = array_merge($allResults, $data['results'] ?? []);
                    $allImages = array_merge($allImages, $data['images'] ?? []);
                }
            } catch (\Exception $e) {
                $this->warn("  API error: {$e->getMessage()}");
            }
        }

        // Distribute images round-robin to results
        $results = array_slice($allResults, 0, 9);
        foreach ($results as $i => &$result) {
            $result['image'] = $allImages[$i] ?? null;
        }

        return $results;
    }

    private function extractNama(array $item): string
    {
        $title = $item['title'] ?? '';
        $title = preg_split('/\s[-|]\s/', $title)[0];

        return trim(substr($title, 0, 100));
    }

    private function extractDeskripsi(array $item): string
    {
        $content = $item['content'] ?? $item['snippet'] ?? '';

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
