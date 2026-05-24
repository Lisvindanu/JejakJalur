import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/components/elements/Modal';
import RatingDisplay from '@/components/elements/Rating';
import UlasanCard from '@/components/fragments/Ulasan/UlasanCard';
import UlasanForm from '@/components/fragments/Ulasan/UlasanForm';
import type { Ulasan } from '@/types';

interface UlasanListProps {
    ulasan: Ulasan[];
    currentUserId?: number;
    destinasiId: string;
    destinasiOwnerId?: string;
    isAdmin?: boolean;
    likedIds?: string[];
}

export default function UlasanList({
    ulasan,
    currentUserId,
    destinasiId,
    destinasiOwnerId,
    isAdmin = false,
    likedIds = [],
}: UlasanListProps) {
    const [editTarget, setEditTarget] = useState<Ulasan | null>(null);

    const average =
        ulasan.length > 0
            ? ulasan.reduce((sum, u) => sum + u.rating, 0) / ulasan.length
            : 0;

    function handleDelete(id: string) {
        router.delete(`/destinasi/${destinasiId}/ulasan/${id}`, {
            preserveScroll: true,
        });
    }

    function handleEdit(u: Ulasan) {
        setEditTarget(u);
    }

    function handleEditSuccess() {
        setEditTarget(null);
    }

    return (
        <section>
            {/* Section heading */}
            <div className="mb-5 flex items-center gap-2.5">
                <h2 className="text-xl font-semibold text-stone-800">Ulasan</h2>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">
                    {ulasan.length}
                </span>
            </div>

            {/* Average + histogram summary */}
            {ulasan.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="flex items-center gap-3">
                        <span className="font-serif text-4xl font-normal text-stone-800">
                            {average.toFixed(1)}
                        </span>
                        <div>
                            <RatingDisplay
                                value={average}
                                size={16}
                                showLabel={false}
                            />
                            <p className="mt-1 text-xs text-stone-400">
                                {ulasan.length} ulasan
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 min-w-[160px]">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = ulasan.filter(
                                (u) => Math.round(u.rating) === star,
                            ).length;
                            const pct =
                                ulasan.length > 0
                                    ? (count / ulasan.length) * 100
                                    : 0;
                            return (
                                <div
                                    key={star}
                                    className="flex items-center gap-2"
                                >
                                    <span className="w-3 text-right text-[10px] text-stone-500">
                                        {star}
                                    </span>
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                                        <div
                                            className="h-full rounded-full bg-amber-400 transition-all"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="w-5 text-[10px] text-stone-400">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* List */}
            {ulasan.length === 0 ? (
                <p className="py-8 text-center text-sm text-stone-400">
                    Belum ada ulasan. Jadilah yang pertama memberikan ulasan!
                </p>
            ) : (
                <div className="space-y-3">
                    {ulasan.map((u) => (
                        <UlasanCard
                            key={u.id}
                            ulasan={u}
                            canEdit={u.user.id === currentUserId}
                            canLike={!!currentUserId}
                            canReport={!!currentUserId && u.user.id !== currentUserId}
                            canReply={isAdmin || (!!destinasiOwnerId && String(currentUserId) === destinasiOwnerId)}
                            currentUserId={currentUserId}
                            userLiked={likedIds.includes(u.id)}
                            destinasiId={destinasiId}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Edit modal */}
            <Modal
                open={editTarget !== null}
                onClose={() => setEditTarget(null)}
                title="Edit Ulasan"
                size="md"
            >
                {editTarget && (
                    <UlasanForm
                        destinasiId={destinasiId}
                        existingUlasan={editTarget}
                        onSuccess={handleEditSuccess}
                    />
                )}
            </Modal>
        </section>
    );
}
