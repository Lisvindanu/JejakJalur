import {
    IconArrowLeft,
    IconBuilding,
    IconLayoutDashboard,
    IconMapPin,
    IconMessageCircle,
    IconRobot,
    IconTrain,
    IconUsers,
} from '@tabler/icons-react';
import { Link, usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    separator?: boolean;
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: <IconLayoutDashboard size={16} />,
    },
    {
        label: 'Kota',
        href: '/admin/kota',
        icon: <IconBuilding size={16} />,
        separator: true,
    },
    { label: 'Stasiun', href: '/admin/stasiun', icon: <IconTrain size={16} /> },
    {
        label: 'Destinasi',
        href: '/admin/destinasi',
        icon: <IconMapPin size={16} />,
        separator: true,
    },
    {
        label: 'Pengguna',
        href: '/admin/pengguna',
        icon: <IconUsers size={16} />,
    },
    {
        label: 'Ulasan',
        href: '/admin/ulasan',
        icon: <IconMessageCircle size={16} />,
    },
    {
        label: 'Sesi AI',
        href: '/admin/ai-session',
        icon: <IconRobot size={16} />,
    },
];

export default function Sidebar() {
    const { url } = usePage<SharedProps>();

    const isActive = (href: string) => {
        if (href === '/admin') return url === '/admin' || url === '/admin/';
        return url.startsWith(href);
    };

    return (
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
            <div className="px-3 pt-4 pb-1">
                <p className="px-2 text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
                    Manajemen
                </p>
            </div>

            <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1">
                {navItems.map((item) => (
                    <div key={item.href}>
                        {item.separator && (
                            <div className="my-2 border-t border-stone-100" />
                        )}
                        <Link
                            href={item.href}
                            className={
                                'flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm no-underline transition-colors ' +
                                (isActive(item.href)
                                    ? 'bg-emerald-700 font-medium text-white'
                                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900')
                            }
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    </div>
                ))}
            </nav>

            <div className="border-t border-stone-100 px-2 py-3">
                <Link
                    href="/"
                    className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm text-stone-500 no-underline hover:bg-stone-50 hover:text-stone-700"
                >
                    <IconArrowLeft size={16} />
                    Kembali ke Situs
                </Link>
            </div>
        </aside>
    );
}
