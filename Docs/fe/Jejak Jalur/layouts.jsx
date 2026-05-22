// JejakJalur — Layouts (Public/Auth/Admin) + Navbar/Sidebar/Footer + DestinasiCard

const Brand = ({ size = "md", className = "" }) => {
  const txt = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const ico = size === "lg" ? "w-7 h-7" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-tight text-stone-800 ${txt} ${className}`}>
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white">
        <Icon name="leaf" className={ico} strokeWidth={2.2} />
      </span>
      <span>Jejak<span className="text-emerald-700">Jalur</span></span>
    </span>
  );
};

const NavLink = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative px-1 h-full inline-flex items-center text-sm font-medium transition ${active ? "text-emerald-700" : "text-stone-600 hover:text-stone-900"}`}
  >
    {children}
    {active && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-emerald-700" />}
  </button>
);

const UserMenu = ({ user, nav, onLogout }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 rounded-full p-0.5 pr-3 hover:bg-stone-100 transition">
        <Avatar nama={user.nama} size="sm" />
        <span className="text-sm font-medium text-stone-700 hidden sm:inline">{user.nama.split(" ")[0]}</span>
        <Icon name="chevronDown" className="w-3.5 h-3.5 text-stone-400" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-stone-200 rounded-xl shadow-lg py-1.5 z-50">
          <div className="px-3 pb-2 mb-1 border-b border-stone-100">
            <div className="text-sm font-medium text-stone-800">{user.nama}</div>
            <div className="text-xs text-stone-500 truncate">{user.email}</div>
          </div>
          <button onClick={() => { nav("/profil"); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2">
            <Icon name="user" className="w-4 h-4 text-stone-400" /> Profil saya
          </button>
          {user.isAdmin && (
            <button onClick={() => { nav("/admin"); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2">
              <Icon name="settings" className="w-4 h-4 text-stone-400" /> Admin Panel
            </button>
          )}
          <hr className="my-1 border-stone-100" />
          <button onClick={() => { onLogout(); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
            <Icon name="logout" className="w-4 h-4" /> Keluar
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ user, route, nav, onLogout }) => {
  const isActive = (prefix) => route === prefix || (prefix !== "/" && route.startsWith(prefix));
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => nav("/")} className="flex items-center"><Brand /></button>
        <nav className="hidden md:flex items-center gap-7 h-full">
          <NavLink active={route === "/"} onClick={() => nav("/")}>Beranda</NavLink>
          <NavLink active={isActive("/destinasi")} onClick={() => nav("/destinasi")}>Destinasi</NavLink>
          <NavLink active={isActive("/rute")} onClick={() => nav("/rute")}>Rute</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu user={user} nav={nav} onLogout={onLogout} />
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => nav("/masuk")}>Masuk</Button>
              <Button variant="primary" size="sm" onClick={() => nav("/daftar")}>Daftar</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-stone-400 mt-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Brand size="md" className="!text-white" />
          <p className="mt-3 text-sm leading-relaxed text-stone-400 max-w-sm">
            Jelajahi Indonesia satu stasiun setiap kali. Temukan destinasi, kuliner, dan UMKM di sekitar jalur kereta.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Jelajahi</div>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="#">Destinasi</a></li>
            <li><a className="hover:text-white" href="#">Perencana Rute</a></li>
            <li><a className="hover:text-white" href="#">Jejak AI</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Tentang</div>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="#">Tim</a></li>
            <li><a className="hover:text-white" href="#">Kebijakan Privasi</a></li>
            <li><a className="hover:text-white" href="#">Syarat & Ketentuan</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row justify-between gap-2">
        <span>© 2026 JejakJalur. Semua hak dilindungi.</span>
        <span>Dibuat untuk pejalan setia rel.</span>
      </div>
    </div>
  </footer>
);

const PublicLayout = ({ user, route, nav, onLogout, flash, onDismissFlash, children, density = "comfortable" }) => (
  <div className={`min-h-screen flex flex-col bg-stone-50 text-stone-800 ${density === "compact" ? "jj-compact" : ""}`}>
    <FlashToast flash={flash} onDismiss={onDismissFlash} />
    <Navbar user={user} route={route} nav={nav} onLogout={onLogout} />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const AuthLayout = ({ children, flash, onDismissFlash, density = "comfortable" }) => (
  <div className={`min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4 py-12 ${density === "compact" ? "jj-compact" : ""}`}>
    <FlashToast flash={flash} onDismiss={onDismissFlash} />
    {/* decorative subway lines */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
      <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full">
        <path d="M-50 200 Q200 100 400 220 T 850 180" stroke="#047857" strokeWidth="3" fill="none" />
        <path d="M-50 380 Q300 320 500 400 T 850 350" stroke="#d97706" strokeWidth="3" fill="none" />
      </svg>
    </div>
    <div className="relative w-full max-w-md">
      {children}
    </div>
  </div>
);

const ADMIN_NAV = [
  { id: "/admin", label: "Dashboard", icon: "grid" },
  { id: "/admin/kota", label: "Kota", icon: "home" },
  { id: "/admin/stasiun", label: "Stasiun", icon: "train" },
  { id: "/admin/destinasi", label: "Destinasi", icon: "mapPin" },
  { id: "/admin/pengguna", label: "Pengguna", icon: "users" },
  { id: "/admin/ulasan", label: "Ulasan", icon: "star" },
  { id: "/admin/ai-session", label: "Sesi Jejak AI", icon: "bot" },
];

const AdminLayout = ({ user, route, nav, onLogout, flash, onDismissFlash, children, density = "comfortable" }) => (
  <div className={`min-h-screen bg-stone-50 text-stone-800 ${density === "compact" ? "jj-compact" : ""}`}>
    <FlashToast flash={flash} onDismiss={onDismissFlash} />
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 h-14 flex items-center px-4 sm:px-6 justify-between">
      <div className="flex items-center gap-3">
        <Brand size="sm" />
        <span className="hidden sm:inline-block text-xs font-medium uppercase tracking-wider text-stone-400 border-l border-stone-200 pl-3 ml-1">Admin</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => nav("/")} className="text-sm text-stone-600 hover:text-stone-900 hidden sm:inline-flex items-center gap-1.5">
          <Icon name="arrowLeft" className="w-3.5 h-3.5" /> Kembali ke Situs
        </button>
        {user && <UserMenu user={user} nav={nav} onLogout={onLogout} />}
      </div>
    </header>
    <div className="flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-stone-200 sticky top-14 h-[calc(100vh-3.5rem)] py-4">
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Manajemen</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {ADMIN_NAV.map(item => {
            const active = route === item.id || (item.id !== "/admin" && route.startsWith(item.id));
            return (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 h-9 rounded-lg text-sm transition ${active ? "bg-emerald-700 text-white font-medium" : "text-stone-600 hover:bg-stone-50"}`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-2 pt-3 border-t border-stone-100">
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2.5 px-3 h-9 rounded-lg text-sm text-stone-500 hover:bg-stone-50">
            <Icon name="arrowLeft" className="w-4 h-4" /> Kembali ke Situs
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  </div>
);

// ───────── DestinasiCard ─────────
const DestinasiCard = ({ destinasi, onClick }) => {
  const kota = getKotaByStasiun(destinasi.stasiunId);
  const stasiun = getStasiun(destinasi.stasiunId);
  return (
    <button onClick={onClick} className="group text-left bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md hover:border-stone-300 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/40">
      <div className="relative aspect-[16/10]">
        <FotoPlaceholder gradient={destinasi.gradient} ikon={destinasi.ikon} className="w-full h-full" showLabel={false} />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge tone={kategoriTone(destinasi.kategori)} className="!bg-white/95 !backdrop-blur-sm">{destinasi.kategori}</Badge>
          {destinasi.verified && <Badge tone="emerald" className="!bg-white/95 !backdrop-blur-sm"><Icon name="badge" className="w-3 h-3" />Terverifikasi</Badge>}
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
          <Icon name="star" className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={1} />
          {destinasi.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <div className="font-semibold text-stone-800 group-hover:text-emerald-800 transition line-clamp-1">{destinasi.nama}</div>
        <div className="mt-1 text-xs text-stone-500 flex items-center gap-1.5">
          <Icon name="train" className="w-3.5 h-3.5 text-stone-400" />
          <span className="truncate">{stasiun?.nama} · {kota?.nama}</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <StarRating nilai={destinasi.rating} size="sm" />
          <span className="text-xs text-stone-400">{destinasi.ulasanCount} ulasan</span>
        </div>
      </div>
    </button>
  );
};

const UlasanCard = ({ ulasan, milikSendiri, onEdit, onHapus }) => (
  <div className="py-5 border-b border-stone-100 last:border-0">
    <div className="flex items-start gap-3">
      <Avatar nama={ulasan.userName} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-stone-800">{ulasan.userName}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating nilai={ulasan.rating} size="sm" />
              <span className="text-xs text-stone-400">· {new Date(ulasan.tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
          </div>
          {milikSendiri && (
            <div className="flex items-center gap-1">
              <button onClick={onEdit} className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500" title="Edit"><Icon name="pencil" className="w-3.5 h-3.5" /></button>
              <button onClick={onHapus} className="p-1.5 rounded-md hover:bg-red-50 text-red-500" title="Hapus"><Icon name="trash" className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
        <div className="mt-2 text-sm font-medium text-stone-800">{ulasan.judul}</div>
        <p className="mt-1 text-sm text-stone-600 leading-relaxed">{ulasan.konten}</p>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  Brand, Navbar, Footer, PublicLayout, AuthLayout, AdminLayout, ADMIN_NAV,
  DestinasiCard, UlasanCard,
});
