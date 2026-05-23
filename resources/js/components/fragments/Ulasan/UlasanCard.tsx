import { router } from '@inertiajs/react';
import { IconHeart, IconHeartFilled, IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import RatingDisplay from '@/components/elements/Rating';
import { formatTanggal } from '@/lib/utils';
import type { Ulasan } from '@/types';

interface UlasanCardProps {
    ulasan: Ulasan;
    canEdit?: boolean;
    canLike?: boolean;
    userLiked?: boolean;
    destinasiId?: string;
    onEdit?: (ulasan: Ulasan) => void;
    onDelete?: (id: string) => void;
}

export default function UlasanCard({
    ulasan,
    canEdit,
    canLike,
    userLiked = false,
    destinasiId,
    onEdit,
    onDelete,
}: UlasanCardProps) {
    const [liked, setLiked] = useState(userLiked);
    const [count, setCount] = useState(ulasan.likes_count ?? 0);

    function handleLike() {
        if (!canLike || !destinasiId) return;
        const nowLiked = !liked;
        setLiked(nowLiked);
        setCount((c) => c + (nowLiked ? 1 : -1));

        const url = `/destinasi/${destinasiId}/ulasan/${ulasan.id}/like`;
        if (nowLiked) {
            router.post(url, {}, { preserveScroll: true, preserveState: true });
        } else {
            router.delete(url, { preserveScroll: true, preserveState: true });
        }
    }

    return (
        <div className="rounded-xl border border-stone-100 bg-white p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <Avatar
                        name={ulasan.user.name}
                        src={ulasan.user.avatar}
                        size="sm"
                    />
                    <div>
                        <p className="text-sm font-semibold text-stone-800">
                            {ulasan.user.name}
                        </p>
                        <p className="text-xs text-stone-400">
                            {formatTanggal(ulasan.created_at)}
                        </p>
                    </div>
                </div>
                {canEdit && (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<IconPencil size={13} />}
                            onClick={() => onEdit?.(ulasan)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<IconTrash size={13} />}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => onDelete?.(ulasan.id)}
                        >
                            Hapus
                        </Button>
                    </div>
                )}
            </div>
            <RatingDisplay value={ulasan.rating} size={12} />
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {ulasan.konten}
            </p>

            {/* Like button */}
            <div className="mt-3 flex items-center">
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={!canLike}
                    className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors ${
                        liked
                            ? 'text-rose-500'
                            : canLike
                              ? 'text-stone-400 hover:text-rose-400'
                              : 'cursor-default text-stone-300'
                    }`}
                >
                    {liked ? (
                        <IconHeartFilled size={14} />
                    ) : (
                        <IconHeart size={14} />
                    )}
                    {count > 0 && <span>{count}</span>}
                </button>
            </div>
        </div>
    );
}
