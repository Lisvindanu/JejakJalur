import type { ReactNode } from 'react';

interface FormCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
}

export default function FormCard({
    title,
    description,
    children,
    footer,
}: FormCardProps) {
    return (
        <div className="rounded-xl border border-stone-100 bg-white">
            <div className="border-b border-stone-100 px-6 py-4">
                <h2 className="font-semibold text-stone-800">{title}</h2>
                {description && (
                    <p className="mt-0.5 text-sm text-stone-500">
                        {description}
                    </p>
                )}
            </div>
            <div className="space-y-4 px-6 py-5">{children}</div>
            {footer && (
                <div className="flex items-center justify-end gap-2 border-t border-stone-100 px-6 py-4">
                    {footer}
                </div>
            )}
        </div>
    );
}
