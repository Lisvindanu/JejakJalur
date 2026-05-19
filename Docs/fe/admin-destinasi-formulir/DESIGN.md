# Admin Destinasi Formulir — Design Flow

## Route & Props

**Route (Create):** `GET /admin/destinasi/buat`
**Route (Edit):** `GET /admin/destinasi/{id}/edit`
**Controller:** `DestinasiController@buat` / `DestinasiController@edit`
**Component:** `pages/Admin/Destinasi/Formulir.tsx`
**Layout:** `AdminLayout`

```ts
type Kota = {
  id: number
  nama: string
}

type Stasiun = {
  id: number
  nama: string
  kota: Kota
}

type Destinasi = {
  id: number
  nama: string
  deskripsi: string
  alamat: string
  kategori: 'Wisata' | 'Kuliner' | 'UMKM'
  foto: string | null         // URL foto existing (storage path)
  is_verified: boolean
  stasiun_id: number
}

type Props = {
  destinasi?: Destinasi       // undefined = create mode, defined = edit mode
  semuaStasiun: Stasiun[]     // untuk dropdown, di-group by kota
}
```

Mode ditentukan dari keberadaan prop `destinasi`:
- `destinasi === undefined` → **Create mode** — form kosong, `POST /admin/destinasi`
- `destinasi !== undefined` → **Edit mode** — form pre-filled, `PATCH /admin/destinasi/{id}`

Form menggunakan `enctype="multipart/form-data"` karena ada file upload.

---

## Wireframe (ASCII)

### Create Mode

```
┌─────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)         │ MAIN CONTENT                              │
│─────────────────────────│───────────────────────────────────────────│
│  [grid]  Dashboard      │ ┌─────────────────────────────────────┐   │
│  [pin]   Kota           │ │ HEADER  bg-white border-b           │   │
│  [train] Stasiun        │ │  Dashboard / Destinasi / Tambah     │   │
│  [compass] Dest.    ←   │ │                      👤 Admin       │   │
│  ──────────────────     │ └─────────────────────────────────────┘   │
│  [logout] Keluar        │                                           │
│                         │  p-6                                      │
│                         │  h1: Tambah Destinasi                    │
│                         │                                           │
│                         │  ┌─────────────────────────────────────┐  │
│                         │  │ bg-white rounded-xl shadow-sm p-8   │  │
│                         │  │                                     │  │
│                         │  │  Stasiun *                          │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ Pilih Stasiun           ▾   │   │  │
│                         │  │  │  ── Yogyakarta ──────────── │   │  │
│                         │  │  │    Stasiun Tugu             │   │  │
│                         │  │  │    Stasiun Lempuyangan      │   │  │
│                         │  │  │  ── Solo ───────────────── │   │  │
│                         │  │  │    Stasiun Balapan          │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  Nama Destinasi *                   │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. Candi Prambanan         │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  Deskripsi *                        │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │                              │   │  │
│                         │  │  │                              │   │  │
│                         │  │  │                              │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │  textarea rows=4                    │  │
│                         │  │                                     │  │
│                         │  │  Alamat *                           │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │ e.g. Jl. Raya Prambanan...  │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  Kategori *                         │  │
│                         │  │  ○ Wisata   ○ Kuliner   ○ UMKM     │  │
│                         │  │  (radio buttons)                    │  │
│                         │  │                                     │  │
│                         │  │  Foto                               │  │
│                         │  │  ┌─────────────────────────────┐   │  │
│                         │  │  │  [↑ Unggah Foto]             │   │  │
│                         │  │  │  JPG, PNG, WEBP maks. 2MB    │   │  │
│                         │  │  └─────────────────────────────┘   │  │
│                         │  │                                     │  │
│                         │  │  [ Batal ]          [ Simpan ]     │  │
│                         │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Edit Mode — perbedaan dari Create

```
  Header: Dashboard / Destinasi / Edit: Candi Prambanan
  h1: Edit Destinasi: Candi Prambanan

  Field pre-filled dengan data existing.

  Foto Section (jika ada foto existing):
  ┌──────────────────────────────────────────────────────────┐
  │  Foto                                                    │
  │                                                          │
  │  Foto saat ini:                                          │
  │  ┌──────────────────┐                                    │
  │  │                  │  foto-prambanan.jpg                │
  │  │   [thumbnail]    │  text-sm text-stone-500            │
  │  │   120x80         │                                    │
  │  └──────────────────┘                                    │
  │                                                          │
  │  Ganti foto (opsional):                                  │
  │  ┌─────────────────────────────┐                         │
  │  │  [↑ Unggah Foto Baru]       │                         │
  │  │  JPG, PNG, WEBP maks. 2MB   │                         │
  │  └─────────────────────────────┘                         │
  └──────────────────────────────────────────────────────────┘

  Checkbox "is_verified" (hanya edit mode):
  ┌──────────────────────────────────────────────────────────┐
  │  Status Verifikasi                                       │
  │  ☑ Tandai sebagai terverifikasi                          │
  └──────────────────────────────────────────────────────────┘
```

### Dropdown Stasiun — Group by Kota

```
  ┌──────────────────────────────────────────────────┐
  │ Pilih Stasiun                               ▾    │
  ├──────────────────────────────────────────────────┤
  │  ── Yogyakarta ─────────────────────────────     │  ← <optgroup>
  │     Stasiun Tugu                                 │  ← <option>
  │     Stasiun Lempuyangan                          │
  │     Stasiun Maguwo                               │
  │  ── Solo ───────────────────────────────────     │
  │     Stasiun Balapan                              │
  │     Stasiun Purwosari                            │
  │  ── Semarang ───────────────────────────────     │
  │     Stasiun Tawang                               │
  └──────────────────────────────────────────────────┘
```

### Kategori Radio Buttons

```
  Kategori *
  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ● Wisata        ○ Kuliner        ○ UMKM          │
  │  [blue dot]      [gray dot]       [gray dot]      │
  │                                                   │
  │  Selected style: ring-2 ring-emerald-500          │
  │  Label: font-medium text-stone-700                │
  └───────────────────────────────────────────────────┘

  Alternatif: styled <select> jika lebih ringkas di mobile
```

### Foto Upload — New File Preview

```
  Setelah user memilih file baru:
  ┌──────────────────────────────────────────────────────────┐
  │  Foto                                                    │
  │                                                          │
  │  Preview:                                                │
  │  ┌──────────────────┐                                    │
  │  │                  │  nama-file.jpg                     │
  │  │  [preview img]   │  text-sm text-stone-500            │
  │  │  from blob URL   │                                    │
  │  └──────────────────┘  [× Hapus pilihan]                 │
  │                         link text-red-500                │
  │                                                          │
  │  ┌─────────────────────────────┐                         │
  │  │  [↑ Ganti File]             │  (re-pick)              │
  │  └─────────────────────────────┘                         │
  └──────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Formulir (pages/Admin/Destinasi/Formulir.tsx)
└── AdminLayout
    ├── Sidebar
    │   └── NavItem [Destinasi] ← active
    ├── Header
    │   ├── Breadcrumb (dynamic)
    │   └── UserBadge
    └── MainContent
        ├── PageTitle (dynamic)
        └── FormCard
            ├── FormField "Stasiun"
            │   ├── Label
            │   ├── SelectInput (grouped by kota via <optgroup>)
            │   └── FieldError (form.errors.stasiun_id)
            ├── FormField "Nama Destinasi"
            │   ├── TextInput
            │   └── FieldError
            ├── FormField "Deskripsi"
            │   ├── Textarea (rows=4)
            │   └── FieldError
            ├── FormField "Alamat"
            │   ├── TextInput
            │   └── FieldError
            ├── FormField "Kategori"
            │   ├── RadioGroup (Wisata|Kuliner|UMKM)
            │   └── FieldError
            ├── FormField "Foto"
            │   ├── [edit mode & foto existing]
            │   │   ├── CurrentFotoThumb (img src=foto URL)
            │   │   └── SubLabel "Ganti foto (opsional)"
            │   ├── FileInput (accept="image/*")
            │   ├── NewFilePreview (blob URL, conditional)
            │   └── FieldError
            ├── [edit mode only]
            │   └── FormField "Status Verifikasi"
            │       └── Checkbox (is_verified)
            └── FormActions
                ├── Link → /admin/destinasi (Batal)
                └── SubmitButton (Simpan)
```

---

## State

```ts
const { destinasi, semuaStasiun } = usePage<Props>().props

const isEditMode = destinasi !== undefined

// Group stasiun by kota for <optgroup>
const stasiunByKota = useMemo(() => {
  return semuaStasiun.reduce<Record<string, Stasiun[]>>((acc, s) => {
    const kotaNama = s.kota.nama
    if (!acc[kotaNama]) acc[kotaNama] = []
    acc[kotaNama].push(s)
    return acc
  }, {})
}, [semuaStasiun])

// File preview
const [previewUrl, setPreviewUrl] = useState<string | null>(null)

// Inertia form (multipart)
const { data, setData, post, patch, processing, errors } = useForm({
  stasiun_id: destinasi?.stasiun_id?.toString() ?? '',
  nama: destinasi?.nama ?? '',
  deskripsi: destinasi?.deskripsi ?? '',
  alamat: destinasi?.alamat ?? '',
  kategori: destinasi?.kategori ?? '' as '' | 'Wisata' | 'Kuliner' | 'UMKM',
  foto: null as File | null,
  is_verified: destinasi?.is_verified ?? false,
})

// File change handler
const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] ?? null
  setData('foto', file)
  if (file) {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  } else {
    setPreviewUrl(null)
  }
}

// Cleanup blob URL on unmount
useEffect(() => {
  return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
}, [previewUrl])

// Submit
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  if (isEditMode) {
    // Inertia PATCH with _method spoofing for multipart
    post(route('admin.destinasi.update', destinasi!.id), {
      forceFormData: true,
      data: { ...data, _method: 'PATCH' },
    })
  } else {
    post(route('admin.destinasi.store'), { forceFormData: true })
  }
}
```

---

## Interactions & Events

| Element | Event | Action |
|---|---|---|
| Dropdown "Stasiun" | change | `setData('stasiun_id', value)` |
| Input "Nama Destinasi" | change | `setData('nama', value)` |
| Textarea "Deskripsi" | change | `setData('deskripsi', value)` |
| Input "Alamat" | change | `setData('alamat', value)` |
| Radio "Kategori" | change | `setData('kategori', value)` |
| File input "Foto" | change | `handleFotoChange()` → setData + generate preview blob URL |
| Link "× Hapus pilihan" | click | `setData('foto', null)`, revoke + clear `previewUrl` |
| Checkbox "is_verified" | change | `setData('is_verified', checked)` (edit mode only) |
| Tombol "Batal" | click | Navigate → `/admin/destinasi` |
| Tombol "Simpan" | click | `handleSubmit()` |
| Tombol "Simpan" (processing) | — | disabled + loading spinner |

### Validasi Server-side

- `stasiun_id` → wajib, exists di tabel stasiun
- `nama` → wajib, string, max 255
- `deskripsi` → wajib, string
- `alamat` → wajib, string
- `kategori` → wajib, in:Wisata,Kuliner,UMKM
- `foto` → opsional (create) / opsional (edit, hanya diproses jika ada file baru), image, max 2048KB
- `is_verified` → boolean, hanya diproses di edit mode

---

## Navigation Flow

```
/admin/destinasi/buat  (Create Mode)
  ├── submit POST /admin/destinasi → redirect → /admin/destinasi  (success)
  ├── submit POST /admin/destinasi → re-render with errors  (fail)
  └── klik Batal → /admin/destinasi

/admin/destinasi/{id}/edit  (Edit Mode)
  ├── submit POST /admin/destinasi/{id} (_method=PATCH, multipart)
  │   → redirect → /admin/destinasi  (success)
  ├── submit → re-render with errors  (fail)
  └── klik Batal → /admin/destinasi
```

### Method Spoofing Note

Laravel tidak mendukung `PATCH` multipart/form-data secara langsung.
Gunakan `POST` dengan field tersembunyi `_method=PATCH` (Laravel method spoofing).
Inertia handle ini otomatis via `forceFormData: true` dan menyertakan `_method`.
