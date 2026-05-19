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
}

export default function UlasanList({
    ulasan,
    currentUserId,
    destinasiId,
}: UlasanListProps) {
    const [editTarget, setEditTarget] = useState<Ulasan | null>(null);

    const average =
        ulasan.length > 0
            ? ulasan.reduce((sum, u) => sum + u.nilai, 0) / ulasan.length
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

            {/* Average summary */}
            {ulasan.length > 0 && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 p-4">
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
