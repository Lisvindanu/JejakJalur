import { router } from '@inertiajs/react';
import { IconCheck, IconLoader2, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    destinasiId: string;
    isVisited: boolean;
    className?: string;
}

export default function VisitButton({ destinasiId, isVisited, className }: Props) {
    const [loading, setLoading] = useState(false);

    function toggle() {
        setLoading(true);
        router.visit(
            isVisited
                ? `/destinasi/${destinasiId}/kunjungan`
                : `/destinasi/${destinasiId}/kunjungan`,
            {
                method: isVisited ? 'delete' : 'post',
                preserveScroll: true,
                onFinish: () => setLoading(false),
            },
        );
    }

    return (
        <button
            onClick={toggle}
            disabled={loading}
            title={isVisited ? 'Tandai belum dikunjungi' : 'Tandai sudah dikunjungi'}
            className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-60',
                isVisited
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                className,
            )}
        >
            {loading ? (
                <IconLoader2 size={16} className="animate-spin" />
            ) : isVisited ? (
                <IconCheck size={16} />
            ) : (
                <IconMapPin size={16} />
            )}
            {isVisited ? 'Sudah Dikunjungi' : 'Tandai Dikunjungi'}
        </button>
    );
}
