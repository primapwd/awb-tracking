import { Head, router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { dashboard } from '@/routes/admin';
import { update } from '@/routes/admin/freight';

type FreightType = {
    id: number;
    key: string;
    label: string;
    column_processed_date: string;
    column_awb: string;
    column_name: string;
    column_weight: string;
    column_company: string;
    data_columns_range: string;
    data_start_row: number;
    freight_date_cell: string;
    tab_ignore: string;
    cache_ttl_minutes: number;
    snapshot_ttl_seconds: number;
    enabled: boolean;
};

type Props = {
    freightType: FreightType;
};

export default function FreightEdit({ freightType }: Props) {
    const [processing, setProcessing] = useState(false);

    const [form, setForm] = useState({
        label: freightType.label,
        column_processed_date: freightType.column_processed_date,
        column_awb: freightType.column_awb,
        column_name: freightType.column_name,
        column_weight: freightType.column_weight,
        column_company: freightType.column_company,
        data_columns_range: freightType.data_columns_range,
        data_start_row: freightType.data_start_row,
        freight_date_cell: freightType.freight_date_cell,
        tab_ignore: freightType.tab_ignore,
        cache_ttl_minutes: freightType.cache_ttl_minutes,
        snapshot_ttl_seconds: freightType.snapshot_ttl_seconds,
        enabled: freightType.enabled,
    });

    function handleChange(
        field: keyof typeof form,
        value: string | number | boolean,
    ) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        router.put(update({ type: freightType.key }).url, form, {
            onFinish: () => setProcessing(false),
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title={`Edit ${freightType.label}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Freight Type</h1>

                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            name="label"
                            value={form.label}
                            onChange={(e) =>
                                handleChange('label', e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="column_processed_date">
                            Column &mdash; Processed Date
                        </Label>
                        <Input
                            id="column_processed_date"
                            name="column_processed_date"
                            value={form.column_processed_date}
                            onChange={(e) =>
                                handleChange(
                                    'column_processed_date',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="column_awb">
                            Column &mdash; Tracking Code
                        </Label>
                        <Input
                            id="column_awb"
                            name="column_awb"
                            value={form.column_awb}
                            onChange={(e) =>
                                handleChange(
                                    'column_awb',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="column_name">Column &mdash; Name</Label>
                        <Input
                            id="column_name"
                            name="column_name"
                            value={form.column_name}
                            onChange={(e) =>
                                handleChange(
                                    'column_name',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="column_weight">
                            Column &mdash; Weight
                        </Label>
                        <Input
                            id="column_weight"
                            name="column_weight"
                            value={form.column_weight}
                            onChange={(e) =>
                                handleChange(
                                    'column_weight',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="column_company">
                            Column &mdash; Company
                        </Label>
                        <Input
                            id="column_company"
                            name="column_company"
                            value={form.column_company}
                            onChange={(e) =>
                                handleChange(
                                    'column_company',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="data_columns_range">
                            Data Columns Range
                        </Label>
                        <Input
                            id="data_columns_range"
                            name="data_columns_range"
                            value={form.data_columns_range}
                            onChange={(e) =>
                                handleChange(
                                    'data_columns_range',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            placeholder="A:E"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="data_start_row">Data Start Row</Label>
                        <Input
                            id="data_start_row"
                            name="data_start_row"
                            type="number"
                            value={form.data_start_row}
                            onChange={(e) =>
                                handleChange(
                                    'data_start_row',
                                    Number(e.target.value),
                                )
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="freight_date_cell">
                            Freight Date Cell
                        </Label>
                        <Input
                            id="freight_date_cell"
                            name="freight_date_cell"
                            value={form.freight_date_cell}
                            onChange={(e) =>
                                handleChange(
                                    'freight_date_cell',
                                    e.target.value.toUpperCase(),
                                )
                            }
                            className="uppercase"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tab_ignore">
                            Tab Ignore (comma-separated)
                        </Label>
                        <Input
                            id="tab_ignore"
                            name="tab_ignore"
                            value={form.tab_ignore}
                            onChange={(e) =>
                                handleChange('tab_ignore', e.target.value)
                            }
                            placeholder="Sheet1,Summary"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cache_ttl_minutes">
                            Cache TTL (minutes)
                        </Label>
                        <Input
                            id="cache_ttl_minutes"
                            name="cache_ttl_minutes"
                            type="number"
                            value={form.cache_ttl_minutes}
                            onChange={(e) =>
                                handleChange(
                                    'cache_ttl_minutes',
                                    Number(e.target.value),
                                )
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="snapshot_ttl_seconds">
                            Snapshot TTL (seconds)
                        </Label>
                        <Input
                            id="snapshot_ttl_seconds"
                            name="snapshot_ttl_seconds"
                            type="number"
                            value={form.snapshot_ttl_seconds}
                            onChange={(e) =>
                                handleChange(
                                    'snapshot_ttl_seconds',
                                    Number(e.target.value),
                                )
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="enabled"
                            name="enabled"
                            checked={form.enabled}
                            onCheckedChange={(checked) =>
                                handleChange('enabled', checked === true)
                            }
                        />
                        <Label htmlFor="enabled">Enabled</Label>
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </>
    );
}

FreightEdit.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
