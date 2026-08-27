import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-cream-deep/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/subjects" className="hover:text-coral">
            Subjects
          </Link>
          <Link href="/pricing" className="hover:text-coral">
            Pricing
          </Link>
          <Link href="/faq" className="hover:text-coral">
            FAQ
          </Link>
          <Link href="/enquiry" className="hover:text-coral">
            Book a consultation
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <Link href="/privacy" className="hover:text-ink">
            Privacy (placeholder)
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms (placeholder)
          </Link>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} {site.name}. Legal copy to be confirmed.</p>
        </div>
      </div>
    </footer>
  );
}
