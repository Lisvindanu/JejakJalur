import AdminLayout from '@/components/layouts/AdminLayout';
import {
    IconBuilding,
    IconCheck,
    IconMapPin,
    IconMessageCircle,
    IconPlus,
    IconRobot,
    IconStar,
    IconTrain,
    IconUsers,
} from '@tabler/icons-react';
import { Head, Link } from '@inertiajs/react';
import { MOCK_STATISTIK } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

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

type Tone = 'emerald' | 'sky' | 'amber' | 'indigo' | 'rose' | 'stone';

const toneClasses: Record<Tone, string> = {
    emerald: 'bg-emerald-50 text-emerald-700',
    sky: 'bg-sky-50 text-sky-700',
    amber: 'bg-amber-50 text-amber-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    rose: 'bg-rose-50 text-rose-700',
    stone: 'bg-stone-100 text-stone-700',
};

const KATEGORI_COLOR: Record<string, string> = {
    Wisata: 'bg-blue-100 text-blue-700',
    Kuliner: 'bg-amber-100 text-amber-700',
    UMKM: 'bg-emerald-100 text-emerald-700',
};

function StatCard({
    icon,
    label,
    value,
    sub,
    tone = 'emerald',
}: {
    icon: ReactNode;
    label: string;
    value: number | string;
    sub?: ReactNode;
    tone?: Tone;
}) {
    return (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <span
                    className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-lg',
                        toneClasses[tone],
                    )}
                >
                    {icon}
                </span>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
                {value}
            </div>
            <div className="mt-0.5 text-xs text-stone-500">{label}</div>
            {sub && <div className="mt-2 text-xs text-stone-500">{sub}</div>}
        </div>
    );
}

export default function Dashboard({
    statistik: stat,
    destinasiPending = [],
    ulasanTerbaru = [],
}: Props) {
    const statistik = stat ?? {
        ...MOCK_STATISTIK,
        destinasi_pending: 0,
        jumlah_ulasan: 0,
        ai_pesan_hari_ini: 0,
    };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard — Admin JejakJalur" />

            <div className="space-y-8">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        icon={<IconBuilding size={16} />}
                        label="Kota"
                        value={statistik.jumlah_kota}
                        tone="emerald"
                    />
                    <StatCard
                        icon={<IconTrain size={16} />}
                        label="Stasiun"
                        value={statistik.jumlah_stasiun}
                        tone="sky"
                    />
                    <StatCard
                        icon={<IconMapPin size={16} />}
                        label="Destinasi"
                        value={statistik.jumlah_destinasi}
                        tone="amber"
                        sub={
                            <>
                                <span className="font-medium text-emerald-700">
                                    {statistik.destinasi_verified} verified
                                </span>
                                {' · '}
                                <span className="font-medium text-amber-700">
                                    {statistik.destinasi_pending} pending
                                </span>
                            </>
                        }
                    />
                    <StatCard
                        icon={<IconUsers size={16} />}
                        label="Pengguna"
                        value={statistik.jumlah_pengguna}
                        tone="indigo"
                    />
                    <StatCard
                        icon={<IconStar size={16} />}
                        label="Ulasan"
                        value={statistik.jumlah_ulasan}
                        tone="rose"
                    />
                    <StatCard
                        icon={<IconRobot size={16} />}
                        label="AI pesan hari ini"
                        value={statistik.ai_pesan_hari_ini}
                        tone="stone"
                    />
                </div>

                {/* Pending + Reviews */}
                <div className="grid gap-6 xl:grid-cols-2">
                    {/* Destinasi pending */}
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                            <div>
                                <h3 className="text-sm font-semibold text-stone-900">
                                    Destinasi Menunggu Verifikasi
                                </h3>
                                <p className="text-xs text-stone-500">
                                    {statistik.destinasi_pending} antri menunggu moderator.
                                </p>
                            </div>
                            <Link
                                href="/admin/destinasi"
                                className="text-xs font-medium text-emerald-700 no-underline hover:text-emerald-800"
                            >
                                Semua →
                            </Link>
                        </div>

                        {destinasiPending.length === 0 ? (
                            <div className="px-5 py-10 text-center">
                                <IconCheck
                                    size={32}
                                    className="mx-auto text-emerald-400"
                                />
                                <p className="mt-2 text-sm text-stone-500">
                                    Tidak ada destinasi yang menunggu verifikasi.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-stone-100">
                                {destinasiPending.slice(0, 4).map((d) => (
                                    <div
                                        key={d.id}
                                        className="flex items-center gap-3 px-5 py-3 hover:bg-stone-50"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-stone-800">
                                                {d.nama}
                                            </p>
                                            <p className="flex items-center gap-1.5 text-xs text-stone-500">
                                                <span
                                                    className={cn(
                                                        'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                                                        KATEGORI_COLOR[d.kategori] ??
                                                            'bg-stone-100 text-stone-600',
                                                    )}
                                                >
                                                    {d.kategori}
                                                </span>
                                                <span>{d.kota}</span>
                                            </p>
                                        </div>
                                        <Link
                                            href={`/admin/destinasi/${d.id}/edit`}
                                            className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 no-underline transition-colors hover:bg-emerald-100"
                                        >
                                            Verifikasi
                                        </Link>
                                    </div>
                                ))}
                                {statistik.destinasi_pending > 4 && (
                                    <div className="px-5 py-2.5">
                                        <Link
                                            href="/admin/destinasi"
                                            className="text-xs text-stone-400 no-underline hover:text-stone-600"
                                        >
                                            Lihat semua ({statistik.destinasi_pending}) →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Ulasan terbaru */}
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                            <div>
                                <h3 className="text-sm font-semibold text-stone-900">
                                    Ulasan Terbaru
                                </h3>
                                <p className="text-xs text-stone-500">
                                    Pantau aktivitas komunitas.
                                </p>
                            </div>
                            <Link
                                href="/admin/ulasan"
                                className="text-xs font-medium text-emerald-700 no-underline hover:text-emerald-800"
                            >
                                Semua →
                            </Link>
                        </div>

                        {ulasanTerbaru.length === 0 ? (
                            <div className="px-5 py-10 text-center">
                                <IconMessageCircle
                                    size={32}
                                    className="mx-auto text-stone-300"
                                />
                                <p className="mt-2 text-sm text-stone-500">
                                    Belum ada ulasan.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-stone-100">
                                {ulasanTerbaru.map((u) => (
                                    <div
                                        key={u.id}
                                        className="px-5 py-3 hover:bg-stone-50"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="truncate text-sm font-medium text-stone-800">
                                                {u.destinasi_nama}
                                            </p>
                                            <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-amber-600">
                                                <IconStar
                                                    size={11}
                                                    className="fill-current"
                                                />
                                                {u.rating}
                                            </div>
                                        </div>
                                        <p className="mt-0.5 text-xs text-stone-500">
                                            {u.user_name} · {u.created_at}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick actions */}
                <div className="grid gap-3 sm:grid-cols-3">
                    <Link
                        href="/admin/kota/buat"
                        className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-left no-underline transition hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                        <IconPlus size={16} className="text-emerald-700" />
                        <p className="mt-2 text-sm font-semibold text-stone-800">
                            Tambah Kota
                        </p>
                        <p className="text-xs text-stone-500">
                            Daftarkan kota baru ke sistem.
                        </p>
                    </Link>
                    <Link
                        href="/admin/stasiun/buat"
                        className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-left no-underline transition hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                        <IconPlus size={16} className="text-emerald-700" />
                        <p className="mt-2 text-sm font-semibold text-stone-800">
                            Tambah Stasiun
                        </p>
                        <p className="text-xs text-stone-500">
                            Hubungkan stasiun baru di jalur kereta.
                        </p>
                    </Link>
                    <Link
                        href="/admin/destinasi/buat"
                        className="rounded-xl border border-stone-200 bg-white px-5 py-4 text-left no-underline transition hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                        <IconPlus size={16} className="text-emerald-700" />
                        <p className="mt-2 text-sm font-semibold text-stone-800">
                            Tambah Destinasi
                        </p>
                        <p className="text-xs text-stone-500">
                            Catat wisata, kuliner, atau UMKM.
                        </p>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
