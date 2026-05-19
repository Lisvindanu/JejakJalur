# Admin Kota Index — Design Flow

## Route & Props

**Route:** `GET /admin/kota`
**Controller:** `KotaController@indeks`
**Component:** `pages/Admin/Kota/Indeks.tsx`
**Layout:** `AdminLayout`

```ts
type Kota = {
  id: number
  nama: string
  kode: string
  stasiun_count: number
}

type Props = {
  kota: Kota[]
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│─────────────────────────│───────────────────────────────────────────│
│  [grid]  Dashboard      │ ┌─────────────────────────────────────┐   │
│  [pin]   Kota       ←   │ │ HEADER  bg-white border-b           │   │
│  [train] Stasiun        │ │  Dashboard / Kota                   │   │
│  [compass] Destinasi    │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ Manajemen Kota    [ + Tambah Kota ] │  │
│                         │  │ text-xl font-bold       btn emerald │  │
│                         │  └─────────────────────────────────────┘  │
│                         │                                           │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ bg-white rounded-xl shadow-sm border│  │
│                         │  │─────────────────────────────────────│  │
│                         │  │ No │ Nama Kota  │ Kode │ Stasiun│Aksi│  │
│                         │  │────│────────────│──────│────────│────│  │
│                         │  │  1 │ Yogyakarta │ YK   │   3    │ ✏ 🗑│  │
│                         │  │  2 │ Solo       │ SLO  │   2    │ ✏ 🗑│  │
│                         │  │  3 │ Semarang   │ SMG  │   4    │ ✏ 🗑│  │
│                         │  │  … │ …          │ …    │   …    │ …  │  │
│                         │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Table Detail

```
┌─────────────────────────────────────────────────────────────────┐
│ bg-white rounded-xl shadow-sm border border-stone-100           │
│                                                                 │
│  ┌────┬──────────────────┬────────┬────────────────┬─────────┐  │
│  │ No │ Nama Kota        │ Kode   │ Jumlah Stasiun │ Aksi    │  │
│  │    │ font-medium      │        │ text-center    │         │  │
│  ├────┼──────────────────┼────────┼────────────────┼─────────┤  │
│  │  1 │ Yogyakarta       │ YK     │       3        │[Edit][X]│  │
│  │    │                  │        │                │         │  │
│  │  2 │ Solo             │ SLO    │       2        │[Edit][X]│  │
│  └────┴──────────────────┴────────┴────────────────┴─────────┘  │
│                                                                 │
│  Row hover: bg-stone-50 transition                              │
│  Edit btn: outline emerald rounded-lg text-sm px-3 py-1        │
│  Hapus btn: outline red rounded-lg text-sm px-3 py-1           │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────────────────────────┐
│  bg-white rounded-xl shadow-sm border               │
│                                                     │
│         [MapPin icon — stone-300 w-12 h-12]         │
│                                                     │
│         Belum ada kota terdaftar                    │
│         text-stone-500 text-sm                      │
│                                                     │
│         [ + Tambah Kota Pertama ]                   │
│         btn emerald                                 │
└─────────────────────────────────────────────────────┘
```

### Delete Confirmation Modal

```
┌──────────────────────────────────────────┐
│  ╔══════════════════════════════════════╗ │
│  ║  Hapus Kota?                         ║ │
│  ║                                      ║ │
│  ║  Apakah Anda yakin ingin menghapus   ║ │
│  ║  kota "Yogyakarta"? Tindakan ini     ║ │
│  ║  tidak dapat dibatalkan.             ║ │
│  ║                                      ║ │
│  ║  [ Batal ]        [ Ya, Hapus ]      ║ │
│  ║  btn outline      btn solid red      ║ │
│  ╚══════════════════════════════════════╝ │
│  backdrop: bg-black/40                   │
└──────────────────────────────────────────┘
```

---

## Component Tree

```
Indeks (pages/Admin/Kota/Indeks.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Kota] ← active
    ├── Header
    │   ├── Breadcrumb ("Dashboard / Kota")
    │   └── UserBadge
    └── MainContent
        ├── PageHeader
        │   ├── h1 "Manajemen Kota"
        │   └── Link → /admin/kota/buat (btn emerald)
        ├── [if kota.length > 0]
        │   └── KotaTable
        │       ├── thead (No, Nama Kota, Kode, Jumlah Stasiun, Aksi)
        │       └── tbody
        │           └── KotaRow × n
        │               ├── cells (no, nama, kode, stasiun_count)
        │               ├── Link → /admin/kota/{id}/edit (Edit)
        │               └── DeleteButton → opens ConfirmModal
        └── [if kota.length === 0]
            └── EmptyState
                └── Link → /admin/kota/buat

ConfirmModal (conditional render)
├── Backdrop
├── ModalCard
│   ├── Title "Hapus Kota?"
│   ├── Body text (nama kota interpolated)
│   ├── BatalButton → closeModal()
│   └── HapusButton → router.delete(/admin/kota/{id})
```

---

## State

```ts
// Modal confirmation state
const [kotaToDelete, setKotaToDelete] = useState<Kota | null>(null)

// Derived
const isModalOpen = kotaToDelete !== null

// Handlers
const handleDeleteClick = (kota: Kota) => setKotaToDelete(kota)
const handleModalClose = () => setKotaToDelete(null)
const handleConfirmDelete = () => {
  router.delete(route('admin.kota.destroy', kotaToDelete!.id), {
    onSuccess: () => setKotaToDelete(null),
  })
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Tombol "+ Tambah Kota" | click | Navigate → `/admin/kota/buat` |
| Tombol "Edit" per row | click | Navigate → `/admin/kota/{id}/edit` |
| Tombol "Hapus" per row | click | Buka ConfirmModal dengan data kota terpilih |
| Modal "Batal" | click | Tutup modal, reset `kotaToDelete` |
| Modal "Ya, Hapus" | click | `router.delete('/admin/kota/{id}')` → redirect ke indeks |
| Row hover | hover | bg-stone-50 highlight |

---

## Navigation Flow

```
/admin/kota  (Kota Index)
  ├── → /admin/kota/buat          (tombol Tambah Kota)
  ├── → /admin/kota/{id}/edit     (tombol Edit per row)
  ├── ← DELETE /admin/kota/{id}   (konfirmasi hapus → redirect kembali ke /admin/kota)
  └── ← /admin                    (breadcrumb "Dashboard")
```
