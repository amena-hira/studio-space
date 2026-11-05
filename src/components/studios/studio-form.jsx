"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import {
  Camera,
  DollarSign,
  FileText,
  ImageIcon,
  LinkIcon,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const categories = [
  "Photo Studios",
  "Film Stage",
  "Podcast Lounge",
  "Art Workshops",
  "Sound Stages",
  "Music Suites",
];
const amenities = [
  "Recording Booth",
  "Lighting Setup",
  "Soundproofing",
  "Green Screen",
  "Studio Monitors",
  "Cyclorama Wall",
  "Audio Interface",
  "MIDI Keyboard",
  "Wi-Fi",
  "Reflectors",
  "Changing Room",
  "Makeup Station",
  "Air Conditioning",
  "Parking"
];

const StudioForm = ({ mode, endpoint, method, studio, user }) => {
  const router = useRouter();
  const isEditing = mode === "edit";
  const [imageUrl, setImageUrl] = useState(studio?.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const address = formData.get("address");
    const location = formData.get("location");
    const payload = {
      title: formData.get("title"),
      category: formData.get("category"),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      maxCapacity: Number(formData.get("maxCapacity")),
      location,
      address,
      image: formData.get("image"),
      amenities: formData.getAll("amenities"),
      overview: formData.get("overview"),
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
    };

    try {
      console.log(`endpoint: ${endpoint}, method: ${method}, payload:${payload}`);
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        console.log(result?.message)
        throw new Error(result?.message || "Unable to save the studio.");
      }

      const savedStudio = await response.json();
      toast.add({
        title: isEditing ? "Studio updated" : "Studio added",
        description: isEditing
          ? "Your studio changes were saved successfully."
          : "Your studio was added successfully.",
        type: "success",
      });
      setIsSubmitting(false);
      console.log(`save studio id: ${savedStudio?._id} id: ${studio?._id}`)
      router.push("/my-listings");
      router.refresh();
    } catch (submitError) {
      console.log(submitError);
      toast.add({
        title: "Unable to save studio",
        description: submitError.message,
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex items-center gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Camera className="size-7" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{isEditing ? "Edit Studio" : "Add New Studio"}</h1>
          <p className="mt-1 text-muted-foreground">{isEditing ? "Update your creative workspace information." : "List your creative workspace and make it available for other creators to book."}</p>
        </div>
      </header>

      <Card className="mt-6 gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Studio Title *">
              <InputWithIcon icon={FileText} name="title" defaultValue={studio?.title} placeholder="e.g. SoundWave Recording Suite" required />
            </FormField>
            <FormField label="Category *">
              <Select name="category" defaultValue={studio?.category} required>
                <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <FormField label="Hourly Rate ($) *"><InputWithIcon icon={DollarSign} name="hourlyRate" type="number" min="1" defaultValue={studio?.hourlyRate} placeholder="e.g. 110" required /></FormField>
            <FormField label="Security Deposit ($) *"><InputWithIcon icon={DollarSign} name="securityDeposit" type="number" min="0" defaultValue={studio?.securityDeposit} placeholder="e.g. 250" required /></FormField>
            <FormField label="Max Capacity *"><InputWithIcon icon={Users} name="maxCapacity" type="number" min="1" defaultValue={studio?.maxCapacity} placeholder="e.g. 10" required /></FormField>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Location *">
              <InputWithIcon
                icon={MapPin}
                name="location"
                defaultValue={studio?.location}
                placeholder="e.g. Nashville, Tennessee, USA"
                required
              />
            </FormField>

            <FormField label="Address *">
              <InputWithIcon
                icon={MapPin}
                name="address"
                defaultValue={studio?.address}
                placeholder="e.g. 415 Music Row, Nashville, TN"
                required
              />
            </FormField>
          </div>

          <FormField label="Image URL *">
            <InputWithIcon icon={LinkIcon} name="image" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://images.unsplash.com/..." required />
          </FormField>

          {imageUrl && (
            <div className="grid gap-4 rounded-xl border border-border bg-muted/35 p-2 sm:grid-cols-[340px_1fr] sm:items-center">
              <div className="aspect-16/7 overflow-hidden rounded-lg bg-muted">
                {/* A native image supports direct URLs from ImageBB, Unsplash, and other CDNs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Studio preview" className="size-full object-cover" />
              </div>
              <div className="p-3">
                <h2 className="flex items-center gap-2 font-bold text-foreground"><ImageIcon className="size-5" />Image Preview</h2>
                <p className="mt-2 text-sm text-muted-foreground">This image will be used as your studio&apos;s main display.</p>
              </div>
            </div>
          )}

          <fieldset>
            <legend className="mb-2 font-bold text-foreground">Amenities *</legend>
            <div className="grid gap-4 rounded-xl border border-border bg-muted/20 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((amenity, index) => (
                <label key={amenity} htmlFor={`amenity-${index}`} className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                  <Checkbox id={`amenity-${index}`} name="amenities" value={amenity} defaultChecked={studio?.amenities?.includes(amenity)} />
                  {amenity}
                </label>
              ))}
            </div>
          </fieldset>

          <FormField label="Detailed Overview *">
            <div className="relative">
              <FileText className="absolute top-3 left-3 size-4 text-muted-foreground" />
              <Textarea name="overview" className="min-h-28 pl-10" defaultValue={studio?.overview} placeholder="Describe your studio, setup, and what creators can do here..." required />
            </div>
          </FormField>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Your Name"><Input name="userName" className="h-10 bg-muted" value={user.name} readOnly /></FormField>
            <FormField label="Your Email"><Input name="userEmail" type="email" className="h-10 bg-muted" value={user.email} readOnly /></FormField>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link href="/studios" className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-8 text-sm font-bold text-foreground hover:bg-muted">Cancel</Link>
            <Button type="submit" className="h-11 px-10 text-sm font-bold" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add Studio"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const FormField = ({ label, children }) => (
  <label className="grid gap-2 text-sm font-bold text-foreground">
    {label}
    {children}
  </label>
);

const InputWithIcon = ({ icon: Icon, className = "", ...props }) => (
  <div className="relative">
    <Icon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input className={`h-10 pl-10 ${className}`} {...props} />
  </div>
);

export default StudioForm;
