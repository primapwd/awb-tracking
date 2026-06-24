import { Head, router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { submit } from '@/routes/track';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import PublicLayout from '@/layouts/public-layout';

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

export default function Track({ results, maxCodes, query }: Props) {
    const [codes, setCodes] = useState(query ?? '');
    const [processing, setProcessing] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        router.post(
            submit().url,
            { codes },
            {
                onFinish: () => setProcessing(false),
                preserveScroll: true,
            },
        );
    }

    return (
        <>
            <Head title="Track Shipments" />

            <section className="bg-linear-to-b from-muted/30 to-background px-4 py-16 md:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Track Your Shipments
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Enter tracking codes to check processing status across
                        air and ocean freight.
                    </p>
                </div>
            </section>

            <section className="mx-auto w-full max-w-4xl px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="codes">Tracking Codes</Label>
                        <textarea
                            id="codes"
                            name="codes"
                            value={codes}
                            onChange={(e) => setCodes(e.target.value)}
                            rows={5}
                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            placeholder={
                                'Paste tracking codes, one per line or comma-separated'
                            }
                        />
                        <p className="text-xs text-muted-foreground">
                            Up to {maxCodes} codes per request.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing || !codes.trim()}
                    >
                        {processing && <Spinner />}
                        {processing ? 'Searching...' : 'Track'}
                    </Button>
                </form>

                {results && results.length > 0 && (
                    <div className="mt-8 overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tracking Code</TableHead>
                                    <TableHead>Logistic Company</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>Processed Date</TableHead>
                                    <TableHead>Tab Date</TableHead>
                                    <TableHead>Freight Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {results.map((r, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                            {r.awb}
                                        </TableCell>
                                        <TableCell>
                                            {r.logistic_company}
                                        </TableCell>
                                        <TableCell>{r.weight}</TableCell>
                                        <TableCell>
                                            {r.processed_date}
                                        </TableCell>
                                        <TableCell>{r.tab_date}</TableCell>
                                        <TableCell>{r.freight_date}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    r.type === 'air'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {r.type === 'air'
                                                    ? 'Air'
                                                    : 'Ocean'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    r.status === 'processed'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className={
                                                    r.status === 'processed'
                                                        ? 'bg-green-600 text-white hover:bg-green-600'
                                                        : undefined
                                                }
                                            >
                                                {r.status === 'processed'
                                                    ? 'Processed'
                                                    : 'Not found'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {results && results.length === 0 && (
                    <div className="mt-8 rounded-lg border p-8 text-center text-muted-foreground">
                        No results found for the provided codes.
                    </div>
                )}
            </section>
        </>
    );
}

Track.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
