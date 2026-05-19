import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import FormCard from '@/components/fragments/Admin/FormCard';
import type { Kota } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconArrowLeft } from '@tabler/icons-react';

interface Props {
    kota?: Kota;
}

export default function KotaFormulir({ kota }: Props) {
    const isEdit = !!kota;

    const { data, setData, post, patch, processing, errors } = useForm({
        nama: kota?.nama ?? '',
        kode_ibukota: kota?.kode_ibukota ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            patch(`/admin/kota/${kota.id}`);
        } else {
            post('/admin/kota');
        }
    }

    return (
        <AdminLayout title={isEdit ? 'Edit Kota' : 'Tambah Kota'}>
            <Head
                title={`${isEdit ? 'Edit' : 'Tambah'} Kota — Admin JejakJalur`}
            />

            <div className="space-y-4">
                <Link
                    href="/admin/kota"
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-800"
                >
                    <IconArrowLeft size={15} />
                    Kembali ke Kota
                </Link>

                <form onSubmit={handleSubmit}>
                    <FormCard
                        title={isEdit ? 'Edit Kota' : 'Tambah Kota Baru'}
                        description={
                            isEdit
                                ? `Mengubah data kota ${kota.nama}.`
                                : 'Isi detail kota yang akan ditambahkan ke sistem.'
                        }
                        footer={
                            <>
                                <Link href="/admin/kota">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="submit"
                                    loading={processing}
                                >
                                    {isEdit
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Kota'}
                                </Button>
                            </>
                        }
                    >
                        <Input
                            label="Nama Kota"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            error={errors.nama}
                            placeholder="cth. Yogyakarta"
                            required
                        />
                        <Input
                            label="Kode Ibukota"
                            value={data.kode_ibukota}
                            onChange={(e) =>
                                setData(
                                    'kode_ibukota',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            error={errors.kode_ibukota}
                            placeholder="cth. YK"
                            required
                        />
                    </FormCard>
                </form>
            </div>
        </AdminLayout>
    );
}
