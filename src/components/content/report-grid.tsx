"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";

import type { DocumentItem } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Report grid — the `list doc` frame in the fig.
 *
 * The same 410×480 card the homepage uses, laid out three-up over as many
 * rows as the set needs (`Rectangle 113…125` runs two rows of three on a
 * 434×504 pitch):
 *
 *   - `Rectangle 116` : a 286×96 #F2F8F6 plate behind the year
 *   - `Rectangle 34`  : a 134×189 blossom block at 30%, top-right
 *   - the year        : 80px Lato Black Italic in #006F4F
 *   - `Line 5`        : an 80×4 orange rule under the title
 *   - `Frame 127`     : Download (outlined) + View PDF, 64px tall at r12
 *
 * A "Sort by Year" rail sits above the grid.
 */
export function ReportGrid({
  documents,
  /** Shown as each card's title, e.g. "Financial Report". */
  coverLabel,
}: {
  documents: DocumentItem[];
  coverLabel: string;
}) {
  const t = useTranslations("common");
  const [year, setYear] = useState<number | null>(null);

  const years = useMemo(
    () => [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a),
    [documents],
  );

  const shown = year ? documents.filter((d) => d.year === year) : documents;

  return (
    <div>
      {/* Year filter — fig `Frame 282`, right-aligned over the grid */}
      {years.length > 1 ? (
        <div className="mb-8 flex flex-wrap items-center justify-end gap-3">
          <span className="text-[18px] text-ink-900 md:text-[24px]">
            {t("sortByYear")}
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setYear(null)}
              aria-pressed={year === null}
              className={cn(
                "rounded-full px-4 py-2 text-[14px] transition-colors md:text-[16px]",
                year === null
                  ? "bg-brand-600 text-white"
                  : "bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-brand-50",
              )}
            >
              {t("all")}
            </button>

            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={cn(
                  "rounded-full px-4 py-2 text-[14px] transition-colors md:text-[16px]",
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

      {shown.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 90}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]">
                {/* fig `Rectangle 34`: blossom block, top-right at 30% */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 h-[189px] w-[134px] bg-[url('/brand/blossom-pattern.png')] bg-contain bg-right-top bg-no-repeat opacity-30"
                />

                {/* fig `Rectangle 116` + the 80px Black Italic year */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-6 top-4 h-24 w-[286px] max-w-[calc(100%+3rem)] bg-[#F2F8F6]"
                  />
                  <p className="relative py-2 text-[56px] font-black italic leading-none text-brand-600 md:text-[80px]">
                    {d.year}
                  </p>
                </div>

                <h3 className="mt-10 text-[22px] font-bold leading-none text-ink-900 md:text-[28px]">
                  {coverLabel}
                </h3>

                {/* fig `Line 5`: 80×4 orange rule, flush right */}
                <span
                  aria-hidden
                  className="mt-6 ml-auto block h-1 w-20 bg-accent-500"
                />

                {/* fig `Frame 127`: 64px actions at radius 12 */}
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <a
                    href={d.file.url}
                    download
                    className="inline-flex h-14 items-center gap-3 rounded-[12px] border border-brand-600 px-6 text-[16px] leading-[1.7] text-brand-600 transition-colors duration-200 hover:bg-brand-50 md:text-[20px]"
                  >
                    <Download className="h-6 w-6 text-accent-500" aria-hidden />
                    {t("download")}
                  </a>

                  <a
                    href={d.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-3 rounded-[12px] px-6 text-[16px] leading-[1.7] text-brand-600 transition-colors duration-200 hover:bg-brand-50 md:text-[20px]"
                  >
                    <PdfIcon />
                    {t("viewPdf")}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-center text-[16px] text-ink-500">{t("noData")}</p>
      )}
    </div>
  );
}

/** fig `pdf-file 1` — a white sheet with the red PDF tab. */
function PdfIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
      <path
        d="M4.2 0h11.3L20.5 5v19H4.2z"
        fill="#FFFEFE"
        stroke="#BBBBBA"
        strokeWidth=".8"
      />
      <path d="M15.5 0L20.5 5h-5z" fill="#BBBBBA" />
      <rect x="2.8" y="9" width="15.2" height="11" rx="2" fill="#B43331" />
      <text
        x="10.4"
        y="17.2"
        textAnchor="middle"
        fontSize="6.4"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="Lato, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
}
