# JejakJalur — Feature Roadmap

> Status tiap fitur: `[ ]` belum · `[x]` sudah · `[~]` sebagian

---

## Yang Sudah Ada

- [x] Auth email + OAuth Google/GitHub
- [x] Admin CRUD Kota/Stasiun/Destinasi
- [x] Fuzzy search destinasi (pg_trgm)
- [x] Ulasan + rating system
- [x] Rute Dijkstra antar stasiun
- [x] JejakAI chatbot
- [x] Leaflet map + GPS jarak dari saya
- [x] Subway map SVG interaktif
- [x] Avatar upload user
- [x] Bookmark destinasi
- [x] KCIC/KRL routing dengan polyline geometry
- [x] Filter destinasi (kategori, kota, stasiun)
- [x] User profile page
- [x] Multi-foto destinasi / galeri (#1)
- [x] Harga tiket / estimasi budget (#4)
- [x] Destinasi trending (#8)
- [x] Destinasi baru bulan ini (#9)
- [x] Like ulasan (#23)
- [x] Reply ulasan / komentar (#25)
- [x] Report ulasan (#26)
- [x] Daftar kunjungan / visited (#28)
- [x] Wish list trip (#29)
- [x] Notifikasi in-app — infrastructure (#31)
- [x] Simpan rute favorit (#19)
- [x] Auto-tag destinasi dari deskripsi via AI (#44)

---

## Backlog Fitur

### Destinasi & Discovery

**1. Multi-foto destinasi**
Setiap destinasi bisa punya lebih dari 1 foto (galeri). Tabel `destinasi_foto` (destinasi_id, url, urutan). Slider di halaman detail.

**2. Video preview destinasi**
Upload video singkat (max 30 detik) atau embed YouTube/Instagram Reels. Tampil di atas galeri foto.

**3. Jam operasional**
Kolom `jam_buka` dan `jam_tutup` per hari (JSON). Tampil badge "Buka Sekarang" / "Tutup" berdasarkan waktu user.

**4. Harga tiket / estimasi budget**
Kolom `harga_min` dan `harga_max`. Filter destinasi by budget range. Tampil badge gratis/berbayar.

**5. Nomor telepon & website**
Kolom `telepon` dan `website` di destinasi. Tombol WA/call langsung dari halaman detail.

**6. Tag & kategori lanjutan**
Tambah sistem tag bebas (halal, pet-friendly, ramah disabilitas, parkir, dll). Many-to-many via `destinasi_tag`.

**7. Destinasi terkait**
Section "Destinasi Lain di Stasiun Ini" dan "Mungkin Kamu Suka" di halaman detail. Diambil berdasarkan kategori + jarak stasiun.

**8. Destinasi trending**
Algoritma sederhana: (jumlah view 7 hari × 0.4) + (ulasan baru × 0.4) + (bookmark baru × 0.2). Section di homepage.

**9. Destinasi baru bulan ini**
Badge "Baru" untuk destinasi yang ditambahkan dalam 30 hari terakhir. Section dedicated di homepage.

**10. Destinasi musiman**
Tandai destinasi yang hanya buka di musim tertentu (libur sekolah, lebaran, dsb). Filter by availability.

---

### Pencarian & Filter

**11. Search history**
Simpan 10 pencarian terakhir user di localStorage. Tampil saat search bar di-focus.

**12. Filter kombinasi lanjutan**
Filter by: rating minimum, jarak dari stasiun (< 1km / 1-5km / > 5km), harga, jam buka sekarang. Semua bisa dikombinasikan.

**13. Sort destinasi**
Opsi urut: rating tertinggi, ulasan terbanyak, jarak terdekat dari stasiun, terbaru, trending.

**14. Pencarian stasiun di halaman Rute**
Autocomplete nama stasiun saat mengetik. Bisa cari by nama kota atau kode stasiun.

**15. Saved search / alert**
User bisa simpan kombinasi filter. Notifikasi (in-app) kalau ada destinasi baru yang cocok.

---

### Rute & Peta

**16. Multi-stop trip planning**
Rencanakan perjalanan dengan lebih dari 2 stasiun. Input: stasiun A → B → C. Output: rute optimal + daftar destinasi di tiap stasiun.

**17. Estimasi waktu tempuh**
Berdasarkan jarak dan rata-rata kecepatan KA per tipe (KRL: 40km/h, antarkota: 80km/h). Tampil di hasil rute.

**18. Integrasi jadwal KA (KAI Access API)**
Fetch jadwal keberangkatan real-time untuk rute yang ditemukan. Tampil "Kereta berikutnya: 14:23".

**19. Simpan rute favorit**
User bisa save rute (dari-ke) dengan nama custom. Tampil di profil. Quick-access di halaman rute.

**20. Share rute**
Generate link rute yang bisa dishare (`/rute?dari=GMR&ke=BD`). Preview OG tag berisi nama stasiun dan estimasi waktu.

**21. Offline map (PWA)**
Cache tile peta Leaflet untuk area yang sudah pernah dibuka. Bisa lihat peta tanpa internet.

**22. Rute dari lokasi saya ke stasiun**
Integrasi Google Maps / OpenRouteService untuk legs terakhir: stasiun → destinasi (jalan kaki / ojek).

---

### Sosial & Komunitas

**23. Like ulasan**
User bisa like ulasan orang lain. Sort ulasan by "paling membantu". Limit 1 like per user per ulasan.

**24. Foto di ulasan**
User bisa upload 1-3 foto saat menulis ulasan. Tampil di bawah teks ulasan.

**25. Reply ulasan**
Admin atau pemilik destinasi bisa reply ulasan. Tampil sebagai sub-thread.

**26. Report ulasan**
Tombol report ulasan yang tidak pantas. Admin dapat notifikasi. Auto-hide kalau report ≥ 5.

**27. Follow user**
User bisa follow traveler lain. Feed "Dari orang yang kamu ikuti" di homepage. Notifikasi kalau mereka bookmark/ulasan destinasi baru.

**28. Daftar kunjungan (visited)**
User tandai destinasi sebagai "sudah dikunjungi". Histori kunjungan di profil. Stats: berapa kota, berapa stasiun.

**29. Wish list trip**
Beda dari bookmark — ini "mau ke sini". Bisa jadikan itinerary. Sharable link.

**30. Leaderboard reviewer**
Top 10 user dengan ulasan terbanyak + rata-rata like tertinggi. Badge "Top Reviewer" bulan ini.

---

### Notifikasi & Engagement

**31. Notifikasi in-app**
Bell icon di navbar. Notifikasi: ulasan di-reply, destinasi bookmark ada update (jam berubah, foto baru), ada yang follow.

**32. Email digest mingguan**
Email berisi: destinasi baru minggu ini di kota favorit, trending minggu ini, reminder destinasi di wish list. Opt-in di settings.

**33. Push notification (PWA)**
Notifikasi browser kalau ada destinasi baru di kota yang pernah dikunjungi user.

**34. Reminder perjalanan**
User input tanggal rencana perjalanan → sistem kirim reminder H-1 via email/notif berisi destinasi rekomendasi di rute tersebut.

---

### Admin & Manajemen

**35. Bulk import destinasi**
Admin upload CSV/Excel. Preview sebelum import. Mapping kolom otomatis. Validasi duplikat by nama+stasiun.

**36. Moderasi ulasan**
Admin dashboard khusus moderasi: list ulasan yang di-report, tombol approve/hide/delete. Filter by status.

**37. Klaim destinasi (owner)**
Pemilik UMKM/tempat wisata bisa klaim destinasi. Bisa update info, upload foto, reply ulasan. Butuh verifikasi admin.

**38. Analytics admin**
Dashboard: page views per destinasi, search query paling populer, conversion bookmark→kunjungan, user growth. Pakai simple counter, tidak perlu GA.

**39. Export data**
Admin bisa export destinasi / ulasan / user ke CSV/Excel. Filter by tanggal, kota, kategori.

**40. Activity log admin**
Log semua aksi admin (create/edit/delete destinasi, approve claim, dll). Dengan timestamp dan user.

---

### AI & Personalisasi

**41. Rekomendasi personal**
Berdasarkan histori bookmark + kunjungan user, JejakAI rekomendasikan destinasi yang belum pernah dikunjungi. "Karena kamu suka [X]..."

**42. Trip summary AI**
Setelah user input rute, JejakAI generate narasi singkat: "Perjalanan Bandung → Gambir melewati 8 stasiun, sekitar 3 jam. Di sepanjang jalur ada 24 destinasi Kuliner dan 15 Wisata."

**43. Review sentiment analysis**
Otomatis label ulasan: positif / netral / negatif. Tampil di admin sebagai insight. Tidak tampil ke user biasa.

**44. Auto-tag destinasi dari deskripsi**
Admin input deskripsi → AI suggest tag yang relevan (halal, outdoor, keluarga, dll). Admin tinggal approve.

**45. Chatbot bahasa daerah**
JejakAI bisa respond dalam bahasa Sunda / Jawa dasar kalau user nulis pakai bahasa tersebut.

---

### Gamifikasi

**46. Badge / achievement user**
Badge otomatis: "Penjelajah Pertama" (ulasan pertama), "Railfan" (10 rute dicari), "Foodie" (bookmark 5 kuliner), dll. Tampil di profil.

**47. Streak kunjungan**
Hitung berapa bulan berturut-turut user menulis ulasan. Tampil di profil. Milestone reward (badge special).

**48. Points & level**
Poin dari: tulis ulasan (+10), upload foto (+5), destinasi pertama di suatu stasiun (+20). Level: Pejalan Baru → Railfan → Penjelajah → Maestro Jalur.

---

### Tech & Performance

**49. PWA (Progressive Web App)**
Service worker, manifest, install prompt. Bisa di-install di home screen. Offline mode untuk halaman yang sudah pernah dikunjungi.

**50. Dark mode / light mode toggle**
Saat ini fixed light. Tambah toggle dark/light. Simpan preferensi di localStorage. Respect `prefers-color-scheme` default.

---

## Priority Saran Pengerjaan

| Priority | Fitur | Alasan |
|----------|-------|--------|
| Tinggi | #1 Multi-foto | Destinasi butuh lebih dari 1 foto |
| Tinggi | #3 Jam operasional | Info paling dicari traveler |
| Tinggi | #4 Harga tiket | Membantu budget planning |
| Tinggi | #12 Filter lanjutan | UX search masih terbatas |
| Tinggi | #24 Foto di ulasan | Ulasan lebih credible |
| Tinggi | #49 PWA | Mobile experience jauh lebih baik |
| Menengah | #16 Multi-stop planning | Core value JejakJalur |
| Menengah | #23 Like ulasan | Engagement |
| Menengah | #28 Daftar kunjungan | Retention user |
| Menengah | #35 Bulk import | Admin efficiency |
| Rendah | #27 Follow user | Butuh user base dulu |
| Rendah | #46-48 Gamifikasi | Butuh konten yang cukup dulu |
