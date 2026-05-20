# Login — Design Flow

> **File:** `resources/js/pages/Auth/Login.tsx`
> **Diperbarui:** 2026-05-19

---

## Route & Props

### Route

```
GET  /masuk   → AuthController@tampilkanFormulirLogin   middleware: guest
POST /masuk   → AuthController@prosesLogin              middleware: guest
```

Named routes: `login`, `login.proses`

### Server Props (Page Props)

Halaman Login tidak menerima props tambahan dari controller. Hanya shared props yang tersedia.

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

### Form Payload (POST /masuk)

```typescript
{
  email:    string,   // required
  password: string,   // required
  ingat:    boolean,  // optional, default false
}
```

---

## Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     bg-stone-50 min-h-screen                        │
│               flex items-center justify-center py-12               │
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
│         │   │         Masuk ke Akunmu              │    │          │
│         │   │  text-xl font-semibold text-center   │    │          │
│         │   │      text-stone-800 mb-6             │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ── FORM ─────────────────────────────────  │          │
│         │                                               │          │
│         │   Email                                       │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │ nama@email.com                       │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │   ↑ jika error: border-red-500               │          │
│         │   ↓ pesan error: text-sm text-red-600        │          │
│         │                                               │          │
│         │   Password                                    │          │
│         │   ┌──────────────────────────────── 👁 ┐    │          │
│         │   │ ••••••••••                           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌──┐ Ingat saya              Lupa password? │          │
│         │   │✓ │ text-sm text-stone-600  text-sm       │          │
│         │   └──┘                        text-emerald-700│          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │              Masuk                  │    │          │
│         │   │  bg-emerald-700 hover:bg-emerald-800 │    │          │
│         │   │  text-white w-full py-2.5 rounded-lg │    │          │
│         │   │  disabled+spinner saat processing    │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ────────────── atau ────────────────────   │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  [G]   Masuk dengan Google           │    │          │
│         │   │  border border-stone-300 rounded-lg  │    │          │
│         │   │  hover:bg-stone-50 w-full py-2.5     │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  [GH]  Masuk dengan GitHub           │    │          │
│         │   │  border border-stone-300 rounded-lg  │    │          │
│         │   │  hover:bg-stone-50 w-full py-2.5     │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  Belum punya akun?  Daftar sekarang  │    │          │
│         │   │  text-sm text-stone-500  text-emerald│    │          │
│         │   │  text-center                         │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         └───────────────────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

STATE: flash.sukses tampil → FlashToast hijau di pojok kanan atas
STATE: flash.error tampil  → FlashToast merah di pojok kanan atas
```

---

## Component Tree

```
Login.tsx (layout: AuthLayout)
└── AuthLayout
    ├── FlashToast                          ← membaca flash dari shared props
    └── <centered card>
        ├── <Logo />                        ← teks "🌿 JejakJalur" / SVG logo
        ├── <h1> Masuk ke Akunmu
        │
        ├── <form onSubmit={handleSubmit}>
        │   ├── <FormField label="Email" error={errors.email}>
        │   │   └── <Input type="email" value={data.email} onChange={...} />
        │   │
        │   ├── <FormField label="Password" error={errors.password}>
        │   │   └── <PasswordInput value={data.password} onChange={...} />
        │   │       └── toggle show/hide (state: showPassword)
        │   │
        │   ├── <div className="flex justify-between items-center">
        │   │   ├── <Checkbox label="Ingat saya" checked={data.ingat} />
        │   │   └── <Link href={route('password.request')}>Lupa password?</Link>
        │   │
        │   └── <Button type="submit" loading={processing} disabled={processing}>
        │         Masuk
        │       </Button>
        │
        ├── <Divider>atau</Divider>
        │
        ├── <OAuthButtons />
        │   ├── <a href={route('oauth.redirect', {provider: 'google'})}>
        │   │     [G] Masuk dengan Google
        │   │   </a>
        │   └── <a href={route('oauth.redirect', {provider: 'github'})}>
        │         [GH] Masuk dengan GitHub
        │       </a>
        │
        └── <p>
              Belum punya akun?{' '}
              <Link href={route('daftar')}>Daftar sekarang</Link>
            </p>
```

---

## State

### Local State (useState)

```typescript
const [showPassword, setShowPassword] = useState(false);
// Mengontrol apakah field password tipe "text" atau "password"
```

### Form State (useForm)

```typescript
const { data, setData, post, processing, errors, reset } = useForm({
  email:    '',
  password: '',
  ingat:    false as boolean,
});

// data.email       → nilai input email
// data.password    → nilai input password
// data.ingat       → state checkbox
// processing       → true saat POST berjalan → tombol disabled + spinner
// errors.email     → pesan error validasi email dari server
// errors.password  → pesan error validasi / kredensial salah
```

---

## Interactions & Events

```
1. INPUT EMAIL
   onChange → setData('email', e.target.value)
   Efek     → errors.email hilang saat user mulai mengetik (clearErrors)

2. INPUT PASSWORD
   onChange      → setData('password', e.target.value)
   Klik ikon 👁  → toggle showPassword (true/false)
   type          → showPassword ? 'text' : 'password'

3. CHECKBOX "Ingat saya"
   onChange → setData('ingat', e.target.checked)

4. KLIK "Lupa password?"
   → Link navigasi ke /lupa-password (Inertia visit)

5. SUBMIT FORM
   post(route('login.proses'), {
     onSuccess: () => { /* Inertia akan redirect sesuai intended */ },
     onError:   () => { reset('password'); /* bersihkan password */ },
   })

6. KLIK "Masuk dengan Google"
   → window.location = route('oauth.redirect', {provider: 'google'})
   → Full page redirect (bukan Inertia visit) ke OAuth flow

7. KLIK "Masuk dengan GitHub"
   → window.location = route('oauth.redirect', {provider: 'github'})

8. KLIK "Daftar sekarang"
   → Link navigasi ke /daftar (Inertia visit)
```

---

## Navigation Flow

```
GET /masuk
    │
    ▼
  [Tampilkan form Login]
    │
    ├── SUBMIT FORM (POST /masuk)
    │       │
    │       ├── GAGAL (validasi / kredensial salah)
    │       │       └── Kembali ke /masuk
    │       │           errors.email = 'Email atau password salah.'
    │       │           password field di-reset (kosong)
    │       │
    │       └── BERHASIL
    │               └── redirect()->intended(route('home'))
    │                   → / jika tidak ada intended URL
    │
    ├── KLIK OAuth Google/GitHub
    │       └── /oauth/{provider} → Provider → /oauth/{provider}/callback
    │               └── BERHASIL → / + flash sukses
    │
    ├── KLIK "Lupa password?"
    │       └── → /lupa-password
    │
    └── KLIK "Daftar sekarang"
            └── → /daftar
```
