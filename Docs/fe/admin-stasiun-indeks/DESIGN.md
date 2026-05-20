# Admin Stasiun Index — Design Flow

## Route & Props

**Route:** `GET /admin/stasiun`
**Controller:** `StasiunController@indeks`
**Component:** `pages/Admin/Stasiun/Indeks.tsx`
**Layout:** `AdminLayout`

```ts
type Kota = {
  id: number
  nama: string
  kode: string
}

type Stasiun = {
  id: number
  nama: string
  kode: string
  kota: Kota
  destinasi_count: number
  latitude: number | null
  longitude: number | null
}

type Props = {
  stasiun: Stasiun[]
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
│  [train] Stasiun    ←   │ │  Dashboard / Stasiun                │   │
│  [compass] Destinasi    │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ Manajemen Stasiun  [+Tambah Stasiun]│  │
│                         │  └─────────────────────────────────────┘  │
│                         │                                           │
│                         │  ┌─────────────────────────────────────────────────────────┐ │
│                         │  │ bg-white rounded-xl shadow-sm border                   │ │
│                         │  │────────────────────────────────────────────────────────│ │
│                         │  │ No│Nama Stasiun    │Kode │Kota      │Dest│Koordinat│Aksi│ │
│                         │  │──│────────────────│─────│──────────│────│─────────│────│ │
│                         │  │ 1│Stasiun Tugu    │ YK  │Yogyakarta│ 15 │-7.7/110.│✏ 🗑│ │
│                         │  │ 2│Stasiun Lempuyangan│LPN│Yogyakarta│  8│-7.7/110.│✏ 🗑│ │
│                         │  │ 3│Stasiun Balapan │ SLO │Solo      │ 12 │-7.5/110.│✏ 🗑│ │
│                         │  │ …│ …              │ …   │ …        │ …  │ …       │ …  │ │
│                         │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Table Detail

```
┌───────────────────────────────────────────────────────────────────────────┐
│ bg-white rounded-xl shadow-sm border border-stone-100                     │
│                                                                           │
│ overflow-x-auto (responsive scroll pada layar kecil)                      │
│                                                                           │
│  ┌────┬──────────────────┬───────┬────────────┬──────────┬───────────┬────────┐
│  │ No │ Nama Stasiun     │ Kode  │ Kota       │ Destinasi│ Koordinat │ Aksi   │
│  │    │ font-medium      │       │ text-stone │ center   │ text-xs   │        │
│  ├────┼──────────────────┼───────┼────────────┼──────────┼───────────┼────────┤
│  │  1 │ Stasiun Tugu     │ YK    │ Yogyakarta │    15    │ -7.7°     │[Ed][Hp]│
│  │    │                  │       │            │          │ 110.3°    │        │
│  │  2 │ Stasiun Balapan  │ SLO   │ Solo       │    12    │ -7.5°     │[Ed][Hp]│
│  │    │                  │       │            │          │ 110.8°    │        │
│  └────┴──────────────────┴───────┴────────────┴──────────┴───────────┴────────┘
│                                                                           │
│  Koordinat format: lat/lng dipisah baris                                  │
│  Jika null: tampilkan "—" (em dash)                                       │
│  Row hover: bg-stone-50                                                   │
└───────────────────────────────────────────────────────────────────────────┘
```

### Koordinat Cell Detail

```
  Jika lat/lng ada:           Jika lat/lng null:
  ┌──────────────┐            ┌────┐
  │ -7.7956°     │            │  — │
  │ 110.3647°    │            └────┘
  └──────────────┘
  text-xs text-stone-500      text-stone-400
  font-mono
```

### Empty State

```
┌─────────────────────────────────────────────────────┐
│  bg-white rounded-xl shadow-sm border               │
│                                                     │
│       [Train icon — stone-300 w-12 h-12]            │
│                                                     │
│       Belum ada stasiun terdaftar                   │
│       text-stone-500 text-sm                        │
│                                                     │
│       [ + Tambah Stasiun Pertama ]                  │
└─────────────────────────────────────────────────────┘
```

### Delete Confirmation Modal

```
┌──────────────────────────────────────────────┐
│  ╔════════════════════════════════════════╗   │
│  ║  Hapus Stasiun?                        ║   │
│  ║                                        ║   │
│  ║  Apakah Anda yakin ingin menghapus     ║   │
│  ║  stasiun "Stasiun Tugu"? Tindakan ini  ║   │
│  ║  tidak dapat dibatalkan.               ║   │
│  ║                                        ║   │
│  ║  [ Batal ]          [ Ya, Hapus ]      ║   │
│  ╚════════════════════════════════════════╝   │
│  backdrop: bg-black/40                        │
└──────────────────────────────────────────────┘
```

---

## Component Tree

```
Indeks (pages/Admin/Stasiun/Indeks.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Stasiun] ← active
    ├── Header
    │   ├── Breadcrumb ("Dashboard / Stasiun")
    │   └── UserBadge
    └── MainContent
        ├── PageHeader
        │   ├── h1 "Manajemen Stasiun"
        │   └── Link → /admin/stasiun/buat (btn emerald)
        ├── [if stasiun.length > 0]
        │   └── StasiunTable (overflow-x-auto)
        │       ├── thead (No, Nama, Kode, Kota, Destinasi, Koordinat, Aksi)
        │       └── tbody
        │           └── StasiunRow × n
        │               ├── cells (no, nama, kode, kota.nama, destinasi_count)
        │               ├── KoordinatCell (lat/lng atau "—")
        │               ├── Link → /admin/stasiun/{id}/edit
        │               └── DeleteButton → opens ConfirmModal
        └── [if stasiun.length === 0]
            └── EmptyState

ConfirmModal (conditional render)
```

---

## State

```ts
const [stasiunToDelete, setStasiunToDelete] = useState<Stasiun | null>(null)

const isModalOpen = stasiunToDelete !== null

const handleDeleteClick = (stasiun: Stasiun) => setStasiunToDelete(stasiun)
const handleModalClose = () => setStasiunToDelete(null)
const handleConfirmDelete = () => {
  router.delete(route('admin.stasiun.destroy', stasiunToDelete!.id), {
    onSuccess: () => setStasiunToDelete(null),
  })
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Tombol "+ Tambah Stasiun" | click | Navigate → `/admin/stasiun/buat` |
| Tombol "Edit" per row | click | Navigate → `/admin/stasiun/{id}/edit` |
| Tombol "Hapus" per row | click | Buka ConfirmModal dengan data stasiun terpilih |
| Modal "Batal" | click | Tutup modal, reset `stasiunToDelete` |
| Modal "Ya, Hapus" | click | `router.delete('/admin/stasiun/{id}')` |
| Row hover | hover | bg-stone-50 transition |

---

## Navigation Flow

```
/admin/stasiun  (Stasiun Index)
  ├── → /admin/stasiun/buat          (tombol Tambah Stasiun)
  ├── → /admin/stasiun/{id}/edit     (tombol Edit)
  ├── ← DELETE /admin/stasiun/{id}   (hapus → redirect kembali)
  ├── ← /admin                       (breadcrumb "Dashboard")
  └── → /admin/kota                  (sidebar nav)
```
