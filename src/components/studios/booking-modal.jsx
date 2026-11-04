"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const BookingModal = ({ studio }) => {
  return (
    <Dialog>
      <DialogTrigger render={<Button className="h-11 w-full text-base font-bold" />}>
        Book Workspace Now
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {studio.title}</DialogTitle>
          <DialogDescription>Choose your preferred booking details to request this workspace.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Date
            <Input type="date" required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Hours
            <Input type="number" min="1" defaultValue="1" required />
          </label>
          <p className="text-sm text-muted-foreground">${studio.hourlyRate} per hour · Security deposit: ${studio.securityDeposit}</p>
          <DialogFooter>
            <Button type="submit">Continue Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
