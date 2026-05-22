import { Link, router, usePage } from '@inertiajs/react';
import {
    IconChevronDown,
    IconLayoutDashboard,
    IconLogout,
    IconMapPin,
    IconPlus,
    IconTrain,
    IconUser,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/elements/Avatar';
import type { SharedProps } from '@/types';

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const { auth } = usePage<SharedProps>().props;
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!dropdownOpen) return;
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [dropdownOpen]);

    const isOpaque = !transparent || scrolled;
    const textColor = isOpaque
        ? 'text-stone-600 hover:text-emerald-700'
        : 'text-white/80 hover:text-white';
    const logoColor = isOpaque ? 'text-emerald-700' : 'text-white';

    return (
        <nav
            className={`fixed top-0 z-[100] flex h-[60px] w-full items-center gap-10 px-[max(24px,calc(50%-576px))] transition-all duration-300 ${
                isOpaque
                    ? 'border-b border-stone-200 bg-white/90 backdrop-blur-[12px]'
                    : 'border-b border-transparent bg-transparent'
            }`}
        >
            {/* Logo */}
            <Link
                href="/"
                className="flex shrink-0 items-center gap-2 no-underline"
            >
                <IconTrain
                    size={22}
                    strokeWidth={1.75}
                    className={`transition-colors duration-300 ${logoColor}`}
                />
                <span
                    className={`font-serif text-[17px] font-bold tracking-[-0.3px] transition-colors duration-300 ${logoColor}`}
                >
                    JejakJalur
                </span>
            </Link>

            {/* Nav links */}
            <div className="ml-auto hidden items-center gap-7 md:flex">
                <Link
                    href="/destinasi"
                    className={`text-sm font-medium transition-colors duration-300 ${textColor}`}
                >
                    Jelajahi
                </Link>
                <Link
                    href="/rute"
                    className={`text-sm font-medium transition-colors duration-300 ${textColor}`}
                >
                    Rute
                </Link>
            </div>

            {/* Auth area */}
            <div className="ml-6 flex items-center gap-2">
                {auth?.user ? (
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setDropdownOpen((o) => !o)}
                            className={`flex cursor-pointer items-center gap-2 rounded-full p-0.5 pr-3 transition-colors ${
                                isOpaque
                                    ? 'hover:bg-stone-100'
                                    : 'hover:bg-white/10'
                            }`}
                        >
                            <Avatar
                                name={auth.user.name}
                                src={auth.user.avatar}
                                size="sm"
                            />
                            <span
                                className={`hidden text-sm font-medium transition-colors duration-300 sm:inline ${
                                    isOpaque ? 'text-stone-700' : 'text-white'
                                }`}
                            >
                                {auth.user.name.split(' ')[0]}
                            </span>
                            <IconChevronDown
                                size={14}
                                className={`transition-colors duration-300 ${
                                    isOpaque
                                        ? 'text-stone-400'
                                        : 'text-white/60'
                                }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full right-0 z-[200] mt-1.5 w-56 rounded-xl border border-stone-200 bg-white py-1.5 shadow-lg">
                                <div className="mb-1 border-b border-stone-100 px-3 pb-2">
                                    <div className="text-sm font-medium text-stone-800">
                                        {auth.user.name}
                                    </div>
                                    <div className="truncate text-xs text-stone-500">
                                        {auth.user.email}
                                    </div>
                                </div>

                                <Link
                                    href="/profil"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stone-700 no-underline hover:bg-stone-50"
                                >
                                    <IconUser
                                        size={15}
                                        className="text-stone-400"
                                    />
                                    Profil saya
                                </Link>

                                <Link
                                    href="/destinasi/milik-saya"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stone-700 no-underline hover:bg-stone-50"
                                >
                                    <IconMapPin
                                        size={15}
                                        className="text-stone-400"
                                    />
                                    Destinasi saya
                                </Link>

                                <Link
                                    href="/destinasi/buat"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stone-700 no-underline hover:bg-stone-50"
                                >
                                    <IconPlus
                                        size={15}
                                        className="text-stone-400"
                                    />
                                    Tambah destinasi
                                </Link>

                                {auth.user.is_admin && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stone-700 no-underline hover:bg-stone-50"
                                    >
                                        <IconLayoutDashboard
                                            size={15}
                                            className="text-stone-400"
                                        />
                                        Admin Panel
                                    </Link>
                                )}

                                <hr className="my-1 border-stone-100" />

                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        router.post('/keluar');
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <IconLogout size={15} />
                                    Keluar
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href="/masuk"
                            className={`rounded-lg border px-[14px] py-[7px] text-[13px] font-medium transition-colors duration-300 ${
                                isOpaque
                                    ? 'border-stone-300 text-stone-700 hover:bg-stone-100'
                                    : 'border-white/40 text-white hover:bg-white/10'
                            }`}
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/daftar"
                            className={`rounded-lg px-[14px] py-[7px] text-[13px] font-semibold transition-colors duration-300 ${
                                isOpaque
                                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                    : 'bg-white/15 text-white hover:bg-white/25'
                            }`}
                        >
                            Daftar
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
