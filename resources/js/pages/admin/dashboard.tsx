import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes/admin';

type FreightType = {
    id: number;
    label: string;
    enabled: boolean;
    spreadsheets_count: number;
};

type Props = {
    cachedCount: number;
    freightTypes: FreightType[];
};

export default function AdminDashboard({ cachedCount, freightTypes }: Props) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Cached Codes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{cachedCount}</p>
                            <p className="text-xs text-muted-foreground">
                                Total tracking codes in cache
                            </p>
                        </CardContent>
                    </Card>

                    {freightTypes.map((ft) => (
                        <Card key={ft.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {ft.label}
                                </CardTitle>
                                <Badge
                                    variant={
                                        ft.enabled ? 'default' : 'secondary'
                                    }
                                    className={
                                        ft.enabled
                                            ? 'bg-green-600 text-white hover:bg-green-600'
                                            : undefined
                                    }
                                >
                                    {ft.enabled ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {ft.spreadsheets_count}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Spreadsheets
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
