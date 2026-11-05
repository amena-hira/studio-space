"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Layers, MapPin, Pencil, Tag, Trash2, Users } from "lucide-react";
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
import { toast } from "@/components/ui/toast";
import EmptyState from "@/components/common/empty-state";

const MyListingsList = ({ initialListings, apiUrl }) => {
  const [listings, setListings] = useState(initialListings);

  const deleteStudio = async (studio) => {
    try {
      const response = await fetch(`${apiUrl}/studios/${studio._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("The studio could not be deleted.");

      setListings((current) => current.filter((item) => item._id !== studio._id));
      toast.add({
        title: "Studio deleted",
        description: `${studio.title} was removed from your listings.`,
        type: "success",
      });
    } catch (error) {
      toast.add({ title: "Delete failed", description: error.message, type: "error" });
    }
  };

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={Layers}
        title="No studio listings yet"
        description="Add your first creative workspace to start receiving bookings."
        actionLabel="Add New Studio"
        actionHref="/add-studio"
        className="mt-10"
      />
    );
  }

  return (
    <div className="mt-10 space-y-4">
      {listings.map((studio) => (
        <Card key={studio._id} className="gap-0 rounded-2xl border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-72">
            <Image src={studio.image} alt={studio.title} fill sizes="(max-width: 640px) 100vw, 288px" className="object-cover" />
          </div>

          <div className="min-w-0 flex-1 py-4 sm:py-0">
            <h2 className="truncate text-xl font-bold text-card-foreground">{studio.title}</h2>
            <span className="mt-2 inline-flex rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">{studio.category}</span>
            <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Tag className="size-4" />${studio.hourlyRate} / hour</span>
              <span className="flex items-center gap-2"><Users className="size-4" />{studio.maxCapacity}</span>
              <span className="flex items-center gap-2"><MapPin className="size-4" />{studio.location}</span>
            </div>
          </div>

          <div className="flex shrink-0 gap-3 border-t border-border pt-4 sm:border-0 sm:pt-0">
            <ActionLink href={`/studios/${studio._id}`} label="View studio"><Eye /></ActionLink>
            <ActionLink href={`/studios/edit/${studio._id}`} label="Edit studio"><Pencil /></ActionLink>
            <DeleteButton studio={studio} onDelete={deleteStudio} />
          </div>
        </Card>
      ))}
    </div>
  );
};

const ActionLink = ({ href, label, children }) => (
  <Link href={href} aria-label={label} className="grid size-11 place-items-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary [&_svg]:size-5">
    {children}
  </Link>
);

const DeleteButton = ({ studio, onDelete }) => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="destructive" size="icon-lg" aria-label={`Delete ${studio.title}`} />}>
      <Trash2 className="size-5" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete this studio?</AlertDialogTitle>
        <AlertDialogDescription>This permanently removes <span className="font-bold text-primary">{studio.title}</span> from your listings.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={() => onDelete(studio)}>Delete Studio</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default MyListingsList;
