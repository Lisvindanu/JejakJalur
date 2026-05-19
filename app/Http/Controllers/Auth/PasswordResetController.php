<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetController extends Controller
{
    public function tampilkanFormulirLupaPassword(): Response
    {
        return Inertia::render('Auth/LupaPassword');
    }

    public function kirimTautanReset(Request $request): RedirectResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        Password::sendResetLink($request->only('email'));

        // Always return success to avoid email enumeration
        return back()->with('sukses', 'Jika email terdaftar, tautan reset password telah dikirim.');
    }

    public function tampilkanFormulirResetPassword(string $token): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => request()->query('email', ''),
        ]);
    }

    public function prosesResetPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($pengguna, $password) {
                $pengguna->password = $password;
                $pengguna->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('sukses', 'Password berhasil direset. Silakan masuk.');
        }

        return back()->withErrors(['email' => __($status)]);
    }
}
