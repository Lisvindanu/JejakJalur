<?php

namespace App\Services;

use App\Models\Destinasi;
use App\Models\Kota;
use App\Models\Stasiun;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class JejakAiService
{
    private array $apiKeys = [];

    private int $currentKeyIndex = 0;

    private string $endpoint = 'https://ollama.com/api/chat';

    private string $model = 'gemma3:4b';

    public function __construct()
    {
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

        foreach ($history as $msg) {
            $messages[] = ['role' => $msg['role'], 'content' => $msg['content']];
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

        return 'Maaf, Jejak AI sedang tidak tersedia. Silakan coba lagi nanti.';
    }

    private function buildKnowledge(string $query): string
    {
        // Extract keywords from query
        $keywords = $this->extractKeywords($query);

        if (empty($keywords)) {
            return $this->generalKnowledge();
        }

        $parts = [];

        // Search kota
        $kotas = Kota::where(function ($q) use ($keywords) {
            foreach ($keywords as $kw) {
                $q->orWhere('nama', 'ILIKE', "%{$kw}%");
            }
        })->withCount('stasiun')->limit(5)->get();

        if ($kotas->isNotEmpty()) {
            $kotaList = $kotas->map(fn ($k) => "- {$k->nama} ({$k->stasiun_count} stasiun)")->join("\n");
            $parts[] = "KOTA YANG RELEVAN:\n{$kotaList}";
        }

        // Search stasiun
        $stasiuns = Stasiun::with('kota')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $kw) {
                    $q->orWhere('nama', 'ILIKE', "%{$kw}%")
                        ->orWhere('kode_stasiun', 'ILIKE', "%{$kw}%");
                }
            })->limit(10)->get();

        if ($stasiuns->isNotEmpty()) {
            $stasiunList = $stasiuns->map(fn ($s) => "- Stasiun {$s->nama} [{$s->kode_stasiun}] di {$s->kota->nama}")->join("\n");
            $parts[] = "STASIUN YANG RELEVAN:\n{$stasiunList}";
        }

        // Search destinasi
        $destinasiList = Destinasi::with('stasiun.kota')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $kw) {
                    $q->orWhere('nama', 'ILIKE', "%{$kw}%")
                        ->orWhere('deskripsi', 'ILIKE', "%{$kw}%")
                        ->orWhere('kategori', 'ILIKE', "%{$kw}%");
                }
            })->limit(8)->get();

        if ($destinasiList->isNotEmpty()) {
            $destList = $destinasiList->map(function ($d) {
                $loc = $d->stasiun ? "dekat Stasiun {$d->stasiun->nama}, {$d->stasiun->kota->nama}" : '';

                return "- {$d->nama} [{$d->kategori}] {$loc}: {$d->deskripsi}";
            })->join("\n");
            $parts[] = "DESTINASI YANG RELEVAN:\n{$destList}";
        }

        return empty($parts) ? $this->generalKnowledge() : implode("\n\n", $parts);
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
        $stopWords = ['apa', 'ada', 'di', 'ke', 'dari', 'yang', 'dan', 'atau', 'saya', 'mau', 'bisa', 'tolong', 'info', 'tentang', 'gimana', 'cara', 'adalah', 'bagaimana', 'berapa', 'kapan', 'untuk', 'dengan'];

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

BATASAN KETAT:
- Kamu HANYA boleh menjawab pertanyaan seputar: kereta api Indonesia, stasiun, rute, kota-kota di jalur kereta, destinasi wisata/kuliner/UMKM di sekitar stasiun
- Jika pertanyaan di luar topik (politik, matematika, coding, dll), tolak dengan sopan: "Maaf, aku hanya bisa membantu seputar perjalanan kereta dan destinasi wisata di JejakJalur 🚂"
- Jangan mengarang data. Gunakan HANYA data di bawah ini sebagai referensi

DATA AKTUAL JEJAKJALUR (gunakan ini sebagai sumber jawaban):
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
