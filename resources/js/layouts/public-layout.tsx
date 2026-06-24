import { Link } from '@inertiajs/react';
import { PackageSearch } from 'lucide-react';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 max-w-5xl items-center px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <PackageSearch className="size-5" />
                        <span>OnTime Shipping - Tracking</span>
                    </Link>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-4 text-center text-xs text-muted-foreground">
                OnTime Shipping &middot; Air &amp; Ocean Freight
            </footer>
        </div>
    );
}
