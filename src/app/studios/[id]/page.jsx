import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  LayoutList,
  BriefcaseBusiness,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import StudioGallery from "@/components/studios/studio-gallery";
import BookingModal from "@/components/studios/booking-modal";
import AmenityIcon from "@/components/studios/amenity-icon";


const apiUrl = process.env.BCKEND_URL || process.env.BACKEND_URL;

const StudioDetailsPage = async ({ params }) => {
  const { id } = await params;
  let studio = null;

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/studios/${id}`);
      if (response.ok) studio = await response.json();
    } catch {
      studio = null;
    }
  }

  if (!studio) return null;

  const galleryImages = [
    studio.image,
    ...(studio.images || []),
    "/images/studio-gallery/beatlab.jpg",
    "/images/studio-gallery/studio-microphone.jpg",
    "/images/studio-gallery/studio-console.jpg",
  ].filter((image, index, images) => image && images.indexOf(image) === index);

  const initials = studio.userName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  return (
    <main className="bg-background px-4 py-7 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to Studios
        </Link>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{studio.title}</h1>
            <Badge className="rounded-full border-0 bg-primary/20 px-4 py-2 text-primary">{studio.category}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="size-4" />{studio.location}</span>
            <span className="hidden h-5 border-l border-border sm:block" />
            <span className="flex items-center gap-2 font-bold text-foreground"><Star className="size-5 fill-amber-400 text-amber-400" />{studio.rating} <span className="font-normal text-muted-foreground">({studio.reviewCount} reviews)</span></span>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_316px] lg:items-start">
          <div>
            <StudioGallery title={studio.title} images={galleryImages} />

            <nav className="mt-5 grid grid-cols-3 border-b border-border" aria-label="Studio information">
              <a href="#overview" className="flex items-center justify-center gap-2 border-b-2 border-primary px-2 py-4 font-semibold text-primary"><LayoutList className="size-5" />Overview</a>
              <a href="#amenities" className="flex items-center justify-center gap-2 border-b-2 border-transparent px-2 py-4 font-semibold text-foreground hover:text-primary"><BriefcaseBusiness className="size-5" />Amenities</a>
              <a href="" className="flex items-center justify-center gap-2 border-b-2 border-transparent px-2 py-4 font-semibold text-foreground hover:text-primary"><Star className="size-5" />Reviews <span className="hidden sm:inline">({studio.reviewCount})</span></a>
            </nav>

            <section id="overview" className="scroll-mt-24 pt-7">
              <h2 className="text-2xl font-bold text-foreground">About this space</h2>
              <p className="mt-2 max-w-4xl leading-7 text-muted-foreground">{studio.overview}</p>
            </section>

            <section id="amenities" className="scroll-mt-24 pt-7">
              <h2 className="text-2xl font-bold text-foreground">Amenities</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {studio.amenities?.map((amenity) => (
                  <span key={amenity} className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground">
                    <AmenityIcon amenity={amenity} className="size-5 shrink-0 text-primary" />{amenity}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6">
            <Card className="gap-0 rounded-xl border-border bg-card p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-foreground">${studio.hourlyRate}<span className="ml-2 text-lg font-medium text-muted-foreground">/ hr</span></p>
              <div className="my-4 border-t border-border" />
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-3 text-muted-foreground"><ShieldCheck className="size-5 text-primary" />Security Deposit</span><strong>${studio.securityDeposit}</strong></div>
                <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-3 text-muted-foreground"><Users className="size-5 text-primary" />Max Capacity</span><strong>{studio.maxCapacity}</strong></div>
              </div>
              <div className="my-4 border-t border-border" />
              <BookingModal studio={studio} />
            </Card>

            <Card className="gap-0 rounded-xl border-border bg-card p-5 shadow-sm">
              <h2 className="text-lg font-bold text-foreground">Hosted by</h2>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="size-14"><AvatarFallback className="bg-primary/15 font-bold text-primary">{initials}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <p className="font-bold text-foreground">{studio.userName}</p>
                  <p className="truncate text-sm text-muted-foreground">{studio.userEmail}</p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
};



export default StudioDetailsPage;
