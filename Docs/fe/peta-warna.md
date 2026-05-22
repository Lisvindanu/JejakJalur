# Sistem Warna Peta Rute

Dokumentasi ini menjelaskan logika pembedaan warna marker stasiun di halaman `/rute`.

---

## 1. Warna Isi Marker — Identitas Kota

Setiap kota mendapat satu warna dari palet 15 warna yang berputar berdasarkan urutan kota (diurutkan alfabetis). Semua stasiun dalam satu kota memiliki warna isi yang sama.

| Urutan Kota | Warna Hex | Tampilan |
|-------------|-----------|---------|
| 1 | `#047857` | Hijau emerald |
| 2 | `#dc2626` | Merah |
| 3 | `#7c3aed` | Ungu |
| 4 | `#0369a1` | Biru tua |
| 5 | `#92400e` | Coklat |
| 6 | `#b45309` | Amber tua |
| 7 | `#059669` | Hijau |
| 8 | `#d97706` | Kuning amber |
| 9 | `#be123c` | Merah muda tua |
| 10 | `#0e7490` | Teal |
| 11 | `#4f46e5` | Indigo |
| 12 | `#65a30d` | Hijau limau |
| 13 | `#c2410c` | Oranye tua |
| 14 | `#7e22ce` | Ungu tua |
| 15 | `#0f766e` | Teal gelap |

Setelah kota ke-15, palet berputar kembali dari awal.

---

## 2. Warna Border Marker — Jenis Layanan Kereta

Border (garis tepi) marker menunjukkan layanan kereta yang singgah di stasiun tersebut.

| Border | Jenis Layanan | Keterangan |
|--------|--------------|------------|
| **Putih** `#ffffff` | KAI Antarkota | Kereta jarak jauh / menengah |
| **Biru** `#3B82F6` | KRL Commuter Line | Kereta komuter dalam kota / regional |
| **Amber** `#D97706` | Whoosh (KCIC) | Kereta cepat Jakarta–Bandung |

Satu stasiun bisa melayani lebih dari satu jenis layanan (contoh: Stasiun Bandung = KAI + KRL). Prioritas tampilan border: **Whoosh > KRL > KAI**.

Data jenis layanan di-*derive* dari kolom `koneksi_stasiun.tipe` di database, bukan di-*hardcode* di frontend.

---

## 3. Ukuran Marker — Hierarki Stasiun

| Ukuran | Kondisi | Keterangan |
|--------|---------|-----------|
| **Besar** (radius 8) | Hub — stasiun pertama dari kota | Stasiun utama/paling representatif |
| **Kecil** (radius 5) | Non-hub — stasiun lain dalam kota | Stasiun sekunder |

Saat marker diklik/dipilih, radius bertambah 3 sebagai indikator seleksi.

---

## 4. Tampilan Saat Rute Aktif

Ketika pengguna mencari rute A→B:

| Kondisi | Tampilan |
|---------|---------|
| Stasiun dilalui rute | Radius +3, opacity penuh, marker dibawa ke depan |
| Stasiun tidak dilalui | Sangat pudar (`opacity: 0.12`, `fillOpacity: 0.08`) |
| Garis rute | Hijau `#047857`, tebal 4px, opacity 80% |

---

## 5. Panel Info Stasiun

Klik marker → muncul panel di sudut kanan bawah peta dengan:

- **Garis warna** di bagian atas — warna kota stasiun tersebut
- **Nama kota** — ditampilkan dengan warna kota
- **Nama stasiun** + kode stasiun
- **Badge layanan** — KAI / KRL / Whoosh (sesuai jenis layanan yang ada)
- **Jumlah destinasi** tersedia
- Tombol **Lihat destinasi** — filter halaman destinasi berdasarkan stasiun ini

---

## 6. Implementasi

| File | Peran |
|------|-------|
| `resources/js/components/fragments/Home/RuteMap.tsx` | Komponen utama peta; fungsi `jenisLayananStyle()` dan `JenisLayananBadge` |
| `app/Services/KotaService.php` | Men-*derive* `jenis_layanan` per stasiun dari `koneksi_stasiun.tipe` |
| `resources/js/types/index.ts` | Type `Stasiun.jenis_layanan: Array<'antarkota' \| 'commuter' \| 'kcic'>` |
