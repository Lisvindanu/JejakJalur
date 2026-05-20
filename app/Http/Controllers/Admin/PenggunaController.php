<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PenggunaController extends Controller
{
    public function indeks(): Response
    {
        $pengguna = User::withCount('ulasan')
            ->withTrashed()
            ->orderByDesc('created_at')
            ->paginate(20)
            ->through(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'is_admin' => $u->is_admin,
                'deleted_at' => $u->deleted_at,
                'ulasan_count' => $u->ulasan_count,
                'created_at' => $u->created_at->format('d M Y'),
                'via' => $u->google_id ? 'Google' : ($u->github_id ? 'GitHub' : 'Email'),
            ]);

        return Inertia::render('Admin/Pengguna/Indeks', ['pengguna' => $pengguna]);
    }

    public function toggleAdmin(User $pengguna): RedirectResponse
    {
        $pengguna->update(['is_admin' => ! $pengguna->is_admin]);

        return back()->with('sukses', $pengguna->is_admin ? "{$pengguna->name} dijadikan admin." : "Hak admin {$pengguna->name} dicabut.");
    }

    public function pulihkan(string $id): RedirectResponse
    {
        $pengguna = User::onlyTrashed()->findOrFail($id);
        $pengguna->restore();

        return back()->with('sukses', "{$pengguna->name} berhasil dipulihkan.");
    }

    public function hapus(User $pengguna): RedirectResponse
    {
        $pengguna->delete();

        return back()->with('sukses', "{$pengguna->name} berhasil dihapus.");
    }
}
