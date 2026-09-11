"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Homepage hero — `home page` frame in `docs/Resona_Indonesia_Finance.fig`.
 *
 * Measured off the decoded node tree:
 *   - `Mask group` / `image 8`  : 1440×900 photo, full bleed
 *   - `Rectangle 5`             : #00100C wash over the photo
 *   - `Children`                : 70px Lato Regular white at (80, 220),
 *                                 641px wide, 100% line-height
 *   - the 20px lead             : 425px wide at (935, 290)
 *   - `Group 167`               : the four tilted cards at y=519, running
 *                                 from x=-90 to x=1530 — i.e. deliberately
 *                                 wider than the frame so the outer two
 *                                 bleed off both edges.
 *
 * The cards are not rotated in the file: each is masked by a vector whose
 * top and bottom edges bow ~14px across its width, which reads as a gentle
 * fan. `rotate` + a matching counter-rotation on the image reproduces that
 * at a fraction of the cost of hand-rolling the curve.
 */

/** fig `Group 162/163/164/165`, in document order left → right. */
const strip = [
  { src: "/fig/strip-3.png", w: 411, h: 353, tilt: -2, top: 0 },
  { src: "/fig/strip-4.png", w: 391, h: 286, tilt: 2, top: 33 },
  { src: "/fig/strip-1.png", w: 391, h: 286, tilt: -2, top: 33 },
  { src: "/fig/strip-2.png", w: 411, h: 353, tilt: 2, top: 0 },
] satisfies { src: string; w: number; h: number; tilt: number; top: number }[];

export function FigHero({
  title,
  titleSecondLine,
  lead,
}: {
  title: string;
  /** fig breaks the headline with U+2028, so both clauses get their own line. */
  titleSecondLine: string;
  lead: string;
}) {
  /*
   * A slow parallax drift on the backdrop. Driven by rAF off the scroll
   * position rather than a scroll-linked animation so it stays smooth on
   * the browsers RIF supports, and switched off entirely for users who ask
   * for reduced motion.
   */
  const [offset, setOffset] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        // Clamp so the image never drifts far enough to expose an edge.
        setOffset(Math.min(window.scrollY * 0.25, 160));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#00100C]">
      {/* fig `image 8` — 1440×900, object-fit FILL */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 motion-safe:will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
      >
        <Image
          src="/fig/hero-skyline.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/*
       * fig `Rectangle 5`: a flat #00100C plate covers the photo at full
       * opacity in the file. Taken down to a strong wash here so the
       * skyline stays visible — a solid fill would hide the photo the
       * design deliberately places behind it.
       */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#00100C]/72"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#00100C]/85 via-transparent to-[#00100C]/90"
      />

      {/* 1440×900 in the fig; min-height keeps the proportion without pinning it */}
      <div className="relative mx-auto min-h-[620px] w-full max-w-[1440px] pt-[180px] md:min-h-[760px] lg:min-h-[900px] lg:pt-[220px]">
        <div className="px-5 sm:px-8 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-[641fr_425fr] lg:items-start lg:gap-[80px]">
            {/* fig: 70px Lato Regular, 100% line-height, white */}
            {/*
             * fig: the headline box is 641×168 — two 70px lines at a 100%
             * line box. `text-balance` is deliberately not used: the fig
             * breaks on its own clause, which `titleSecondLine` already
             * carries, and balancing would re-wrap it.
             */}
            <h1 className="max-w-[700px] text-[38px] font-normal leading-[1.05] text-white md:text-[54px] lg:text-[70px] [animation:fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
              {title}
              <br />
              {titleSecondLine}
            </h1>

            {/* fig: 20px Lato Regular, 1.5 line-height, white, 425px wide */}
            <p className="max-w-[425px] text-[16px] leading-[1.5] text-white/90 md:text-[20px] lg:pt-[70px] [animation:fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] motion-reduce:animate-none">
              {lead}
            </p>
          </div>
        </div>

        {/*
         * fig `Group 167` — 1620×353 starting at x=-90, so the row is
         * wider than the 1440 frame and the outer cards run off both
         * sides. Reproduced with a negative inset rather than a fixed
         * width so it keeps bleeding at every viewport.
         */}
        <div className="pointer-events-none mt-14 overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:pb-10">
          {/* fig: the cards abut at ~6px, the row itself overhanging by 90px */}
          <div className="flex -mx-[90px] items-start justify-center gap-1.5">
            {strip.map((s, i) => (
              <div
                key={s.src}
                style={{
                  marginTop: `${s.top * 0.75}px`,
                  transform: `rotate(${s.tilt}deg)`,
                  animationDelay: `${300 + i * 110}ms`,
                  // fig card sizes; `aspect-ratio` keeps the proportion as
                  // the row narrows on smaller screens.
                  aspectRatio: `${s.w} / ${s.h}`,
                  ["--fig-w" as string]: `${s.w}px`,
                } as React.CSSProperties}
                className={cn(
                  "relative w-[240px] shrink-0 overflow-hidden rounded-[32px] ring-1 ring-white/10",
                  "md:w-[320px] lg:w-[var(--fig-w)]",
                  "[animation:fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none",
                )}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 411px, 320px"
                  className="object-cover"
                  /* Counter-rotate so the subject stays level inside its
                     tilted frame, as the mask does in the fig. */
                  style={{ transform: `rotate(${-s.tilt}deg) scale(1.12)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
