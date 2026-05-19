import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import PublicLayout from '@/components/layouts/PublicLayout';

interface Pengguna {
    id: number;
    name: string;
    email: string;
}

interface Props {
    pengguna: Pengguna;
}

export default function Edit({ pengguna }: Props) {
    const { data, setData, patch, errors, processing } = useForm({
        nama: pengguna.name,
        email: pengguna.email,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch('/profil');
    }

    return (
        <PublicLayout>
            <Head title="Edit Profil — JejakJalur" />

            <div className="px-[max(24px,calc(50%-576px))] pt-24 pb-16">
                <div className="mx-auto max-w-xl">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-stone-800">
                            Edit Profil
                        </h1>
                        <p className="mt-1 text-sm text-stone-500">
                            Perbarui informasi akunmu
                        </p>
                    </div>

                    <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Nama Lengkap"
                                type="text"
                                value={data.nama}
                                onChange={(e) =>
                                    setData('nama', e.target.value)
                                }
                                error={errors.nama}
                                autoComplete="name"
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                autoComplete="email"
                            />

                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={processing}
                                >
                                    Simpan Perubahan
                                </Button>
                                <Link
                                    href="/profil"
                                    className="text-sm text-stone-500 no-underline transition-colors hover:text-stone-700"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
