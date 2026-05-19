import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { IconArrowLeft, IconTrain } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { SharedProps } from '@/types';

export default function LupaPassword() {
    const { flash } = usePage<SharedProps>().props;
    const { data, setData, post, errors, processing } = useForm({ email: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/lupa-password');
    }

    return (
        <PublicLayout>
            <Head title="Lupa Password — JejakJalur" />
            <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-stone-50 px-4 py-16">
                <div className="w-full max-w-[420px]">
                    {/* Brand */}
                    <div className="mb-8 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <IconTrain
                                size={24}
                                strokeWidth={1.75}
                                className="text-emerald-700"
                            />
                            <span className="font-serif text-[20px] font-bold tracking-[-0.3px] text-emerald-700">
                                JejakJalur
                            </span>
                        </div>
                        <h1 className="mb-1 text-2xl font-semibold text-stone-800">
                            Lupa Password
                        </h1>
                        <p className="text-sm text-stone-500">
                            Masukkan emailmu dan kami akan mengirimkan tautan
                            reset password
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                        {flash?.sukses ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                                {flash.sukses}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    error={errors.email}
                                    placeholder="nama@email.com"
                                    autoComplete="email"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={processing}
                                    className="w-full"
                                >
                                    Kirim Tautan Reset
                                </Button>
                            </form>
                        )}

                        <div className="mt-5 text-center">
                            <Link
                                href="/masuk"
                                className="inline-flex items-center gap-1.5 text-sm text-stone-500 no-underline transition-colors hover:text-emerald-700"
                            >
                                <IconArrowLeft size={14} />
                                Kembali ke halaman masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
