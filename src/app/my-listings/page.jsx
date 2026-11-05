import Link from "next/link";
import { Home, Layers, Plus } from "lucide-react";
import MyListingsList from "@/components/studios/my-listings-list";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const apiUrl = process.env.BACKEND_URL;

export const dynamic = "force-dynamic";

const MyListingsPage = async () => {
    let listings = [];
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

    try {
        const token = await getTokenFromServer();
        const response = await fetch(`${apiUrl}/studios/user/${user?.email}`, {
            cache: "no-store",
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            listings = await response.json();

            console.log(listings);
        }

    } catch {
        listings = [];
    }

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-primary"><Home className="size-4" /></Link>
                    <span>/</span>
                    <span className="text-foreground">My Listings</span>
                </nav>

                <header className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                            <Layers className="size-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">My Studio Listings</h1>
                            <p className="mt-1 text-muted-foreground">Manage your creative spaces. View details, edit information, or remove your listings.</p>
                        </div>
                    </div>
                    <Link href="/add-studio" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/85">
                        <Plus className="size-5" /> Add New Studio
                    </Link>
                </header>

                <MyListingsList initialListings={listings} apiUrl={apiUrl} />
            </div>
        </main>
    );
};

export default MyListingsPage;
