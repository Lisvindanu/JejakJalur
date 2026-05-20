import { usePage } from '@inertiajs/react';
import { IconRobot, IconSend, IconTrain, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { SharedProps } from '@/types';

/* ─── Types ─── */
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface Usage {
    count: number;
    limit: number;
    remaining: number;
    require_login: boolean;
}

/* ─── Helpers ─── */
function getCsrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

async function apiPost<T>(url: string, data: object): Promise<T> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-XSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

async function apiGet<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        headers: { Accept: 'application/json' },
    });
    return res.json();
}

/* ─── Typing indicator ─── */
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="h-2 w-2 animate-bounce rounded-full bg-stone-400"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
        </div>
    );
}

/* ─── Message bubble ─── */
function MessageBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === 'user';
    return (
        <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
            {!isUser && (
                <div className="mt-1 mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <IconRobot size={15} className="text-emerald-700" />
                </div>
            )}
            <div
                className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    isUser
                        ? 'rounded-tr-sm bg-emerald-700 text-white'
                        : 'rounded-tl-sm bg-stone-100 text-stone-800',
                )}
            >
                {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        {i < msg.content.split('\n').length - 1 && <br />}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Usage bar ─── */
function UsageBar({ usage }: { usage: Usage }) {
    const pct = Math.min((usage.count / usage.limit) * 100, 100);
    const isLow = usage.remaining <= 1;
    return (
        <div className="flex items-center gap-2 text-xs text-stone-400">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100">
                <div
                    className={cn(
                        'h-full rounded-full transition-all',
                        isLow ? 'bg-red-400' : 'bg-emerald-500',
                    )}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className={isLow ? 'text-red-500' : ''}>
                {usage.count}/{usage.limit}
            </span>
        </div>
    );
}

const STORAGE_KEY = 'jejak_ai_history';

function loadHistory(): Message[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Message[]) : [];
    } catch {
        return [];
    }
}

function saveHistory(msgs: Message[]) {
    try {
        // Keep last 20 messages to avoid bloat
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(msgs.slice(-20)),
        );
    } catch {}
}

/* ─── Main Widget ─── */
export default function JejakAiWidget() {
    const { auth } = usePage<SharedProps>().props;
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => loadHistory());
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [usage, setUsage] = useState<Usage | null>(null);
    const [limitReached, setLimitReached] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Persist messages to localStorage */
    useEffect(() => {
        saveHistory(messages);
    }, [messages]);

    /* Load status on mount */
    useEffect(() => {
        apiGet<Usage>('/ai/status')
            .then(setUsage)
            .catch(() => null);
    }, []);

    /* Scroll to bottom on new messages */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    /* Focus input when open */
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading || limitReached) return;

        const userMsg: Message = { role: 'user', content: text };
        const history = messages.slice(-10); // last 10 for context

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const data = await apiPost<{
                reply?: string;
                error?: string;
                retry?: boolean;
                limit_reached?: boolean;
                require_login?: boolean;
                usage?: { count: number; limit: number };
            }>('/ai/chat', {
                message: text,
                history: history.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
            });

            if (data.retry) {
                /* AI unavailable — don't count, show error, keep input */
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content:
                            data.error ??
                            'Maaf, Jejak AI sedang tidak tersedia. Silakan coba lagi.',
                    },
                ]);
                setInput(text);
            } else if (data.limit_reached) {
                setLimitReached(true);
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: data.error ?? 'Batas pesan tercapai.',
                    },
                ]);
            } else if (data.reply) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.reply! },
                ]);
                if (data.usage) {
                    setUsage((prev) =>
                        prev
                            ? {
                                  ...prev,
                                  count: data.usage!.count,
                                  remaining: prev.limit - data.usage!.count,
                              }
                            : prev,
                    );
                }
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Maaf, terjadi kesalahan. Coba lagi.',
                },
            ]);
            setInput(text);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    /* Greeting on first open (only if no saved history) */
    useEffect(() => {
        if (open && messages.length === 0) {
            const name = auth?.user?.name?.split(' ')[0] ?? null;
            setMessages([
                {
                    role: 'assistant',
                    content: name
                        ? `Halo ${name}! Aku Jejak AI 🚂 Tanya apa saja seputar stasiun, rute kereta, dan destinasi wisata di JejakJalur ya!`
                        : 'Halo! Aku Jejak AI 🚂 Tanya apa saja seputar stasiun, rute kereta, dan destinasi wisata di JejakJalur ya!',
                },
            ]);
        }
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/* Overlay (mobile) */}
            {open && (
                <div
                    className="fixed inset-0 z-[190] bg-black/30 sm:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Chat panel */}
            <div
                className={cn(
                    /* mobile: bottom sheet */
                    'fixed right-0 bottom-0 left-0 z-[200] flex flex-col',
                    'rounded-t-2xl bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.18)]',
                    'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    open ? 'translate-y-0' : 'translate-y-full',
                    /* desktop: floating panel */
                    'sm:right-6 sm:bottom-[88px] sm:left-auto sm:w-[380px] sm:rounded-2xl sm:shadow-[0_16px_64px_rgba(0,0,0,0.22)]',
                    open
                        ? 'sm:translate-y-0'
                        : 'sm:pointer-events-none sm:translate-y-4 sm:opacity-0',
                )}
                style={{ maxHeight: '80dvh' }}
            >
                {/* Header */}
                <div className="flex shrink-0 items-center gap-3 border-b border-stone-100 px-4 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700">
                        <IconRobot size={17} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-stone-800">
                                Jejak AI
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[11px] text-emerald-600">
                                Online
                            </span>
                        </div>
                        {usage && (
                            <div className="mt-1">
                                <UsageBar usage={usage} />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                    >
                        <IconX size={17} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                    {messages.map((msg, i) => (
                        <MessageBubble key={i} msg={msg} />
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="mt-1 mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                <IconRobot
                                    size={15}
                                    className="text-emerald-700"
                                />
                            </div>
                            <div className="rounded-2xl rounded-tl-sm bg-stone-100">
                                <TypingDots />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Limit reached — login prompt */}
                {limitReached && !auth?.user && (
                    <div className="shrink-0 border-t border-stone-100 px-4 py-3">
                        <p className="mb-2 text-center text-xs text-stone-500">
                            Batas 3 pesan tercapai
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="/masuk"
                                className="flex-1 rounded-lg bg-emerald-700 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Masuk
                            </a>
                            <a
                                href="/daftar"
                                className="flex-1 rounded-lg border border-emerald-700 py-2 text-center text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                            >
                                Daftar
                            </a>
                        </div>
                    </div>
                )}

                {/* Input */}
                {!limitReached && (
                    <div className="shrink-0 border-t border-stone-100 p-3">
                        <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 transition-colors focus-within:border-emerald-400 focus-within:bg-white">
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Tanya tentang stasiun, rute, wisata…"
                                disabled={loading}
                                className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-none disabled:opacity-50"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || loading}
                                className={cn(
                                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                                    input.trim() && !loading
                                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                                        : 'cursor-not-allowed bg-stone-200 text-stone-400',
                                )}
                            >
                                <IconSend size={15} />
                            </button>
                        </div>
                        <p className="mt-1.5 text-center text-[10px] text-stone-400">
                            Hanya menjawab seputar kereta &amp; wisata
                            JejakJalur
                        </p>
                    </div>
                )}
            </div>

            {/* FAB button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    'fixed right-6 bottom-6 z-[200] flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition-all duration-300',
                    open
                        ? 'scale-95 rotate-0 bg-stone-700'
                        : 'bg-emerald-700 hover:scale-105 hover:bg-emerald-800',
                )}
                aria-label="Buka Jejak AI"
            >
                {open ? (
                    <IconX size={22} className="text-white" />
                ) : (
                    <IconTrain size={22} className="text-white" />
                )}
                {/* Ping dot (unread indicator when closed) */}
                {!open && messages.length === 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
                    </span>
                )}
            </button>
        </>
    );
}
