// JejakJalur — Beranda (/)

const HeroSection = ({ nav }) => {
  const [flipped, setFlipped] = React.useState(0);
  const featured = KOTA.slice(0, 4);
  React.useEffect(() => {
    const t = setInterval(() => setFlipped(i => (i + 1) % featured.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* subtle rail pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
          <pattern id="rail" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20h40" stroke="#047857" strokeWidth="1" />
            <path d="M0 15v10M40 15v10" stroke="#047857" strokeWidth="0.5" />
          </pattern>
          <rect width="1200" height="600" fill="url(#rail)" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            349 stasiun · 1.200+ destinasi tervalidasi
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-stone-900 leading-[1.05] tracking-tight">
            Jelajahi Indonesia,<br />
            <span className="text-emerald-700">Satu Stasiun</span> Setiap Kali.
          </h1>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed max-w-lg">
            Rencanakan perjalanan kereta antar-kota, temukan wisata, kuliner, dan UMKM di sekitar setiap stasiun — semua dalam satu peta.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => nav("/destinasi")}>
              <Icon name="mapPin" className="w-4 h-4" /> Jelajahi Destinasi
            </Button>
            <Button size="lg" variant="secondary" onClick={() => nav("/rute")}>
              <Icon name="route" className="w-4 h-4" /> Rencanakan Rute
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-stone-500">
            <div className="flex items-center -space-x-2">
              {["Maya","Rizki","Dewi","Bagus"].map(n => <Avatar key={n} nama={n} size="sm" className="ring-2 ring-white" />)}
            </div>
            <span>Dipercaya 12.000+ pejalan rel</span>
          </div>
        </div>
        {/* flip-card grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
          {featured.map((k, idx) => (
            <FlipCard key={k.id} kota={k} flipped={flipped === idx} onClick={() => nav("/destinasi?kota=" + k.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FlipCard = ({ kota, flipped, onClick }) => {
  const stasiunN = stasiunCountByKota(kota.id);
  const destN = destinasiCountByKota(kota.id);
  return (
    <button onClick={onClick} className="group relative aspect-[5/4] [perspective:1000px] focus:outline-none">
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""} group-hover:[transform:rotateY(180deg)]`}>
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-sm">
          <FotoPlaceholder gradient={
            kota.id === "k-bdo" ? "from-emerald-400 to-teal-700" :
            kota.id === "k-jkt" ? "from-amber-300 to-stone-700" :
            kota.id === "k-sby" ? "from-rose-400 to-red-700" :
            "from-orange-300 to-amber-700"
          } ikon={kota.id === "k-jkt" ? "monument" : kota.id === "k-yog" ? "palace" : "mountain"} className="w-full h-full" showLabel={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-[10px] uppercase tracking-widest opacity-80 font-mono">{kota.kode}</div>
            <div className="text-base font-semibold leading-tight">{kota.nama}</div>
          </div>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-emerald-700 text-white p-4 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70 font-mono">{kota.kode}</div>
            <div className="text-base font-semibold leading-tight">{kota.nama}</div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between"><span className="text-xs opacity-80">Stasiun</span><span className="font-semibold tabular-nums">{stasiunN}</span></div>
            <div className="flex items-baseline justify-between"><span className="text-xs opacity-80">Destinasi</span><span className="font-semibold tabular-nums">{destN}</span></div>
          </div>
        </div>
      </div>
    </button>
  );
};

// Stylized subway map — Jakarta MRT/KRL inspired
const SubwayMap = () => {
  // 3 lines stylized — emerald, amber, red
  return (
    <section className="bg-white py-20 border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">Jaringan</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Satu Negara, Tiga Jalur</h2>
            <p className="mt-2 text-stone-600 max-w-xl">Jejak Jalur memetakan jalur utara, jalur selatan, dan jalur Bandung-Yogya — menyatukan 8 kota dalam satu peta kerja.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-600" /> Jalur Utara</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Jalur Selatan</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500" /> Lintas-tengah</span>
          </div>
        </div>

        <div className="rounded-3xl bg-stone-50 border border-stone-200 p-6 sm:p-10 overflow-x-auto">
          <svg viewBox="0 0 1100 360" className="w-full min-w-[800px]" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e7e5e4" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="1100" height="360" fill="url(#grid)" />

            {/* Lines */}
            {/* Jalur Utara: Jakarta-Cirebon-Semarang-Surabaya */}
            <path d="M100 110 L320 110 L500 110 L750 110 L990 110" stroke="#047857" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Jalur Selatan: Jakarta-Bandung-Yogya-Solo-Surabaya */}
            <path d="M100 110 L260 250 L520 250 L680 250 L820 220 L990 110" stroke="#d97706" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Lintas tengah: Solo-Malang */}
            <path d="M680 250 L850 320" stroke="#e11d48" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Stations */}
            {[
              { x: 100, y: 110, n: "Jakarta", k: "GMR", lines: ["u","s"], anchor: "start", ty: -16 },
              { x: 320, y: 110, n: "Cirebon", k: "CN", lines: ["u","s"], ty: -16 },
              { x: 500, y: 110, n: "Semarang", k: "SMT", lines: ["u"], ty: -16 },
              { x: 750, y: 110, n: "Surabaya", k: "SBI", lines: ["u","s"], ty: -16 },
              { x: 990, y: 110, n: "Banyuwangi", k: "BW", lines: ["u","s"], ty: -16, anchor: "end" },
              { x: 260, y: 250, n: "Bandung", k: "BD", lines: ["s"], ty: 30 },
              { x: 520, y: 250, n: "Yogyakarta", k: "YK", lines: ["s"], ty: 30 },
              { x: 680, y: 250, n: "Solo", k: "SLO", lines: ["s","t"], ty: 30 },
              { x: 850, y: 320, n: "Malang", k: "ML", lines: ["t"], ty: 24, anchor: "end" },
            ].map((s) => (
              <g key={s.n}>
                <circle cx={s.x} cy={s.y} r="9" fill="white" stroke="#1c1917" strokeWidth="3" />
                <text x={s.x} y={s.y + (s.ty || -16)} textAnchor={s.anchor || "middle"} className="text-[13px] font-semibold" fill="#1c1917">{s.n}</text>
                <text x={s.x} y={s.y + (s.ty || -16) + 14} textAnchor={s.anchor || "middle"} className="text-[10px] font-mono" fill="#a8a29e">{s.k}</text>
              </g>
            ))}

            {/* You-are-here animated pulse on Yogya */}
            <circle cx="520" cy="250" r="14" fill="#047857" opacity="0.25">
              <animate attributeName="r" values="9;20;9" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
};

const KotaSection = ({ nav }) => (
  <section className="bg-stone-50 py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">Mulai Dari Sini</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Kota Populer</h2>
        </div>
        <button onClick={() => nav("/destinasi")} className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hidden sm:inline-flex items-center gap-1">
          Semua Kota <Icon name="arrowRight" className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KOTA.map(k => {
          const grads = {
            "k-bdo": "from-emerald-400 to-teal-700",
            "k-jkt": "from-amber-300 to-stone-700",
            "k-sby": "from-rose-400 to-red-700",
            "k-yog": "from-orange-300 to-amber-700",
            "k-smg": "from-sky-400 to-blue-700",
            "k-mlg": "from-purple-400 to-indigo-700",
            "k-slo": "from-yellow-300 to-amber-700",
            "k-crb": "from-cyan-400 to-emerald-700",
          };
          const ikon = { "k-jkt": "monument", "k-yog": "palace", "k-sby": "heritage", "k-mlg": "park", "k-slo": "craft" }[k.id] || "mountain";
          return (
            <button key={k.id} onClick={() => nav("/destinasi?kota=" + k.id)} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition text-left">
              <div className="aspect-[4/3] relative">
                <FotoPlaceholder gradient={grads[k.id]} ikon={ikon} className="w-full h-full" showLabel={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider opacity-80">{k.kode}</div>
                  <div className="text-lg font-semibold">{k.nama}</div>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between text-xs text-stone-500">
                <span>{stasiunCountByKota(k.id)} stasiun</span>
                <span className="text-emerald-700 group-hover:gap-2 inline-flex items-center gap-1 transition-all font-medium">
                  Jelajahi <Icon name="arrowRight" className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

const DestinasiUnggulan = ({ nav }) => {
  const top = [...DESTINASI].filter(d => d.verified).sort((a,b) => b.rating - a.rating).slice(0, 6);
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">Pilihan Pejalan</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Destinasi Terpopuler</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top.map(d => <DestinasiCard key={d.id} destinasi={d} onClick={() => nav("/destinasi/" + d.id)} />)}
        </div>
        <div className="mt-10 text-center">
          <Button variant="secondary" size="lg" onClick={() => nav("/destinasi")}>
            Lihat Semua Destinasi <Icon name="arrowRight" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ nav }) => (
  <section className="relative bg-emerald-800 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
        <path d="M0 200 Q300 100 600 200 T1200 200" stroke="white" strokeWidth="2" fill="none" strokeDasharray="6 8" />
        <path d="M0 250 Q400 350 800 250 T1200 280" stroke="white" strokeWidth="2" fill="none" strokeDasharray="6 8" />
      </svg>
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Siap menjelajah Indonesia?</h2>
        <p className="mt-3 text-emerald-50 text-lg">Mulai dari stasiun terdekat — biarkan Jejak AI menyusun rute & rekomendasinya untukmu.</p>
      </div>
      <Button size="lg" className="!bg-white !text-emerald-800 hover:!bg-stone-100" onClick={() => nav("/rute")}>
        <Icon name="route" className="w-5 h-5" /> Rencanakan Perjalanan
      </Button>
    </div>
  </section>
);

const HomePage = ({ nav }) => (
  <>
    <HeroSection nav={nav} />
    <SubwayMap />
    <KotaSection nav={nav} />
    <DestinasiUnggulan nav={nav} />
    <CTASection nav={nav} />
  </>
);

Object.assign(window, { HomePage });
