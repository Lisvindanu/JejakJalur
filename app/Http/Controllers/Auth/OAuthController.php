<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function arahkanKeProvider(string $provider): RedirectResponse
    {
        $this->validasiProvider($provider);

        return Socialite::driver($provider)->redirect();
    }

    public function tanganiCallback(string $provider): RedirectResponse
    {
        $this->validasiProvider($provider);

        $dataSosial = Socialite::driver($provider)->user();

        $this->authService->loginAtauDaftarViaOAuth($provider, $dataSosial);

        return redirect()->route('home')->with('sukses', 'Berhasil masuk dengan '.ucfirst($provider).'!');
    }

    private function validasiProvider(string $provider): void
    {
        abort_unless(in_array($provider, ['google', 'github']), 404);
    }
}
