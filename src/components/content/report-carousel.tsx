"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type ReportEntry = { year: number; href: string };

/** Covers visible at once on desktop. */
const VISIBLE = 3;

/**
 * Report carousel for the Sustainability and Financial sections.
 *
 * Smoothness note: every card keeps a fixed layout box and the same padding
 * whether or not it leads. Only `transform` and `opacity` change, both of
 * which the compositor can animate without re-running layout. An earlier
 * version grew the lead card's padding and margin instead, which resized its
 * box mid-slide and made the motion stutter.
 *
 * Driven by the arrows, the dots, pointer drag, and the left/right keys.
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

  const endDrag = () => {
    if (!drag) return;
    if (drag.dx < -60) go(index + 1);
    else if (drag.dx > 60) go(index - 1);
    setDrag(null);
  };

  const slide = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div>
      <div
        className="overflow-hidden px-1 pb-6 pt-2"
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
        onPointerCancel={endDrag}
      >
        <ul
          className="flex items-stretch gap-6 will-change-transform"
          style={{
            ["--card" as string]: "clamp(220px, 24vw, 330px)",
            transform: `translate3d(calc(${-index} * (var(--card) + 1.5rem) + ${
              drag?.dx ?? 0
            }px), 0, 0)`,
            transition: drag ? "none" : `transform 600ms ${slide}`,
          }}
        >
          {reports.map((r, i) => {
            const lead = i === index;
            const offscreen = i < index || i >= index + VISIBLE;

            return (
              <li
                key={r.year}
                aria-hidden={offscreen}
                /* Fixed box; scale (not size) marks the lead card. */
                className="w-[var(--card)] shrink-0 origin-bottom will-change-transform"
                style={{
                  transform: lead ? "scale(1)" : "scale(0.9)",
                  opacity: offscreen ? 0.35 : 1,
                  transition: `transform 600ms ${slide}, opacity 600ms ${slide}`,
                }}
              >
                <Link
                  href={r.href}
                  tabIndex={offscreen ? -1 : undefined}
                  draggable={false}
                  className={cn(
                    "group flex h-full flex-col rounded-[24px] p-4",
                    "transition-[background-color,box-shadow] duration-500",
                    lead
                      ? "bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)]"
                      : "bg-transparent shadow-none",
                  )}
                >
                  {/* Cover */}
                  <span className="relative flex aspect-4/3 flex-col overflow-hidden rounded-[12px] bg-ink-100 p-5">
                    <span className="relative z-10 flex items-center gap-2">
                      <Image
                        src="/brand/resona-mark.png"
                        alt=""
                        width={32}
                        height={40}
                        aria-hidden
                        className="h-6 w-auto shrink-0"
                      />
                      <span className="text-[13px] font-bold leading-tight text-brand-600 md:text-[14px]">
                        Resona Indonesia Finance
                      </span>
                    </span>

                    <span className="relative z-10 mt-4 text-[18px] font-bold uppercase leading-[1.15] text-accent-500 md:text-[22px]">
                      {label}
                    </span>

                    {/* Oversized "R" watermark, as in the design */}
                    <Image
                      src="/brand/resona-mark.png"
                      alt=""
                      width={400}
                      height={500}
                      aria-hidden
                      className="pointer-events-none absolute -bottom-8 -right-8 h-[70%] w-auto opacity-[0.13]"
                    />
                  </span>

                  {/* Year + Detail */}
                  <span className="mt-auto flex items-center justify-between gap-3 px-1 pt-5">
                    <span className="text-[20px] font-bold text-ink-900 md:text-[24px]">
                      {r.year}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-brand-600 px-5 py-2 text-[14px] font-bold text-white transition-colors group-hover:bg-brand-700 md:text-[15px]">
                      {t("detail")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls — round green arrows with dots between */}
      {reports.length > VISIBLE && (
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={t("previous")}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
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
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
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
