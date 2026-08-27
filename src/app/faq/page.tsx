import type { Metadata } from "next";
import FaqAccordion from "@/components/faq/FaqAccordion";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about matching, sessions, 11+/GCSE preparation, billing and tutor changes.",
};

export default function FaqPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-8">
        <h1 className="font-display text-5xl font-semibold">Parent FAQ</h1>
        <p className="mt-4 text-ink-soft">One question open at a time, so the page stays easy to scan.</p>
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>
      <FinalCta />
    </div>
  );
}
