// JejakJalur — Destinasi Indeks (/destinasi) + Detail (/destinasi/:id)

const DestinasiIndeks = ({ nav, params }) => {
  const initialKota = params.get("kota") || "";
  const [search, setSearch] = React.useState("");
  const [kategori, setKategori] = React.useState("");
  const [kota, setKota] = React.useState(initialKota);
  const [sort, setSort] = React.useState("rating");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => { setPage(1); }, [search, kategori, kota, sort]);

  const filtered = React.useMemo(() => {
    let arr = DESTINASI.filter(d => d.verified);
    if (search) arr = arr.filter(d => d.nama.toLowerCase().includes(search.toLowerCase()) || d.deskripsi.toLowerCase().includes(search.toLowerCase()));
    if (kategori) arr = arr.filter(d => d.kategori === kategori);
    if (kota) {
      const sIds = STASIUN.filter(s => s.kotaId === kota).map(s => s.id);
      arr = arr.filter(d => sIds.includes(d.stasiunId));
    }
    if (sort === "rating") arr.sort((a,b) => b.rating - a.rating);
    else if (sort === "nama") arr.sort((a,b) => a.nama.localeCompare(b.nama));
    else arr.sort((a,b) => b.ulasanCount - a.ulasanCount);
    return arr;
  }, [search, kategori, kota, sort]);

  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  const reset = () => { setSearch(""); setKategori(""); setKota(""); setSort("rating"); };
  const filterAktif = search || kategori || kota;

  return (
    <>
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">
            <button onClick={() => nav("/")} className="hover:text-emerald-700">Beranda</button> / Destinasi
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Destinasi Wisata</h1>
          <p className="mt-2 text-stone-600">Temukan destinasi terbaik di sekitar stasiun kereta.</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari destinasi..." className="!pl-9" />
          </div>
          <Select value={kategori} onChange={e => setKategori(e.target.value)} className="!w-40">
            <option value="">Semua Kategori</option>
            <option value="Wisata">Wisata</option>
            <option value="Kuliner">Kuliner</option>
            <option value="UMKM">UMKM</option>
          </Select>
          <Select value={kota} onChange={e => setKota(e.target.value)} className="!w-40">
            <option value="">Semua Kota</option>
            {KOTA.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
          </Select>
          <Select value={sort} onChange={e => setSort(e.target.value)} className="!w-44">
            <option value="rating">Urut: Rating Tertinggi</option>
            <option value="nama">Urut: Nama (A-Z)</option>
            <option value="terbaru">Urut: Terbaru</option>
          </Select>
          {filterAktif && <Button variant="ghost" size="md" onClick={reset}>Reset</Button>}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5 text-sm text-stone-500">
          <span><span className="font-medium text-stone-700">{filtered.length}</span> destinasi ditemukan</span>
          {filterAktif && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {search && <Badge tone="stone">"{search}"<button onClick={() => setSearch("")} className="ml-1 opacity-60 hover:opacity-100"><Icon name="x" className="w-3 h-3" /></button></Badge>}
              {kategori && <Badge tone={kategoriTone(kategori)}>{kategori}<button onClick={() => setKategori("")} className="ml-1 opacity-60 hover:opacity-100"><Icon name="x" className="w-3 h-3" /></button></Badge>}
              {kota && <Badge tone="stone">{getKota(kota)?.nama}<button onClick={() => setKota("")} className="ml-1 opacity-60 hover:opacity-100"><Icon name="x" className="w-3 h-3" /></button></Badge>}
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-stone-200 rounded-2xl">
            <Icon name="search" className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <h3 className="text-base font-semibold text-stone-700">Tidak ada destinasi ditemukan</h3>
            <p className="mt-1 text-sm text-stone-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
            <Button variant="secondary" className="mt-4" onClick={reset}>Reset Filter</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(d => <DestinasiCard key={d.id} destinasi={d} onClick={() => nav("/destinasi/" + d.id)} />)}
          </div>
        )}

        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
    </>
  );
};

// ──────────────── DESTINASI DETAIL ────────────────

const DestinasiDetail = ({ id, nav, user, flash, setFlash }) => {
  const dest = DESTINASI.find(d => d.id === id);
  const [showForm, setShowForm] = React.useState(false);
  const [ulasanRating, setUlasanRating] = React.useState(5);
  const [ulasanJudul, setUlasanJudul] = React.useState("");
  const [ulasanKonten, setUlasanKonten] = React.useState("");
  const [ulasanList, setUlasanList] = React.useState(() => ULASAN.filter(u => u.destinasiId === id));
  const [editingId, setEditingId] = React.useState(null);
  const [hapusId, setHapusId] = React.useState(null);
  const mapRef = React.useRef(null);
  const mapInstRef = React.useRef(null);

  if (!dest) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-800">Destinasi tidak ditemukan</h1>
        <Button className="mt-4" onClick={() => nav("/destinasi")}>Kembali ke daftar</Button>
      </div>
    );
  }

  const stasiun = getStasiun(dest.stasiunId);
  const kota = getKota(stasiun.kotaId);
  const myUlasan = user ? ulasanList.find(u => u.userId === user.id) : null;
  const canUlasan = user && !myUlasan;

  // init mini map
  React.useEffect(() => {
    if (!mapRef.current || !window.L || mapInstRef.current) return;
    if (!stasiun.lat || !dest.lat) return;
    const map = window.L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18 }).addTo(map);
    const stMarker = window.L.circleMarker([stasiun.lat, stasiun.lng], { color: "#fff", weight: 2, fillColor: "#2563eb", fillOpacity: 1, radius: 8 }).addTo(map).bindTooltip("Stasiun " + stasiun.nama);
    const dMarker = window.L.circleMarker([dest.lat, dest.lng], { color: "#fff", weight: 2, fillColor: "#dc2626", fillOpacity: 1, radius: 8 }).addTo(map).bindTooltip(dest.nama);
    window.L.polyline([[stasiun.lat, stasiun.lng], [dest.lat, dest.lng]], { color: "#6b7280", weight: 2, dashArray: "4 6" }).addTo(map);
    const group = window.L.featureGroup([stMarker, dMarker]);
    map.fitBounds(group.getBounds().pad(0.4));
    mapInstRef.current = map;
    return () => { map.remove(); mapInstRef.current = null; };
  }, [id]);

  const submitUlasan = (e) => {
    e.preventDefault();
    if (!ulasanJudul.trim() || !ulasanKonten.trim()) return;
    if (editingId) {
      setUlasanList(list => list.map(u => u.id === editingId ? { ...u, rating: ulasanRating, judul: ulasanJudul, konten: ulasanKonten } : u));
      setFlash({ tipe: "sukses", pesan: "Ulasan berhasil diperbarui." });
    } else {
      const baru = {
        id: "u-baru-" + Date.now(),
        destinasiId: dest.id,
        userId: user.id,
        userName: user.nama,
        rating: ulasanRating,
        judul: ulasanJudul,
        konten: ulasanKonten,
        tgl: new Date().toISOString().slice(0, 10),
      };
      setUlasanList(list => [baru, ...list]);
      setFlash({ tipe: "sukses", pesan: "Ulasan berhasil dikirim. Terima kasih!" });
    }
    setShowForm(false);
    setEditingId(null);
    setUlasanJudul(""); setUlasanKonten(""); setUlasanRating(5);
  };

  const editUlasan = (u) => {
    setEditingId(u.id);
    setUlasanRating(u.rating);
    setUlasanJudul(u.judul);
    setUlasanKonten(u.konten);
    setShowForm(true);
  };

  const ratingRataRata = ulasanList.length ? (ulasanList.reduce((a, u) => a + u.rating, 0) / ulasanList.length) : dest.rating;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      {/* breadcrumb */}
      <div className="text-xs text-stone-400 mb-4">
        <button onClick={() => nav("/")} className="hover:text-emerald-700">Beranda</button> /{" "}
        <button onClick={() => nav("/destinasi")} className="hover:text-emerald-700">Destinasi</button> /{" "}
        <span className="text-stone-600">{dest.nama}</span>
      </div>

      {/* hero image */}
      <div className="relative rounded-2xl overflow-hidden">
        <FotoPlaceholder gradient={dest.gradient} ikon={dest.ikon} className="w-full aspect-[2.6/1] min-h-[280px]" showLabel={false} />
        <div className="absolute top-5 left-5 flex gap-2">
          <Badge tone={kategoriTone(dest.kategori)} className="!bg-white">{dest.kategori}</Badge>
          {dest.verified && <Badge tone="emerald" className="!bg-white"><Icon name="badge" className="w-3 h-3" />Terverifikasi</Badge>}
        </div>
      </div>

      {/* content grid */}
      <div className="mt-8 grid lg:grid-cols-[1.7fr,1fr] gap-10">
        {/* main */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{dest.nama}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-stone-500">
            <StarRating nilai={ratingRataRata} size="md" />
            <span className="font-medium text-stone-700">{ratingRataRata.toFixed(1)}</span>
            <span>· {ulasanList.length} ulasan</span>
          </div>
          <div className="mt-6 prose prose-stone max-w-none">
            <p className="text-stone-700 leading-relaxed text-[15px]">{dest.deskripsi}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => window.open(`https://maps.google.com/?q=${dest.lat},${dest.lng}`, "_blank")}>
              <Icon name="mapPin" className="w-4 h-4" /> Buka di Google Maps
            </Button>
            <Button variant="secondary" onClick={() => nav("/rute?stasiun=" + stasiun.id)}>
              <Icon name="route" className="w-4 h-4" /> Rute dari Stasiun Ini
            </Button>
          </div>

          {/* ulasan section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-stone-900">Ulasan <span className="text-stone-400 font-normal">({ulasanList.length})</span></h2>
              {canUlasan && !showForm && <Button onClick={() => setShowForm(true)}><Icon name="pencil" className="w-4 h-4" /> Tulis Ulasan</Button>}
              {!user && <Button variant="secondary" onClick={() => nav("/masuk")}>Masuk untuk Ulas</Button>}
            </div>

            {/* form */}
            {showForm && (
              <form onSubmit={submitUlasan} className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
                <div className="text-sm font-semibold text-stone-800 mb-3">{editingId ? "Edit Ulasan" : "Tulis Ulasan Anda"}</div>
                <div className="space-y-3">
                  <div>
                    <Label>Rating</Label>
                    <InteractiveStars value={ulasanRating} onChange={setUlasanRating} />
                  </div>
                  <FormField label="Judul">
                    <Input value={ulasanJudul} onChange={e => setUlasanJudul(e.target.value)} placeholder="Pengalaman singkat..." />
                  </FormField>
                  <FormField label="Ulasan">
                    <Textarea value={ulasanKonten} onChange={e => setUlasanKonten(e.target.value)} rows={4} placeholder="Ceritakan pengalaman Anda di sini..." />
                  </FormField>
                  <div className="flex gap-2 pt-1">
                    <Button type="submit">Kirim Ulasan</Button>
                    <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>Batal</Button>
                  </div>
                </div>
              </form>
            )}

            {ulasanList.length === 0 ? (
              <div className="py-10 text-center text-stone-500 border-2 border-dashed border-stone-200 rounded-xl">
                <Icon name="star" className="w-8 h-8 mx-auto text-stone-300" />
                <div className="mt-2 text-sm">Belum ada ulasan. Jadilah yang pertama!</div>
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-xl px-5">
                {ulasanList.map(u => (
                  <UlasanCard key={u.id} ulasan={u} milikSendiri={user && u.userId === user.id}
                    onEdit={() => editUlasan(u)} onHapus={() => setHapusId(u.id)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* sidebar */}
        <aside className="space-y-5">
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <div className="text-sm font-semibold text-stone-800 mb-3">Informasi</div>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3"><Icon name="mapPin" className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" /><div><dt className="text-xs text-stone-400">Alamat</dt><dd className="text-stone-700">{dest.alamat}</dd></div></div>
              <div className="flex gap-3"><Icon name="train" className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" /><div><dt className="text-xs text-stone-400">Stasiun Terdekat</dt><dd className="text-stone-700">{stasiun.nama} ({stasiun.kode})</dd></div></div>
              <div className="flex gap-3"><Icon name="home" className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" /><div><dt className="text-xs text-stone-400">Kota</dt><dd className="text-stone-700">{kota.nama}</dd></div></div>
              <div className="flex gap-3"><Icon name="filter" className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" /><div><dt className="text-xs text-stone-400">Kategori</dt><dd className="text-stone-700">{dest.kategori}</dd></div></div>
            </dl>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="px-5 pt-4 pb-2 text-sm font-semibold text-stone-800">Lokasi</div>
            <div ref={mapRef} className="h-56 bg-stone-100" />
            <div className="px-5 py-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600" />Destinasi</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" />Stasiun</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <Icon name="mapPin" className="w-5 h-5 text-emerald-700" />
            <div className="mt-2 text-sm font-semibold text-stone-800">Jarak dari posisi kamu</div>
            <div className="mt-1 text-xs text-stone-500">Aktifkan lokasi untuk melihat jarak tempuh ke destinasi.</div>
            <Button variant="ghost" size="sm" className="mt-3 !text-emerald-700">Izinkan Lokasi</Button>
          </div>
        </aside>
      </div>

      <ConfirmDialog open={!!hapusId} onClose={() => setHapusId(null)}
        onConfirm={() => { setUlasanList(list => list.filter(u => u.id !== hapusId)); setFlash({ tipe: "sukses", pesan: "Ulasan berhasil dihapus." }); }}
        judul="Hapus ulasan?" pesan="Ulasan akan dihapus secara permanen dan tidak dapat dikembalikan." />
    </div>
  );
};

const InteractiveStars = ({ value, onChange }) => {
  const [hover, setHover] = React.useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          className="p-0.5 transition">
          <Icon name="star" className={`w-7 h-7 ${(hover || value) >= n ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} strokeWidth={1.5} />
        </button>
      ))}
      <span className="ml-2 text-sm text-stone-500">{hover || value}/5</span>
    </div>
  );
};

Object.assign(window, { DestinasiIndeks, DestinasiDetail });
