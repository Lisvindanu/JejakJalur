import { Head, Link, router } from '@inertiajs/react';
import { IconBell, IconBellOff, IconCheck } from '@tabler/icons-react';
import { formatTanggal } from '@/lib/utils';
import PublicLayout from '@/components/layouts/PublicLayout';

interface Notifikasi {
    id: string;
    data: {
        tipe: string;
        pesan: string;
        url?: string;
    };
    read_at: string | null;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface Props {
    notifikasi: PaginatedData<Notifikasi>;
}

const TIPE_ICON: Record<string, string> = {
    ulasan_baru: '💬',
    ulasan_disukai: '❤️',
    destinasi_diverifikasi: '✅',
};

export default function NotifikasiPage({ notifikasi }: Props) {
    function handleTandaiBaca() {
        router.patch('/notifikasi/baca', {}, { preserveScroll: true });
    }

    return (
        <PublicLayout>
            <Head title="Notifikasi" />

            <div className="min-h-screen px-[max(24px,calc(50%-576px))] py-20">
                <div className="mx-auto max-w-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                            Notifikasi
                        </h1>
                        {notifikasi.data.some((n) => !n.read_at) && (
                            <button
                                type="button"
                                onClick={handleTandaiBaca}
                                className="flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-emerald-700 dark:text-stone-400"
                            >
                                <IconCheck size={14} />
                                Tandai semua sudah dibaca
                            </button>
                        )}
                    </div>

                    {notifikasi.data.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-20 text-center">
                            <IconBellOff size={48} className="text-stone-300" />
                            <p className="text-stone-500">Belum ada notifikasi</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {notifikasi.data.map((n) => (
                                <NotifikasiItem key={n.id} notifikasi={n} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {notifikasi.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: notifikasi.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/notifikasi?page=${page}`}
                                    className={`rounded-lg px-3 py-1 text-sm ${
                                        page === notifikasi.current_page
                                            ? 'bg-emerald-700 text-white'
                                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

function NotifikasiItem({ notifikasi: n }: { notifikasi: Notifikasi }) {
    const icon = TIPE_ICON[n.data.tipe] ?? '🔔';
    const isUnread = !n.read_at;

    const content = (
        <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                isUnread
                    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40'
                    : 'border-stone-100 bg-white dark:border-stone-800 dark:bg-stone-900'
            }`}
        >
            <span className="mt-0.5 text-xl leading-none">{icon}</span>
            <div className="min-w-0 flex-1">
                <p
                    className={`text-sm ${
                        isUnread ? 'font-medium text-stone-800 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'
                    }`}
                >
                    {n.data.pesan}
                </p>
                <p className="mt-0.5 text-xs text-stone-400">{formatTanggal(n.created_at)}</p>
            </div>
            {isUnread && (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            )}
        </div>
    );

    return n.data.url ? (
        <Link href={n.data.url} className="block no-underline">
            {content}
        </Link>
    ) : (
        <div>{content}</div>
    );
}
