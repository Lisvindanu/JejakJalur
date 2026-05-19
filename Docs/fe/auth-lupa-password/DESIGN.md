# Lupa Password — Design Flow

> **File:** `resources/js/pages/Auth/LupaPassword.tsx`
> **Diperbarui:** 2026-05-19

---

## Route & Props

### Route

```
GET  /lupa-password   → PasswordResetController@tampilkanFormulirLupaPassword   middleware: guest
POST /lupa-password   → PasswordResetController@kirimTautanReset                middleware: guest
```

Named routes: `password.request`, `password.email`

### Server Props (Page Props)

```typescript
// Props yang tersedia via usePage<SharedProps>().props
{
  name: string,           // "JejakJalur"
  auth: { user: null },   // selalu null karena middleware guest
  flash: {
    sukses: string | null,   // diisi server setelah POST berhasil:
                             // "Tautan reset password telah dikirim ke email Anda."
    error:  string | null,
  }
}
```

### Form Payload (POST /lupa-password)

```typescript
{
  email: string,   // required
}
```

---

## Wireframe (ASCII)

### State Awal (Belum Submit)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     bg-stone-50 min-h-screen                        │
│            flex items-center justify-center py-12                  │
│                                                                     │
│         ┌─────────────────────────────────────────┐                │
│         │       bg-white rounded-xl shadow-md     │                │
│         │          w-full max-w-sm p-8            │                │
│         │    (lebih kecil dari Login: max-w-sm)   │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │            🔑                  │     │                │
│         │   │  w-14 h-14 mx-auto mb-4        │     │                │
│         │   │  bg-emerald-50 rounded-full    │     │                │
│         │   │  flex items-center justify-ctr │     │                │
│         │   │  text-emerald-700 text-2xl     │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │       Lupa Password?           │     │                │
│         │   │  text-xl font-semibold         │     │                │
│         │   │  text-stone-800 text-center    │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │  Masukkan email Anda dan kami  │     │                │
│         │   │  akan mengirimkan tautan untuk │     │                │
│         │   │  mereset password.             │     │                │
│         │   │  text-sm text-stone-500 center │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ── FORM ───────────────────────────   │                │
│         │                                         │                │
│         │   Alamat Email                           │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │ nama@email.com                 │     │                │
│         │   └───────────────────────────────┘     │                │
│         │   ↑ jika error: border-red-500           │                │
│         │   ↓ pesan error: text-sm text-red-600   │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │      Kirim Tautan Reset        │     │                │
│         │   │  bg-emerald-700 w-full py-2.5  │     │                │
│         │   │  hover:bg-emerald-800 rounded  │     │                │
│         │   │  disabled+spinner saat loading │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │  ← Kembali ke Login            │     │                │
│         │   │  text-sm text-emerald-700      │     │                │
│         │   │  hover:underline text-center   │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         └─────────────────────────────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### State Sukses (Setelah Submit Berhasil)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     bg-stone-50 min-h-screen                        │
│                                                                     │
│         ┌─────────────────────────────────────────┐                │
│         │       bg-white rounded-xl shadow-md     │                │
│         │          w-full max-w-sm p-8            │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │            ✉️                   │     │                │
│         │   │  w-14 h-14 mx-auto mb-4        │     │                │
│         │   │  bg-emerald-50 rounded-full    │     │                │
│         │   │  text-emerald-700              │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │         Email Terkirim!        │     │                │
│         │   │  text-xl font-semibold         │     │                │
│         │   │  text-emerald-700 text-center  │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         │   ┌───────────────────────────────────────┐              │
│         │   │  Kami telah mengirimkan tautan reset   │              │
│         │   │  password ke email Anda. Silakan cek  │              │
│         │   │  inbox (dan folder spam).             │              │
│         │   │                                       │              │
│         │   │  ┌───────────────────────────────┐   │              │
│         │   │  │  bg-emerald-50 rounded-lg p-3  │   │              │
│         │   │  │  border border-emerald-200     │   │              │
│         │   │  │  ✓ nama@email.com              │   │              │
│         │   │  │  text-sm text-emerald-700      │   │              │
│         │   │  └───────────────────────────────┘   │              │
│         │   └───────────────────────────────────────┘              │
│         │                                         │                │
│         │   ┌───────────────────────────────┐     │                │
│         │   │  ← Kembali ke Login            │     │                │
│         │   │  text-sm text-emerald-700      │     │                │
│         │   └───────────────────────────────┘     │                │
│         │                                         │                │
│         └─────────────────────────────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
LupaPassword.tsx (layout: AuthLayout)
└── AuthLayout
    ├── FlashToast                          ← flash dari shared props (opsional)
    └── <centered card — max-w-sm>
        │
        ├── [Kondisi: !sukses tampil]
        │   ├── <IconContainer>             ← ikon kunci / gembok
        │   │   └── 🔑 dalam lingkaran emerald-50
        │   │
        │   ├── <h1> Lupa Password?
        │   ├── <p> deskripsi singkat
        │   │
        │   ├── <form onSubmit={handleSubmit}>
        │   │   ├── <FormField label="Alamat Email" error={errors.email}>
        │   │   │   └── <Input
        │   │   │         type="email"
        │   │   │         value={data.email}
        │   │   │         autoFocus
        │   │   │       />
        │   │   │
        │   │   └── <Button type="submit" loading={processing}>
        │   │         Kirim Tautan Reset
        │   │       </Button>
        │   │
        │   └── <Link href={route('login')}>← Kembali ke Login</Link>
        │
        └── [Kondisi: sukses tampil — email terkirim]
            ├── <IconContainer>             ← ikon amplop / email
            │   └── ✉️ dalam lingkaran emerald-50
            ├── <h2> Email Terkirim!
            ├── <p> instruksi cek inbox
            ├── <EmailBadge email={data.email} />
            │   └── kotak hijau muda menampilkan email tujuan
            └── <Link href={route('login')}>← Kembali ke Login</Link>
```

---

## State

### Local State (useState)

```typescript
const [sukses, setSukses] = useState(false);
// Mengontrol tampilan form vs pesan sukses
// Di-set true saat onSuccess callback dipanggil
```

### Form State (useForm)

```typescript
const { data, setData, post, processing, errors } = useForm({
  email: '',
});

// processing       → true saat POST berjalan → tombol disabled + spinner
// errors.email     → pesan error validasi email
```

---

## Interactions & Events

```
1. INPUT EMAIL
   onChange → setData('email', e.target.value)
   autoFocus pada mount (langsung siap input)

2. SUBMIT FORM
   post(route('password.email'), {
     onSuccess: () => {
       setSukses(true);
       // Tampilkan state sukses — form diganti dengan pesan berhasil
     },
     onError: () => {
       // errors.email terisi jika ada error validasi
       // Server tidak memberi hint apakah email terdaftar atau tidak
       // (mencegah enumerasi email)
     },
   })

3. KLIK "← Kembali ke Login"
   → Link navigasi ke /masuk (Inertia visit)
   → Tersedia baik di state form maupun state sukses
```

---

## Navigation Flow

```
GET /lupa-password
    │
    ▼
  [Tampilkan form — state: !sukses]
    │
    ├── SUBMIT FORM (POST /lupa-password)
    │       │
    │       ├── GAGAL (validasi)
    │       │       └── Kembali ke halaman yang sama
    │       │           errors.email = 'Bidang email wajib diisi.' / format invalid
    │       │
    │       └── BERHASIL (email ada atau tidak ada — server selalu sukses)
    │               └── setSukses(true)
    │                   → Halaman beralih ke state sukses
    │                   → Form disembunyikan, pesan konfirmasi ditampilkan
    │                   → Email "terkirim" ke inbox (jika terdaftar)
    │
    └── KLIK "← Kembali ke Login"
            └── → /masuk

Catatan keamanan:
  Server selalu merespons sukses (redirect + flash) terlepas dari
  apakah email terdaftar atau tidak, untuk mencegah user enumeration.
  Client cukup tampilkan pesan sukses tanpa mengkonfirmasi keberadaan akun.
```
