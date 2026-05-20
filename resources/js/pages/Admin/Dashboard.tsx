import AdminLayout from '@/components/layouts/AdminLayout';
import StatsCard from '@/components/fragments/Admin/StatsCard';
import {
    IconBuilding,
    IconMapPin,
    IconTrain,
    IconUsers,
} from '@tabler/icons-react';
import { Head, Link } from '@inertiajs/react';
import { MOCK_STATISTIK } from '@/lib/mock-data';

interface Props {
    statistik?: {
        jumlah_kota: number;
        jumlah_stasiun: number;
        jumlah_destinasi: number;
        destinasi_verified: number;
        jumlah_pengguna: number;
    };
}

export default function Dashboard({ statistik: stat }: Props) {
    const statistik = stat ?? MOCK_STATISTIK;
    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard — Admin JejakJalur" />

            <div className="space-y-6">
                {/* Stats grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatsCard
                        label="Total Kota"
                        value={statistik.jumlah_kota}
                        icon={<IconBuilding size={18} />}
                        color="blue"
                    />
                    <StatsCard
                        label="Total Stasiun"
                        value={statistik.jumlah_stasiun}
                        icon={<IconTrain size={18} />}
                        color="emerald"
                    />
                    <StatsCard
                        label="Total Destinasi"
                        value={statistik.jumlah_destinasi}
                        icon={<IconMapPin size={18} />}
                        color="amber"
                        description={`${statistik.destinasi_verified} terverifikasi`}
                    />
                    <StatsCard
                        label="Total Pengguna"
                        value={statistik.jumlah_pengguna}
                        icon={<IconUsers size={18} />}
                        color="purple"
                    />
                </div>

                {/* Quick actions */}
                <div>
                    <h2 className="mb-3 text-sm font-semibold tracking-wide text-stone-600 uppercase">
                        Aksi Cepat
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Link
                            href="/admin/kota/buat"
                            className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <IconBuilding size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">
                                    Tambah Kota
                                </p>
                                <p className="text-xs text-stone-400">
                                    Tambah kota baru ke sistem
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/stasiun/buat"
                            className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <IconTrain size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">
                                    Tambah Stasiun
                                </p>
                                <p className="text-xs text-stone-400">
                                    Tambah stasiun ke kota
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/destinasi/buat"
                            className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                <IconMapPin size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-stone-800">
                                    Tambah Destinasi
                                </p>
                                <p className="text-xs text-stone-400">
                                    Tambah destinasi wisata baru
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
