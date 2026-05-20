import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { useFlash } from '@/hooks/useFlash';
import Sidebar from '@/components/fragments/Admin/Sidebar';
import Header from '@/components/fragments/Admin/Header';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { flash, visible, dismiss } = useFlash();

    return (
        <div className="flex min-h-screen bg-stone-50">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header title={title} />

                {/* Flash messages */}
                {visible && flash.sukses && (
                    <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 shadow-sm">
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
                    <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 shadow-sm">
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

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
