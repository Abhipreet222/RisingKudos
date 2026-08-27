import AuroraButton from "@/components/ui/AuroraButton";
import { ThreeDMarquee } from "@/components/ui/ThreeDMarquee";

const marqueeImages = [
  { src: "/backrground effect images/1.avif", alt: "Abstract 3D design 1" },
  { src: "/backrground effect images/2.avif", alt: "Abstract 3D design 2" },
  { src: "/backrground effect images/3.avif", alt: "Abstract 3D design 3" },
  { src: "/backrground effect images/4.avif", alt: "Abstract 3D design 4" },
  { src: "/backrground effect images/5.avif", alt: "Abstract 3D design 5" },
  { src: "/backrground effect images/6.jpg", alt: "Abstract 3D design 6" },
];

export default function TutorPromise() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center bg-[#fdfaf6]">
      {/* 3D Background Marquee */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ThreeDMarquee images={marqueeImages} cols={4} />
      </div>
      
      {/* White radial gradient overlay to fade the edges of the marquee into the background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fdfaf6_70%)]" />

      {/* Foreground Panel */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:px-8 w-full">
        <div className="panel border border-white/80 bg-white/70 p-8 shadow-[0_16px_40px_rgba(43,36,31,0.06)] backdrop-blur-xl md:p-12">
          <div className="flex items-start gap-4">
            <span className="handshake mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-maths text-2xl" aria-hidden>
              🤝
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold">The tutor-change promise</h2>
              <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
                Chemistry matters. If a pairing does not feel right — for your child or for you — tell us. We rematch
                without a fee and without making it awkward. The goal is a relationship that feels safe and useful.
              </p>
              <div className="mt-6">
                <AuroraButton href="/enquiry">Talk to us</AuroraButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
