import type { Metadata } from "next";
import Link from "next/link";
import GetStartedForm from "@/components/get-started/GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Begin your journey with Rising Kudos. Tell us about your child and we'll match them with the right tutor for a calm, confident start.",
};

const trustPoints = [
  {
    icon: (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "100% Free Consultation",
    desc: "No upfront fees or commitments. We start with a friendly, unhurried chat.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Carefully Matched Tutors",
    desc: "Matched for both subject mastery and emotional temperament.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Zero-Risk Rematch",
    desc: "If the chemistry isn't right after your first session, we rematch free of charge.",
  },
];

export default function GetStartedPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Breadcrumb / Tag */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-teal uppercase">
          <Link href="/" className="transition hover:text-teal/70">Home</Link>
          <span>/</span>
          <span className="text-ink-soft">Get Started</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-4xl font-semibold leading-[1.12] text-ink sm:text-5xl">
              Let&apos;s build your child&apos;s confidence.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Take two minutes to share where your child is today and where you&apos;d like them to grow. We&apos;ll handpick the best tutor and arrange your free consultation.
            </p>

            {/* How it works mini timeline */}
            <div className="mt-10 rounded-3xl border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-md">
              <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">What happens next</h2>
              <div className="mt-4 space-y-4 text-sm text-ink-soft">
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream-deep font-display font-semibold text-ink text-xs">
                    1
                  </span>
                  <p>
                    <strong className="text-ink">Quick Review:</strong> Our academic team reviews your notes within 24 hours.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream-deep font-display font-semibold text-ink text-xs">
                    2
                  </span>
                  <p>
                    <strong className="text-ink">Tutor Introduction:</strong> We propose a tutor who matches your child&apos;s pace and learning style.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream-deep font-display font-semibold text-ink text-xs">
                    3
                  </span>
                  <p>
                    <strong className="text-ink">Free Consultation:</strong> A relaxed video chat to confirm it feels right before booking anything.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="mt-8 space-y-4">
              {trustPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-black/5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="text-xs text-ink-soft mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote / Assurance note */}
            <div className="mt-8 rounded-2xl border-l-4 border-teal bg-teal/5 p-4 text-sm text-ink-soft">
              <p className="italic">
                &ldquo;We don&apos;t believe in pressure or high-stakes entrance interviews. Learning happens best when children feel safe and understood.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Multi-step interactive wizard card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] border border-white/80 bg-white/85 p-6 shadow-[0_20px_60px_rgba(43,36,31,0.08)] backdrop-blur-xl md:p-10">
              <div className="mb-6 border-b border-ink/5 pb-5">
                <p className="text-xs font-semibold tracking-wider text-coral uppercase">Step-by-Step Onboarding</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Find the perfect match</h2>
              </div>
              <GetStartedForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
