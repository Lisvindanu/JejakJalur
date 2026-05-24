import { Head, useForm, usePage } from '@inertiajs/react';
import { IconAlertCircle, IconDownload, IconFileSpreadsheet, IconUpload } from '@tabler/icons-react';
import { useRef } from 'react';
import Button from '@/components/elements/Button';
import AdminLayout from '@/components/layouts/AdminLayout';
import type { SharedProps } from '@/types';

interface Props {
    contoh_csv: string;
}

export default function ImportDestinasiPage({ contoh_csv }: Props) {
    const { flash } = usePage<SharedProps & { flash: { sukses?: string; error?: string; import_errors?: string[] } }>().props;
    const fileRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm<{ csv: File | null }>({
        csv: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/destinasi/import', {
            forceFormData: true,
        });
    }

    function downloadContoh() {
        const blob = new Blob([contoh_csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contoh-import-destinasi.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <AdminLayout title="Bulk Import Destinasi">
            <Head title="Import Destinasi" />

            <div className="mx-auto max-w-2xl space-y-6">
                {/* Info */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    <p className="font-semibold">Format CSV yang diterima:</p>
                    <p className="mt-1 text-emerald-700">
                        Kolom wajib: <code className="rounded bg-emerald-100 px-1">nama</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">kategori</code> (Wisata/Kuliner/UMKM),{' '}
                        <code className="rounded bg-emerald-100 px-1">stasiun</code> (nama atau kode)
                    </p>
                    <p className="mt-1 text-emerald-700">
                        Kolom opsional: <code className="rounded bg-emerald-100 px-1">alamat</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">deskripsi</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">telepon</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">website</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">harga_min</code>,{' '}
                        <code className="rounded bg-emerald-100 px-1">harga_max</code>
                    </p>
                    <button
                        type="button"
                        onClick={downloadContoh}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
                    >
                        <IconDownload size={13} />
                        Download contoh CSV
                    </button>
                </div>

                {/* Success flash */}
                {flash?.sukses && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                        {flash.sukses}
                    </div>
                )}

                {/* Error flash */}
                {flash?.error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {flash.error}
                    </div>
                )}

                {/* Import errors list */}
                {(flash as any)?.import_errors && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-800">
                            <IconAlertCircle size={15} />
                            Baris yang dilewati:
                        </p>
                        <ul className="space-y-1">
                            {((flash as any).import_errors as string[]).map((e: string, i: number) => (
                                <li key={i} className="text-xs text-amber-700">
                                    {e}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Upload form */}
                <form onSubmit={handleSubmit} className="rounded-xl border border-stone-200 bg-white p-6">
                    <h2 className="mb-4 text-base font-semibold text-stone-800">
                        Upload file CSV
                    </h2>

                    <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 p-10 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                        onClick={() => fileRef.current?.click()}
                    >
                        {data.csv ? (
                            <>
                                <IconFileSpreadsheet size={36} className="mb-2 text-emerald-600" />
                                <p className="text-sm font-medium text-stone-700">{data.csv.name}</p>
                                <p className="text-xs text-stone-400">
                                    {(data.csv.size / 1024).toFixed(1)} KB
                                </p>
                            </>
                        ) : (
                            <>
                                <IconUpload size={36} className="mb-2 text-stone-300" />
                                <p className="text-sm font-medium text-stone-600">
                                    Klik untuk pilih file CSV
                                </p>
                                <p className="text-xs text-stone-400">Maks. 2 MB</p>
                            </>
                        )}
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        accept=".csv,text/csv"
                        className="hidden"
                        onChange={(e) => setData('csv', e.target.files?.[0] ?? null)}
                    />

                    {errors.csv && (
                        <p className="mt-1 text-xs text-red-600">{errors.csv}</p>
                    )}

                    <div className="mt-5 flex justify-end gap-3">
                        <Button
                            type="submit"
                            disabled={!data.csv || processing}
                            leftIcon={<IconUpload size={14} />}
                        >
                            {processing ? 'Mengimpor...' : 'Import Destinasi'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
