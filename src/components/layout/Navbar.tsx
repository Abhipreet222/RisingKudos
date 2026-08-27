"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/cn";
import AuroraButton from "@/components/ui/AuroraButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-4 transition-all duration-[400ms] ease-out",
          scrolled
            ? "mt-3 w-[min(1080px,calc(100%-2rem))] rounded-full border border-white/50 bg-white/55 px-4 py-2 shadow-[0_10px_40px_rgba(43,36,31,0.08)] backdrop-blur-xl md:px-6"
            : "mt-0 w-full max-w-7xl px-5 py-5 md:px-8",
        )}
      >
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            className={cn(
              "grid place-items-center rounded-full bg-coral text-white transition-all duration-[400ms]",
              scrolled ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
            )}
          >
            RK
          </span>
          <span
            className={cn(
              "font-display font-semibold tracking-tight text-ink transition-all duration-[400ms]",
              scrolled ? "text-base" : "text-lg",
            )}
          >
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-ink-soft transition-all hover:text-ink",
                scrolled ? "text-sm" : "text-[15px]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AuroraButton href="/get-started" aurora={scrolled} className="hidden sm:inline-flex">
            Get Started
          </AuroraButton>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/70 md:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={cn("h-0.5 w-4 bg-ink transition", open && "translate-y-2 rotate-45")} />
              <span className={cn("h-0.5 w-4 bg-ink transition", open && "opacity-0")} />
              <span className={cn("h-0.5 w-4 bg-ink transition", open && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="pointer-events-auto absolute top-20 right-4 left-4 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-3 py-2 text-ink hover:bg-cream-deep"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <AuroraButton href="/get-started" aurora onClick={() => setOpen(false)}>
              Get Started
            </AuroraButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
