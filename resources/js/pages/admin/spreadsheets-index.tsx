import { Head, router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes/admin';
import { destroy, store, update } from '@/routes/admin/spreadsheets';

type Spreadsheet = {
    id: number;
    freight_type_id: number;
    label: string;
    spreadsheet_id: string;
    enabled: boolean;
    sort_order: number;
};

type Group = {
    freight_type: {
        id: number;
        label: string;
    };
    spreadsheets: Spreadsheet[];
};

type Props = {
    groups: Group[];
    freightTypes: { id: number; label: string }[];
};

function AddSpreadsheetForm({
    freightTypes,
    onClose,
}: {
    freightTypes: { id: number; label: string }[];
    onClose: () => void;
}) {
    const [processing, setProcessing] = useState(false);
    const [form, setForm] = useState({
        freight_type_id: String(freightTypes[0]?.id ?? ''),
        label: '',
        spreadsheet_id: '',
        enabled: true,
        sort_order: 0,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        router.post(
            store().url,
            {
                ...form,
                freight_type_id: Number(form.freight_type_id),
            },
            {
                onFinish: () => setProcessing(false),
                preserveScroll: true,
                onSuccess: () => onClose(),
            },
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border p-4"
        >
            <h3 className="font-semibold">Add Spreadsheet</h3>

            <div className="grid gap-2">
                <Label htmlFor="ft">Freight Type</Label>
                <Select
                    value={form.freight_type_id}
                    onValueChange={(v) =>
                        setForm((p) => ({ ...p, freight_type_id: v }))
                    }
                >
                    <SelectTrigger id="ft">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        {freightTypes.map((ft) => (
                            <SelectItem key={ft.id} value={String(ft.id)}>
                                {ft.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="add-label">Label</Label>
                <Input
                    id="add-label"
                    name="label"
                    value={form.label}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, label: e.target.value }))
                    }
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="add-spreadsheet-id">Spreadsheet ID</Label>
                <Input
                    id="add-spreadsheet-id"
                    name="spreadsheet_id"
                    value={form.spreadsheet_id}
                    onChange={(e) =>
                        setForm((p) => ({
                            ...p,
                            spreadsheet_id: e.target.value,
                        }))
                    }
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="add-sort-order">Sort Order</Label>
                <Input
                    id="add-sort-order"
                    name="sort_order"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                        setForm((p) => ({
                            ...p,
                            sort_order: Number(e.target.value),
                        }))
                    }
                />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="add-enabled"
                    name="enabled"
                    checked={form.enabled}
                    onCheckedChange={(checked) =>
                        setForm((p) => ({ ...p, enabled: checked === true }))
                    }
                />
                <Label htmlFor="add-enabled">Enabled</Label>
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {processing && <Spinner />}
                    {processing ? 'Adding...' : 'Add'}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

function EditSpreadsheetForm({
    spreadsheet,
    onClose,
}: {
    spreadsheet: Spreadsheet;
    onClose: () => void;
}) {
    const [processing, setProcessing] = useState(false);
    const [form, setForm] = useState({
        label: spreadsheet.label,
        spreadsheet_id: spreadsheet.spreadsheet_id,
        enabled: spreadsheet.enabled,
        sort_order: spreadsheet.sort_order,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        router.put(update(spreadsheet.id).url, form, {
            onFinish: () => setProcessing(false),
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border p-4"
        >
            <h3 className="font-semibold">Edit Spreadsheet</h3>

            <div className="grid gap-2">
                <Label htmlFor="edit-label">Label</Label>
                <Input
                    id="edit-label"
                    name="label"
                    value={form.label}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, label: e.target.value }))
                    }
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="edit-spreadsheet-id">Spreadsheet ID</Label>
                <Input
                    id="edit-spreadsheet-id"
                    name="spreadsheet_id"
                    value={form.spreadsheet_id}
                    onChange={(e) =>
                        setForm((p) => ({
                            ...p,
                            spreadsheet_id: e.target.value,
                        }))
                    }
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="edit-sort-order">Sort Order</Label>
                <Input
                    id="edit-sort-order"
                    name="sort_order"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                        setForm((p) => ({
                            ...p,
                            sort_order: Number(e.target.value),
                        }))
                    }
                />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="edit-enabled"
                    name="enabled"
                    checked={form.enabled}
                    onCheckedChange={(checked) =>
                        setForm((p) => ({ ...p, enabled: checked === true }))
                    }
                />
                <Label htmlFor="edit-enabled">Enabled</Label>
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    {processing && <Spinner />}
                    {processing ? 'Saving...' : 'Save'}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default function SpreadsheetsIndex({ groups, freightTypes }: Props) {
    const [showAdd, setShowAdd] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    function handleDelete(id: number) {
        if (confirm('Delete this spreadsheet?')) {
            router.delete(destroy(id).url, {
                preserveScroll: true,
            });
        }
    }

    return (
        <>
            <Head title="Spreadsheets" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Spreadsheets</h1>
                    <Button onClick={() => setShowAdd(!showAdd)}>
                        {showAdd ? 'Cancel' : 'Add Spreadsheet'}
                    </Button>
                </div>

                {showAdd && (
                    <AddSpreadsheetForm
                        freightTypes={freightTypes}
                        onClose={() => setShowAdd(false)}
                    />
                )}

                <div className="space-y-8">
                    {groups.map((group) => (
                        <div key={group.freight_type.id}>
                            <h2 className="mb-2 text-lg font-semibold">
                                {group.freight_type.label}
                            </h2>

                            {group.spreadsheets.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No spreadsheets configured.
                                </p>
                            ) : (
                                <div className="overflow-x-auto rounded-lg border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Label</TableHead>
                                                <TableHead>
                                                    Spreadsheet ID
                                                </TableHead>
                                                <TableHead>Enabled</TableHead>
                                                <TableHead>
                                                    Sort Order
                                                </TableHead>
                                                <TableHead className="w-40">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {group.spreadsheets.map((s) => (
                                                <TableRow key={s.id}>
                                                    <TableCell className="font-medium">
                                                        {s.label}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {s.spreadsheet_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                s.enabled
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                            className={
                                                                s.enabled
                                                                    ? 'bg-green-600 text-white hover:bg-green-600'
                                                                    : undefined
                                                            }
                                                        >
                                                            {s.enabled
                                                                ? 'Enabled'
                                                                : 'Disabled'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {s.sort_order}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setEditingId(
                                                                        editingId ===
                                                                            s.id
                                                                            ? null
                                                                            : s.id,
                                                                    )
                                                                }
                                                            >
                                                                {editingId ===
                                                                s.id
                                                                    ? 'Cancel'
                                                                    : 'Edit'}
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        s.id,
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}

                            {editingId &&
                                group.spreadsheets.some(
                                    (s) => s.id === editingId,
                                ) && (
                                    <div className="mt-4">
                                        <EditSpreadsheetForm
                                            spreadsheet={
                                                group.spreadsheets.find(
                                                    (s) => s.id === editingId,
                                                )!
                                            }
                                            onClose={() => setEditingId(null)}
                                        />
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

SpreadsheetsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
