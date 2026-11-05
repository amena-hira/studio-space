import { CalendarX } from "lucide-react";
import EmptyState from "@/components/common/empty-state";

const MyBookingsPage = () => {
  return (
    <main className="min-h-[65vh] bg-background px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">My Bookings</h1>
        <p className="mt-2 text-muted-foreground">Manage your upcoming and previous studio reservations.</p>
        <EmptyState
          icon={CalendarX}
          title="No bookings yet"
          description="Once you reserve a creative studio, your booking details will appear here."
          actionLabel="Explore Studios"
          actionHref="/studios"
          className="mt-8"
        />
      </div>
    </main>
  );
};

export default MyBookingsPage;
