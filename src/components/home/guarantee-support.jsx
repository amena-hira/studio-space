import { BadgeCheck, Camera, Headphones, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const assurances = [
  { title: "Liability Protection", description: "Coverage for hosts and creators during bookings.", icon: ShieldCheck },
  { title: "Verified Profiles", description: "Trusted hosts and real creative spaces.", icon: BadgeCheck },
  { title: "Equipment Safety", description: "Guidelines and support to keep gear and spaces secure.", icon: Camera },
  { title: "24/7 Host Support", description: "Get help anytime for bookings, listings, or technical issues.", icon: Headphones },
];

const GuaranteeSupport = () => (
  <section className="bg-background px-4 pb-14 sm:px-8 sm:pb-20 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Host <span className="text-primary">Guarantee</span> &amp; Creator <span className="text-primary">Support</span>
      </h2>
      <p className="mt-2 text-muted-foreground">Create and book with confidence on StudioSpace.</p>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {assurances.map((assurance) => {
          const Icon = assurance.icon;
          return (
            <Card key={assurance.title} className="flex-row items-start gap-5 rounded-2xl border-border bg-card p-6 shadow-sm">
              <Icon className="size-12 shrink-0 text-primary" strokeWidth={2.1} />
              <div>
                <h3 className="text-lg font-bold text-card-foreground">{assurance.title}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{assurance.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default GuaranteeSupport;
