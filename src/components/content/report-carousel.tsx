"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type ReportEntry = { year: number; href: string };

/**
 * Report carousel, drawn from the fig's Sustainability / Financial sections.
 *
 * The fig shows the reports as cover-like cards: the leading card is large
 * (500×600, radius 24) with the title in black, the rest are smaller
 * (375×450, radius 18) with the title in accent orange on a grey inner
 * panel. Below sits a pair of round green arrow buttons and a row of dots.
 */
export function ReportCarousel({
  reports,
  label,
  allHref,
}: {
  reports: ReportEntry[];
  /** Localised report name printed on each cover, e.g. "Financial Report". */
  label: string;
  allHref: string;
}) {
  const t = useTranslations("common");
  const [index, setIndex] = useState(0);

  if (!reports.length) return null;

  const go = (next: number) =>
    setIndex((next + reports.length) % reports.length);

  /*
   * Lead card first, then the rest in order — the fig's stepped layout.
   * Only three are shown at once; with more in the set the arrows and dots
   * rotate through them, which keeps the row from wrapping.
   */
  const ordered = [...reports.slice(index), ...reports.slice(0, index)].slice(0, 3);

  return (
    <div>
      <ul className="flex flex-wrap items-end justify-center gap-6">
        {ordered.map((r, i) => (
          <li key={r.year} className={cn(i === 0 ? "w-full sm:w-[340px]" : "w-full sm:w-[260px]")}>
            <Link
              href={r.href}
              className={cn(
                "group flex flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1",
                i === 0 ? "rounded-[24px] p-3" : "rounded-[18px] p-2.5",
              )}
            >
              {/* Cover */}
              <span
                className={cn(
                  "flex flex-col justify-start bg-ink-100 p-6",
                  i === 0 ? "min-h-[300px] rounded-[12px]" : "min-h-[220px] rounded-[9px]",
                )}
              >
                <span className="text-[15px] text-brand-600 md:text-[18px]">
                  Resona Indonesia Finance
                </span>
                <span
                  className={cn(
                    "mt-4 font-bold uppercase leading-[1.15]",
                    i === 0
                      ? "text-[24px] text-ink-900 md:text-[30px]"
                      : "text-[20px] text-accent-500 md:text-[26px]",
                  )}
                >
                  {label}
                </span>
              </span>

              {/* Year + Detail pill */}
              <span className="flex items-center justify-between px-3 py-4">
                <span
                  className={cn(
                    "font-bold text-ink-900",
                    i === 0 ? "text-[24px]" : "text-[20px]",
                  )}
                >
                  {r.year}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full bg-brand-600 font-bold text-white transition-colors group-hover:bg-brand-700",
                    i === 0 ? "px-6 py-2.5 text-[17px]" : "px-4 py-2 text-[15px]",
                  )}
                >
                  {t("detail")}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Controls — fig: two 64px round green buttons with dots between */}
      <div className="mt-12 flex items-center justify-center gap-6">
        {reports.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t("previous")}
              className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <ArrowRight className="h-6 w-6 rotate-180" aria-hidden />
            </button>

            <span className="flex gap-2">
              {reports.map((r, i) => (
                <button
                  key={r.year}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={String(r.year)}
                  aria-current={i === index}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index ? "bg-brand-600" : "bg-brand-600/30",
                  )}
                />
              ))}
            </span>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t("next")}
              className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <ArrowRight className="h-6 w-6" aria-hidden />
            </button>
          </>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href={allHref}
          className="inline-flex items-center gap-2 text-[15px] font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
        >
          {t("viewMore")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
