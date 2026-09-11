"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import type { Award } from "@/lib/content";
import { pick } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Awards — `Frame 26819` in the fig's `award` frame.
 *
 * A 1280×1106 white panel at radius 32 holding, per year:
 *
 *   - `Frame 282`   : a "Pilih tahun" label with a 150×42 year control
 *   - `Frame 26810` : a 32px Bold heading ("Penghargaan 2022") over
 *                     `Group 174` — an 80px rule capped by a 12px dot at
 *                     each end
 *   - `Frame 26820` : rows of three 389×370 cards, each a 389×250 image
 *                     over a 389×112 caption (`Subtract`) with a 40px
 *                     orange arrow in the notch
 */
export function AwardGrid({ awards }: { awards: Award[] }) {
  const locale = useLocale();
  const t = useTranslations("common");

  const years = useMemo(
    () => [...new Set(awards.map((a) => a.year))].sort((a, b) => b - a),
    [awards],
  );

  const [year, setYear] = useState<number | null>(years[0] ?? null);
  const shown = year ? awards.filter((a) => a.year === year) : awards;

  if (!awards.length) return null;

  return (
    <div className="rounded-[32px] bg-white p-6 md:p-8">
      {/* fig `Frame 282`: the year control, right-aligned */}
      {years.length > 1 ? (
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="text-[18px] text-ink-900 md:text-[24px]">
            {t("sortByYear")}
          </span>

          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={cn(
                  "rounded-[12px] px-5 py-2.5 text-[14px] transition-colors md:text-[16px]",
                  year === y
                    ? "bg-brand-600 text-white"
                    : "bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-brand-50",
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* fig `Frame 26810`: 32px heading over the dotted rule */}
      <div className="mt-6">
        <h2 className="text-[24px] font-bold leading-[1.2] text-ink-900 md:text-[32px]">
          {locale === "id" ? "Penghargaan" : "Awards"} {year ?? ""}
        </h2>

        <span aria-hidden className="mt-4 flex items-center gap-0">
          <span className="block h-3 w-3 rounded-full bg-accent-500" />
          <span className="block h-1 w-20 bg-accent-500" />
          <span className="block h-3 w-3 rounded-full bg-accent-500" />
        </span>
      </div>

      {/* fig `Frame 26820`: three 389×370 cards per row */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((award, i) => (
          <Reveal key={award.id} delay={(i % 3) * 90}>
            <article className="group relative h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[32px] bg-canvas">
                {/* fig `Group 189`: the 389×250 image */}
                <div className="relative aspect-[389/250] w-full overflow-hidden bg-white">
                  <Image
                    src={award.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 389px, 100vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* fig `Subtract`: the 389×112 caption, notched right */}
                <div className="flex flex-1 items-center p-8 pr-20">
                  <p className="text-[16px] font-normal leading-[1.5] text-ink-900">
                    {pick(award.title, locale)}
                  </p>
                </div>
              </div>

              {/* fig `Button`: a 40px orange circle in the notch */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
              >
                <ArrowRight className="h-5 w-5" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
