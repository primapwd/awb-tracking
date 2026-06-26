import { Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

export default function NewPublicLayout({
    children,
    card = false,
}: {
    children: React.ReactNode;
    card?: boolean;
}) {
    if (card) {
        return (
            <div className="flex h-screen flex-col overflow-hidden bg-[#f4fafa] p-4 font-sans text-slate-900 md:p-6 lg:p-8">
                {/* Skip Navigation Link for accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8 focus:z-50 focus:rounded-lg focus:border focus:border-slate-200 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-md focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                    Skip to main content
                </a>

                {/* Premium Rounded Card Wrapper */}
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                    {/* Premium Sticky Navigation */}
                    <header className="sticky top-0 z-50 w-full flex-shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
                        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
                            {/* Stopwatch-Airplane Logo */}
                            <Link
                                href="/new"
                                className="group flex items-center gap-3 rounded-xl transition-[transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:outline-none"
                            >
                                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF1E27] to-red-500 text-white shadow-md shadow-red-500/20 transition-[transform,shadow] duration-200 group-hover:scale-105">
                                    {/* Inner Stopwatch + Airplane SVG */}
                                    <svg
                                        className="h-6 w-6 fill-none stroke-current stroke-[2]"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
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
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main
                        id="main-content"
                        tabIndex={-1}
                        className="flex-1 overflow-y-auto bg-white focus:outline-none"
                    >
                        {children}
                    </main>

                    {/* Premium Minimal Footer */}
                    <footer className="flex-shrink-0 border-t border-slate-200/80 bg-slate-50/50 py-8 text-center">
                        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
                            <p className="text-xs text-slate-500">
                                &copy; {new Date().getFullYear()} OnTime
                                Shipping Co. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f4fafa] font-sans text-slate-900">
            {/* Skip Navigation Link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:border focus:border-slate-200 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-md focus:ring-2 focus:ring-red-500/20 focus:outline-none"
            >
                Skip to main content
            </a>

            {/* Premium Sticky Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
                    {/* Stopwatch-Airplane Logo */}
                    <Link
                        href="/new"
                        className="group flex items-center gap-3 rounded-xl transition-[transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:outline-none"
                    >
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF1E27] to-red-500 text-white shadow-md shadow-red-500/20 transition-[transform,shadow] duration-200 group-hover:scale-105">
                            {/* Inner Stopwatch + Airplane SVG */}
                            <svg
                                className="h-6 w-6 fill-none stroke-current stroke-[2]"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
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
                </div>
            </header>

            {/* Main Content Area */}
            <main
                id="main-content"
                tabIndex={-1}
                className="flex-1 bg-[#f4fafa] focus:outline-none"
            >
                {children}
            </main>

            {/* Premium Minimal Footer */}
            <footer className="border-t border-slate-200/80 bg-slate-50/50 py-8 text-center">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} OnTime Shipping Co.
                        All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
