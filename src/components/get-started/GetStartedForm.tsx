"use client";

import { FormEvent, useState } from "react";
import { subjects } from "@/content/site";
import { cn } from "@/lib/cn";

/* ── Step definitions ─────────────────────────────────────────────────── */
const STEPS = ["About your child", "Learning goals", "Your details"] as const;
type Step = 0 | 1 | 2;

const yearGroups = [
  "Year 3", "Year 4", "Year 5", "Year 6",
  "Year 7", "Year 8", "Year 9",
  "Year 10 (GCSE)", "Year 11 (GCSE)",
];

const frequencies = ["Once a week", "Twice a week", "Flexible / not sure"];

const initial = {
  childName: "",
  yearGroup: "",
  subjects: [] as string[],
  goals: "",
  frequency: "",
  parentName: "",
  email: "",
  phone: "",
  consent: false,
};

type FormValues = typeof initial;

/* ── Tiny shared field wrapper ────────────────────────────────────────── */
function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <div
        className={cn(
          "mt-1.5 [&_.field]:w-full [&_.field]:rounded-2xl [&_.field]:border [&_.field]:bg-cream/40 [&_.field]:px-4 [&_.field]:py-3 [&_.field]:outline-none [&_.field]:transition [&_.field]:text-ink",
          error
            ? "[&_.field]:border-coral"
            : "[&_.field]:border-ink/10 [&_.field]:focus-within:border-teal [&_.field]:focus-within:shadow-[0_0_0_4px_rgba(60,122,110,0.15)]",
        )}
      >
        {children}
      </div>
    </label>
  );
}

/* ── Step 1 — About your child ───────────────────────────────────────── */
function StepChild({
  values,
  errors,
  onChange,
}: {
  values: FormValues;
  errors: string[];
  onChange: (patch: Partial<FormValues>) => void;
}) {
  function toggleSubject(slug: string) {
    const next = values.subjects.includes(slug)
      ? values.subjects.filter((s) => s !== slug)
      : [...values.subjects, slug];
    onChange({ subjects: next });
  }

  return (
    <div className="space-y-6">
      <Field label="Child's first name" error={errors.includes("childName")}>
        <input
          className="field"
          placeholder="e.g. Amara"
          value={values.childName}
          onChange={(e) => onChange({ childName: e.target.value })}
          autoComplete="given-name"
        />
      </Field>

      <Field label="Year group" error={errors.includes("yearGroup")}>
        <select
          className="field"
          value={values.yearGroup}
          onChange={(e) => onChange({ yearGroup: e.target.value })}
        >
          <option value="">Select year group</option>
          {yearGroups.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend
          className={cn(
            "mb-3 text-sm font-medium",
            errors.includes("subjects") ? "text-coral-deep" : "text-ink",
          )}
        >
          Subjects you&apos;re interested in
          <span className="ml-1 text-ink-soft">(select all that apply)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => {
            const selected = values.subjects.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggleSubject(s.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition duration-200",
                  selected
                    ? "border-teal bg-teal text-white shadow-[0_4px_12px_rgba(60,122,110,0.25)]"
                    : "border-ink/10 bg-white/60 text-ink hover:border-teal/40 hover:bg-teal/5",
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

/* ── Step 2 — Learning goals ─────────────────────────────────────────── */
function StepGoals({
  values,
  errors,
  onChange,
}: {
  values: FormValues;
  errors: string[];
  onChange: (patch: Partial<FormValues>) => void;
}) {
  return (
    <div className="space-y-6">
      <Field label="What are you hoping to achieve?" error={errors.includes("goals")}>
        <textarea
          className="field min-h-32 resize-none"
          placeholder="E.g. build confidence in fractions, prepare calmly for the 11+, improve essay writing…"
          value={values.goals}
          onChange={(e) => onChange({ goals: e.target.value })}
        />
      </Field>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">
          How often would you like sessions?
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {frequencies.map((f) => {
            const active = values.frequency === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onChange({ frequency: f })}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-sm font-medium text-left transition duration-200",
                  active
                    ? "border-teal bg-teal text-white shadow-[0_4px_12px_rgba(60,122,110,0.25)]"
                    : "border-ink/10 bg-white/60 text-ink hover:border-teal/40 hover:bg-teal/5",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

/* ── Step 3 — Parent details ─────────────────────────────────────────── */
function StepParent({
  values,
  errors,
  onChange,
}: {
  values: FormValues;
  errors: string[];
  onChange: (patch: Partial<FormValues>) => void;
}) {
  return (
    <div className="space-y-5">
      <Field label="Your name" error={errors.includes("parentName")}>
        <input
          className="field"
          placeholder="e.g. Sarah"
          value={values.parentName}
          onChange={(e) => onChange({ parentName: e.target.value })}
          autoComplete="name"
        />
      </Field>

      <Field label="Email address" error={errors.includes("email")}>
        <input
          className="field"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => onChange({ email: e.target.value })}
          autoComplete="email"
        />
      </Field>

      <Field label="Phone number" error={errors.includes("phone")}>
        <input
          className="field"
          type="tel"
          placeholder="07700 900000"
          value={values.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          autoComplete="tel"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded accent-teal"
          checked={values.consent}
          onChange={(e) => onChange({ consent: e.target.checked })}
        />
        <span className={errors.includes("consent") ? "text-coral-deep" : undefined}>
          I&apos;m happy to be contacted about tutoring for my child.{" "}
          <span className="text-ink-soft/60">(Replace with legal wording before going live.)</span>
        </span>
      </label>
    </div>
  );
}

/* ── Success screen ──────────────────────────────────────────────────── */
function SuccessScreen({ childName }: { childName: string }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-teal/10 animate-ping" style={{ animationDuration: "2s" }} />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-teal">
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
            <path
              d="M8 16.5 13.5 22 24 10"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 28,
                strokeDashoffset: 28,
                animation: "check-draw 0.6s 0.2s ease forwards",
              }}
            />
          </svg>
        </span>
      </div>

      <h2 className="mt-6 font-display text-3xl font-semibold text-ink">
        {childName ? `Great — we have ${childName}'s details!` : "We have your details!"}
      </h2>
      <p className="mt-3 max-w-sm text-ink-soft leading-7">
        A member of our team will reach out within one working day to arrange a free, unhurried consultation.
      </p>
      <p className="mt-2 text-xs text-ink-soft/60">
        (Placeholder — connect a real form endpoint before going live.)
      </p>
    </div>
  );
}

/* ── Main wizard component ───────────────────────────────────────────── */
export default function GetStartedForm() {
  const [step, setStep] = useState<Step>(0);
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function patch(update: Partial<FormValues>) {
    setValues((prev) => ({ ...prev, ...update }));
    const keys = Object.keys(update);
    setErrors((prev) => prev.filter((e) => !keys.includes(e)));
  }

  function triggerShake(nextErrors: string[]) {
    setErrors(nextErrors);
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  }

  function validateStep(s: Step): string[] {
    if (s === 0) {
      const errs: string[] = [];
      if (!values.childName.trim()) errs.push("childName");
      if (!values.yearGroup) errs.push("yearGroup");
      if (values.subjects.length === 0) errs.push("subjects");
      return errs;
    }
    if (s === 1) {
      const errs: string[] = [];
      if (!values.goals.trim()) errs.push("goals");
      return errs;
    }
    if (s === 2) {
      const errs: string[] = [];
      if (!values.parentName.trim()) errs.push("parentName");
      if (!values.email.includes("@")) errs.push("email");
      if (!values.phone.trim()) errs.push("phone");
      if (!values.consent) errs.push("consent");
      return errs;
    }
    return [];
  }

  function next() {
    const errs = validateStep(step);
    if (errs.length) { triggerShake(errs); return; }
    setErrors([]);
    setStep((s) => (s + 1) as Step);
  }

  function back() {
    setErrors([]);
    setStep((s) => (s - 1) as Step);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateStep(2);
    if (errs.length) { triggerShake(errs); return; }
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen childName={values.childName} />;

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-8", shake && "shake")}
      noValidate
    >
      {/* ── Step indicator ── */}
      <div className="flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                  i < step
                    ? "bg-teal text-white"
                    : i === step
                      ? "ring-2 ring-teal ring-offset-2 bg-white text-teal"
                      : "bg-ink/10 text-ink-soft",
                )}
              >
                {i < step ? (
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                    <path d="M3 8 6.5 11.5 13 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "mt-1.5 hidden text-[10px] font-medium tracking-wide sm:block whitespace-nowrap",
                  i === step ? "text-teal" : "text-ink-soft",
                )}
              >
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="relative mx-2 flex-1 h-px bg-ink/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-teal transition-all duration-500"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Step content ── */}
      <div className="min-h-[280px]">
        {step === 0 && <StepChild values={values} errors={errors} onChange={patch} />}
        {step === 1 && <StepGoals values={values} errors={errors} onChange={patch} />}
        {step === 2 && <StepParent values={values} errors={errors} onChange={patch} />}
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between gap-4 pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-cream-deep"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center rounded-full bg-coral px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(224,122,95,0.28)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(224,122,95,0.38)] active:scale-[0.98]"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(60,122,110,0.28)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_28px_rgba(60,122,110,0.38)] active:scale-[0.98]"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M2 8h12M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Send my details
          </button>
        )}
      </div>
    </form>
  );
}
