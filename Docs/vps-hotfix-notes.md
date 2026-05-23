# VPS Hotfix Notes (Code Freeze 2026-05-22)

Catatan perubahan yang dilakukan langsung di VPS prod selama code freeze.
Belum di-push ke repo — perlu jadi PR setelah freeze lifted.

## 1. Nginx — redirect raw R2 path ke CDN
**File:** `/etc/nginx/sites-available/jejakjalur.project-n.site` (VPS)
**Mirror lokal:** `/tmp/nginx-jejakjalur.conf`

Tambah location block sebelum `location /`:
```nginx
location ~ ^/(destinasi|avatars|kota|stasiun|ulasan)/[a-f0-9]+\.(jpg|jpeg|png|webp|gif)$ {
    return 301 https://cdn.jejakjalur.project-n.site$request_uri;
}
```

**Alasan:** List endpoint masih return raw `foto` field (`destinasi/<sha256>.jpg`) bukan `foto_url`. Browser resolve relative ke origin → hit Laravel route → 500. Redirect ke CDN sebagai stopgap.

**TODO permanen:** Fix di backend — pastikan list resource expose `foto_url` (full CDN URL), bukan raw path.

## 2. UlasanController — fix TypeError saat edit/delete ulasan
**File lokal (sudah disesuaikan):** `app/Http/Controllers/UlasanController.php`

Route `/destinasi/{destinasi}/ulasan/{ulasan}` punya 2 param.
Method `perbarui()` dan `hapus()` cuma type-hint `Ulasan $ulasan` → Laravel inject string `{destinasi}` ke `$ulasan` → `TypeError: Argument #2 ($ulasan) must be of type App\Models\Ulasan, string given`.

Fix: tambah `Destinasi $destinasi` di signature kedua method (sebelum `Ulasan $ulasan`).

```php
public function perbarui(UlasanRequest $request, Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
public function hapus(Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
```

## 3. `.env` prod + staging — R2 custom domain
```
R2_URL=https://cdn.jejakjalur.project-n.site
```
(sebelumnya `https://pub-a73164c1d06a454a8de6b91fff1d3fc9.r2.dev` — kena ISP DNS-hijack)

## Status sinkronisasi
- [x] Nginx config — sudah diterapkan di VPS, mirror di `/tmp/nginx-jejakjalur.conf`
- [x] UlasanController fix — sudah diterapkan di VPS + lokal
- [x] `.env` R2_URL — sudah di VPS (jangan commit, env-only)
- [ ] PR consolidate semua perubahan setelah freeze lifted
