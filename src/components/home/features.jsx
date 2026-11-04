import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeatureCard from "../common/featureCard";

const apiUrl = process.env.BACKEND_URL;


const Features = async () => {
  let studios = [];

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/studios/top-rated`);
      if (response.ok) studios = await response.json();
    } catch {
      studios = [];
    }
  }

  if (!Array.isArray(studios) || studios.length === 0) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Featured <span className="text-primary">Studios</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Discover top-rated creative spaces loved by creators.
            </p>
          </div>
          <Link href="/studios" className="hidden items-center gap-2 text-sm font-bold text-foreground hover:text-primary sm:flex">
            View All Studios <ArrowRight className="size-5 text-primary" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {studios.map((studio) => (
            <FeatureCard key={studio._id} studio={studio} />
          ))}
        </div>

        <Link href="/studios" className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-foreground sm:hidden">
          View All Studios <ArrowRight className="size-5 text-primary" />
        </Link>
      </div>
    </section>
  );
};

export default Features;
