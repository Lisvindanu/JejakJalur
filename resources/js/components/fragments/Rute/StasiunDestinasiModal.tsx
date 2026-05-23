import { useEffect, useState } from 'react';
import {
    IconExternalLink,
    IconLoader2,
    IconMapPin,
    IconMountain,
    IconShoppingBag,
    IconToolsKitchen2,
} from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import Modal from '@/components/elements/Modal';
import Badge from '@/components/elements/Badge';
import RatingDisplay from '@/components/elements/Rating';
import type { Destinasi, StasiunRute } from '@/types';

// ── Atom: KategoriIcon ────────────────────────────────────────────────────────

function KategoriIcon({ kategori }: { kategori: string }) {
    if (kategori === 'Kuliner')
        return <IconToolsKitchen2 size={20} className="text-amber-400" />;
    if (kategori === 'UMKM')
        return <IconShoppingBag size={20} className="text-indigo-400" />;
    return <IconMountain size={20} className="text-emerald-400" />;
}

// ── Molecule: DestinasiItem ───────────────────────────────────────────────────

function DestinasiItem({ destinasi }: { destinasi: Destinasi }) {
    return (
        <Link
            href={`/destinasi/${destinasi.id}`}
            className="flex gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3 no-underline transition-all hover:border-emerald-200 hover:bg-emerald-50"
        >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-100 bg-white">
                {destinasi.foto_url ? (
                    <img
                        src={destinasi.foto_url}
                        alt={destinasi.nama}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <KategoriIcon kategori={destinasi.kategori} />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-snug font-semibold text-stone-800">
                        {destinasi.nama}
                    </p>
                    <IconExternalLink
                        size={13}
                        className="mt-0.5 shrink-0 text-stone-300"
                    />
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <Badge kategori={destinasi.kategori}>
                        {destinasi.kategori}
                    </Badge>
                </div>

                <div className="mt-1.5">
                    <RatingDisplay value={Number(destinasi.rating)} />
                </div>

                {destinasi.alamat && (
                    <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-stone-400">
                        <IconMapPin size={10} />
                        {destinasi.alamat}
                    </p>
                )}
            </div>
        </Link>
    );
}

// ── Organism: StasiunDestinasiModal ──────────────────────────────────────────

interface Props {
    stasiun: StasiunRute | null;
    open: boolean;
    onClose: () => void;
}

export default function StasiunDestinasiModal({
    stasiun,
    open,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open || !stasiun) return;

        setLoading(true);
        setError(null);
        setDestinasi([]);

        fetch(`/rute/stasiun/${stasiun.id}/destinasi`)
            .then((res) => res.json())
            .then((data: unknown) => {
                setDestinasi(Array.isArray(data) ? (data as Destinasi[]) : []);
            })
            .catch(() => setError('Gagal memuat destinasi.'))
            .finally(() => setLoading(false));
    }, [open, stasiun?.id]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={stasiun ? `Destinasi di ${stasiun.nama}` : ''}
            size="lg"
        >
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <IconLoader2
                        size={24}
                        className="animate-spin text-emerald-600"
                    />
                </div>
            )}

            {error && (
                <p className="py-10 text-center text-sm text-red-500">
                    {error}
                </p>
            )}

            {!loading && !error && destinasi.length === 0 && (
                <div className="py-12 text-center">
                    <IconMapPin
                        size={32}
                        className="mx-auto mb-3 text-stone-200"
                    />
                    <p className="text-sm text-stone-500">
                        Belum ada destinasi terverifikasi di stasiun ini.
                    </p>
                </div>
            )}

            {!loading && destinasi.length > 0 && (
                <div className="flex flex-col gap-2.5">
                    <p className="mb-1 text-xs text-stone-400">
                        {destinasi.length} destinasi terverifikasi
                    </p>
                    {destinasi.map((d) => (
                        <DestinasiItem key={d.id} destinasi={d} />
                    ))}
                </div>
            )}
        </Modal>
    );
}
