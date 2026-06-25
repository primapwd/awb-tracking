import { Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

export default function NewPublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f4fafa] font-sans text-slate-900">
            {/* Premium Sticky Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
                    {/* Stopwatch-Airplane Logo */}
                    <Link
                        href="/new"
                        className="group flex items-center gap-3 transition-transform duration-200"
                    >
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF1E27] to-red-500 text-white shadow-md shadow-red-500/20 transition-all group-hover:scale-105">
                            {/* Inner Stopwatch + Airplane SVG */}
                            <svg
                                className="h-6 w-6 fill-none stroke-current stroke-[2]"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="13" r="7" />
                                <path d="M12 9v4" />
                                <path d="M12 2v2" />
                                <path d="M10 2h4" />
                                <path d="M19 6l-1.5 1.5" />
                                <path
                                    className="fill-white stroke-none"
                                    d="M12 11.5l1.2 2.5-2.2-.5 1-.8-1.2-2.5z"
                                    transform="rotate(45 12 13)"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base leading-none font-bold tracking-tight text-slate-900">
                                OnTime Shipping
                            </span>
                            <span className="mt-1 text-[10px] font-semibold tracking-wider text-red-500 uppercase">
                                Global Logistics
                            </span>
                        </div>
                    </Link>

                    {/* Right action: admin login only */}
                    <Link
                        href="/admin"
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                        <ShieldCheck className="size-4 text-slate-500" />
                        Admin
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1">{children}</main>

            {/* Premium Minimal Footer */}
            <footer className="border-t border-slate-200/80 bg-slate-50/50 py-8 text-center">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} OnTime Shipping Co.
                        All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span>Air Manifest API</span>
                        <span>&middot;</span>
                        <span>Ocean Containers</span>
                        <span>&middot;</span>
                        <span>VPS Terminal</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
