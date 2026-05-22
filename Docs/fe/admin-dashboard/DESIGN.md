# Admin Dashboard — Design Flow

## Route & Props

**Route:** `GET /admin`
**Controller:** `AdminController@dashboard`
**Component:** `pages/Admin/Dashboard.tsx`
**Layout:** `AdminLayout`

```ts
type Props = {
  statistik: {
    jumlah_kota: number
    jumlah_stasiun: number
    jumlah_destinasi: number
    destinasi_verified: number
    jumlah_pengguna: number
  }
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│ bg-emerald-800          │ bg-stone-50                               │
│─────────────────────────│───────────────────────────────────────────│
│  🌿 JejakJalur          │ ┌─────────────────────────────────────┐   │
│                         │ │ HEADER  bg-white border-b           │   │
│  [grid]  Dashboard  ←   │ │  Breadcrumb: Dashboard              │   │
│  [pin]   Kota           │ │                      👤 Admin       │   │
│  [train] Stasiun        │ └─────────────────────────────────────┘   │
│  [compass] Destinasi    │                                           │
│  ──────────────────     │  p-6                                      │
│  [logout] Keluar        │  ┌──────────────┐  ┌──────────────┐       │
│                         │  │  Total Kota  │  │Total Stasiun │       │
│                         │  │    [icon]    │  │    [icon]    │       │
│                         │  │     12       │  │     24       │       │
│                         │  └──────────────┘  └──────────────┘       │
│                         │                                           │
│                         │  ┌──────────────┐  ┌──────────────┐       │
│                         │  │  Total       │  │  Dest.       │       │
│                         │  │  Destinasi   │  │  Terverif.   │       │
│                         │  │    [icon]    │  │    [icon]    │       │
│                         │  │     89       │  │     67       │       │
│                         │  └──────────────┘  └──────────────┘       │
│                         │                                           │
│                         │  ┌──────────────┐                         │
│                         │  │    Total     │                         │
│                         │  │   Pengguna   │                         │
│                         │  │    [icon]    │                         │
│                         │  │     310      │                         │
│                         │  └──────────────┘                         │
│                         │                                           │
│                         │  ── Quick Actions ──────────────────────  │
│                         │  [ + Tambah Kota ] [ + Tambah Stasiun ]  │
│                         │  [ + Tambah Destinasi ]                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Stats Cards Detail

```
┌────────────────────────────────────┐
│  bg-white rounded-xl shadow-sm     │
│  border border-stone-100 p-6       │
│                                    │
│  ┌──────┐  Total Kota              │
│  │ icon │  text-stone-500 text-sm  │
│  └──────┘                          │
│           12                       │
│           text-3xl font-bold       │
│           text-stone-800           │
└────────────────────────────────────┘
```

Icon mapping per card:
- Total Kota → `MapPin` (emerald-600)
- Total Stasiun → `Train` (blue-600)
- Total Destinasi → `Compass` (amber-600)
- Destinasi Terverifikasi → `BadgeCheck` (green-600)
- Total Pengguna → `Users` (purple-600)

### Quick Actions Detail

```
┌─────────────────────────────────────────────────────┐
│  bg-white rounded-xl shadow-sm border p-6           │
│                                                     │
│  Quick Actions          text-lg font-semibold       │
│  ─────────────────────────────────────────────────  │
│  [ + Tambah Kota ]  [ + Tambah Stasiun ]            │
│  [ + Tambah Destinasi ]                             │
│                                                     │
│  Buttons: variant outline emerald, rounded-lg       │
└─────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Dashboard (pages/Admin/Dashboard.tsx)
└── AdminLayout
    ├── Sidebar
    │   ├── SidebarBrand ("JejakJalur")
    │   └── SidebarNav
    │       ├── NavItem [Dashboard] ← active
    │       ├── NavItem [Kota]
    │       ├── NavItem [Stasiun]
    │       ├── NavItem [Destinasi]
    │       ├── NavDivider
    │       └── NavItem [Keluar]
    ├── Header
    │   ├── Breadcrumb ("Dashboard")
    │   └── UserBadge (nama user)
    └── MainContent
        ├── StatCard (Total Kota)
        ├── StatCard (Total Stasiun)
        ├── StatCard (Total Destinasi)
        ├── StatCard (Destinasi Terverifikasi)
        ├── StatCard (Total Pengguna)
        └── QuickActionsCard
            ├── LinkButton → /admin/kota/buat
            ├── LinkButton → /admin/stasiun/buat
            └── LinkButton → /admin/destinasi/buat
```

---

## State

Dashboard adalah halaman **read-only** — tidak ada local state. Semua data datang dari server via Inertia props.

```ts
// Tidak ada useState/useReducer
// Semua nilai dari props.statistik
const { statistik } = usePage<Props>().props
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Tombol "+ Tambah Kota" | click | Navigate → `/admin/kota/buat` (Inertia link) |
| Tombol "+ Tambah Stasiun" | click | Navigate → `/admin/stasiun/buat` |
| Tombol "+ Tambah Destinasi" | click | Navigate → `/admin/destinasi/buat` |
| NavItem "Kota" | click | Navigate → `/admin/kota` |
| NavItem "Stasiun" | click | Navigate → `/admin/stasiun` |
| NavItem "Destinasi" | click | Navigate → `/admin/destinasi` |
| NavItem "Keluar" | click | POST `/logout` (Inertia) |

---

## Navigation Flow

```
/admin  (Dashboard)
  ├── → /admin/kota          (via nav atau quick action)
  ├── → /admin/stasiun       (via nav atau quick action)
  ├── → /admin/destinasi     (via nav atau quick action)
  └── → /logout              (via Keluar)
```
