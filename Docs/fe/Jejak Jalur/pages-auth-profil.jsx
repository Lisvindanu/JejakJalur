// JejakJalur — Auth pages (Login, Daftar, LupaPassword, ResetPassword)

const AuthCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8">
    <div className="text-center mb-7">
      <div className="flex justify-center mb-3"><Brand size="lg" /></div>
      <h1 className="text-xl font-bold text-stone-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const LoginPage = ({ nav, onLogin, setFlash }) => {
  const [email, setEmail] = React.useState("dewi.l@example.com");
  const [password, setPassword] = React.useState("password");
  const [ingat, setIngat] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const submit = (e) => {
    e.preventDefault();
    setErrors({});
    const eErr = {};
    if (!email) eErr.email = "Email wajib diisi.";
    if (!password) eErr.password = "Password wajib diisi.";
    if (Object.keys(eErr).length) { setErrors(eErr); return; }
    setProcessing(true);
    setTimeout(() => {
      const user = PENGGUNA.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        setErrors({ email: "Email tidak terdaftar." });
        setProcessing(false);
        return;
      }
      onLogin(user);
      setFlash({ tipe: "sukses", pesan: `Selamat datang kembali, ${user.nama}!` });
      nav("/");
    }, 500);
  };

  return (
    <AuthCard title="Masuk ke akun Anda" subtitle="Lanjutkan menjelajah jalur Indonesia.">
      <OAuthButtons verb="Masuk" />
      <Divider label="atau" />
      <form onSubmit={submit} className="space-y-4">
        <FormField label="Email" error={errors.email}>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="anda@email.com" error={errors.email} autoComplete="email" />
        </FormField>
        <FormField error={errors.password}>
          <div className="flex justify-between items-baseline mb-1.5">
            <Label className="!mb-0">Password</Label>
            <button type="button" onClick={() => nav("/lupa-password")} className="text-xs text-emerald-700 hover:text-emerald-800 font-medium">Lupa password?</button>
          </div>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" error={errors.password} autoComplete="current-password" />
        </FormField>
        <Checkbox label="Ingat saya" checked={ingat} onChange={e => setIngat(e.target.checked)} />
        <Button type="submit" className="!w-full" loading={processing}>{processing ? "Memproses..." : "Masuk"}</Button>
      </form>
      <div className="mt-6 text-center text-sm text-stone-500">
        Belum punya akun? <button onClick={() => nav("/daftar")} className="text-emerald-700 hover:text-emerald-800 font-semibold">Daftar</button>
      </div>
      <div className="mt-4 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-500 leading-relaxed">
        <span className="font-semibold text-stone-600">Demo:</span> pakai email apapun dari daftar berikut untuk login —
        <code className="ml-1 px-1.5 py-0.5 rounded bg-white border border-stone-200 font-mono text-[10px]">admin@jejakjalur.id</code>,
        <code className="ml-1 px-1.5 py-0.5 rounded bg-white border border-stone-200 font-mono text-[10px]">dewi.l@example.com</code>
      </div>
    </AuthCard>
  );
};

const DaftarPage = ({ nav, onLogin, setFlash }) => {
  const [data, setData] = React.useState({ nama: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = React.useState({});
  const [processing, setProcessing] = React.useState(false);
  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!data.nama) er.nama = "Nama wajib diisi.";
    if (!data.email) er.email = "Email wajib diisi.";
    if (!data.password) er.password = "Password wajib diisi.";
    else if (data.password.length < 8) er.password = "Minimal 8 karakter.";
    if (data.password !== data.confirm) er.confirm = "Konfirmasi password tidak cocok.";
    if (Object.keys(er).length) { setErrors(er); return; }
    setProcessing(true);
    setTimeout(() => {
      const baru = { id: "p-baru-" + Date.now(), nama: data.nama, email: data.email, isAdmin: false, joined: new Date().toISOString().slice(0, 10) };
      onLogin(baru);
      setFlash({ tipe: "sukses", pesan: "Akun berhasil dibuat. Selamat datang!" });
      nav("/");
    }, 600);
  };

  return (
    <AuthCard title="Buat akun baru" subtitle="Bergabung dengan komunitas pejalan rel.">
      <OAuthButtons verb="Daftar" />
      <Divider label="atau" />
      <form onSubmit={submit} className="space-y-4">
        <FormField label="Nama Lengkap" error={errors.nama}>
          <Input value={data.nama} onChange={set("nama")} placeholder="Nama Anda" error={errors.nama} />
        </FormField>
        <FormField label="Email" error={errors.email}>
          <Input type="email" value={data.email} onChange={set("email")} placeholder="anda@email.com" error={errors.email} />
        </FormField>
        <FormField label="Password" error={errors.password} hint="Minimal 8 karakter.">
          <Input type="password" value={data.password} onChange={set("password")} placeholder="••••••••" error={errors.password} />
        </FormField>
        <FormField label="Konfirmasi Password" error={errors.confirm}>
          <Input type="password" value={data.confirm} onChange={set("confirm")} placeholder="••••••••" error={errors.confirm} />
        </FormField>
        <Button type="submit" className="!w-full" loading={processing}>{processing ? "Memproses..." : "Daftar"}</Button>
      </form>
      <div className="mt-6 text-center text-sm text-stone-500">
        Sudah punya akun? <button onClick={() => nav("/masuk")} className="text-emerald-700 hover:text-emerald-800 font-semibold">Masuk</button>
      </div>
    </AuthCard>
  );
};

const LupaPasswordPage = ({ nav }) => {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const submit = (e) => {
    e.preventDefault(); if (!email) return;
    setProcessing(true);
    setTimeout(() => { setSent(true); setProcessing(false); }, 600);
  };
  return (
    <AuthCard title="Lupa Password" subtitle="Kami akan mengirimkan tautan untuk reset password Anda.">
      {sent ? (
        <div className="space-y-4">
          <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 flex items-start gap-2">
            <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold">Tautan reset telah dikirim</div>
              <div className="mt-1 text-emerald-700">Periksa kotak masuk <span className="font-medium">{email}</span>. Jika tidak ada, cek folder spam.</div>
            </div>
          </div>
          <Button variant="secondary" className="!w-full" onClick={() => nav("/masuk")}>← Kembali ke halaman masuk</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <FormField label="Email">
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="anda@email.com" />
          </FormField>
          <Button type="submit" className="!w-full" loading={processing}>{processing ? "Mengirim..." : "Kirim Tautan Reset"}</Button>
          <button type="button" onClick={() => nav("/masuk")} className="w-full text-center text-sm text-stone-500 hover:text-stone-700 inline-flex items-center justify-center gap-1.5">
            <Icon name="arrowLeft" className="w-3.5 h-3.5" /> Kembali ke halaman masuk
          </button>
        </form>
      )}
    </AuthCard>
  );
};

const ResetPasswordPage = ({ nav, setFlash }) => {
  const [data, setData] = React.useState({ password: "", confirm: "" });
  const [errors, setErrors] = React.useState({});
  const [processing, setProcessing] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!data.password) er.password = "Wajib diisi.";
    else if (data.password.length < 8) er.password = "Minimal 8 karakter.";
    if (data.password !== data.confirm) er.confirm = "Konfirmasi tidak cocok.";
    if (Object.keys(er).length) { setErrors(er); return; }
    setProcessing(true);
    setTimeout(() => {
      setFlash({ tipe: "sukses", pesan: "Password berhasil diubah. Silakan masuk." });
      nav("/masuk");
    }, 500);
  };
  return (
    <AuthCard title="Buat Password Baru" subtitle="Pilih password yang kuat dan jangan dibagikan.">
      <form onSubmit={submit} className="space-y-4">
        <FormField label="Email">
          <Input type="email" value="dewi.l@example.com" readOnly className="!bg-stone-50 !text-stone-500" />
        </FormField>
        <FormField label="Password Baru" error={errors.password} hint="Minimal 8 karakter.">
          <Input type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} placeholder="••••••••" error={errors.password} />
        </FormField>
        <FormField label="Konfirmasi Password Baru" error={errors.confirm}>
          <Input type="password" value={data.confirm} onChange={e => setData(d => ({ ...d, confirm: e.target.value }))} placeholder="••••••••" error={errors.confirm} />
        </FormField>
        <Button type="submit" className="!w-full" loading={processing}>Simpan Password Baru</Button>
      </form>
    </AuthCard>
  );
};

// ──────────────── PROFIL ────────────────

const ProfilTampilkan = ({ user, nav }) => {
  const userUlasan = ULASAN.filter(u => u.userId === user.id);
  const avgRating = userUlasan.length ? userUlasan.reduce((a, u) => a + u.rating, 0) / userUlasan.length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar nama={user.nama} size="xl" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-stone-900">{user.nama}</h1>
            <div className="mt-1 text-sm text-stone-500">{user.email}</div>
            <div className="mt-1 text-xs text-stone-400">Bergabung sejak {new Date(user.joined || "2026-01-01").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => nav("/profil/edit")}><Icon name="pencil" className="w-4 h-4" />Edit Profil</Button>
              {user.isAdmin && <Button variant="secondary" onClick={() => nav("/admin")}><Icon name="settings" className="w-4 h-4" />Admin Panel</Button>}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Stat label="Ulasan ditulis" value={userUlasan.length} ikon="pencil" />
          <Stat label="Rata-rata rating" value={avgRating ? avgRating.toFixed(1) : "—"} ikon="star" />
          <Stat label="Destinasi diulas" value={new Set(userUlasan.map(u => u.destinasiId)).size} ikon="mapPin" />
        </div>
      </div>

      <div className="mt-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-stone-900">Ulasan Saya <span className="text-stone-400 font-normal text-sm">({userUlasan.length} terbaru)</span></h2>
        </div>
        {userUlasan.length === 0 ? (
          <div className="py-10 text-center text-stone-500 border-2 border-dashed border-stone-200 rounded-xl">
            <Icon name="pencil" className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            <div className="text-sm">Kamu belum menulis ulasan.</div>
            <Button variant="secondary" className="mt-3" onClick={() => nav("/destinasi")}>Jelajahi Destinasi</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userUlasan.map(u => {
              const d = DESTINASI.find(x => x.id === u.destinasiId);
              return (
                <div key={u.id} className="flex gap-4 p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition">
                  <FotoPlaceholder gradient={d?.gradient || ""} ikon={d?.ikon || "mountain"} className="w-20 h-20 rounded-lg shrink-0" showLabel={false} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <button onClick={() => nav("/destinasi/" + d.id)} className="text-sm font-semibold text-stone-800 hover:text-emerald-700 text-left">{d?.nama}</button>
                      <span className="text-xs text-stone-400 shrink-0">{new Date(u.tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>
                    </div>
                    <StarRating nilai={u.rating} size="sm" className="mt-1" />
                    <p className="mt-1 text-sm text-stone-600 line-clamp-2">{u.konten}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value, ikon }) => (
  <div className="flex items-center gap-3">
    <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 inline-flex items-center justify-center">
      <Icon name={ikon} className="w-5 h-5" />
    </span>
    <div>
      <div className="text-xl font-bold text-stone-900 tabular-nums">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  </div>
);

const ProfilEdit = ({ user, nav, onUpdate, onLogout, setFlash }) => {
  const [nama, setNama] = React.useState(user.nama);
  const [email, setEmail] = React.useState(user.email);
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [hapusOpen, setHapusOpen] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!nama) er.nama = "Nama wajib diisi.";
    if (!email) er.email = "Email wajib diisi.";
    if (pw && pw.length < 8) er.pw = "Minimal 8 karakter.";
    if (pw && pw !== confirm) er.confirm = "Tidak cocok.";
    if (Object.keys(er).length) { setErrors(er); return; }
    onUpdate({ ...user, nama, email });
    setFlash({ tipe: "sukses", pesan: "Profil berhasil diperbarui." });
    nav("/profil");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-xs text-stone-400 mb-3">
        <button onClick={() => nav("/profil")} className="hover:text-emerald-700">Profil</button> / Edit
      </div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Edit Profil</h1>

      <form onSubmit={submit} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <FormField label="Nama Lengkap" error={errors.nama}>
          <Input value={nama} onChange={e => setNama(e.target.value)} error={errors.nama} />
        </FormField>
        <FormField label="Email" error={errors.email}>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        </FormField>
        <Divider label="Ubah Password (opsional)" />
        <FormField label="Password Baru" error={errors.pw} hint="Kosongkan jika tidak diganti. Minimal 8 karakter.">
          <Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" error={errors.pw} />
        </FormField>
        <FormField label="Konfirmasi Password Baru" error={errors.confirm}>
          <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" error={errors.confirm} />
        </FormField>
        <div className="flex gap-2 pt-2">
          <Button type="submit">Simpan Perubahan</Button>
          <Button type="button" variant="ghost" onClick={() => nav("/profil")}>Batal</Button>
        </div>
      </form>

      <div className="mt-6 bg-white border border-red-200 rounded-2xl p-6 sm:p-8">
        <h3 className="font-semibold text-red-700">Zona Bahaya</h3>
        <p className="mt-1 text-sm text-stone-600">Tindakan ini tidak dapat dibatalkan. Semua ulasan dan data Anda akan dihapus permanen.</p>
        <Button variant="dangerOutline" className="mt-4" onClick={() => setHapusOpen(true)}><Icon name="trash" className="w-4 h-4" />Hapus Akun Saya</Button>
      </div>

      <ConfirmDialog open={hapusOpen} onClose={() => setHapusOpen(false)}
        onConfirm={() => { onLogout(); setFlash({ tipe: "sukses", pesan: "Akun berhasil dihapus." }); nav("/"); }}
        judul="Yakin ingin menghapus akun?"
        pesan="Semua ulasan, sesi AI, dan data akun Anda akan hilang permanen."
        tombolKonfirmasi="Ya, hapus akun saya" />
    </div>
  );
};

Object.assign(window, { LoginPage, DaftarPage, LupaPasswordPage, ResetPasswordPage, ProfilTampilkan, ProfilEdit });
