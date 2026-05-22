import { IconMapPinOff } from '@tabler/icons-react';
import DestinasiCard from '@/components/fragments/Destinasi/DestinasiCard';
import type { Destinasi, PaginatedData } from '@/types';

interface DestinasiGridProps {
    destinasi: PaginatedData<Destinasi>;
}

export default function DestinasiGrid({ destinasi }: DestinasiGridProps) {
    if (destinasi.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <IconMapPinOff size={40} className="mb-3 text-stone-300" />
                <p className="text-sm font-medium">
                    Tidak ada destinasi ditemukan.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinasi.data.map((d) => (
                <DestinasiCard key={d.id} destinasi={d} />
            ))}
        </div>
    );
}
