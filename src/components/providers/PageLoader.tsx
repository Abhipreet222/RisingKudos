"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Full-screen branded preloader.
 *
 * Fix for stuck-at-0% bug:
 * – Removed the two-step `mounted` state that caused a race condition where
 *   `page:progress` events fired before the listener was registered.
 * – Uses a rAF tick loop to smooth-interpolate a display value towards the
 *   real GIF decode progress, so there is always visible movement.
 * – Falls back to slow fake progress (up to 88%) when events are delayed.
 * – Deterministic particle positions (no Math.random in render → no SSR mismatch).
 */

const ARC_R = 54;
const ARC_CIRC = 2 * Math.PI * ARC_R;

// Deterministic particle layout so SSR and client match exactly
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: `${((i * 37 + 11) % 97).toFixed(1)}%`,
  y: `${((i * 53 + 7) % 89).toFixed(1)}%`,
  delay: `${((i * 0.31) % 3).toFixed(2)}s`,
  dur: `${(2.5 + (i * 0.41) % 3).toFixed(2)}s`,
  size: `${(2 + (i * 0.35) % 4).toFixed(1)}px`,
}));

export default function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const exitedRef = useRef(false);

  // Separate refs for real GIF progress vs smoothly displayed progress
  const realProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // ── Lock scroll immediately ────────────────────────────────────────
    document.body.style.overflow = "hidden";

    // ── Apply progress values directly to DOM (no React setState) ─────
    function applyDisplay(pct: number) {
      displayProgressRef.current = pct;
      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset = String(ARC_CIRC * (1 - pct));
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(pct * 100)}%`;
      }
    }

    // ── rAF loop — smoothly chase real progress ────────────────────────
    // If no real events arrive yet, creep up slowly to 88% max (fake progress)
    // to show the user something is happening.
    function tick() {
      const real = realProgressRef.current;
      const display = displayProgressRef.current;

      // When real progress exists, chase it; otherwise drift up slowly
      const target =
        real > 0
          ? real
          : Math.min(0.88, display + 0.0015); // ~150 frames to reach 88%

      const next = display + (target - display) * 0.06;

      if (Math.abs(next - display) > 0.0003) {
        applyDisplay(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    // ── Listen for real decode progress ───────────────────────────────
    function onProgress(e: Event) {
      realProgressRef.current = (e as CustomEvent<number>).detail;
    }

    // ── Exit: snap to 100 %, then GSAP fade out ───────────────────────
    function exit() {
      if (exitedRef.current) return;
      exitedRef.current = true;
      document.body.style.overflow = "";

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      applyDisplay(1);

      const overlay = overlayRef.current;
      if (!overlay) return;

      gsap.to(overlay, {
        delay: 0.4,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          if (overlay) overlay.style.display = "none";
        },
      });
    }

    window.addEventListener("page:progress", onProgress);
    window.addEventListener("page:ready", exit);

    // Safety net — never block the user for more than 12 s
    const fallbackTimer = setTimeout(exit, 12_000);

    // Non-home pages have no GIF — exit quickly
    const isHome = window.location.pathname === "/";
    let quickTimer: ReturnType<typeof setTimeout> | null = null;
    if (!isHome) {
      quickTimer = setTimeout(exit, 1200);
    }

    return () => {
      window.removeEventListener("page:progress", onProgress);
      window.removeEventListener("page:ready", exit);
      clearTimeout(fallbackTimer);
      if (quickTimer) clearTimeout(quickTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []); // ← single effect, registered immediately — no race condition

  return (
    <div ref={overlayRef} className="page-loader-overlay" aria-hidden="true">
      {/* Radial glow backdrop */}
      <div className="page-loader-glow" />

      {/* Floating particles — deterministic positions */}
      <div className="page-loader-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="page-loader-particle"
            style={
              {
                "--pl-x": p.x,
                "--pl-y": p.y,
                "--pl-delay": p.delay,
                "--pl-dur": p.dur,
                "--pl-size": p.size,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Centre panel */}
      <div className="page-loader-center">
        {/* Outer orbital ring */}
        <div className="page-loader-ring" />

        {/* SVG progress arc */}
        <svg
          className="page-loader-arc"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={ARC_R}
            stroke="rgba(246,239,228,0.08)"
            strokeWidth="3"
          />
          {/* Progress — starts fully offset (empty), rAF loop fills it */}
          <circle
            ref={arcRef}
            cx="60"
            cy="60"
            r={ARC_R}
            stroke="url(#arcGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ARC_CIRC}
            strokeDashoffset={ARC_CIRC}
            transform="rotate(-90 60 60)"
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e07a5f" />
              <stop offset="50%" stopColor="#e8b56a" />
              <stop offset="100%" stopColor="#3c7a6e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Brand monogram */}
        <div className="page-loader-monogram">
          <span className="page-loader-rk">RK</span>
          <div className="page-loader-shimmer" />
        </div>
      </div>

      {/* Brand name */}
      <p className="page-loader-brand">Rising Kudos</p>

      {/* Tagline */}
      <p className="page-loader-tagline">
        Where every question gets a patient answer.
      </p>

      {/* Percentage */}
      <span ref={percentRef} className="page-loader-percent">
        0%
      </span>

      {/* Bottom progress bar */}
      <div className="page-loader-bar-track">
        <div
          ref={barRef}
          className="page-loader-bar-fill"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
