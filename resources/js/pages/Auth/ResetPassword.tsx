import { Head, useForm } from '@inertiajs/react';
import { IconTrain } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import PublicLayout from '@/components/layouts/PublicLayout';

interface Props {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/reset-password');
    }

    return (
        <PublicLayout>
            <Head title="Reset Password — JejakJalur" />
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
                            Reset Password
                        </h1>
                        <p className="text-sm text-stone-500">
                            Buat password baru untuk akunmu
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                readOnly
                            />
                            <Input
                                label="Password Baru"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                error={errors.password}
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                            <Input
                                label="Konfirmasi Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                error={errors.password_confirmation}
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                loading={processing}
                                className="w-full"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
