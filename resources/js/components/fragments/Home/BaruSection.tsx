import { Link } from '@inertiajs/react';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';
import DestinasiCard from '@/components/fragments/Destinasi/DestinasiCard';
import type { Destinasi } from '@/types';

interface Props {
    destinasi: Destinasi[];
}

export default function BaruSection({ destinasi }: Props) {
    if (destinasi.length === 0) return null;

    return (
        <section className="bg-white px-[max(24px,calc(50%-576px))] py-[72px]">
            {/* Header */}
            <div className="mb-9 flex items-end justify-between">
                <div>
                    <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-emerald-600 uppercase">
                        <IconSparkles size={13} />
                        Baru Bulan Ini
                    </p>
                    <h2
                        className="font-serif leading-[1.15] font-normal text-stone-800"
                        style={{ fontSize: 'clamp(24px,3.5vw,34px)' }}
                    >
                        Destinasi Baru Ditemukan
                    </h2>
                </div>
                <Link
                    href="/destinasi?urut=terbaru"
                    className="hidden items-center gap-1.5 text-sm font-medium text-emerald-700 no-underline transition-colors hover:text-emerald-800 sm:flex"
                >
                    Lihat semua
                    <IconArrowRight size={15} />
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {destinasi.map((d) => (
                    <DestinasiCard key={d.id} destinasi={d} />
                ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 text-center sm:hidden">
                <Link
                    href="/destinasi?urut=terbaru"
                    className="text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800"
                >
                    Lihat semua →
                </Link>
            </div>
        </section>
    );
}
