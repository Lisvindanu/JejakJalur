import Avatar from '@/components/elements/Avatar';
import type { SharedProps } from '@/types';
import {
    IconBuilding,
    IconLayoutDashboard,
    IconMapPin,
    IconTrain,
} from '@tabler/icons-react';
import { Link, router, usePage } from '@inertiajs/react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: <IconLayoutDashboard size={18} />,
    },
    { label: 'Kota', href: '/admin/kota', icon: <IconBuilding size={18} /> },
    { label: 'Stasiun', href: '/admin/stasiun', icon: <IconTrain size={18} /> },
    {
        label: 'Destinasi',
        href: '/admin/destinasi',
        icon: <IconMapPin size={18} />,
    },
];

export default function Sidebar() {
    const { url, props } = usePage<SharedProps>();
    const user = props.auth?.user;

    const isActive = (href: string) => {
        if (href === '/admin') {
            return url === '/admin' || url === '/admin/';
        }
        return url.startsWith(href);
    };

    return (
        <aside className="flex min-h-screen w-60 flex-col bg-stone-900">
            {/* Logo */}
            <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-4">
                <IconTrain size={20} className="shrink-0 text-emerald-400" />
                <span className="font-serif text-[17px] font-bold text-white">
                    JejakJalur
                </span>
                <span className="rounded bg-emerald-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Admin
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ' +
                            (isActive(item.href)
                                ? 'bg-emerald-700 text-white'
                                : 'text-stone-400 hover:bg-stone-800 hover:text-white')
                        }
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Bottom user section */}
            <div className="border-t border-stone-800 p-3">
                <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                    <Avatar
                        name={user?.name ?? 'Admin'}
                        src={user?.avatar ?? null}
                        size="sm"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-white">
                            {user?.name ?? 'Admin'}
                        </p>
                        <p className="truncate text-[10px] text-stone-500">
                            {user?.email ?? ''}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => router.post('/keluar')}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
                >
                    Keluar
                </button>
            </div>
        </aside>
    );
}
