import { Head, Link, router } from '@inertiajs/react';
import {
    IconClock,
    IconEdit,
    IconMapPin,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import Badge from '@/components/elements/Badge';
import Button from '@/components/elements/Button';
import Pagination from '@/components/elements/Pagination';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { Destinasi, PaginatedData } from '@/types';

interface Props {
    destinasi: PaginatedData<Destinasi>;
}

export default function MilikSaya({ destinasi }: Props) {
    const [konfirmasiHapus, setKonfirmasiHapus] = useState<string | null>(null);

    function hapus(id: string) {
        router.delete(`/destinasi/${id}`, {
            preserveScroll: true,
            onFinish: () => setKonfirmasiHapus(null),
        });
    }

    return (
        <PublicLayout>
            <Head title="Destinasi Saya — JejakJalur" />

            {/* Page header */}
            <div className="border-b border-stone-200 bg-stone-50 px-[max(24px,calc(50%-576px))] pt-24 pb-8">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                    Submission Saya
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1
                            className="font-serif leading-tight font-normal text-stone-800"
                            style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                        >
                            Destinasi Saya
                        </h1>
                        <p className="mt-2 max-w-[640px] text-sm text-stone-500">
                            Destinasi yang kamu kirim. Bisa diedit selama belum
                            diverifikasi admin.
                        </p>
                    </div>
                    <Link href="/destinasi/buat">
                        <Button
                            variant="primary"
                            size="md"
                            leftIcon={<IconPlus size={15} />}
                        >
                            Tambah Destinasi
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="px-[max(24px,calc(50%-576px))] py-10">
                {destinasi.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 px-6 py-16 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                            <IconMapPin size={22} />
                        </div>
                        <p className="font-serif text-lg text-stone-800">
                            Belum ada destinasi
                        </p>
                        <p className="mx-auto mt-1 max-w-[400px] text-sm text-stone-500">
                            Bagikan destinasi favoritmu — wisata, kuliner, atau
                            UMKM — supaya pengunjung lain bisa menemukannya.
                        </p>
                        <Link
                            href="/destinasi/buat"
                            className="mt-5 inline-block"
                        >
                            <Button
                                variant="primary"
                                size="md"
                                leftIcon={<IconPlus size={15} />}
                            >
                                Tambah Destinasi Pertama
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {destinasi.data.map((d) => (
                            <div
                                key={d.id}
                                className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 sm:flex-row"
                            >
                                {/* Thumbnail */}
                                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-stone-100 sm:h-24 sm:w-32">
                                    {d.foto_url ? (
                                        <img
                                            src={d.foto_url}
                                            alt={d.nama}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-stone-300">
                                            <IconMapPin size={24} />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                        <Badge kategori={d.kategori}>
                                            {d.kategori}
                                        </Badge>
                                        {d.is_verified ? (
                                            <Badge verified>Terverifikasi</Badge>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-amber-700">
                                                <IconClock size={10} />
                                                Menunggu Verifikasi
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        href={`/destinasi/${d.id}`}
                                        className="block font-serif text-lg text-stone-800 no-underline hover:text-emerald-700"
                                    >
                                        {d.nama}
                                    </Link>
                                    <p className="mt-0.5 line-clamp-1 text-xs text-stone-500">
                                        {d.alamat}
                                    </p>
                                    {d.stasiun && (
                                        <p className="mt-1 text-xs text-stone-400">
                                            Stasiun terdekat: {d.stasiun.nama}
                                            {d.stasiun.kota?.nama
                                                ? ` — ${d.stasiun.kota.nama}`
                                                : ''}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 items-start gap-2">
                                    {!d.is_verified && (
                                        <>
                                            <Link
                                                href={`/destinasi/${d.id}/edit`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    leftIcon={
                                                        <IconEdit size={13} />
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            {konfirmasiHapus === d.id ? (
                                                <div className="flex items-center gap-1.5">
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            hapus(d.id)
                                                        }
                                                    >
                                                        Yakin?
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setKonfirmasiHapus(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        Batal
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setKonfirmasiHapus(d.id)
                                                    }
                                                    leftIcon={
                                                        <IconTrash size={13} />
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {destinasi.last_page > 1 && (
                    <div className="mt-8">
                        <Pagination data={destinasi} />
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
