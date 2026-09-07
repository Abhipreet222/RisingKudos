"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * Full-screen branded preloader — matches the Rising Kudos design:
 *  • Cream background (matches site)
 *  • Rising Kudos SVG logo (sun rays + plant/leaf mark)
 *  • "RISING KUDOS" bold uppercase heading
 *  • "PREPARING YOUR EXPERIENCE" subtitle
 *  • Horizontal progress bar (coral fill, cream track)
 *  • Accurate percentage counter driven by GIF decode progress
 *
 * Progress is driven by `page:progress` CustomEvent (detail: 0–1) dispatched
 * by ScrollGifBackground as each frame is decoded. A rAF interpolation loop
 * ensures smooth, always-moving visuals even before first event arrives.
 * Loader exits on `page:ready` (or after 12 s fallback).
 */

const ARC_CIRC = 2 * Math.PI * 54;

export default function PageLoader() {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const barFillRef   = useRef<HTMLDivElement>(null);
  const percentRef   = useRef<HTMLSpanElement>(null);
  const exitedRef    = useRef(false);
  const realPctRef   = useRef(0);   // actual GIF decode progress 0-1
  const displayRef   = useRef(0);   // smoothly interpolated display value
  const rafRef       = useRef<number | null>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    /** Write display progress to DOM elements directly (no React re-render) */
    function applyDisplay(v: number) {
      displayRef.current = v;
      if (barFillRef.current) {
        barFillRef.current.style.width = `${(v * 100).toFixed(1)}%`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(v * 100)}%`;
      }
    }

    /** rAF loop: smoothly chase real progress; drift up slowly when events
     *  haven't arrived yet (fake progress caps at 88 %) */
    function tick() {
      const real    = realPctRef.current;
      const display = displayRef.current;
      // Target: if we have real signal, chase it; else drift toward 88%
      const target  = real > 0 ? real : Math.min(0.88, display + 0.0012);
      const next    = display + (target - display) * 0.055;

      if (Math.abs(next - display) > 0.0002) {
        applyDisplay(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    /** Called by ScrollGifBackground on every decoded frame */
    function onProgress(e: Event) {
      realPctRef.current = (e as CustomEvent<number>).detail;
    }

    function exit() {
      if (exitedRef.current) return;
      exitedRef.current = true;
      document.body.style.overflow = "";

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      applyDisplay(1); // snap to 100% visually

      const overlay = overlayRef.current;
      if (!overlay) return;

      gsap.to(overlay, {
        delay: 0.45,
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          if (overlay) overlay.style.display = "none";
        },
      });
    }

    // Minimum time the loader must stay visible (so it's always seen)
    const MIN_MS = 2000;
    const mountedAt = Date.now();
    let readyPending = false;

    function exitWhenReady() {
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(exit, remaining);
    }

    function onReady() {
      if (readyPending) return;
      readyPending = true;
      exitWhenReady();
    }

    window.addEventListener("page:progress", onProgress);
    window.addEventListener("page:ready", onReady);

    // Hard fallback — never trap user for more than 12 s
    const fallback = setTimeout(exit, 12_000);

    // Non-home pages have no GIF → exit quickly
    const isHome = window.location.pathname === "/";
    let quick: ReturnType<typeof setTimeout> | null = null;
    if (!isHome) quick = setTimeout(exit, 1200);

    return () => {
      window.removeEventListener("page:progress", onProgress);
      window.removeEventListener("page:ready", onReady);
      clearTimeout(fallback);
      if (quick) clearTimeout(quick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6efe4",
        willChange: "opacity",
      }}
    >
      {/* ── Rising Kudos Logo ── */}
      <Image
        src="/logo.png"
        alt="Rising Kudos logo"
        width={110}
        height={110}
        priority
        style={{ marginTop: "48px", marginBottom: "24px", objectFit: "contain" }}
      />

      {/* ── Brand Name ── */}
      <p
        style={{
          fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#2b241f",
          marginBottom: "6px",
          lineHeight: 1,
        }}
      >
        Rising Kudos
      </p>

      {/* ── Subtitle ── */}
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#5d534b",
          marginBottom: "28px",
        }}
      >
        Preparing your experience
      </p>

      {/* ── Progress bar track ── */}
      <div
        style={{
          width: "240px",
          height: "6px",
          borderRadius: "999px",
          background: "#ddd5c8",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        {/* Fill — width driven by rAF loop via barFillRef */}
        <div
          ref={barFillRef}
          style={{
            height: "100%",
            width: "0%",
            borderRadius: "999px",
            background: "#c45d43",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* ── Percentage ── */}
      <span
        ref={percentRef}
        style={{
          fontSize: "0.78rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: "#5d534b",
        }}
      >
        0%
      </span>
    </div>
  );
}
