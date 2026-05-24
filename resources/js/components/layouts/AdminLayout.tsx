import { IconArrowLeft, IconTrain } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Avatar from '@/components/elements/Avatar';
import Toast from '@/components/elements/Toast';
import Sidebar from '@/components/fragments/Admin/Sidebar';
import type { SharedProps } from '@/types';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { props } = usePage<SharedProps>();
    const user = props.auth?.user;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
            <Toast offsetPx={64} />
            {/* Sticky top header */}
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 dark:border-stone-800 dark:bg-stone-900 sm:px-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 no-underline"
                    >
                        <IconTrain
                            size={19}
                            strokeWidth={1.75}
                            className="text-emerald-700"
                        />
                        <span className="font-serif text-[16px] font-bold tracking-[-0.3px] text-stone-800">
                            JejakJalur
                        </span>
                    </Link>
                    <span className="hidden border-l border-stone-200 pl-3 text-[11px] font-semibold tracking-wider text-stone-400 uppercase sm:inline-block">
                        Admin
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="hidden items-center gap-1.5 text-sm text-stone-500 no-underline transition-colors hover:text-stone-800 sm:inline-flex"
                    >
                        <IconArrowLeft size={14} />
                        Kembali ke Situs
                    </Link>
                    {user && (
                        <div className="flex items-center gap-2">
                            <Avatar
                                name={user.name}
                                src={user.avatar}
                                size="sm"
                            />
                            <span className="hidden text-sm font-medium text-stone-700 sm:inline">
                                {user.name.split(' ')[0]}
                            </span>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex">
                <Sidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Page title bar */}
                    <div className="border-b border-stone-100 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-900 sm:px-6">
                        <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                            {title}
                        </h1>
                    </div>

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
