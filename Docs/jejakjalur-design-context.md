# JejakJalur — Design Context

> Dokumen ini berisi konteks lengkap aplikasi JejakJalur untuk keperluan desain UI/UX. Dibuat untuk digunakan bersama Claude Design / Stitch.

---

## Tentang Aplikasi

**JejakJalur** adalah platform web informasi kereta api dan destinasi wisata Indonesia. Pengguna bisa menjelajahi kota-kota yang terhubung jaringan kereta, menemukan destinasi wisata/kuliner/UMKM di sekitar stasiun, merencanakan rute perjalanan, dan berinteraksi dengan asisten AI bernama **Jejak AI**.

**Dikembangkan oleh:**
- **Lisvindanu** — [anaphygon.my.id](https://anaphygon.my.id)
- **Muhamad Marsa Nur Jaman** — [cyliatech.my.id](https://cyliatech.my.id)

**Live URL:**
- Staging: https://demo-jejakjalur.project-n.site
- Production: https://jejakjalur.project-n.site

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Laravel 13, PHP 8.4 |
| Frontend | React 19, TypeScript, Inertia.js v3 |
| Styling | TailwindCSS v4 |
| Database | PostgreSQL + pgvector (HNSW index untuk semantic search) |
| Maps | Leaflet.js (OpenStreetMap) |
| Geocoding | Nominatim (OSM) — free, tanpa API key |
| AI | Ollama API (model: gemma3:4b) + pgvector semantic search |
| Auth | Laravel session + Google OAuth + GitHub OAuth |
| Deployment | VPS (Nginx) + GitHub Actions CI/CD |

---

## Design System

**Warna utama:**
- Primary: `emerald-700` (#047857) — hijau kereta
- Background: `stone-50` / `white`
- Text: `stone-800` (heading), `stone-500` (sub), `stone-400` (muted)
- Danger: `red-600`
- Border: `stone-200`, `stone-100`

**Font:**
- Heading dekoratif: Serif (`font-serif`)
- Body: System sans-serif
- Kode stasiun: Monospace (`font-mono`)

**UI Components yang sudah ada:**
- `Button` (variant: primary, ghost, danger; size: sm, md)
- `Input`, `TextArea`, `Select`
- `Badge` (warna-warna)
- `Rating` (bintang)
- `Avatar`
- `Modal`
- `Pagination`
- `Loading`
- `Table`
- `DataTable` (admin — kolom, sort, search, pagination)
- `FormCard` (admin form wrapper dengan header + footer)
- `StatsCard` (admin dashboard stat tile)
- `ConfirmModal` (konfirmasi hapus)

**Layout:**
- `PublicLayout` — navbar + footer, responsive, max-width 1152px
- `AdminLayout` — sidebar + header + konten, hanya untuk admin

---

## Data & Skala

| Entitas | Jumlah (staging) |
|---------|-----------------|
| Kota | ~37 |
| Stasiun | ~492 |
| Destinasi | ~269 |
| Kategori destinasi | Wisata, Kuliner, UMKM |
| Koneksi antar stasiun | ratusan edge (untuk trip planner) |

---

## Halaman & Fitur yang Sudah Ada

### Publik

#### `/` — Beranda
- **Hero section** dengan 3 kartu destinasi unggulan yang bisa di-flip (tampilkan foto/deskripsi)
- **Subway map** visual (dekoratif, mirip peta metro)
- **Seksi kota** — grid kota-kota dengan stasiun
- **Featured destinasi** — daftar destinasi populer
- **Jejak AI Widget** — floating chat bubble di pojok kanan bawah (tersedia di semua halaman publik)

#### `/destinasi` — Daftar Destinasi
- Filter: kota (`kota_id`), stasiun (`stasiun_id`), kategori (`kategori`), search (`q`)
- Grid kartu destinasi dengan foto, rating bintang, badge kategori
- Pagination

#### `/destinasi/{id}` — Detail Destinasi
- Foto full-width header
- Info lengkap: nama, deskripsi, kategori, rating agregat, alamat
- **Lokasi & Akses panel:**
  - Mini Leaflet map dengan pin destinasi (hijau) + pin stasiun (merah) + garis putus-putus
  - Chip jarak straight-line stasiun → destinasi (Haversine, dalam meter/km)
  - Tombol "Cek Jarak dari Lokasiku" — pakai GPS browser, tampilkan jarak user → destinasi
  - Tombol "Peta Rute" — link internal ke halaman `/rute` (Leaflet map jaringan kereta)
  - Fallback: jika koordinat null, tampilkan alamat + link ke `/rute`
- **Ulasan section:**
  - Form tulis ulasan (hanya untuk user yang login): judul, rating bintang, konten
  - Daftar ulasan dengan avatar, nama, tanggal, rating, edit/hapus (milik sendiri)
  - Prompt login jika belum login

#### `/rute` — Peta Rute Kereta
- Stat: jumlah kota + stasiun aktif
- **Interactive Leaflet map** dengan marker semua stasiun
- **Trip planner** (PerencanaRute): pilih stasiun asal & tujuan → tampilkan rute terpendek (BFS pada graph koneksi)
- **Direktori stasiun** — grid kota, klik → modal daftar stasiun → klik stasiun → masuk ke halaman destinasi filter by stasiun

#### `/masuk` — Login
- Form email + password
- Tombol "Lanjutkan dengan Google" (OAuth)
- Tombol "Lanjutkan dengan GitHub" (OAuth)
- Link ke lupa password & daftar

#### `/daftar` — Register
- Form nama, email, password, konfirmasi password
- Checkbox consent
- Tombol Google OAuth

#### `/lupa-password` → `/reset-password/{token}` — Reset Password

#### `/profil` — Profil Pengguna (auth)
- Tampilkan info akun: nama, email, via OAuth atau email
- Edit nama & email
- Hapus akun (soft delete)

### Admin (`/admin/**` — hanya `is_admin = true`)

#### `/admin` — Dashboard
- 6 stat card: Total Kota, Total Stasiun, Total Destinasi, Total Pengguna, Total Ulasan, Pesan AI Hari Ini
- Tabel "Destinasi Pending Verifikasi" (5 terbaru, unverified)
- Tabel "Ulasan Terbaru" (5 terbaru)

#### `/admin/kota` — Manajemen Kota
- DataTable dengan search + pagination
- Kolom: No, Nama, Kode Ibukota, Jumlah Stasiun, Aksi (Edit, Hapus)
- Tambah/Edit form: nama, kode ibukota, foto

#### `/admin/stasiun` — Manajemen Stasiun
- DataTable dengan search + pagination
- Kolom: No, Nama, Kode, Kota, Aksi
- Tambah/Edit form: kota (select), nama, kode stasiun, lat, lng

#### `/admin/destinasi` — Manajemen Destinasi
- DataTable: nama, kategori, stasiun, rating, status verifikasi, aksi
- Tambah/Edit form: nama, deskripsi, alamat, lat/lng (opsional — auto-geocode dari alamat via Nominatim), kategori, stasiun terdekat, foto
- Tombol "Verifikasi" (toggle `is_verified`)

#### `/admin/pengguna` — Manajemen Pengguna
- DataTable: nama, email, via (email/google/github), jumlah ulasan, status admin, aksi
- Toggle admin, pulihkan (soft delete), hapus

#### `/admin/ulasan` — Manajemen Ulasan
- DataTable: destinasi, pengguna, rating, konten, tanggal
- Hapus ulasan

#### `/admin/ai-session` — Sesi Jejak AI
- DataTable: user, jumlah pesan, terakhir aktif
- Reset sesi, hapus sesi

---

## API Endpoints

### Publik / AI

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/` | Beranda |
| GET | `/destinasi` | Daftar destinasi (filter: kota_id, stasiun_id, kategori, q) |
| GET | `/destinasi/{id}` | Detail destinasi |
| GET | `/rute` | Halaman peta rute |
| GET | `/rute/cari-stasiun` | Search stasiun (query: q) |
| GET | `/rute/cari-rute` | Cari rute terpendek (query: dari, ke) |
| POST | `/ai/chat` | Kirim pesan ke Jejak AI (throttle: 30/menit) |
| GET | `/ai/status` | Status Jejak AI (apakah tersedia) |

### Auth

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/masuk` | Form login |
| POST | `/masuk` | Proses login |
| GET | `/daftar` | Form register |
| POST | `/daftar` | Proses register |
| POST | `/keluar` | Logout |
| GET | `/oauth/{provider}` | Redirect ke Google/GitHub |
| GET | `/oauth/{provider}/callback` | Callback OAuth |
| GET | `/lupa-password` | Form lupa password |
| POST | `/lupa-password` | Kirim link reset |
| GET | `/reset-password/{token}` | Form reset password |
| POST | `/reset-password` | Proses reset password |

### Profil (auth)

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/profil` | Tampilkan profil |
| GET | `/profil/edit` | Form edit profil |
| PATCH | `/profil` | Update profil |
| DELETE | `/profil` | Hapus akun |

### Ulasan (auth)

| Method | URL | Deskripsi |
|--------|-----|-----------|
| POST | `/destinasi/{destinasi}/ulasan` | Tambah ulasan |
| PATCH | `/destinasi/{destinasi}/ulasan/{ulasan}` | Edit ulasan |
| DELETE | `/destinasi/{destinasi}/ulasan/{ulasan}` | Hapus ulasan |

### Admin (auth + is_admin)

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | `/admin` | Dashboard |
| GET/POST | `/admin/kota` | List + tambah kota |
| GET | `/admin/kota/buat` | Form tambah kota |
| GET/PATCH/DELETE | `/admin/kota/{id}` | Edit / hapus kota |
| GET/POST | `/admin/stasiun` | List + tambah stasiun |
| GET | `/admin/stasiun/buat` | Form tambah stasiun |
| GET/PATCH/DELETE | `/admin/stasiun/{id}` | Edit / hapus stasiun |
| GET/POST | `/admin/destinasi` | List + tambah destinasi |
| GET | `/admin/destinasi/buat` | Form tambah destinasi |
| GET/PATCH/DELETE | `/admin/destinasi/{id}` | Edit / hapus destinasi |
| PATCH | `/admin/destinasi/{id}/verifikasi` | Toggle verifikasi |
| GET | `/admin/pengguna` | List pengguna |
| PATCH | `/admin/pengguna/{id}/toggle-admin` | Toggle status admin |
| PATCH | `/admin/pengguna/{id}/pulihkan` | Pulihkan akun (soft delete) |
| DELETE | `/admin/pengguna/{id}` | Hapus pengguna |
| GET | `/admin/ulasan` | List ulasan |
| DELETE | `/admin/ulasan/{id}` | Hapus ulasan |
| GET | `/admin/ai-session` | List sesi AI |
| PATCH | `/admin/ai-session/{id}/reset` | Reset sesi AI |
| DELETE | `/admin/ai-session/{id}` | Hapus sesi AI |

---

## Data Models

### User
```
id (uuid), nama, name, email, password (hashed),
google_id, github_id, is_admin (bool), consent_given (bool),
deleted_at (soft delete), created_at, updated_at
```

### Kota
```
id (uuid), nama, kode_ibukota, foto (path),
embedding (vector), created_at, updated_at
```

### Stasiun
```
id (uuid), kota_id (FK), nama, kode_stasiun,
lat (decimal), lng (decimal),
embedding (vector), created_at, updated_at
```

### Destinasi
```
id (uuid), stasiun_id (FK), nama, deskripsi, alamat,
lat (decimal), lng (decimal), kategori (Wisata|Kuliner|UMKM),
rating (decimal), foto (path), is_verified (bool),
embedding (vector), deleted_at (soft delete), created_at, updated_at
```

### Ulasan
```
id (uuid), user_id (FK), destinasi_id (FK),
judul, konten, rating (1-5),
deleted_at (soft delete), created_at, updated_at
```

### KoneksiStasiun
```
id (uuid), stasiun_dari_id (FK), stasiun_ke_id (FK),
jarak_km (float), created_at, updated_at
```

### AiSession
```
id (uuid), user_id (FK, nullable), session_token,
message_count, last_message_at, history (json),
created_at, updated_at
```

---

## Jejak AI

- Floating chat widget di semua halaman publik
- Model: gemma3:4b via Ollama API
- RAG: pgvector semantic search (embedding per destinasi/stasiun/kota) + direct name-match LIKE fallback
- Session: disimpan di DB per user/session token, ada riwayat percakapan
- Rate limit: 30 pesan/menit
- Auto-rotate API keys jika 429/401
- Sistem prompt: bilingual Indonesia, anti-halusinasi, hanya jawab berdasarkan data aktual
- Bisa jawab: info stasiun/kota, destinasi per stasiun, rute umum, siapa developer app ini
- Redirect ke kai.id untuk jadwal/harga tiket

---

## Fitur Otomatis (Background)

- **Auto-geocode**: saat destinasi disimpan/dibuat, jika lat/lng kosong, otomatis cari koordinat via Nominatim (OSM) berdasarkan alamat + kota
- **Auto-embed**: saat destinasi/stasiun/kota disimpan, otomatis generate vector embedding untuk semantic search AI
- **Rating update**: saat ulasan dibuat/diupdate/dihapus, otomatis hitung ulang rata-rata rating destinasi
- **Artisan command**: `php artisan jejak:geocode-destinasi [--force]` — batch geocode semua destinasi dengan koordinat null
