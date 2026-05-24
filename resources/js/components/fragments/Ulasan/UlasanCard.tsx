import { router } from '@inertiajs/react';
import { IconFlag, IconHeart, IconHeartFilled, IconMessageReply, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import RatingDisplay from '@/components/elements/Rating';
import { formatTanggal } from '@/lib/utils';
import type { Ulasan, UlasanKomentar } from '@/types';

interface UlasanCardProps {
    ulasan: Ulasan;
    canEdit?: boolean;
    canLike?: boolean;
    canReport?: boolean;
    canReply?: boolean;
    currentUserId?: number;
    userLiked?: boolean;
    destinasiId?: string;
    onEdit?: (ulasan: Ulasan) => void;
    onDelete?: (id: string) => void;
}

export default function UlasanCard({
    ulasan,
    canEdit,
    canLike,
    canReport,
    canReply,
    currentUserId,
    userLiked = false,
    destinasiId,
    onEdit,
    onDelete,
}: UlasanCardProps) {
    const [liked, setLiked] = useState(userLiked);
    const [count, setCount] = useState(ulasan.likes_count ?? 0);
    const [showReportForm, setShowReportForm] = useState(false);
    const [alasan, setAlasan] = useState('');
    const [reported, setReported] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyLoading, setReplyLoading] = useState(false);

    function handleReply() {
        if (!destinasiId || !replyText.trim()) return;
        setReplyLoading(true);
        router.post(
            `/destinasi/${destinasiId}/ulasan/${ulasan.id}/balas`,
            { konten: replyText.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setReplyText('');
                    setShowReplyForm(false);
                    setReplyLoading(false);
                },
                onError: () => setReplyLoading(false),
            },
        );
    }

    function handleDeleteKomentar(komentar: UlasanKomentar) {
        if (!destinasiId) return;
        router.delete(
            `/destinasi/${destinasiId}/ulasan/${ulasan.id}/komentar/${komentar.id}`,
            { preserveScroll: true },
        );
    }

    function handleReport() {
        if (!destinasiId || reported) return;
        router.post(
            `/destinasi/${destinasiId}/ulasan/${ulasan.id}/report`,
            { alasan: alasan || null },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setReported(true);
                    setShowReportForm(false);
                    setAlasan('');
                },
            },
        );
    }

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

            {/* Foto ulasan */}
            {(ulasan.foto_urls ?? []).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {ulasan.foto_urls!.map((url, i) => (
                        <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-20 w-20 overflow-hidden rounded-lg border border-stone-200"
                        >
                            <img
                                src={url}
                                alt={`foto ${i + 1}`}
                                className="h-full w-full object-cover transition-opacity hover:opacity-80"
                            />
                        </a>
                    ))}
                </div>
            )}

            {/* Like + Report + Reply */}
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
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

                    {canReply && (
                        <button
                            type="button"
                            onClick={() => setShowReplyForm((v) => !v)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-stone-300 transition-colors hover:text-emerald-600"
                        >
                            <IconMessageReply size={13} />
                            Balas
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {canReport && !reported && (
                        <button
                            type="button"
                            onClick={() => setShowReportForm((v) => !v)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-stone-300 transition-colors hover:text-amber-500"
                            title="Laporkan ulasan"
                        >
                            <IconFlag size={13} />
                            Laporkan
                        </button>
                    )}
                    {reported && (
                        <span className="text-xs text-stone-400">Sudah dilaporkan</span>
                    )}
                </div>
            </div>

            {/* Reply form */}
            {showReplyForm && canReply && (
                <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium text-emerald-700">Balas ulasan ini</p>
                        <button
                            type="button"
                            onClick={() => setShowReplyForm(false)}
                            className="text-emerald-400 hover:text-emerald-600"
                        >
                            <IconX size={13} />
                        </button>
                    </div>
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        maxLength={500}
                        rows={2}
                        placeholder="Tulis balasan..."
                        className="w-full resize-none rounded border border-emerald-200 bg-white px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                    <button
                        type="button"
                        onClick={handleReply}
                        disabled={replyLoading || !replyText.trim()}
                        className="mt-2 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        Kirim Balasan
                    </button>
                </div>
            )}

            {/* Komentar / balasan */}
            {(ulasan.komentar ?? []).length > 0 && (
                <div className="mt-3 space-y-2 border-t border-stone-100 pt-3">
                    {ulasan.komentar!.map((k) => (
                        <div key={k.id} className="flex items-start gap-2.5 rounded-lg bg-stone-50 px-3 py-2.5">
                            <Avatar name={k.user.name} src={k.user.avatar} size="sm" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-semibold text-stone-700">{k.user.name}</span>
                                    {k.is_admin && (
                                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 uppercase">
                                            Admin
                                        </span>
                                    )}
                                    <span className="text-[10px] text-stone-400">{formatTanggal(k.created_at)}</span>
                                </div>
                                <p className="mt-0.5 text-xs text-stone-600">{k.konten}</p>
                            </div>
                            {(currentUserId === k.user.id || canReply) && (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteKomentar(k)}
                                    className="shrink-0 text-stone-300 hover:text-red-400"
                                >
                                    <IconX size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Report form */}
            {showReportForm && canReport && !reported && (
                <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium text-amber-700">Alasan laporan (opsional)</p>
                        <button
                            type="button"
                            onClick={() => setShowReportForm(false)}
                            className="text-amber-400 hover:text-amber-600"
                        >
                            <IconX size={13} />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={alasan}
                        onChange={(e) => setAlasan(e.target.value)}
                        maxLength={200}
                        placeholder="Mis: konten tidak pantas, spam..."
                        className="w-full rounded border border-amber-200 bg-white px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                        type="button"
                        onClick={handleReport}
                        className="mt-2 rounded-lg bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
                    >
                        Kirim Laporan
                    </button>
                </div>
            )}
        </div>
    );
}
