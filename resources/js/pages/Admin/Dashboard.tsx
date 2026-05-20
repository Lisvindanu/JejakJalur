import AdminLayout from '@/components/layouts/AdminLayout';
import StatsCard from '@/components/fragments/Admin/StatsCard';
import {
    IconBuilding,
    IconMapPin,
    IconMessageCircle,
    IconRobot,
    IconStar,
    IconTrain,
    IconUsers,
} from '@tabler/icons-react';
import { Head, Link } from '@inertiajs/react';
import { MOCK_STATISTIK } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface DestinasiPending {
    id: string;
    nama: string;
    kategori: string;
    kota: string | null;
    created_at: string;
}

interface UlasanTerbaru {
    id: string;
    user_name: string | null;
    destinasi_nama: string | null;
    destinasi_id: string;
    rating: number;
    created_at: string;
}

interface Props {
    statistik?: {
        jumlah_kota: number;
        jumlah_stasiun: number;
        jumlah_destinasi: number;
        destinasi_verified: number;
        destinasi_pending: number;
        jumlah_pengguna: number;
        jumlah_ulasan: number;
        ai_pesan_hari_ini: number;
    };
    destinasiPending?: DestinasiPending[];
    ulasanTerbaru?: UlasanTerbaru[];
}

const KATEGORI_COLOR: Record<string, string> = {
    Wisata: 'bg-blue-100 text-blue-700',
    Kuliner: 'bg-amber-100 text-amber-700',
    UMKM: 'bg-emerald-100 text-emerald-700',
};

export default function Dashboard({ statistik: stat, destinasiPending = [], ulasanTerbaru = [] }: Props) {
    const statistik = stat ?? { ...MOCK_STATISTIK, destinasi_pending: 0, jumlah_ulasan: 0, ai_pesan_hari_ini: 0 };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard — Admin JejakJalur" />

            <div className="space-y-6">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    <StatsCard label="Total Kota" value={statistik.jumlah_kota} icon={<IconBuilding size={18} />} color="blue" />
                    <StatsCard label="Total Stasiun" value={statistik.jumlah_stasiun} icon={<IconTrain size={18} />} color="emerald" />
                    <StatsCard
                        label="Destinasi"
                        value={statistik.jumlah_destinasi}
                        icon={<IconMapPin size={18} />}
                        color="amber"
                        description={`${statistik.destinasi_verified} terverifikasi · ${statistik.destinasi_pending} pending`}
                    />
                    <StatsCard label="Pengguna" value={statistik.jumlah_pengguna} icon={<IconUsers size={18} />} color="purple" />
                    <StatsCard label="Total Ulasan" value={statistik.jumlah_ulasan} icon={<IconMessageCircle size={18} />} color="blue" />
                    <StatsCard label="Pesan AI Hari Ini" value={statistik.ai_pesan_hari_ini} icon={<IconRobot size={18} />} color="emerald" />
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* Destinasi pending */}
                    <div className="rounded-xl border border-stone-100 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-stone-800">Destinasi Menunggu Verifikasi</h2>
                            {statistik.destinasi_pending > 0 && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                    {statistik.destinasi_pending} pending
                                </span>
                            )}
                        </div>
                        {destinasiPending.length === 0 ? (
                            <p className="text-sm text-stone-400">Tidak ada destinasi pending.</p>
                        ) : (
                            <div className="space-y-2">
                                {destinasiPending.map((d) => (
                                    <div key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-stone-50 bg-stone-50 px-3 py-2.5">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-stone-800">{d.nama}</p>
                                            <p className="text-xs text-stone-400">{d.kota} · {d.created_at}</p>
                                        </div>
                                        <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-medium', KATEGORI_COLOR[d.kategori] ?? 'bg-stone-100 text-stone-600')}>
                                            {d.kategori}
                                        </span>
                                        <Link href={`/admin/destinasi/${d.id}/edit`} className="shrink-0 text-xs text-emerald-700 hover:underline">
                                            Verifikasi
                                        </Link>
                                    </div>
                                ))}
                                {statistik.destinasi_pending > 5 && (
                                    <Link href="/admin/destinasi" className="block text-center text-xs text-stone-400 hover:text-stone-600">
                                        Lihat semua ({statistik.destinasi_pending}) →
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Ulasan terbaru */}
                    <div className="rounded-xl border border-stone-100 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-stone-800">Ulasan Terbaru</h2>
                            <Link href="/admin/ulasan" className="text-xs text-stone-400 hover:text-stone-600">Lihat semua →</Link>
                        </div>
                        {ulasanTerbaru.length === 0 ? (
                            <p className="text-sm text-stone-400">Belum ada ulasan.</p>
                        ) : (
                            <div className="space-y-2">
                                {ulasanTerbaru.map((u) => (
                                    <div key={u.id} className="flex items-center gap-3 rounded-lg bg-stone-50 px-3 py-2.5">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-stone-800">{u.destinasi_nama}</p>
                                            <p className="text-xs text-stone-400">{u.user_name} · {u.created_at}</p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-0.5 text-xs text-amber-500">
                                            <IconStar size={11} className="fill-current" />
                                            {u.rating}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick actions */}
                <div>
                    <h2 className="mb-3 text-sm font-semibold tracking-wide text-stone-600 uppercase">Aksi Cepat</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Link href="/admin/kota/buat" className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><IconBuilding size={17} /></div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">Tambah Kota</p>
                                <p className="text-xs text-stone-400">Tambah kota baru ke sistem</p>
                            </div>
                        </Link>
                        <Link href="/admin/stasiun/buat" className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><IconTrain size={17} /></div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">Tambah Stasiun</p>
                                <p className="text-xs text-stone-400">Tambah stasiun ke kota</p>
                            </div>
                        </Link>
                        <Link href="/admin/destinasi/buat" className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><IconMapPin size={17} /></div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">Tambah Destinasi</p>
                                <p className="text-xs text-stone-400">Tambah destinasi wisata baru</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
