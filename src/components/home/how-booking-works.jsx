import { ArrowRight, CalendarDays, Clapperboard, Search, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  { title: "Discover Spaces", description: "Browse and find the perfect studio for your project.", icon: Search },
  { title: "Select Shoot Hours", description: "Choose your preferred date and time slot.", icon: CalendarDays },
  { title: "Book Instantly", description: "Submit your reservation with transparent pricing.", icon: Zap },
  { title: "Create & Produce", description: "Arrive at your studio and bring your ideas to life.", icon: Clapperboard },
];

const HowBookingWorks = () => (
  <section id="how-it-works" className="bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        How <span className="text-primary">Booking Works</span>
      </h2>
      <p className="mt-2 text-muted-foreground">A simple 4-step process to get your creative space.</p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative">
              <Card className="gap-0 rounded-2xl border-border bg-card p-6 shadow-sm">
                <Icon className="size-12 text-primary" strokeWidth={2.2} />
                <h3 className="mt-4 text-xl font-bold text-card-foreground">{step.title}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{step.description}</p>
              </Card>
              {index < steps.length - 1 && <ArrowRight className="absolute top-1/2 -right-9 hidden size-6 -translate-y-1/2 text-primary xl:block" />}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowBookingWorks;
