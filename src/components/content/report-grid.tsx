"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import type { DocumentItem } from "@/lib/content";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Report grid — `Desktop - 24` (Financial) and `Desktop - 30/31`
 * (Sustainability).
 *
 * A rail of year pills ("All" plus one per year) over a grid of 500x600
 * cards: an #EDEDED cover carrying the Resona lockup and the report name in
 * orange, then a footer strip with the year and a green "Detail" pill that
 * opens the PDF.
 */
export function ReportGrid({
  documents,
  /** Shown on the cover, e.g. "Financial Report". */
  coverLabel,
}: {
  documents: DocumentItem[];
  coverLabel: string;
}) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [year, setYear] = useState<number | null>(null);

  const years = useMemo(
    () => [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a),
    [documents],
  );

  const shown = year ? documents.filter((d) => d.year === year) : documents;

  return (
    <div>
      {/* fig `Frame 83`: pills on a near-transparent rail */}
      <div className="mb-8 inline-flex flex-wrap items-center gap-1 rounded-[34px] bg-white/5 p-2">
        <button
          type="button"
          onClick={() => setYear(null)}
          aria-current={year === null}
          className={cn(
            "rounded-full px-5 py-2.5 text-[16px] transition-colors md:text-[20px]",
            year === null
              ? "bg-accent-500 font-bold text-white"
              : "text-ink-900 hover:bg-white/60",
          )}
        >
          {t("all")}
        </button>
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setYear(y)}
            aria-current={year === y}
            className={cn(
              "rounded-full px-5 py-2.5 text-[16px] transition-colors md:text-[20px]",
              year === y
                ? "bg-accent-500 font-bold text-white"
                : "text-ink-900 hover:bg-white/60",
            )}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((doc) => (
          <article
            key={doc.id}
            /* fig `Frame 145`: 500x600 white card, radius 24 */
            className="group overflow-hidden rounded-[24px] bg-white p-3"
          >
            <div className="relative aspect-[475/456] overflow-hidden rounded-[12px] bg-ink-100">
              {doc.thumbnail ? (
                <Image
                  src={doc.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              ) : (
                /* fig cover: lockup, then the report name in orange */
                <div className="relative flex h-full flex-col p-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/brand/resona-mark.png"
                      alt=""
                      width={34}
                      height={34}
                      className="h-8 w-auto"
                    />
                    <span className="text-[14px] font-bold text-brand-600 lg:text-[16px]">
                      Resona Indonesia Finance
                    </span>
                  </div>
                  <p className="mt-4 text-[22px] font-bold leading-[1.15] text-accent-500 lg:text-[28px]">
                    {coverLabel}
                  </p>
                  {/* fig `Vector`: the mark bleeding out of the lower right */}
                  <Image
                    src="/brand/resona-mark.png"
                    alt=""
                    aria-hidden
                    width={352}
                    height={363}
                    className="pointer-events-none absolute -bottom-10 -right-10 w-[62%] opacity-10"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-4">
              <p className="text-[22px] font-bold text-ink-700 lg:text-[30px]">
                {doc.year}
              </p>
              <a
                href={doc.file.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={pick(doc.title, locale)}
                className="rounded-full bg-brand-600 px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-700 lg:text-[20px]"
              >
                {t("detail")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
