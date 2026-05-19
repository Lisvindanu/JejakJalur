# JEJAKJALUR — FLOW PROCESS DOCUMENTATION

> **Stack:** Laravel 13 + Inertia.js v3 + React 19 + PostgreSQL  
> **Diperbarui:** 2026-05-19  

---

## DAFTAR ISI

1. [Arsitektur Umum](#1-arsitektur-umum)
2. [Flow Request Umum (Inertia)](#2-flow-request-umum-inertia)
3. [Flow Autentikasi](#3-flow-autentikasi)
4. [Flow Admin](#4-flow-admin)
5. [Flow Publik (Pengguna)](#5-flow-publik-pengguna)
6. [Flow Data & Model](#6-flow-data--model)
7. [Flow Pencarian & Filter](#7-flow-pencarian--filter)
8. [Flow Upload Foto](#8-flow-upload-foto)
9. [Flow Rating Otomatis](#9-flow-rating-otomatis)
10. [Flow UU PDP (Hapus Akun)](#10-flow-uu-pdp-hapus-akun)
11. [Peta Halaman (Page Map)](#11-peta-halaman-page-map)
12. [Shared Props Inertia](#12-shared-props-inertia)

---

## 1. ARSITEKTUR UMUM

```
Browser
  │
  ▼
Nginx (Reverse Proxy)
  │
  ▼
Laravel Application
  ├── routes/web.php          → Route dispatcher
  ├── Middleware              → IsAdmin, Auth, HandleInertiaRequests
  ├── Controllers             → Business logic entry points
  ├── Services                → Reusable business operations
  ├── Models                  → Eloquent ORM + Observer
  └── Inertia::render()       → Passes props ke React
        │
        ▼
      React (Inertia SPA)
        ├── pages/            → Page components (per route)
        ├── layouts/          → PublicLayout, AdminLayout
        └── Wayfinder         → Type-safe route helpers
              │
              ▼
           PostgreSQL
             ├── users
             ├── kota
             ├── stasiun
             ├── destinasi
             └── ulasan
```

---

## 2. FLOW REQUEST UMUM (INERTIA)

### Kunjungan Pertama (Full Page Load)

```
Browser GET /destinasi
  │
  ▼
Nginx → Laravel
  │
  ▼
Middleware Stack:
  1. HandleInertiaRequests  → share: auth.user, flash, name
  2. Auth (jika route protected)
  3. IsAdmin (jika route admin)
  │
  ▼
DestinasiController@indeks()
  │
  ▼
Inertia::render('Destinasi/Indeks', $props)
  │
  ▼
Blade: app.blade.php
  ├── @vite(['app.css', 'app.tsx', 'pages/Destinasi/Indeks.tsx'])
  └── <x-inertia::app />  ← Server-side render props ke JSON
        │
        ▼
      Browser menerima HTML + hydrates React
        │
        ▼
      React: pages/Destinasi/Indeks.tsx renders dengan props
```

### Navigasi Selanjutnya (SPA / XHR)

```
User klik Link href="/destinasi/123"
  │
  ▼
Inertia intercepts → XHR request ke /destinasi/123
  Header: X-Inertia: true, X-Inertia-Version: {asset_version}
  │
  ▼
Laravel:
  ├── Middleware: HandleInertiaRequests (share flash/auth)
  └── DestinasiController@detail()
        │
        ▼
      Inertia::render('Destinasi/Detail', $props)
        │
        ▼
      Response JSON: { component, props, url, version }
        │
        ▼
      Inertia client swap component → React re-renders
      URL updated tanpa full reload
```

---

## 3. FLOW AUTENTIKASI

### 3.1 Register (Email/Password)

```
Guest
  │
  ▼
GET /daftar
  └── AuthController@tampilkanFormulirDaftar()
        └── Inertia::render('Auth/Daftar')
              │
              ▼
            Form input:
              - nama*
              - email*
              - password* (min 8)
              - password_confirmation*
              - consent_given* (checkbox UU PDP)
              │
              ▼
POST /daftar
  │
  ├── RegisterRequest::validate()
  │     ├── nama: required|string|max:255
  │     ├── email: required|email|unique:users
  │     ├── password: required|min:8|confirmed
  │     └── consent_given: required|accepted
  │
  ├── GAGAL → back() + errors (ditampilkan di form)
  │
  └── BERHASIL → AuthService::daftarPengguna()
        ├── User::create(nama, email, password_hash, consent_given=true)
        ├── Auth::login($user) [auto-login]
        └── redirect('home') + flash: 'Selamat datang di JejakJalur!'
```

### 3.2 Login (Email/Password)

```
Guest
  │
  ▼
GET /masuk
  └── AuthController@tampilkanFormulirLogin()
        └── Inertia::render('Auth/Login')
              │
              ▼
            Form input:
              - email*
              - password*
              - ingat (checkbox, optional)
              │
              ▼
POST /masuk
  │
  ├── LoginRequest::validate()
  │     ├── email: required|email
  │     ├── password: required|string
  │     └── ingat: boolean
  │
  └── AuthService::loginDenganEmail(email, password, ingat)
        │
        ├── Auth::attempt() → GAGAL
        │     └── back() + errors.email: 'Email atau password salah.'
        │
        └── Auth::attempt() → BERHASIL
              ├── $request->session()->regenerate()
              └── redirect()->intended(route('home'))
```

### 3.3 OAuth (Google / GitHub)

```
Guest klik "Masuk dengan Google" atau "Masuk dengan GitHub"
  │
  ▼
GET /oauth/{provider}
  │
  ├── Validasi: provider ∈ ['google', 'github']
  └── Socialite::driver($provider)->redirect()
        │
        ▼
      Provider OAuth page (Google/GitHub)
        │
        ▼
      User grants permission
        │
        ▼
GET /oauth/{provider}/callback
  │
  ├── Socialite::driver($provider)->user() → $dataSosial
  │
  └── AuthService::loginAtauDaftarViaOAuth($provider, $dataSosial)
        │
        ├── Cek: user ada dengan {provider}_id?
        │     └── YA → Auth::login() → redirect home + flash
        │
        ├── Cek: user ada dengan email sama?
        │     └── YA → update {provider}_id → Auth::login() → redirect
        │
        └── BARU → User::create(nama, email, {provider}_id)
                      ├── password = null (OAuth only)
                      ├── consent_given = false
                      └── Auth::login($user, remember=true)
                            └── redirect home + flash: 'Berhasil masuk dengan {Provider}!'
```

### 3.4 Reset Password

```
Guest lupa password
  │
  ▼
GET /lupa-password
  └── Inertia::render('Auth/LupaPassword')
        │
        ▼
      Form: email*
        │
        ▼
POST /lupa-password
  │
  └── Password::sendResetLink(['email' => $email])
        ├── Jika email ada → kirim email reset
        └── Always → flash sukses (hindari enumerasi email)
              │
              ▼
            User buka email → klik link reset
              │
              ▼
GET /reset-password/{token}?email={email}
  └── Inertia::render('Auth/ResetPassword', [token, email])
        │
        ▼
      Form: password*, password_confirmation*
        │
        ▼
POST /reset-password
  │
  └── Password::reset()
        ├── GAGAL (token expired/invalid) → back() + error
        └── BERHASIL → update password hash
                          └── redirect('/masuk') + flash: 'Password berhasil direset.'
```

### 3.5 Logout

```
Authenticated User (POST /keluar)
  │
  └── AuthService::logout()
        ├── Auth::logout()
        ├── $request->session()->invalidate()
        └── $request->session()->regenerateToken()
              └── redirect('home')
```

---

## 4. FLOW ADMIN

> **Middleware:** `auth` + `admin` (IsAdmin) diperlukan untuk semua route admin

### 4.1 Akses Admin

```
Request ke /admin/*
  │
  ▼
Middleware: auth
  ├── Tidak login → redirect ke /masuk
  └── Login → lanjut ke middleware berikutnya
        │
        ▼
      Middleware: admin (IsAdmin)
        ├── $request->user()->is_admin === false → abort(403)
        └── is_admin === true → lanjut ke controller
```

### 4.2 Dashboard Admin

```
GET /admin
  │
  └── DashboardController@tampilkan()
        └── Inertia::render('Admin/Dashboard', [
              statistik: {
                jumlah_kota:         Kota::count(),
                jumlah_stasiun:      Stasiun::count(),
                jumlah_destinasi:    Destinasi::count(),
                destinasi_verified:  Destinasi::where('is_verified', true)->count(),
                jumlah_pengguna:     User::count(),
              }
            ])
```

### 4.3 CRUD Kota

```
Index:
  GET /admin/kota
    └── KotaService::semuaKota()  [withCount('stasiun')]
          └── Inertia: 'Admin/Kota/Indeks' { kota[] }

Create:
  GET /admin/kota/buat
    └── Inertia: 'Admin/Kota/Formulir' (kosong)

  POST /admin/kota
    │
    ├── KotaRequest: nama (unique), kode_ibukota
    └── KotaService::buatKota(data)
          └── Kota::create() → redirect indeks + flash sukses

Edit:
  GET /admin/kota/{kota}/edit
    └── Inertia: 'Admin/Kota/Formulir' { kota }

  PATCH /admin/kota/{kota}
    │
    ├── KotaRequest: nama (unique ignore self), kode_ibukota
    └── KotaService::perbaruiKota(kota, data)
          └── $kota->update() → redirect indeks + flash sukses

Delete:
  DELETE /admin/kota/{kota}
    └── KotaService::hapusKota(kota)
          ├── $kota->delete()
          └── CASCADE: stasiun → destinasi → ulasan (dihapus otomatis DB)
                └── redirect indeks + flash sukses
```

### 4.4 CRUD Stasiun

```
Index:
  GET /admin/stasiun
    └── StasiunService::semuaStasiunDenganKota()  [with('kota'), withCount('destinasi')]

Create:
  GET /admin/stasiun/buat
    └── Inertia: 'Admin/Stasiun/Formulir' {
          semuaKota: KotaService::semuaKota()
        }

  POST /admin/stasiun
    │
    ├── StasiunRequest:
    │     kota_id (exists:kota,id)
    │     nama (unique:stasiun)
    │     kode_stasiun
    │     lat? (decimal, -90 ~ +90)
    │     lng? (decimal, -180 ~ +180)
    └── StasiunService::buatStasiun(data)

Edit:
  GET /admin/stasiun/{stasiun}/edit
    └── Inertia: 'Admin/Stasiun/Formulir' { stasiun, semuaKota }

  PATCH /admin/stasiun/{stasiun}
    └── StasiunService::perbaruiStasiun(stasiun, data)
          └── $stasiun->update() + $stasiun->fresh('kota')

Delete:
  DELETE /admin/stasiun/{stasiun}
    └── StasiunService::hapusStasiun(stasiun)
          └── CASCADE: destinasi → ulasan
```

### 4.5 CRUD Destinasi (+ Upload Foto + Verifikasi)

```
Index:
  GET /admin/destinasi
    ├── Filter: kata_kunci, stasiun_id, kategori
    └── DestinasiService::daftarDestinasiTerfilter(filter)
          └── Inertia: 'Admin/Destinasi/Indeks' { destinasi, semuaStasiun, filter }

Create:
  GET /admin/destinasi/buat
    └── Inertia: 'Admin/Destinasi/Formulir' { semuaStasiun }

  POST /admin/destinasi
    │
    ├── DestinasiRequest:
    │     stasiun_id, nama, deskripsi, alamat,
    │     kategori (Wisata|Kuliner|UMKM)
    │     foto? (image, max 2MB, jpg/png/webp)
    │
    └── DestinasiService::buatDestinasi(data, foto?)
          ├── Jika ada foto:
          │     $foto->store('destinasi', 'public')
          │     → storage/app/public/destinasi/{uuid.ext}
          │     → symlink: public/storage/destinasi/{uuid.ext}
          └── Destinasi::create(data + foto_path)

Edit:
  GET /admin/destinasi/{destinasi}/edit
    └── Inertia: 'Admin/Destinasi/Formulir' { destinasi, semuaStasiun }

  PATCH /admin/destinasi/{destinasi}
    └── DestinasiService::perbaruiDestinasi(destinasi, data, fotoBaru?)
          ├── Jika ada foto baru:
          │     Storage::delete(foto_lama)
          │     Simpan foto baru
          └── $destinasi->update()

Delete:
  DELETE /admin/destinasi/{destinasi}
    └── DestinasiService::hapusDestinasi(destinasi)
          ├── Storage::disk('public')->delete(foto) [jika ada]
          └── $destinasi->delete() → CASCADE: ulasan

Verifikasi (Toggle):
  PATCH /admin/destinasi/{destinasi}/verifikasi
    └── $destinasi->update(['is_verified' => !$destinasi->is_verified])
          ├── true  → flash: 'Destinasi berhasil diverifikasi.'
          └── false → flash: 'Destinasi berhasil dibatalkan verifikasinya.'
```

---

## 5. FLOW PUBLIK (PENGGUNA)

### 5.1 Beranda

```
GET /
  └── HomeController@tampilkan()
        ├── DestinasiService::destinasiFeatured(6)
        │     → Destinasi is_verified=true, order by rating DESC, limit 6
        │     → with('stasiun.kota')
        └── KotaService::semuaKotaDenganStasiun()
              └── Inertia: 'welcome' { destinasiFeatured, semuaKota }
```

### 5.2 Jelajahi Destinasi

```
GET /destinasi[?kata_kunci=&kota_id=&stasiun_id=&kategori=]
  │
  └── DestinasiController@indeks()
        │
        ├── Filter dari query string:
        │     kata_kunci → scopeSearch() → pg_trgm fuzzy + ILIKE
        │     kota_id    → whereHas('stasiun', fn → stasiun.kota_id)
        │     stasiun_id → where('stasiun_id')
        │     kategori   → where('kategori')
        │
        ├── Eager load: stasiun.kota
        ├── Order: rating DESC
        └── Paginate: 12 per halaman (withQueryString)
              └── Inertia: 'Destinasi/Indeks' { destinasi, semuaKota, filter }
```

### 5.3 Detail Destinasi

```
GET /destinasi/{id}
  │
  └── DestinasiController@detail(Destinasi $destinasi)
        └── DestinasiService::detailDestinasi($destinasi)
              ├── load('stasiun.kota')
              └── load('ulasan.user')
                    └── Inertia: 'Destinasi/Detail' { destinasi }
```

### 5.4 Pencarian Rute (Subway Map)

```
GET /rute
  └── RuteController@tampilkan()
        └── KotaService::semuaKotaDenganStasiun()
              └── Inertia: 'Rute/Tampilkan' { semuaKota }

GET /rute/cari-stasiun?q={keyword}
  └── RuteController@cariStasiun()
        └── StasiunService::semuaStasiunDenganKota()
              └── filter: str_contains(nama, keyword)
                    └── JSON response: Stasiun[]
```

### 5.5 Tulis Ulasan (Auth Required)

```
Auth User di halaman GET /destinasi/{id}
  │
  ▼
POST /destinasi/{destinasi}/ulasan
  │
  ├── UlasanRequest:
  │     rating: 1–5 (required)
  │     judul?: max 100 char
  │     konten: required, max 1000 char
  │
  └── UlasanService::buatUlasan(data, $user, $destinasi)
        ├── $destinasi->ulasan()->create({
        │     user_id, judul, konten, rating
        │   })
        └── Observer (Ulasan::booted):
              └── destinasi.rating = avg(ulasan.rating) [auto-update]
                    └── redirect back + flash sukses
```

### 5.6 Edit & Hapus Ulasan

```
Auth User (pemilik ulasan)
  │
  ▼
PATCH /destinasi/{destinasi}/ulasan/{ulasan}
  └── UlasanService::perbaruiUlasan(ulasan, data, $user)
        ├── Cek ownership: ulasan.user_id === $user->id
        │     → GAGAL: AuthorizationException (403)
        └── BERHASIL: $ulasan->update() → Observer: auto-update rating

DELETE /destinasi/{destinasi}/ulasan/{ulasan}
  └── UlasanService::hapusUlasan(ulasan, $user)
        ├── Cek ownership
        └── $ulasan->delete() → Observer: auto-update rating
```

### 5.7 Profil Pengguna

```
GET /profil
  └── Inertia: 'Profil/Tampilkan' { pengguna: auth()->user() }

GET /profil/edit
  └── Inertia: 'Profil/Edit' { pengguna: auth()->user() }

PATCH /profil
  │
  ├── ProfilRequest:
  │     nama: required, max 100
  │     email: required, unique (ignore self)
  └── Update: $user->nama, $user->name, $user->email
        └── redirect profil + flash sukses
```

---

## 6. FLOW DATA & MODEL

### Relasi Antar Model

```
Kota (1) ─────────── (N) Stasiun
                              │
                         (1) ─┤
                              │
                Destinasi (N)─┘
                     │
                 (1) ─┤
                      │
               Ulasan (N)─────── User (1)
```

### Diagram ER

```
┌──────────┐     ┌──────────────┐     ┌─────────────────┐
│  KOTA    │     │   STASIUN    │     │    DESTINASI    │
│──────────│     │──────────────│     │─────────────────│
│ id (uuid)│1───N│ id (uuid)    │1───N│ id (uuid)       │
│ nama     │     │ kota_id  (FK)│     │ stasiun_id (FK) │
│ kode_ibu │     │ nama         │     │ nama            │
└──────────┘     │ kode_stasiun │     │ deskripsi       │
                 │ lat, lng     │     │ alamat          │
                 └──────────────┘     │ kategori (enum) │
                                      │ rating (calc)   │
                                      │ foto?           │
                                      │ is_verified     │
                                      └────────┬────────┘
                                               │ 1
                                               N
                                       ┌───────────────┐
                                       │    ULASAN     │
           ┌───────────┐               │───────────────│
           │   USERS   │               │ id (uuid)     │
           │───────────│ 1         N   │ destinasi_id  │
           │ id (uuid) │───────────────│ user_id (FK)  │
           │ nama      │               │ judul?        │
           │ email     │               │ konten        │
           │ is_admin  │               │ rating (1-5)  │
           │ google_id?│               └───────────────┘
           │ github_id?│
           │ deleted_at│ ← SoftDelete (UU PDP)
           └───────────┘
```

### Observer Pattern (Rating Otomatis)

```
Ulasan Model booted():
  ├── created  → $ulasan->destinasi->updateRating()
  ├── updated  → $ulasan->destinasi->updateRating()
  └── deleted  → $ulasan->destinasi->updateRating()

Destinasi::updateRating():
  $this->rating = $this->ulasan()->avg('rating') ?? 0
  $this->save()
```

---

## 7. FLOW PENCARIAN & FILTER

### Fuzzy Search (pg_trgm)

```
User input: "bakso solo"
  │
  ▼
GET /destinasi?kata_kunci=bakso+solo
  │
  ▼
DestinasiService::daftarDestinasiTerfilter(['kata_kunci' => 'bakso solo'])
  │
  ▼
Destinasi::search('bakso solo')
  └── scopeSearch($query, 'bakso solo')
        └── ->whereRaw('nama % ? OR nama ILIKE ?', ['bakso solo', '%bakso solo%'])
              ├── pg_trgm similarity match
              └── ILIKE fallback
                    └── Results ordered by rating DESC → paginate(12)
```

### Filter Kombinasi

```
GET /destinasi?kota_id=xxx&kategori=Kuliner&stasiun_id=yyy
  │
  ▼
Builder chain:
  1. whereHas('stasiun', fn($q) => $q->where('kota_id', $kotaId))
  2. where('kategori', 'Kuliner')
  3. where('stasiun_id', $stasiunId)
  4. orderByDesc('rating')
  5. paginate(12)->withQueryString()
```

### Indexes yang Dipakai

| Query | Index |
|-------|-------|
| Filter by kota_id | `idx_stasiun_kota_id` (B-tree) |
| Filter by kategori | `idx_destinasi_kategori` (B-tree) |
| Filter by is_verified | `idx_destinasi_is_verified` (B-tree) |
| Fuzzy search nama | `destinasi_nama_trgm` (GIN, pg_trgm) |
| OAuth lookup | `idx_users_google_id`, `idx_users_github_id` (B-tree) |

---

## 8. FLOW UPLOAD FOTO

```
Admin POST /admin/destinasi (dengan foto)
  │
  ▼
DestinasiRequest validate:
  foto: nullable|image|mimes:jpg,jpeg,png,webp|max:2048
  │
  ▼
DestinasiService::buatDestinasi(data, $foto)
  │
  ├── $foto !== null:
  │     $path = $foto->store('destinasi', 'public')
  │     → Tersimpan: storage/app/public/destinasi/{nama_acak.ext}
  │     → URL publik:  /storage/destinasi/{nama_acak.ext}
  │
  └── Destinasi::create([..., 'foto' => $path])

Update foto (PATCH):
  ├── Storage::disk('public')->delete($destinasi->foto)  [hapus lama]
  └── $fotoBaru->store('destinasi', 'public')            [simpan baru]

Hapus destinasi (DELETE):
  └── Storage::disk('public')->delete($destinasi->foto)  [hapus foto dulu]
      → $destinasi->delete()
```

---

## 9. FLOW RATING OTOMATIS

```
Ulasan dibuat/diperbarui/dihapus
  │
  ▼
Eloquent Observer (Ulasan::booted)
  │
  ▼
$ulasan->destinasi->updateRating()
  │
  ▼
Destinasi::updateRating()
  ├── $avg = $this->ulasan()->avg('rating')
  ├── $this->rating = $avg ?? 0.00
  └── $this->save()

Contoh:
  3 ulasan: rating 4, 5, 3  →  avg = 4.00  →  destinasi.rating = 4.00
  Ulasan rating 3 dihapus   →  avg = 4.50  →  destinasi.rating = 4.50
  Semua ulasan dihapus      →  avg = null  →  destinasi.rating = 0.00
```

---

## 10. FLOW UU PDP (HAPUS AKUN)

> Berdasarkan UU Perlindungan Data Pribadi — hak untuk dilupakan

```
Auth User → DELETE /profil
  │
  ▼
ProfilController@hapus()
  │
  ├── $pengguna = auth()->user()
  ├── auth()->logout()                         [1. Logout dari session]
  ├── $pengguna->delete()                      [2. SoftDelete (deleted_at = now)]
  │     └── Data tetap ada di DB untuk audit,
  │         tidak bisa login lagi
  ├── $request->session()->invalidate()        [3. Invalidate session]
  └── $request->session()->regenerateToken()   [4. Regenerate CSRF token]
        └── redirect('home') + flash: 'Akun Anda telah dihapus.'
```

---

## 11. PETA HALAMAN (PAGE MAP)

```
PUBLIC (Guest & Auth)
├── /                          → pages/welcome.tsx
├── /destinasi                 → pages/Destinasi/Indeks.tsx
├── /destinasi/{id}            → pages/Destinasi/Detail.tsx
└── /rute                      → pages/Rute/Tampilkan.tsx

AUTH (Guest Only — middleware: guest)
├── /masuk                     → pages/Auth/Login.tsx
├── /daftar                    → pages/Auth/Daftar.tsx
├── /lupa-password             → pages/Auth/LupaPassword.tsx
└── /reset-password/{token}    → pages/Auth/ResetPassword.tsx

PROFILE (Auth Required)
├── /profil                    → pages/Profil/Tampilkan.tsx
└── /profil/edit               → pages/Profil/Edit.tsx

ADMIN (Auth + is_admin=true)
├── /admin                     → pages/Admin/Dashboard.tsx
├── /admin/kota                → pages/Admin/Kota/Indeks.tsx
├── /admin/kota/buat           → pages/Admin/Kota/Formulir.tsx
├── /admin/kota/{id}/edit      → pages/Admin/Kota/Formulir.tsx  (komponen sama)
├── /admin/stasiun             → pages/Admin/Stasiun/Indeks.tsx
├── /admin/stasiun/buat        → pages/Admin/Stasiun/Formulir.tsx
├── /admin/stasiun/{id}/edit   → pages/Admin/Stasiun/Formulir.tsx
├── /admin/destinasi           → pages/Admin/Destinasi/Indeks.tsx
├── /admin/destinasi/buat      → pages/Admin/Destinasi/Formulir.tsx
└── /admin/destinasi/{id}/edit → pages/Admin/Destinasi/Formulir.tsx

API (JSON Response)
└── GET /rute/cari-stasiun?q=  → JSON: Stasiun[]
```

---

## 12. SHARED PROPS INERTIA

> Tersedia di **semua halaman** via `usePage().props`

```typescript
// HandleInertiaRequests::share() → semua halaman menerima:
{
  name: string,          // config('app.name') = "JejakJalur"
  auth: {
    user: User | null    // null jika belum login
  },
  flash: {
    sukses: string | null,   // session('sukses')
    error:  string | null,   // session('error')
  }
}
```

### Cara Pakai di React

```tsx
import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';

const { auth, flash } = usePage<SharedProps>().props;

// Guard auth
if (!auth.user) → tampilkan tombol Login/Daftar
if (auth.user?.is_admin) → tampilkan link Admin Panel

// Flash message
if (flash.sukses) → tampilkan toast hijau
if (flash.error)  → tampilkan toast merah
```

---

## RINGKASAN ALUR UTAMA

```
                    ┌─────────────────────────────────┐
                    │           JEJAKJALUR            │
                    └─────────────────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
     GUEST USER              AUTH USER               ADMIN USER
           │                       │                       │
    ┌──────▼──────┐         ┌──────▼──────┐        ┌──────▼──────┐
    │ Beranda     │         │ Beranda     │        │ Dashboard   │
    │ Jelajahi    │         │ Jelajahi    │        │ CRUD Kota   │
    │ Rute        │         │ Rute        │        │ CRUD Stasiun│
    │ ─────────── │         │ ─────────── │        │ CRUD Dest.  │
    │ Login       │         │ Tulis Ulasan│        │ Verifikasi  │
    │ Register    │         │ Edit Profil │        └─────────────┘
    └─────────────┘         │ Hapus Akun  │
                            └─────────────┘
```
