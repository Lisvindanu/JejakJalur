<?php

namespace App\Http\Controllers;

use App\Models\AiSession;
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
        $session->update(['last_message_at' => now()]);

        return response()->json([
            'reply' => $reply,
            'usage' => ['count' => $session->message_count, 'limit' => $limit],
        ]);
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
