# Rute / Peta Jalur — Design Flow

## Route & Props

```
Route  : GET /rute
Handler: RuteController@tampilkan
```

```ts
type Props = {
  semuaKota: (Kota & {
    stasiun: (Stasiun & {
      destinasi_count: number
    })[]
  })[]
  auth: { user: User | null }
}
```

Contoh data (urutan kota untuk visualisasi jalur):
```ts
semuaKota = [
  { id: 1, nama: 'Jakarta',    kode_ibukota: 'JKT', stasiun: [
    { id: 1, nama: 'Gambir',         kode_stasiun: 'GMR', lat: -6.176, lng: 106.830, destinasi_count: 12 },
    { id: 2, nama: 'Pasar Senen',    kode_stasiun: 'PSE', lat: -6.166, lng: 106.846, destinasi_count: 7  },
  ]},
  { id: 2, nama: 'Bandung',    kode_ibukota: 'BDG', stasiun: [
    { id: 3, nama: 'Bandung',        kode_stasiun: 'BD',  lat: -6.913, lng: 107.639, destinasi_count: 18 },
    { id: 4, nama: 'Kiaracondong',   kode_stasiun: 'KAC', lat: -6.926, lng: 107.661, destinasi_count: 5  },
  ]},
  { id: 3, nama: 'Yogyakarta', kode_ibukota: 'YOG', stasiun: [
    { id: 5, nama: 'Tugu',           kode_stasiun: 'YK',  lat: -7.789, lng: 110.367, destinasi_count: 22 },
    { id: 6, nama: 'Lempuyangan',    kode_stasiun: 'LPN', lat: -7.795, lng: 110.377, destinasi_count: 9  },
  ]},
  { id: 4, nama: 'Surabaya',   kode_ibukota: 'SBY', stasiun: [
    { id: 7, nama: 'Gubeng',         kode_stasiun: 'SGU', lat: -7.265, lng: 112.751, destinasi_count: 15 },
    { id: 8, nama: 'Pasar Turi',     kode_stasiun: 'SBI', lat: -7.246, lng: 112.731, destinasi_count: 8  },
  ]},
]
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

### 2. Header Section — bg-stone-50 border-b

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Peta Jalur Kereta JejakJalur                                      │
│   text-3xl font-bold text-stone-800                                 │
│                                                                     │
│   Visualisasi jalur kereta dari Jakarta hingga Surabaya.            │
│   Klik stasiun untuk menjelajahi destinasi terdekat.                │
│   text-stone-500 mt-1                                               │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  🔍  Cari stasiun...                                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   max-w-sm                                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  py-10, max-w-6xl mx-auto px-4
```

---

### 3. SVG Subway Map — FITUR UTAMA

```
┌─────────────────────────────────────────────────────────────────────┐
│  overflow-x-auto (mobile scroll horizontal)                         │
│  bg-white rounded-2xl border border-stone-100 shadow-sm             │
│  p-8                                                                │
│                                                                     │
│  SVG: viewBox="0 0 1100 320"  (atau dinamis berdasarkan data)       │
│       min-width: 800px  (untuk scroll horizontal di mobile)         │
│                                                                     │
│  ─────────────────  SVG CONTENT  ──────────────────────────────── │
│                                                                     │
│   JAKARTA          BANDUNG        YOGYAKARTA       SURABAYA         │
│   label kota: font-semibold, text-stone-700, 14px                  │
│   y-position: 40px dari atas                                        │
│                                                                     │
│   ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  JALUR UTAMA  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄   │
│                                                                     │
│   ──────●────────●──────────────●─────●──────────────●──────●──── │
│   (GMR) ↑        ↑ (PSE)   (BD) ↑     ↑ (KAC)   (YK) ↑     ↑(LPN)│
│                                                                     │
│   ────────────────────────────────────────────────────────────●──● │
│                                                           (SGU)↑  ↑(SBI)
│                                                                     │
│   Jalur: <line> stroke="#059669" (emerald-600)                      │
│          stroke-width="4" stroke-linecap="round"                   │
│          y: 160 (vertical center)                                   │
│          x: dari kiri stasiun pertama ke kanan stasiun terakhir     │
│                                                                     │
│   Stasiun (default):                                                │
│     <circle> r="10" fill="white" stroke="#059669" stroke-width="3" │
│              cx={xPos} cy={160}                                     │
│                                                                     │
│   Stasiun (hover):                                                  │
│     <circle> r="12" fill="#059669" stroke="#059669"                 │
│              cursor="pointer" transition (via CSS/animate)          │
│                                                                     │
│   Stasiun (selected/highlighted):                                   │
│     <circle> r="14" fill="#065f46" stroke="#065f46"                 │
│              (emerald-800 — hasil search/klik)                      │
│                                                                     │
│   Label stasiun (bawah circle, y+25):                               │
│     <text> font-size="11" fill="#57534e" text-anchor="middle"       │
│     Kode stasiun: font-size="9" fill="#a8a29e" dy="+14"             │
│                                                                     │
│   Jumlah destinasi (atas circle, y-20):                             │
│     <text> font-size="10" fill="#059669" text-anchor="middle"       │
│     "{destinasi_count} dest."                                       │
│     Atau: badge lingkaran kecil di atas circle                      │
│     <circle r="10" fill="#d1fae5"> <text>12</text>                  │
│                                                                     │
│   Label kota (di atas area stasiun kota, y=40):                     │
│     <text> font-size="14" font-weight="600" fill="#292524"          │
│     posisi: x = rata-rata x stasiun dalam kota itu                  │
│                                                                     │
│   Garis pemisah kota (opsional, vertical dashed):                   │
│     <line> x1={x} y1={70} x2={x} y2={250}                          │
│     stroke="#e7e5e4" stroke-dasharray="4 4"                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  Posisi X stasiun (contoh dengan 8 stasiun):
    Total width: 1100px  padding: 80px kiri/kanan
    Usable: 940px  interval antar stasiun: ~134px

    GMR  : x = 80
    PSE  : x = 214
    BD   : x = 348
    KAC  : x = 482
    YK   : x = 616
    LPN  : x = 750
    SGU  : x = 884
    SBI  : x = 1020

  Posisi Y:
    Kota label  : y = 40
    Destinasi ct: y = 130  (atau badge di atas circle)
    Jalur       : y = 160
    Stasiun nama: y = 185  (25px di bawah circle center)
    Kode stasiun: y = 199
```

---

### 4. Tooltip Stasiun (hover)

```
  Tooltip muncul saat mouse enter stasiun circle:
  Posisi: absolute, di atas stasiun (atau di bawah jika dekat top)

  ┌─────────────────────┐
  │  Stasiun Gambir     │  ← nama stasiun, font-semibold
  │  Jakarta            │  ← nama kota, text-stone-500 text-xs
  │  12 destinasi  →    │  ← klik untuk jelajahi
  └─────────────────────┘

  Style:
    bg-white rounded-xl shadow-lg border border-stone-100
    px-4 py-3 text-sm
    z-50 pointer-events-none (untuk hover)
    min-w-[160px]

  Implementasi: div absolute dengan position dinamis berdasarkan
    circle cx/cy + SVG offset dari parent container
    Atau: foreignObject di dalam SVG
```

---

### 5. Legend

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Keterangan:                                                        │
│                                                                     │
│  ●── Jalur Kereta Utama     ○  Stasiun      ◉  Stasiun Terpilih    │
│  emerald-600 line           outline          filled emerald         │
│                                                                     │
│  [badge hijau] Jumlah destinasi tersedia                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

  mt-4, flex flex-wrap gap-6 items-center text-sm text-stone-600
```

---

### 6. Search Result Highlight

```
  Saat user mengetik di search dan ada hasil:

  ┌─────────────────────────────────────────────────────────────────┐
  │  Hasil pencarian: "gambir"                                      │
  │                                                                 │
  │  ● Stasiun Gambir (GMR)   —   Jakarta   —   12 destinasi        │
  │    [Lihat di Peta] [Jelajahi Destinasi →]                       │
  │                                                                 │
  │  ● Sta. Pasar Senen (PSE)  —  Jakarta   —   7 destinasi         │
  │    [Lihat di Peta] [Jelajahi Destinasi →]                       │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘

  bg-white rounded-xl border border-stone-100 shadow-lg
  mt-2 absolute z-50 max-h-60 overflow-y-auto
  (dropdown di bawah search input)

  Klik "Lihat di Peta":
    → setSelectedStation(id)
    → scroll SVG ke posisi stasiun (atau highlight)
    → tutup dropdown

  Klik "Jelajahi Destinasi":
    → router.visit('/destinasi?stasiun_id=' + id)

  Empty state (tidak ada hasil):
    "Stasiun tidak ditemukan"
    text-stone-400 text-sm p-4 text-center
```

---

### 7. Mobile Layout — scroll horizontal

```
Mobile view (<768px):

┌─────────────────────────────────────────────────┐
│  [🌿 JejakJalur]  ≡                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  Peta Jalur Kereta JejakJalur                   │
│  text-2xl                                       │
│                                                 │
│  🔍 Cari stasiun...  [full width]               │
│                                                 │
├─────────────────────────────────────────────────┤
│  ← Geser untuk melihat peta →                   │
│  text-xs text-stone-400 text-center mb-2        │
│                                                 │
│  ┌──────────────────────────────────────────────│──────────────────┐
│  │                                              │                  │
│  │  JAKARTA   BANDUNG   YOGYAKARTA   SURABAYA   │                  │
│  │                                              │                  │
│  │  ──●──●──────●──●──────●──●──────●──●──      │                  │
│  │                                              │                  │
│  └──────────────────────────────────────────────│──────────────────┘
│    (overflow-x-auto, min-width: 800px)          │
│                                                 │
│  [Legend...]                                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 8. Footer

```
┌─────────────────────────────────────────────────────────────────────┐
│  🌿 JejakJalur  —  © 2025 JejakJalur. Dibuat untuk traveler.       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Rute/Tampilkan.tsx (page)
└── PublicLayout
    ├── Navbar
    │
    ├── HeaderSection
    │   ├── PageTitle + Subtitle
    │   └── StasiunSearchInput
    │       ├── <input> debounce 300ms → setSearchQuery(val)
    │       └── SearchDropdown (conditional, searchResults.length > 0)
    │           └── SearchResultItem × n
    │               ├── StasiunInfo (nama, kode, kota)
    │               ├── DestCount
    │               ├── LihatDiPetaButton
    │               └── JelajahiButton → /destinasi?stasiun_id=
    │
    ├── SubwayMapContainer  (overflow-x-auto)
    │   ├── MobileHint "← Geser →"  (sm:hidden)
    │   └── SVGSubwayMap
    │       ├── <defs>  (gradient, filter shadow opsional)
    │       │
    │       ├── KotaLabel × n  (<text> per kota)
    │       │
    │       ├── JalurLine  (<line> atau <path> horizontal)
    │       │
    │       ├── GarisPemisahKota × n  (<line> vertical dashed)
    │       │
    │       └── StasiunNode × n  (per stasiun)
    │           ├── DestinasiBadge  (<circle> + <text> count)
    │           ├── StasiunCircle  (<circle> interactive)
    │           │   onMouseEnter → setHoveredStation(id)
    │           │   onMouseLeave → setHoveredStation(null)
    │           │   onClick      → handleStasiunClick(id)
    │           ├── NamaLabel    (<text> bawah circle)
    │           └── KodeLabel    (<text> bawah nama)
    │
    ├── TooltipOverlay  (absolute, conditional: hoveredStation !== null)
    │   ├── NamaStasiun
    │   ├── NamaKota
    │   └── DestCountLink
    │
    ├── Legend
    │   ├── JalurLegendItem
    │   ├── StasiunLegendItem
    │   └── SelectedLegendItem
    │
    └── Footer
```

---

## State

```ts
// Station hover (untuk tooltip)
const [hoveredStation,  setHoveredStation]  = useState<number | null>(null)
const [tooltipPos,      setTooltipPos]      = useState<{ x: number; y: number }>({ x: 0, y: 0 })

// Station selection (highlight setelah klik atau search)
const [selectedStation, setSelectedStation] = useState<number | null>(null)

// Search
const [searchQuery,   setSearchQuery]   = useState<string>('')
const [searchResults, setSearchResults] = useState<Stasiun[]>([])
const [isSearching,   setIsSearching]   = useState<boolean>(false)
const [showDropdown,  setShowDropdown]  = useState<boolean>(false)

// Debounce ref
const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

// SVG container ref (untuk menghitung posisi tooltip absolut)
const svgContainerRef = useRef<HTMLDivElement>(null)

// Derived: flatten semua stasiun dari semuaKota
const allStasiun = useMemo(
  () => semuaKota.flatMap(k => k.stasiun.map(s => ({ ...s, kota: k }))),
  [semuaKota]
)

// Derived: posisi X setiap stasiun di SVG
const stasiunPositions = useMemo(() => {
  const total = allStasiun.length
  const padX  = 80
  const width = 1100 - padX * 2
  return allStasiun.reduce((acc, s, i) => {
    acc[s.id] = padX + (i / (total - 1)) * width
    return acc
  }, {} as Record<number, number>)
}, [allStasiun])
```

---

## Interactions & Events

### Hover Stasiun (SVG)

```
onMouseEnter circle ke-id:
  → setHoveredStation(id)
  → hitung posisi tooltip dari cx, cy + SVG container offset
  → setTooltipPos({ x: cx + containerLeft, y: cy + containerTop - 80 })

onMouseLeave circle:
  → setHoveredStation(null)
```

### Klik Stasiun (SVG)

```
onClick circle ke-id:
  → setSelectedStation(id)
  → tutup tooltip
  → tampilkan brief selected state di circle (filled emerald)
  → opsional: smooth scroll ke stasiun dalam SVG (scroll container)
  → router.visit('/destinasi?stasiun_id=' + id)
     ATAU: tampilkan modal preview dulu (opsional enhancement)
```

### Search Stasiun (debounce 300ms)

```
User mengetik di search input:
  → setSearchQuery(val)
  → clearTimeout(searchTimeout)
  → if (val.length < 2): setSearchResults([]), setShowDropdown(false), return
  → searchTimeout = setTimeout(() => {
      setIsSearching(true)
      // Client-side filter dari allStasiun (tidak perlu API call)
      const results = allStasiun.filter(s =>
        s.nama.toLowerCase().includes(val.toLowerCase()) ||
        s.kode_stasiun.toLowerCase().includes(val.toLowerCase()) ||
        s.kota.nama.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8)
      setSearchResults(results)
      setShowDropdown(results.length > 0 || val.length >= 2)
      setIsSearching(false)
    }, 300)
```

Catatan: karena `semuaKota` sudah di-pass sebagai props, pencarian dapat
dilakukan **client-side** tanpa API call ke `/rute/cari-stasiun`.

### Klik "Lihat di Peta" (dari search dropdown)

```
→ setSelectedStation(stasiun.id)
→ setShowDropdown(false)
→ setSearchQuery(stasiun.nama)
→ scroll SVG container agar stasiun terlihat:
    const targetX = stasiunPositions[stasiun.id]
    svgContainerRef.current?.scrollTo({ left: targetX - 200, behavior: 'smooth' })
```

### Klik "Jelajahi Destinasi" (dari search dropdown / tooltip)

```
→ router.visit('/destinasi?stasiun_id=' + id)
```

### Klik di luar dropdown

```
useEffect:
  document.addEventListener('click', handleOutsideClick)
  → jika click target bukan input/dropdown: setShowDropdown(false)
```

---

## SVG Layout Calculation

```
Konstanta:
  SVG_WIDTH      = 1100   (px, viewBox width)
  SVG_HEIGHT     = 320    (px, viewBox height)
  PAD_X          = 80     (px, padding kiri/kanan)
  LINE_Y         = 160    (px, y jalur utama)
  KOTA_LABEL_Y   = 40     (px)
  DEST_BADGE_Y   = LINE_Y - 35  = 125  (px, atas circle)
  CIRCLE_R       = 10     (px, radius default)
  NAMA_LABEL_Y   = LINE_Y + 28  = 188  (px)
  KODE_LABEL_Y   = LINE_Y + 42  = 202  (px)

Kalkulasi X stasiun:
  const usableWidth  = SVG_WIDTH - PAD_X * 2       // 940px
  const stasiunCount = allStasiun.length            // mis. 8
  const spacing      = usableWidth / (stasiunCount - 1)  // 134.28px
  const xPos = (idx: number) => PAD_X + idx * spacing

Kalkulasi X label kota:
  // x = rata-rata x dari semua stasiun dalam kota itu
  const kotaLabelX = (kota: Kota) => {
    const kotaStasiun = kota.stasiun
    const xs = kotaStasiun.map(s => xPos(allStasiun.findIndex(a => a.id === s.id)))
    return xs.reduce((a, b) => a + b, 0) / xs.length
  }
```

---

## Navigation Flow

```
/rute  (Rute / Subway Map)
│
├── hover stasiun ───────────────→  tooltip muncul (UI only, no nav)
│
├── klik stasiun ────────────────→  setSelectedStation + router.visit:
│                                   /destinasi?stasiun_id={id}
│
├── search → "Lihat di Peta" ────→  highlight stasiun (UI only, no nav)
│
├── search → "Jelajahi" ─────────→  /destinasi?stasiun_id={id}
│
├── Navbar "Jelajahi" ───────────→  /destinasi
│
└── Navbar logo ─────────────────→  /
```
