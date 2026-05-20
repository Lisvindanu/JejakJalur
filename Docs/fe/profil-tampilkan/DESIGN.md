# Profil Tampilkan — Design Flow

## Route & Props

| Item       | Value                                      |
|------------|--------------------------------------------|
| Route      | `GET /profil`                              |
| Middleware | `auth`                                     |
| Component  | `pages/Profil/Tampilkan.tsx`               |
| Layout     | `PublicLayout` (Navbar + Footer)           |

### Props

```ts
interface Props {
  pengguna: {
    id: string;
    nama: string;
    name: string;
    email: string;
    is_admin: boolean;
    consent_given: boolean;
    created_at: string; // ISO 8601
  };
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                             │
│  [Logo JejakJalur]                    [Destinasi] [Rute] [Avatar▾] │
└─────────────────────────────────────────────────────────────────────┘

                    ┌───────────────────────────┐
                    │         PROFIL SAYA       │  ← page title
                    └───────────────────────────┘

        ┌────────────────────────────────────────────────────┐
        │  KARTU PROFIL                                      │
        │  bg-white  rounded-xl  shadow-sm  border-stone-100 │
        │                                                    │
        │         ┌──────────────────┐                       │
        │         │   ┌──────────┐   │                       │
        │         │   │          │   │  ← avatar circle 96px │
        │         │   │    AB    │   │     bg-emerald-700    │
        │         │   │          │   │     text-white        │
        │         │   └──────────┘   │     initial nama[0..1]│
        │         └──────────────────┘                       │
        │                                                    │
        │              Andi Budi                             │  ← pengguna.nama
        │              [ Admin ]                             │  ← badge, tampil jika is_admin
        │                                                    │     bg-emerald-100 text-emerald-800
        │         ✉  andi.budi@email.com                    │  ← pengguna.email
        │         📅  Bergabung sejak 12 Januari 2025       │  ← created_at diformat
        │                                                    │
        │         ┌─────────────────────┐                   │
        │         │   ✏ Edit Profil     │  ← Link /profil/edit
        │         └─────────────────────┘                   │  bg-emerald-700 text-white
        │                                                    │
        └────────────────────────────────────────────────────┘

        ┌────────────────────────────────────────────────────┐
        │  AKTIVITAS                                         │
        │  bg-white  rounded-xl  shadow-sm  border-stone-100 │
        │                                                    │
        │  Aktivitas Saya                 ← section heading  │
        │  ─────────────────────────────────                 │
        │                                                    │
        │   ┌──────────────────────────────────────────┐    │
        │   │  💬  Ulasan Ditulis        0 ulasan      │    │
        │   └──────────────────────────────────────────┘    │
        │      (stat card, data dapat ditambah nanti)        │
        │                                                    │
        └────────────────────────────────────────────────────┘

        ┌────────────────────────────────────────────────────┐
        │  PENGATURAN AKUN  (Danger Zone)                    │
        │  bg-white  rounded-xl  shadow-sm  border-red-100   │
        │                                                    │
        │  Pengaturan Akun               ← section heading   │
        │  ─────────────────────────────────                 │
        │                                                    │
        │  ⚠ Hapus Akun                                     │
        │  Tindakan ini tidak dapat dibatalkan. Akun Anda    │
        │  akan dihapus secara permanen sesuai UU PDP.       │
        │                                                    │
        │         ┌─────────────────────┐                   │
        │         │   🗑 Hapus Akun     │  ← buka modal    │
        │         └─────────────────────┘                   │  bg-red-600 text-white
        │                                                    │
        └────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  FOOTER                                                             │
└─────────────────────────────────────────────────────────────────────┘

  ╔══════════════════════ MODAL KONFIRMASI HAPUS ═══════════════════╗
  ║                                                                 ║
  ║   Hapus Akun?                                                   ║
  ║   ─────────────────────────────────────────────────────────    ║
  ║   Apakah Anda yakin ingin menghapus akun ini? Semua data        ║
  ║   Anda akan dihapus secara permanen dan tidak dapat             ║
  ║   dipulihkan. Tindakan ini sesuai ketentuan UU PDP.             ║
  ║                                                                 ║
  ║       ┌──────────────┐   ┌─────────────────────────┐           ║
  ║       │    Batal     │   │   Ya, Hapus Akun Saya   │           ║
  ║       └──────────────┘   └─────────────────────────┘           ║
  ║       outline/stone          bg-red-600 text-white              ║
  ║                                                                 ║
  ╚═════════════════════════════════════════════════════════════════╝
```

---

## Component Tree

```
PublicLayout
└── Tampilkan (page)
    ├── PageTitle ("Profil Saya")
    ├── KartuProfil
    │   ├── AvatarCircle        — initial dari pengguna.nama, bg-emerald-700
    │   ├── NamaPengguna        — pengguna.nama
    │   ├── BadgeAdmin?         — tampil hanya jika is_admin === true
    │   ├── EmailPengguna       — pengguna.email
    │   ├── TanggalBergabung    — created_at diformat ke locale id-ID
    │   └── TombolEditProfil    — Link ke /profil/edit
    ├── SectionAktivitas
    │   └── StatCard("Ulasan Ditulis", count)
    └── SectionPengaturanAkun
        ├── KeteranganHapus
        ├── TombolHapusAkun     — onClick: buka showDeleteModal
        └── ModalKonfirmasiHapus
            ├── PesanKonfirmasi
            ├── TombolBatal     — onClick: tutup modal
            └── TombolKonfirmasi— onClick: kirim DELETE /profil
```

---

## State

| State              | Type      | Nilai Awal | Keterangan                                   |
|--------------------|-----------|------------|----------------------------------------------|
| `showDeleteModal`  | `boolean` | `false`    | Kontrol visibilitas modal konfirmasi hapus   |
| `processing`       | `boolean` | `false`    | Diambil dari `useForm()`, aktif saat request |

Tidak ada local form state di halaman ini — profil hanya ditampilkan, tidak diedit.

---

## Interactions & Events

### Tombol "Edit Profil"
- **Elemen:** `<Link href="/profil/edit">`
- **Aksi:** navigasi Inertia ke halaman edit profil

### Tombol "Hapus Akun"
- **Elemen:** `<button onClick={() => setShowDeleteModal(true)}>`
- **Aksi:** buka `ModalKonfirmasiHapus`

### Modal — Tombol "Batal"
- **Elemen:** `<button onClick={() => setShowDeleteModal(false)}>`
- **Aksi:** tutup modal, tidak ada perubahan state lain

### Modal — Tombol "Ya, Hapus Akun Saya"
- **Elemen:** `<button>` dengan `useForm` router delete
- **Aksi:**
  ```ts
  router.delete(route('profil.hapus'), {
    onFinish: () => setShowDeleteModal(false),
  });
  ```
- **Saat `processing`:** tombol disabled + spinner
- **Sukses:** server menghapus akun → redirect ke `/` + flash message

---

## Navigation Flow

```
[Navbar Avatar] ──────────────────────────────────► /profil  (halaman ini)
                                                         │
                              ┌──────────────────────────┤
                              ▼                          ▼
                     /profil/edit               [Modal Hapus]
                     (klik Edit Profil)               │
                                                       ▼
                                             DELETE /profil
                                                       │
                                                       ▼
                                              /  (redirect)
                                         + flash "Akun berhasil dihapus"
```
