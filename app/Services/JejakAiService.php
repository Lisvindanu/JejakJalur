<?php

namespace App\Services;

use App\Models\Destinasi;
use App\Models\Kota;
use App\Models\Stasiun;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class JejakAiService
{
    private readonly EmbeddingService $embeddingService;

    private array $apiKeys = [];

    private int $currentKeyIndex = 0;

    private string $endpoint = 'https://ollama.com/api/chat';

    private string $model = 'gemma3:4b';

    public function __construct(EmbeddingService $embeddingService)
    {
        $this->embeddingService = $embeddingService;

        foreach (['key_1', 'key_2', 'key_3', 'key_4', 'key_5'] as $k) {
            $key = config("services.ollama.{$k}");
            if ($key) {
                $this->apiKeys[] = $key;
            }
        }

        $this->model = config('services.ollama.model', 'gemma3:4b');
    }

    public function chat(string $userMessage, array $history = []): string
    {
        $knowledge = $this->buildKnowledge($userMessage);
        $systemPrompt = $this->systemPrompt($knowledge);

        $messages = [['role' => 'system', 'content' => $systemPrompt]];

        // Ollama requires strict user/assistant alternation starting with user.
        // Filter history: skip leading assistant messages, then enforce alternation.
        $expectedRole = 'user';
        foreach ($history as $msg) {
            $role = $msg['role'] ?? '';
            if ($role === $expectedRole && in_array($role, ['user', 'assistant'], true)) {
                $messages[] = ['role' => $role, 'content' => $msg['content']];
                $expectedRole = $role === 'user' ? 'assistant' : 'user';
            }
        }

        // If last injected history was 'user', we'd end up with user+user which is invalid.
        // After processing a 'user' message, expectedRole flips to 'assistant'.
        // So: expectedRole === 'assistant' means the last processed was 'user' → must pop it.
        if ($expectedRole === 'assistant' && count($messages) > 1) {
            array_pop($messages);
        }

        $messages[] = ['role' => 'user', 'content' => $userMessage];

        return $this->callOllama($messages);
    }

    private function callOllama(array $messages): string
    {
        $attempts = 0;
        $maxAttempts = max(count($this->apiKeys), 1) * 2;

        while ($attempts < $maxAttempts) {
            try {
                $response = Http::timeout(30)
                    ->withToken($this->currentKey())
                    ->post($this->endpoint, [
                        'model' => $this->model,
                        'messages' => $messages,
                        'stream' => false,
                    ]);

                if ($response->status() === 429 || $response->status() === 401) {
                    $this->rotateKey();
                    $attempts++;

                    continue;
                }

                if ($response->successful()) {
                    return $response->json('message.content') ?? 'Maaf, tidak ada respons dari AI.';
                }

                $attempts++;
            } catch (\Exception $e) {
                $this->rotateKey();
                $attempts++;
            }
        }

        throw new \RuntimeException('Jejak AI sedang tidak tersedia.');
    }

    private function isRouteQuery(string $query): bool
    {
        $routeWords = [
            'rute', 'jalur', 'semua kota', 'kota apa', 'kota mana', 'terhubung', 'jaringan', 'kota saja', 'kota-kota',
            'mau ke', 'pergi ke', 'perjalanan', 'naik kereta', 'berangkat', 'dari bandung', 'ke bandung',
            'dari jakarta', 'ke jakarta', 'dari surabaya', 'ke surabaya', 'dari yogyakarta', 'ke yogyakarta',
            'turun di', 'transit', 'keberangkatan', 'peta',
        ];

        $lower = strtolower($query);
        foreach ($routeWords as $word) {
            if (str_contains($lower, $word)) {
                return true;
            }
        }

        return false;
    }

    private function vectorSearch(string $query, string $table, int $limit): array
    {
        $vec = $this->embeddingService->embed($query);
        if (! $vec) {
            return [];
        }

        $vecLiteral = $this->embeddingService->toSql($vec);

        return DB::select(
            "SELECT id FROM {$table} WHERE embedding IS NOT NULL ORDER BY embedding <=> ?::vector LIMIT ?",
            [$vecLiteral, $limit]
        );
    }

    /**
     * @return array<int, array{type: string, id?: string, nama: string, url: string}>
     */
    public function extractLinks(string $reply, string $query): array
    {
        $links = [];

        if ($this->isRouteQuery($query)) {
            $links[] = ['type' => 'rute', 'nama' => 'Lihat Peta Rute', 'url' => '/rute'];
        }

        // Use vector search on reply to find top candidate destinasi, then check if mentioned
        $candidateIds = array_column($this->vectorSearch($reply, 'destinasi', 20), 'id');
        if (! empty($candidateIds)) {
            $destinasis = Destinasi::select('id', 'nama')->whereIn('id', $candidateIds)->get();
            foreach ($destinasis as $d) {
                if (mb_stripos($reply, $d->nama) !== false) {
                    $links[] = ['type' => 'destinasi', 'id' => $d->id, 'nama' => $d->nama, 'url' => "/destinasi/{$d->id}"];
                }
            }
        }

        return $links;
    }

    private function buildKnowledge(string $query): string
    {
        // Fast SQL-based search always runs first — no embedding dependency
        $parts = $this->fastKnowledge($query);

        // Vector search as supplement (silent fail if embedding service is down)
        foreach ($this->vectorKnowledge($query) as $vp) {
            if (! in_array($vp, $parts, true)) {
                $parts[] = $vp;
            }
        }

        return ! empty($parts)
            ? implode("\n\n", array_slice($parts, 0, 6))
            : $this->generalKnowledge();
    }

    /**
     * Fast SQL-only knowledge retrieval — no vector embedding needed.
     * Handles: city mentions, station mentions, destination name mentions.
     *
     * @return string[]
     */
    private function fastKnowledge(string $query): array
    {
        $keywords = $this->extractKeywords($query);
        if (empty($keywords)) {
            return [];
        }

        $parts = [];

        // 1. Find matching kota → include all stasiun + destinasi in that kota
        $kotas = Kota::where(function ($q) use ($keywords) {
            foreach ($keywords as $kw) {
                $q->orWhere('nama', 'ILIKE', "%{$kw}%");
            }
        })->limit(4)->get();

        if ($kotas->isNotEmpty()) {
            $kotaIds = $kotas->pluck('id');
            $stasiunDiKota = Stasiun::whereIn('kota_id', $kotaIds)->get()->groupBy('kota_id');

            $kotaList = $kotas->map(function ($k) use ($stasiunDiKota) {
                $list = ($stasiunDiKota[$k->id] ?? collect())
                    ->map(fn ($s) => "  · {$s->nama} [{$s->kode_stasiun}]")
                    ->join("\n");

                return "- {$k->nama}:\n{$list}";
            })->join("\n");

            $parts[] = "STASIUN DI KOTA YANG DISEBUTKAN:\n{$kotaList}";

            // Also fetch destinasi for those stasiun
            $stasiunIds = $stasiunDiKota->flatten()->pluck('id');
            if ($stasiunIds->isNotEmpty()) {
                $destinasis = Destinasi::with('stasiun')
                    ->withCount('ulasan')
                    ->whereIn('stasiun_id', $stasiunIds)
                    ->where('is_verified', true)
                    ->orderByDesc('rating')
                    ->limit(10)
                    ->get();

                if ($destinasis->isNotEmpty()) {
                    $destList = $destinasis->map(function ($d) {
                        $rating = $d->rating > 0 ? " ⭐{$d->rating}" : '';
                        $ulasan = $d->ulasan_count > 0 ? " ({$d->ulasan_count} ulasan)" : '';

                        return "- {$d->nama} [{$d->kategori}]{$rating}{$ulasan} dekat Stasiun {$d->stasiun?->nama}: {$d->deskripsi}";
                    })->join("\n");
                    $parts[] = "DESTINASI DI KOTA TERSEBUT:\n{$destList}";
                }
            }
        }

        // 2. Find matching stasiun by name/code
        $coveredKotaIds = $kotas->pluck('id');
        $stasiuns = Stasiun::with('kota')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $kw) {
                    $q->orWhere('nama', 'ILIKE', "%{$kw}%")
                        ->orWhere('kode_stasiun', 'ILIKE', "%{$kw}%");
                }
            })
            ->when($coveredKotaIds->isNotEmpty(), fn ($q) => $q->whereNotIn('kota_id', $coveredKotaIds))
            ->limit(6)->get();

        if ($stasiuns->isNotEmpty()) {
            $list = $stasiuns->map(fn ($s) => "- Stasiun {$s->nama} [{$s->kode_stasiun}] di {$s->kota->nama}")->join("\n");
            $parts[] = "STASIUN YANG DISEBUTKAN:\n{$list}";
        }

        // 3. Find matching destinasi by name/description
        $destByName = Destinasi::with('stasiun.kota')
            ->withCount('ulasan')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $kw) {
                    $q->orWhere('nama', 'ILIKE', "%{$kw}%")
                        ->orWhere('deskripsi', 'ILIKE', "%{$kw}%")
                        ->orWhere('kategori', 'ILIKE', "%{$kw}%");
                }
            })
            ->where('is_verified', true)
            ->orderByDesc('rating')
            ->limit(6)->get();

        if ($destByName->isNotEmpty()) {
            $destList = $destByName->map(function ($d) {
                $loc = $d->stasiun ? "dekat Stasiun {$d->stasiun->nama}, {$d->stasiun->kota->nama}" : '';
                $rating = $d->rating > 0 ? " ⭐{$d->rating}" : '';

                return "- {$d->nama} [{$d->kategori}]{$rating} {$loc}: {$d->deskripsi}";
            })->join("\n");
            $parts[] = "DESTINASI YANG RELEVAN:\n{$destList}";
        }

        return $parts;
    }

    private function vectorKnowledge(string $query): array
    {
        $parts = [];

        // Search kota
        $kotaRows = $this->vectorSearch($query, 'kota', 5);
        if (! empty($kotaRows)) {
            $kotaIds = array_column($kotaRows, 'id');
            $kotas = Kota::whereIn('id', $kotaIds)->get();
            $stasiunDiKota = Stasiun::whereIn('kota_id', $kotaIds)->get()->groupBy('kota_id');

            $kotaList = $kotas->map(function ($k) use ($stasiunDiKota) {
                $list = ($stasiunDiKota[$k->id] ?? collect())
                    ->map(fn ($s) => "  · {$s->nama} [{$s->kode_stasiun}]")
                    ->join("\n");

                return "- {$k->nama}:\n{$list}";
            })->join("\n");

            $parts[] = "KOTA DAN STASIUN YANG RELEVAN:\n{$kotaList}";
        }

        // Search stasiun
        $stasiunRows = $this->vectorSearch($query, 'stasiun', 8);
        if (! empty($stasiunRows)) {
            $ids = array_column($stasiunRows, 'id');
            $stasiuns = Stasiun::with('kota')->whereIn('id', $ids)
                ->when(! empty($kotaIds ?? []), fn ($q) => $q->whereNotIn('kota_id', $kotaIds ?? []))
                ->get();

            if ($stasiuns->isNotEmpty()) {
                $list = $stasiuns->map(fn ($s) => "- Stasiun {$s->nama} [{$s->kode_stasiun}] di {$s->kota->nama}")->join("\n");
                $parts[] = "STASIUN LAIN YANG RELEVAN:\n{$list}";
            }
        }

        // Search destinasi
        $destRows = $this->vectorSearch($query, 'destinasi', 6);
        if (! empty($destRows)) {
            $ids = array_column($destRows, 'id');
            $destinasis = Destinasi::with('stasiun.kota')->withCount('ulasan')->whereIn('id', $ids)->get();
            $destList = $destinasis->map(function ($d) {
                $loc = $d->stasiun ? "dekat Stasiun {$d->stasiun->nama}, {$d->stasiun->kota->nama}" : '';
                $rating = $d->rating > 0 ? " ⭐{$d->rating}" : '';
                $ulasan = $d->ulasan_count > 0 ? " ({$d->ulasan_count} ulasan)" : '';

                return "- {$d->nama} [{$d->kategori}]{$rating}{$ulasan} {$loc}: {$d->deskripsi}";
            })->join("\n");
            $parts[] = "DESTINASI YANG RELEVAN:\n{$destList}";
        }

        return $parts;
    }

    private function generalKnowledge(): string
    {
        return Cache::remember('jejak_ai_general_knowledge', 3600, function () {
            $totalKota = Kota::count();
            $totalStasiun = Stasiun::count();
            $totalDestinasi = Destinasi::count();

            $kotaSample = Kota::withCount('stasiun')
                ->orderByDesc('stasiun_count')
                ->limit(10)
                ->get()
                ->map(fn ($k) => "{$k->nama} ({$k->stasiun_count} stasiun)")
                ->join(', ');

            return "DATA JEJAKJALUR:\n"
                ."- Total kota terhubung kereta: {$totalKota}\n"
                ."- Total stasiun: {$totalStasiun}\n"
                ."- Total destinasi wisata/kuliner/UMKM: {$totalDestinasi}\n"
                ."- Kota utama: {$kotaSample}";
        });
    }

    private function extractKeywords(string $query): array
    {
        // Strip common stop words and extract meaningful keywords
        $stopWords = ['apa', 'ada', 'di', 'ke', 'dari', 'yang', 'dan', 'atau', 'saya', 'mau', 'bisa', 'tolong', 'info', 'tentang', 'gimana', 'cara', 'adalah', 'bagaimana', 'berapa', 'kapan', 'untuk', 'dengan', 'stasiun', 'kereta', 'ada', 'tahu', 'tau', 'saja', 'aja', 'dong', 'deh', 'yuk', 'kamu', 'aku', 'ingin', 'minta', 'cari', 'tunjukkan', 'list', 'daftar'];

        $words = preg_split('/\s+/', strtolower(trim($query)));
        $keywords = array_filter($words, fn ($w) => strlen($w) >= 3 && ! in_array($w, $stopWords));

        return array_values(array_unique($keywords));
    }

    private function systemPrompt(string $knowledge): string
    {
        return <<<PROMPT
Kamu adalah Jejak AI, asisten virtual cerdas untuk aplikasi JejakJalur — platform informasi kereta api dan destinasi wisata Indonesia.

PERANMU:
- Membantu pengguna menemukan destinasi wisata, kuliner, dan UMKM di sekitar stasiun kereta
- Memberikan informasi tentang kota, stasiun, dan rute kereta di Indonesia
- Membantu navigasi aplikasi JejakJalur

YANG BISA KAMU JAWAB:
- Kota dan stasiun apa saja yang terhubung jaringan kereta (gunakan data di bawah)
- Stasiun apa saja yang ada di suatu kota (gunakan data di bawah)
- Destinasi wisata, kuliner, UMKM di sekitar stasiun (gunakan data di bawah)
- Pertanyaan navigasi aplikasi JejakJalur
- Siapa yang membuat/mengembangkan JejakJalur (gunakan info developer di bawah)
- Rute/perjalanan dari kota A ke kota B → arahkan ke fitur "Rencanakan Perjalanan" di JejakJalur, sebutkan stasiun yang relevan dari data di bawah

PENTING — JANGAN tolak pertanyaan rute:
Jika pengguna tanya "rute dari X ke Y", "perjalanan X ke Y", "mau ke X dari Y", "naik kereta dari X ke Y" → JANGAN redirect ke kai.id. Ini pertanyaan yang JejakJalur bisa bantu. Jawab dengan: stasiun asal yang tersedia di kota X, stasiun tujuan di kota Y, dan minta mereka pakai fitur Rencanakan Perjalanan di aplikasi.

INFO DEVELOPER JEJAKJALUR:
JejakJalur dikembangkan oleh dua orang:
- Lisvindanu — portofolio: anaphygon.my.id
- Muhamad Marsa Nur Jaman — portofolio: cyliatech.my.id
Jika ada yang bertanya siapa pembuat, kreator, developer, atau yang mengerjakan JejakJalur, sebutkan keduanya beserta link portofolio masing-masing.

YANG TIDAK BISA KAMU JAWAB (redirect sopan):
- Jadwal keberangkatan/kedatangan (jam berapa kereta berangkat) → arahkan ke kai.id atau KAI Access
- Harga/tarif tiket kereta → arahkan ke kai.id atau KAI Access
- Nama kereta tertentu (Argo Parahyangan, Lodaya, dll) → arahkan ke kai.id
- Topik di luar kereta & wisata → "Maaf, aku hanya bisa membantu seputar perjalanan kereta dan destinasi wisata di JejakJalur 🚂"

ATURAN ANTI-HALUSINASI (WAJIB, tidak boleh dilanggar):
- HANYA sebutkan nama stasiun, kode stasiun, kota, dan destinasi yang PERSIS TERTULIS dalam data di bawah
- DILARANG mengarang kode stasiun — gunakan HANYA kode yang ada di data
- Jika data tidak ada dalam konteks: "Maaf, data ini belum tersedia di JejakJalur saat ini."
- Jika ditanya stasiun di suatu kota: HANYA sebut yang tercantum di bawah, jangan tambah apapun

DATA AKTUAL JEJAKJALUR (satu-satunya sumber — jangan tambah informasi di luar ini):
{$knowledge}

GAYA KOMUNIKASI:
- Ramah, singkat, dan informatif
- Bahasa Indonesia yang natural
- Boleh pakai emoji sesekali 🚂🗺️
- Maksimal 3 paragraf per jawaban
PROMPT;
    }

    private function currentKey(): string
    {
        if (empty($this->apiKeys)) {
            return '';
        }

        return $this->apiKeys[$this->currentKeyIndex % count($this->apiKeys)];
    }

    private function rotateKey(): void
    {
        if (count($this->apiKeys) > 1) {
            $this->currentKeyIndex = ($this->currentKeyIndex + 1) % count($this->apiKeys);
        }
    }
}
