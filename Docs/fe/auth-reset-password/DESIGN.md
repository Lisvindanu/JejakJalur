# Reset Password — Design Flow

> **File:** `resources/js/pages/Auth/ResetPassword.tsx`
> **Diperbarui:** 2026-05-19

---

## Route & Props

### Route

```
GET  /reset-password/{token}?email={email}   → PasswordResetController@tampilkanFormulirResetPassword   middleware: guest
POST /reset-password                         → PasswordResetController@prosesResetPassword              middleware: guest
```

Named routes: `password.reset`, `password.update`

### Server Props (Page Props)

```typescript
interface ResetPasswordProps extends SharedProps {
  token: string;    // token reset dari email link (URL param)
  email: string;    // email pengguna (URL query string)
}

// usePage<ResetPasswordProps>().props
{
  token: string,        // JWT/hash token dari link email
  email: string,        // email yang akan di-reset
  name: string,         // shared: "JejakJalur"
  auth: { user: null }, // selalu null karena middleware guest
  flash: {
    sukses: string | null,
    error:  string | null,
  }
}
```

### Form Payload (POST /reset-password)

```typescript
{
  token:                 string,   // dari page props, hidden
  email:                 string,   // dari page props, readonly
  password:              string,   // required, min 8
  password_confirmation: string,   // required, harus sama dengan password
}
```

---

## Wireframe (ASCII)

### State Normal (Token Valid)

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
│         │   │            🔐                         │    │          │
│         │   │  w-14 h-14 mx-auto mb-4              │    │          │
│         │   │  bg-emerald-50 rounded-full          │    │          │
│         │   │  text-emerald-700 text-2xl           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │       Buat Password Baru             │    │          │
│         │   │  text-xl font-semibold text-center   │    │          │
│         │   │      text-stone-800 mb-2             │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  Buat password baru yang kuat untuk  │    │          │
│         │   │  akun Anda.                          │    │          │
│         │   │  text-sm text-stone-500 text-center  │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ── FORM ─────────────────────────────────  │          │
│         │                                               │          │
│         │   Email                                       │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │ nama@email.com          [readonly]   │    │          │
│         │   │ bg-stone-100 cursor-not-allowed      │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │   ↑ pre-filled dari props.email, tidak bisa  │          │
│         │     diedit (readonly + bg-stone-100)          │          │
│         │                                               │          │
│         │   Password Baru                               │          │
│         │   ┌──────────────────────────────── 👁 ┐    │          │
│         │   │ ••••••••••                           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │   ↓ hint: text-xs text-stone-400              │          │
│         │     Minimal 8 karakter                        │          │
│         │                                               │          │
│         │   Konfirmasi Password Baru                    │          │
│         │   ┌──────────────────────────────── 👁 ┐    │          │
│         │   │ ••••••••••                           │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │          Reset Password              │    │          │
│         │   │  bg-emerald-700 hover:bg-emerald-800 │    │          │
│         │   │  text-white w-full py-2.5 rounded-lg │    │          │
│         │   │  disabled+spinner saat processing    │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  ← Kembali ke Login                  │    │          │
│         │   │  text-sm text-emerald-700 text-center│    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         └───────────────────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### State Error (Token Expired / Invalid)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│         ┌───────────────────────────────────────────────┐          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │              ⚠️                       │    │          │
│         │   │  w-14 h-14 mx-auto mb-4              │    │          │
│         │   │  bg-red-50 rounded-full              │    │          │
│         │   │  text-red-600 text-2xl               │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   Tautan Reset Tidak Valid                    │          │
│         │   text-xl font-semibold text-red-700          │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │  bg-red-50 rounded-lg p-4            │    │          │
│         │   │  border border-red-200               │    │          │
│         │   │  Tautan reset password telah         │    │          │
│         │   │  kedaluwarsa atau sudah digunakan.   │    │          │
│         │   │  Silakan minta tautan baru.          │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         │   ┌─────────────────────────────────────┐    │          │
│         │   │      Minta Tautan Reset Baru         │    │          │
│         │   │  bg-emerald-700 w-full py-2.5        │    │          │
│         │   └─────────────────────────────────────┘    │          │
│         │                                               │          │
│         └───────────────────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
ResetPassword.tsx (layout: AuthLayout)
└── AuthLayout
    ├── FlashToast                          ← flash dari shared props
    └── <centered card — max-w-md>
        │
        ├── [Kondisi: token valid — form normal]
        │   ├── <IconContainer>             ← ikon kunci terkunci 🔐
        │   │   └── dalam lingkaran emerald-50
        │   │
        │   ├── <h1> Buat Password Baru
        │   ├── <p> deskripsi singkat
        │   │
        │   ├── <form onSubmit={handleSubmit}>
        │   │   │
        │   │   ├── <input type="hidden" name="token" value={props.token} />
        │   │   │   (disimpan di data.token, tidak ditampilkan secara eksplisit)
        │   │   │
        │   │   ├── <FormField label="Email">
        │   │   │   └── <Input
        │   │   │         type="email"
        │   │   │         value={data.email}
        │   │   │         readOnly
        │   │   │         className="bg-stone-100 cursor-not-allowed"
        │   │   │       />
        │   │   │   (readonly — user tidak bisa mengubah email)
        │   │   │
        │   │   ├── <FormField label="Password Baru" error={errors.password}>
        │   │   │   ├── <PasswordInput value={data.password} onChange={...} />
        │   │   │   └── <p className="text-xs text-stone-400">Minimal 8 karakter</p>
        │   │   │
        │   │   ├── <FormField label="Konfirmasi Password Baru"
        │   │   │             error={errors.password_confirmation}>
        │   │   │   └── <PasswordInput value={data.password_confirmation} />
        │   │   │
        │   │   └── <Button type="submit" loading={processing}>
        │   │         Reset Password
        │   │       </Button>
        │   │
        │   └── <Link href={route('login')}>← Kembali ke Login</Link>
        │
        └── [Kondisi: token expired/invalid — tampilkan setelah error POST]
            ├── <IconContainer>             ← ikon peringatan ⚠️ merah
            ├── <h2> Tautan Reset Tidak Valid
            ├── <ErrorBox>
            │   └── pesan penjelasan token kedaluwarsa
            └── <Button onClick={() => router.visit(route('password.request'))}>
                  Minta Tautan Reset Baru
                </Button>
```

---

## State

### Local State (useState)

```typescript
const [showPassword, setShowPassword] = useState(false);
const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
const [tokenExpired, setTokenExpired] = useState(false);
// tokenExpired di-set true jika server mengembalikan error token invalid
```

### Form State (useForm)

```typescript
// Inisialisasi dengan props dari server
const { token, email } = usePage<ResetPasswordProps>().props;

const { data, setData, post, processing, errors, reset } = useForm({
  token:                 token,   // dari props server — hidden
  email:                 email,   // dari props server — readonly
  password:              '',
  password_confirmation: '',
});

// processing                   → true saat POST berjalan
// errors.password               → pesan error password (min 8/confirmed)
// errors.password_confirmation  → tidak cocok
// errors.email                  → jarang, tapi bisa error token invalid
```

---

## Interactions & Events

```
1. FIELD EMAIL (readonly)
   Tidak ada interaksi — hanya menampilkan nilai dari props
   Secara teknis di-set via data.email dari useForm initial value
   User tidak bisa mengubah

2. INPUT PASSWORD BARU
   onChange      → setData('password', e.target.value)
   Klik ikon 👁  → toggle showPassword

3. INPUT KONFIRMASI PASSWORD
   onChange      → setData('password_confirmation', e.target.value)
   Klik ikon 👁  → toggle showPasswordConfirmation

4. SUBMIT FORM
   post(route('password.update'), {
     onSuccess: () => {
       // Server redirect ke /masuk + flash sukses
       // Inertia mengikuti redirect otomatis
       // Flash: 'Password Anda berhasil direset.'
     },
     onError: (errors) => {
       reset('password', 'password_confirmation');
       // Cek apakah token expired/invalid
       if (errors.email?.includes('token') || errors.token) {
         setTokenExpired(true);
       }
     },
   })

5. KLIK "← Kembali ke Login"
   → Link navigasi ke /masuk (Inertia visit)

6. KLIK "Minta Tautan Reset Baru" (state tokenExpired)
   → router.visit(route('password.request'))
   → Navigasi ke /lupa-password
```

---

## Navigation Flow

```
[User buka link email]
GET /reset-password/{token}?email={email}
    │
    ▼
  Server render props: { token, email }
    │
    ▼
  [Tampilkan form Reset Password]
    │
    ├── SUBMIT FORM (POST /reset-password)
    │       │
    │       ├── GAGAL — validasi (password < 8 char / tidak cocok)
    │       │       └── Kembali ke halaman yang sama
    │       │           errors.password / errors.password_confirmation terisi
    │       │           password fields di-reset (kosong)
    │       │
    │       ├── GAGAL — token expired/invalid
    │       │       └── setTokenExpired(true)
    │       │           → Form disembunyikan
    │       │           → Tampilkan state error dengan tombol ke /lupa-password
    │       │
    │       └── BERHASIL
    │               └── Server redirect ke /masuk
    │                   + flash.sukses: 'Password berhasil direset.'
    │                   FlashToast hijau muncul di halaman Login
    │
    └── KLIK "← Kembali ke Login"
            └── → /masuk

Catatan:
  Token berlaku satu kali pakai dan expired setelah 60 menit (default Laravel).
  Setelah berhasil digunakan, token dihapus dari tabel password_reset_tokens.
```
