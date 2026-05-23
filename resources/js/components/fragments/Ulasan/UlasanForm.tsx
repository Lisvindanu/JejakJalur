import { useForm } from '@inertiajs/react';
import { IconPhoto, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import Button from '@/components/elements/Button';
import TextArea from '@/components/elements/TextArea';
import { RatingInput } from '@/components/elements/Rating';
import type { Ulasan } from '@/types';

interface UlasanFormProps {
    destinasiId: string;
    existingUlasan?: Ulasan;
    onSuccess?: () => void;
}

export default function UlasanForm({
    destinasiId,
    existingUlasan,
    onSuccess,
}: UlasanFormProps) {
    const { data, setData, post, patch, errors, processing } = useForm<{
        rating: number;
        konten: string;
        foto: File[];
    }>({
        rating: existingUlasan?.rating ?? 0,
        konten: existingUlasan?.konten ?? '',
        foto: [],
    });

    const [previews, setPreviews] = useState<string[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleFiles(files: FileList | null) {
        if (!files) return;
        const arr = Array.from(files).slice(0, 3 - data.foto.length);
        const newFiles = [...data.foto, ...arr].slice(0, 3);
        setData('foto', newFiles);
        const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
        setPreviews(newPreviews);
    }

    function removeFoto(idx: number) {
        const newFiles = data.foto.filter((_, i) => i !== idx);
        setData('foto', newFiles);
        setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (existingUlasan) {
            patch(`/destinasi/${destinasiId}/ulasan/${existingUlasan.id}`, {
                forceFormData: true,
                onSuccess: () => onSuccess?.(),
            });
        } else {
            post(`/destinasi/${destinasiId}/ulasan`, {
                forceFormData: true,
                onSuccess: () => {
                    setData('foto', []);
                    setPreviews([]);
                    onSuccess?.();
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <RatingInput
                label="Rating"
                value={data.rating}
                onChange={(val) => setData('rating', val)}
            />
            <TextArea
                label="Komentar"
                rows={3}
                value={data.konten}
                onChange={(e) => setData('konten', e.target.value)}
                error={errors.konten}
                placeholder="Ceritakan pengalamanmu..."
            />

            {/* Photo upload (only for new reviews) */}
            {!existingUlasan && (
                <div>
                    <p className="mb-1.5 text-xs font-medium text-stone-600">
                        Foto (opsional, maks 3)
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {previews.map((src, i) => (
                            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg border border-stone-200">
                                <img
                                    src={src}
                                    alt={`foto ${i + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFoto(i)}
                                    className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                                >
                                    <IconX size={10} />
                                </button>
                            </div>
                        ))}
                        {data.foto.length < 3 && (
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-stone-300 text-stone-400 transition-colors hover:border-emerald-400 hover:text-emerald-600"
                            >
                                <IconPhoto size={20} />
                                <span className="text-[10px]">Tambah</span>
                            </button>
                        )}
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                loading={processing}
                className="w-full"
            >
                {existingUlasan ? 'Perbarui Ulasan' : 'Kirim Ulasan'}
            </Button>
        </form>
    );
}
