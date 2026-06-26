import {
    Plane,
    Anchor,
    Box,
    CheckCircle2,
    Calendar,
    Weight,
    Building2,
    HelpCircle,
    ChevronRight,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

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
    results: TrackingResult[];
};

export default function TrackingTimeline({ results }: Props) {
    if (!results || results.length === 0) {
        return null;
    }

    const processedCount = results.filter(
        (r) => r.status === 'processed',
    ).length;
    const notFoundCount = results.length - processedCount;

    return (
        <div className="mt-12 space-y-8 duration-500 fade-in slide-in-from-bottom-4 motion-safe:animate-in">
            {/* Tracking Overview Dashboard */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 px-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                        Search Results
                    </span>
                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                        {results.length} Code{results.length > 1 ? 's' : ''}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span className="text-slate-600">
                            Processed: {processedCount}
                        </span>
                    </div>
                    {notFoundCount > 0 && (
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                            <span className="text-slate-600">
                                Not Found: {notFoundCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Individual Tracking Cards */}
            <div className="space-y-6">
                {results.map((result, idx) => {
                    const isProcessed = result.status === 'processed';

                    return (
                        <div
                            key={`${result.awb}-${idx}`}
                            className={`relative rounded-2xl border transition-all duration-300 ${
                                isProcessed
                                    ? 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                                    : 'border-rose-100 bg-rose-50/30'
                            }`}
                        >
                            {/* Card Header */}
                            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center md:p-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                            isProcessed
                                                ? result.type === 'air'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-teal-50 text-teal-600'
                                                : 'bg-rose-50 text-rose-500'
                                        }`}
                                    >
                                        {!isProcessed ? (
                                            <HelpCircle
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        ) : result.type === 'air' ? (
                                            <Plane
                                                className="size-5 rotate-45"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Anchor
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    <div className="flex min-w-0 flex-col">
                                        <h3 className="truncate font-mono text-base font-bold tracking-tight text-slate-900">
                                            {result.awb}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="text-xs font-semibold text-slate-500">
                                                Freight Type:
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                                    isProcessed
                                                        ? result.type === 'air'
                                                            ? 'border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-50'
                                                            : 'border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-50'
                                                        : 'border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-50'
                                                }`}
                                            >
                                                {result.type === 'air'
                                                    ? 'Air Cargo'
                                                    : 'Ocean Liner'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                            isProcessed
                                                ? 'animate-pulse border border-emerald-100 bg-emerald-50 text-emerald-700'
                                                : 'border border-rose-100 bg-rose-50 text-rose-700'
                                        }`}
                                    >
                                        {isProcessed ? (
                                            <>
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                Processed
                                            </>
                                        ) : (
                                            <>
                                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                                Not Found
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content & Milestones */}
                            {isProcessed ? (
                                <div className="space-y-6 p-5 md:p-6">
                                    {/* Specs grid */}
                                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50/50 p-4 text-xs font-semibold text-slate-600 sm:grid-cols-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <Building2
                                                className="size-4 flex-shrink-0 text-slate-400"
                                                aria-hidden="true"
                                            />
                                            <div className="min-w-0">
                                                <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                                                    Carrier
                                                </span>
                                                <span className="block truncate text-slate-700">
                                                    {result.logistic_company}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex min-w-0 items-center gap-2">
                                            <Weight
                                                className="size-4 flex-shrink-0 text-slate-400"
                                                aria-hidden="true"
                                            />
                                            <div className="min-w-0">
                                                <span className="block text-[10px] tracking-wider text-slate-400 uppercase">
                                                    Weight
                                                </span>
                                                <span className="block truncate text-slate-700">
                                                    {result.weight}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual Milestones timeline */}
                                    <div className="mt-8">
                                        <span className="mb-4 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                            Shipment Progress Milestones
                                        </span>

                                        {/* Timeline Flow */}
                                        <div className="relative mt-6 flex flex-col justify-between gap-6 md:flex-row md:gap-4">
                                            {/* Connecting progress line behind */}
                                            <div className="absolute top-8 bottom-8 left-[18px] z-0 hidden bg-slate-100 sm:block md:top-6 md:right-6 md:bottom-auto md:left-6 md:h-[3px] md:w-[calc(100%-48px)]" />

                                            {/* Milestone 1: Intake */}
                                            <div className="relative z-10 flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-emerald-200 bg-emerald-50 text-emerald-600 md:h-12 md:w-12">
                                                    <CheckCircle2
                                                        className="size-4 md:size-5"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex flex-col text-left md:items-center md:text-center">
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Intake & Scan
                                                    </span>
                                                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                                        <Calendar
                                                            className="size-3"
                                                            aria-hidden="true"
                                                        />
                                                        {result.processed_date ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow for Desktop */}
                                            <div className="hidden h-12 items-center justify-center self-center text-slate-300 md:flex">
                                                <ChevronRight
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            {/* Milestone 2: Crate Loaded */}
                                            <div className="relative z-10 flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-blue-200 bg-blue-50 text-blue-600 md:h-12 md:w-12">
                                                    <Box
                                                        className="size-4 md:size-5"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex flex-col text-left md:items-center md:text-center">
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Cargo Bay Load
                                                    </span>
                                                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                                        <Calendar
                                                            className="size-3"
                                                            aria-hidden="true"
                                                        />
                                                        Tab:{' '}
                                                        {result.tab_date ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow for Desktop */}
                                            <div className="hidden h-12 items-center justify-center self-center text-slate-300 md:flex">
                                                <ChevronRight
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            {/* Milestone 3: Departed */}
                                            <div className="relative z-10 flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-slate-200 bg-slate-50 text-slate-600 md:h-12 md:w-12">
                                                    {result.type === 'air' ? (
                                                        <Plane
                                                            className="size-4 rotate-45 md:size-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <Anchor
                                                            className="size-4 md:size-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col text-left md:items-center md:text-center">
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Manifest Departed
                                                    </span>
                                                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                                        <Calendar
                                                            className="size-3"
                                                            aria-hidden="true"
                                                        />
                                                        {result.freight_date ||
                                                            'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5 md:p-6">
                                    <div className="rounded-xl border border-rose-100/60 bg-rose-50/50 p-4">
                                        <p className="text-sm font-semibold text-rose-800">
                                            Tracking code not found in our
                                            current manifests.
                                        </p>
                                        <p className="mt-2 text-xs leading-relaxed text-rose-600/95">
                                            The code you searched for might not
                                            be processed yet, or it belongs to a
                                            past cycle. Please verify the
                                            characters or contact the dispatch
                                            coordinator if you believe this is
                                            an error.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
