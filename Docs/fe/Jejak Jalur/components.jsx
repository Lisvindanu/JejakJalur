// JejakJalur atoms + small fragments

// ──────────────── ICONS (lucide-style minimal inline SVG) ────────────────
const Icon = ({ name, className = "w-4 h-4", strokeWidth = 2 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></>,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    check: <path d="M20 6 9 17l-5-5" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    pencil: <><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></>,
    trash: <><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    star: <path d="M12 2l2.6 6.5L21 9.3l-5 4.4 1.5 6.7L12 17l-5.5 3.4L8 13.7 3 9.3l6.4-.8z" />,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.6 12.3-7 14a8 8 0 0 1-3-1.1" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>,
    train: <><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16" /><path d="M12 3v8" /><path d="M8 19l-2 3" /><path d="M16 19l2 3" /><circle cx="8" cy="15" r=".5" fill="currentColor" /><circle cx="16" cy="15" r=".5" fill="currentColor" /></>,
    mapPin: <><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    map: <><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></>,
    route: <><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></>,
    home: <><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>,
    user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    logout: <><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    bot: <><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>,
    send: <><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></>,
    filter: <path d="M3 6h18M7 12h10M10 18h4" />,
    arrowLeft: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
    alert: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
    sparkles: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></>,
    upload: <><path d="M12 13v8" /><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="m8 17 4-4 4 4" /></>,
    eye: <><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    edit: <><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></>,
    mountain: <><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></>,
    food: <><path d="M3 11h18" /><path d="M12 11V3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M5 21h14" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    monument: <><path d="M12 2v20" /><path d="M8 22h8" /><path d="M9 6h6" /><path d="M10 10h4" /></>,
    palace: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6" /></>,
    craft: <><path d="M14 11l4 5-4 5" /><path d="M10 13L6 8l4-5" /><circle cx="12" cy="12" r="2" /></>,
    park: <><path d="M12 22v-5" /><path d="M9 7V2" /><path d="M15 7V2" /><circle cx="12" cy="11" r="6" /></>,
    cafe: <><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><path d="M6 2v2" /><path d="M10 2v2" /><path d="M14 2v2" /></>,
    heritage: <><path d="M3 22h18" /><path d="M5 22V10" /><path d="M19 22V10" /><path d="M5 10h14" /><path d="M12 22V6" /><path d="M8 6h8l-4-4-4 4z" /></>,
    street: <><path d="M12 22V2" /><path d="M5 22h14" /><path d="M5 12h2" /><path d="M17 12h2" /><path d="M5 7h2" /><path d="M17 7h2" /></>,
    moreH: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    refresh: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></>,
    badge: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className}>{paths[name] || null}</svg>
  );
};

// ──────────────── ATOMS ────────────────

const Button = ({ variant = "primary", size = "md", loading, disabled, className = "", children, ...rest }) => {
  const variants = {
    primary: "bg-emerald-700 hover:bg-emerald-800 text-white border border-transparent",
    secondary: "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50",
    ghost: "bg-transparent text-stone-700 hover:bg-stone-100 border border-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white border border-transparent",
    dangerOutline: "bg-white border border-red-300 text-red-700 hover:bg-red-50",
  };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-11 px-5 text-base" };
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ error, className = "", ...rest }, ref) => (
  <input
    ref={ref}
    className={`w-full h-10 rounded-lg border bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 transition ${error ? "border-red-500" : "border-stone-300"} ${className}`}
    {...rest}
  />
));

const Textarea = ({ error, className = "", ...rest }) => (
  <textarea
    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 transition resize-y ${error ? "border-red-500" : "border-stone-300"} ${className}`}
    {...rest}
  />
);

const Select = ({ error, className = "", children, ...rest }) => (
  <div className="relative">
    <select
      className={`w-full h-10 appearance-none rounded-lg border bg-white px-3 pr-9 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 transition ${error ? "border-red-500" : "border-stone-300"} ${className}`}
      {...rest}
    >
      {children}
    </select>
    <Icon name="chevronDown" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
  </div>
);

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-stone-700 mb-1.5 ${className}`}>
    {children}
  </label>
);

const Checkbox = ({ label, ...rest }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <input type="checkbox" className="w-4 h-4 accent-emerald-700 rounded" {...rest} />
    {label && <span className="text-sm text-stone-700">{label}</span>}
  </label>
);

const FormField = ({ label, error, children, hint }) => (
  <div>
    {label && <Label>{label}</Label>}
    {children}
    {hint && !error && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const Badge = ({ tone = "stone", children, className = "" }) => {
  const tones = {
    stone: "bg-stone-100 text-stone-600",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    sky: "bg-sky-100 text-sky-700",
    rose: "bg-rose-100 text-rose-700",
    indigo: "bg-indigo-100 text-indigo-700",
    dark: "bg-stone-800 text-white",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${tones[tone]} ${className}`}>{children}</span>;
};

const kategoriTone = (k) => ({ Wisata: "emerald", Kuliner: "amber", UMKM: "indigo" }[k] || "stone");

const StarRating = ({ nilai = 0, max = 5, size = "sm", className = "" }) => {
  const px = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  const stars = [];
  for (let i = 0; i < max; i++) {
    const fillPct = Math.max(0, Math.min(1, nilai - i));
    stars.push(
      <span key={i} className={`relative inline-block ${px}`}>
        <Icon name="star" className={`${px} text-stone-300 absolute inset-0`} strokeWidth={1.5} />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct * 100}%` }}>
          <Icon name="star" className={`${px} text-amber-500 fill-amber-500`} strokeWidth={1.5} />
        </span>
      </span>
    );
  }
  return <span className={`inline-flex items-center gap-0.5 ${className}`}>{stars}</span>;
};

const Avatar = ({ nama = "?", size = "md", className = "" }) => {
  const sz = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base", xl: "w-20 h-20 text-2xl" }[size];
  const inisial = nama.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  // deterministic hue
  let h = 0; for (const c of nama) h = (h * 31 + c.charCodeAt(0)) % 360;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0 ${sz} ${className}`}
      style={{ background: `linear-gradient(135deg, oklch(0.55 0.12 ${h}), oklch(0.4 0.14 ${(h + 30) % 360}))` }}
    >
      {inisial}
    </span>
  );
};

// Image placeholder — gradient + icon (no real photo)
const FotoPlaceholder = ({ gradient = "from-emerald-400 to-emerald-700", ikon = "mountain", label, className = "", showLabel = true }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
    <div className="absolute inset-0 opacity-[0.18]" style={{
      backgroundImage: "repeating-linear-gradient(135deg, transparent 0 8px, rgba(255,255,255,.6) 8px 9px)",
    }} />
    <div className="absolute inset-0 flex items-center justify-center text-white/85">
      <Icon name={ikon} className="w-12 h-12" strokeWidth={1.4} />
    </div>
    {showLabel && label && (
      <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] tracking-wide text-white/80 uppercase truncate">
        {label}
      </div>
    )}
  </div>
);

// ──────────────── FRAGMENTS ────────────────

const FlashToast = ({ flash, onDismiss }) => {
  React.useEffect(() => {
    if (!flash) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [flash, onDismiss]);
  if (!flash) return null;
  const isErr = flash.tipe === "error";
  return (
    <div className={`fixed top-4 right-4 z-[2000] px-4 py-3 rounded-lg border shadow-md flex items-center gap-3 max-w-md animate-[slideIn_.2s_ease-out] ${isErr ? "bg-red-50 border-red-200 text-red-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}>
      <Icon name={isErr ? "alert" : "check"} className="w-4 h-4 shrink-0" />
      <span className="text-sm">{flash.pesan}</span>
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100"><Icon name="x" className="w-4 h-4" /></button>
    </div>
  );
};

const ConfirmDialog = ({ open, onClose, onConfirm, judul, pesan, tombolKonfirmasi = "Hapus", variant = "danger" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-stone-900/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-[92%] p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-stone-800">{judul}</h3>
        <p className="mt-2 text-sm text-stone-600">{pesan}</p>
        <div className="mt-5 flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>Batal</Button>
          <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>{tombolKonfirmasi}</Button>
        </div>
      </div>
    </div>
  );
};

const Divider = ({ label, className = "" }) => (
  <div className={`relative my-6 ${className}`}>
    <hr className="border-stone-200" />
    {label && (
      <span className="absolute inset-0 -top-2 flex justify-center">
        <span className="bg-white px-3 text-xs text-stone-400 uppercase tracking-wider">{label}</span>
      </span>
    )}
  </div>
);

const Pagination = ({ page = 1, total = 1, onPage }) => {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(total, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
        className="h-9 px-3 rounded-lg border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40">
        <Icon name="chevronLeft" className="w-4 h-4" />
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onPage(p)}
          className={`h-9 min-w-9 px-3 rounded-lg text-sm font-medium ${p === page ? "bg-emerald-700 text-white" : "border border-stone-200 text-stone-600 hover:bg-stone-50"}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onPage(Math.min(total, page + 1))} disabled={page === total}
        className="h-9 px-3 rounded-lg border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40">
        <Icon name="chevronRight" className="w-4 h-4" />
      </button>
    </div>
  );
};

// OAuth buttons (visual only)
const OAuthButtons = ({ verb = "Masuk" }) => (
  <div className="space-y-2">
    <button onClick={(e) => e.preventDefault()} className="w-full h-10 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center gap-3 text-sm font-medium text-stone-700 transition">
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <path fill="#EA4335" d="M12 11v3.2h4.5c-.2 1.2-1.4 3.5-4.5 3.5-2.7 0-5-2.2-5-5s2.3-5 5-5c1.6 0 2.6.7 3.2 1.2l2.2-2.1C15.9 5.5 14.1 4.7 12 4.7c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2c4.1 0 6.9-2.9 6.9-7 0-.5 0-.8-.1-1.2z" />
      </svg>
      {verb} dengan Google
    </button>
    <button onClick={(e) => e.preventDefault()} className="w-full h-10 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 flex items-center justify-center gap-3 text-sm font-medium text-stone-700 transition">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-stone-800">
        <path d="M12 .5C5.4.5 0 5.9 0 12.6c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.9 18.6.5 12 .5z" />
      </svg>
      {verb} dengan GitHub
    </button>
  </div>
);

Object.assign(window, {
  Icon, Button, Input, Textarea, Select, Label, Checkbox, FormField,
  Badge, kategoriTone, StarRating, Avatar, FotoPlaceholder,
  FlashToast, ConfirmDialog, Divider, Pagination, OAuthButtons,
});
