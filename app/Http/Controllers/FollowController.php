<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function ikuti(Request $request, User $user): RedirectResponse
    {
        abort_if($request->user()->id === $user->id, 403, 'Tidak bisa follow diri sendiri.');

        $request->user()->following()->syncWithoutDetaching([$user->id]);

        return back()->with('sukses', "Kamu sekarang mengikuti {$user->name}.");
    }

    public function berhenti(Request $request, User $user): RedirectResponse
    {
        $request->user()->following()->detach($user->id);

        return back()->with('sukses', "Kamu berhenti mengikuti {$user->name}.");
    }
}
