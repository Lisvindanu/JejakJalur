# Profil Edit — Design Flow

## Route & Props

| Item       | Value                                      |
|------------|--------------------------------------------|
| Route      | `GET /profil/edit`                         |
| Middleware | `auth`                                     |
| Component  | `pages/Profil/Edit.tsx`                    |
| Layout     | `PublicLayout` (Navbar + Footer)           |
| Submit     | `PATCH /profil`                            |

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
  };
}
```

### Form Payload

```ts
interface FormData {
  nama: string;   // wajib
  email: string;  // wajib, unique
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
                    │        EDIT PROFIL        │  ← page title
                    └───────────────────────────┘

        ┌────────────────────────────────────────────────────┐
        │  FORM KARTU                                        │
        │  bg-white  rounded-xl  shadow-sm  border-stone-100 │
        │  p-6 md:p-8                                        │
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │  AVATAR SECTION                              │  │
        │  │                                              │  │
        │  │         ┌──────────────────┐                │  │
        │  │         │   ┌──────────┐   │                │  │
        │  │         │   │          │   │  ← avatar 96px │  │
        │  │         │   │    AB    │   │    bg-emerald  │  │
        │  │         │   │          │   │    -700        │  │
        │  │         │   └──────────┘   │    initial     │  │
        │  │         └──────────────────┘    nama[0..1]  │  │
        │  │                                              │  │
        │  │         (foto profil belum didukung)         │  │
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │  FIELD NAMA                                  │  │
        │  │                                              │  │
        │  │  Nama *                                      │  │
        │  │  ┌────────────────────────────────────────┐  │  │
        │  │  │  Andi Budi                             │  │  │  ← pre-filled
        │  │  └────────────────────────────────────────┘  │  │
        │  │  ⚠ [pesan error nama jika ada]               │  │  ← text-red-600 text-sm
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │  FIELD EMAIL                                 │  │
        │  │                                              │  │
        │  │  Email *                                     │  │
        │  │  ┌────────────────────────────────────────┐  │  │
        │  │  │  andi.budi@email.com                   │  │  │  ← pre-filled
        │  │  └────────────────────────────────────────┘  │  │
        │  │  ⚠ [pesan error email jika ada]              │  │  ← text-red-600 text-sm
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │  INFO OAUTH                                  │  │
        │  │  ℹ  Password tidak dapat diubah di sini     │  │
        │  │     jika Anda masuk menggunakan akun         │  │
        │  │     Google/OAuth.                            │  │
        │  │     bg-stone-50  border-l-4 border-stone-300 │  │
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │  TOMBOL AKSI                                 │  │
        │  │                                              │  │
        │  │  ┌──────────────────────┐  ┌─────────────┐  │  │
        │  │  │  💾 Simpan Perubahan │  │    Batal    │  │  │
        │  │  └──────────────────────┘  └─────────────┘  │  │
        │  │   bg-emerald-700 text-white  outline stone   │  │
        │  │   disabled + spinner saat processing         │  │
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        └────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  FOOTER                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

### State: Input dengan error

```
  Nama *
  ┌──────────────────────────────────────────┐
  │                                          │  ← border-red-400
  └──────────────────────────────────────────┘
  ⚠ Nama wajib diisi.                          ← text-red-600 text-sm mt-1
```

### State: Tombol saat processing

```
  ┌─────────────────────────────────┐   ┌─────────────┐
  │  ◌  Menyimpan...                │   │    Batal    │
  └─────────────────────────────────┘   └─────────────┘
   disabled, opacity-75, cursor-not-allowed
```

---

## Component Tree

```
PublicLayout
└── Edit (page)
    ├── PageTitle ("Edit Profil")
    └── FormKartu
        ├── AvatarSection
        │   └── AvatarCircle        — initial dari form.nama atau pengguna.nama
        ├── InputField (nama)
        │   ├── Label ("Nama *")
        │   ├── <input type="text"> — value: form.nama, onChange: setData
        │   └── ErrorMessage?       — errors.nama
        ├── InputField (email)
        │   ├── Label ("Email *")
        │   ├── <input type="email">— value: form.email, onChange: setData
        │   └── ErrorMessage?       — errors.email
        ├── InfoOAuth               — blok informasi password OAuth
        └── TombolAksi
            ├── TombolSimpan        — type="submit", disabled saat processing
            └── TombolBatal         — Link ke /profil
```

---

## State

| State          | Type      | Nilai Awal              | Keterangan                                      |
|----------------|-----------|-------------------------|-------------------------------------------------|
| `form.nama`    | `string`  | `pengguna.nama`         | Nilai field nama, di-set via `useForm`          |
| `form.email`   | `string`  | `pengguna.email`        | Nilai field email, di-set via `useForm`         |
| `errors.nama`  | `string?` | `undefined`             | Pesan error dari server untuk field nama        |
| `errors.email` | `string?` | `undefined`             | Pesan error dari server untuk field email       |
| `processing`   | `boolean` | `false`                 | `true` selama request PATCH berlangsung         |

### Inisialisasi Form

```ts
const { data, setData, patch, processing, errors } = useForm({
  nama: pengguna.nama,
  email: pengguna.email,
});
```

---

## Interactions & Events

### Input Nama
- **Elemen:** `<input type="text" value={data.nama}>`
- **Event:** `onChange={(e) => setData('nama', e.target.value)}`
- **Validasi:** wajib diisi, min 2 karakter (divalidasi server-side)
- **Error:** `errors.nama` ditampilkan di bawah input, border berubah `border-red-400`

### Input Email
- **Elemen:** `<input type="email" value={data.email}>`
- **Event:** `onChange={(e) => setData('email', e.target.value)}`
- **Validasi:** wajib diisi, format email valid, unique (divalidasi server-side)
- **Error:** `errors.email` ditampilkan di bawah input, border berubah `border-red-400`

### Tombol "Simpan Perubahan"
- **Elemen:** `<button type="submit" disabled={processing}>`
- **Aksi:**
  ```ts
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    patch(route('profil.update'), {
      onSuccess: () => {
        // Inertia akan redirect + flash dari server
      },
    });
  }
  ```
- **Saat `processing`:** tombol disabled, teks berubah menjadi "Menyimpan...", tampilkan spinner

### Tombol "Batal"
- **Elemen:** `<Link href="/profil">`
- **Aksi:** navigasi Inertia kembali ke `/profil` tanpa menyimpan perubahan
- **Catatan:** tidak ada konfirmasi jika ada perubahan belum tersimpan (bisa ditambah nanti)

---

## Navigation Flow

```
/profil
  │
  │  klik "Edit Profil"
  ▼
/profil/edit  (halaman ini)
  │
  ├── klik "Batal"  ──────────────────────────────────► /profil
  │
  └── submit "Simpan Perubahan"
        │
        ├── [validasi gagal]  ──► tetap di /profil/edit
        │                         tampilkan errors per field
        │
        └── [validasi berhasil]
              │
              ▼
           PATCH /profil
              │
              ▼
           /profil  (redirect)
           + flash "Profil berhasil diperbarui"
```

### Flash Message (sukses)

```
┌────────────────────────────────────────────────────────────────┐
│  ✓  Profil berhasil diperbarui.                                │
│     bg-emerald-50  border border-emerald-200  text-emerald-800 │
└────────────────────────────────────────────────────────────────┘
```
