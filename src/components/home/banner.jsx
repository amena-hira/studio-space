"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarrouselItemContent from "./carrouselItem";

const slides = [
  {
    image: "/images/banner/photography-c.png",
    alt: "Professional photography studio with camera and lights",
    eyebrow: "RENT • CREATE • PRODUCE",
    titleStart: "Find the Perfect Creative",
    titleAccent: "Studio Space",
    description:
      "Book professional studios for photo shoots, film production, podcasts, music, and creative projects — directly from trusted hosts.",
  },
  {
    image: "/images/banner/podcast-c.png",
    alt: "Purple podcast studio with microphones",
    eyebrow: "RECORD • SHARE • INSPIRE",
    titleStart: "Create Your Next",
    titleAccent: "Great Podcast",
    description:
      "Find comfortable, fully equipped podcast spaces made for conversations that sound their best.",
  },
  {
    image: "/images/banner/music-c.png",
    alt: "Music production studio with mixing console",
    eyebrow: "PLAY • MIX • MASTER",
    titleStart: "Make Music in a",
    titleAccent: "Pro Studio",
    description:
      "Discover inspiring recording spaces with the tools you need to bring your sound to life.",
  },
];

const Banner = () => {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        const updateSlide = () => {
            setCurrent(api.selectedScrollSnap());
            setCount(api.scrollSnapList().length);
        };

        updateSlide();

        api.on("select", updateSlide);
        api.on("reInit", updateSlide);

        return () => {
            api.off("select", updateSlide);
            api.off("reInit", updateSlide);
        };
    }, [api]);

    return (
        <section className="bg-background py-4 sm:px-8 sm:py-5 lg:px-10">
            <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 10000,
                        stopOnInteraction: false,
                    }),
                ]}
                className="mx-auto max-w-[1600px]"
            >
                <CarouselContent className="ml-0">
                    {slides.map((slide, index) => (
                        <CarrouselItemContent key={slide.image} slide={slide} index={index} />
                    ))}
                </CarouselContent>

                {/* Previous Button */}
                <CarouselPrevious className="left-6 hidden size-12 border-2 border-white/80 bg-black/25 text-white hover:bg-black/50 hover:text-white sm:flex" />

                {/* Next Button */}
                <CarouselNext className="right-6 hidden size-12 border-2 border-white/80 bg-black/25 text-white hover:bg-black/50 hover:text-white sm:flex" />

                {/* Carousel Dots */}
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={
                                current === index ? "true" : undefined
                            }
                            className={`h-2 rounded-full transition-all duration-300 ${current === index
                                    ? "w-7 bg-primary"
                                    : "w-2 bg-white/90 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    );
};

export default Banner;
