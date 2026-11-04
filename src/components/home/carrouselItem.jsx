import Image from "next/image";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

const CarrouselItemContent = ({ slide, index }) => {
    return (
            <div className="relative h-[440px] overflow-hidden sm:h-[470px] sm:rounded-2xl lg:h-[500px]">
                <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1600px"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/10" />

                <div className="relative z-10 flex h-full max-w-sm flex-col justify-center px-6 py-10 sm:max-w-3xl sm:px-16 sm:py-12 lg:px-24">
                    <p className="mb-3 text-xs font-bold tracking-wide text-primary sm:text-base">
                        {slide.eyebrow}
                    </p>

                    <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
                        {slide.titleStart}{" "}
                        <span className="text-primary">
                            {slide.titleAccent}
                        </span>
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-lg">
                        {slide.description}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                        <Link
                            href="/studios"
                            className="flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90 sm:py-4"
                        >
                            <Search className="size-4" />
                            Explore Studios
                        </Link>

                        <Link
                            href="/studios/new"
                            className="flex items-center justify-center gap-3 rounded-xl border border-white/80 px-6 py-3.5 font-semibold text-white hover:bg-white/10 sm:py-4"
                        >
                            <Plus className="size-4" />
                            Host Your Space
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default CarrouselItemContent;
