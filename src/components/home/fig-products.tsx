"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type FigProduct = {
  title: string;
  description: string;
  points: string[];
  image: string;
};

/**
 * Products carousel — fig `Rectangle 123` and `Group 173`.
 *
 * Geometry from the decoded tree:
 *   - `Rectangle 123` : 1392×963 #006F4F panel at radius 32, inset 24px
 *   - `Group 173`     : the 976×600 active slide at (232, 1913), radius 32
 *   - `Mask group` ×2 : 128×600 peek slivers at x=80 and x=1232
 *   - both slivers and the active card carry a #00100C → transparent
 *     gradient so the type sits legibly over the photo
 *   - `Button` ×2     : 64px #F58220 circles at (112, 2417) and (1264, 2417)
 *   - `Line 1`        : 80×4 #F58220 rule above the description
 *
 * The slide copy (`Modal Kerja`, the four bullets) overlays the photo at
 * the bottom-left, 32px Bold over 24px Regular.
 */
export function FigProducts({
  products,
  labelPrev,
  labelNext,
}: {
  products: FigProduct[];
  labelPrev: string;
  labelNext: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Auto-advance, held while the pointer or focus is inside the panel.
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => go(index + 1), 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, paused, go, count]);

  if (!count) return null;

  const prev = products[(index - 1 + count) % count];
  const next = products[(index + 1) % count];
  const active = products[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
      aria-roledescription="carousel"
    >
      <div className="flex items-stretch gap-4 lg:gap-6">
        {/* fig: 128×600 left sliver, cropped from the previous slide */}
        <Peek image={prev.image} side="left" />

        {/* fig `Group 173`: 976×600, radius 32 */}
        <div className="relative aspect-[976/600] min-h-[360px] flex-1 overflow-hidden rounded-[32px]">
          {products.map((p, i) => (
            <div
              key={p.title}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                i === index ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 976px, 100vw"
                className={cn(
                  "object-cover transition-transform duration-[8000ms] ease-out",
                  i === index ? "scale-110" : "scale-100",
                )}
              />
            </div>
          ))}

          {/* fig `Rectangle 16`: #00100C → transparent, left to right */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#00100C] via-[#00100C]/70 to-transparent"
          />

          {/* Slide copy — fig places it at (264, 2173) inside the card */}
          <div
            key={active.title}
            className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-[32px] [animation:fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
          >
            {/* fig `Line 1`: 80×4 orange rule */}
            <span
              aria-hidden
              className="block h-1 w-20 rounded-full bg-accent-500"
            />

            <h3 className="mt-5 text-[24px] font-bold leading-none text-white md:text-[32px]">
              {active.title}
            </h3>

            <p className="mt-5 max-w-[912px] text-[16px] leading-tight text-white md:text-[24px]">
              {active.description}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:max-w-[600px]">
              {active.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-3 text-[15px] leading-[1.5] text-white md:text-[20px]"
                >
                  <CheckBadge />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* fig: 128×600 right sliver, cropped from the next slide */}
        <Peek image={next.image} side="right" />
      </div>

      {/*
       * fig `Button` ×2 — 64px #F58220 circles sitting *over* the slivers,
       * at x=112 and x=1264 (i.e. centred on each sliver).
       */}
      <NavButton side="left" label={labelPrev} onClick={() => go(index - 1)} />
      <NavButton side="right" label={labelNext} onClick={() => go(index + 1)} />

      {/* Progress dots — not in the fig, but the carousel needs a position cue */}
      <div className="mt-6 flex justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => go(i)}
            aria-label={p.title}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-accent-500" : "w-2 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/** fig `Mask group` 128×600 — a cropped, darkened edge of the neighbouring slide. */
function Peek({ image, side }: { image: string; side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className="relative hidden w-[128px] shrink-0 overflow-hidden rounded-[32px] lg:block"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="128px"
        className={cn(
          "object-cover",
          side === "left" ? "object-right" : "object-left",
        )}
      />
      {/* fig `Rectangle 103/104`: #00100C → transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00100C] to-[#00100C]/30" />
    </div>
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full",
        "bg-accent-500 text-white shadow-lg backdrop-blur-[2px] transition-transform duration-200",
        "hover:scale-110 active:scale-95 lg:h-16 lg:w-16",
        side === "left" ? "left-0 lg:left-8" : "right-0 lg:right-8",
      )}
    >
      <ArrowRight
        className={cn("h-5 w-5 lg:h-6 lg:w-6", side === "left" && "rotate-180")}
        aria-hidden
      />
    </button>
  );
}

/**
 * fig `Frame 8` bullet: a 22px rounded-square outline with a tick, drawn in
 * white at 1.75 stroke.
 */
function CheckBadge() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 22"
      fill="none"
      className="h-[22px] w-[22px] shrink-0"
    >
      <rect
        x="1.9"
        y="1.9"
        width="18.2"
        height="18.2"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6.4 11.4l3 3 6.2-6.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
