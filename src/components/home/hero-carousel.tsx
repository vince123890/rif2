"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import type { HeroSlide } from "@/lib/content";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/**
 * The four financing types listed under the hero headline in the fig.
 * Hard-coded here (rather than derived from `products`) because the fig
 * names equipment categories, which cut across the three product pages.
 */
const financingTypes: { id: string; en: string }[] = [
  { id: "Pembiayaan Mesin Industri", en: "Industrial Machinery Financing" },
  { id: "Pembiayaan Kendaraan Operasional", en: "Vehicle Operational Financing" },
  { id: "Pembiayaan Alat Berat", en: "Heavy Equipment Financing" },
  { id: "Pembiayaan Perangkat IT", en: "IT Machinery Financing" },
];

/**
 * FR-HM-01 — hero banner slider.
 *
 * Layout from the fig: a full-bleed 1440×800 photo, headline at 84px Bold
 * with the second line in accent orange, and a small italic tagline
 * ("• Our Story of Growth and Excellence •") beneath.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => go(index + 1), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, paused, go, slides.length]);

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("heroTitle")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-ink-900"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-transform duration-[9000ms] ease-out",
              i === index ? "scale-105" : "scale-100",
            )}
          />
        </div>
      ))}

      {/*
       * Legibility scrim. The fig fills the whole hero frame with
       * #0F0F0F at 60% over the photo and sets every piece of type in
       * white — a flat wash, not a directional gradient.
       */}
      <div aria-hidden className="absolute inset-0 bg-[#0F0F0F]/60" />

      <div className="container-rif relative flex min-h-[520px] flex-col items-center justify-center pb-6 pt-28 text-center md:min-h-[620px] lg:min-h-[660px] lg:pt-32">
        <div key={slide.id} className="animate-fade-up">
          {/*
           * fig `Frame 74`: 864x216 centred, 96px SemiBold white on a
           * 108px line box (-0.42px tracking). The multi-colour treatment
           * this used to draw was ours — the design sets it all in white.
           */}
          <h1 className="mx-auto max-w-[864px] text-[36px] font-semibold leading-[1.125] tracking-[-0.42px] text-white md:text-[64px] lg:text-[96px]">
            {pick(slide.title, locale)}
            {slide.titleAccent ? <> {pick(slide.titleAccent, locale)}</> : null}
            {slide.titleTail ? <> {pick(slide.titleTail, locale)}</> : null}
          </h1>

          {/*
           * fig `Frame 73`: 679px wide, 24px Bold white on a 100% line
           * box, centred under the headline.
           */}
          <p className="mx-auto mt-6 max-w-[679px] text-[17px] font-bold leading-[1.2] text-white md:text-[24px]">
            {pick(slide.lead, locale)}
          </p>
        </div>
      </div>

      {/*
       * fig `Frame 71`: the four financing types sit on a translucent
       * panel — 1312x82, filled #0F0F0F at 5% with a 5px background blur,
       * 16px gap, and 1px #D9D9D9 hairlines between the columns. They
       * double as the carousel's controls, which is why the hero carries
       * no arrows or dots.
       */}
      <div className="container-rif relative pb-14">
        <ul className="grid grid-cols-2 gap-4 rounded-[12px] bg-[#0F0F0F]/5 p-3 backdrop-blur-[5px] lg:grid-cols-4 lg:gap-4 lg:px-3 lg:py-[17px]">
          {financingTypes.map((f, i) => (
            <li
              key={f.en}
              className={
                i > 0 ? "lg:border-l lg:border-[#D9D9D9]" : undefined
              }
            >
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                aria-label={locale === "id" ? f.id : f.en}
                className={cn(
                  "flex w-full items-start gap-1 px-2 text-left transition-opacity lg:px-6",
                  i === index ? "opacity-100" : "opacity-60 hover:opacity-90",
                )}
              >
                <span className="text-[14px] leading-[1.5] text-white md:text-[16px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-bold leading-[1.2] text-white md:text-[20px]">
                  {locale === "id" ? f.id : f.en}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
