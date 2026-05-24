import { Head, useForm } from '@inertiajs/react';
import { IconBuilding, IconCheck } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { Destinasi } from '@/types';

interface Props {
    destinasi: Destinasi;
    sudah_klaim: boolean;
}

export default function KlaimPage({ destinasi, sudah_klaim }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        keterangan: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/destinasi/${destinasi.id}/klaim`);
    }

    return (
        <PublicLayout>
            <Head title={`Klaim ${destinasi.nama}`} />

            <div className="min-h-screen px-[max(24px,calc(50%-576px))] py-24">
                <div className="mx-auto max-w-lg">
                    <div className="mb-2 flex items-center gap-2 text-stone-500">
                        <IconBuilding size={16} />
                        <span className="text-sm">Klaim Kepemilikan</span>
                    </div>
                    <h1 className="mb-1 text-2xl font-bold text-stone-800 dark:text-stone-100">
                        {destinasi.nama}
                    </h1>
                    <p className="mb-6 text-sm text-stone-500">
                        {destinasi.stasiun.nama} — {destinasi.stasiun.kota.nama}
                    </p>

                    {sudah_klaim ? (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                            <IconCheck size={40} className="mx-auto mb-3 text-emerald-600" />
                            <p className="font-semibold text-emerald-800">Klaim Sudah Dikirim</p>
                            <p className="mt-1 text-sm text-emerald-700">
                                Admin akan meninjau pengajuanmu dalam 1-3 hari kerja.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
                            <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
                                Kamu akan mengklaim bahwa kamu adalah pemilik atau pengelola resmi dari{' '}
                                <strong className="text-stone-800 dark:text-stone-200">{destinasi.nama}</strong>.
                                Setelah disetujui admin, kamu bisa mengelola informasi dan foto destinasi ini.
                            </p>

                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
                                    Jelaskan hubunganmu dengan destinasi ini
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    rows={4}
                                    maxLength={500}
                                    placeholder="Contoh: Saya adalah pemilik Warung Bu Sari sejak 2018. Nama saya tertera di SIUP dengan nomor..."
                                    className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                                />
                                {errors.keterangan && (
                                    <p className="mt-1 text-xs text-red-600">{errors.keterangan}</p>
                                )}
                                <p className="mt-1 text-right text-xs text-stone-400">
                                    {data.keterangan.length}/500
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                                Pengajuan klaim akan ditinjau admin. Memberikan keterangan palsu dapat mengakibatkan pemblokiran akun.
                            </div>

                            <div className="mt-5 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={processing || data.keterangan.length < 20}
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pengajuan Klaim'}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
