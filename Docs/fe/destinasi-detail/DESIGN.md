# Destinasi Detail — Design Flow

## Route & Props

```
Route  : GET /destinasi/{id}
Handler: DestinasiController@show
```

```ts
type Props = {
  destinasi: Destinasi & {
    stasiun: Stasiun & {
      kota: Kota
    }
    ulasan: (Ulasan & {
      user: {
        id    : number
        name  : string
        avatar: string | null
      }
    })[]
  }
  auth: { user: User | null }
}
```

---

## Wireframe (ASCII)

### 1. Navbar

```
┌─────────────────────────────────────────────────────────────────────┐
│  [🌿 JejakJalur]            Jelajahi    Rute      [Masuk] [Daftar]  │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2. Breadcrumb — bg-stone-50 border-b border-stone-100

```
┌─────────────────────────────────────────────────────────────────────┐
│  Beranda  /  Destinasi  /  Nama Destinasi Yang Panjang...           │
│                                                                     │
│  text-sm text-stone-500                                             │
│  "Beranda" → link /                                                 │
│  "Destinasi" → link /destinasi                                      │
│  "{nama}" → text-stone-700 font-medium (tidak link, current page)   │
└─────────────────────────────────────────────────────────────────────┘

  py-3, max-w-6xl mx-auto px-4
  Separator: " / " text-stone-300
```

---

### 3. Hero Destinasi — bg-white

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │                                                               │  │
│  │                   FOTO DESTINASI                              │  │
│  │                   w-full h-72 md:h-96                         │  │
│  │                   object-cover rounded-2xl                    │  │
│  │                                                               │  │
│  │     Jika tidak ada foto:                                      │  │
│  │     bg-gradient-to-br from-stone-100 to-stone-200             │  │
│  │     flex items-center justify-center                          │  │
│  │     text-8xl (emoji sesuai kategori)                          │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  [Wisata]  [✓ Terverifikasi]                                        │
│  mt-6 flex gap-2 items-center                                       │
│                                                                     │
│  Nama Destinasi Yang Lengkap                                        │
│  text-3xl md:text-4xl font-bold text-stone-800 mt-3                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  max-w-6xl mx-auto px-4 py-8
  Badge kategori: rounded-full bg-emerald-100 text-emerald-700
                  font-medium px-3 py-1
  Badge verified: rounded-full bg-emerald-700 text-white px-3 py-1
                  text-sm "✓ Terverifikasi"
```

---

### 4. Info Card + Deskripsi — layout 2 kolom (lg), 1 kolom (mobile)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌───────────────────────────┐  ┌─────────────────────────────────┐ │
│  │  INFO CARD                │  │  DESKRIPSI                      │ │
│  │  rounded-xl border        │  │                                 │ │
│  │  border-stone-100         │  │  Tentang Destinasi Ini          │ │
│  │  shadow-sm p-6            │  │  text-lg font-semibold          │ │
│  │                           │  │  text-stone-800 mb-3            │ │
│  │  ★★★★☆  4.2               │  │                                 │ │
│  │  text-2xl font-bold       │  │  Lorem ipsum dolor sit amet,    │ │
│  │  text-amber-500           │  │  consectetur adipiscing elit.   │ │
│  │  + "(12 ulasan)"          │  │  Sed ut perspiciatis unde omnis │ │
│  │  text-sm text-stone-500   │  │  iste natus error sit voluptatem│ │
│  │                           │  │  accusantium doloremque lauda   │ │
│  │  ────────────────────     │  │  ntium...                       │ │
│  │                           │  │                                 │ │
│  │  📍 Alamat                │  │  text-stone-600 leading-relaxed │ │
│  │  text-stone-700 text-sm   │  │  whitespace-pre-line            │ │
│  │  Jl. Contoh No. 1,        │  │                                 │ │
│  │  Jakarta Pusat            │  │                                 │ │
│  │                           │  │                                 │ │
│  │  ────────────────────     │  │                                 │ │
│  │                           │  │                                 │ │
│  │  🚉 Stasiun               │  │                                 │ │
│  │  text-stone-700 text-sm   │  │                                 │ │
│  │  Stasiun Gambir            │  │                                 │ │
│  │  link → /destinasi?       │  │                                 │ │
│  │         stasiun_id=       │  │                                 │ │
│  │                           │  │                                 │ │
│  │  ────────────────────     │  │                                 │ │
│  │                           │  │                                 │ │
│  │  🏙️ Kota                   │  │                                 │ │
│  │  Jakarta                  │  │                                 │ │
│  │  link → /destinasi?       │  │                                 │ │
│  │         kota_id=          │  │                                 │ │
│  │                           │  │                                 │ │
│  └───────────────────────────┘  └─────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Layout: grid grid-cols-1 lg:grid-cols-3 gap-8 py-8
  Info card: lg:col-span-1  (sticky lg:sticky lg:top-20 opsional)
  Deskripsi: lg:col-span-2

  Info card icons: lucide-react atau heroicons (ukuran 16px)
  Row separator: border-t border-stone-100 pt-4 mt-4
```

---

### 5. Section Ulasan

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Ulasan Pengunjung                                                  │
│  text-2xl font-bold text-stone-800                                  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  RATING SUMMARY CARD                                        │   │
│  │  bg-stone-50 rounded-xl p-6                                 │   │
│  │                                                             │   │
│  │     ┌──────────────┐   ┌─────────────────────────────────┐ │   │
│  │     │   4.2        │   │ ★★★★★  ██████████████████  12  │ │   │
│  │     │  text-5xl    │   │ ★★★★☆  ████████████         8  │ │   │
│  │     │  font-bold   │   │ ★★★☆☆  ██████               4  │ │   │
│  │     │  amber-500   │   │ ★★☆☆☆  ██                   2  │ │   │
│  │     │              │   │ ★☆☆☆☆  █                    1  │ │   │
│  │     │ ★★★★☆        │   └─────────────────────────────────┘ │   │
│  │     │ amber-400    │                                        │   │
│  │     │              │   Bar: bg-amber-400 rounded-full h-2   │   │
│  │     │ 27 ulasan    │   Width: (count/total) * 100 + '%'     │   │
│  │     │ text-sm      │                                        │   │
│  │     │ stone-500    │                                        │   │
│  │     └──────────────┘                                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ─────────────────  FORM TULIS ULASAN  ─────────────────────────── │
│  (hanya muncul jika auth.user !== null)                             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Tulis Ulasanmu                                             │   │
│  │  text-lg font-semibold text-stone-800 mb-4                  │   │
│  │                                                             │   │
│  │  Penilaianmu:                                               │   │
│  │  ☆ ☆ ☆ ☆ ☆    ← interactive star rating                    │   │
│  │  ★ ★ ★ ☆ ☆    ← setelah hover/click                        │   │
│  │  text-3xl cursor-pointer                                    │   │
│  │  amber-400 (filled), stone-300 (empty)                      │   │
│  │  hover: highlight hingga bintang yang di-hover              │   │
│  │                                                             │   │
│  │  Judul (opsional):                                          │   │
│  │  ┌───────────────────────────────────────────────────────┐  │   │
│  │  │ Masukkan judul ulasan...                              │  │   │
│  │  └───────────────────────────────────────────────────────┘  │   │
│  │                                                             │   │
│  │  Cerita pengalamanmu:                                       │   │
│  │  ┌───────────────────────────────────────────────────────┐  │   │
│  │  │                                                       │  │   │
│  │  │  Bagikan pengalaman dan pendapatmu tentang tempat     │  │   │
│  │  │  ini...                                               │  │   │
│  │  │                                                       │  │   │
│  │  └───────────────────────────────────────────────────────┘  │   │
│  │  rows=4, resize-none                                        │   │
│  │                                                             │   │
│  │  error: "Penilaian wajib diisi" (jika submit tanpa rating)  │   │
│  │  text-red-500 text-sm mt-1                                  │   │
│  │                                                             │   │
│  │                    [ Kirim Ulasan ]                         │   │
│  │                    bg-emerald-700 text-white                │   │
│  │                    px-6 py-2 rounded-lg                     │   │
│  │                    hover:bg-emerald-800                     │   │
│  │                    disabled saat loading                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ─────────────────  [guest banner]  ────────────────────────────── │
│  (muncul jika auth.user === null)                                   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  💬  Masuk untuk menulis ulasan                             │   │
│  │  [ Masuk ]   [ Daftar ]                                     │   │
│  │  bg-emerald-50 rounded-xl p-6 text-center                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ─────────────────  LIST ULASAN  ──────────────────────────────── │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ┌──────┐  John Doe                    ★★★★☆               │   │
│  │  │ J    │  text-stone-800 font-medium                       │   │
│  │  │avatar│  12 Maret 2025                                    │   │
│  │  └──────┘  text-xs text-stone-400                           │   │
│  │                                                             │   │
│  │  "Tempat yang sangat nyaman!"                               │   │
│  │  text-stone-700 font-medium mb-1                            │   │
│  │                                                             │   │
│  │  Saya sangat menikmati waktu di sini. Tempatnya             │   │
│  │  bersih, pelayanan ramah, dan makanannya enak...            │   │
│  │  text-stone-600 text-sm leading-relaxed                     │   │
│  │                                                             │   │
│  │                          [ Edit ] [ Hapus ]                 │   │
│  │  (hanya muncul jika ulasan.user_id === auth.user.id)        │   │
│  │  Edit: text-emerald-600 hover:underline text-sm             │   │
│  │  Hapus: text-red-500 hover:underline text-sm                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ... ulasan selanjutnya ...                                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ─────────── Empty state (jika ulasan.length === 0) ─────────────  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              💬                                             │   │
│  │  Belum ada ulasan. Jadilah yang pertama!                    │   │
│  │  text-stone-500 text-center py-10                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Section: py-12 border-t border-stone-100
  Avatar: w-10 h-10 rounded-full bg-emerald-100 text-emerald-700
          flex items-center justify-center font-semibold text-sm
          (atau <img> jika ada avatar URL)
  Ulasan card: border-b border-stone-100 pb-6 mb-6 last:border-0

  Edit mode inline:
    Konten ulasan berubah jadi textarea yang bisa diedit
    Rating bintang kembali interactive
    Tombol: "Simpan Perubahan" + "Batal"

  Delete confirmation:
    Dialog kecil / konfirmasi inline:
    "Hapus ulasan ini? [Ya, Hapus] [Batal]"
    text-sm di bawah konten ulasan
```

---

## Component Tree

```
Destinasi/Detail.tsx (page)
└── PublicLayout
    ├── Navbar
    │
    ├── Breadcrumb
    │   ├── Link "Beranda" → /
    │   ├── Separator "/"
    │   ├── Link "Destinasi" → /destinasi
    │   ├── Separator "/"
    │   └── Text "{destinasi.nama}"
    │
    ├── HeroDestinasi
    │   ├── FotoOrPlaceholder
    │   ├── BadgeKategori
    │   ├── BadgeVerified?
    │   └── NamaDestinasi
    │
    ├── ContentGrid  (lg:grid-cols-3)
    │   ├── InfoCard  (lg:col-span-1)
    │   │   ├── RatingSummaryLine
    │   │   ├── AlamatRow
    │   │   ├── StasiunRow  (link)
    │   │   └── KotaRow     (link)
    │   └── DescriptionPanel  (lg:col-span-2)
    │       └── Text destinasi.deskripsi
    │
    ├── UlasanSection
    │   ├── SectionTitle "Ulasan Pengunjung"
    │   │
    │   ├── RatingSummaryCard
    │   │   ├── AverageRatingDisplay
    │   │   └── RatingDistributionBars × 5
    │   │
    │   ├── [auth.user !== null]
    │   │   └── FormUlasan
    │   │       ├── InteractiveStarRating
    │   │       │   └── <button> × 5 onClick → setFormRating(n)
    │   │       ├── InputJudul
    │   │       ├── TextareaKonten
    │   │       ├── ValidationError?
    │   │       └── SubmitButton
    │   │
    │   ├── [auth.user === null]
    │   │   └── GuestBanner
    │   │       ├── Link "Masuk" → /login
    │   │       └── Link "Daftar" → /register
    │   │
    │   └── UlasanList
    │       ├── UlasanItem × n  (destinasi.ulasan)
    │       │   ├── UserAvatar
    │       │   ├── UserName + Tanggal
    │       │   ├── StarDisplay (read-only)
    │       │   ├── [editMode === false]
    │       │   │   ├── JudulUlasan
    │       │   │   ├── KontenUlasan
    │       │   │   └── [isOwner]
    │       │   │       ├── EditButton → setEditMode(id)
    │       │   │       └── DeleteButton → setDeleteConfirm(id)
    │       │   ├── [editMode === id]
    │       │   │   ├── InteractiveStarRating (prefilled)
    │       │   │   ├── EditInputJudul
    │       │   │   ├── EditTextareaKonten
    │       │   │   ├── SimpanButton
    │       │   │   └── BatalButton
    │       │   └── [deleteConfirm === id]
    │       │       ├── "Hapus ulasan ini?"
    │       │       ├── YaHapusButton
    │       │       └── BatalButton
    │       └── EmptyUlasanState  (jika ulasan.length === 0)
    │
    └── Footer
```

---

## State

```ts
// Form tambah ulasan baru
const [formRating,  setFormRating]  = useState<number>(0)
const [formJudul,   setFormJudul]   = useState<string>('')
const [formKonten,  setFormKonten]  = useState<string>('')
const [formErrors,  setFormErrors]  = useState<Record<string, string>>({})
const [isSubmitting, setIsSubmitting] = useState(false)

// Hover state untuk interactive star rating (form baru)
const [hoverRating, setHoverRating] = useState<number>(0)

// Edit mode: id ulasan yang sedang di-edit, atau null
const [editMode,     setEditMode]     = useState<number | null>(null)
const [editRating,   setEditRating]   = useState<number>(0)
const [editJudul,    setEditJudul]    = useState<string>('')
const [editKonten,   setEditKonten]   = useState<string>('')
const [editHover,    setEditHover]    = useState<number>(0)

// Delete confirmation: id ulasan yang akan dihapus, atau null
const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
const [isDeleting,    setIsDeleting]    = useState(false)
```

---

## Interactions & Events

### Interactive Star Rating

```
Mouse enter bintang ke-N:
  → setHoverRating(N)   ← semua bintang 1..N tampil filled (amber)

Mouse leave area rating:
  → setHoverRating(0)   ← kembali ke formRating

Klik bintang ke-N:
  → setFormRating(N)
  → setHoverRating(0)

Render bintang ke-i:
  const isFilled = i <= (hoverRating || formRating)
  → filled: text-amber-400  empty: text-stone-300
```

### Submit Ulasan Baru

```
User klik "Kirim Ulasan":
  1. Validasi: formRating > 0 (wajib), formKonten.trim() !== '' (wajib)
  2. Jika error → set formErrors, return
  3. setIsSubmitting(true)
  4. router.post('/ulasan', {
       destinasi_id: destinasi.id,
       rating      : formRating,
       judul       : formJudul,
       konten      : formKonten,
     }, {
       onSuccess : () => { reset form, Inertia reload props },
       onError   : (err) => setFormErrors(err),
       onFinish  : () => setIsSubmitting(false),
     })
```

### Edit Ulasan (inline)

```
User klik "Edit":
  → setEditMode(ulasan.id)
  → setEditRating(ulasan.rating)
  → setEditJudul(ulasan.judul ?? '')
  → setEditKonten(ulasan.konten)

User klik "Simpan Perubahan":
  → router.put('/ulasan/' + ulasan.id, {
      rating: editRating, judul: editJudul, konten: editKonten
    }, {
      onSuccess: () => setEditMode(null),
    })

User klik "Batal":
  → setEditMode(null)
```

### Hapus Ulasan

```
User klik "Hapus":
  → setDeleteConfirm(ulasan.id)   ← tampilkan konfirmasi inline

User klik "Ya, Hapus":
  → setIsDeleting(true)
  → router.delete('/ulasan/' + ulasan.id, {
      onSuccess: () => setDeleteConfirm(null),
      onFinish : () => setIsDeleting(false),
    })

User klik "Batal":
  → setDeleteConfirm(null)
```

---

## Navigation Flow

```
/destinasi/{id}  (Destinasi Detail)
│
├── Breadcrumb "Beranda" ────────→  /
│
├── Breadcrumb "Destinasi" ──────→  /destinasi
│
├── Info card "Stasiun" link ────→  /destinasi?stasiun_id={id}
│
├── Info card "Kota" link ───────→  /destinasi?kota_id={id}
│
├── [guest] Tombol "Masuk" ──────→  /login
│
├── [guest] Tombol "Daftar" ─────→  /register
│
├── Submit ulasan baru ──────────→  POST /ulasan  (Inertia, reload props)
│
├── Edit ulasan ─────────────────→  PUT  /ulasan/{id}  (Inertia, reload props)
│
└── Hapus ulasan ────────────────→  DELETE /ulasan/{id}  (Inertia, reload props)
```
