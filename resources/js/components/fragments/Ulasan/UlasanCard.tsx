import { IconPencil, IconTrash } from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import RatingDisplay from '@/components/elements/Rating';
import { formatTanggal } from '@/lib/utils';
import type { Ulasan } from '@/types';

interface UlasanCardProps {
    ulasan: Ulasan;
    canEdit?: boolean;
    onEdit?: (ulasan: Ulasan) => void;
    onDelete?: (id: string) => void;
}

export default function UlasanCard({
    ulasan,
    canEdit,
    onEdit,
    onDelete,
}: UlasanCardProps) {
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
            <RatingDisplay value={ulasan.nilai} size={12} />
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {ulasan.komentar}
            </p>
        </div>
    );
}
