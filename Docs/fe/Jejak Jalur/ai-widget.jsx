// JejakJalur — Jejak AI floating widget

const JEJAK_AI_INTRO = "Halo! Saya Jejak AI, asisten perjalanan Anda. Tanyakan tentang destinasi, kuliner, atau rute kereta di Indonesia.";

const FAKE_REPLIES = [
  (q) => {
    const cities = KOTA.filter(k => q.toLowerCase().includes(k.nama.toLowerCase()));
    if (cities.length) {
      const k = cities[0];
      const dests = DESTINASI.filter(d => {
        const s = getStasiun(d.stasiunId);
        return s && s.kotaId === k.id && d.verified;
      }).slice(0, 3);
      return `Di **${k.nama}** ada beberapa destinasi favorit:\n${dests.map(d => `• ${d.nama} (${d.kategori}) — ${d.rating.toFixed(1)}★`).join("\n")}\n\nMau yang mana yang dibahas lebih detail?`;
    }
    return null;
  },
  (q) => {
    if (/rute|jalur|stasiun|kereta/i.test(q)) {
      return "Untuk merencanakan rute, kamu bisa pakai halaman **Perencana Rute**. Pilih kota & stasiun asal, lalu kota & stasiun tujuan — saya akan tampilkan jalur kereta dan pemberhentian di antaranya.";
    }
    return null;
  },
  (q) => {
    if (/kuliner|makanan|jajanan/i.test(q)) {
      const top = DESTINASI.filter(d => d.kategori === "Kuliner" && d.verified).sort((a,b)=>b.rating-a.rating).slice(0,3);
      return `Kuliner top pilihan pejalan:\n${top.map(d => `• **${d.nama}** — ${getKotaByStasiun(d.stasiunId)?.nama} (${d.rating.toFixed(1)}★)`).join("\n")}`;
    }
    return null;
  },
  (q) => {
    if (/umkm|kerajinan|oleh-oleh/i.test(q)) {
      const top = DESTINASI.filter(d => d.kategori === "UMKM" && d.verified).slice(0,3);
      return `UMKM yang bisa kamu kunjungi:\n${top.map(d => `• ${d.nama} — ${getKotaByStasiun(d.stasiunId)?.nama}`).join("\n")}`;
    }
    return null;
  },
];

const FALLBACK = "Saya bisa bantu dengan: rekomendasi destinasi per kota, info kuliner & UMKM, dan perencanaan rute kereta antar-stasiun. Coba tanya 'destinasi di Bandung' atau 'rute Jakarta ke Yogya'.";

const fakeReply = (q) => {
  for (const f of FAKE_REPLIES) {
    const r = f(q);
    if (r) return r;
  }
  return FALLBACK;
};

const JejakAiWidget = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([{ role: "ai", text: JEJAK_AI_INTRO }]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages(m => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: "ai", text: fakeReply(q) }]);
    }, 900 + Math.random() * 600);
  };

  const suggestions = ["Destinasi di Bandung?", "Rute Jakarta ke Yogya", "Kuliner enak di Surabaya"];

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[1200] group flex items-center gap-2 pl-2 pr-4 h-12 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/30 transition-all hover:shadow-xl"
        >
          <span className="w-8 h-8 rounded-full bg-white/15 inline-flex items-center justify-center">
            <Icon name="bot" className="w-4 h-4" />
          </span>
          <span className="text-sm font-medium">Jejak AI</span>
          <span className="absolute -top-1 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-700 animate-pulse" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[1200] w-[min(92vw,360px)] h-[min(70vh,560px)] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-emerald-700 text-white flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white/15 inline-flex items-center justify-center">
              <Icon name="bot" className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">Jejak AI</div>
              <div className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Online · asisten perjalanan
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-md hover:bg-white/10">
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-stone-50/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "ai" && (
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center mr-2 shrink-0">
                    <Icon name="bot" className="w-3.5 h-3.5" />
                  </span>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "bg-emerald-700 text-white rounded-br-md" : "bg-white border border-stone-200 text-stone-700 rounded-bl-md"}`}>
                  {m.text.split("**").map((chunk, ci) => ci % 2 ? <strong key={ci}>{chunk}</strong> : chunk)}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center mr-2 shrink-0">
                  <Icon name="bot" className="w-3.5 h-3.5" />
                </span>
                <div className="bg-white border border-stone-200 px-3 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="pt-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Coba tanya</div>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => { setInput(s); setTimeout(() => { setInput(""); setMessages(m => [...m, { role: "user", text: s }]); setTyping(true); setTimeout(() => { setTyping(false); setMessages(m => [...m, { role: "ai", text: fakeReply(s) }]); }, 900); }, 50); }}
                      className="text-left text-sm px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 hover:border-emerald-300 transition text-stone-700">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-stone-200 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-end gap-2">
              <Textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ketik pesan..." className="!py-2 !text-sm !min-h-[40px] !rounded-xl" maxLength={500} />
              <button type="submit" disabled={!input.trim()} className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-200 disabled:text-stone-400 text-white inline-flex items-center justify-center shrink-0 transition">
                <Icon name="send" className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 text-[10px] text-stone-400 text-center">Jejak AI dapat membuat kesalahan. Verifikasi info penting.</div>
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { JejakAiWidget });
