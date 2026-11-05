"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CalendarX, CheckCircle2, Clock3, MapPin, XCircle } from "lucide-react";
import EmptyState from "@/components/common/empty-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  Pending: "bg-amber-500/15 text-amber-500",
  Confirmed: "bg-emerald-500/15 text-emerald-500",
  Completed: "bg-blue-500/15 text-blue-500",
  Cancelled: "bg-red-500/15 text-red-500",
};

const MyBookingsList = ({ initialBookings, apiUrl }) => {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleBookings = activeFilter === "All"
    ? bookings
    : bookings.filter((booking) => booking.status === activeFilter);

  const countFor = (filter) => filter === "All"
    ? bookings.length
    : bookings.filter((booking) => booking.status === filter).length;

  const cancelBooking = async (booking) => {
    const token = await getTokenFromClient();
    try {
      const response = await fetch(`${apiUrl}/bookings/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!response.ok) throw new Error("The booking could not be cancelled.");

      setBookings((current) => current.map((item) =>
        item._id === booking._id ? { ...item, status: "Cancelled" } : item
      ));
      toast.success("Booking cancelled", { description: `${booking.studioTitle} was cancelled.` });
    } catch (error) {
      toast.error("Cancellation failed", { description: error.message });
    }
  };

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="No bookings yet"
        description="Once you reserve a creative studio, your booking details will appear here."
        actionLabel="Explore Studios"
        actionHref="/studios"
        className="mt-8"
      />
    );
  }

  return (
    <div className="mt-8">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`h-10 shrink-0 rounded-lg border px-5 text-sm font-semibold transition-colors ${
              activeFilter === filter
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/60"
            }`}
          >
            {filter === "All" ? "All Bookings" : filter} ({countFor(filter)})
          </button>
        ))}
      </div>

      {visibleBookings.length > 0 ? (
        <div className="mt-5 space-y-4">
          {visibleBookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} onCancel={cancelBooking} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX}
          title={`No ${activeFilter.toLowerCase()} bookings`}
          description={`You don't currently have any bookings with a ${activeFilter.toLowerCase()} status.`}
          actionLabel="View All Bookings"
          actionHref="/my-bookings"
          className="mt-5"
        />
      )}
    </div>
  );
};

const BookingCard = ({ booking, onCancel }) => (
  <Card className="relative gap-0 rounded-2xl border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/50 md:flex-row md:items-center md:gap-5">
    {booking.studioId && (
      <Link
        href={`/studios/${booking.studioId}`}
        aria-label={`Open ${booking.studioTitle}`}
        className="absolute inset-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      />
    )}
    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted md:w-52">
      {booking.studioImage && <Image src={booking.studioImage} alt={booking.studioTitle} fill sizes="(max-width: 768px) 100vw, 208px" className="object-cover" />}
    </div>

    <div className="min-w-0 flex-1 py-4 md:py-0">
      <h2 className="truncate text-xl font-bold text-card-foreground">{booking.studioTitle}</h2>
      <div className="mt-2 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
        {booking.studioCategory && <span>{booking.studioCategory}</span>}
        {booking.studioLocation && <span className="flex items-center gap-2"><MapPin className="size-4" />{booking.studioLocation}</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><CalendarDays className="size-4" />{formatDate(booking.bookingDate)}</span>
        <span className="flex items-center gap-2"><Clock3 className="size-4" />{formatTime(booking.startTime)} – {formatTime(booking.endTime)}</span>
      </div>
    </div>

    <div className="relative z-10 flex flex-wrap items-center gap-3 border-t border-border pt-4 md:border-0 md:pt-0">
      <StatusBadge status={booking.status} />
      {booking.status === "Pending" && <CancelBookingButton booking={booking} onCancel={onCancel} />}
    </div>
  </Card>
);

const StatusBadge = ({ status }) => {
  const Icon = status === "Cancelled" ? XCircle : CheckCircle2;
  return (
    <span className={`inline-flex h-10 items-center gap-2 rounded-full px-4 font-bold ${statusStyles[status] || "bg-muted text-muted-foreground"}`}>
      {status === "Pending" ? <Clock3 className="size-5" /> : <Icon className="size-5" />}{status}
    </span>
  );
};

const CancelBookingButton = ({ booking, onCancel }) => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="destructive" className="h-10 border border-destructive bg-transparent px-5" />}>
      Cancel Booking
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
        <AlertDialogDescription>Your reservation for <span className="text-primary font-semibold">{booking.studioTitle}</span> will be marked as cancelled.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep Booking</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={() => onCancel(booking)}>Cancel Booking</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const formatDate = (date) => {
  if (!date) return "Date unavailable";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(parsedDate);
};

const formatTime = (time) => {
  if (typeof time !== "number") return time;
  const suffix = time >= 12 ? "PM" : "AM";
  const hour = time > 12 ? time - 12 : time;
  return `${hour}:00 ${suffix}`;
};

export default MyBookingsList;
