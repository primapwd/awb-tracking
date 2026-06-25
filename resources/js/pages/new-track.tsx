import { Head, router } from '@inertiajs/react';
import { Search, TextCursorInput } from 'lucide-react';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import IsometricShippingScene from '@/components/isometric-shipping-scene';
import TrackingTimeline from '@/components/tracking-timeline';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import NewPublicLayout from '@/layouts/new-public-layout';
import { submit } from '@/routes/track/new';

type TrackingResult = {
    awb: string;
    logistic_company: string;
    weight: string;
    processed_date: string;
    tab_date: string;
    freight_date: string;
    type: 'air' | 'ocean';
    status: 'processed' | 'not_found';
};

type Props = {
    results?: TrackingResult[] | null;
    maxCodes: number;
    query?: string | null;
};

export default function NewTrack({ results, maxCodes, query }: Props) {
    // Derive the initial tab from the incoming query's shape (multi-code -> bulk).
    const [activeTab, setActiveTab] = useState<'quick' | 'bulk'>(() =>
        query && (query.includes('\n') || query.includes(','))
            ? 'bulk'
            : 'quick',
    );
    const [codes, setCodes] = useState(query ?? '');
    const [processing, setProcessing] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    function handleSubmit(e: FormEvent, inputCodes: string = codes) {
        if (e) {
            e.preventDefault();
        }

        if (!inputCodes.trim()) {
            return;
        }

        setProcessing(true);
        setIsScanning(true);

        // Scan effect runs for the duration of the actual request.
        router.post(
            submit().url,
            { codes: inputCodes },
            {
                onFinish: () => {
                    setProcessing(false);
                    setIsScanning(false);
                },
                preserveScroll: true,
            },
        );
    }

    // Demo tracker injectors
    function injectDemoCode(demoStr: string) {
        setCodes(demoStr);
        handleSubmit(null as any, demoStr);
    }

    return (
        <>
            <Head title="Track Shipments - OnTime Shipping" />

            {/* Hero Split Section — fits one viewport */}
            <section
                id="track"
                className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[#f4fafa] py-8"
            >
                {/* Clean technical dot grid background */}
                <div className="absolute inset-0 z-0 bg-grid opacity-50" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
                        {/* Left column: Headline + Tracking Module */}
                        <div className="space-y-6">
                            {/* Eyebrow pill with blinking dot */}
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-600">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF1E27] opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF1E27]" />
                                </span>
                                Global Freight Forwarding
                            </span>

                            {/* Headline */}
                            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.25rem]">
                                Bringing the{' '}
                                <span className="relative inline-block whitespace-nowrap">
                                    World Closer
                                    <svg
                                        className="absolute -bottom-2 left-0 h-3 w-full text-red-500/80"
                                        viewBox="0 0 100 10"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0,5 Q50,9 100,5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                ,<br />
                                Delivering{' '}
                                <span className="relative inline-block rotate-[-1.5deg] rounded-xl bg-linear-to-r from-red-600 to-red-500 px-4 py-1 text-white shadow-md shadow-red-500/10">
                                    Dreams
                                </span>
                            </h1>

                            <p className="max-w-md text-base leading-relaxed text-slate-500">
                                End-to-end multimodal supply chain across air
                                and ocean lanes. Track every shipment, anywhere
                                in the world.
                            </p>

                            {/* Tracking module */}
                            <div className="space-y-3 pt-1">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                                        Tracking Code
                                    </Label>
                                    {/* Quick / Bulk toggle */}
                                    <div
                                        role="tablist"
                                        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-0.5"
                                    >
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                activeTab === 'quick'
                                            }
                                            onClick={() =>
                                                setActiveTab('quick')
                                            }
                                            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                                                activeTab === 'quick'
                                                    ? 'bg-white text-slate-900 shadow-xs'
                                                    : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            <Search className="size-3" /> Quick
                                        </button>
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={activeTab === 'bulk'}
                                            onClick={() => setActiveTab('bulk')}
                                            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                                                activeTab === 'bulk'
                                                    ? 'bg-white text-slate-900 shadow-xs'
                                                    : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            <TextCursorInput className="size-3" />{' '}
                                            Bulk
                                        </button>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                >
                                    {activeTab === 'quick' ? (
                                        <div
                                            className={`flex items-center gap-2 rounded-xl border bg-white p-1.5 shadow-xs transition-all ${
                                                isScanning
                                                    ? 'border-red-500/40 ring-2 ring-red-500/15'
                                                    : 'border-slate-200'
                                            }`}
                                        >
                                            <input
                                                id="code"
                                                type="text"
                                                value={codes}
                                                onChange={(e) =>
                                                    setCodes(e.target.value)
                                                }
                                                className="h-11 flex-1 rounded-lg bg-transparent pr-2 pl-3 font-mono text-sm text-slate-900 transition-all placeholder:font-sans placeholder:text-slate-400 focus:outline-none"
                                                placeholder="Enter your AWB / tracking number, e.g. OT-AIR-3801"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={
                                                    processing || !codes.trim()
                                                }
                                                className="h-11 cursor-pointer rounded-lg bg-[#FF1E27] px-6 text-sm font-bold text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-600 active:scale-95"
                                            >
                                                {processing ? (
                                                    <Spinner className="text-white" />
                                                ) : (
                                                    'Track'
                                                )}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className={`space-y-2 rounded-xl border bg-white p-2 shadow-xs transition-all ${
                                                isScanning
                                                    ? 'border-red-500/40 ring-2 ring-red-500/15'
                                                    : 'border-slate-200'
                                            }`}
                                        >
                                            <textarea
                                                id="codes"
                                                value={codes}
                                                onChange={(e) =>
                                                    setCodes(e.target.value)
                                                }
                                                rows={3}
                                                className="flex w-full resize-none rounded-lg bg-transparent px-3 py-2 font-mono text-sm text-slate-900 transition-all placeholder:font-sans placeholder:text-slate-400 focus:outline-none"
                                                placeholder={`Paste codes — one per line or comma-separated\nOT-AIR-3801\nOT-OCEAN-4819`}
                                            />
                                            <div className="flex items-center justify-between px-1 pb-0.5">
                                                <p className="text-[10px] font-semibold text-slate-400">
                                                    Up to {maxCodes} codes per
                                                    request.
                                                </p>
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        processing ||
                                                        !codes.trim()
                                                    }
                                                    className="h-9 cursor-pointer rounded-lg bg-[#FF1E27] px-5 text-xs font-bold text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-600 active:scale-95"
                                                >
                                                    {processing ? (
                                                        <Spinner className="text-white" />
                                                    ) : (
                                                        'Track All'
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Demo codes */}
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                        <span>Try demo:</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                injectDemoCode('OT-AIR-3801')
                                            }
                                            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-slate-600 transition-colors hover:border-red-200 hover:text-red-600"
                                        >
                                            OT-AIR-3801
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                injectDemoCode('OT-OCEAN-4819')
                                            }
                                            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-slate-600 transition-colors hover:border-red-200 hover:text-red-600"
                                        >
                                            OT-OCEAN-4819
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Isometric — right column on desktop, below on mobile.
                            In-flow grid cell, so it never overlaps the text. */}
                        <div className="flex items-center justify-center lg:justify-end">
                            <IsometricShippingScene className="h-[42vh] w-full lg:h-[68vh]" />
                        </div>
                    </div>

                    {/* Results Container (Anchored here for seamless transitions) */}
                    {results && results.length > 0 && (
                        <TrackingTimeline results={results} />
                    )}
                    {results && results.length === 0 && (
                        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-10 text-center">
                            <p className="text-sm font-semibold text-slate-600">
                                No results for the codes you entered.
                            </p>
                            <p className="mt-2 text-xs text-slate-400">
                                Enter one or more tracking codes above to check
                                their status.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

NewTrack.layout = (page: React.ReactNode) => (
    <NewPublicLayout>{page}</NewPublicLayout>
);
