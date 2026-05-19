import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import FormCard from '@/components/fragments/Admin/FormCard';
import type { Kota, Stasiun } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconArrowLeft } from '@tabler/icons-react';

interface Props {
    stasiun?: Stasiun;
    semuaKota: Kota[];
}

export default function StasiunFormulir({ stasiun, semuaKota }: Props) {
    const isEdit = !!stasiun;

    const { data, setData, post, patch, processing, errors } = useForm({
        nama: stasiun?.nama ?? '',
        kode_stasiun: stasiun?.kode_stasiun ?? '',
        kota_id: stasiun?.kota?.id ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            patch(`/admin/stasiun/${stasiun.id}`);
        } else {
            post('/admin/stasiun');
        }
    }

    const kotaOptions = semuaKota.map((k) => ({ value: k.id, label: k.nama }));

    return (
        <AdminLayout title={isEdit ? 'Edit Stasiun' : 'Tambah Stasiun'}>
            <Head
                title={`${isEdit ? 'Edit' : 'Tambah'} Stasiun — Admin JejakJalur`}
            />

            <div className="space-y-4">
                <Link
                    href="/admin/stasiun"
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-800"
                >
                    <IconArrowLeft size={15} />
                    Kembali ke Stasiun
                </Link>

                <form onSubmit={handleSubmit}>
                    <FormCard
                        title={isEdit ? 'Edit Stasiun' : 'Tambah Stasiun Baru'}
                        description={
                            isEdit
                                ? `Mengubah data stasiun ${stasiun.nama}.`
                                : 'Isi detail stasiun yang akan ditambahkan ke sistem.'
                        }
                        footer={
                            <>
                                <Link href="/admin/stasiun">
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
                                        : 'Tambah Stasiun'}
                                </Button>
                            </>
                        }
                    >
                        <Input
                            label="Nama Stasiun"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            error={errors.nama}
                            placeholder="cth. Stasiun Yogyakarta"
                            required
                        />
                        <Input
                            label="Kode Stasiun"
                            value={data.kode_stasiun}
                            onChange={(e) =>
                                setData(
                                    'kode_stasiun',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            error={errors.kode_stasiun}
                            placeholder="cth. YK"
                            required
                        />
                        <Select
                            label="Kota"
                            value={data.kota_id}
                            onChange={(e) => setData('kota_id', e.target.value)}
                            options={kotaOptions}
                            placeholder="Pilih kota..."
                            error={errors.kota_id}
                        />
                    </FormCard>
                </form>
            </div>
        </AdminLayout>
    );
}
