import { router } from '@inertiajs/react';
import { IconCalendarPlus, IconLoader2 } from '@tabler/icons-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    destinasiId: string;
    isInWishlist: boolean;
    className?: string;
}

export default function WishListButton({ destinasiId, isInWishlist, className }: Props) {
    const [loading, setLoading] = useState(false);

    function toggle() {
        setLoading(true);
        router.visit(`/destinasi/${destinasiId}/wishlist`, {
            method: isInWishlist ? 'delete' : 'post',
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    }

    return (
        <button
            onClick={toggle}
            disabled={loading}
            title={isInWishlist ? 'Hapus dari rencana trip' : 'Tambah ke rencana trip'}
            className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-60',
                isInWishlist
                    ? 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                className,
            )}
        >
            {loading ? (
                <IconLoader2 size={16} className="animate-spin" />
            ) : (
                <IconCalendarPlus size={16} />
            )}
            {isInWishlist ? 'Di Rencana Trip' : 'Rencana Trip'}
        </button>
    );
}
