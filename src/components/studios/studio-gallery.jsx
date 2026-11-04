"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StudioGallery = ({ title, images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const showPrevious = () => {
    setSelectedImage((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = () => {
    setSelectedImage((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,3fr)_minmax(160px,1fr)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={images[selectedImage]}
          alt={`${title} gallery image ${selectedImage + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button type="button" onClick={showPrevious} aria-label="Previous image" className="absolute top-1/2 left-4 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-md hover:bg-white">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={showNext} aria-label="Next image" className="absolute top-1/2 right-4 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-md hover:bg-white">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto md:grid md:grid-rows-3 md:overflow-visible">
        {images.slice(0, 3).map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(index)}
            aria-label={`Show gallery image ${index + 1}`}
            aria-current={selectedImage === index ? "true" : undefined}
            className={`relative aspect-video min-w-36 overflow-hidden rounded-xl border-2 bg-muted md:aspect-auto md:min-w-0 ${
              selectedImage === index ? "border-primary" : "border-border hover:border-primary/60"
            }`}
          >
            <Image src={image} alt="" fill sizes="(max-width: 768px) 144px, 20vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudioGallery;
