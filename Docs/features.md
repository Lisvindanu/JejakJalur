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
- [x] Filter destinasi (kategori, kota, stasiun, harga, rating)
- [x] Sort destinasi (rating, ulasan, terbaru)
- [x] User profile page
- [x] User destinasi submission (pending review)

> Detail status tiap fitur backlog lihat bagian di bawah.

---

## Backlog Fitur

> `[x]` done · `[~]` sebagian · `[ ]` belum

### Destinasi & Discovery

**[x] 1. Multi-foto destinasi**
Tabel `destinasi_galeri`, model `DestinasiGaleri`, service `simpanGaleri`. Backend selesai. Slider di halaman detail.

**[ ] 2. Video preview destinasi**
Upload video singkat (max 30 detik) atau embed YouTube/Instagram Reels. Tampil di atas galeri foto.

**[x] 3. Jam operasional**
Kolom `jam_operasional` (JSON) sudah ada di tabel destinasi via migration. Backend done. Frontend belum render badge "Buka/Tutup".

**[x] 4. Harga tiket / estimasi budget**
Kolom `harga_min` dan `harga_max` sudah ada. Filter `gratis/berbayar` aktif di DestinasiService.

**[x] 5. Nomor telepon & website**
Kolom `telepon` dan `website` sudah ada via migration yang sama dengan harga.

**[x] 6. Tag & kategori lanjutan**
Kolom `tags` (JSON array) auto-filled via AI (`JejakAiService::sarankanTag`). Tag tampil sebagai chip `#tag` di halaman detail. Many-to-many `destinasi_tag` tidak diperlukan.

**[x] 7. Destinasi terkait**
`destinasiTerkait()` ada di DestinasiService, di-load di `detailDestinasi()`. Section tampil di halaman detail.

**[x] 8. Destinasi trending**
`destinasiTrending()` aktif di DestinasiService, pakai inline correlated subquery (ulasan + bookmark + kunjungan 7 hari). Section di homepage.

**[x] 9. Destinasi baru bulan ini**
`destinasiBaru()` aktif di DestinasiService. Section di homepage.

**[x] 10. Destinasi musiman**
Kolom `musim_mulai` + `musim_selesai` (MM-DD). Filter "Tersedia Sekarang" dan "Musiman Saja" aktif di DestinasiService + DestinasiFilter.tsx.

---

### Pencarian & Filter

**[x] 11. Search history**
`SearchBar.tsx` pakai `localStorage` key `jj:search_history`, simpan 8 query terakhir, tampil saat search di-focus.

**[~] 12. Filter kombinasi lanjutan**
Filter `rating minimum`, `harga`, `kategori`, `kota`, `stasiun` sudah aktif. Belum: jarak dari stasiun (< 1km dst) dan jam buka sekarang.

**[x] 13. Sort destinasi**
Opsi urut `rating`, `ulasan`, `terbaru`, `trending` semua aktif di DestinasiService + DestinasiFilter.tsx.

**[x] 14. Pencarian stasiun di halaman Rute**
`cariStasiun()` di RuteController, autocomplete di frontend `PerencanaRute.tsx`.

**[ ] 15. Saved search / alert**
Belum ada.

---

### Rute & Peta

**[x] 16. Multi-stop trip planning**
`PerencanaRute.tsx` support waypoints hingga 5 titik singgah. Backend Dijkstra multi-stop sudah handle array `waypoints[]`.

**[x] 17. Estimasi waktu tempuh**
Ada di `PerencanaRute.tsx` berdasarkan jarak dan tipe layanan KA.

**[ ] 18. Integrasi jadwal KA (KAI Access API)**
Belum ada.

**[x] 19. Simpan rute favorit**
Tabel `rute_favorit`, model `RuteFavorit`, ada tombol simpan di `PerencanaRute.tsx` (IconBookmark). Tampil di profil.

**[x] 20. Share rute**
Tombol share (copy to clipboard) ada di `PerencanaRute.tsx`. URL params `?dari=&ke=&mode=` work. OG meta dinamis ditambahkan di `Rute/Tampilkan.tsx`.

**[ ] 21. Offline map (PWA)**
Belum ada.

**[ ] 22. Rute dari lokasi saya ke stasiun**
`LokasiPanel.tsx` ada untuk GPS, tapi hanya tampilkan jarak — belum routing ke stasiun via Maps/ORS.

---

### Sosial & Komunitas

**[x] 23. Like ulasan**
Tabel `ulasan_likes`, model `UlasanLike`. Like/unlike aktif, sort by "paling membantu".

**[x] 24. Foto di ulasan**
Kolom `foto` sudah ada di tabel ulasan via migration. Upload foto di form ulasan.

**[x] 25. Reply ulasan / komentar**
Tabel `ulasan_komentar`, model `UlasanKomentar`. Sub-thread tampil di halaman detail destinasi.

**[x] 26. Report ulasan**
Tabel `ulasan_reports`, model `UlasanReport`. Tombol report aktif, `is_hidden` auto-apply di admin.

**[~] 27. Follow user**
Tabel `user_follows` sudah ada via migration. Controller dan frontend belum selesai.

**[x] 28. Daftar kunjungan (visited)**
Tabel `kunjungan`, model `Kunjungan`. User bisa tandai destinasi sudah dikunjungi. Histori di profil.

**[x] 29. Wish list trip**
Tabel `wish_list`, model `WishList`, `WishListController`. Toggle di halaman detail, tampil di profil.

**[ ] 30. Leaderboard reviewer**
Belum ada.

---

### Notifikasi & Engagement

**[x] 31. Notifikasi in-app**
Bell icon + unread badge di navbar. Halaman `/notifikasi` dengan pagination + tandai baca. Notif terkirim untuk: ulasan baru (ke pemilik destinasi) dan ulasan disukai.

**[ ] 32. Email digest mingguan**
Belum ada.

**[ ] 33. Push notification (PWA)**
Belum ada.

**[ ] 34. Reminder perjalanan**
Belum ada.

---

### Admin & Manajemen

**[x] 35. Bulk import destinasi**
`ImportController` + halaman `Admin/Destinasi/Import`. Upload CSV, validasi kolom, preview, insert.

**[x] 36. Moderasi ulasan**
Halaman `Admin/Ulasan/Indeks.tsx`. List ulasan yang di-report, tombol hide/delete, filter by status.

**[x] 37. Klaim destinasi (owner)**
Tabel `destinasi_klaim`, `KlaimController` (formulir + simpan), halaman `Destinasi/Klaim.tsx` untuk user, `Admin/Klaim/Indeks.tsx` untuk review admin.

**[x] 38. Analytics admin**
`DashboardController` punya: views per destinasi, ulasan terbanyak, user growth, bookmark bulan ini.

**[ ] 39. Export data**
Belum ada (ImportController hanya import, tidak export).

**[x] 40. Activity log admin**
Tabel `admin_logs`, model `AdminLog`, halaman `Admin/ActivityLog/Indeks.tsx`.

---

### AI & Personalisasi

**[ ] 41. Rekomendasi personal**
Belum ada.

**[ ] 42. Trip summary AI**
Belum ada.

**[x] 43. Review sentiment analysis**
`JejakAiService::analisisSentimen()` dipanggil otomatis di `UlasanService::buatUlasan`. Kolom `sentiment` tersimpan per ulasan. Tampil di admin sebagai insight.

**[x] 44. Auto-tag destinasi dari deskripsi**
`JejakAiService::sarankanTag()` dipanggil otomatis saat create/update destinasi di `DestinasiService`.

**[ ] 45. Chatbot bahasa daerah**
Belum ada.

---

### Gamifikasi

**[ ] 46. Badge / achievement user**
Belum ada.

**[ ] 47. Streak kunjungan**
Belum ada.

**[ ] 48. Points & level**
Belum ada.

---

### Tech & Performance

**[ ] 49. PWA (Progressive Web App)**
Belum ada service worker atau manifest.

**[x] 50. Dark mode / light mode toggle**
Toggle (IconSun/IconMoon) di Navbar menggunakan `useDarkMode.ts`. Simpan di `localStorage`, respek `prefers-color-scheme`. Semua komponen punya class `dark:` variants.

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
