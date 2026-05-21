import { router } from '@inertiajs/react';
import {
    IconBookmark,
    IconBookmarkFilled,
    IconLoader2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import * as BookmarkController from '@/actions/App/Http/Controllers/BookmarkController';

interface Props {
    destinasiId: string;
    isBookmarked: boolean;
    className?: string;
}

export default function BookmarkButton({
    destinasiId,
    isBookmarked,
    className,
}: Props) {
    const [loading, setLoading] = useState(false);

    function toggle() {
        setLoading(true);
        const action = isBookmarked
            ? BookmarkController.hapus({ destinasi: destinasiId })
            : BookmarkController.simpan({ destinasi: destinasiId });

        router.visit(action.url, {
            method: action.method,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    }

    return (
        <button
            onClick={toggle}
            disabled={loading}
            title={isBookmarked ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
            className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-60',
                isBookmarked
                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                className,
            )}
        >
            {loading ? (
                <IconLoader2 size={16} className="animate-spin" />
            ) : isBookmarked ? (
                <IconBookmarkFilled size={16} />
            ) : (
                <IconBookmark size={16} />
            )}
            {isBookmarked ? 'Tersimpan' : 'Simpan'}
        </button>
    );
}
