"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeDSlider, {
  SliderItemData,
  ThreeDSliderHandle,
} from "@/components/ui/ThreeDSlider";
import { InteractiveGridPattern } from "@/components/ui/InteractiveGridPattern";

gsap.registerPlugin(ScrollTrigger);

const WHY_ITEMS: SliderItemData[] = [
  {
    num: "01",
    title: "Expert, Vetted Tutors",
    imageUrl: "/carousal cards/why1.png",
  },
  {
    num: "02",
    title: "Personalised Learning Plans",
    imageUrl: "/carousal cards/why2.png",
  },
  {
    num: "03",
    title: "Real Progress, Real Fast",
    imageUrl: "/carousal cards/why3.png",
  },
  {
    num: "04",
    title: "Flexible Scheduling",
    imageUrl: "/carousal cards/why4.png",
  },
  {
    num: "05",
    title: "Confidence That Lasts",
    imageUrl: "/carousal cards/why5.png",
  },
  {
    num: "06",
    title: "Parents Always in the Loop",
    imageUrl: "/carousal cards/why6.png",
  },
  {
    num: "07",
    title: "No Pressure, Just Progress",
    imageUrl: "/carousal cards/why7.png",
  },
];

// One viewport height of scroll per card transition feels natural
const SCROLL_PER_CARD = 100; // vh units
const TOTAL_SCROLL = `+=${(WHY_ITEMS.length - 1) * SCROLL_PER_CARD}vh`;

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<ThreeDSliderHandle>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    if (!section || !pinEl) return;

    const st = ScrollTrigger.create({
      trigger: section,
      pin: pinEl,
      start: "top top",
      // Pin for 6 × 100vh so each of the 6 card transitions gets one full viewport of scroll
      end: TOTAL_SCROLL,
      scrub: 1.2,           // slight lag for a silky feel
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map 0→1 scroll progress to 0→100 slider progress
        sliderRef.current?.setTargetProgress(self.progress * 100);
      },
    });

    return () => {
      st.kill(true);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="relative overflow-hidden bg-cream"
    >
      <div ref={pinRef} className="relative py-20 md:py-28">
      {/* Subtle warm radial wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(224,122,95,0.06)_0%,transparent_70%)]"
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-sm font-medium tracking-wide text-teal uppercase">
            Our Difference
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-ink">
            Why Choose RisingKudos
          </h2>
          <p className="mt-3 leading-7 text-ink-soft">
            Scroll through to explore what makes us different — every card is a
            promise built around your child, not the exam hall.
          </p>
        </div>

        {/* Slider panel */}
        <div className="panel relative border border-white/80 bg-white/60 shadow-[0_16px_48px_rgba(43,36,31,0.08)] backdrop-blur-xl overflow-hidden">
          {/* Interactive grid behind the cards */}
          <InteractiveGridPattern
            width={44}
            height={44}
            squares={[30, 16]}
            className="border-0 opacity-80"
          />
          {/* Slider sits above the grid */}
          <div className="relative z-10">
            <ThreeDSlider
              ref={sliderRef}
              items={WHY_ITEMS}
              startProgress={0}
              disableWheel={true}
              speedDrag={-0.18}
              className="rounded-none bg-transparent"
            />
          </div>
        </div>

        {/* Scroll-hint strip */}
        <p className="mt-4 text-center text-xs text-ink-soft select-none">
          ↓ Scroll to explore all {WHY_ITEMS.length} reasons
        </p>
      </div>
      </div>
    </section>
  );
}
