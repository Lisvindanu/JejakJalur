// JejakJalur — main App + simple hash router

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable"
}/*EDITMODE-END*/;

const parseHash = () => {
  const h = window.location.hash.slice(1) || "/";
  const [path, qs] = h.split("?");
  return { path, params: new URLSearchParams(qs || "") };
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(parseHash);
  const [user, setUser] = React.useState(null);
  const [flash, setFlash] = React.useState(null);
  const [destinasiState, setDestinasiState] = React.useState(DESTINASI);

  React.useEffect(() => {
    const fn = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  const nav = (to) => { window.location.hash = "#" + to; };
  const dismissFlash = () => setFlash(null);

  const handleLogout = () => {
    const name = user?.nama;
    setUser(null);
    setFlash({ tipe: "sukses", pesan: `Sampai jumpa${name ? ", " + name : ""}!` });
  };

  const { path, params } = route;
  const density = tweaks.density || "comfortable";

  const isAuthPath = ["/masuk", "/daftar", "/lupa-password", "/reset-password"].some(p => path === p || path.startsWith(p + "/"));
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");
  const requiresAuth = ["/profil", "/profil/edit"].includes(path) || isAdminPath;

  React.useEffect(() => {
    if (requiresAuth && !user) {
      setFlash({ tipe: "error", pesan: "Silakan masuk terlebih dahulu." });
      window.location.hash = "#/masuk";
    } else if (isAdminPath && user && !user.isAdmin) {
      setFlash({ tipe: "error", pesan: "Akses ditolak. Anda bukan admin." });
      window.location.hash = "#/";
    }
  }, [path, user]);

  // Decide which layout + content
  let body;

  if (isAuthPath) {
    if (user && (path === "/masuk" || path === "/daftar")) {
      window.location.hash = "#/";
    }
    body = (
      <AuthLayout flash={flash} onDismissFlash={dismissFlash} density={density}>
        {path === "/masuk" && <LoginPage nav={nav} onLogin={setUser} setFlash={setFlash} />}
        {path === "/daftar" && <DaftarPage nav={nav} onLogin={setUser} setFlash={setFlash} />}
        {path === "/lupa-password" && <LupaPasswordPage nav={nav} />}
        {path.startsWith("/reset-password") && <ResetPasswordPage nav={nav} setFlash={setFlash} />}
      </AuthLayout>
    );
  } else if (isAdminPath && user && user.isAdmin) {
    const sub = path.slice("/admin".length);
    let content;
    if (path === "/admin") content = <AdminDashboard nav={nav} setFlash={setFlash} destinasiState={destinasiState} setDestinasiState={setDestinasiState} />;
    else if (sub.startsWith("/kota")) content = <AdminKota subroute={sub.slice("/kota".length)} params={params} nav={nav} setFlash={setFlash} />;
    else if (sub.startsWith("/stasiun")) content = <AdminStasiun subroute={sub.slice("/stasiun".length)} params={params} nav={nav} setFlash={setFlash} />;
    else if (sub.startsWith("/destinasi")) content = <AdminDestinasi subroute={sub.slice("/destinasi".length)} params={params} nav={nav} setFlash={setFlash} destinasiState={destinasiState} setDestinasiState={setDestinasiState} />;
    else if (sub.startsWith("/pengguna")) content = <AdminPengguna setFlash={setFlash} />;
    else if (sub.startsWith("/ulasan")) content = <AdminUlasan setFlash={setFlash} />;
    else if (sub.startsWith("/ai-session")) content = <AdminAiSession setFlash={setFlash} />;
    else content = <NotFound nav={nav} />;
    body = (
      <AdminLayout user={user} route={path} nav={nav} onLogout={handleLogout} flash={flash} onDismissFlash={dismissFlash} density={density}>
        {content}
      </AdminLayout>
    );
  } else {
    let page;
    if (path === "/") page = <HomePage nav={nav} />;
    else if (path === "/destinasi") page = <DestinasiIndeks nav={nav} params={params} />;
    else if (path.startsWith("/destinasi/")) {
      const id = path.split("/")[2];
      page = <DestinasiDetail id={id} nav={nav} user={user} flash={flash} setFlash={setFlash} />;
    }
    else if (path === "/rute") page = <RutePage nav={nav} params={params} />;
    else if (path === "/profil" && user) page = <ProfilTampilkan user={user} nav={nav} />;
    else if (path === "/profil/edit" && user) page = <ProfilEdit user={user} nav={nav} onUpdate={setUser} onLogout={() => setUser(null)} setFlash={setFlash} />;
    else page = <NotFound nav={nav} />;
    body = (
      <PublicLayout user={user} route={path} nav={nav} onLogout={handleLogout} flash={flash} onDismissFlash={dismissFlash} density={density}>
        {page}
        <JejakAiWidget />
      </PublicLayout>
    );
  }

  return (
    <>
      {body}
      <AppTweaks tweaks={tweaks} setTweak={setTweak} user={user} setUser={setUser} setFlash={setFlash} nav={nav} />
    </>
  );
}

function AppTweaks({ tweaks, setTweak, user, setUser, setFlash, nav }) {
  // demo helpers for previewing roles
  const loginAs = (id) => {
    const u = PENGGUNA.find(p => p.id === id);
    if (u) { setUser(u); setFlash({ tipe: "sukses", pesan: `Login sebagai ${u.nama}.` }); }
  };
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Tampilan">
        <TweakRadio
          label="Density"
          value={tweaks.density}
          onChange={(v) => setTweak("density", v)}
          options={["comfortable", "compact"]}
        />
      </TweakSection>
      <TweakSection label="Demo: sesi pengguna">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <button onClick={() => { setUser(null); setFlash({ tipe: "sukses", pesan: "Logout berhasil." }); }}
            style={demoBtn(!user)}>Tamu (guest)</button>
          <button onClick={() => loginAs("p-2")} style={demoBtn(user?.id === "p-2")}>Dewi (pengguna)</button>
          <button onClick={() => loginAs("p-1")} style={demoBtn(user?.id === "p-1")}>Admin Jejak</button>
        </div>
      </TweakSection>
      <TweakSection label="Navigasi cepat">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            ["Beranda", "/"], ["Destinasi", "/destinasi"], ["Rute", "/rute"],
            ["Masuk", "/masuk"], ["Profil", "/profil"], ["Admin", "/admin"],
          ].map(([label, p]) => (
            <button key={p} onClick={() => nav(p)} style={demoBtn(false)}>{label}</button>
          ))}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

const demoBtn = (active) => ({
  appearance: "none",
  border: active ? "1px solid #047857" : "1px solid rgba(0,0,0,.1)",
  background: active ? "#047857" : "white",
  color: active ? "white" : "#29261b",
  borderRadius: 8,
  padding: "6px 8px",
  fontSize: 11,
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "left",
});

const NotFound = ({ nav }) => (
  <div className="max-w-2xl mx-auto px-4 py-24 text-center">
    <div className="text-7xl font-bold text-emerald-700/20 tracking-tighter">404</div>
    <h1 className="mt-4 text-2xl font-bold text-stone-800">Halaman tidak ditemukan</h1>
    <p className="mt-2 text-stone-600">Mungkin halaman ini sudah pindah jalur, atau memang belum pernah ada.</p>
    <Button className="mt-6" onClick={() => nav("/")}>← Kembali ke Beranda</Button>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
