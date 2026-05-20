import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import Footer from '@/components/fragments/Common/Footer';
import Navbar from '@/components/fragments/Common/Navbar';
import JejakAiWidget from '@/components/fragments/JejakAi/JejakAiWidget';
import { useFlash } from '@/hooks/useFlash';

interface PublicLayoutProps {
    children: ReactNode;
    transparentNav?: boolean;
}

export default function PublicLayout({
    children,
    transparentNav = false,
}: PublicLayoutProps) {
    const { flash, visible, dismiss } = useFlash();

    return (
        <div className="min-h-screen overflow-x-hidden bg-stone-50 text-stone-800">
            <Navbar transparent={transparentNav} />

            {/* Flash messages */}
            {visible && flash.sukses && (
                <div className="fixed top-[68px] left-1/2 z-[150] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 shadow-sm">
                    <IconCheck size={15} />
                    <span>{flash.sukses}</span>
                    <button
                        onClick={dismiss}
                        className="ml-1 transition-opacity hover:opacity-70"
                    >
                        <IconX size={13} />
                    </button>
                </div>
            )}
            {visible && flash.error && (
                <div className="fixed top-[68px] left-1/2 z-[150] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 shadow-sm">
                    <IconAlertCircle size={15} />
                    <span>{flash.error}</span>
                    <button
                        onClick={dismiss}
                        className="ml-1 transition-opacity hover:opacity-70"
                    >
                        <IconX size={13} />
                    </button>
                </div>
            )}

            <main>{children}</main>

            <Footer />
            <JejakAiWidget />
        </div>
    );
}
