import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = ["Home", "Explore Studios", "How It Works", "About Us"];
const categories = ["Photo Studios", "Sound Stages", "Podcast Rooms", "Music Suites", "Art Workshops"];

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
    <path d="M18.9 2h3.7l-8.1 9.3L24 22h-7.4l-5.8-7.6L4.1 22H.4l8.7-10L0 2h7.6l5.2 6.9L18.9 2Zm-1.3 18h2L6.5 3.9H4.3L17.6 20Z" />
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-none stroke-current" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
  </svg>
);

const LinkedinLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
    <path d="M4.9 3.5A1.9 1.9 0 1 0 4.9 7.3a1.9 1.9 0 0 0 0-3.8ZM3.3 8.7h3.2V21H3.3V8.7ZM8.5 8.7h3.1v1.7h.1c.5-.8 1.7-2.1 3.7-2.1 3.9 0 4.6 2.5 4.6 5.9V21h-3.2v-6c0-1.4 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V21H9.2V8.7h-.7Z" />
  </svg>
);

const YoutubeLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
    <path d="M22 12c0 2.7-.3 4.6-.6 5.7a3 3 0 0 1-2 2C18.3 20 15.6 20 12 20s-6.3 0-7.4-.3a3 3 0 0 1-2-2C2.3 16.6 2 14.7 2 12s.3-4.6.6-5.7a3 3 0 0 1 2-2C5.7 4 8.4 4 12 4s6.3 0 7.4.3a3 3 0 0 1 2 2c.3 1.1.6 3 .6 5.7ZM10 8.5v7l6-3.5-6-3.5Z" />
  </svg>
);

const FooterLinks = ({ title, links }) => (
  <div>
    <h2 className="text-lg font-bold text-foreground">{title}</h2>
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link}>
          <Link href="#" className="text-muted-foreground hover:text-primary">{link}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer id="about" className="border-t border-border bg-muted/45 px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.95fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="StudioSpace home">
              <Image src="/images/aperture-logo.png" alt="" width={42} height={42} className="size-10" />
              <span className="text-2xl font-bold tracking-tight text-foreground">Studio<span className="text-primary">Space</span></span>
            </Link>
            <p className="mt-5 max-w-sm leading-6 text-muted-foreground">
              A peer-to-peer marketplace for creative studios and production spaces. Book spaces, host your studio, and create without limits.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="StudioSpace on X" className="text-foreground hover:text-primary"><XLogo /></a>
              <a href="#" aria-label="StudioSpace on Instagram" className="text-foreground hover:text-primary"><InstagramLogo /></a>
              <a href="#" aria-label="StudioSpace on LinkedIn" className="text-foreground hover:text-primary"><LinkedinLogo /></a>
              <a href="#" aria-label="StudioSpace on YouTube" className="text-foreground hover:text-primary"><YoutubeLogo /></a>
            </div>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Studio Categories" links={categories} />

          <div>
            <h2 className="text-lg font-bold text-foreground">Subscribe to Our Newsletter</h2>
            <p className="mt-5 leading-6 text-muted-foreground">Get the latest studio listings, creative tips, and exclusive offers.</p>
            <form className="mt-6 flex gap-2">
              <Input type="email" name="email" placeholder="Enter your email" aria-label="Email address" className="h-11 bg-background" />
              <Button type="submit" size="icon-lg" aria-label="Subscribe to newsletter">
                <ArrowRight className="size-5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 StudioSpace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
