"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Award } from "@/lib/content";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Award carousel.
 *
 * The fig never draws this tab — it only names it in the rail — so the
 * composition follows the board carousel in `Desktop - 12`: a focused card
 * flanked by neighbours at falling scale, with 64px green arrows and dots
 * beneath. Each card is the trophy over a caption strip carrying the year
 * and a green "Detail" pill.
 */
export function AwardCarousel({ awards }: { awards: Award[] }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [active, setActive] = useState(0);

  if (!awards.length) return null;

  const go = (next: number) => setActive((next + awards.length) % awards.length);

  /** Signed distance from the focused card, wrapped the short way round. */
  const offsetOf = (i: number) => {
    const raw = i - active;
    const half = awards.length / 2;
    if (raw > half) return raw - awards.length;
    if (raw < -half) return raw + awards.length;
    return raw;
  };

  return (
    <div>
      <div className="relative flex h-[380px] items-center justify-center md:h-[460px] lg:h-[520px]">
        {awards.map((award, i) => {
          const offset = offsetOf(i);
          const distance = Math.abs(offset);
          if (distance > 2) return null;

          const scale = distance === 0 ? 1 : distance === 1 ? 0.8 : 0.62;
          const shift = offset * 78;

          return (
            <button
              key={award.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={pick(award.title, locale)}
              aria-current={distance === 0}
              tabIndex={distance === 0 ? 0 : -1}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${shift}%) scale(${scale})`,
                zIndex: 10 - distance,
                opacity: distance === 2 ? 0.9 : 1,
              }}
            >
              <article className="w-[240px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] md:w-[270px] lg:w-[286px]">
                <div className="relative aspect-square bg-white">
                  <Image
                    src={award.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 286px, 60vw"
                    className="object-contain p-6"
                  />
                </div>

                {/* Caption — only the focused card shows it, as in the render */}
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 px-5 pb-5 transition-opacity",
                    distance === 0 ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p className="text-[18px] font-bold text-ink-900 lg:text-[22px]">
                    {award.year}
                  </p>
                  <span className="shrink-0 rounded-full bg-brand-600 px-5 py-2.5 text-[13px] font-bold text-white lg:text-[15px]">
                    {t("detail")}
                  </span>
                </div>
              </article>
            </button>
          );
        })}
      </div>

      {/* fig `Frame 161`: 64px green arrows either side of a row of dots */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label={t("previous")}
          className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white transition-transform hover:-translate-x-0.5 lg:h-16 lg:w-16"
        >
          <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {awards.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={pick(a.title, locale)}
              aria-current={i === active}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === active ? "w-7 bg-brand-600" : "w-2.5 bg-brand-200",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label={t("next")}
          className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white transition-transform hover:translate-x-0.5 lg:h-16 lg:w-16"
        >
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden />
        </button>
      </div>
    </div>
  );
}
