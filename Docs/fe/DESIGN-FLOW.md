# JejakJalur — Frontend Design Flow

> **Stack:** Laravel 13 + Inertia.js v3 + React 19 + TailwindCSS v4
> **Diperbarui:** 2026-05-19

---

## Daftar Isi

1. [Design System](#1-design-system)
2. [Component Architecture](#2-component-architecture)
3. [Layout System](#3-layout-system)
4. [Navigation Map](#4-navigation-map)
5. [State Management](#5-state-management)
6. [Shared Props](#6-shared-props)
7. [Komponen Shared Antar Halaman](#7-komponen-shared-antar-halaman)

---

## 1. Design System

### 1.1 Color Palette

| Token               | Nilai Tailwind          | Penggunaan                                |
|---------------------|-------------------------|-------------------------------------------|
| Primary             | `emerald-700`           | Tombol utama, link aktif, badge verified  |
| Primary Dark        | `emerald-800`           | Hover tombol utama, heading utama         |
| Base Background     | `stone-50`              | Background halaman publik                 |
| Base Text           | `stone-800`             | Teks konten utama                         |
| Rating / Stars      | `amber-500`             | Bintang rating destinasi dan ulasan       |
| Surface             | `white`                 | Card, modal, navbar, form                 |
| Danger              | `red-600`               | Pesan error, tombol hapus                 |
| Muted Text          | `stone-400` / `stone-500` | Label, placeholder, teks sekunder       |
| Border              | `stone-200`             | Garis pemisah, border input, card         |

### 1.2 Typography

```
Font Family : Instrument Sans (Google Fonts)
             → diload via <link> di app.blade.php

Heading 1   : text-3xl font-bold text-stone-800      (judul halaman)
Heading 2   : text-2xl font-semibold text-stone-800  (seksi)
Heading 3   : text-xl font-semibold text-stone-700   (sub-seksi)
Body        : text-base text-stone-700               (konten umum)
Small       : text-sm text-stone-500                 (label, meta)
Tiny        : text-xs text-stone-400                 (hint, timestamp)
```

### 1.3 Spacing & Sizing

```
Layout max-width   : max-w-6xl mx-auto px-4 sm:px-6
Section padding    : py-12 (desktop) / py-8 (mobile)
Card padding       : p-6 (default) / p-4 (compact)
Gap antar elemen   : gap-4 (default) / gap-6 (card grid)
```

### 1.4 Border Radius

| Kelas Tailwind  | Dipakai Untuk                              |
|-----------------|--------------------------------------------|
| `rounded-lg`    | Card, input field, tombol default          |
| `rounded-xl`    | Modal, card besar, hero section            |
| `rounded-full`  | Avatar, badge pill, tombol icon circular   |

### 1.5 Shadow

```
card kecil   : shadow-sm
card normal  : shadow-md
modal/dialog : shadow-xl
dropdown     : shadow-lg
```

### 1.6 Atom Components

```
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ Atom         │ Spesifikasi                                                  │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Button       │ variant: primary|secondary|ghost|danger                      │
│              │ size: sm|md|lg                                               │
│              │ state: default|loading|disabled                              │
│              │ primary → bg-emerald-700 hover:bg-emerald-800 text-white     │
│              │ secondary → border border-stone-300 text-stone-700           │
│              │ danger → bg-red-600 hover:bg-red-700 text-white              │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Input        │ border border-stone-300 rounded-lg px-3 py-2 text-sm        │
│              │ focus:ring-2 focus:ring-emerald-500 focus:border-transparent │
│              │ error state: border-red-500 + pesan error di bawah           │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Label        │ text-sm font-medium text-stone-700 mb-1                      │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Checkbox     │ accent-emerald-700 w-4 h-4                                   │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Badge        │ px-2 py-0.5 rounded-full text-xs font-medium                │
│              │ verified → bg-emerald-100 text-emerald-700                  │
│              │ kategori → bg-stone-100 text-stone-600                      │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ StarRating   │ 5 bintang, amber-500 filled / stone-300 empty                │
│              │ Menampilkan nilai float (contoh: 4.3 → 4 penuh, 1 setengah) │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ FlashToast   │ sukses → bg-emerald-50 border-emerald-200 text-emerald-800   │
│              │ error  → bg-red-50 border-red-200 text-red-800              │
│              │ auto-dismiss setelah 4 detik                                 │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Avatar       │ w-9 h-9 rounded-full bg-emerald-700 text-white              │
│              │ inisial nama jika tidak ada foto profil                      │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ Divider      │ <div className="relative my-6">                              │
│              │   <hr className="border-stone-200" />                        │
│              │   <span>atau</span>                                           │
│              │ </div>                                                        │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### 2.1 Struktur Direktori

```
resources/js/
├── app.tsx                          ← Inertia bootstrap
├── types/
│   └── index.d.ts                   ← SharedProps, User, Destinasi, dll.
├── lib/
│   └── utils.ts                     ← cn(), formatRating(), dsb.
├── layouts/
│   ├── PublicLayout.tsx             ← Navbar + main + Footer (halaman publik)
│   ├── AuthLayout.tsx               ← Centered card layout (halaman auth)
│   └── AdminLayout.tsx             ← Sidebar + header (halaman admin)
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Badge.tsx
│   │   ├── StarRating.tsx
│   │   ├── Avatar.tsx
│   │   └── Divider.tsx
│   ├── fragments/
│   │   ├── FlashToast.tsx           ← Membaca flash dari usePage()
│   │   ├── Navbar.tsx               ← Dipakai PublicLayout
│   │   ├── Footer.tsx               ← Dipakai PublicLayout
│   │   ├── OAuthButtons.tsx         ← Google + GitHub buttons (Login & Daftar)
│   │   ├── DestinasiCard.tsx        ← Card destinasi (Beranda + Indeks)
│   │   └── UlasanCard.tsx           ← Card ulasan (Detail destinasi)
│   └── ui/                          ← Headless / komponen komposit
│       ├── FormField.tsx            ← Label + Input + ErrorMessage
│       ├── ConfirmDialog.tsx        ← Modal konfirmasi hapus
│       └── Pagination.tsx           ← Komponen pagination Inertia
└── pages/
    ├── welcome.tsx                  ← Beranda
    ├── Auth/
    │   ├── Login.tsx
    │   ├── Daftar.tsx
    │   ├── LupaPassword.tsx
    │   └── ResetPassword.tsx
    ├── Destinasi/
    │   ├── Indeks.tsx
    │   └── Detail.tsx
    ├── Rute/
    │   └── Tampilkan.tsx
    ├── Profil/
    │   ├── Tampilkan.tsx
    │   └── Edit.tsx
    └── Admin/
        ├── Dashboard.tsx
        ├── Kota/
        │   ├── Indeks.tsx
        │   └── Formulir.tsx
        ├── Stasiun/
        │   ├── Indeks.tsx
        │   └── Formulir.tsx
        └── Destinasi/
            ├── Indeks.tsx
            └── Formulir.tsx
```

### 2.2 Hierarki Rendering

```
app.tsx (createInertiaApp)
  └── Layout (ditentukan per page via layout prop)
        ├── PublicLayout
        │     ├── FlashToast         ← global, baca usePage().props.flash
        │     ├── Navbar
        │     ├── <main>{children}</main>
        │     └── Footer
        ├── AuthLayout
        │     ├── FlashToast
        │     └── <centered card>{children}</centered>
        └── AdminLayout
              ├── FlashToast
              ├── AdminSidebar
              └── <main>{children}</main>
```

---

## 3. Layout System

### 3.1 PublicLayout

```
Dipakai : welcome, Destinasi/Indeks, Destinasi/Detail, Rute/Tampilkan,
          Profil/Tampilkan, Profil/Edit

┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky top-0 z-50 bg-white/90 backdrop-blur-sm)            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ 🌿 JejakJalur          Beranda  Destinasi  Rute    [Masuk]   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                         max-w-6xl mx-auto                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   <main>                                                            │
│     {children / page content}                                       │
│   </main>                                                           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                             │
│  bg-stone-800 text-stone-400 py-8                                   │
│  © 2026 JejakJalur · Tentang · Kebijakan Privasi                   │
└─────────────────────────────────────────────────────────────────────┘

Navbar state (auth.user):
  null     → tombol "Masuk" + "Daftar"
  user     → Avatar + dropdown (Profil, Keluar)
  is_admin → Avatar + dropdown + link "Admin Panel"
```

### 3.2 AuthLayout

```
Dipakai : Login, Daftar, LupaPassword, ResetPassword

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   min-h-screen bg-stone-50 flex items-center justify-center        │
│                                                                     │
│         ┌──────────────────────────────────────┐                   │
│         │  bg-white rounded-xl shadow-md p-8   │                   │
│         │  w-full max-w-md                      │                   │
│         │                                       │                   │
│         │  {children / form content}            │                   │
│         │                                       │                   │
│         └──────────────────────────────────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 AdminLayout

```
Dipakai : Admin/Dashboard, Admin/Kota/*, Admin/Stasiun/*, Admin/Destinasi/*

┌─────────────────────────────────────────────────────────────────────┐
│  HEADER (sticky top-0 bg-white border-b border-stone-200)           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ 🌿 JejakJalur Admin                        [Avatar] Admin ▾  │  │
│  └───────────────────────────────────────────────────────────────┘  │
├──────────────┬──────────────────────────────────────────────────────┤
│  SIDEBAR     │  MAIN CONTENT                                        │
│  w-64        │  flex-1 p-6 bg-stone-50                             │
│  bg-white    │                                                      │
│  border-r    │  {children}                                          │
│              │                                                      │
│  • Dashboard │                                                      │
│  • Kota      │                                                      │
│  • Stasiun   │                                                      │
│  • Destinasi │                                                      │
│  ──────────  │                                                      │
│  • Kembali   │                                                      │
│    ke Situs  │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## 4. Navigation Map

### 4.1 Peta Halaman Lengkap

```
                         ┌─────────────────────────────────────┐
                         │          JEJAKJALUR SPA             │
                         └──────────────┬──────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          │                             │                             │
     PUBLIC (semua)              AUTH-ONLY                     ADMIN-ONLY
          │                             │                             │
    ┌─────┴──────────┐         ┌────────┴────────┐         ┌────────┴────────┐
    │ / (Beranda)    │         │ /profil          │         │ /admin          │
    │ /destinasi     │         │ /profil/edit     │         │ /admin/kota     │
    │ /destinasi/:id │         └─────────────────┘         │ /admin/stasiun  │
    │ /rute          │                                      │ /admin/destinasi│
    └────────────────┘                                      └─────────────────┘
          │
    GUEST-ONLY
          │
    ┌─────┴──────────────┐
    │ /masuk             │
    │ /daftar            │
    │ /lupa-password     │
    │ /reset-password/:t │
    └────────────────────┘
```

### 4.2 Transisi Antar Halaman

```
Beranda (/)
  ├── Klik kartu destinasi         → /destinasi/{id}
  ├── "Lihat semua destinasi"      → /destinasi
  ├── "Cari Rute"                  → /rute
  └── Navbar "Masuk" (if guest)   → /masuk

Destinasi Indeks (/destinasi)
  ├── Klik kartu destinasi         → /destinasi/{id}
  └── Filter mengubah query string → /destinasi?...

Destinasi Detail (/destinasi/{id})
  ├── Tombol "Tulis Ulasan"        → form di bawah (scroll, POST same page)
  ├── Klik stasiun                 → /rute?stasiun={id}
  └── Breadcrumb                   → /destinasi

Auth Flow
  /masuk     → sukses             → / (redirect().intended)
  /masuk     → "Daftar"           → /daftar
  /masuk     → "Lupa password?"  → /lupa-password
  /daftar    → sukses             → / + flash
  /daftar    → "Sudah punya akun" → /masuk
  /lupa-password → sukses         → same page + status sukses
  /lupa-password → "← Kembali"   → /masuk
  /reset-password → sukses        → /masuk + flash

Profil
  /profil    → "Edit"             → /profil/edit
  /profil/edit → simpan           → /profil + flash
  /profil/edit → "Hapus Akun"    → POST DELETE /profil → / + flash

Admin
  /admin/kota            → Buat    → /admin/kota/buat
  /admin/kota/buat       → simpan  → /admin/kota + flash
  /admin/kota/{id}/edit  → simpan  → /admin/kota + flash
  (pola sama untuk stasiun & destinasi)
```

---

## 5. State Management

### 5.1 Prinsip Utama

JejakJalur tidak menggunakan global state manager (Redux/Zustand). State dikelola dalam tiga lapisan:

```
┌─────────────────────────────────────────────────────────────────────┐
│ LAYER 1: Inertia Shared Props (server-driven, cross-page)           │
│   auth.user, flash.sukses, flash.error, name                        │
│   → dibaca via usePage().props                                       │
├─────────────────────────────────────────────────────────────────────┤
│ LAYER 2: Inertia Page Props (server-driven, per-page)               │
│   destinasi[], filter, semuaKota, dll.                              │
│   → di-pass dari controller, dibaca via usePage<PageProps>().props  │
├─────────────────────────────────────────────────────────────────────┤
│ LAYER 3: Local React State (client-only, ephemeral)                 │
│   form values, processing flag, UI toggles (modal open, tab aktif) │
│   → useState / useForm dari @inertiajs/react                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 useForm dari Inertia

Semua form submission menggunakan `useForm` dari `@inertiajs/react`:

```tsx
const { data, setData, post, processing, errors, reset } = useForm({
  email: '',
  password: '',
  ingat: false,
});
```

Keuntungan:
- `processing` otomatis true saat request berjalan → disable tombol
- `errors` terisi otomatis dari Laravel validation response
- `reset()` membersihkan form setelah berhasil

### 5.3 Flash Messages

```
Server → session('sukses') / session('error')
  │
  ▼
HandleInertiaRequests::share()
  → flash.sukses / flash.error di setiap response
  │
  ▼
FlashToast.tsx membaca usePage().props.flash
  → render toast di sudut kanan atas
  → auto-dismiss 4 detik
```

---

## 6. Shared Props

Tersedia di semua halaman via `usePage<SharedProps>().props`:

```typescript
// types/index.d.ts

export interface User {
  id: string;
  nama: string;
  name: string;
  email: string;
  is_admin: boolean;
  google_id: string | null;
  github_id: string | null;
}

export interface SharedProps {
  name: string;           // "JejakJalur"
  auth: {
    user: User | null;
  };
  flash: {
    sukses: string | null;
    error: string | null;
  };
}
```

---

## 7. Komponen Shared Antar Halaman

### 7.1 OAuthButtons.tsx

Dipakai di: `Login.tsx`, `Daftar.tsx`

```tsx
// Menampilkan dua tombol OAuth
<OAuthButtons />

// Render:
// [G] Masuk dengan Google
// [GH] Masuk dengan GitHub
//
// Setiap tombol → <a href={route('oauth.redirect', {provider})} />
// Bukan form submit — navigasi langsung
```

### 7.2 FlashToast.tsx

Dipakai di: semua layout (PublicLayout, AuthLayout, AdminLayout)

```tsx
// Otomatis membaca flash dari shared props
// Muncul di pojok kanan atas
// auto-dismiss dengan useEffect + setTimeout(4000)
```

### 7.3 DestinasiCard.tsx

Dipakai di: `welcome.tsx`, `Destinasi/Indeks.tsx`

```tsx
// Props: { destinasi: Destinasi }
// Render: foto, nama, kategori badge, stasiun, rating stars, rating angka
// Klik → router.visit(route('destinasi.detail', destinasi.id))
```

### 7.4 FormField.tsx

Dipakai di: semua form (auth, profil, admin CRUD)

```tsx
// Props: { label, error?, children }
// Render: <label> + {children (input)} + <p class="text-red-500">{error}</p>
```

### 7.5 StarRating.tsx

Dipakai di: `DestinasiCard.tsx`, `Destinasi/Detail.tsx`, `UlasanCard.tsx`

```tsx
// Props: { nilai: number, max?: number, ukuran?: 'sm'|'md' }
// Render: filled stars (amber-500) + empty stars (stone-300)
// Support setengah bintang
```
