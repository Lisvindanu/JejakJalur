import { Link, useForm } from '@inertiajs/react';
import { IconBrandGoogle } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';

export default function LoginForm() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        ingat: false,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/masuk');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-600">
                    <input
                        type="checkbox"
                        checked={data.ingat}
                        onChange={(e) => setData('ingat', e.target.checked)}
                        className="h-4 w-4 rounded border-stone-300 text-emerald-700 accent-emerald-700 focus:ring-emerald-500"
                    />
                    Ingat saya
                </label>
                <Link
                    href="/lupa-password"
                    className="text-sm text-emerald-700 no-underline transition-colors hover:text-emerald-800"
                >
                    Lupa password?
                </Link>
            </div>

            <Button
                type="submit"
                variant="primary"
                loading={processing}
                className="w-full"
            >
                Masuk
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
                Masuk dengan Google
            </Link>

            <p className="text-center text-sm text-stone-500">
                Belum punya akun?{' '}
                <Link
                    href="/daftar"
                    className="font-medium text-emerald-700 no-underline hover:text-emerald-800"
                >
                    Daftar
                </Link>
            </p>
        </form>
    );
}
