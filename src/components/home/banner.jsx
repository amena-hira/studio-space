"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
    titleAccent: "Studio Space",
    description:
      "Discover inspiring recording spaces with the tools you need to bring your sound to life.",
  },
];

const Banner = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="bg-background sm:px-8 sm:py-5 lg:px-10">
      <div className="relative mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={1}
          autoplay={{ delay: 30000, disableOnInteraction: false }}
          onSwiper={setSwiper}
          onSlideChange={(currentSwiper) => setActiveSlide(currentSwiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.image}>
              <CarrouselItemContent slide={slide} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          className="absolute top-1/2 left-6 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/25 text-white hover:bg-black/50 sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-7" />
        </button>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          className="absolute top-1/2 right-6 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/25 text-white hover:bg-black/50 sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="size-7" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => swiper?.slideToLoop(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? "w-7 bg-primary" : "w-2 bg-white/90 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
