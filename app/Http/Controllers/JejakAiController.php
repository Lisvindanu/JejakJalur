<?php

namespace App\Http\Controllers;

use App\Models\AiSession;
use App\Models\Destinasi;
use App\Services\JejakAiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JejakAiController extends Controller
{
    private const GUEST_LIMIT = 3;

    private const USER_LIMIT = 50;

    public function __construct(private readonly JejakAiService $aiService) {}

    public function chat(Request $request): JsonResponse
    {
        $request->validate(['message' => 'required|string|max:500', 'history' => 'array|max:20']);

        $user = $request->user();
        $session = $this->resolveSession($request, $user);
        $limit = $user ? self::USER_LIMIT : self::GUEST_LIMIT;

        if ($session->message_count >= $limit) {
            return response()->json([
                'error' => $user
                    ? "Kamu telah mencapai batas {$limit} pesan. Coba lagi nanti."
                    : 'Batas 3 pesan tercapai. Masuk atau daftar untuk chatting lebih banyak.',
                'limit_reached' => true,
                'require_login' => ! $user,
            ], 429);
        }

        try {
            $reply = $this->aiService->chat($request->input('message'), $request->input('history', []));
        } catch (\RuntimeException $e) {
            return response()->json([
                'error' => 'Maaf, Jejak AI sedang tidak tersedia. Silakan coba lagi nanti.',
                'retry' => true,
            ], 503);
        }

        $session->increment('message_count');

        $message = $request->input('message');
        $links = $this->aiService->extractLinks($reply, $message);

        // Persist history to DB (only for logged-in users; guests use localStorage)
        if ($user) {
            $incoming = array_values(array_slice($request->input('history', []), -18));
            $incoming[] = ['role' => 'user', 'content' => $message];
            $incoming[] = ['role' => 'assistant', 'content' => $reply, 'links' => $links];
            $session->update([
                'last_message_at' => now(),
                'history' => array_slice($incoming, -20),
            ]);
        } else {
            $session->update(['last_message_at' => now()]);
        }

        return response()->json([
            'reply' => $reply,
            'links' => $links,
            'usage' => ['count' => $session->message_count, 'limit' => $limit],
        ]);
    }

    public function rekomendasiPersonal(Request $request): JsonResponse
    {
        $user = $request->user();

        $bookmarkedIds = $user->bookmarks()->pluck('destinasi_id');
        $visitedIds = $user->kunjungan()->pluck('destinasi_id');
        $excludeIds = $bookmarkedIds->merge($visitedIds)->unique();

        // Cari kategori favorit user dari bookmarks
        $topKategori = $user->bookmarks()
            ->with('destinasi:id,kategori')
            ->get()
            ->pluck('destinasi.kategori')
            ->filter()
            ->countBy()
            ->sortByDesc(fn ($c) => $c)
            ->keys()
            ->first() ?? 'Wisata';

        $rekomendasi = Destinasi::with('stasiun:id,nama,kota_id', 'stasiun.kota:id,nama')
            ->verified()
            ->where('kategori', $topKategori)
            ->whereNotIn('id', $excludeIds)
            ->orderByDesc('rating')
            ->limit(4)
            ->get();

        if ($rekomendasi->isEmpty()) {
            $rekomendasi = Destinasi::with('stasiun:id,nama,kota_id', 'stasiun.kota:id,nama')
                ->verified()
                ->whereNotIn('id', $excludeIds)
                ->orderByDesc('rating')
                ->limit(4)
                ->get();
        }

        if ($rekomendasi->isEmpty()) {
            return response()->json(['destinasi' => [], 'narasi' => null, 'kategori' => $topKategori]);
        }

        $namaList = $rekomendasi->map(fn ($d) => "{$d->nama} ({$d->stasiun->kota->nama})")->implode(', ');
        $jumlahBookmark = $bookmarkedIds->count();
        $konteks = $jumlahBookmark > 0
            ? "User sudah menyimpan {$jumlahBookmark} destinasi, terutama kategori {$topKategori}."
            : 'User baru bergabung.';

        $prompt = "{$konteks} Rekomendasikan secara singkat (1-2 kalimat, santai) mengapa destinasi berikut cocok untuk mereka: {$namaList}. Mulai kalimat dengan \"Karena kamu suka {$topKategori}...\"";

        try {
            $narasi = $this->aiService->chat($prompt, []);
        } catch (\RuntimeException) {
            $narasi = null;
        }

        return response()->json(['destinasi' => $rekomendasi, 'narasi' => $narasi, 'kategori' => $topKategori]);
    }

    public function status(Request $request): JsonResponse
    {
        $user = $request->user();
        $session = $this->resolveSession($request, $user);
        $limit = $user ? self::USER_LIMIT : self::GUEST_LIMIT;

        return response()->json([
            'count' => $session->message_count,
            'limit' => $limit,
            'remaining' => max(0, $limit - $session->message_count),
            'require_login' => ! $user,
            'history' => $user ? ($session->history ?? []) : null,
        ]);
    }

    private function resolveSession(Request $request, ?object $user): AiSession
    {
        if ($user) {
            return AiSession::firstOrCreate(
                ['user_id' => $user->id, 'session_token' => null],
                ['message_count' => 0]
            );
        }

        $token = $request->session()->get('ai_session_token');

        if (! $token) {
            $token = \Str::uuid()->toString();
            $request->session()->put('ai_session_token', $token);
        }

        return AiSession::firstOrCreate(
            ['session_token' => $token, 'user_id' => null],
            ['message_count' => 0]
        );
    }
}
