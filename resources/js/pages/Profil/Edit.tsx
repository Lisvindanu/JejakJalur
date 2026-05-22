import { Head, Link, useForm } from '@inertiajs/react';
import { IconCamera } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import PublicLayout from '@/components/layouts/PublicLayout';
import { MOCK_PENGGUNA } from '@/lib/mock-data';

interface Pengguna {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
}

interface Props {
    pengguna?: Pengguna;
}

export default function Edit({ pengguna: penggunaProp }: Props) {
    const pengguna = penggunaProp ?? MOCK_PENGGUNA;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, errors, processing } = useForm<{
        _method: string;
        nama: string;
        email: string;
        avatar: File | null;
    }>({
        _method: 'patch',
        nama: pengguna.name,
        email: pengguna.email,
        avatar: null,
    });

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setData('avatar', file);

        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/profil', {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    const displayedAvatar = preview ?? pengguna.avatar ?? null;

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
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                            encType="multipart/form-data"
                        >
                            {/* Avatar uploader */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar
                                        name={pengguna.name}
                                        src={displayedAvatar}
                                        size="lg"
                                        className="h-20 w-20 text-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="absolute -right-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-colors hover:bg-stone-50 hover:text-emerald-700"
                                        aria-label="Ganti foto profil"
                                    >
                                        <IconCamera size={14} />
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="cursor-pointer text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                                    >
                                        {pengguna.avatar
                                            ? 'Ganti foto profil'
                                            : 'Unggah foto profil'}
                                    </button>
                                    <p className="mt-0.5 text-xs text-stone-400">
                                        JPG, PNG, atau WebP. Maksimal 2MB.
                                    </p>
                                    {errors.avatar && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            <hr className="border-stone-100" />

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
