"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, Info, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

const times = Array.from({ length: 15 }, (_, index) => index + 8);

const formatTime = (hour) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${suffix}`;
};

const BookingModal = ({ studio, apiUrl }) => {

  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState(10);
  const [endTime, setEndTime] = useState(14);

  const duration = Math.max(endTime - startTime, 0);
  const bookingCost = studio.hourlyRate * duration;
  const total = bookingCost + studio.securityDeposit;

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) {
      setOpen(false);
      return;
    }

    if (isPending) return;

    if (!session?.user) {
      toast.add({
        title: "Login required",
        description: "Please log in before booking a workspace.",
        type: "error",
      });
      router.push(`/login?callbackURL=/studios/${studio._id}`);
      return;
    }

    setOpen(true);
  };

  const confirmBooking = async (event) => {
    event.preventDefault();

    if (!bookingDate || duration === 0) {
      toast.add({
        title: "Choose valid booking details",
        description: "Select a date and an end time after the start time.",
        type: "error",
      });
      return;
    }

    const payload = {
      studioId: studio?._id,
      studioTitle: studio?.title,
      studioImage: studio?.image,
      studioCategory: studio?.category,
      studioLocation: studio?.location,
      username: session.user.name,
      userEmail: session.user.email,
      bookingDate,
      startTime,
      endTime,
      hourlyRate: studio.hourlyRate,
      totalHours: duration,
      totalPrice: total,
      status: "Pending",
      createdAt: new Date()
    }

    try {
      const res = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.message || "Unable to save the booking.");
      }

      toast.add({
        title: "Booking request created",
        description: "Your booking was created with a Pending status.",
        type: "success",
      });
      setOpen(false);
    } catch (error) {
      toast.add({
        title: "Unable to save booking",
        description: error.message,
        type: "error",
      })
    }

  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="h-11 w-full text-base font-bold" disabled={isPending} />}>
        {isPending ? "Checking account..." : "Book Workspace Now"}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:max-w-2xl sm:p-7">
        <DialogHeader className="pr-8">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <CalendarDays className="size-7" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-extrabold sm:text-3xl">Book This Workspace</DialogTitle>
              <DialogDescription className="mt-1 text-base">Reserve your time and bring your creative project to life.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="grid gap-5" onSubmit={confirmBooking}>
          <div className="grid gap-4 rounded-xl border border-border bg-muted/20 p-3 sm:grid-cols-[190px_1fr_auto] sm:items-center">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image src={studio.image} alt={studio.title} fill sizes="190px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-foreground">{studio.title}</h2>
              <Badge className="mt-2 rounded-full border-0 bg-primary/20 px-3 py-1 text-primary">
                <Layers3 className="size-4" />{studio.category}
              </Badge>
            </div>
            <p className="text-lg font-bold text-foreground sm:text-right">${studio.hourlyRate}<span className="font-normal text-muted-foreground"> / hour</span></p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <BookingField label="Booking Date" required>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} className="h-11 pl-11" required />
              </div>
            </BookingField>

            <BookingField label="Start Time" required>
              <TimeSelect value={startTime} onChange={setStartTime} />
            </BookingField>

            <BookingField label="End Time" required>
              <TimeSelect value={endTime} onChange={setEndTime} />
            </BookingField>

            <BookingField label="Total Duration">
              <Input value={`${duration} ${duration === 1 ? "hour" : "hours"}`} className="h-11 bg-muted/50" readOnly />
            </BookingField>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 p-4 text-base">
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Hourly Rate</span><span>${studio.hourlyRate} × {duration} hours</span></div>
            <div className="mt-3 flex justify-between gap-4"><span className="flex items-center gap-2 text-muted-foreground">Security Deposit (Refundable) <Info className="size-4" /></span><span>${studio.securityDeposit}</span></div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-center justify-between gap-4 text-xl font-extrabold"><span>Total Due Now</span><span className="text-2xl text-primary">${total}</span></div>
          </div>

          <div className="flex gap-3 rounded-xl border border-border bg-muted/35 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-5 shrink-0" />
            <p>This booking will be created with a <strong className="text-foreground">Pending</strong> status. You&apos;ll see the status update in My Bookings.</p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <DialogClose render={<Button type="button" variant="outline" className="h-11 px-8" />}>
              Cancel
            </DialogClose>
            <Button type="submit" className="h-11 px-8 text-base font-bold" disabled={!bookingDate || duration === 0}>
              <CalendarDays className="size-5" /> Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const BookingField = ({ label, required, children }) => (
  <label className="grid gap-2 font-bold text-foreground">
    <span>{label}{required && <span className="text-destructive"> *</span>}</span>
    {children}
  </label>
);

const TimeSelect = ({ value, onChange }) => (
  <div className="relative">
    <Clock3 className="pointer-events-none absolute top-1/2 left-3 z-10 size-5 -translate-y-1/2 text-muted-foreground" />
    <NativeSelect className="w-full [&_select]:h-11 [&_select]:pl-11" value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {times.map((hour) => <NativeSelectOption key={hour} value={hour}>{formatTime(hour)}</NativeSelectOption>)}
    </NativeSelect>
  </div>
);

export default BookingModal;
