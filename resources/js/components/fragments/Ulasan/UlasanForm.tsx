import { useForm } from '@inertiajs/react';
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
    const { data, setData, post, patch, errors, processing } = useForm({
        rating: existingUlasan?.rating ?? 0,
        konten: existingUlasan?.konten ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (existingUlasan) {
            patch(`/destinasi/${destinasiId}/ulasan/${existingUlasan.id}`, {
                onSuccess: () => onSuccess?.(),
            });
        } else {
            post(`/destinasi/${destinasiId}/ulasan`, {
                onSuccess: () => onSuccess?.(),
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
