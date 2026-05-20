# Daftar (Register) — Design Flow

> **File:** `resources/js/pages/Auth/Daftar.tsx`
> **Diperbarui:** 2026-05-19

---

## Route & Props

### Route

```
GET  /daftar   → AuthController@tampilkanFormulirDaftar   middleware: guest
POST /daftar   → AuthController@prosesDaftar              middleware: guest
```

Named routes: `daftar`, `daftar.proses`

### Server Props (Page Props)

Halaman Daftar tidak menerima props tambahan dari controller. Hanya shared props.

```typescript
// Props yang tersedia via usePage<SharedProps>().props
{
  name: string,           // "JejakJalur"
  auth: { user: null },   // selalu null karena middleware guest
  flash: {
    sukses: string | null,
    error:  string | null,
  }
}
```

### Form Payload (POST /daftar)

```typescript
{
  nama:                  string,   // required
  email:                 string,   // required
  password:              string,   // required, min 8
  password_confirmation: string,   // required, harus sama dengan password
  consent_given:         boolean,  // required, harus true (accepted)
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     bg-stone-50 min-h-screen                        │
│            flex items-center justify-center py-12                  │
│                                                                     │
│         ┌───────────────────────────────────────────────┐          │
│         │          bg-white rounded-xl shadow-md        │          │
│         │              w-full max-w-md p-8              │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │          🌿 JejakJalur               │    │          │
│         │   │    text-2xl font-bold text-center    │    │          │
│         │   │      text-emerald-700 mb-2           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │       Buat Akun Baru                 │    │          │
│         │   │  text-xl font-semibold text-center   │    │          │
│         │   │      text-stone-800 mb-6             │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ── FORM ─────────────────────────────────  │          │
│         │                                               │          │
│         │   Nama Lengkap                                │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │ Nama Lengkap Anda                    │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   Email                                       │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │ nama@email.com                       │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   Password                                    │          │
│         │   ┌──────────────────────────────── 👁 ┐    │          │
│         │   │ ••••••••••                           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │   ↓ hint: text-xs text-stone-400              │          │
│         │     Minimal 8 karakter                        │          │
│         │                                               │          │
│         │   Konfirmasi Password                         │          │
│         │   ┌──────────────────────────────── 👁 ┐    │          │
│         │   │ ••••••••••                           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌───────────────────────────────────────┐  │          │
│         │   │ ┌──┐  Saya menyetujui syarat &         │  │          │
│         │   │ │  │  ketentuan penggunaan data        │  │          │
│         │   │ └──┘  pribadi sesuai UU PDP            │  │          │
│         │   │       text-sm text-stone-600           │  │          │
│         │   └───────────────────────────────────────┘  │          │
│         │   ↑ wajib dicentang — jika tidak:             │          │
│         │     errors.consent_given = 'Anda harus...'   │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │              Daftar                  │    │          │
│         │   │  bg-emerald-700 hover:bg-emerald-800  │    │          │
│         │   │  text-white w-full py-2.5 rounded-lg  │    │          │
│         │   │  disabled+spinner saat processing     │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ────────────── atau ────────────────────   │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  [G]   Daftar dengan Google          │    │          │
│         │   │  border border-stone-300 rounded-lg  │    │          │
│         │   │  hover:bg-stone-50 w-full py-2.5     │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  [GH]  Daftar dengan GitHub          │    │          │
│         │   │  border border-stone-300 rounded-lg  │    │          │
│         │   │  hover:bg-stone-50 w-full py-2.5     │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  Sudah punya akun?  Masuk di sini    │    │          │
│         │   │  text-sm text-stone-500  text-emerald│    │          │
│         │   │  text-center                         │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         └───────────────────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
Daftar.tsx (layout: AuthLayout)
└── AuthLayout
    ├── FlashToast                          ← membaca flash dari shared props
    └── <centered card>
        ├── <Logo />                        ← teks "🌿 JejakJalur"
        ├── <h1> Buat Akun Baru
        │
        ├── <form onSubmit={handleSubmit}>
        │   ├── <FormField label="Nama Lengkap" error={errors.nama}>
        │   │   └── <Input
        │   │         type="text"
        │   │         value={data.nama}
        │   │         placeholder="Nama Lengkap Anda"
        │   │       />
        │   │
        │   ├── <FormField label="Email" error={errors.email}>
        │   │   └── <Input type="email" value={data.email} onChange={...} />
        │   │
        │   ├── <FormField label="Password" error={errors.password}>
        │   │   ├── <PasswordInput value={data.password} onChange={...} />
        │   │   └── <p className="text-xs text-stone-400">Minimal 8 karakter</p>
        │   │
        │   ├── <FormField label="Konfirmasi Password"
        │   │             error={errors.password_confirmation}>
        │   │   └── <PasswordInput value={data.password_confirmation} />
        │   │
        │   ├── <FormField error={errors.consent_given}>
        │   │   └── <div className="flex items-start gap-3">
        │   │         <Checkbox
        │   │           checked={data.consent_given}
        │   │           onChange={(e) => setData('consent_given', e.target.checked)}
        │   │         />
        │   │         <label className="text-sm text-stone-600">
        │   │           Saya menyetujui syarat & ketentuan penggunaan
        │   │           data pribadi sesuai UU PDP
        │   │         </label>
        │   │       </div>
        │   │
        │   └── <Button type="submit" loading={processing} disabled={processing}>
        │         Daftar
        │       </Button>
        │
        ├── <Divider>atau</Divider>
        │
        ├── <OAuthButtons label="Daftar" />
        │   ├── <a href={route('oauth.redirect', {provider: 'google'})}>
        │   │     [G] Daftar dengan Google
        │   │   </a>
        │   └── <a href={route('oauth.redirect', {provider: 'github'})}>
        │         [GH] Daftar dengan GitHub
        │       </a>
        │
        └── <p>
              Sudah punya akun?{' '}
              <Link href={route('login')}>Masuk di sini</Link>
            </p>
```

---

## State

### Local State (useState)

```typescript
const [showPassword, setShowPassword] = useState(false);
const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
// Dua toggle independen untuk kedua field password
```

### Form State (useForm)

```typescript
const { data, setData, post, processing, errors, reset } = useForm({
  nama:                  '',
  email:                 '',
  password:              '',
  password_confirmation: '',
  consent_given:         false as boolean,
});

// processing           → true saat POST → tombol disabled + spinner
// errors.nama          → pesan error field nama
// errors.email         → pesan error (misal: email sudah terdaftar)
// errors.password      → pesan error (min 8 char / tidak cocok)
// errors.password_confirmation → pesan error konfirmasi
// errors.consent_given → "Anda harus menyetujui syarat & ketentuan."
```

---

## Interactions & Events

```
1. INPUT NAMA
   onChange → setData('nama', e.target.value)

2. INPUT EMAIL
   onChange → setData('email', e.target.value)

3. INPUT PASSWORD
   onChange       → setData('password', e.target.value)
   Klik ikon 👁   → toggle showPassword

4. INPUT KONFIRMASI PASSWORD
   onChange       → setData('password_confirmation', e.target.value)
   Klik ikon 👁   → toggle showPasswordConfirmation
   Efek visual    → jika password !== password_confirmation, tampilkan
                    hint merah "Password tidak cocok" (client-side preview)

5. CHECKBOX CONSENT
   onChange → setData('consent_given', e.target.checked)
   Wajib true untuk bisa submit (server juga memvalidasi dengan `accepted`)

6. SUBMIT FORM
   post(route('daftar.proses'), {
     onSuccess: () => { /* redirect otomatis ke / + flash sukses */ },
     onError:   () => {
       reset('password', 'password_confirmation');
       // bersihkan kedua field password saat ada error
     },
   })

7. KLIK "Daftar dengan Google" / GitHub
   → window.location = route('oauth.redirect', {provider})
   → Full page redirect ke OAuth flow
   → Catatan: OAuth tidak set consent_given = true, user perlu diminta
     terpisah jika diperlukan untuk kepatuhan UU PDP

8. KLIK "Masuk di sini"
   → Link navigasi ke /masuk (Inertia visit)
```

---

## Navigation Flow

```
GET /daftar
    │
    ▼
  [Tampilkan form Daftar]
    │
    ├── SUBMIT FORM (POST /daftar)
    │       │
    │       ├── GAGAL (validasi)
    │       │       └── Kembali ke /daftar
    │       │           errors terisi:
    │       │           - nama: required/max
    │       │           - email: required/email/unique → "Email sudah terdaftar."
    │       │           - password: min:8/confirmed
    │       │           - consent_given: accepted → wajib dicentang
    │       │           password + konfirmasi di-reset (kosong)
    │       │
    │       └── BERHASIL
    │               └── Auto-login → redirect ke /
    │                   + flash.sukses: 'Selamat datang di JejakJalur!'
    │                   (FlashToast hijau muncul)
    │
    ├── KLIK OAuth Google/GitHub
    │       └── /oauth/{provider} → Provider → /oauth/{provider}/callback
    │               └── BERHASIL → / + flash sukses
    │
    └── KLIK "Masuk di sini"
            └── → /masuk
```
