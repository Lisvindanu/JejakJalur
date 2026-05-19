# PROJECT STRUCTURE DOCUMENTATION - JEJAKJALUR

> **Project:** JejakJalur — Direktori Pariwisata & Kuliner Hidden Gem berbasis Rute Stasiun Kereta Api
> **Tech Stack:** Laravel 13 + Inertia.js v3 + React 19 + TypeScript + Tailwind CSS v4 + PostgreSQL + Redis
> **Architecture:** Monolith (Laravel + Inertia) · Atomic Design · PascalCase conventions
> **Team:** 2 orang · Timeline: 3 hari · Kompetisi universitas — target: menang

---

## CONSTRAINT & PRIORITY

```
⚡ 3 HARI, 2 ORANG, ZERO BUDGET
🏆 POIN BONUS: Custom SVG Subway Map + OAuth Google/GitHub
🎯 WAJIB JALAN: Auth · CRUD Admin · Search · Review/Ulasan
📦 STACK: Laravel + Inertia React (monolith, bukan SPA terpisah)
🗃️ DB: PostgreSQL (pg_trgm fuzzy search) + Redis (session/cache)
```

### Priority Urutan Pengerjaan

| Hari | Backend (Laravel) | Frontend (React/Inertia) |
|------|-------------------|--------------------------|
| **1** | Migration + Seeder + Auth (email + OAuth) | PublicLayout + Navbar + SubwayMap SVG |
| **2** | Admin CRUD (Kota/Stasiun/Destinasi) + Search | Admin panel + Halaman publik + Search UI |
| **3** | Ulasan API + Polish + Bug fix | Ulasan form + Detail page + Responsif |

---

## PROJECT OVERVIEW

**JejakJalur** adalah direktori *hidden gem* (wisata & kuliner lokal) yang bisa ditemukan pelancong berdasarkan stasiun kereta api terdekat.

- **4 Kota:** Jakarta, Bandung, Yogyakarta, Surabaya
- **8 Stasiun** (2 per kota)
- **40 Destinasi** (5 per stasiun)
- **120 Ulasan dummy**
- **UI:** Custom SVG subway-map (NO template, NO Google Maps) → poin bonus

---

## DATABASE SCHEMA (PostgreSQL)

### ERD Relasi
```
KOTA (1) ──── (N) STASIUN (1) ──── (N) DESTINASI (1) ──── (N) ULASAN
                                                               │
USER (1) ────────────────────────────────────────────── (N) ULASAN
```

### Tabel

```sql
-- kota
id (uuid PK), nama (unique), kode_ibukota, created_at, updated_at

-- stasiun
id (uuid PK), kota_id (FK → kota.id CASCADE), nama (unique), kode_stasiun, created_at, updated_at

-- destinasi
id (uuid PK), stasiun_id (FK → stasiun.id CASCADE),
nama, deskripsi, alamat, kategori (enum: Wisata|Kuliner|UMKM),
rating (decimal, avg dari ulasan), foto (nullable),
is_verified (boolean, default false), created_at, updated_at

-- users (extend default Laravel)
id (uuid PK), nama, email (unique), password (nullable),
google_id (nullable), github_id (nullable),
is_admin (boolean, default false),
consent_given (boolean), email_verified_at, remember_token,
created_at, updated_at

-- ulasan
id (uuid PK), user_id (FK → users.id CASCADE),
destinasi_id (FK → destinasi.id CASCADE),
judul (nullable), konten, rating (1-5),
created_at, updated_at
```

### Index
```sql
-- Fuzzy search
CREATE INDEX destinasi_nama_trgm ON destinasi USING GIN (nama gin_trgm_ops);
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Performance
CREATE INDEX ON stasiun (kota_id);
CREATE INDEX ON destinasi (stasiun_id);
CREATE INDEX ON destinasi (kategori);
CREATE INDEX ON ulasan (destinasi_id);
CREATE INDEX ON ulasan (user_id);
```

---

## LARAVEL FOLDER STRUCTURE

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── AuthController.php         # login, register, logout
│   │   │   └── OAuthController.php        # Google + GitHub OAuth (Socialite)
│   │   ├── Admin/
│   │   │   ├── KotaController.php         # CRUD kota (admin only)
│   │   │   ├── StasiunController.php      # CRUD stasiun (admin only)
│   │   │   └── DestinasiController.php    # CRUD destinasi (admin only)
│   │   ├── DestinasiController.php        # Public: index, show, search
│   │   ├── UlasanController.php           # User: store, update, destroy
│   │   └── HomeController.php             # Landing page + subway map data
│   └── Middleware/
│       └── IsAdmin.php                    # Cek is_admin flag
│
├── Models/
│   ├── User.php
│   ├── Kota.php
│   ├── Stasiun.php
│   ├── Destinasi.php
│   └── Ulasan.php
│
└── Providers/
    └── AppServiceProvider.php

database/
├── migrations/
│   ├── 0001_01_01_000000_create_users_table.php
│   ├── xxxx_create_kota_table.php
│   ├── xxxx_create_stasiun_table.php
│   ├── xxxx_create_destinasi_table.php
│   └── xxxx_create_ulasan_table.php
│
└── seeders/
    ├── DatabaseSeeder.php
    ├── KotaSeeder.php
    ├── StasiunSeeder.php
    ├── DestinasiSeeder.php
    ├── UlasanSeeder.php
    └── UserSeeder.php                     # Admin user + dummy users

routes/
├── web.php                                # Semua route (Inertia)
└── console.php
```

### Routes (web.php)

```php
// Public
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destinasi', [DestinasiController::class, 'index'])->name('destinasi.index');
Route::get('/destinasi/{destinasi}', [DestinasiController::class, 'show'])->name('destinasi.show');
Route::get('/stasiun/{stasiun}', [DestinasiController::class, 'byStasiun'])->name('stasiun.show');

// Auth
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// OAuth
Route::get('/auth/google', [OAuthController::class, 'redirectGoogle'])->name('oauth.google');
Route::get('/auth/google/callback', [OAuthController::class, 'callbackGoogle']);
Route::get('/auth/github', [OAuthController::class, 'redirectGithub'])->name('oauth.github');
Route::get('/auth/github/callback', [OAuthController::class, 'callbackGithub']);

// User (authenticated)
Route::middleware('auth')->group(function () {
    Route::post('/ulasan', [UlasanController::class, 'store'])->name('ulasan.store');
    Route::put('/ulasan/{ulasan}', [UlasanController::class, 'update'])->name('ulasan.update');
    Route::delete('/ulasan/{ulasan}', [UlasanController::class, 'destroy'])->name('ulasan.destroy');
});

// Admin
Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('kota', Admin\KotaController::class);
    Route::resource('stasiun', Admin\StasiunController::class);
    Route::resource('destinasi', Admin\DestinasiController::class);
});
```

---

## FRONTEND FOLDER STRUCTURE (resources/js/)

```
resources/js/
│
├── app.tsx                               # Inertia bootstrap
├── ssr.tsx                               # SSR (optional)
│
├── types/
│   ├── global.d.ts                       # Inertia global types
│   ├── index.ts                          # Entity types (Kota, Stasiun, etc.)
│   └── auth.ts                           # Auth types
│
├── lib/
│   └── utils.ts                          # cn(), formatRating(), etc.
│
├── Components/
│   │
│   ├── Elements/                         # ATOMS — base, stateless, reusable
│   │   ├── Button.tsx
│   │   ├── Badge.tsx                     # kategori tag (Wisata/Kuliner/UMKM)
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Loading.tsx
│   │   ├── Avatar.tsx
│   │   ├── Rating.tsx                    # Bintang rating (1-5)
│   │   └── Table.tsx
│   │
│   ├── Fragments/                        # MOLECULES/ORGANISMS — composite + logic
│   │   │
│   │   ├── Common/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── Home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SubwayMap.tsx             # ⭐ CUSTOM SVG MAP — POIN BONUS UTAMA
│   │   │   ├── FeaturedDestinasi.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── Destinasi/
│   │   │   ├── DestinasiCard.tsx
│   │   │   ├── DestinasiGrid.tsx
│   │   │   ├── DestinasiFilter.tsx       # Filter kategori + stasiun
│   │   │   ├── SearchBar.tsx             # Fuzzy search input
│   │   │   └── DestinasiDetail.tsx       # Konten detail + foto
│   │   │
│   │   ├── Ulasan/
│   │   │   ├── UlasanCard.tsx
│   │   │   ├── UlasanList.tsx
│   │   │   └── UlasanForm.tsx            # Create/Edit ulasan (authenticated)
│   │   │
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx             # Email + OAuth buttons
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   └── Admin/
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       ├── StatsCard.tsx
│   │       ├── DataTable.tsx             # Reusable table + pagination
│   │       ├── FormCard.tsx
│   │       └── ConfirmModal.tsx          # Delete confirmation
│   │
│   └── Layouts/                          # TEMPLATES — page shells
│       ├── PublicLayout.tsx              # Navbar + main + Footer
│       └── AdminLayout.tsx               # Sidebar + Header + main
│
├── Pages/                                # Inertia Pages (1:1 dengan route)
│   │
│   ├── Home.tsx                          # / — landing + subway map
│   │
│   ├── Destinasi/
│   │   ├── Index.tsx                     # /destinasi — grid + search + filter
│   │   └── Show.tsx                      # /destinasi/{id} — detail + ulasan
│   │
│   ├── Stasiun/
│   │   └── Show.tsx                      # /stasiun/{id} — destinasi by stasiun
│   │
│   ├── Auth/
│   │   ├── Login.tsx                     # /login
│   │   └── Register.tsx                  # /register
│   │
│   └── Admin/
│       ├── Dashboard.tsx                 # /admin
│       ├── Kota/
│       │   ├── Index.tsx                 # /admin/kota
│       │   ├── Create.tsx                # /admin/kota/create
│       │   └── Edit.tsx                  # /admin/kota/{id}/edit
│       ├── Stasiun/
│       │   ├── Index.tsx
│       │   ├── Create.tsx
│       │   └── Edit.tsx
│       └── Destinasi/
│           ├── Index.tsx
│           ├── Create.tsx
│           └── Edit.tsx
│
└── Hooks/                                # Custom hooks
    ├── useSearch.ts                      # Debounced search
    ├── useFlash.ts                       # Flash message (Inertia shared)
    └── useConfirm.ts                     # Delete confirm modal state
```

---

## ATOMIC DESIGN IMPLEMENTATION

### 1. ELEMENTS (Atoms) — Base Components

```tsx
// Button.tsx
<Button variant="primary|secondary|outline|danger" size="sm|md|lg" loading={bool}>
  Teks
</Button>

// Badge.tsx — kategori destinasi
<Badge variant="wisata|kuliner|umkm|verified">Kuliner</Badge>

// Rating.tsx — bintang interaktif/display
<Rating value={4.5} interactive={false} onChange={handler} />

// Input.tsx
<Input label="Nama" error="Wajib diisi" placeholder="..." />

// Modal.tsx
<Modal isOpen={bool} onClose={handler} title="Konfirmasi">
  {children}
</Modal>

// Pagination.tsx
<Pagination currentPage={1} lastPage={10} onPageChange={handler} />
```

### 2. FRAGMENTS (Molecules/Organisms)

#### SubwayMap.tsx — PRIORITAS UTAMA
```tsx
// Custom SVG interaktif menampilkan rute kereta Jakarta→Bandung→Jogja→Surabaya
// Setiap stasiun clickable → navigate ke /stasiun/{id}
// Data dari Inertia props (di-pass dari HomeController)
<SubwayMap
  kota={kota[]}          // [{id, nama, kode_ibukota, stasiun[]}]
  activeStasiun={id}     // highlighted stasiun
  onStasiunClick={handler}
/>
```

#### LoginForm.tsx — OAuth Priority
```tsx
<LoginForm>
  {/* Email + password form */}
  <OAuthButton provider="google" href={route('oauth.google')} />
  <OAuthButton provider="github" href={route('oauth.github')} />
</LoginForm>
```

#### DataTable.tsx — Reusable Admin Table
```tsx
<DataTable
  columns={[{ key: 'nama', label: 'Nama' }, ...]}
  data={destinasi}
  onEdit={(id) => router.visit(route('admin.destinasi.edit', id))}
  onDelete={(id) => handleDelete(id)}
/>
```

### 3. LAYOUTS (Templates)

```tsx
// PublicLayout.tsx
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// AdminLayout.tsx
export default function AdminLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <div className="lg:ml-64">
        <Header title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

---

## PAGES — Inertia Page Components

### Public Pages

| Page | Route | Komponen Utama |
|------|-------|----------------|
| `Home.tsx` | `/` | HeroSection + SubwayMap + FeaturedDestinasi |
| `Destinasi/Index.tsx` | `/destinasi` | SearchBar + DestinasiFilter + DestinasiGrid |
| `Destinasi/Show.tsx` | `/destinasi/{id}` | DestinasiDetail + UlasanList + UlasanForm |
| `Stasiun/Show.tsx` | `/stasiun/{id}` | DestinasiGrid (filtered by stasiun) |
| `Auth/Login.tsx` | `/login` | LoginForm (email + Google + GitHub) |
| `Auth/Register.tsx` | `/register` | RegisterForm |

### Admin Pages

| Page | Route | Fitur |
|------|-------|-------|
| `Admin/Dashboard.tsx` | `/admin` | StatsCard (total kota/stasiun/destinasi/ulasan) |
| `Admin/Kota/Index.tsx` | `/admin/kota` | DataTable + Create button |
| `Admin/Kota/Create.tsx` | `/admin/kota/create` | Form create |
| `Admin/Kota/Edit.tsx` | `/admin/kota/{id}/edit` | Form edit |
| `Admin/Stasiun/*` | `/admin/stasiun` | Same pattern, dropdown pilih kota |
| `Admin/Destinasi/*` | `/admin/destinasi` | Same pattern + upload foto + toggle is_verified |

---

## TYPE DEFINITIONS

```ts
// types/index.ts
export interface Kota {
  id: string;
  nama: string;
  kode_ibukota: string;
  stasiun?: Stasiun[];
}

export interface Stasiun {
  id: string;
  kota_id: string;
  nama: string;
  kode_stasiun: string;
  kota?: Kota;
  destinasi?: Destinasi[];
}

export interface Destinasi {
  id: string;
  stasiun_id: string;
  nama: string;
  deskripsi: string;
  alamat: string;
  kategori: 'Wisata' | 'Kuliner' | 'UMKM';
  rating: number;
  foto: string | null;
  is_verified: boolean;
  stasiun?: Stasiun;
  ulasan?: Ulasan[];
}

export interface Ulasan {
  id: string;
  user_id: string;
  destinasi_id: string;
  judul: string | null;
  konten: string;
  rating: number;
  user?: User;
  created_at: string;
}

export interface User {
  id: string;
  nama: string;
  email: string;
  is_admin: boolean;
}

// types/auth.ts
export interface PageProps {
  auth: {
    user: User | null;
  };
  flash: {
    success?: string;
    error?: string;
  };
}
```

---

## CUSTOM SVG SUBWAY MAP — SPEC DETAIL

File: `resources/js/Components/Fragments/Home/SubwayMap.tsx`

```
Rute utama (horizontal line):
JAKARTA ——— BANDUNG ——— YOGYAKARTA ——— SURABAYA

Per kota, tampil 2 stasiun (cabang vertikal):
Jakarta:    [Gambir] [Pasar Senen]
Bandung:    [Bandung] [Kiaracondong]
Yogyakarta: [Tugu] [Lempuyangan]
Surabaya:   [Gubeng] [Pasar Turi]

Interaksi:
- Hover stasiun → tooltip "X destinasi tersedia"
- Click stasiun → navigate ke /stasiun/{id}
- Active stasiun → highlighted (warna berbeda)
- Responsive: scroll horizontal di mobile
```

---

## STYLING APPROACH

```
Dark theme · Accent: yellow-400
Background: slate-950 / slate-900 / slate-800
Text: white · gray-300 · gray-400

Animasi:
- Hover link: text yellow-400 + underline slide dari kiri
- Button hover: fill putih dari kiri, text slate-900
- SVG station hover: circle scale + glow effect
- Transition: 300ms ease-out
```

---

## ENVIRONMENT SETUP

### .env (VPS Staging)
```
APP_ENV=staging
APP_URL=https://demo-jejakjalur.project-n.site

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=jejakjalur_staging
DB_USERNAME=jejakjalur
DB_PASSWORD=

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SESSION_DRIVER=redis
CACHE_STORE=redis

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://demo-jejakjalur.project-n.site/auth/google/callback

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=https://demo-jejakjalur.project-n.site/auth/github/callback
```

### .env (VPS Production)
```
APP_ENV=production
APP_URL=https://jejakjalur.project-n.site
DB_DATABASE=jejakjalur_prod
(sama seperti staging, redirect URI ganti ke prod domain)
```

---

## SEEDER DATA PLAN

```
4 Kota × 2 Stasiun × 5 Destinasi = 40 Destinasi
40 Destinasi × 3 Ulasan = 120 Ulasan

Kota & Stasiun:
Jakarta     → Gambir, Pasar Senen
Bandung     → Bandung, Kiaracondong
Yogyakarta  → Tugu, Lempuyangan
Surabaya    → Gubeng, Pasar Turi

Kategori distribusi per stasiun:
- 2 Wisata · 2 Kuliner · 1 UMKM

Admin default:
- email: admin@jejakjalur.id
- password: admin123 (bcrypt)
```

---

## NAMING CONVENTIONS

| Context | Convention | Contoh |
|---------|------------|--------|
| React components | PascalCase | `SubwayMap.tsx`, `DestinasiCard.tsx` |
| Inertia Pages | PascalCase | `Pages/Destinasi/Index.tsx` |
| Folders | PascalCase | `Components/Fragments/Home/` |
| Hooks | camelCase | `useSearch.ts`, `useFlash.ts` |
| Laravel controllers | PascalCase | `KotaController.php` |
| Laravel models | PascalCase | `Destinasi.php` |
| DB tables | snake_case plural | `destinasi`, `ulasan`, `kota` |
| Routes | kebab-case | `/destinasi`, `/admin/kota` |
| CSS classes | Tailwind utilities | `bg-slate-950 text-yellow-400` |

---

## BEST PRACTICES

1. **Inertia data flow:** Semua data dari Laravel props, jangan fetch di client
2. **No Zustand:** Gunakan Inertia shared data + React useState untuk local state
3. **Form submit:** Pakai `useForm` dari `@inertiajs/react`
4. **Flash messages:** Via Inertia shared `flash` prop dari `HandleInertiaRequests`
5. **Delete confirm:** Modal konfirmasi sebelum destroy
6. **Admin guard:** Middleware `IsAdmin` di server-side, bukan client-side check
7. **OAuth:** Simpan `google_id`/`github_id` di tabel users, bukan tabel terpisah
8. **Rating update:** Hitung ulang `destinasi.rating` setiap ulasan create/update/delete
9. **Foto upload:** Simpan di `storage/app/public/destinasi/`, serve via symlink
10. **SVG Map:** Pure SVG + Tailwind, tidak pakai library peta apapun

---

*JejakJalur · Kompetisi Web Development Universitas · Tim 2 Orang · 3 Hari · Target: Menang*
