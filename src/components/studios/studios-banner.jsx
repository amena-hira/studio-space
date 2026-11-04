import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StudiosBanner = () => {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-card px-4 py-10 sm:px-8 lg:px-10 lg:py-12">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25 dark:opacity-40"
        style={{ backgroundImage: "url('/images/banner/photography-c.png')" }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/35" />

      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Explore <span className="text-primary">Creative Studios</span>
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">Find and book the perfect space for your next creative project.</p>

        <form className="mt-7 flex max-w-3xl overflow-hidden rounded-xl border border-input bg-background/90 p-1 shadow-sm">
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <Input className="h-11 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0" placeholder="Search studios, locations or keywords..." />
          </div>
          <Button type="submit" className="h-11 px-6 sm:px-9">Search</Button>
        </form>
      </div>
    </section>
  );
};

export default StudiosBanner;
