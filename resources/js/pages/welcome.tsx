import { Head, Link } from '@inertiajs/react';

interface Stasiun {
    id: string;
    nama: string;
    kode_stasiun: string;
}

interface Kota {
    id: string;
    nama: string;
    kode_ibukota: string;
    stasiun: Stasiun[];
}

interface Destinasi {
    id: string;
    nama: string;
    deskripsi: string;
    alamat: string;
    kategori: string;
    rating: string;
    foto: string | null;
    stasiun: {
        nama: string;
        kota: { nama: string };
    };
}

interface Props {
    destinasiFeatured: Destinasi[];
    semuaKota: Kota[];
}

export default function Welcome({ destinasiFeatured, semuaKota }: Props) {
    return (
        <>
            <Head title="Temukan Permata Tersembunyi di Jalur Kereta" />

            <div className="min-h-screen bg-stone-50 text-stone-800">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                        <Link href="/" className="text-xl font-bold text-emerald-700">
                            JejakJalur
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/destinasi" className="text-sm text-stone-600 hover:text-emerald-700">
                                Jelajahi
                            </Link>
                            <Link
                                href="/masuk"
                                className="rounded-md bg-emerald-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-800"
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 py-20 text-white">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-200">
                            Wisata & Kuliner via Kereta Api
                        </p>
                        <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
                            Temukan Permata Tersembunyi
                            <br />
                            di Setiap Stasiun
                        </h1>
                        <p className="mx-auto mb-8 max-w-xl text-emerald-100">
                            Direktori destinasi wisata dan kuliner terbaik yang mudah dijangkau dari stasiun kereta api terdekat.
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/destinasi"
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-50"
                            >
                                Mulai Jelajahi
                            </Link>
                            <Link
                                href="/daftar"
                                className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
                            >
                                Daftar Gratis
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Kota dengan Stasiun */}
                {semuaKota.length > 0 && (
                    <section className="py-14">
                        <div className="mx-auto max-w-6xl px-4">
                            <h2 className="mb-6 text-2xl font-bold text-stone-800">Jelajahi Berdasarkan Kota</h2>
                            <div className="flex flex-wrap gap-3">
                                {semuaKota.map((kota) => (
                                    <Link
                                        key={kota.id}
                                        href={`/destinasi?kota_id=${kota.id}`}
                                        className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700"
                                    >
                                        {kota.nama}
                                        <span className="ml-1.5 text-xs text-stone-400">
                                            {kota.stasiun.length} stasiun
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Destinasi Featured */}
                {destinasiFeatured.length > 0 && (
                    <section className="bg-white py-14">
                        <div className="mx-auto max-w-6xl px-4">
                            <div className="mb-6 flex items-end justify-between">
                                <h2 className="text-2xl font-bold text-stone-800">Destinasi Pilihan</h2>
                                <Link href="/destinasi" className="text-sm font-medium text-emerald-700 hover:underline">
                                    Lihat semua
                                </Link>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {destinasiFeatured.map((destinasi) => (
                                    <Link
                                        key={destinasi.id}
                                        href={`/destinasi/${destinasi.id}`}
                                        className="group overflow-hidden rounded-xl border border-stone-100 bg-stone-50 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex h-36 items-center justify-center bg-emerald-100 text-4xl">
                                            {destinasi.kategori === 'Kuliner' ? '🍜' : '🏔️'}
                                        </div>
                                        <div className="p-4">
                                            <span className="mb-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                {destinasi.kategori}
                                            </span>
                                            <h3 className="font-semibold text-stone-800 group-hover:text-emerald-700">
                                                {destinasi.nama}
                                            </h3>
                                            <p className="mt-0.5 text-xs text-stone-500">
                                                {destinasi.stasiun.nama} — {destinasi.stasiun.kota.nama}
                                            </p>
                                            <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                                                <span>★</span>
                                                <span className="font-medium">{Number(destinasi.rating).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-400">
                    <p>JejakJalur &copy; {new Date().getFullYear()} — Temukan Indonesia lewat jalur kereta.</p>
                </footer>
            </div>
        </>
    );
}
