"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { subjects } from "@/content/site";

// Accent colour map – matches the CSS variables in globals.css
const accentBg: Record<string, string> = {
  english: "bg-english",
  maths:   "bg-maths",
  science: "bg-science",
  eleven:  "bg-eleven",
  gcse:    "bg-gcse",
};

const accentGlow: Record<string, string> = {
  english: "rgba(200,185,245,0.75)",
  maths:   "rgba(180,215,255,0.75)",
  science: "rgba(185,235,215,0.75)",
  eleven:  "rgba(250,215,145,0.75)",
  gcse:    "rgba(205,190,250,0.75)",
};

const CARD_W = 285;
const CARD_H = 380; // exactly 3:4 to match 1086 x 1448 images

/** Wraps index within [min, max) — replaces popmotion's wrap */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SubjectCarousel({ preview = false }: { preview?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);

  // Auto-advance every 3 s
  useEffect(() => {
    const t = setInterval(() => {
      setPage(p => p + 1);
      setDirection(1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const activeIndex = wrap(0, subjects.length, page);

  const variants = useMemo(() => ({
    center: {
      x: "-50%", scale: 1, rotate: 0, opacity: 1, zIndex: 3,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 280, damping: 28, duration: 0.25 },
    },
    left: {
      x: "-145%", scale: 0.88, rotate: -10, opacity: 0.75, zIndex: 2,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 280, damping: 28, duration: 0.25 },
    },
    right: {
      x: "45%", scale: 0.88, rotate: 10, opacity: 0.75, zIndex: 2,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 280, damping: 28, duration: 0.25 },
    },
    hidden: {
      opacity: 0, zIndex: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
  }), [shouldReduceMotion]);

  const visible = [-1, 0, 1].map(offset =>
    subjects[wrap(0, subjects.length, activeIndex + offset)]
  );

  const goTo = (dir: number) => {
    setDirection(dir);
    setPage(p => p + dir);
  };

  return (
    <section id="subjects" className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-16">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium tracking-wide text-teal uppercase">Subjects we support</p>
          <h2 className="mt-2 font-display text-4xl font-semibold">A palette for every learner.</h2>
        </div>
      </div>

      {/* Carousel stage */}
      <div className="relative mx-auto" style={{ height: CARD_H + 48, maxWidth: 720 }}>
        <AnimatePresence custom={direction} initial={false}>
          {visible.map((subject, i) => {
            const variant = i === 1 ? "center" : i === 0 ? "left" : "right";
            return (
              <motion.div
                key={subject.slug}
                custom={direction}
                variants={variants}
                initial="hidden"
                animate={variant}
                exit="hidden"
                onClick={() => {
                  if (i === 0) goTo(-1);
                  if (i === 2) goTo(1);
                }}
                className={`absolute top-0 left-1/2 origin-bottom -translate-y-0 ${
                  i !== 1 ? "cursor-pointer" : ""
                }`}
                style={{ width: CARD_W, height: CARD_H }}
              >
                <div
                  className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_20px_60px_rgba(43,36,31,0.13)] select-none transition-shadow duration-300 ${accentBg[subject.accent]}`}
                  style={{
                    boxShadow: i === 1
                      ? `0 24px 64px ${accentGlow[subject.accent]}, 0 8px 24px rgba(43,36,31,0.10)`
                      : undefined,
                  }}
                >
                  <Image
                    src={subject.image}
                    alt={`${subject.name} - ${subject.blurb}`}
                    fill
                    sizes="(max-width: 768px) 285px, 285px"
                    className="object-cover pointer-events-none"
                    priority={i === 1}
                    draggable={false}
                  />
                  <div className="sr-only">
                    <h3>{subject.name}</h3>
                    <p>{subject.blurb}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Prev / Next buttons */}
        <button
          onClick={() => goTo(-1)}
          aria-label="Previous subject"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/70 p-2.5 shadow backdrop-blur-sm transition hover:bg-white active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(1)}
          aria-label="Next subject"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/70 p-2.5 shadow backdrop-blur-sm transition hover:bg-white active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center gap-2">
          {subjects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > activeIndex ? 1 : -1); setPage(i); }}
              aria-label={`Go to subject ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-5 bg-coral" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
