import { IconAlertCircle, IconArrowLeft, IconCheck, IconTrain, IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { useFlash } from '@/hooks/useFlash';
import { Link, usePage } from '@inertiajs/react';
import Avatar from '@/components/elements/Avatar';
import Sidebar from '@/components/fragments/Admin/Sidebar';
import type { SharedProps } from '@/types';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { flash, visible, dismiss } = useFlash();
    const { props } = usePage<SharedProps>();
    const user = props.auth?.user;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800">
            {/* Sticky top header */}
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 no-underline">
                        <IconTrain size={19} strokeWidth={1.75} className="text-emerald-700" />
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
                            <Avatar name={user.name} src={user.avatar} size="sm" />
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
                    {/* Flash messages */}
                    {visible && flash.sukses && (
                        <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 sm:mx-6">
                            <IconCheck size={15} />
                            <span>{flash.sukses}</span>
                            <button
                                onClick={dismiss}
                                className="ml-auto transition-opacity hover:opacity-70"
                            >
                                <IconX size={13} />
                            </button>
                        </div>
                    )}
                    {visible && flash.error && (
                        <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 sm:mx-6">
                            <IconAlertCircle size={15} />
                            <span>{flash.error}</span>
                            <button
                                onClick={dismiss}
                                className="ml-auto transition-opacity hover:opacity-70"
                            >
                                <IconX size={13} />
                            </button>
                        </div>
                    )}

                    {/* Page title bar */}
                    <div className="border-b border-stone-100 bg-white px-4 py-4 sm:px-6">
                        <h1 className="text-xl font-bold tracking-tight text-stone-900">
                            {title}
                        </h1>
                    </div>

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
