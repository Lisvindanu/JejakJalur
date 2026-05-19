# JejakJalur — Stitch AI Design Prompt
## Halaman Utama (Welcome / Beranda)

---

## KONTEKS APLIKASI

**Nama Aplikasi:** JejakJalur  
**Tagline:** Temukan Destinasi Terbaik di Sepanjang Jalur Kereta  
**Deskripsi:** Platform direktori wisata dan kuliner yang bisa dijangkau dari stasiun kereta api. Pengguna bisa jelajahi destinasi berdasarkan kota, stasiun, atau kategori.  
**Tone:** Modern, clean, ramah, dan natural — seperti travel app lokal yang terpercaya.

---

## DESIGN SYSTEM

### Warna

| Peran            | Warna          | Hex       |
|------------------|----------------|-----------|
| Primary          | Emerald 700    | `#047857` |
| Primary Dark     | Emerald 800    | `#065f46` |
| Primary Light    | Emerald 100    | `#d1fae5` |
| Background       | Stone 50       | `#fafaf9` |
| Surface (Card)   | White          | `#ffffff` |
| Text Utama       | Stone 800      | `#292524` |
| Text Sekunder    | Stone 500      | `#78716c` |
| Text Muted       | Stone 400      | `#a8a29e` |
| Border           | Stone 200      | `#e7e5e4` |
| Rating / Bintang | Amber 500      | `#f59e0b` |
| Danger           | Red 600        | `#dc2626` |

### Tipografi

- **Font:** Instrument Sans (Google Fonts)
- **Heading besar:** 48px, weight 700, color Stone 800, line-height 1.2
- **Heading sedang:** 28px, weight 700, color Stone 800
- **Heading kecil:** 20px, weight 600, color Stone 700
- **Body:** 16px, weight 400, color Stone 700
- **Small:** 14px, weight 400, color Stone 500
- **Tiny / label:** 12px, weight 500, color Stone 400

### Border Radius

- **Tombol, input, card kecil:** 8px
- **Card besar, modal:** 12px
- **Pill / badge / avatar:** 9999px (full rounded)

### Shadow

- **Card default:** `0 1px 3px rgba(0,0,0,0.07)`
- **Card hover:** `0 4px 12px rgba(0,0,0,0.10)`
- **Dropdown / modal:** `0 10px 40px rgba(0,0,0,0.12)`

### Icon Style

Gunakan **flat line icons** (Heroicons outline style). Tidak menggunakan emoji sama sekali.  
Ukuran icon default: 20x20px. Warna icon mengikuti warna teks konteksnya.

---

## LAYOUT HALAMAN

Halaman terdiri dari 5 bagian vertikal berurutan:

```
1. NAVBAR          sticky, selalu terlihat saat scroll
2. HERO SECTION    full-width, background gradient emerald
3. KOTA PILLS      background Stone 50
4. FEATURED CARDS  background White
5. FOOTER          background Stone 800
```

Max-width konten: **1152px**, horizontally centered, horizontal padding kiri-kanan: 24px.

---

## BAGIAN 1 — NAVBAR

**Posisi:** Sticky top  
**Background:** White 90% opacity + backdrop blur  
**Border bawah:** 1px solid Stone 200  
**Tinggi:** 60px  

### Layout (kiri ke kanan):

**Kiri — LOGO:**
- Icon: flat train/railway line icon, warna Emerald 700, 22px
- Teks: "JejakJalur", weight 700, 18px, Emerald 700
- Jarak icon ke teks: 8px

**Tengah-kanan — NAV LINKS:**
- "Jelajahi" — 14px, Stone 600, hover Emerald 700
- "Rute" — 14px, Stone 600, hover Emerald 700
- Gap antar link: 32px

**Paling kanan — AUTH BUTTONS (kondisi belum login):**
- Tombol "Masuk" — border 1px Stone 300, text Stone 700, padding 8px 16px, radius 8px, hover bg Stone 50
- Tombol "Daftar" — bg Emerald 700, text White, padding 8px 16px, radius 8px, hover bg Emerald 800
- Gap antar tombol: 8px

**Paling kanan — USER MENU (kondisi sudah login):**
- Avatar circle 36px, bg Emerald 700, inisial nama White bold 14px
- Nama user di kanan avatar, 14px Stone 700
- Icon chevron-down 16px di ujung kanan
- Klik buka dropdown: "Profil", "Admin Panel" (jika admin), garis pemisah, "Keluar"

---

## BAGIAN 2 — HERO SECTION

**Background:** Gradient dari Emerald 800 ke Emerald 600 (diagonal kiri-atas ke kanan-bawah)  
**Padding vertikal:** 96px atas dan bawah  
**Teks:** Horizontally centered, max-width 640px  

### Konten dari atas ke bawah:

**Super label (paling atas):**
- Teks: "WISATA & KULINER VIA KERETA API"
- Style: 11px, weight 600, letter-spacing 0.1em, uppercase, warna Emerald 200
- Margin bawah: 16px

**Heading utama:**
- Teks baris 1: "Temukan Permata Tersembunyi"
- Teks baris 2: "di Setiap Stasiun"
- Style: 48px, weight 700, White, line-height 1.2
- Margin bawah: 16px

**Deskripsi:**
- Teks: "Direktori destinasi wisata dan kuliner terbaik yang mudah dijangkau dari stasiun kereta api terdekat."
- Style: 18px, weight 400, Emerald 100, max-width 480px, centered
- Margin bawah: 40px

**Dua tombol CTA berdampingan, gap 12px, centered:**

Tombol 1 — "Mulai Jelajahi":
- Background White, teks Emerald 800, 15px weight 600
- Padding 14px 28px, radius 10px, shadow ringan
- Icon map-pin flat line di kiri (Emerald 700, 18px)
- Hover: bg Emerald 50

Tombol 2 — "Lihat Peta Rute":
- Background transparan, border 1.5px White 50% opacity, teks White, 15px weight 600
- Padding 14px 28px, radius 10px
- Icon map flat line di kiri (White, 18px)
- Hover: bg White 10% opacity

---

## BAGIAN 3 — KOTA PILLS

**Background:** Stone 50  
**Padding vertikal:** 48px  

### Konten:

**Heading:**
- Teks: "Jelajahi Berdasarkan Kota"
- Style: 22px, weight 700, Stone 800
- Margin bawah: 20px

**Daftar pills (flex wrap, gap 10px):**

Kota yang muncul (8 buah):
Jakarta, Bandung, Yogyakarta, Surabaya, Semarang, Solo, Cirebon, Purwokerto

**Setiap pill:**
- Background White, border 1px Stone 200
- Text Stone 700, 14px, weight 500
- Sub-info jumlah stasiun: Stone 400, 12px (contoh: "3 stasiun")
- Padding 8px 16px, radius 9999px
- Icon map-pin flat kecil di kiri (Stone 400, 14px)
- Hover: border Emerald 400, text Emerald 700, bg Emerald 50
- Contoh tampilan pill: `[map-pin icon] Jakarta  ·  3 stasiun`

---

## BAGIAN 4 — FEATURED DESTINASI CARDS

**Background:** White  
**Padding vertikal:** 56px  

### Header seksi:

Kiri:
- Heading: "Destinasi Pilihan", 24px, weight 700, Stone 800
- Sub-heading: "Direkomendasikan berdasarkan rating tertinggi", 14px, Stone 500, margin atas 4px

Kanan (sejajar dengan heading):
- Link "Lihat semua →", 14px, weight 500, Emerald 700, hover underline

### Grid kartu:

- 3 kolom, gap 24px (tablet: 2 kolom, mobile: 1 kolom)
- Jumlah kartu yang tampil: 6

### Spesifikasi setiap kartu:

**Kontainer:**
- Background White, border 1px Stone 100, radius 12px
- Shadow default, hover shadow lebih dalam + border Stone 200
- Cursor pointer, transition 200ms

**Area gambar (bagian atas kartu):**
- Tinggi 180px, full width
- Jika ada foto: object-fit cover
- Jika tidak ada foto (placeholder):
  - Background Stone 100
  - Icon flat besar di tengah (40px, Stone 400):
    - Kategori Wisata: icon "mountain" atau "photo-landscape"
    - Kategori Kuliner: icon "cake" atau "restaurant"
    - Kategori UMKM: icon "shopping-bag" atau "store"

**Area konten (padding 16px):**

Baris badges:
- Badge kategori: bg Emerald 100, text Emerald 700, 11px weight 600, px 8px py 2px, radius full
- Badge "Terverifikasi" (jika terverifikasi): bg Emerald 700, text White, 11px weight 500, px 8px py 2px, radius full, margin kiri 6px, dengan icon check-mark flat 12px di kiri

Baris nama:
- Teks nama destinasi: 15px, weight 600, Stone 800, margin atas 8px, max 2 baris

Baris stasiun:
- Icon train-front flat line (Stone 400, 14px) di kiri
- Teks: "{nama stasiun} — {nama kota}", 12px, Stone 500, margin atas 6px

Baris rating:
- 5 icon bintang flat: bintang penuh amber-500, bintang kosong stone-200
- Nilai angka di kanan bintang: 13px, weight 600, Stone 700
- Margin atas 8px

### Tombol bawah seksi:

- Teks: "Lihat Semua Destinasi"
- Style: border 1.5px Emerald 700, text Emerald 700, bg transparan
- Padding 10px 24px, radius 10px, hover bg Emerald 50
- Icon arrow-right flat di kanan (Emerald 700, 16px)
- Posisi: center, margin atas 40px

---

## BAGIAN 5 — FOOTER

**Background:** Stone 800  
**Padding vertikal:** 48px  

### Layout 2 kolom:

**Kolom kiri:**
- Icon train flat (White, 20px) + teks "JejakJalur" (White, 18px, weight 700), berdampingan
- Deskripsi: "Temukan destinasi terbaik di jalur kereta Indonesia.", 13px, Stone 400, margin atas 8px

**Kolom kanan — 3 sub-kolom link:**

Sub-kolom "Jelajahi": Destinasi, Rute, Kota  
Sub-kolom "Akun": Masuk, Daftar  
Sub-kolom "Lainnya": Tentang, Kebijakan Privasi  

- Judul sub-kolom: 12px, weight 600, Stone 300, uppercase, letter-spacing 0.05em
- Link: 13px, Stone 400, hover White, transition 150ms

**Divider:**
- 1px solid Stone 700, margin vertikal 24px

**Copyright (full-width, centered):**
- Teks: "© 2026 JejakJalur. Dibuat untuk traveler Indonesia."
- Style: 12px, Stone 500, text-align center

---

## CATATAN UNTUK STITCH AI

- **Tidak ada emoji** — semua ikon wajib flat line icons
- **Warna dominan** hijau emerald sebagai brand color utama
- **Nuansa netral** gunakan stone (bukan gray biasa) untuk kesan lebih hangat
- **Hero section** paling mencolok — gradient hijau gelap, teks besar, 2 tombol jelas
- **Navbar** ringan dan bersih, background blur, bukan solid putih penuh
- **Kartu destinasi** harus ada hover state yang responsif dengan shadow lebih dalam
- **Kesan keseluruhan** — bersih, modern, tidak ramai, mudah di-scan, terasa lokal tapi profesional
- **Mobile** — kartu kolaps ke 1 kolom, pills wrap ke baris baru, tombol CTA stack vertikal
