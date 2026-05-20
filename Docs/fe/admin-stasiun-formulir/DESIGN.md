# Admin Stasiun Formulir — Design Flow

## Route & Props

**Route (Create):** `GET /admin/stasiun/buat`
**Route (Edit):** `GET /admin/stasiun/{id}/edit`
**Controller:** `StasiunController@buat` / `StasiunController@edit`
**Component:** `pages/Admin/Stasiun/Formulir.tsx`
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
  kota_id: number
  latitude: number | null
  longitude: number | null
}

type Props = {
  stasiun?: Stasiun     // undefined = create mode, defined = edit mode
  semuaKota: Kota[]     // selalu disertakan untuk populate dropdown
}
```

Mode ditentukan dari keberadaan prop `stasiun`:
- `stasiun === undefined` → **Create mode** — form kosong, submit ke `POST /admin/stasiun`
- `stasiun !== undefined` → **Edit mode** — form pre-filled, submit ke `PATCH /admin/stasiun/{id}`

---

## Wireframe (ASCII)

### Create Mode

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│─────────────────────────│───────────────────────────────────────────│
│  [grid]  Dashboard      │ ┌─────────────────────────────────────┐   │
│  [pin]   Kota           │ │ HEADER  bg-white border-b           │   │
│  [train] Stasiun    ←   │ │  Dashboard / Stasiun / Tambah       │   │
│  [compass] Destinasi    │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  h1: Tambah Stasiun                      │
│                         │                                           │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ bg-white rounded-xl shadow-sm p-8   │  │
│                         │  │                                     │  │
│                         │  │  Kota *                             │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ Pilih Kota              ▾   │   │  │
│                         │  │  │  Yogyakarta                  │   │  │
│                         │  │  │  Solo                        │   │  │
│                         │  │  │  Semarang                    │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │  [error text jika ada]              │  │
│                         │  │                                     │  │
│                         │  │  Nama Stasiun *                     │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. Stasiun Tugu            │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  Kode Stasiun *                     │  │
│                         │  │  ┌───────────────┐                  │  │
│                         │  │  │ e.g. YK        │                  │  │
│                         │  │  └───────────────┘                  │  │
│                         │  │  hint: maks. 10 karakter            │  │
│                         │  │                                     │  │
│                         │  │  ── Koordinat (opsional) ────────── │  │
│                         │  │                                     │  │
│                         │  │  Latitude                           │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. -7.7956                 │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  Longitude                         │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. 110.3647                │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  [ Batal ]          [ Simpan ]     │  │
│                         │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Edit Mode (perbedaan dari Create)

```
  Header breadcrumb: Dashboard / Stasiun / Edit: Stasiun Tugu
  h1: Edit Stasiun: Stasiun Tugu

  Semua field pre-filled.
  Dropdown kota pre-selected sesuai kota_id.
  Submit PATCH ke /admin/stasiun/{id}
```

### Dropdown Kota Detail

```
  Kota *
  ┌─────────────────────────────────────────────┐
  │ Pilih Kota                              ▾   │
  └─────────────────────────────────────────────┘

  Dropdown terbuka:
  ┌─────────────────────────────────────────────┐
  │ Pilih Kota                              ▾   │
  ├─────────────────────────────────────────────┤
  │  Yogyakarta                                 │  ← id=1
  │  Solo                                       │  ← id=2
  │  Semarang                                   │  ← id=3
  │  ...                                        │
  └─────────────────────────────────────────────┘

  Rendered as native <select> atau custom Select component.
  Option value = kota.id (string)
  Option label = kota.nama
```

### Koordinat Section

```
  ── Koordinat (opsional) ──────────────────────────────────
  text-stone-500 text-sm font-medium section divider

  Latitude                          Longitude
  ┌──────────────────────┐          ┌──────────────────────┐
  │                      │          │                      │
  └──────────────────────┘          └──────────────────────┘
  type="number" step="any"          type="number" step="any"
  placeholder "-7.7956"             placeholder "110.3647"
```

---

## Component Tree

```
Formulir (pages/Admin/Stasiun/Formulir.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Stasiun] ← active
    ├── Header
    │   ├── Breadcrumb (dynamic: create vs edit)
    │   └── UserBadge
    └── MainContent
        ├── PageTitle (dynamic)
        └── FormCard
            ├── FormField "Kota"
            │   ├── Label (required marker)
            │   ├── SelectInput (options dari semuaKota)
            │   └── FieldError (form.errors.kota_id)
            ├── FormField "Nama Stasiun"
            │   ├── Label
            │   ├── TextInput
            │   └── FieldError (form.errors.nama)
            ├── FormField "Kode Stasiun"
            │   ├── Label
            │   ├── TextInput (uppercase)
            │   ├── HintText
            │   └── FieldError (form.errors.kode)
            ├── SectionDivider "Koordinat (opsional)"
            ├── CoordinateGroup (grid 2 kolom)
            │   ├── FormField "Latitude"
            │   │   ├── NumberInput (step="any", nullable)
            │   │   └── FieldError
            │   └── FormField "Longitude"
            │       ├── NumberInput (step="any", nullable)
            │       └── FieldError
            └── FormActions
                ├── Link → /admin/stasiun (Batal)
                └── SubmitButton (Simpan, disabled saat processing)
```

---

## State

```ts
const { stasiun, semuaKota } = usePage<Props>().props

const isEditMode = stasiun !== undefined

const { data, setData, post, patch, processing, errors } = useForm({
  kota_id: stasiun?.kota_id?.toString() ?? '',
  nama: stasiun?.nama ?? '',
  kode: stasiun?.kode ?? '',
  latitude: stasiun?.latitude?.toString() ?? '',
  longitude: stasiun?.longitude?.toString() ?? '',
})

const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  if (isEditMode) {
    patch(route('admin.stasiun.update', stasiun!.id))
  } else {
    post(route('admin.stasiun.store'))
  }
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Dropdown "Kota" | change | `setData('kota_id', value)` |
| Input "Nama Stasiun" | change | `setData('nama', value)` |
| Input "Kode Stasiun" | change | `setData('kode', value.toUpperCase())` |
| Input "Latitude" | change | `setData('latitude', value)` |
| Input "Longitude" | change | `setData('longitude', value)` |
| Tombol "Batal" | click | Navigate → `/admin/stasiun` |
| Tombol "Simpan" | click | `handleSubmit()` → POST atau PATCH |
| Form submit (processing) | — | Tombol disabled + spinner |

### Validasi Server-side

- `kota_id` → wajib, exists di tabel kota
- `nama` → wajib, string, max 255
- `kode` → wajib, string, max 10
- `latitude` → opsional, numeric, antara -90 dan 90
- `longitude` → opsional, numeric, antara -180 dan 180

---

## Navigation Flow

```
/admin/stasiun/buat  (Create Mode)
  ├── submit POST /admin/stasiun → redirect → /admin/stasiun  (success)
  ├── submit POST /admin/stasiun → re-render with errors  (fail)
  └── klik Batal → /admin/stasiun

/admin/stasiun/{id}/edit  (Edit Mode)
  ├── submit PATCH /admin/stasiun/{id} → redirect → /admin/stasiun  (success)
  ├── submit PATCH /admin/stasiun/{id} → re-render with errors  (fail)
  └── klik Batal → /admin/stasiun
```
