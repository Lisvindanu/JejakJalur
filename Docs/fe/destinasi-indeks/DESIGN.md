# Destinasi Index — Design Flow

## Route & Props

```
Route  : GET /destinasi
Handler: DestinasiController@index
```

```ts
type FilterState = {
  search    : string
  kota_id   : string | null
  stasiun_id: string | null
  kategori  : 'Wisata' | 'Kuliner' | 'UMKM' | null
  page      : number
}

type Props = {
  destinasi : PaginatedData<Destinasi>   // Laravel pagination resource
  semuaKota : Kota[]                     // dengan stasiun[] eager-loaded
  filter    : FilterState
  auth      : { user: User | null }
}

// PaginatedData<T>
type PaginatedData<T> = {
  data        : T[]
  current_page: number
  last_page   : number
  per_page    : number
  total       : number
  links       : { url: string | null; label: string; active: boolean }[]
}
```

---

## Wireframe (ASCII)

### 1. Navbar — sama dengan Welcome (sticky, bg-white/90 backdrop-blur)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [🌿 JejakJalur]            Jelajahi    Rute      [Masuk] [Daftar]  │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2. Header Section — bg-stone-50 border-b border-stone-100

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Jelajahi Destinasi                                                │
│   text-3xl font-bold text-stone-800                                 │
│                                                                     │
│   Temukan wisata, kuliner, dan UMKM di setiap stasiun kereta.       │
│   text-stone-500 mt-1 mb-6                                          │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  🔍  Cari destinasi...                                      │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   SearchBar: w-full max-w-2xl                                       │
│   rounded-xl border border-stone-200 px-4 py-3 text-stone-700      │
│   focus:outline-none focus:ring-2 focus:ring-emerald-500            │
│   placeholder: "Cari destinasi, stasiun, atau kota..."              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  py-10, max-w-6xl mx-auto px-4
```

---

### 3. Filter Row — bg-white border-b border-stone-100 sticky top-[57px]

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐ │
│  │ Kota      ▾  │  │ Stasiun   ▾  │  │ Kategori  ▾  │  │ Reset  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────┘ │
│                                                                     │
│  Dropdown Kota:                                                     │
│    Options: "Semua Kota", lalu semuaKota.map(k => k.nama)           │
│    onChange: set kota_id + clear stasiun_id + submit                │
│                                                                     │
│  Dropdown Stasiun (dinamis):                                        │
│    Disabled jika kota_id === null                                   │
│    Options: "Semua Stasiun", lalu stasiun di kota terpilih          │
│    Placeholder saat disabled: "Pilih kota dulu"                     │
│    onChange: set stasiun_id + submit                                │
│                                                                     │
│  Dropdown Kategori:                                                 │
│    Options: "Semua Kategori", "Wisata", "Kuliner", "UMKM"           │
│    onChange: set kategori + submit                                  │
│                                                                     │
│  Tombol Reset:                                                      │
│    Visible hanya jika ada filter aktif (search/kota/stasiun/kat)    │
│    onClick: clear semua filter, router.visit('/destinasi')          │
│    Style: text-stone-500 hover:text-red-600 text-sm underline       │
│           atau border border-stone-200 rounded-lg px-3 py-2         │
│                                                                     │
│  Filter aktif indicator:                                            │
│    Jika ada filter: "Menampilkan X hasil untuk '...'"               │
│    text-sm text-stone-500 mt-2                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Dropdown style:
    rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700
    bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    min-w-[140px] cursor-pointer

  Filter row: py-4, flex flex-wrap gap-3 items-center
  Sticky behavior: top = tinggi navbar (≈57px)
```

---

### 4. Grid Destinasi — bg-white

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Menampilkan 18 destinasi                                           │
│  text-sm text-stone-500 mb-4                                        │
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────────┐ │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌─────────────┐ │ │
│  │ │               │ │  │ │               │ │  │ │             │ │ │
│  │ │  foto / emoji │ │  │ │  foto / emoji │ │  │ │ foto/emoji  │ │ │
│  │ │  h-44 w-full  │ │  │ │  h-44 w-full  │ │  │ │ h-44 w-full │ │ │
│  │ │  object-cover │ │  │ │  object-cover │ │  │ │ object-cover│ │ │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └─────────────┘ │ │
│  │                   │  │                   │  │                 │ │
│  │ [Wisata] [✓]      │  │ [Kuliner]         │  │ [UMKM]          │ │
│  │                   │  │                   │  │                 │ │
│  │ Nama Destinasi    │  │ Nama Destinasi    │  │ Nama Destinasi  │ │
│  │ font-semibold     │  │ font-semibold     │  │ font-semibold   │ │
│  │ text-stone-800    │  │ text-stone-800    │  │ text-stone-800  │ │
│  │ line-clamp-2      │  │ line-clamp-2      │  │ line-clamp-2    │ │
│  │                   │  │                   │  │                 │ │
│  │ 🚉 Sta. Gambir    │  │ 🚉 Sta. Bandung   │  │ 🚉 Sta. Tugu    │ │
│  │ text-xs stone-500 │  │ text-xs stone-500 │  │ text-xs stone-5 │ │
│  │ Jakarta           │  │ Bandung           │  │ Yogyakarta      │ │
│  │                   │  │                   │  │                 │ │
│  │ ★★★★☆  4.2 (12)   │  │ ★★★★★  4.8 (8)    │  │ ★★★☆☆  3.5 (5) │ │
│  │ amber-500 text-xs │  │ amber-500 text-xs │  │ amber-500 xs    │ │
│  └───────────────────┘  └───────────────────┘  └─────────────────┘ │
│                                                                     │
│  [ baris 2: kartu 4, 5, 6 ]                                         │
│  [ baris 3: kartu 7, 8, 9 ] ... dst hingga per_page                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
  Card: rounded-xl border border-stone-100 shadow-sm
        hover:shadow-md transition-all duration-200 cursor-pointer
        overflow-hidden group
  Foto img: group-hover:scale-105 transition-transform duration-300

  Foto placeholder (jika tidak ada foto):
    bg-stone-100 h-44 flex items-center justify-center
    Emoji: Wisata → 🏔️  Kuliner → 🍜  UMKM → 🛍️
    text-5xl

  Badge kategori: rounded-full text-xs font-medium px-2.5 py-0.5
    Wisata  → bg-emerald-100 text-emerald-700
    Kuliner → bg-amber-100   text-amber-700
    UMKM    → bg-purple-100  text-purple-700

  Badge verified: bg-emerald-700 text-white text-xs px-2 py-0.5
                  rounded-full ml-1 "✓"

  Rating stars: filled=amber-400, empty=stone-300, text-xs
```

---

### 5. Empty State — tampil jika destinasi.data.length === 0

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                      🔍                                             │
│                   text-6xl                                          │
│                                                                     │
│            Tidak ada destinasi ditemukan                            │
│            text-xl font-semibold text-stone-700 mt-4                │
│                                                                     │
│       Coba ubah filter atau kata kunci pencarianmu.                 │
│       text-stone-500 mt-2                                           │
│                                                                     │
│                  [ Reset Filter ]                                   │
│                  mt-6 btn emerald outline                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  py-24 text-center col-span-full
```

---

### 6. Pagination

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│        ←  [1]  [2]  [3]  ...  [8]  →                               │
│                                                                     │
│   Prev/Next: rounded-lg border px-3 py-2                            │
│   Active page: bg-emerald-700 text-white border-emerald-700         │
│   Inactive page: bg-white text-stone-700 border-stone-200           │
│                  hover:border-emerald-500 hover:text-emerald-700    │
│   Disabled: opacity-40 cursor-not-allowed                           │
│                                                                     │
│   Info: "Menampilkan 1–18 dari 54 destinasi"                        │
│   text-sm text-stone-500 text-center mt-2                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  mt-10, flex justify-center items-center gap-1
```

---

### 7. Footer — sama dengan Welcome

```
┌─────────────────────────────────────────────────────────────────────┐
│  🌿 JejakJalur  —  © 2025 JejakJalur. Dibuat untuk traveler.       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Destinasi/Indeks.tsx (page)
└── PublicLayout
    ├── Navbar
    │
    ├── HeaderSection
    │   ├── PageTitle + Subtitle
    │   └── SearchBar
    │       └── <input> debounce 300ms → updateFilter('search', val)
    │
    ├── FilterRow (sticky)
    │   ├── KotaDropdown
    │   │   └── <select> onChange → handleKotaChange(id)
    │   ├── StasiunDropdown
    │   │   └── <select> disabled={!filter.kota_id}
    │   │       onChange → handleFilterChange('stasiun_id', id)
    │   ├── KategoriDropdown
    │   │   └── <select> onChange → handleFilterChange('kategori', val)
    │   ├── ActiveFilterBadge  (opsional: chips filter aktif)
    │   └── ResetButton  (visible jika hasActiveFilter)
    │
    ├── ResultCount  ("Menampilkan X destinasi")
    │
    ├── DestinasiGrid
    │   ├── DestinasiCard × n  (destinasi.data)
    │   │   ├── FotoOrPlaceholder
    │   │   ├── BadgeKategori
    │   │   ├── BadgeVerified?
    │   │   ├── NamaDestinasi
    │   │   ├── InfoStasiun  (nama + kota)
    │   │   └── StarRating + count
    │   └── EmptyState  (jika data.length === 0)
    │
    ├── Pagination
    │   └── PaginationLink × n  (destinasi.links)
    │
    └── Footer
```

---

## State

```ts
// Derived dari filter prop (server-side state, disync ke URL)
const [localSearch, setLocalSearch] = useState(filter.search ?? '')

// Stasiun options di-derive dari kota yang dipilih
const selectedKota = semuaKota.find(k => String(k.id) === filter.kota_id)
const stasiunOptions = selectedKota?.stasiun ?? []

// Debounce ref
const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

// Helper: apakah ada filter aktif?
const hasActiveFilter = Boolean(
  filter.search || filter.kota_id || filter.stasiun_id || filter.kategori
)
```

Semua filter state hidup di URL query params.
Setiap perubahan filter trigger `router.visit` dengan `preserveScroll: true`.

---

## Interactions & Events

### Search Input (debounce)

```
User mengetik di SearchBar
  → setLocalSearch(val)
  → clearTimeout(searchTimeout)
  → searchTimeout = setTimeout(() => {
      submitFilter({ search: val, page: 1 })
    }, 300)
```

### Filter Kota

```
User pilih kota di dropdown
  → submitFilter({ kota_id: val, stasiun_id: null, page: 1 })
  → stasiunOptions otomatis ter-update (derived state)
  → Dropdown Stasiun di-enable
```

### Filter Stasiun

```
User pilih stasiun (kota harus sudah dipilih)
  → submitFilter({ stasiun_id: val, page: 1 })
```

### Filter Kategori

```
User pilih kategori
  → submitFilter({ kategori: val, page: 1 })
```

### Reset Filter

```
User klik Reset
  → router.visit('/destinasi')
  → semua filter clear
  → localSearch di-reset ke ''
```

### Pagination

```
User klik nomor halaman
  → submitFilter({ page: nomor })
  → window.scrollTo({ top: 0 }) atau preserveScroll: false
```

### Klik Kartu Destinasi

```
User klik kartu
  → router.visit('/destinasi/' + destinasi.id)
```

### submitFilter() helper

```ts
function submitFilter(overrides: Partial<FilterState>) {
  router.visit('/destinasi', {
    data: { ...filter, ...overrides },
    preserveState: true,
    preserveScroll: true,
    replace: true,
  })
}
```

---

## Navigation Flow

```
/destinasi  (Destinasi Index)
│
├── search input ──────────────────→  /destinasi?search={q}
│
├── filter kota ───────────────────→  /destinasi?kota_id={id}
│
├── filter stasiun ────────────────→  /destinasi?kota_id={k}&stasiun_id={s}
│
├── filter kategori ───────────────→  /destinasi?kategori={kat}
│
├── kombinasi filter ──────────────→  /destinasi?kota_id=&stasiun_id=&kategori=&search=
│
├── reset filter ──────────────────→  /destinasi
│
├── pagination ────────────────────→  /destinasi?...&page={n}
│
├── klik kartu ────────────────────→  /destinasi/{id}
│
└── navbar / pill kota di welcome ─→  /destinasi?kota_id={id}
```
