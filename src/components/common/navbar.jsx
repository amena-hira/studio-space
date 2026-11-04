"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CalendarDays,
    ChevronDown,
    Heart,
    Layers,
    LogOut,
    Menu,
    PlusSquare,
} from "lucide-react";
import ThemeToggle from "../theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const Navbar = () => {
    const pathname = usePathname();
    const navLinks = [
        { href: "/", label: "Home", active: "/" },
        { href: "/studios", label: "Explore Studios", active: "/studios" },
        { href: "#how-it-works", label: "How It Works", active: null },
        { href: "#about", label: "About Us", active: null },
    ];

    const isActiveLink = (active) => {
        if (!active) return false;
        if (active === "/") return pathname === "/";
        return pathname === active || pathname.startsWith(`${active}/`);
    };

    // Change this to false to preview the Login and Register buttons.
    // Authentication will provide this value later.
    const isAuthenticated = false;

    return (
        <header className="border-b border-border bg-background">
            <nav
                className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
                aria-label="Main navigation"
            >
                <Link href="/" className="flex items-center gap-2" aria-label="StudioSpace home">
                    <Image
                        src="/images/aperture-logo.png"
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 object-contain"
                    />
                    <span className="text-lg lg:text-2xl font-bold tracking-tight text-foreground min-[420px]:inline">
                        Studio<span className="text-primary">Space</span>
                    </span>
                </Link>

                <div className="hidden h-full items-center gap-8 text-sm font-semibold lg:flex">
                    {navLinks.map((link) => {
                        const isActive = isActiveLink(link.active);
                        const className = isActive
                            ? "flex h-full items-center border-b-2 border-primary text-primary"
                            : "flex h-full items-center border-b-2 border-transparent text-foreground hover:border-primary/50 hover:text-primary";

                        return link.href.startsWith("/") ? (
                            <Link key={link.label} href={link.href} className={className} aria-current={isActive ? "page" : undefined}>
                                {link.label}
                            </Link>
                        ) : (
                            <a key={link.label} href={link.href} className={className}>
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-sm font-semibold text-foreground">
                                
                                <Avatar>
                                    <AvatarImage
                                        src="/images/profile.jpg"
                                        alt="User Avatar"
                                        className="size-8 rounded-full"
                                    />
                                    <AvatarFallback className="size-8 rounded-full bg-muted text-xs font-bold text-foreground">
                                        HA
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden xl:block">Harry</span>
                                <ChevronDown className="size-4 hidden xl:block text-muted-foreground" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" sideOffset={12} className="w-70 rounded-2xl border border-border bg-card p-5 text-foreground shadow-2xl">
                                <div className="border-b border-border pb-4">
                                    <p className="text-sm text-muted-foreground">Signed in as</p>
                                    <p className="mt-1 font-bold">Harry Ahmed</p>
                                    <p className="text-sm text-muted-foreground">harry@studiospace.io</p>
                                </div>

                                <div className="space-y-1 border-b border-border py-1">
                                    <Link href="/studios/new" className="flex items-center gap-4 rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                                        <PlusSquare className="size-4" />
                                        Add New Studio
                                    </Link>
                                    <Link href="/my-studios" className="flex items-center gap-4 rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                                        <Layers className="size-4" />
                                        My Studio Listings
                                    </Link>
                                    <Link href="/bookings" className="flex items-center gap-4 rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                                        <CalendarDays className="size-4" />
                                        My Bookings
                                    </Link>
                                    <Link href="/wishlist" className="flex items-center gap-4 rounded-lg px-3 py-2.5 font-medium hover:bg-muted">
                                        <Heart className="size-4" />
                                        Saved Wishlist
                                    </Link>
                                </div>

                                <Link href="/logout" className="mt-2 flex items-center gap-4 rounded-lg px-3 py-2 font-medium text-rose-500 hover:bg-muted">
                                    <LogOut className="size-4" />
                                    Logout
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden items-center gap-3 sm:flex">
                            <a
                                href="/login"
                                className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                Register
                            </a>
                        </div>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden">
                            <Menu className="size-5" />
                            <span className="sr-only">Open navigation menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8} className="w-52 rounded-lg border border-border bg-background p-2 shadow-lg lg:hidden">
                            {navLinks.map((link) => (
                                link.href.startsWith("/") ? (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        aria-current={isActiveLink(link.active) ? "page" : undefined}
                                        className={`block rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted hover:text-primary ${isActiveLink(link.active) ? "bg-muted text-primary" : "text-foreground"}`}
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted hover:text-primary"
                                    >
                                        {link.label}
                                    </a>
                                )
                            ))}

                            {!isAuthenticated && (
                                <>
                                    <div className="my-2 border-t border-border" />
                                    <div className="grid grid-cols-2 gap-2 px-1 pt-1">
                                        <Link href="/login" className="rounded-md border border-border px-3 py-2 text-center text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                                            Login
                                        </Link>
                                        <Link href="/register" className="rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">
                                            Register
                                        </Link>
                                    </div>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
