import { Link, useForm } from '@inertiajs/react';
import { IconBrandGoogle } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';

export default function RegisterForm() {
    const { data, setData, post, errors, processing } = useForm({
        nama: '',
        email: '',
        password: '',
        password_confirmation: '',
        consent_given: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/daftar');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Nama Lengkap"
                type="text"
                value={data.nama}
                onChange={(e) => setData('nama', e.target.value)}
                error={errors.nama}
                placeholder="John Doe"
                autoComplete="name"
            />
            <Input
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                placeholder="nama@email.com"
                autoComplete="email"
            />
            <Input
                label="Password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                placeholder="••••••••"
                autoComplete="new-password"
            />
            <Input
                label="Konfirmasi Password"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
                error={errors.password_confirmation}
                placeholder="••••••••"
                autoComplete="new-password"
            />

            <div className="space-y-1">
                <label className="flex items-start gap-2.5 text-sm text-stone-600">
                    <input
                        type="checkbox"
                        checked={data.consent_given}
                        onChange={(e) => setData('consent_given', e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-emerald-600"
                    />
                    <span>
                        Saya menyetujui{' '}
                        <span className="font-medium text-stone-800">syarat & ketentuan</span>{' '}
                        dan pemrosesan data pribadi sesuai UU PDP.
                    </span>
                </label>
                {errors.consent_given && (
                    <p className="text-xs text-red-500">{errors.consent_given}</p>
                )}
            </div>

            <Button
                type="submit"
                variant="primary"
                loading={processing}
                className="w-full"
            >
                Daftar Sekarang
            </Button>

            <div className="relative flex items-center gap-3 py-1">
                <hr className="flex-1 border-stone-200" />
                <span className="text-xs text-stone-400">atau</span>
                <hr className="flex-1 border-stone-200" />
            </div>

            <Link
                href="/oauth/google"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white py-2 text-sm font-medium text-stone-700 no-underline transition-colors hover:bg-stone-50"
            >
                <IconBrandGoogle size={18} />
                Daftar dengan Google
            </Link>

            <p className="text-center text-sm text-stone-500">
                Sudah punya akun?{' '}
                <Link
                    href="/masuk"
                    className="font-medium text-emerald-700 no-underline hover:text-emerald-800"
                >
                    Masuk
                </Link>
            </p>
        </form>
    );
}
