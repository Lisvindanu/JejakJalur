# Welcome / Beranda — Design Flow

## Route & Props

```
Route  : GET /
Handler: WelcomeController@index
```

```ts
type Props = {
  destinasiFeatured: Destinasi[]   // 6 items, eager-loaded dengan stasiun.kota
  semuaKota: Kota[]                // semua kota beserta stasiun[]
  auth: { user: User | null }
}
```

---

## Wireframe (ASCII)

### 1. Navbar — sticky top-0, bg-white/90 backdrop-blur-md, border-b border-stone-100

```
┌─────────────────────────────────────────────────────────────────────┐
│  [🌿 JejakJalur]            Jelajahi    Rute      [Masuk] [Daftar]  │
│                                                                     │
│  ← Logo kiri: font-bold text-emerald-700, icon leaf/train           │
│     Nav links: text-stone-600 hover:text-emerald-700                │
│     Jika auth.user: ganti tombol dengan avatar + dropdown           │
└─────────────────────────────────────────────────────────────────────┘

Jika auth.user !== null:
┌─────────────────────────────────────────────────────────────────────┐
│  [🌿 JejakJalur]            Jelajahi    Rute         [● John D. ▾] │
│                                                    ┌──────────────┐ │
│                                                    │ Profil       │ │
│                                                    │ Keluar       │ │
│                                                    └──────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2. Hero Section — bg-gradient-to-br from-emerald-700 to-emerald-800

```
╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║                                                                     ║
║         Temukan Destinasi Terbaik                                   ║
║         di Sepanjang Jalur Kereta                                   ║
║                                                                     ║
║   text-4xl md:text-5xl font-bold text-white tracking-tight         ║
║                                                                     ║
║         Jelajahi wisata, kuliner, dan UMKM lokal yang               ║
║         tersebar di setiap stasiun kereta di Indonesia.             ║
║                                                                     ║
║   text-lg text-emerald-100 max-w-xl                                 ║
║                                                                     ║
║         [  Mulai Jelajahi  ]   [  Lihat Peta Rute  ]                ║
║                                                                     ║
║   CTA 1: bg-white text-emerald-700 font-semibold px-6 py-3         ║
║          rounded-xl hover:bg-emerald-50 shadow-md                   ║
║   CTA 2: border border-white text-white px-6 py-3                  ║
║          rounded-xl hover:bg-white/10                               ║
║                                                                     ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝

  Pattern/overlay opsional: subtle diagonal lines atau dots
  py-24 md:py-32, text-center md:text-left
  max-w-6xl mx-auto px-4
```

---

### 3. Kota Pills Section — bg-stone-50

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Pilih Kota                                                        │
│   text-xl font-semibold text-stone-800 mb-4                        │
│                                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐        │
│   │ Jakarta  │  │ Bandung  │  │Yogyakarta│  │  Surabaya  │  ...   │
│   └──────────┘  └──────────┘  └──────────┘  └────────────┘        │
│                                                                     │
│   Pill style (default):                                             │
│     rounded-full px-4 py-2 text-sm font-medium                     │
│     bg-white border border-stone-200 text-stone-700                 │
│     hover:border-emerald-500 hover:text-emerald-700                 │
│     cursor-pointer transition-colors                                │
│                                                                     │
│   Pill style (active/hover):                                        │
│     bg-emerald-100 border-emerald-500 text-emerald-700              │
│                                                                     │
│   Layout: flex flex-wrap gap-2 md:gap-3                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Section: py-12, max-w-6xl mx-auto px-4
```

---

### 4. Featured Destinasi Section — bg-white

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Destinasi Unggulan                                                │
│   text-2xl font-bold text-stone-800                                 │
│                                                                     │
│   Temukan tempat terbaik yang direkomendasikan oleh komunitas       │
│   text-stone-500 mt-1 mb-8                                          │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │    │
│  │ │             │ │  │ │             │ │  │ │             │ │    │
│  │ │  foto/emoji │ │  │ │  foto/emoji │ │  │ │  foto/emoji │ │    │
│  │ │  h-48 w-full│ │  │ │  h-48 w-full│ │  │ │  h-48 w-full│ │    │
│  │ │  object-    │ │  │ │  object-    │ │  │ │  object-    │ │    │
│  │ │  cover      │ │  │ │  cover      │ │  │ │  cover      │ │    │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │    │
│  │                 │  │                 │  │                 │    │
│  │ [Wisata] [✓]    │  │ [Kuliner]       │  │ [UMKM] [✓]      │    │
│  │                 │  │                 │  │                 │    │
│  │ Nama Destinasi  │  │ Nama Destinasi  │  │ Nama Destinasi  │    │
│  │ font-semibold   │  │ font-semibold   │  │ font-semibold   │    │
│  │ text-stone-800  │  │ text-stone-800  │  │ text-stone-800  │    │
│  │                 │  │                 │  │                 │    │
│  │ 🚉 Sta. Gambir  │  │ 🚉 Sta. Bandung │  │ 🚉 Sta. Tugu    │    │
│  │ text-xs stone-5 │  │ text-xs stone-5 │  │ text-xs stone-5 │    │
│  │                 │  │                 │  │                 │    │
│  │ ★★★★☆  4.2      │  │ ★★★★★  4.8      │  │ ★★★☆☆  3.5      │    │
│  │ text-amber-500  │  │ text-amber-500  │  │ text-amber-500  │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │     kartu 4     │  │     kartu 5     │  │     kartu 6     │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                     │
│         [ Lihat Semua Destinasi → ]                                 │
│         mt-10 text-center                                           │
│         btn: border border-emerald-700 text-emerald-700             │
│              px-6 py-2 rounded-xl hover:bg-emerald-50               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
  Card: rounded-xl border border-stone-100 shadow-sm
        hover:shadow-md transition-shadow cursor-pointer
  Badge kategori: rounded-full bg-emerald-100 text-emerald-700
                  text-xs font-medium px-2 py-0.5
  Badge verified: rounded-full bg-emerald-700 text-white
                  text-xs px-2 py-0.5 ml-1  "✓ Terverifikasi"
  Foto placeholder: bg-stone-100 flex items-center justify-center
                    text-5xl (emoji sesuai kategori)
```

---

### 5. Footer — bg-stone-800

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   🌿 JejakJalur                                                     │
│   text-white font-bold text-lg                                      │
│                                                                     │
│   Temukan destinasi terbaik di jalur kereta Indonesia.              │
│   text-stone-400 text-sm mt-1                                       │
│                                                                     │
│   ─────────────────────────────────────────────────────────────    │
│                                                                     │
│   © 2025 JejakJalur. Dibuat dengan ❤ untuk traveler Indonesia.     │
│   text-stone-500 text-xs text-center                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  py-10, bg-stone-800
```

---

## Component Tree

```
welcome.tsx (page)
└── PublicLayout
    ├── Navbar
    │   ├── Logo (link ke /)
    │   ├── NavLinks
    │   │   ├── Link "Jelajahi" → /destinasi
    │   │   └── Link "Rute"     → /rute
    │   └── AuthButtons
    │       ├── [guest]  Button "Masuk" → /login
    │       │           Button "Daftar" → /register
    │       └── [authed] UserDropdown
    │               ├── Avatar + Nama
    │               ├── "Profil" → /profil
    │               └── "Keluar" → POST /logout
    │
    ├── HeroSection
    │   ├── Heading
    │   ├── Subtext
    │   ├── CTAButton "Mulai Jelajahi" → /destinasi
    │   └── CTAButton "Lihat Peta Rute" → /rute
    │
    ├── KotaPillsSection
    │   └── KotaPill × n   (semuaKota)
    │       └── onClick → /destinasi?kota_id={id}
    │
    ├── FeaturedDestinasiSection
    │   ├── SectionHeader
    │   ├── DestinasiGrid
    │   │   └── DestinasiCard × 6   (destinasiFeatured)
    │   │       ├── FotoOrEmoji
    │   │       ├── BadgeKategori
    │   │       ├── BadgeVerified?
    │   │       ├── NamaDestinasi
    │   │       ├── InfoStasiun
    │   │       └── StarRating
    │   └── LihatSemuaButton → /destinasi
    │
    └── Footer
```

---

## State

Halaman Welcome adalah **mostly static** — tidak memerlukan local state yang kompleks.

```ts
// Navbar dropdown (jika user login)
const [dropdownOpen, setDropdownOpen] = useState(false)

// Kota pills tidak perlu state karena navigasi langsung via URL
// Tidak ada filter state di halaman ini
```

Semua data datang dari server via Inertia props (tidak ada client-side fetching).

---

## Interactions & Events

| Elemen                  | Event    | Action                                                  |
|-------------------------|----------|---------------------------------------------------------|
| Kota Pill               | onClick  | `router.visit('/destinasi', { data: { kota_id: id } })` |
| CTA "Mulai Jelajahi"    | onClick  | `router.visit('/destinasi')`                            |
| CTA "Lihat Peta Rute"   | onClick  | `router.visit('/rute')`                                 |
| Kartu Destinasi         | onClick  | `router.visit('/destinasi/' + id)`                      |
| "Lihat Semua Destinasi" | onClick  | `router.visit('/destinasi')`                            |
| Link "Jelajahi" (nav)   | onClick  | `router.visit('/destinasi')`                            |
| Link "Rute" (nav)       | onClick  | `router.visit('/rute')`                                 |
| Tombol "Masuk"          | onClick  | `router.visit('/login')`                                |
| Tombol "Daftar"         | onClick  | `router.visit('/register')`                             |
| "Keluar" (dropdown)     | onClick  | `router.post('/logout')`                                |

---

## Navigation Flow

```
/  (Welcome)
│
├── klik Kota Pill ──────────────────→  /destinasi?kota_id={id}
│
├── CTA "Mulai Jelajahi" ────────────→  /destinasi
│
├── CTA "Lihat Peta Rute" ───────────→  /rute
│
├── klik Kartu Destinasi ────────────→  /destinasi/{id}
│
├── "Lihat Semua Destinasi" ─────────→  /destinasi
│
├── Navbar "Jelajahi" ───────────────→  /destinasi
│
├── Navbar "Rute" ───────────────────→  /rute
│
├── Navbar "Masuk" ──────────────────→  /login
│
└── Navbar "Daftar" ─────────────────→  /register
```
