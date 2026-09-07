"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

      <div className="container-rif relative flex min-h-[560px] flex-col justify-center py-24 md:min-h-[700px] lg:min-h-[800px]">
        <div key={slide.id} className="max-w-3xl animate-fade-up">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-600">
            {pick(slide.kicker, locale)}
          </p>

          {/* fig: 96px SemiBold, white — one colour, no orange split */}
          <h1 className="mt-6 max-w-[864px] text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[68px] lg:text-[96px]">
            {pick(slide.title, locale)}
            {slide.titleAccent ? ` ${pick(slide.titleAccent, locale)}` : null}
          </h1>

          {/* fig: 24px Bold white, no bullets, no italic */}
          <p className="mt-8 max-w-[679px] text-[17px] font-bold leading-[1.45] text-white md:text-[24px]">
            {pick(slide.lead, locale)}
          </p>
        </div>
      </div>

      {/*
       * fig: a translucent strip under the headline listing what RIF
       * finances, numbered 01–04 and split by hairline rules. It replaces
       * the pair of CTA buttons the hero used to carry.
       */}
      <div className="container-rif relative pb-10">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[12px] bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {financingTypes.map((f, i) => (
            <li
              key={f.en}
              className="flex items-start gap-3 bg-white/5 px-5 py-4 backdrop-blur-sm"
            >
              <span className="text-[16px] leading-tight text-white/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[16px] font-bold leading-[1.2] text-white md:text-[20px]">
                {locale === "id" ? f.id : f.en}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {slides.length > 1 && (
        <div className="container-rif relative pb-14">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white/70 text-ink-700 backdrop-blur transition-colors hover:bg-brand-600 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white/70 text-ink-700 backdrop-blur transition-colors hover:bg-brand-600 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-10 bg-accent-500"
                      : "w-5 bg-ink-400/60 hover:bg-ink-500",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
