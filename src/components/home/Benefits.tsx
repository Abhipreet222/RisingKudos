"use client";

import Reveal from "@/components/ui/Reveal";
import { benefits } from "@/content/site";
import { cn } from "@/lib/cn";
import Image from "next/image";

export default function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
      <div className="mb-10 max-w-xl">
        <p className="text-sm font-medium tracking-wide text-teal uppercase">Why families choose us</p>
        <h2 className="mt-2 font-display text-4xl font-semibold">Room to grow, without the noise.</h2>
      </div>
      <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {benefits.map((item) => (
          <article
            key={item.title}
            data-reveal
            className={cn(
              "card-radius group relative overflow-hidden bg-white shadow-[0_10px_30px_rgba(43,36,31,0.05)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(43,36,31,0.1)] flex flex-col",
              item.span,
            )}
          >
            <div className="relative w-full flex-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rounded-b-[24px]">
              {item.image && (
                <>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                </>
              )}
            </div>
            
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-ink-soft">{item.body}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
