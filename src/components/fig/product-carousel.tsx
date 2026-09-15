"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { N, T } from "./canvas";
import { AccentBar, ArrowRight } from "./ornaments";

const ORANGE = "#F58220";
const INK = "#0F0F0F";

export type HomeProduct = {
  title: string;
  body: string;
  bullets: string[];
  /** the product's own photo, e.g. "/images/financing-forklift.png" */
  image: string;
  /** e.g. "/products/working-capital" */
  href: string;
};

/**
 * The product carousel: a 976x600 main panel flanked by two 128x600 slivers,
 * all r32, each veiled with the same top-to-bottom gradient
 * (#00100C -> #999792, rotated 90deg per the paint transform).
 *
 * This used to be static — one hardcoded product, three decorative pager
 * buttons that did nothing, and slide-shaped assets (`/fig2/product-*.webp`)
 * that had no relationship to the actual products list. Now it cycles
 * through the real `products` array: the two orange edge buttons are prev/
 * next controls (matching the `prevSlide`/`nextSlide` i18n keys that were
 * already sitting unused in the message files), the white inner button
 * opens the active product's own page, and the two slivers preview the
 * neighbouring slides rather than a random unrelated crop.
 */
export function ProductCarousel({
  products,
  labelPrev,
  labelNext,
}: {
  products: HomeProduct[];
  labelPrev: string;
  labelNext: string;
}) {
  const count = products.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Auto-advance, held while the pointer or keyboard focus is in the panel.
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused || count < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    timer.current = setInterval(() => go(index + 1), 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, paused, go, count]);

  if (count === 0) return null;

  const active = products[index];
  const prev = products[(index - 1 + count) % count];
  const next = products[(index + 1) % count];

  /*
   * fig "Rectangle 103/104": GRADIENT_LINEAR #00100C@1.0 -> #999792@0.0 with
   * transform m01=-1, m10=1 — a 90 degree rotation, so it runs bottom to top:
   * solid at the foot of the sliver, fully clear at the head. Stated as a
   * 3-stop ramp so the photo is untouched across the top third instead of
   * being dimmed the whole way up.
   */
  const sliverVeil =
    "linear-gradient(0deg, rgb(0,16,12) 0%, rgba(0,16,12,0.55) 45%, rgba(153,151,146,0) 100%)";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* left sliver — previews the previous slide */}
      <N x={80} y={1913} w={128} h={600} r={32} style={{ overflow: "hidden" }}>
        <Image
          src={prev.image}
          alt=""
          fill
          sizes="128px"
          style={{ objectFit: "cover", objectPosition: "right" }}
        />
      </N>
      <N x={80} y={1913} w={128} h={600} r={32} style={{ background: sliverVeil }} />

      {/* right sliver — previews the next slide */}
      <N x={1232} y={1913} w={128} h={600} r={32} style={{ overflow: "hidden" }}>
        <Image
          src={next.image}
          alt=""
          fill
          sizes="128px"
          style={{ objectFit: "cover", objectPosition: "left" }}
        />
      </N>
      <N x={1232} y={1913} w={128} h={600} r={32} style={{ background: sliverVeil }} />

      {/* main panel — every slide stacked, active one on top */}
      <N x={232} y={1913} w={976} h={600} r={32} style={{ overflow: "hidden" }}>
        {products.map((p, i) => (
          <div
            key={p.href}
            aria-hidden={i !== index}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === index ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <Image
              src={p.image}
              alt=""
              fill
              sizes="976px"
              priority={i === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </N>

      {/*
       * The scrim over the main panel is NOT a full rectangle — it is a
       * notched outline that bites a 96px corner out of the bottom right so
       * the white pager button sits in clear space. Gradient runs top
       * (clear) to bottom (#00100C).
       */}
      <svg
        width={976}
        height={600}
        viewBox="0 0 976 600"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 232,
          top: 1913,
          width: 976,
          height: 600,
          borderRadius: 32,
        }}
      >
        <defs>
          <linearGradient id="rif-card-scrim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(52,52,52)" stopOpacity="0" />
            <stop offset="1" stopColor="rgb(0,16,12)" />
          </linearGradient>
        </defs>
        <path
          d="M 976 488 C 976 505.673 961.673 520 944 520 L 928 520 C 910.327 520 896 534.327 896 552 L 896 568 C 896 585.673 881.673 600 864 600 L 32 600 C 14.327 600 0 585.673 0 568 L 0 32 C 0 14.327 14.327 0 32 0 L 944 0 C 961.673 0 976 14.327 976 32 L 976 488 Z"
          fill="url(#rif-card-scrim)"
          fillRule="nonzero"
        />
      </svg>

      {/* copy sits above the panel, keyed so it fades/re-mounts per slide */}
      <div key={active.href} style={{ animation: "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <T x={264} y={2173} w={319} h={38} size={32} lh={1} weight={700} color="#FFFFFF" as="h3">
          {active.title}
        </T>
        <AccentBar x={264} y={2223} />
        <T x={264} y={2255} w={912} h={58} size={24} lh={1} color="#FFFFFF" as="p">
          {active.body}
        </T>

        {/* Frame 26871 — bullets, 4 rows of 30 with an 8px gap */}
        {active.bullets.slice(0, 4).map((b, i) => (
          <N key={b} x={264} y={2337 + i * 38} w={287} h={30}>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 4,
                width: 22,
                height: 22,
                display: "inline-flex",
              }}
            >
              <BulletBadge />
            </span>
            <span
              style={{
                position: "absolute",
                left: 34,
                top: 0,
                fontSize: 20,
                lineHeight: 1.5,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {b}
            </span>
          </N>
        ))}
      </div>

      {/* pagers — 64x64 r100, orange prev/next at the edges, white "open" inside the panel */}
      <button
        type="button"
        aria-label={labelPrev}
        onClick={() => go(index - 1)}
        style={{
          position: "absolute",
          left: 112,
          top: 2417,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: ORANGE,
          border: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: "scaleX(-1)",
        }}
      >
        <ArrowRight size={24} color="#FFFFFF" />
      </button>
      <button
        type="button"
        aria-label={labelNext}
        onClick={() => go(index + 1)}
        style={{
          position: "absolute",
          left: 1264,
          top: 2417,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: ORANGE,
          border: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ArrowRight size={24} color="#FFFFFF" />
      </button>
      <Link
        href={active.href}
        aria-label={active.title}
        style={{
          position: "absolute",
          left: 1144,
          top: 2449,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowRight size={24} color={INK} />
      </Link>

      {/* Progress dots — not in the fig, but a carousel needs a position cue */}
      <div
        style={{
          position: "absolute",
          left: 232,
          top: 2529,
          width: 976,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {products.map((p, i) => (
          <button
            key={p.href}
            type="button"
            onClick={() => go(i)}
            aria-label={p.title}
            aria-current={i === index}
            style={{
              height: 8,
              width: i === index ? 32 : 8,
              borderRadius: 999,
              border: 0,
              padding: 0,
              cursor: "pointer",
              background: i === index ? ORANGE : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The bullet icon in front of each highlight ("Alat Berat", etc.) — a medal
 * with a ribbon tail, not the hexagon/shield this used to draw.
 *
 * Both paths below are copied verbatim, unmodified, from the resolved fig
 * export at docs/dari_claude_design/project/components/HomePage.jsx (the
 * two <svg> nodes immediately preceding the "Alat Berat" label) — not
 * redrawn or approximated. Rendering them standalone before wiring this in
 * confirmed the shape: an 11x11 ring positioned at (5.5, 1.833) is the medal
 * face, and the 9.164x8.35 path at (6.419, 11.816) is its ribbon tail,
 * together forming a circular award/certified-equipment badge inside the
 * 22x22 box — not the hexagon/shield an earlier version hand-drew instead.
 */
function BulletBadge() {
  return (
    <div style={{ position: "relative", width: 22, height: 22, overflow: "hidden" }}>
      <svg
        width={9.164}
        height={8.35}
        viewBox="0 0 9.164 8.350"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 6.419,
          top: 11.816,
          width: 9.164,
          height: 8.35,
          color: "#FFFFFF",
        }}
      >
        <path
          d="M 8.63 -0.153 C 8.546 -0.629 8.091 -0.946 7.615 -0.862 C 7.14 -0.777 6.823 -0.323 6.907 0.153 L 7.769 0 L 8.63 -0.153 Z M 9.157 7.816 L 10.02 7.67 L 10.019 7.662 L 9.157 7.816 Z M 8.415 8.246 L 8.97 7.57 C 8.96 7.562 8.95 7.554 8.94 7.547 L 8.415 8.246 Z M 5.133 5.783 L 5.658 5.083 L 5.657 5.082 L 5.133 5.783 Z M 4.036 5.783 L 3.512 5.082 L 3.511 5.083 L 4.036 5.783 Z M 0.749 8.245 L 0.224 7.545 C 0.214 7.553 0.204 7.56 0.194 7.568 L 0.749 8.245 Z M 0.006 7.816 L -0.855 7.663 L -0.857 7.672 L 0.006 7.816 Z M 2.256 0.153 C 2.34 -0.323 2.023 -0.777 1.547 -0.862 C 1.071 -0.946 0.617 -0.629 0.533 -0.153 L 1.394 0 L 2.256 0.153 Z M 7.769 0 L 6.907 0.153 L 8.296 7.969 L 9.157 7.816 L 10.019 7.662 L 8.63 -0.153 L 7.769 0 Z M 9.157 7.816 L 8.295 7.961 C 8.28 7.878 8.292 7.792 8.328 7.715 L 9.12 8.087 L 9.912 8.458 C 10.028 8.213 10.065 7.937 10.02 7.67 L 9.157 7.816 Z M 9.12 8.087 L 8.328 7.715 C 8.364 7.638 8.423 7.574 8.496 7.531 L 8.935 8.288 L 9.375 9.045 C 9.609 8.909 9.797 8.704 9.912 8.458 L 9.12 8.087 Z M 8.935 8.288 L 8.496 7.531 C 8.57 7.489 8.654 7.47 8.739 7.477 L 8.669 8.349 L 8.598 9.221 C 8.869 9.243 9.14 9.181 9.375 9.045 L 8.935 8.288 Z M 8.669 8.349 L 8.739 7.477 C 8.823 7.483 8.904 7.516 8.97 7.57 L 8.415 8.246 L 7.86 8.923 C 8.07 9.095 8.328 9.199 8.598 9.221 L 8.669 8.349 Z M 8.415 8.246 L 8.94 7.547 L 5.658 5.083 L 5.133 5.783 L 4.608 6.483 L 7.89 8.946 L 8.415 8.246 Z M 5.133 5.783 L 5.657 5.082 C 5.347 4.851 4.971 4.726 4.585 4.726 L 4.585 5.601 L 4.585 6.476 C 4.594 6.476 4.602 6.479 4.609 6.484 L 5.133 5.783 Z M 4.585 5.601 L 4.585 4.726 C 4.198 4.726 3.822 4.851 3.512 5.082 L 4.036 5.783 L 4.56 6.484 C 4.567 6.479 4.576 6.476 4.585 6.476 L 4.585 5.601 Z M 4.036 5.783 L 3.511 5.083 L 0.224 7.545 L 0.749 8.245 L 1.273 8.946 L 4.56 6.484 L 4.036 5.783 Z M 0.749 8.245 L 0.194 7.568 C 0.26 7.515 0.34 7.482 0.425 7.476 L 0.495 8.348 L 0.566 9.22 C 0.836 9.198 1.093 9.094 1.303 8.922 L 0.749 8.245 Z M 0.495 8.348 L 0.425 7.476 C 0.509 7.469 0.594 7.488 0.667 7.53 L 0.229 8.287 L -0.21 9.045 C 0.025 9.181 0.295 9.242 0.566 9.22 L 0.495 8.348 Z M 0.229 8.287 L 0.667 7.53 C 0.74 7.573 0.799 7.637 0.835 7.713 L 0.044 8.086 L -0.748 8.459 C -0.632 8.705 -0.444 8.909 -0.21 9.045 L 0.229 8.287 Z M 0.044 8.086 L 0.835 7.713 C 0.871 7.79 0.883 7.876 0.869 7.959 L 0.006 7.816 L -0.857 7.672 C -0.901 7.939 -0.863 8.214 -0.748 8.459 L 0.044 8.086 Z M 0.006 7.816 L 0.868 7.968 L 2.256 0.153 L 1.394 0 L 0.533 -0.153 L -0.855 7.663 L 0.006 7.816 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      <svg
        width={11}
        height={11}
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 5.5,
          top: 1.833,
          width: 11,
          height: 11,
          color: "#FFFFFF",
        }}
      >
        <path
          d="M 11 5.5 L 10.125 5.5 C 10.125 8.054 8.054 10.125 5.5 10.125 L 5.5 11 L 5.5 11.875 C 9.021 11.875 11.875 9.021 11.875 5.5 L 11 5.5 Z M 5.5 11 L 5.5 10.125 C 2.946 10.125 0.875 8.054 0.875 5.5 L 0 5.5 L -0.875 5.5 C -0.875 9.021 1.979 11.875 5.5 11.875 L 5.5 11 Z M 0 5.5 L 0.875 5.5 C 0.875 2.946 2.946 0.875 5.5 0.875 L 5.5 0 L 5.5 -0.875 C 1.979 -0.875 -0.875 1.979 -0.875 5.5 L 0 5.5 Z M 5.5 0 L 5.5 0.875 C 8.054 0.875 10.125 2.946 10.125 5.5 L 11 5.5 L 11.875 5.5 C 11.875 1.979 9.021 -0.875 5.5 -0.875 L 5.5 0 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    </div>
  );
}
