<?php

use App\Http\Controllers\Admin\AiSessionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DestinasiController as AdminDestinasiController;
use App\Http\Controllers\Admin\KotaController;
use App\Http\Controllers\Admin\PenggunaController;
use App\Http\Controllers\Admin\StasiunController;
use App\Http\Controllers\Admin\UlasanController as AdminUlasanController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\DestinasiController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JejakAiController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\RuteController;
use App\Http\Controllers\UlasanController;
use Illuminate\Support\Facades\Route;

// Jejak AI
Route::prefix('ai')->name('ai.')->group(function () {
    Route::post('/chat', [JejakAiController::class, 'chat'])->name('chat')->middleware('throttle:30,1');
    Route::get('/status', [JejakAiController::class, 'status'])->name('status');
});

// Publik
Route::get('/', [HomeController::class, 'tampilkan'])->name('home');

Route::prefix('destinasi')->name('destinasi.')->group(function () {
    Route::get('/', [DestinasiController::class, 'indeks'])->name('indeks');
    Route::get('/{destinasi:id}', [DestinasiController::class, 'detail'])->name('detail');
});

// Rute
Route::prefix('rute')->name('rute.')->group(function () {
    Route::get('/', [RuteController::class, 'tampilkan'])->name('tampilkan');
    Route::get('/cari-stasiun', [RuteController::class, 'cariStasiun'])->name('cariStasiun');
    Route::get('/cari-rute', [RuteController::class, 'cariRute'])->name('cariRute');
});

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/masuk', [AuthController::class, 'tampilkanFormulirLogin'])->name('login');
    Route::post('/masuk', [AuthController::class, 'prosesLogin'])->name('login.proses');
    Route::get('/daftar', [AuthController::class, 'tampilkanFormulirDaftar'])->name('daftar');
    Route::post('/daftar', [AuthController::class, 'prosesDaftar'])->name('daftar.proses');

    Route::get('/oauth/{provider}', [OAuthController::class, 'arahkanKeProvider'])->name('oauth.redirect');
    Route::get('/oauth/{provider}/callback', [OAuthController::class, 'tanganiCallback'])->name('oauth.callback');

    // Lupa & reset password
    Route::get('/lupa-password', [PasswordResetController::class, 'tampilkanFormulirLupaPassword'])->name('password.request');
    Route::post('/lupa-password', [PasswordResetController::class, 'kirimTautanReset'])->name('password.email');
    Route::get('/reset-password/{token}', [PasswordResetController::class, 'tampilkanFormulirResetPassword'])->name('password.reset');
    Route::post('/reset-password', [PasswordResetController::class, 'prosesResetPassword'])->name('password.update');
});

Route::post('/keluar', [AuthController::class, 'logout'])->name('keluar')->middleware('auth');

// Profil pengguna
Route::middleware('auth')->prefix('profil')->name('profil.')->group(function () {
    Route::get('/', [ProfilController::class, 'tampilkan'])->name('tampilkan');
    Route::get('/edit', [ProfilController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfilController::class, 'perbarui'])->name('perbarui');
    Route::delete('/', [ProfilController::class, 'hapus'])->name('hapus');
});

// Bookmark
Route::middleware('auth')->prefix('destinasi/{destinasi:id}')->name('bookmark.')->group(function () {
    Route::post('/bookmark', [BookmarkController::class, 'simpan'])->name('simpan');
    Route::delete('/bookmark', [BookmarkController::class, 'hapus'])->name('hapus');
});

// Ulasan (pengguna terautentikasi)
Route::middleware('auth')->prefix('destinasi/{destinasi}/ulasan')->name('ulasan.')->group(function () {
    Route::post('/', [UlasanController::class, 'simpan'])->name('simpan');
    Route::patch('/{ulasan}', [UlasanController::class, 'perbarui'])->name('perbarui');
    Route::delete('/{ulasan}', [UlasanController::class, 'hapus'])->name('hapus');
});

// Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'tampilkan'])->name('dashboard');

    Route::prefix('kota')->name('kota.')->group(function () {
        Route::get('/', [KotaController::class, 'indeks'])->name('indeks');
        Route::get('/buat', [KotaController::class, 'buat'])->name('buat');
        Route::post('/', [KotaController::class, 'simpan'])->name('simpan');
        Route::get('/{kota}/edit', [KotaController::class, 'edit'])->name('edit');
        Route::patch('/{kota}', [KotaController::class, 'perbarui'])->name('perbarui');
        Route::delete('/{kota}', [KotaController::class, 'hapus'])->name('hapus');
    });

    Route::prefix('stasiun')->name('stasiun.')->group(function () {
        Route::get('/', [StasiunController::class, 'indeks'])->name('indeks');
        Route::get('/buat', [StasiunController::class, 'buat'])->name('buat');
        Route::post('/', [StasiunController::class, 'simpan'])->name('simpan');
        Route::get('/{stasiun}/edit', [StasiunController::class, 'edit'])->name('edit');
        Route::patch('/{stasiun}', [StasiunController::class, 'perbarui'])->name('perbarui');
        Route::delete('/{stasiun}', [StasiunController::class, 'hapus'])->name('hapus');
    });

    Route::prefix('destinasi')->name('destinasi.')->group(function () {
        Route::get('/', [AdminDestinasiController::class, 'indeks'])->name('indeks');
        Route::get('/buat', [AdminDestinasiController::class, 'buat'])->name('buat');
        Route::post('/', [AdminDestinasiController::class, 'simpan'])->name('simpan');
        Route::get('/{destinasi}/edit', [AdminDestinasiController::class, 'edit'])->name('edit');
        Route::patch('/{destinasi}', [AdminDestinasiController::class, 'perbarui'])->name('perbarui');
        Route::delete('/{destinasi}', [AdminDestinasiController::class, 'hapus'])->name('hapus');
        Route::patch('/{destinasi}/verifikasi', [AdminDestinasiController::class, 'verifikasi'])->name('verifikasi');
    });

    Route::prefix('pengguna')->name('pengguna.')->group(function () {
        Route::get('/', [PenggunaController::class, 'indeks'])->name('indeks');
        Route::patch('/{pengguna}/toggle-admin', [PenggunaController::class, 'toggleAdmin'])->name('toggle-admin');
        Route::patch('/{id}/pulihkan', [PenggunaController::class, 'pulihkan'])->name('pulihkan');
        Route::delete('/{pengguna}', [PenggunaController::class, 'hapus'])->name('hapus');
    });

    Route::prefix('ulasan')->name('ulasan.')->group(function () {
        Route::get('/', [AdminUlasanController::class, 'indeks'])->name('indeks');
        Route::delete('/{ulasan}', [AdminUlasanController::class, 'hapus'])->name('hapus');
    });

    Route::prefix('ai-session')->name('ai-session.')->group(function () {
        Route::get('/', [AiSessionController::class, 'indeks'])->name('indeks');
        Route::patch('/{aiSession}/reset', [AiSessionController::class, 'reset'])->name('reset');
        Route::delete('/{aiSession}', [AiSessionController::class, 'hapus'])->name('hapus');
    });
});
