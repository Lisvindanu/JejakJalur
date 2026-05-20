// JejakJalur — Admin pages (Dashboard, Kota, Stasiun, Destinasi, Pengguna, Ulasan, AI Session)

const AdminPageHeader = ({ judul, deskripsi, action }) => (
  <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
    <div>
      <h1 className="text-2xl font-bold text-stone-900 tracking-tight">{judul}</h1>
      {deskripsi && <p className="mt-1 text-sm text-stone-500">{deskripsi}</p>}
    </div>
    {action}
  </div>
);

// ──────────────── DASHBOARD ────────────────

const StatCard = ({ ikon, label, value, sub, tone = "emerald" }) => {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    sky: "bg-sky-50 text-sky-700",
    indigo: "bg-indigo-50 text-indigo-700",
    stone: "bg-stone-100 text-stone-700",
  };
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className={`inline-flex w-9 h-9 rounded-lg items-center justify-center ${tones[tone]}`}>
          <Icon name={ikon} className="w-4 h-4" />
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold text-stone-900 tabular-nums tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-stone-500">{label}</div>
      {sub && <div className="mt-2 text-xs text-stone-500">{sub}</div>}
    </div>
  );
};

const AdminDashboard = ({ nav, setFlash, destinasiState, setDestinasiState }) => {
  const pending = destinasiState.filter(d => !d.verified);
  const stats = {
    jumlah_kota: KOTA.length,
    jumlah_stasiun: STASIUN.length,
    jumlah_destinasi: destinasiState.length,
    destinasi_verified: destinasiState.filter(d => d.verified).length,
    destinasi_pending: pending.length,
    jumlah_pengguna: PENGGUNA.length,
    jumlah_ulasan: ULASAN.length,
    ai_pesan_hari_ini: 12,
  };

  const verifikasi = (id) => {
    setDestinasiState(prev => prev.map(d => d.id === id ? { ...d, verified: true } : d));
    setFlash({ tipe: "sukses", pesan: "Destinasi berhasil diverifikasi." });
  };

  return (
    <>
      <AdminPageHeader judul="Dashboard" deskripsi="Ringkasan platform JejakJalur." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard ikon="home" label="Kota" value={stats.jumlah_kota} tone="emerald" />
        <StatCard ikon="train" label="Stasiun" value={stats.jumlah_stasiun} tone="sky" />
        <StatCard ikon="mapPin" label="Destinasi" value={stats.jumlah_destinasi}
          sub={<><span className="text-emerald-700 font-medium">{stats.destinasi_verified} verified</span> · <span className="text-amber-700 font-medium">{stats.destinasi_pending} pending</span></>}
          tone="amber" />
        <StatCard ikon="users" label="Pengguna" value={stats.jumlah_pengguna} tone="indigo" />
        <StatCard ikon="star" label="Ulasan" value={stats.jumlah_ulasan} tone="rose" />
        <StatCard ikon="bot" label="AI pesan hari ini" value={stats.ai_pesan_hari_ini} tone="stone" />
      </div>

      <div className="mt-8 grid xl:grid-cols-2 gap-6">
        {/* Pending */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Destinasi Menunggu Verifikasi</h3>
              <p className="text-xs text-stone-500">{pending.length} antri menunggu moderator.</p>
            </div>
            <button onClick={() => nav("/admin/destinasi")} className="text-xs font-medium text-emerald-700 hover:text-emerald-800">Semua →</button>
          </div>
          {pending.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-stone-500">
              <Icon name="check" className="w-8 h-8 mx-auto text-emerald-500" />
              <div className="mt-2">Tidak ada destinasi yang menunggu verifikasi.</div>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {pending.slice(0, 4).map(d => {
                const kota = getKotaByStasiun(d.stasiunId);
                return (
                  <div key={d.id} className="px-5 py-3 flex items-center gap-3 hover:bg-stone-50">
                    <FotoPlaceholder gradient={d.gradient} ikon={d.ikon} className="w-10 h-10 rounded-lg shrink-0" showLabel={false} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-stone-800 truncate">{d.nama}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-1.5">
                        <Badge tone={kategoriTone(d.kategori)}>{d.kategori}</Badge>
                        <span>{kota?.nama || "—"}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => verifikasi(d.id)}><Icon name="check" className="w-3.5 h-3.5" />Verifikasi</Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ulasan terbaru */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Ulasan Terbaru</h3>
              <p className="text-xs text-stone-500">Pantau aktivitas komunitas.</p>
            </div>
            <button onClick={() => nav("/admin/ulasan")} className="text-xs font-medium text-emerald-700 hover:text-emerald-800">Semua →</button>
          </div>
          <div className="divide-y divide-stone-100">
            {ULASAN.slice(0, 4).map(u => {
              const d = DESTINASI.find(x => x.id === u.destinasiId);
              return (
                <div key={u.id} className="px-5 py-3 hover:bg-stone-50">
                  <div className="flex items-center justify-between gap-3">
                    <button onClick={() => nav("/destinasi/" + d.id)} className="text-sm font-medium text-stone-800 hover:text-emerald-700 truncate">{d?.nama}</button>
                    <StarRating nilai={u.rating} size="sm" />
                  </div>
                  <div className="mt-1 text-xs text-stone-500">{u.userName} · {new Date(u.tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aksi cepat */}
      <div className="mt-8 grid sm:grid-cols-3 gap-3">
        <button onClick={() => nav("/admin/kota")} className="bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40 rounded-xl px-5 py-4 text-left transition">
          <Icon name="plus" className="w-4 h-4 text-emerald-700" />
          <div className="mt-2 text-sm font-semibold text-stone-800">Tambah Kota</div>
          <div className="text-xs text-stone-500">Daftarkan kota baru ke sistem.</div>
        </button>
        <button onClick={() => nav("/admin/stasiun")} className="bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40 rounded-xl px-5 py-4 text-left transition">
          <Icon name="plus" className="w-4 h-4 text-emerald-700" />
          <div className="mt-2 text-sm font-semibold text-stone-800">Tambah Stasiun</div>
          <div className="text-xs text-stone-500">Hubungkan stasiun baru di jalur kereta.</div>
        </button>
        <button onClick={() => nav("/admin/destinasi")} className="bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40 rounded-xl px-5 py-4 text-left transition">
          <Icon name="plus" className="w-4 h-4 text-emerald-700" />
          <div className="mt-2 text-sm font-semibold text-stone-800">Tambah Destinasi</div>
          <div className="text-xs text-stone-500">Catat wisata, kuliner, atau UMKM.</div>
        </button>
      </div>
    </>
  );
};

// ──────────────── KOTA ────────────────

const AdminKota = ({ subroute, params, nav, setFlash }) => {
  const [search, setSearch] = React.useState("");
  const [hapusId, setHapusId] = React.useState(null);

  if (subroute === "/buat" || (subroute && subroute.startsWith("/edit"))) {
    const editId = subroute.startsWith("/edit") ? params.get("id") : null;
    const existing = editId ? KOTA.find(k => k.id === editId) : null;
    return <KotaForm existing={existing} onCancel={() => nav("/admin/kota")} onSimpan={(data) => {
      setFlash({ tipe: "sukses", pesan: `${data.nama} berhasil ${editId ? "diperbarui" : "ditambahkan"}.` });
      nav("/admin/kota");
    }} />;
  }

  const filtered = KOTA.filter(k => k.nama.toLowerCase().includes(search.toLowerCase()) || k.kode.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <AdminPageHeader judul="Manajemen Kota" deskripsi={`${KOTA.length} kota terdaftar di seluruh jaringan.`}
        action={<Button onClick={() => nav("/admin/kota/buat")}><Icon name="plus" className="w-4 h-4" />Tambah Kota</Button>} />

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100">
          <div className="relative max-w-xs">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input className="!pl-9" placeholder="Cari kota..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left w-12">#</th>
              <th className="px-5 py-3 text-left">Nama Kota</th>
              <th className="px-5 py-3 text-left">Kode</th>
              <th className="px-5 py-3 text-left">Stasiun</th>
              <th className="px-5 py-3 text-left">Destinasi</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((k, i) => (
              <tr key={k.id} className="hover:bg-stone-50">
                <td className="px-5 py-3 text-stone-400 tabular-nums">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-stone-800">{k.nama}</td>
                <td className="px-5 py-3 font-mono text-xs text-stone-500">{k.kode}</td>
                <td className="px-5 py-3"><Badge tone="sky">{stasiunCountByKota(k.id)}</Badge></td>
                <td className="px-5 py-3"><Badge tone="amber">{destinasiCountByKota(k.id)}</Badge></td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button onClick={() => nav(`/admin/kota/edit?id=${k.id}`)} className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500"><Icon name="pencil" className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setHapusId(k.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => { setFlash({ tipe: "sukses", pesan: "Kota berhasil dihapus." }); }}
        judul="Hapus kota?" pesan="Stasiun dan destinasi terkait juga akan terdampak." />
    </>
  );
};

const KotaForm = ({ existing, onCancel, onSimpan }) => {
  const [nama, setNama] = React.useState(existing?.nama || "");
  const [kode, setKode] = React.useState(existing?.kode || "");
  return (
    <div className="max-w-2xl">
      <AdminPageHeader judul={existing ? `Edit Kota: ${existing.nama}` : "Tambah Kota"} />
      <form onSubmit={(e) => { e.preventDefault(); onSimpan({ nama, kode }); }} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <FormField label="Nama Kota *">
          <Input value={nama} onChange={e => setNama(e.target.value)} required placeholder="Misalnya: Bandung" />
        </FormField>
        <FormField label="Kode Ibukota *" hint="3 huruf kapital, contoh: BDO untuk Bandung.">
          <Input value={kode} onChange={e => setKode(e.target.value.toUpperCase())} required maxLength={4} placeholder="BDO" className="!font-mono !uppercase !w-32" />
        </FormField>
        <FormField label="Foto Kota">
          <button type="button" className="w-full border-2 border-dashed border-stone-300 rounded-lg px-4 py-6 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition">
            <Icon name="upload" className="w-5 h-5 mx-auto text-stone-400" />
            <div className="mt-2 text-sm text-stone-600">Klik untuk pilih file</div>
            <div className="text-xs text-stone-400">PNG, JPG hingga 2MB</div>
          </button>
        </FormField>
        <div className="flex gap-2 pt-2">
          <Button type="submit">Simpan</Button>
          <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        </div>
      </form>
    </div>
  );
};

// ──────────────── STASIUN ────────────────

const AdminStasiun = ({ subroute, params, nav, setFlash }) => {
  const [search, setSearch] = React.useState("");
  const [hapusId, setHapusId] = React.useState(null);

  if (subroute === "/buat" || (subroute && subroute.startsWith("/edit"))) {
    const editId = subroute.startsWith("/edit") ? params.get("id") : null;
    const existing = editId ? STASIUN.find(s => s.id === editId) : null;
    return <StasiunForm existing={existing} onCancel={() => nav("/admin/stasiun")} onSimpan={(d) => {
      setFlash({ tipe: "sukses", pesan: `Stasiun ${d.nama} berhasil ${editId ? "diperbarui" : "ditambahkan"}.` });
      nav("/admin/stasiun");
    }} />;
  }

  const filtered = STASIUN.filter(s => {
    const kota = getKota(s.kotaId);
    const q = search.toLowerCase();
    return s.nama.toLowerCase().includes(q) || s.kode.toLowerCase().includes(q) || kota?.nama.toLowerCase().includes(q);
  });

  return (
    <>
      <AdminPageHeader judul="Manajemen Stasiun" deskripsi={`${STASIUN.length} stasiun aktif tersebar di ${KOTA.length} kota.`}
        action={<Button onClick={() => nav("/admin/stasiun/buat")}><Icon name="plus" className="w-4 h-4" />Tambah Stasiun</Button>} />
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100">
          <div className="relative max-w-xs">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input className="!pl-9" placeholder="Cari stasiun atau kota..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left">Nama Stasiun</th>
              <th className="px-5 py-3 text-left">Kode</th>
              <th className="px-5 py-3 text-left">Kota</th>
              <th className="px-5 py-3 text-left">Destinasi</th>
              <th className="px-5 py-3 text-left">Koordinat</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(s => {
              const k = getKota(s.kotaId);
              return (
                <tr key={s.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3 font-medium text-stone-800">{s.nama}</td>
                  <td className="px-5 py-3 font-mono text-xs text-stone-500">{s.kode}</td>
                  <td className="px-5 py-3 text-stone-600">{k?.nama}</td>
                  <td className="px-5 py-3"><Badge tone="amber">{destinasiCountByStasiun(s.id)}</Badge></td>
                  <td className="px-5 py-3 text-xs text-stone-400 font-mono">{s.lat?.toFixed(3)}, {s.lng?.toFixed(3)}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button onClick={() => nav(`/admin/stasiun/edit?id=${s.id}`)} className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500"><Icon name="pencil" className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setHapusId(s.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => setFlash({ tipe: "sukses", pesan: "Stasiun berhasil dihapus." })}
        judul="Hapus stasiun?" pesan="Destinasi yang terhubung dengan stasiun ini akan kehilangan asosiasinya." />
    </>
  );
};

const StasiunForm = ({ existing, onCancel, onSimpan }) => {
  const [nama, setNama] = React.useState(existing?.nama || "");
  const [kode, setKode] = React.useState(existing?.kode || "");
  const [kotaId, setKotaId] = React.useState(existing?.kotaId || "");
  const [lat, setLat] = React.useState(existing?.lat?.toString() || "");
  const [lng, setLng] = React.useState(existing?.lng?.toString() || "");
  return (
    <div className="max-w-2xl">
      <AdminPageHeader judul={existing ? `Edit Stasiun: ${existing.nama}` : "Tambah Stasiun"} />
      <form onSubmit={e => { e.preventDefault(); onSimpan({ nama, kode, kotaId, lat, lng }); }} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <FormField label="Nama Stasiun *"><Input value={nama} onChange={e => setNama(e.target.value)} required placeholder="Misalnya: Bandung" /></FormField>
        <FormField label="Kode Stasiun *" hint="2-4 huruf kapital."><Input value={kode} onChange={e => setKode(e.target.value.toUpperCase())} required maxLength={4} placeholder="BD" className="!font-mono !uppercase !w-32" /></FormField>
        <FormField label="Kota *"><Select value={kotaId} onChange={e => setKotaId(e.target.value)} required>
          <option value="">Pilih kota...</option>
          {KOTA.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
        </Select></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Latitude"><Input value={lat} onChange={e => setLat(e.target.value)} placeholder="-6.9145" /></FormField>
          <FormField label="Longitude"><Input value={lng} onChange={e => setLng(e.target.value)} placeholder="107.6024" /></FormField>
        </div>
        <div className="flex gap-2 pt-2"><Button type="submit">Simpan</Button><Button type="button" variant="ghost" onClick={onCancel}>Batal</Button></div>
      </form>
    </div>
  );
};

// ──────────────── DESTINASI ────────────────

const AdminDestinasi = ({ subroute, params, nav, setFlash, destinasiState, setDestinasiState }) => {
  const [search, setSearch] = React.useState("");
  const [kategori, setKategori] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [hapusId, setHapusId] = React.useState(null);

  if (subroute === "/buat" || (subroute && subroute.startsWith("/edit"))) {
    const editId = subroute.startsWith("/edit") ? params.get("id") : null;
    const existing = editId ? destinasiState.find(d => d.id === editId) : null;
    return <DestinasiForm existing={existing} onCancel={() => nav("/admin/destinasi")} onSimpan={(d) => {
      setFlash({ tipe: "sukses", pesan: `${d.nama} berhasil ${editId ? "diperbarui" : "ditambahkan"}.` });
      nav("/admin/destinasi");
    }} />;
  }

  const filtered = destinasiState.filter(d => {
    if (search && !d.nama.toLowerCase().includes(search.toLowerCase())) return false;
    if (kategori && d.kategori !== kategori) return false;
    if (status === "verified" && !d.verified) return false;
    if (status === "pending" && d.verified) return false;
    return true;
  });

  const verifikasi = (id) => {
    setDestinasiState(prev => prev.map(d => d.id === id ? { ...d, verified: true } : d));
    setFlash({ tipe: "sukses", pesan: "Destinasi berhasil diverifikasi." });
  };

  return (
    <>
      <AdminPageHeader judul="Manajemen Destinasi" deskripsi={`${destinasiState.length} destinasi tercatat. ${destinasiState.filter(d=>!d.verified).length} menunggu verifikasi.`}
        action={<Button onClick={() => nav("/admin/destinasi/buat")}><Icon name="plus" className="w-4 h-4" />Tambah Destinasi</Button>} />
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input className="!pl-9" placeholder="Cari destinasi..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={kategori} onChange={e => setKategori(e.target.value)} className="!w-36">
            <option value="">Semua Kategori</option><option>Wisata</option><option>Kuliner</option><option>UMKM</option>
          </Select>
          <Select value={status} onChange={e => setStatus(e.target.value)} className="!w-36">
            <option value="">Semua Status</option><option value="verified">Verified</option><option value="pending">Pending</option>
          </Select>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left">Nama</th>
              <th className="px-5 py-3 text-left">Kategori</th>
              <th className="px-5 py-3 text-left">Stasiun</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Rating</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(d => {
              const s = getStasiun(d.stasiunId);
              const k = getKota(s?.kotaId);
              return (
                <tr key={d.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <FotoPlaceholder gradient={d.gradient} ikon={d.ikon} className="w-9 h-9 rounded-md shrink-0" showLabel={false} />
                      <div>
                        <div className="font-medium text-stone-800">{d.nama}</div>
                        <div className="text-xs text-stone-500 truncate max-w-[260px]">{d.alamat}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge tone={kategoriTone(d.kategori)}>{d.kategori}</Badge></td>
                  <td className="px-5 py-3 text-stone-600 text-xs">{s?.nama}<br /><span className="text-stone-400">{k?.nama}</span></td>
                  <td className="px-5 py-3">{d.verified ? <Badge tone="emerald"><Icon name="check" className="w-3 h-3" />Verified</Badge> : <Badge tone="amber"><Icon name="clock" className="w-3 h-3" />Pending</Badge>}</td>
                  <td className="px-5 py-3 text-xs text-stone-600">{d.rating ? <span className="inline-flex items-center gap-1"><Icon name="star" className="w-3 h-3 fill-amber-500 text-amber-500" />{d.rating.toFixed(1)} ({d.ulasanCount})</span> : <span className="text-stone-400">—</span>}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      {!d.verified && <button onClick={() => verifikasi(d.id)} className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-600" title="Verifikasi"><Icon name="check" className="w-3.5 h-3.5" /></button>}
                      <button onClick={() => nav(`/admin/destinasi/edit?id=${d.id}`)} className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500"><Icon name="pencil" className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setHapusId(d.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => { setDestinasiState(prev => prev.filter(d => d.id !== hapusId)); setFlash({ tipe: "sukses", pesan: "Destinasi berhasil dihapus." }); }}
        judul="Hapus destinasi?" pesan="Semua ulasan terkait akan ikut terhapus." />
    </>
  );
};

const DestinasiForm = ({ existing, onCancel, onSimpan }) => {
  const [data, setData] = React.useState({
    nama: existing?.nama || "", kategori: existing?.kategori || "Wisata",
    deskripsi: existing?.deskripsi || "", alamat: existing?.alamat || "",
    stasiunId: existing?.stasiunId || "", lat: existing?.lat?.toString() || "",
    lng: existing?.lng?.toString() || "", verified: existing?.verified || false,
  });
  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  return (
    <div className="max-w-3xl">
      <AdminPageHeader judul={existing ? `Edit Destinasi: ${existing.nama}` : "Tambah Destinasi"} />
      <form onSubmit={e => { e.preventDefault(); onSimpan(data); }} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <div className="grid sm:grid-cols-[2fr,1fr] gap-4">
          <FormField label="Nama Destinasi *"><Input value={data.nama} onChange={set("nama")} required /></FormField>
          <FormField label="Kategori *"><Select value={data.kategori} onChange={set("kategori")}>
            <option>Wisata</option><option>Kuliner</option><option>UMKM</option>
          </Select></FormField>
        </div>
        <FormField label="Deskripsi *"><Textarea rows={4} value={data.deskripsi} onChange={set("deskripsi")} required placeholder="Cerita singkat tentang destinasi..." /></FormField>
        <FormField label="Alamat *"><Input value={data.alamat} onChange={set("alamat")} required placeholder="Jl. Padasuka No.118, Bandung" /></FormField>
        <FormField label="Stasiun *"><Select value={data.stasiunId} onChange={set("stasiunId")} required>
          <option value="">Pilih stasiun...</option>
          {STASIUN.map(s => <option key={s.id} value={s.id}>{s.nama} — {getKota(s.kotaId)?.nama}</option>)}
        </Select></FormField>
        <FormField label="Foto Destinasi">
          <button type="button" className="w-full border-2 border-dashed border-stone-300 rounded-lg px-4 py-6 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition">
            <Icon name="upload" className="w-5 h-5 mx-auto text-stone-400" />
            <div className="mt-2 text-sm text-stone-600">Klik untuk pilih file</div>
          </button>
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Latitude"><Input value={data.lat} onChange={set("lat")} placeholder="-6.9006" /></FormField>
          <FormField label="Longitude"><Input value={data.lng} onChange={set("lng")} placeholder="107.6571" /></FormField>
        </div>
        <Checkbox label="Tandai sebagai terverifikasi" checked={data.verified} onChange={set("verified")} />
        <div className="flex gap-2 pt-2"><Button type="submit">Simpan</Button><Button type="button" variant="ghost" onClick={onCancel}>Batal</Button></div>
      </form>
    </div>
  );
};

// ──────────────── PENGGUNA ────────────────

const AdminPengguna = ({ setFlash }) => {
  const [tab, setTab] = React.useState("aktif");
  const [search, setSearch] = React.useState("");
  const [hapusId, setHapusId] = React.useState(null);
  const dihapus = [{ id: "p-old", nama: "Old User", email: "old@example.com", deletedAt: "2026-05-10" }];

  const filtered = PENGGUNA.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <AdminPageHeader judul="Manajemen Pengguna" deskripsi={`${PENGGUNA.length} pengguna aktif terdaftar di JejakJalur.`} />
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input className="!pl-9" placeholder="Cari pengguna..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="inline-flex p-0.5 bg-stone-100 rounded-lg text-xs font-medium">
            <button onClick={() => setTab("aktif")} className={`h-8 px-3 rounded-md ${tab === "aktif" ? "bg-white shadow-sm text-stone-800" : "text-stone-500"}`}>Aktif ({PENGGUNA.length})</button>
            <button onClick={() => setTab("dihapus")} className={`h-8 px-3 rounded-md ${tab === "dihapus" ? "bg-white shadow-sm text-stone-800" : "text-stone-500"}`}>Dihapus ({dihapus.length})</button>
          </div>
        </div>
        {tab === "aktif" ? (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <tr><th className="px-5 py-3 text-left">Nama</th><th className="px-5 py-3 text-left">Email</th><th className="px-5 py-3 text-left">Role</th><th className="px-5 py-3 text-left">Bergabung</th><th className="px-5 py-3 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar nama={p.nama} size="sm" /><span className="font-medium text-stone-800">{p.nama}</span></div></td>
                  <td className="px-5 py-3 text-stone-600 text-xs">{p.email}</td>
                  <td className="px-5 py-3">{p.isAdmin ? <Badge tone="emerald">Admin</Badge> : <Badge tone="stone">Pengguna</Badge>}</td>
                  <td className="px-5 py-3 text-xs text-stone-500">{new Date(p.joined).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Button size="sm" variant="secondary" onClick={() => setFlash({ tipe: "sukses", pesan: p.isAdmin ? "Akses admin dicabut." : "Diberi akses admin." })}>{p.isAdmin ? "Cabut Admin" : "Jadikan Admin"}</Button>
                      <button onClick={() => setHapusId(p.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <tr><th className="px-5 py-3 text-left">Nama</th><th className="px-5 py-3 text-left">Email</th><th className="px-5 py-3 text-left">Dihapus</th><th className="px-5 py-3 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {dihapus.map(p => (
                <tr key={p.id}>
                  <td className="px-5 py-3 text-stone-500">{p.nama}</td>
                  <td className="px-5 py-3 text-stone-400 text-xs">{p.email}</td>
                  <td className="px-5 py-3 text-xs text-stone-400">{p.deletedAt}</td>
                  <td className="px-5 py-3 text-right"><Button size="sm" variant="secondary" onClick={() => setFlash({ tipe: "sukses", pesan: "Pengguna berhasil dipulihkan." })}><Icon name="refresh" className="w-3.5 h-3.5" />Pulihkan</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => setFlash({ tipe: "sukses", pesan: "Pengguna dihapus." })}
        judul="Hapus pengguna?" pesan="Pengguna akan masuk ke tab Dihapus dan bisa dipulihkan." />
    </>
  );
};

// ──────────────── ULASAN ────────────────

const AdminUlasan = ({ setFlash }) => {
  const [search, setSearch] = React.useState("");
  const [hapusId, setHapusId] = React.useState(null);
  const [expanded, setExpanded] = React.useState(null);
  const filtered = ULASAN.filter(u => {
    const d = DESTINASI.find(x => x.id === u.destinasiId);
    const q = search.toLowerCase();
    return !q || d?.nama.toLowerCase().includes(q) || u.userName.toLowerCase().includes(q);
  });
  return (
    <>
      <AdminPageHeader judul="Manajemen Ulasan" deskripsi={`${ULASAN.length} ulasan dari komunitas.`} />
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 relative max-w-md">
          <Icon name="search" className="w-4 h-4 absolute left-8 top-1/2 -translate-y-1/2 text-stone-400" />
          <Input className="!pl-9" placeholder="Cari destinasi atau pengguna..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <tr><th className="px-5 py-3 text-left">Destinasi</th><th className="px-5 py-3 text-left">Pengguna</th><th className="px-5 py-3 text-left">Rating</th><th className="px-5 py-3 text-left">Tanggal</th><th className="px-5 py-3 text-right">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(u => {
              const d = DESTINASI.find(x => x.id === u.destinasiId);
              const isExp = expanded === u.id;
              return (
                <React.Fragment key={u.id}>
                  <tr onClick={() => setExpanded(isExp ? null : u.id)} className="hover:bg-stone-50 cursor-pointer">
                    <td className="px-5 py-3 font-medium text-stone-800">{d?.nama}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><Avatar nama={u.userName} size="sm" /><span className="text-stone-700">{u.userName}</span></div></td>
                    <td className="px-5 py-3"><StarRating nilai={u.rating} size="sm" /></td>
                    <td className="px-5 py-3 text-xs text-stone-500">{new Date(u.tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td className="px-5 py-3 text-right"><button onClick={(e) => { e.stopPropagation(); setHapusId(u.id); }} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button></td>
                  </tr>
                  {isExp && (
                    <tr><td colSpan="5" className="px-5 py-4 bg-stone-50/60">
                      <div className="text-sm font-semibold text-stone-800">{u.judul}</div>
                      <p className="mt-1 text-sm text-stone-600">{u.konten}</p>
                    </td></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => setFlash({ tipe: "sukses", pesan: "Ulasan berhasil dihapus." })}
        judul="Hapus ulasan?" pesan="Ulasan akan dihapus permanen dari destinasi." />
    </>
  );
};

// ──────────────── AI SESSION ────────────────

const AdminAiSession = ({ setFlash }) => {
  const [hapusId, setHapusId] = React.useState(null);
  const sesi = [
    { id: "ai-1", user: "Dewi Lestari", email: "dewi.l@example.com", pesan: 24 },
    { id: "ai-2", user: "Rizki Pratama", email: "rizki.p@example.com", pesan: 12 },
    { id: "ai-3", user: "Maya Saraswati", email: "maya.s@example.com", pesan: 8 },
    { id: "ai-4", user: "Guest-1827", email: "—", pesan: 3 },
    { id: "ai-5", user: "Guest-9032", email: "—", pesan: 17 },
  ];
  return (
    <>
      <AdminPageHeader judul="Sesi Jejak AI" deskripsi="Pantau dan kelola riwayat percakapan Jejak AI per pengguna." />
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <tr><th className="px-5 py-3 text-left">Pengguna</th><th className="px-5 py-3 text-left">Email</th><th className="px-5 py-3 text-left">Pesan</th><th className="px-5 py-3 text-right">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sesi.map(s => (
              <tr key={s.id} className="hover:bg-stone-50">
                <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar nama={s.user} size="sm" /><span className="font-medium text-stone-800">{s.user}</span></div></td>
                <td className="px-5 py-3 text-stone-500 text-xs">{s.email}</td>
                <td className="px-5 py-3"><Badge tone="stone">{s.pesan} pesan</Badge></td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <Button size="sm" variant="secondary" onClick={() => setFlash({ tipe: "sukses", pesan: "Sesi AI berhasil direset." })}><Icon name="refresh" className="w-3.5 h-3.5" />Reset</Button>
                    <button onClick={() => setHapusId(s.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500"><Icon name="trash" className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => setFlash({ tipe: "sukses", pesan: "Sesi AI berhasil dihapus." })}
        judul="Hapus sesi AI?" pesan="Seluruh riwayat percakapan akan hilang permanen." />
    </>
  );
};

Object.assign(window, {
  AdminDashboard, AdminKota, AdminStasiun, AdminDestinasi,
  AdminPengguna, AdminUlasan, AdminAiSession,
});
