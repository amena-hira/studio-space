import Link from "next/link";
import { Card } from "@/components/ui/card";

const EmptyState = ({ icon: Icon, title, description, actionLabel, actionHref, className = "" }) => {
  return (
    <Card className={`items-center gap-3 rounded-2xl border-dashed bg-card p-8 text-center sm:p-12 ${className}`}>
      <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-8" />
      </div>
      <h2 className="mt-2 text-xl font-bold text-card-foreground sm:text-2xl">{title}</h2>
      <p className="max-w-md leading-6 text-muted-foreground">{description}</p>
      <Link href={actionHref} className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/85">
        {actionLabel}
      </Link>
    </Card>
  );
};

export default EmptyState;
