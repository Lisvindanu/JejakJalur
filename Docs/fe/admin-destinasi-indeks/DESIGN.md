# Admin Destinasi Index — Design Flow

## Route & Props

**Route:** `GET /admin/destinasi`
**Controller:** `DestinasiController@indeks`
**Component:** `pages/Admin/Destinasi/Indeks.tsx`
**Layout:** `AdminLayout`

```ts
type Stasiun = {
  id: number
  nama: string
  kota: { id: number; nama: string }
}

type Destinasi = {
  id: number
  nama: string
  kategori: 'Wisata' | 'Kuliner' | 'UMKM'
  rating: number | null
  is_verified: boolean
  foto: string | null
  stasiun: Stasiun
}

type Filter = {
  kata_kunci?: string
  stasiun_id?: string
  kategori?: string
}

type Props = {
  destinasi: Destinasi[]
  semuaStasiun: Stasiun[]
  filter: Filter
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│─────────────────────────│───────────────────────────────────────────│
│  [grid]  Dashboard      │ ┌─────────────────────────────────────┐   │
│  [pin]   Kota           │ │ HEADER  bg-white border-b           │   │
│  [train] Stasiun        │ │  Dashboard / Destinasi              │   │
│  [compass] Dest.    ←   │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  ┌──────────────────────────────────────┐ │
│                         │  │ Manajemen Destinasi [+Tambah Dest.]  │ │
│                         │  └──────────────────────────────────────┘ │
│                         │                                           │
│                         │  ── Filter Bar ───────────────────────── │
│                         │  ┌──────────────────────────────────────┐ │
│                         │  │ bg-white rounded-xl shadow-sm p-4   │ │
│                         │  │                                      │ │
│                         │  │ [🔍 Cari nama destinasi...] [Stasiu▾]│ │
│                         │  │ [Kategori ▾]               [Reset]   │ │
│                         │  └──────────────────────────────────────┘ │
│                         │                                           │
│                         │  ── Tabel ────────────────────────────── │
│                         │  ┌──────────────────────────────────────────────────────────┐ │
│                         │  │ bg-white rounded-xl shadow-sm border                    │ │
│                         │  │─────────────────────────────────────────────────────────│ │
│                         │  │No│Nama Dest.   │Stasiun  │Kategori  │Rating│Status│Aksi │ │
│                         │  │──│─────────────│─────────│──────────│──────│──────│─────│ │
│                         │  │1 │Prambanan    │Sta. Klaten│[Wisata]│★★★★☆│[✓ Ver]│✏🗑↕│ │
│                         │  │2 │Warung Bu Sri│Sta. Tugu │[Kuliner]│★★★☆☆│[? Unv]│✏🗑↕│ │
│                         │  │3 │Batik Dahlan │Sta. Solo │[UMKM]  │★★★★★│[✓ Ver]│✏🗑↕│ │
│                         │  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Filter Bar Detail

```
┌──────────────────────────────────────────────────────────────┐
│  bg-white rounded-xl shadow-sm border p-4                    │
│                                                              │
│  ┌────────────────────────────┐  ┌─────────────────────┐    │
│  │ 🔍 Cari nama destinasi...  │  │ Semua Stasiun     ▾ │    │
│  └────────────────────────────┘  └─────────────────────┘    │
│                                                              │
│  ┌──────────────────┐  ┌────────────────────────────────┐   │
│  │ Semua Kategori ▾ │  │ Reset Filter (link, stone-500) │   │
│  └──────────────────┘  └────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘

Search input: debounced 400ms, submit via GET dengan query params
Dropdown stasiun: options dari semuaStasiun (group by kota)
Dropdown kategori: Semua | Wisata | Kuliner | UMKM
Reset: link href="/admin/destinasi" (clear all filters)
```

### Kategori Badge

```
  Wisata:   bg-blue-100  text-blue-700  rounded-full px-2 py-0.5 text-xs
  Kuliner:  bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 text-xs
  UMKM:     bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs
```

### Rating Stars

```
  Rating 4.2:
  ★ ★ ★ ★ ☆  (4 bintang penuh, 1 kosong)
  4.2          text-xs text-stone-500 ml-1

  Rating null:
  — (em dash)  text-stone-400
```

### Status Verifikasi Badge

```
  Terverifikasi:   bg-green-100 text-green-700 rounded-full text-xs
                   [✓] Terverifikasi

  Belum Verifikasi: bg-stone-100 text-stone-500 rounded-full text-xs
                    [?] Belum Verif
```

### Aksi Column

```
  ┌────────────────────────────────────────┐
  │  [ Edit ]  [ Hapus ]  [ Verifikasi ↕ ] │
  │                                        │
  │  Edit:       outline emerald text-sm   │
  │  Hapus:      outline red text-sm       │
  │  Verifikasi: toggle button             │
  │    - Jika verified:   btn green-soft   │
  │      label "Batalkan Verif"            │
  │    - Jika unverified: btn stone-soft   │
  │      label "Verifikasi"                │
  └────────────────────────────────────────┘
```

### Verifikasi Toggle Flow

```
  User klik [Verifikasi] pada row yang belum diverifikasi
    → PATCH /admin/destinasi/{id}/verifikasi
    → Server toggle is_verified
    → Inertia partial reload (hanya prop 'destinasi')
    → Row badge berubah ke "Terverifikasi"

  User klik [Batalkan Verif] pada row yang sudah diverifikasi
    → PATCH /admin/destinasi/{id}/verifikasi  (endpoint sama)
    → Server toggle is_verified = false
    → Row badge berubah ke "Belum Verif"
```

### Empty State (setelah filter)

```
┌─────────────────────────────────────────────────────┐
│  [Compass icon — stone-300]                         │
│                                                     │
│  Tidak ada destinasi yang sesuai filter             │
│  text-stone-500 text-sm                             │
│                                                     │
│  [ Reset Filter ]  btn outline stone                │
└─────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Indeks (pages/Admin/Destinasi/Indeks.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Destinasi] ← active
    ├── Header
    │   ├── Breadcrumb ("Dashboard / Destinasi")
    │   └── UserBadge
    └── MainContent
        ├── PageHeader
        │   ├── h1 "Manajemen Destinasi"
        │   └── Link → /admin/destinasi/buat
        ├── FilterBar
        │   ├── SearchInput (debounced)
        │   ├── StasiunSelect (semuaStasiun options)
        │   ├── KategoriSelect (Wisata|Kuliner|UMKM)
        │   └── ResetLink (href="/admin/destinasi")
        ├── [if destinasi.length > 0]
        │   └── DestinasiTable (overflow-x-auto)
        │       ├── thead
        │       └── tbody
        │           └── DestinasiRow × n
        │               ├── NamaCell
        │               ├── StasiunCell (stasiun.nama)
        │               ├── KategoriBadge
        │               ├── RatingStars
        │               ├── StatusBadge (is_verified)
        │               └── AksiCell
        │                   ├── Link → edit
        │                   ├── DeleteButton → ConfirmModal
        │                   └── VerifikasiToggle → PATCH inline
        └── [if destinasi.length === 0]
            └── EmptyState (dengan reset filter CTA)

ConfirmModal (conditional)
```

---

## State

```ts
const { destinasi, semuaStasiun, filter } = usePage<Props>().props

// Delete modal
const [destiToDelete, setDestiToDelete] = useState<Destinasi | null>(null)

// Filter state (synced dengan URL)
const [search, setSearch] = useState(filter.kata_kunci ?? '')
const [stasiunId, setStasiunId] = useState(filter.stasiun_id ?? '')
const [kategori, setKategori] = useState(filter.kategori ?? '')

// Debounced search
useEffect(() => {
  const timer = setTimeout(() => {
    router.get('/admin/destinasi', { kata_kunci: search, stasiun_id: stasiunId, kategori }, {
      preserveState: true,
      replace: true,
    })
  }, 400)
  return () => clearTimeout(timer)
}, [search, stasiunId, kategori])

// Verifikasi toggle
const handleVerifikasi = (destinasi: Destinasi) => {
  router.patch(route('admin.destinasi.verifikasi', destinasi.id), {}, {
    preserveScroll: true,
    only: ['destinasi'],
  })
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Tombol "+ Tambah Destinasi" | click | Navigate → `/admin/destinasi/buat` |
| Search input | change | Debounced GET dengan filter params |
| Dropdown stasiun | change | GET dengan filter params |
| Dropdown kategori | change | GET dengan filter params |
| Link "Reset Filter" | click | GET `/admin/destinasi` (tanpa filter) |
| Tombol "Edit" per row | click | Navigate → `/admin/destinasi/{id}/edit` |
| Tombol "Hapus" per row | click | Buka ConfirmModal |
| Modal "Ya, Hapus" | click | `router.delete('/admin/destinasi/{id}')` |
| Tombol "Verifikasi" / "Batalkan" | click | `router.patch('/admin/destinasi/{id}/verifikasi')` |

---

## Navigation Flow

```
/admin/destinasi  (Destinasi Index)
  ├── Filter: GET /admin/destinasi?kata_kunci=&stasiun_id=&kategori=
  ├── → /admin/destinasi/buat                 (tombol Tambah)
  ├── → /admin/destinasi/{id}/edit            (tombol Edit)
  ├── ← DELETE /admin/destinasi/{id}          (hapus → redirect)
  ├── ← PATCH /admin/destinasi/{id}/verifikasi (toggle, partial reload)
  └── ← /admin                                (breadcrumb)
```
