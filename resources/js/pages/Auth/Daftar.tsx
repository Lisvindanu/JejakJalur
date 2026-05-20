import { Head } from '@inertiajs/react';
import { IconTrain } from '@tabler/icons-react';
import RegisterForm from '@/components/fragments/Auth/RegisterForm';
import PublicLayout from '@/components/layouts/PublicLayout';

export default function Daftar() {
    return (
        <PublicLayout>
            <Head title="Daftar — JejakJalur" />
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
                            Buat akun baru
                        </h1>
                        <p className="text-sm text-stone-500">
                            Bergabung dan temukan destinasi terbaik via kereta
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
