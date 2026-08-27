"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/content/site";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  "/how-step-1.jpg",
  "/how-step-2.jpg",
  "/how-step-3.jpg",
  "/how-step-4.jpg",
];

export default function HowItWorks() {
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    if (prefersReducedMotion() || window.matchMedia("(max-width: 768px)").matches) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        setActive(idx);
      },
    });

    return () => {
      st.kill(true);
    };
  }, []);

  return (
    <section id="how-it-works" className="relative">
      <div ref={pin} className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 py-24 md:px-8">
        <p className="text-sm font-medium tracking-wide text-teal uppercase">How it works</p>
        <h2 className="mt-2 font-display text-4xl font-semibold">Four quiet steps.</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <article
              key={step.n}
              className={cn(
                "card-radius relative flex flex-col min-h-[320px] overflow-hidden border border-white/80 p-6 transition duration-500",
                i === active ? "scale-[1.03] shadow-[0_18px_40px_rgba(43,36,31,0.1)]" : "opacity-70",
              )}
            >
              {/* Background image — 100% opacity */}
              <Image
                src={stepImages[i]}
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />

              {/* Card content sits above inside a frosted glass box for readability */}
              <div className="relative z-10 mt-auto rounded-xl bg-white/70 p-4 shadow-sm backdrop-blur-sm">
                <p className="font-display text-sm font-bold text-coral">{step.n}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs leading-5 text-ink">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
