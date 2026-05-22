import type { ReactNode } from 'react';
import Footer from '@/components/fragments/Common/Footer';
import Navbar from '@/components/fragments/Common/Navbar';
import JejakAiWidget from '@/components/fragments/JejakAi/JejakAiWidget';
import Toast from '@/components/elements/Toast';

interface PublicLayoutProps {
    children: ReactNode;
    transparentNav?: boolean;
}

export default function PublicLayout({
    children,
    transparentNav = false,
}: PublicLayoutProps) {
    return (
        <div className="min-h-screen overflow-x-hidden bg-stone-50 text-stone-800">
            <Navbar transparent={transparentNav} />
            <Toast offsetPx={72} />
            <main>{children}</main>
            <Footer />
            <JejakAiWidget />
        </div>
    );
}
