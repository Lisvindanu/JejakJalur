<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class AuthService
{
    public function daftarPengguna(array $data): User
    {
        $pengguna = User::create([
            'nama' => $data['nama'],
            'name' => $data['nama'],
            'email' => $data['email'],
            'password' => $data['password'],
            'consent_given' => true,
        ]);

        Auth::login($pengguna);

        return $pengguna;
    }

    public function loginDenganEmail(string $email, string $password, bool $ingat = false): bool
    {
        return Auth::attempt(['email' => $email, 'password' => $password], $ingat);
    }

    public function loginAtauDaftarViaOAuth(string $provider, SocialiteUser $dataSosial): User
    {
        $kolomProvider = "{$provider}_id";

        $pengguna = User::where($kolomProvider, $dataSosial->getId())
            ->orWhere('email', $dataSosial->getEmail())
            ->first();

        if ($pengguna) {
            $pengguna->update([$kolomProvider => $dataSosial->getId()]);
        } else {
            $namaLengkap = $dataSosial->getName() ?? $dataSosial->getNickname() ?? 'Pengguna';

            $pengguna = User::create([
                'nama' => $namaLengkap,
                'name' => $namaLengkap,
                'email' => $dataSosial->getEmail(),
                $kolomProvider => $dataSosial->getId(),
                'consent_given' => true,
            ]);
        }

        Auth::login($pengguna, true);

        return $pengguna;
    }

    public function logout(): void
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}
