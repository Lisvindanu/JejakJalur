# SPRINT PLAN — JEJAKJALUR

> **Timeline:** 3 Hari
> **Tim:** Lisvindanu (BE-heavy) + Marsa (FE-heavy)
> **Target:** Menang lomba — semua fitur jalan + poin bonus
> **Staging:** https://demo-jejakjalur.project-n.site
> **Production:** https://jejakjalur.project-n.site

---

## POIN KEMENANGAN

| Fitur | Poin | Status |
|-------|------|--------|
| CRUD Admin (Kota/Stasiun/Destinasi) | Wajib | ⬜ |
| Auth email/password | Wajib | ⬜ |
| Search berbasis stasiun | Wajib | ⬜ |
| User review/ulasan | Wajib | ⬜ |
| **Custom SVG Subway Map** | **Bonus ⭐** | ⬜ |
| **OAuth Google + GitHub** | **Bonus ⭐** | ⬜ |
| Desain custom (no template) | Wajib | ⬜ |
| UU PDP compliance | Nilai tambah | ⬜ |

---

## HARI 1 — Foundation & Auth

### Backend (Lisvindanu)

#### Setup Database
- [ ] Install PostgreSQL + Redis di VPS
- [ ] Buat database `jejakjalur_staging` + `jejakjalur_prod`
- [ ] Buat user PostgreSQL + set password
- [ ] Update `.env` staging & prod (DB, Redis, Session)
- [ ] Enable extension `pg_trgm`

#### Migration & Model
- [ ] Migration: `kota` (id uuid, nama unique, kode_ibukota)
- [ ] Migration: `stasiun` (id uuid, kota_id FK, nama, kode_stasiun)
- [ ] Migration: `destinasi` (id uuid, stasiun_id FK, nama, deskripsi, alamat, kategori enum, rating decimal, foto nullable, is_verified bool)
- [ ] Migration: update `users` (tambah: nama, google_id, github_id, is_admin, consent_given)
- [ ] Migration: `ulasan` (id uuid, user_id FK, destinasi_id FK, judul nullable, konten, rating int)
- [ ] Model `Kota` + relationships
- [ ] Model `Stasiun` + relationships
- [ ] Model `Destinasi` + relationships + scope search
- [ ] Model `Ulasan` + relationships
- [ ] Model `User` update

#### Auth
- [ ] `AuthController`: showLogin, login, showRegister, register, logout
- [ ] `OAuthController`: redirectGoogle, callbackGoogle, redirectGithub, callbackGithub
- [ ] Install + config `laravel/socialite`
- [ ] Middleware `IsAdmin`
- [ ] Update `HandleInertiaRequests` — share: auth.user, flash

#### Seeder
- [ ] `KotaSeeder` — 4 kota (Jakarta, Bandung, Yogyakarta, Surabaya)
- [ ] `StasiunSeeder` — 8 stasiun (2 per kota)
- [ ] `DestinasiSeeder` — 40 destinasi (5 per stasiun, variasi kategori)
- [ ] `UlasanSeeder` — 120 ulasan (3 per destinasi)
- [ ] `UserSeeder` — 1 admin + 5 user dummy
- [ ] `php artisan migrate:fresh --seed`

### Frontend (Marsa)

#### Setup & Layout
- [ ] Update TypeScript types (`types/index.ts`, `types/auth.ts`)
- [ ] `Components/Layouts/PublicLayout.tsx`
- [ ] `Components/Layouts/AdminLayout.tsx`
- [ ] `Components/Fragments/Common/Navbar.tsx` (transparent → solid on scroll, auth-aware)
- [ ] `Components/Fragments/Common/Footer.tsx`

#### Elements (Atoms)
- [ ] `Button.tsx` (variant: primary/secondary/outline/danger)
- [ ] `Badge.tsx` (variant: wisata/kuliner/umkm/verified)
- [ ] `Input.tsx` + `TextArea.tsx` + `Select.tsx`
- [ ] `Loading.tsx`
- [ ] `Rating.tsx` (bintang display + interactive)

#### SubwayMap SVG — PRIORITAS UTAMA ⭐
- [ ] `Components/Fragments/Home/SubwayMap.tsx`
  - SVG custom rute: Jakarta → Bandung → Yogyakarta → Surabaya
  - Setiap stasiun: circle + label + tooltip
  - Hover: highlight + tampil jumlah destinasi
  - Click: navigate ke `/stasiun/{id}`
  - Responsive: scroll horizontal di mobile

#### Home Page
- [ ] `Pages/Home.tsx` — HeroSection + SubwayMap + FeaturedDestinasi

#### Auth Pages
- [ ] `Pages/Auth/Login.tsx` — form + OAuth buttons (Google + GitHub)
- [ ] `Pages/Auth/Register.tsx` — form + consent checkbox (UU PDP)

---

## HARI 2 — CRUD Admin & Public Pages

### Backend (Lisvindanu)

#### Admin Controllers
- [ ] `Admin/KotaController` — index, create, store, edit, update, destroy
- [ ] `Admin/StasiunController` — index, create, store, edit, update, destroy (dropdown kota)
- [ ] `Admin/DestinasiController` — index, create, store, edit, update, destroy (upload foto, toggle is_verified)
- [ ] `Admin/DashboardController` — stats (count kota, stasiun, destinasi, ulasan)
- [ ] File upload: foto destinasi → `storage/app/public/destinasi/` + symlink

#### Public Controllers
- [ ] `HomeController` — index (pass kota + stasiun untuk SubwayMap)
- [ ] `DestinasiController`:
  - `index` — list + filter kategori + filter stasiun + search fuzzy (pg_trgm)
  - `show` — detail + ulasan (eager load)
  - `byStasiun` — filter by stasiun_id
- [ ] Search query scope di model Destinasi:
  ```php
  scopeSearch($query, $term) // ILIKE + similarity pg_trgm
  ```

### Frontend (Marsa)

#### Admin Panel
- [ ] `Components/Fragments/Admin/Sidebar.tsx` — navigasi admin
- [ ] `Components/Fragments/Admin/Header.tsx`
- [ ] `Components/Fragments/Admin/StatsCard.tsx`
- [ ] `Components/Fragments/Admin/DataTable.tsx` — kolom + pagination + action (edit/delete)
- [ ] `Components/Fragments/Admin/FormCard.tsx`
- [ ] `Components/Fragments/Admin/ConfirmModal.tsx`
- [ ] `Components/Elements/Table.tsx`
- [ ] `Components/Elements/Pagination.tsx`
- [ ] `Components/Elements/Modal.tsx`

#### Admin Pages
- [ ] `Pages/Admin/Dashboard.tsx` — StatsCard grid
- [ ] `Pages/Admin/Kota/Index.tsx` + `Create.tsx` + `Edit.tsx`
- [ ] `Pages/Admin/Stasiun/Index.tsx` + `Create.tsx` + `Edit.tsx`
- [ ] `Pages/Admin/Destinasi/Index.tsx` + `Create.tsx` + `Edit.tsx`

#### Public Pages
- [ ] `Components/Fragments/Destinasi/DestinasiCard.tsx`
- [ ] `Components/Fragments/Destinasi/DestinasiGrid.tsx`
- [ ] `Components/Fragments/Destinasi/DestinasiFilter.tsx`
- [ ] `Components/Fragments/Destinasi/SearchBar.tsx`
- [ ] `Pages/Destinasi/Index.tsx` — grid + search + filter kategori
- [ ] `Pages/Stasiun/Show.tsx` — destinasi by stasiun (connected dari SubwayMap)

#### Hooks
- [ ] `Hooks/useSearch.ts` — debounce search input 300ms
- [ ] `Hooks/useFlash.ts` — baca flash prop dari Inertia

---

## HARI 3 — Ulasan, Polish & Deploy

### Backend (Lisvindanu)

#### Ulasan
- [ ] `UlasanController`: store, update, destroy
- [ ] Auto-update `destinasi.rating` saat ulasan berubah (Observer atau event)
- [ ] Validasi: user hanya bisa edit/hapus ulasan sendiri

#### UU PDP
- [ ] Endpoint delete account → soft delete + anonymize PII (email jadi `deleted_{id}@jejakjalur.id`, nama jadi `User Terhapus`)
- [ ] Consent checkbox wajib dicentang saat register

#### Final
- [ ] `php artisan optimize` di staging
- [ ] Test semua route
- [ ] Fix N+1 query (eager loading)
- [ ] Rate limiting: `throttle:60,1` di route search

### Frontend (Marsa)

#### Destinasi Detail + Ulasan
- [ ] `Components/Fragments/Ulasan/UlasanCard.tsx`
- [ ] `Components/Fragments/Ulasan/UlasanList.tsx` — list + pagination
- [ ] `Components/Fragments/Ulasan/UlasanForm.tsx` — create/edit (auth only, pakai `useForm` Inertia)
- [ ] `Pages/Destinasi/Show.tsx` — detail lengkap + ulasan + form

#### Polish
- [ ] Responsif mobile semua halaman
- [ ] Loading state (skeleton atau spinner)
- [ ] Empty state (tidak ada destinasi, belum ada ulasan)
- [ ] Flash message toast (success/error)
- [ ] 404 page
- [ ] Avatar.tsx + badge is_verified di DestinasiCard

#### Final
- [ ] `npm run build` → cek output di staging
- [ ] Test OAuth Google + GitHub end-to-end
- [ ] Test SubwayMap di mobile
- [ ] Cross-browser check (Chrome, Firefox, Safari)

---

## DEFINISI SELESAI (Definition of Done)

| Fitur | Kriteria |
|-------|----------|
| Auth email | Register → Login → Logout works, session persists |
| OAuth | Google + GitHub redirect → callback → user tersimpan → login |
| CRUD Admin | Create/Edit/Delete Kota, Stasiun, Destinasi tanpa error |
| Search | Ketik "warung" → muncul destinasi relevan (fuzzy) |
| SubwayMap | SVG tampil, hover + click to navigate berfungsi |
| Ulasan | User login bisa tulis ulasan, rating ter-update di destinasi |
| Responsif | Semua halaman usable di mobile 375px |
| Deploy | Staging URL bisa diakses, fitur jalan semua |

---

## SETUP POSTGRESQL + REDIS DI VPS (Hari 1, Langkah Pertama)

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Buat database + user
sudo -u postgres psql << 'EOF'
CREATE USER jejakjalur WITH PASSWORD 'ganti_password_ini';
CREATE DATABASE jejakjalur_staging OWNER jejakjalur;
CREATE DATABASE jejakjalur_prod OWNER jejakjalur;
GRANT ALL PRIVILEGES ON DATABASE jejakjalur_staging TO jejakjalur;
GRANT ALL PRIVILEGES ON DATABASE jejakjalur_prod TO jejakjalur;
EOF

# Enable pg_trgm
sudo -u postgres psql -d jejakjalur_staging -c "CREATE EXTENSION pg_trgm;"
sudo -u postgres psql -d jejakjalur_prod -c "CREATE EXTENSION pg_trgm;"

# Install Redis
sudo apt install redis-server -y
sudo systemctl enable redis-server
```

---

## OAUTH SETUP (Butuh Credential)

### Google OAuth
1. Buka: https://console.cloud.google.com/
2. Buat project baru → APIs & Services → Credentials
3. Buat OAuth 2.0 Client ID (Web application)
4. Authorized redirect URIs:
   - `https://demo-jejakjalur.project-n.site/auth/google/callback`
   - `https://jejakjalur.project-n.site/auth/google/callback`
5. Salin `Client ID` + `Client Secret` → isi di `.env`

### GitHub OAuth
1. Buka: https://github.com/settings/developers
2. New OAuth App
3. Authorization callback URL:
   - `https://demo-jejakjalur.project-n.site/auth/github/callback`
4. Salin `Client ID` + `Client Secret` → isi di `.env`

---

## COMMIT CONVENTION

```
feat: add subway map SVG component
feat: implement Google OAuth login
fix: rating not updating after ulasan delete
chore: add pg_trgm migration
style: responsive fix for mobile navbar
```

---

*Sprint ini harus menghasilkan aplikasi yang layak menang — bukan sekadar jalan.*
