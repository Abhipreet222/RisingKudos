"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { packages } from "@/content/site";
import { cn } from "@/lib/cn";

export default function PricingPreview({ full = false }: { full?: boolean }) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-teal uppercase">Pricing</p>
          <h2 className="mt-2 font-display text-4xl font-semibold">Clear packages, no countdown clocks.</h2>
        </div>
        {!full ? (
          <Link href="/pricing" className="hidden text-sm font-semibold text-coral md:inline">
            Full pricing →
          </Link>
        ) : null}
      </div>

      <Reveal className="grid gap-6 md:grid-cols-3 md:items-end" stagger={0.1}>
        {packages.map((pkg) => (
          /* Outer wrapper: handles hover lift — GSAP never touches this element */
          <div
            key={pkg.id}
            data-reveal
            className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-[1.02]"
          >
            <article
              className={cn(
                "card-radius relative flex flex-col overflow-hidden border bg-white p-7",
                /* 3:4 aspect ratio — highlighted card is taller, grows upward */
                pkg.highlight ? "min-h-[min(60vw,580px)]" : "min-h-[min(60vw,480px)]",
                pkg.highlight
                  ? "border-coral/30 shadow-[0_20px_60px_rgba(224,122,95,0.22),0_8px_24px_rgba(43,36,31,0.10)]"
                  : "border-white/80 shadow-[0_16px_48px_rgba(43,36,31,0.12),0_4px_16px_rgba(43,36,31,0.07)]",
              )}
            >
              {/* Glowing top edge — only on highlighted card */}
              {pkg.highlight && (
                <span
                  aria-hidden="true"
                  className="glow-sweep pointer-events-none absolute inset-x-0 top-0 h-px"
                />
              )}

              {/* Badge */}
              {pkg.highlight ? (
                <p className="mb-4 text-xs font-semibold tracking-wide text-coral uppercase">
                  Most families start here
                </p>
              ) : (
                <p className="mb-4 text-xs text-transparent select-none">‎</p>
              )}

              {/* Title & price */}
              <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
              <p className="mt-2 font-display text-3xl">{pkg.price}</p>
              <p className="text-sm text-ink-soft">{pkg.period}</p>

              {/* Bullet points */}
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-soft">
                {pkg.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "#e07a5f" }}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Aurora CTA button */}
              <div className="mt-8">
                <Link
                  href="/enquiry"
                  className="aurora-ring group relative flex w-full items-center justify-center overflow-hidden rounded-full p-px text-sm font-semibold text-ink transition"
                >
                  <span className="relative z-10 flex w-full items-center justify-center rounded-full bg-white px-6 py-3 transition group-hover:bg-transparent group-hover:text-white">
                    Continue with
                  </span>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </Reveal>

      <p className="mt-6 rounded-2xl border border-white/70 bg-white/35 p-4 text-sm text-ink-soft backdrop-blur-md">
        Figures are indicative placeholders until final pricing is confirmed. Refund notes will sit with the legal copy.
      </p>
    </section>
  );
}
