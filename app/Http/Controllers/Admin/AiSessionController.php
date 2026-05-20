<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiSession;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AiSessionController extends Controller
{
    public function indeks(): Response
    {
        $sessions = AiSession::with('user')
            ->orderByDesc('last_message_at')
            ->paginate(25)
            ->through(fn (AiSession $s) => [
                'id' => $s->id,
                'user_name' => $s->user?->name ?? 'Tamu',
                'user_email' => $s->user?->email,
                'message_count' => $s->message_count,
                'last_message_at' => $s->last_message_at?->diffForHumans(),
                'is_guest' => $s->user_id === null,
            ]);

        return Inertia::render('Admin/AiSession/Indeks', ['sessions' => $sessions]);
    }

    public function reset(AiSession $aiSession): RedirectResponse
    {
        $aiSession->update(['message_count' => 0, 'history' => null]);

        return back()->with('sukses', 'Sesi AI berhasil direset.');
    }

    public function hapus(AiSession $aiSession): RedirectResponse
    {
        $aiSession->delete();

        return back()->with('sukses', 'Sesi AI berhasil dihapus.');
    }
}
