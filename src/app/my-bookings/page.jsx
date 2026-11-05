import Link from "next/link";
import { CalendarDays, Home } from "lucide-react";
import MyBookingsList from "@/components/bookings/my-bookings-list";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const apiUrl = process.env.BACKEND_URL;

export const dynamic = "force-dynamic";

const MyBookingsPage = async () => {
  let bookings = [];
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user

  try {
    const token = await getTokenFromServer();
    const response = await fetch(`${apiUrl}/bookings/user/${user?.email}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      bookings = Array.isArray(result) ? result : [];
    }
  } catch {
    bookings = [];
  }

  return (
    <main className="min-h-[65vh] bg-background px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary"><Home className="size-4" />Home</Link>
          <span>/</span>
          <span className="text-foreground">My Bookings</span>
        </nav>

        <header className="mt-7 flex items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <CalendarDays className="size-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">My Bookings</h1>
            <p className="mt-1 text-muted-foreground">View and manage all your workspace reservations.</p>
          </div>
        </header>

        <MyBookingsList initialBookings={bookings} apiUrl={apiUrl} />
      </div>
    </main>
  );
};

export default MyBookingsPage;
