import Link from "next/link";
import { site } from "@/content/site";
import { EmeraldHorizonBackground } from "@/shaders/emerald-horizon/EmeraldHorizonBackground";
import "@/shaders/threeui.css";

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 relative overflow-hidden bg-cream-deep/50 rounded-t-[60px]">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <EmeraldHorizonBackground
          speed={1.00}
          waveScale={1.00}
          variation={1.00}
          hue={0}
          glow={1.00}
          vignette={1.00}
        />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-8 relative z-10">
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
