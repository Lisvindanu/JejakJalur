<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function tampilkanFormulirLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function prosesLogin(LoginRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $berhasil = $this->authService->loginDenganEmail(
            email: $data['email'],
            password: $data['password'],
            ingat: $data['ingat'] ?? false,
        );

        if (! $berhasil) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('home'));
    }

    public function tampilkanFormulirDaftar(): Response
    {
        return Inertia::render('Auth/Daftar');
    }

    public function prosesDaftar(RegisterRequest $request): RedirectResponse
    {
        $this->authService->daftarPengguna($request->validated());

        return redirect()->route('home')->with('sukses', 'Selamat datang di JejakJalur!');
    }

    public function logout(): RedirectResponse
    {
        $this->authService->logout();

        return redirect()->route('home');
    }
}
