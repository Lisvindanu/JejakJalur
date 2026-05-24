import { Link } from '@inertiajs/react';
import { IconTrain } from '@tabler/icons-react';

export default function Footer() {
    const columns = [
        {
            title: 'Jelajahi',
            links: [
                ['Destinasi', '/destinasi'],
                ['Rute', '/rute'],
                ['Kota', '/destinasi'],
            ],
        },
        {
            title: 'Akun',
            links: [
                ['Masuk', '/masuk'],
                ['Daftar', '/daftar'],
            ],
        },
        {
            title: 'Lainnya',
            links: [
                ['Tentang', '#'],
                ['Kebijakan Privasi', '#'],
            ],
        },
    ];

    return (
        <footer className="bg-stone-800 px-[max(24px,calc(50%-576px))] pt-[52px] pb-10 dark:bg-stone-900 dark:border-t dark:border-stone-800">
            <div className="mb-9 grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
                {/* Brand */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <IconTrain
                            size={20}
                            strokeWidth={1.75}
                            className="text-white"
                        />
                        <span className="font-serif text-lg font-bold text-white">
                            JejakJalur
                        </span>
                    </div>
                    <p className="max-w-[260px] text-[13px] leading-relaxed text-stone-400">
                        Temukan destinasi terbaik di jalur kereta Indonesia.
                    </p>
                </div>

                {/* Link columns */}
                <div className="grid grid-cols-3 gap-6">
                    {columns.map((col) => (
                        <div key={col.title}>
                            <p className="mb-3.5 text-[11px] font-semibold tracking-[0.08em] text-stone-300 uppercase">
                                {col.title}
                            </p>
                            {col.links.map(([label, href]) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="mb-2 block text-[13px] text-stone-400 no-underline transition-colors hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <hr className="mb-5 border-stone-700" />
            <p className="text-center text-xs text-stone-500">
                &copy; 2026 JejakJalur. Dibuat untuk traveler Indonesia.
            </p>
        </footer>
    );
}
