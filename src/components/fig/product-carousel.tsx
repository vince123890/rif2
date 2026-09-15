"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { BulletBadge } from "@/components/content/bullet-badge";
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
