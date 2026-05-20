// JejakJalur — Perencana Rute (/rute) — Leaflet interactive

const KotaStasiunPicker = ({ label, kotaTerpilih, setKota, stasiunTerpilih, setStasiun, excludeKotaId, accent = "emerald" }) => {
  return (
    <div className="space-y-3">
      <div className={`text-xs uppercase font-semibold tracking-wider text-${accent}-700`}>{label}</div>
      <FormField label="Kota">
        <Select value={kotaTerpilih || ""} onChange={e => { setKota(e.target.value || null); setStasiun(null); }}>
          <option value="">Pilih kota...</option>
          {KOTA.filter(k => k.id !== excludeKotaId).map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
        </Select>
      </FormField>
      <FormField label="Stasiun">
        <Select value={stasiunTerpilih || ""} onChange={e => setStasiun(e.target.value || null)} disabled={!kotaTerpilih}>
          <option value="">{kotaTerpilih ? "Pilih stasiun..." : "Pilih kota terlebih dahulu"}</option>
          {kotaTerpilih && STASIUN.filter(s => s.kotaId === kotaTerpilih).map(s => <option key={s.id} value={s.id}>{s.nama} ({s.kode})</option>)}
        </Select>
      </FormField>
    </div>
  );
};

const RutePage = ({ nav, params }) => {
  const initialStasiun = params.get("stasiun");
  const initStasiun = initialStasiun ? getStasiun(initialStasiun) : null;

  const [dariKota, setDariKota] = React.useState(initStasiun ? initStasiun.kotaId : null);
  const [dariStasiun, setDariStasiun] = React.useState(initStasiun ? initStasiun.id : null);
  const [keKota, setKeKota] = React.useState(null);
  const [keStasiun, setKeStasiun] = React.useState(null);
  const [rute, setRute] = React.useState(null);
  const [error, setError] = React.useState(null);

  const mapRef = React.useRef(null);
  const mapInstRef = React.useRef(null);
  const markersRef = React.useRef({});
  const polylineRef = React.useRef(null);

  // init map
  React.useEffect(() => {
    if (!mapRef.current || !window.L || mapInstRef.current) return;
    const map = window.L.map(mapRef.current, { zoomControl: true });
    map.setView([-7.5, 110.5], 6);
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18, attribution: "© OpenStreetMap"
    }).addTo(map);

    // draw connection lines (faint)
    KONEKSI.forEach(([a, b]) => {
      const sa = getStasiun(a), sb = getStasiun(b);
      if (sa?.lat && sb?.lat) {
        window.L.polyline([[sa.lat, sa.lng], [sb.lat, sb.lng]], { color: "#a8a29e", weight: 1.5, opacity: 0.5 }).addTo(map);
      }
    });

    // station markers
    STASIUN.forEach(s => {
      if (!s.lat) return;
      const m = window.L.circleMarker([s.lat, s.lng], {
        radius: 6, color: "#fff", weight: 2, fillColor: "#047857", fillOpacity: 1,
      }).addTo(map);
      m.bindTooltip(`<b>${s.nama}</b><br>${getKota(s.kotaId)?.nama}`, { direction: "top", offset: [0, -8] });
      const destCount = destinasiCountByStasiun(s.id);
      m.bindPopup(`<div style="font-family:Instrument Sans,sans-serif;"><b>${s.nama}</b> (${s.kode})<br><span style="color:#78716c">${getKota(s.kotaId)?.nama}</span><br><span style="color:#047857;font-weight:600">${destCount} destinasi</span></div>`);
      markersRef.current[s.id] = m;
    });

    mapInstRef.current = map;
    return () => { map.remove(); mapInstRef.current = null; };
  }, []);

  // visualize route
  React.useEffect(() => {
    const map = mapInstRef.current;
    if (!map) return;
    // reset
    if (polylineRef.current) { map.removeLayer(polylineRef.current); polylineRef.current = null; }
    Object.entries(markersRef.current).forEach(([id, m]) => {
      m.setStyle({ radius: 6, fillColor: "#047857", fillOpacity: 1, opacity: 1 });
    });
    if (!rute || rute.length < 2) return;
    const inRoute = new Set(rute.map(s => s.id));
    Object.entries(markersRef.current).forEach(([id, m]) => {
      if (!inRoute.has(id)) {
        m.setStyle({ fillOpacity: 0.12, opacity: 0.4, radius: 4 });
      } else {
        m.setStyle({ radius: 9, fillColor: "#10b981" });
      }
    });
    // emphasize endpoints
    if (markersRef.current[rute[0].id]) markersRef.current[rute[0].id].setStyle({ fillColor: "#047857", radius: 10 });
    if (markersRef.current[rute[rute.length-1].id]) markersRef.current[rute[rute.length-1].id].setStyle({ fillColor: "#d97706", radius: 10 });
    const latlngs = rute.map(s => [s.lat, s.lng]);
    const pl = window.L.polyline(latlngs, { color: "#047857", weight: 4, opacity: 0.9 }).addTo(map);
    polylineRef.current = pl;
    map.fitBounds(pl.getBounds(), { padding: [60, 60] });
  }, [rute]);

  const handleCari = () => {
    setError(null);
    if (!dariStasiun || !keStasiun) { setError("Pilih stasiun asal dan tujuan terlebih dahulu."); return; }
    if (dariStasiun === keStasiun) { setError("Stasiun asal dan tujuan tidak boleh sama."); return; }
    const hasil = cariRute(dariStasiun, keStasiun);
    if (!hasil) { setError("Tidak ada jalur kereta yang menghubungkan kedua stasiun."); setRute(null); return; }
    setRute(hasil);
  };

  const handleReset = () => { setDariKota(null); setDariStasiun(null); setKeKota(null); setKeStasiun(null); setRute(null); setError(null); };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Peta Stasiun Kereta Indonesia</h1>
        <p className="mt-2 text-stone-600">Jelajahi {STASIUN.length} stasiun yang terhubung lewat {KONEKSI.length} ruas jalur. Klik marker untuk detail.</p>
      </div>

      {/* Map */}
      <div className="mt-6 rounded-2xl border border-stone-200 overflow-hidden shadow-sm bg-white relative">
        <div ref={mapRef} className="h-[540px] w-full" />
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-600 shadow-sm space-y-1 z-[500]">
          <div className="font-semibold text-stone-700 mb-1 text-[11px] uppercase tracking-wider">Legenda</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-700 ring-2 ring-white" />Stasiun aktif</div>
          {rute && <>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-700" />Asal</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-600" />Tujuan</div>
            <div className="flex items-center gap-2"><span className="w-4 h-0.5 bg-emerald-700" />Rute aktif</div>
          </>}
        </div>
      </div>

      {/* Planner */}
      <div className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Rencanakan Perjalanan</h2>
            <p className="text-sm text-stone-500">Pilih stasiun asal dan tujuan untuk melihat rute.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-5 md:gap-3 items-end">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
            <KotaStasiunPicker label="Dari" kotaTerpilih={dariKota} setKota={setDariKota} stasiunTerpilih={dariStasiun} setStasiun={setDariStasiun} excludeKotaId={keKota} accent="emerald" />
          </div>
          <div className="flex md:flex-col items-center justify-center gap-1 pb-2">
            <div className="w-px h-6 bg-stone-200 md:block hidden" />
            <Icon name="arrowRight" className="w-5 h-5 text-stone-300 md:hidden" />
            <Icon name="chevronRight" className="w-6 h-6 text-stone-300 hidden md:block" />
            <div className="w-px h-6 bg-stone-200 md:block hidden" />
          </div>
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
            <KotaStasiunPicker label="Ke" kotaTerpilih={keKota} setKota={setKeKota} stasiunTerpilih={keStasiun} setStasiun={setKeStasiun} excludeKotaId={dariKota} accent="amber" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={handleCari}><Icon name="route" className="w-4 h-4" /> Cari Rute</Button>
          <Button variant="ghost" onClick={handleReset}>Hapus rencana</Button>
        </div>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
            <Icon name="alert" className="w-4 h-4 mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {rute && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <RuteHasil rute={rute} nav={nav} />
          </div>
        )}
      </div>
    </div>
  );
};

const RuteHasil = ({ rute, nav }) => {
  const [expandAll, setExpandAll] = React.useState(false);
  const asal = rute[0]; const tujuan = rute[rute.length - 1];
  const pemberhentian = rute.slice(1, -1);
  const visiblePemberhentian = expandAll ? pemberhentian : pemberhentian.slice(0, 6);

  return (
    <div>
      <div className="text-xs uppercase font-semibold tracking-wider text-stone-500 mb-3">Hasil Pencarian</div>
      <div className="flex items-center gap-3 flex-wrap text-sm text-stone-700">
        <span className="font-medium">{asal.nama}</span>
        <span className="text-stone-400">→</span>
        <Badge tone="stone">{pemberhentian.length} pemberhentian</Badge>
        <span className="text-stone-400">→</span>
        <span className="font-medium">{tujuan.nama}</span>
        <Badge tone="emerald" className="ml-auto">{rute.length} stasiun total</Badge>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <RuteEndpointCard tipe="berangkat" stasiun={asal} />
        <RuteEndpointCard tipe="tiba" stasiun={tujuan} />
      </div>

      {pemberhentian.length > 0 && (
        <div className="mt-6">
          <div className="text-sm font-semibold text-stone-700 mb-3">Pemberhentian</div>
          <div className="relative pl-7">
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-emerald-200" />
            {visiblePemberhentian.map((s, i) => (
              <div key={s.id} className="relative flex items-center gap-4 py-2 group">
                <span className="absolute -left-7 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-[10px] font-semibold text-emerald-700">{i + 1}</span>
                <div className="flex-1 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium text-stone-800">{s.nama} <span className="text-stone-400 font-mono text-xs">({s.kode})</span></div>
                    <div className="text-xs text-stone-500">{getKota(s.kotaId)?.nama}</div>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5">
                    <Icon name="mapPin" className="w-3 h-3 text-stone-400" /> {destinasiCountByStasiun(s.id)} destinasi
                  </div>
                </div>
              </div>
            ))}
            {pemberhentian.length > 6 && !expandAll && (
              <button onClick={() => setExpandAll(true)} className="ml-1 mt-2 text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                Tampilkan semua ({pemberhentian.length}) →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const RuteEndpointCard = ({ tipe, stasiun }) => {
  const isAsal = tipe === "berangkat";
  return (
    <div className={`rounded-xl p-4 border ${isAsal ? "bg-emerald-700 text-white border-emerald-700" : "bg-amber-50 border-amber-200 text-stone-800"}`}>
      <div className={`text-[10px] uppercase font-bold tracking-widest ${isAsal ? "text-emerald-100" : "text-amber-700"}`}>{isAsal ? "Berangkat" : "Tiba"}</div>
      <div className="mt-2 text-xl font-bold leading-tight">{stasiun.nama}</div>
      <div className={`mt-1 text-sm ${isAsal ? "text-emerald-100" : "text-amber-700"}`}>
        {getKota(stasiun.kotaId)?.nama} · <span className="font-mono">{stasiun.kode}</span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-xs">
        <Icon name="mapPin" className="w-3 h-3" /> {destinasiCountByStasiun(stasiun.id)} destinasi terdekat
      </div>
    </div>
  );
};

Object.assign(window, { RutePage });
