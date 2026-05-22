# JejakJalur

Direktori destinasi wisata, kuliner, dan UMKM di jalur kereta Pulau Jawa. Aplikasi web yang menghubungkan transit publik (KRL, KAI, Whoosh) dengan eksplorasi destinasi lokal di sekitar stasiun.

Submission lomba **INFEST 2026** — kategori Website Pariwisata dan Budaya.

---

## Live Demo

| Item        | URL                                                |
| ----------- | -------------------------------------------------- |
| Website     | https://jejakjalur.project-n.site                  |
| Repository  | https://github.com/Lisvindanu/JejakJalur           |

Disarankan menguji langsung melalui link hosting agar seluruh fitur (peta interaktif, pencarian rute, OAuth Google, upload avatar, ulasan, dashboard admin) berjalan dengan konfigurasi produksi.

---

## Kredensial Akun

Akun demo sudah tersedia di database produksi dan di file dump.

### Administrator

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| Email    | `admin@jejakjalur.id`                       |
| Password | `admin123!`                                 |
| Akses    | Dashboard Admin (`/admin`) — CRUD penuh     |

### Pengguna Standar

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| Email    | `demo@jejakjalur.id`                        |
| Password | `demo123!`                                  |
| Akses    | Pengguna biasa (ulasan, wishlist, profil)   |

OAuth Google juga aktif. Pengguna dapat mendaftar atau masuk menggunakan akun Google pribadi tanpa konfirmasi email.

---

## Database

**Jenis:** PostgreSQL 14 dengan ekstensi `pgvector` (untuk pencarian semantik berbasis embedding).
**Lokasi:** Online (hosted di VPS produksi).

### Akses Remote (untuk verifikasi via pgAdmin, DBeaver, atau psql)

| Field    | Value                          |
| -------- | ------------------------------ |
| Host     | `167.253.158.192`              |
| Port     | `5432`                         |
| Database | `jejakjalur_prod`              |
| Username | `jejakjalur`                   |
| Password | `JejakJalur2026Lomba`          |
| SSL Mode | `prefer` (atau `disable`)      |

Contoh koneksi via `psql`:

```bash
PGPASSWORD='JejakJalur2026Lomba' psql -h 167.253.158.192 -U jejakjalur -d jejakjalur_prod
```

Connection string:

```
postgresql://jejakjalur:JejakJalur2026Lomba@167.253.158.192:5432/jejakjalur_prod
```

### File Dump

Berkas dump tersedia di [`database/dump/jejakjalur_prod.sql`](database/dump/jejakjalur_prod.sql) untuk keperluan import lokal.

```bash
# 1. Buat database baru
createdb -U postgres jejakjalur

# 2. Aktifkan ekstensi pgvector (wajib — kolom embedding bertipe vector)
psql -U postgres -d jejakjalur -c 'CREATE EXTENSION IF NOT EXISTS vector;'

# 3. Restore dump
psql -U postgres -d jejakjalur < database/dump/jejakjalur_prod.sql
```

---

## Stack Teknologi

| Layer            | Teknologi                                            |
| ---------------- | ---------------------------------------------------- |
| Backend          | PHP 8.4, Laravel 13                                  |
| Frontend         | React 19, TypeScript, Inertia.js v3                  |
| Styling          | TailwindCSS v4                                       |
| Database         | PostgreSQL 14 + pgvector                             |
| Cache & Session  | Redis                                                |
| Object Storage   | Cloudflare R2 (CDN: `cdn.jejakjalur.project-n.site`) |
| Autentikasi      | Laravel built-in + Socialite (Google OAuth)          |
| Build Tool       | Vite + Wayfinder                                     |

---

## Setup Lokal

### Prasyarat

- PHP 8.4 atau lebih baru, dengan ekstensi: `pdo_pgsql`, `pgsql`, `redis`, `gd`, `mbstring`, `xml`, `bcmath`, `zip`
- PostgreSQL 14 atau lebih baru, dengan ekstensi `pgvector`
- Node.js 20 atau lebih baru
- Composer 2 atau lebih baru
- Redis (opsional — dapat menggunakan driver `database`)

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/Lisvindanu/JejakJalur.git
cd JejakJalur

# 2. Instal dependensi
composer install
npm install

# 3. Konfigurasi environment
cp .env.example .env
php artisan key:generate
```

### Konfigurasi `.env`

Sesuaikan nilai berikut di file `.env`:

```env
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=jejakjalur
DB_USERNAME=postgres
DB_PASSWORD=<password-postgres-lokal>

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database

# Filesystem — gunakan disk "public" untuk pengembangan lokal
FILESYSTEM_DISK=public

# (Opsional) Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

Aplikasi tetap berjalan tanpa konfigurasi OAuth Google, R2, Tavily, maupun Geocoding API. Komponen tersebut bersifat opsional.

### Import Database

Disarankan menggunakan file dump agar data destinasi, stasiun, dan akun demo sudah tersedia:

```bash
createdb -U postgres jejakjalur
psql -U postgres -d jejakjalur -c 'CREATE EXTENSION IF NOT EXISTS vector;'
psql -U postgres -d jejakjalur < database/dump/jejakjalur_prod.sql
```

Alternatif migrasi dan seed bersih:

```bash
php artisan migrate:fresh --seed
```

### Build dan Jalankan

```bash
npm run build
php artisan serve
```

Aplikasi dapat diakses melalui http://localhost:8000.

Untuk mode pengembangan dengan hot reload:

```bash
composer run dev
```

Perintah tersebut menjalankan PHP server, queue worker, dan Vite dev server secara paralel.

---

## Fitur Utama

### Halaman Publik

- Beranda dengan pencarian global
- Direktori 502 stasiun dan 72 kota di Pulau Jawa
- Direktori 270+ destinasi (Wisata, Kuliner, UMKM)
- Peta interaktif berbasis Leaflet dan OpenStreetMap
- Pencarian rute kereta antar-stasiun dengan visualisasi jalur
- Detail destinasi lengkap dengan ulasan dan rating
- Wishlist dan riwayat ulasan pada halaman profil

### Autentikasi

- Registrasi, login, dan logout dengan email + password
- Lupa password dan reset password via email
- OAuth Google melalui Laravel Socialite
- Upload avatar profil

### Dashboard Administrator

- CRUD Kota
- CRUD Stasiun
- CRUD Destinasi dengan upload foto ke Cloudflare R2
- Manajemen Ulasan
- Statistik agregat

---

## Struktur Repository

```
JejakJalur/
├── app/
│   ├── Http/
│   │   ├── Controllers/        Controller per domain
│   │   │   ├── Admin/          CRUD administrator
│   │   │   └── Auth/           Autentikasi dan OAuth
│   │   ├── Middleware/         Middleware (IsAdmin, HandleInertiaRequests, dll)
│   │   └── Requests/           FormRequest validation
│   ├── Models/                 Eloquent (User, Kota, Stasiun, Destinasi, Ulasan, dll)
│   ├── Services/               Layer business logic
│   └── Console/Commands/       Artisan command (scrape, geocode, embedding, dll)
├── database/
│   ├── migrations/             Skema migrasi
│   ├── seeders/                Seeder data awal
│   └── dump/jejakjalur_prod.sql  Dump database lengkap untuk import lokal
├── resources/
│   ├── js/
│   │   ├── pages/              Halaman Inertia React
│   │   ├── components/         Komponen reusable
│   │   └── layouts/            Layout aplikasi dan admin
│   └── views/                  Blade root (app.blade.php)
└── routes/web.php              Definisi routing
```

---

## Tim

| Nama          | Peran                  |
| ------------- | ---------------------- |
| Lisvindanu    | Backend dan DevOps     |
| Marsa         | Frontend dan Design    |

---

Repository ini dikembangkan untuk kompetisi INFEST 2026. Seluruh hak cipta dimiliki oleh tim pengembang.
