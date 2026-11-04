
import { Aperture } from "lucide-react";

export default function Loading({
    fullScreen = false,
    text = "Preparing your creative space...",
}) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex w-full flex-col items-center justify-center gap-5 bg-background px-4 text-foreground ${fullScreen ? "min-h-screen" : "min-h-[60vh]"
                }`}
        >
            <div className="relative flex size-20 items-center justify-center">
                {/* Outer animated ring */}
                <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-primary/15 border-t-primary" />

                {/* Soft purple glow */}
                <div className="absolute inset-3 rounded-full bg-primary/10 blur-lg" />

                {/* Brand icon */}
                <Aperture className="relative size-9 animate-pulse text-primary" />
            </div>

            <div className="space-y-2 text-center">
                <h2 className="text-xl font-bold tracking-tight">
                    Studio<span className="text-primary">Space</span>
                </h2>

                <p className="animate-pulse text-sm text-muted-foreground">
                    {text}
                </p>
            </div>

            <span className="sr-only">Loading content</span>
        </div>
    );
}
