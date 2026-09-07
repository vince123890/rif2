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

      <div className="container-rif relative flex min-h-[520px] flex-col justify-center pb-6 pt-28 md:min-h-[620px] lg:min-h-[660px] lg:pt-32">
        <div key={slide.id} className="max-w-3xl animate-fade-up">
          {/*
           * fig: the headline runs three colours — the opening clause in
           * white, then one word in accent orange and the closing word in
           * brand green. `title` / `titleAccent` in the content carry the
           * first two parts; `titleTail` the green one.
           */}
          <h1 className="max-w-[900px] text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px] lg:text-[76px] xl:text-[88px]">
            {pick(slide.title, locale)}
            {slide.titleAccent ? (
              <>
                {" "}
                <span className="text-accent-500">
                  {pick(slide.titleAccent, locale)}
                </span>
              </>
            ) : null}
            {slide.titleTail ? (
              <>
                {" "}
                <span className="text-brand-600">
                  {pick(slide.titleTail, locale)}
                </span>
              </>
            ) : null}
          </h1>

          {/* fig: 24px Bold white, set right under the headline block */}
          <p className="mt-6 max-w-[679px] self-end text-[17px] font-bold leading-[1.45] text-white md:text-[24px] md:text-right">
            {pick(slide.lead, locale)}
          </p>
        </div>
      </div>

      {/*
       * fig: the four financing types sit directly on the photo — no panel,
       * no fill, just hairline rules between the columns. They double as the
       * carousel's controls, which is why the hero carries no arrows or dots.
       */}
      <div className="container-rif relative pb-14">
        <ul className="grid grid-cols-2 gap-y-6 lg:grid-cols-4">
          {financingTypes.map((f, i) => (
            <li
              key={f.en}
              className={
                i > 0 ? "lg:border-l lg:border-white/25" : undefined
              }
            >
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                aria-label={locale === "id" ? f.id : f.en}
                className={cn(
                  "flex w-full items-start gap-3 px-2 text-left transition-opacity lg:px-6",
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
