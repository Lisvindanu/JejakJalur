import Avatar from '@/components/elements/Avatar';
import type { SharedProps } from '@/types';
import { usePage } from '@inertiajs/react';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const { props } = usePage<SharedProps>();
    const user = props.auth?.user;

    const tanggal = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    return (
        <header className="flex h-14 items-center justify-between border-b border-stone-100 bg-white px-6">
            <h1 className="text-base font-semibold text-stone-800">{title}</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-stone-400">{tanggal}</span>
                <Avatar
                    name={user?.name ?? 'Admin'}
                    src={user?.avatar ?? null}
                    size="sm"
                />
                <span className="text-sm font-medium text-stone-700">
                    {user?.name ?? 'Admin'}
                </span>
            </div>
        </header>
    );
}
