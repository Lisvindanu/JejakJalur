# Admin Kota Formulir — Design Flow

## Route & Props

**Route (Create):** `GET /admin/kota/buat`
**Route (Edit):** `GET /admin/kota/{id}/edit`
**Controller:** `KotaController@buat` / `KotaController@edit`
**Component:** `pages/Admin/Kota/Formulir.tsx`
**Layout:** `AdminLayout`

```ts
type Kota = {
  id: number
  nama: string
  kode: string
}

type Props = {
  kota?: Kota   // undefined = create mode, defined = edit mode
}
```

Mode ditentukan dari keberadaan prop `kota`:
- `kota === undefined` → **Create mode** — form kosong, submit ke `POST /admin/kota`
- `kota !== undefined` → **Edit mode** — form pre-filled, submit ke `PATCH /admin/kota/{id}`

---

## Wireframe (ASCII)

### Create Mode

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│─────────────────────────│───────────────────────────────────────────│
│  [grid]  Dashboard      │ ┌─────────────────────────────────────┐   │
│  [pin]   Kota       ←   │ │ HEADER  bg-white border-b           │   │
│  [train] Stasiun        │ │  Dashboard / Kota / Tambah          │   │
│  [compass] Destinasi    │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  h1: Tambah Kota                         │
│                         │  text-xl font-bold text-stone-800        │
│                         │                                           │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ bg-white rounded-xl shadow-sm p-8   │  │
│                         │  │                                     │  │
│                         │  │  Nama Kota *                        │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. Yogyakarta              │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │  [error text jika ada]              │  │
│                         │  │                                     │  │
│                         │  │  Kode Ibukota *                     │  │
│                         │  │  ┌───────────────┐                  │  │
│                         │  │  │ e.g. YK        │                  │  │
│                         │  │  └───────────────┘                  │  │
│                         │  │  hint: maks. 10 karakter, huruf     │  │
│                         │  │        kapital                      │  │
│                         │  │  [error text jika ada]              │  │
│                         │  │                                     │  │
│                         │  │  [ Batal ]          [ Simpan ]      │  │
│                         │  │  link /admin/kota   btn emerald     │  │
│                         │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Edit Mode (perbedaan dari Create)

```
  Header breadcrumb: Dashboard / Kota / Edit: Yogyakarta
  h1: Edit Kota: Yogyakarta

  Form fields pre-filled dengan data kota existing.
  Submit PATCH ke /admin/kota/{id}
```

### Field Error State

```
  Nama Kota *
  ┌─────────────────────────────┐
  │                              │  ← border-red-500
  └─────────────────────────────┘
  Nama kota wajib diisi           ← text-red-500 text-sm mt-1
```

---

## Component Tree

```
Formulir (pages/Admin/Kota/Formulir.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Kota] ← active
    ├── Header
    │   ├── Breadcrumb (dynamic: create vs edit)
    │   └── UserBadge
    └── MainContent
        ├── PageTitle (dynamic: "Tambah Kota" vs "Edit Kota: {nama}")
        └── FormCard (bg-white rounded-xl shadow-sm)
            ├── FormField "Nama Kota"
            │   ├── Label
            │   ├── TextInput (value bound to form.nama)
            │   └── FieldError (form.errors.nama)
            ├── FormField "Kode Ibukota"
            │   ├── Label
            │   ├── TextInput (value bound to form.kode, uppercase)
            │   ├── HintText "Maks. 10 karakter, huruf kapital"
            │   └── FieldError (form.errors.kode)
            └── FormActions
                ├── Link → /admin/kota (Batal, outline stone)
                └── SubmitButton (Simpan, solid emerald, disabled saat processing)
```

---

## State

```ts
const { kota } = usePage<Props>().props

// Mode detection
const isEditMode = kota !== undefined

// Inertia useForm
const { data, setData, post, patch, processing, errors, reset } = useForm({
  nama: kota?.nama ?? '',
  kode: kota?.kode ?? '',
})

// Submit handler
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  if (isEditMode) {
    patch(route('admin.kota.update', kota!.id))
  } else {
    post(route('admin.kota.store'))
  }
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Input "Nama Kota" | change | `setData('nama', value)` — clear error on type |
| Input "Kode Ibukota" | change | `setData('kode', value.toUpperCase())` |
| Tombol "Batal" | click | Navigate → `/admin/kota` (Link, no form state change) |
| Tombol "Simpan" | click | `handleSubmit()` → POST atau PATCH |
| Form submit | submit | Validasi server-side, tampilkan errors atau redirect ke indeks |
| Tombol "Simpan" (processing) | — | disabled + loading spinner, prevent double submit |

### Validasi Server-side

Errors dikembalikan via Inertia dan ditampilkan per field:
- `nama` → wajib, string, max 255
- `kode` → wajib, string, max 10, uppercase

---

## Navigation Flow

```
/admin/kota/buat  (Create Mode)
  ├── submit POST /admin/kota → redirect → /admin/kota  (success)
  ├── submit POST /admin/kota → re-render form with errors  (validation fail)
  └── klik Batal → /admin/kota

/admin/kota/{id}/edit  (Edit Mode)
  ├── submit PATCH /admin/kota/{id} → redirect → /admin/kota  (success)
  ├── submit PATCH /admin/kota/{id} → re-render form with errors  (validation fail)
  └── klik Batal → /admin/kota
```
