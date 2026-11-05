import Link from "next/link";
import { ArrowLeft, Camera, MicVocal, Music2 } from "lucide-react";
import Image from "next/image";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16 text-center sm:px-8">
      <div className="max-w-2xl">
        <div className="flex justify-center">
          <Image
            src="/images/aperture-logo.png"
            alt=""
            width={44}
            height={44}
            className="size-38 object-contain"
          />
        </div>
        <p className="mt-8 text-lg font-bold uppercase tracking-[0.25em] text-primary">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">This studio is off the map</h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">
          The creative space you were looking for may have moved, closed, or never existed.
        </p>
        <Link href="/" className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/85">
          <ArrowLeft className="size-4" /> Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
