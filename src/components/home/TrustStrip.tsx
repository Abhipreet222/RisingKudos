"use client";

import Reveal from "@/components/ui/Reveal";
import { trustItems } from "@/content/site";
import AnimatedParticles from "@/components/ui/AnimatedParticles";

export default function TrustStrip() {
  return (
    <section className="relative z-10 -mt-8 px-6 md:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <AnimatedParticles 
          className="rounded-[28px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(43,36,31,0.06)]"
          particleCount={15000} // Reduce for a smaller component
          particleSize={2.0}
          backgroundColor="#ffffff"
        >
          <div className="relative z-10 grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.label} data-reveal className="rounded-2xl px-4 py-3 text-center bg-white/50 backdrop-blur-sm">
                <p className="font-display text-xl font-semibold text-ink">{item.value}</p>
                <p className="text-xs tracking-wide text-ink-soft uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </AnimatedParticles>
      </Reveal>
    </section>
  );
}
