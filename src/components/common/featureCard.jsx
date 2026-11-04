import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const FeatureCard = ({ studio }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border-border bg-card p-0 text-card-foreground shadow-lg shadow-black/10">
            <div className="relative overflow-hidden bg-muted">
                <Image
                    src={studio.image}
                    alt={studio.title}
                    width={400}
                    height={400}
                    className="h-56 lg:h-36 w-full aspect-video object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 rounded-full border-0 bg-primary px-3 py-1 text-xs font-bold text-white">
                    {studio.category}
                </Badge>
                <button
                    type="button"
                    className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-black/60 text-white"
                    aria-label={`Save ${studio.title}`}
                >
                    <Heart className="size-4" />
                </button>
                <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/65 px-2 py-1 text-sm font-bold">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white/90">{studio.rating}</span>
                </span>
            </div>

            <div className="px-4 pb-4">
                <h3 className="truncate text-base font-bold">{studio.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    {studio.location}
                </p>
                <p className="mt-4 text-2xl font-extrabold">
                    ${studio.hourlyRate}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/ hr</span>
                </p>
                <Link href={`/studios/${studio._id}`} className="mt-4 block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary/90">
                    View Details
                </Link>
            </div>
        </Card>
    );
};

export default FeatureCard;
