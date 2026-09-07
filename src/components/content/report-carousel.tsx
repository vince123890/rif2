"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type ReportEntry = { year: number; href: string };

/** How many covers are visible at once on desktop. */
const VISIBLE = 3;

/**
 * Report carousel, built to the fig's Sustainability / Financial sections.
 *
 * The leading cover sits on a raised white card and is rendered larger; the
 * covers behind it are flat against the page ground and slightly smaller, so
 * the row reads as a stack receding to the right. Each cover carries the
 * Resona lockup, the report name in accent orange and an oversized "R"
 * watermark.
 *
 * Sliding is animated: the whole rail translates and each card eases between
 * its lead and trailing size, so stepping through feels continuous rather
 * than a swap. Arrows, dots, drag and the arrow keys all drive it.
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
  const [drag, setDrag] = useState<{ x: number; dx: number } | null>(null);

  if (!reports.length) return null;

  const last = Math.max(0, reports.length - VISIBLE);
  const go = (next: number) => setIndex(Math.min(Math.max(next, 0), last));

  // A drag past a quarter of a card steps the carousel.
  const endDrag = () => {
    if (!drag) return;
    if (drag.dx < -60) go(index + 1);
    else if (drag.dx > 60) go(index - 1);
    setDrag(null);
  };

  return (
    <div>
      <div
        className="overflow-hidden pb-4"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        onPointerDown={(e) => setDrag({ x: e.clientX, dx: 0 })}
        onPointerMove={(e) =>
          drag && setDrag({ ...drag, dx: e.clientX - drag.x })
        }
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <ul
          className={cn(
            "flex items-start gap-6",
            !drag && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
          style={{
            transform: `translateX(calc(${-index} * (var(--card) + 1.5rem) + ${drag?.dx ?? 0}px))`,
            ["--card" as string]: "clamp(220px, 25vw, 340px)",
          }}
        >
          {reports.map((r, i) => {
            const lead = i === index;
            return (
              <li
                key={r.year}
                aria-hidden={i < index || i >= index + VISIBLE}
                className={cn(
                  "w-[var(--card)] shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  lead
                    ? "rounded-[24px] bg-white p-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)]"
                    : "mt-6 p-2 opacity-90",
                )}
              >
                <Link
                  href={r.href}
                  tabIndex={i < index || i >= index + VISIBLE ? -1 : undefined}
                  className="group block"
                  draggable={false}
                >
                  {/* Cover */}
                  <span
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-[12px] bg-ink-100 p-6 transition-all duration-500",
                      lead ? "aspect-4/3" : "aspect-4/3",
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Image
                        src="/brand/resona-mark.png"
                        alt=""
                        width={32}
                        height={40}
                        aria-hidden
                        className={cn(
                          "w-auto shrink-0 transition-all duration-500",
                          lead ? "h-7" : "h-5",
                        )}
                      />
                      <span
                        className={cn(
                          "font-bold leading-tight text-brand-600 transition-all duration-500",
                          lead ? "text-[15px] md:text-[17px]" : "text-[12px] md:text-[13px]",
                        )}
                      >
                        Resona Indonesia Finance
                      </span>
                    </span>

                    <span
                      className={cn(
                        "relative z-10 mt-5 font-bold uppercase leading-[1.15] text-accent-500 transition-all duration-500",
                        lead ? "text-[22px] md:text-[28px]" : "text-[16px] md:text-[20px]",
                      )}
                    >
                      {label}
                    </span>

                    {/* Oversized "R" watermark, as in the fig */}
                    <Image
                      src="/brand/resona-mark.png"
                      alt=""
                      width={400}
                      height={500}
                      aria-hidden
                      className="pointer-events-none absolute -bottom-10 -right-10 h-[75%] w-auto opacity-[0.13]"
                    />
                  </span>

                  {/* Year + Detail */}
                  <span className="flex items-center justify-between gap-3 px-2 pt-5">
                    <span
                      className={cn(
                        "font-bold text-ink-900 transition-all duration-500",
                        lead ? "text-[22px] md:text-[26px]" : "text-[17px] md:text-[19px]",
                      )}
                    >
                      {r.year}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full bg-brand-600 font-bold text-white transition-colors group-hover:bg-brand-700",
                        lead ? "px-6 py-2.5 text-[16px]" : "px-4 py-1.5 text-[13px]",
                      )}
                    >
                      {t("detail")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls — fig: round green arrows with dots between, left-aligned */}
      {reports.length > VISIBLE && (
        <div className="mt-8 flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={t("previous")}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>

          <span className="flex gap-2">
            {Array.from({ length: last + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === index ? "bg-brand-600" : "bg-brand-600/25",
                )}
              />
            ))}
          </span>

          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === last}
            aria-label={t("next")}
            className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>

          <Link
            href={allHref}
            className="ml-auto hidden items-center gap-2 text-[15px] font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700 sm:inline-flex"
          >
            {t("viewMore")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
