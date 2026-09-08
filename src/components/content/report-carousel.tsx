"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type ReportEntry = { year: number; href: string };

/*
 * Track geometry, from `docs/Carousel animation implementation`.
 *
 * The active card is genuinely wider than the others — the rail animates
 * `flex-basis`, so the card grows and its neighbours are pushed along in the
 * same motion. The rail's own offset is one inactive card plus one gap per
 * step, which keeps the active card pinned to the left edge as it widens.
 */
const ACTIVE_W = 300;
const INACTIVE_W = 200;
const GAP = 20;
/*
 * The reference file uses cubic-bezier(.22,.9,.35,1), which covers 84% of
 * the distance in the first half of the run. That is fine for a single
 * property, but here the rail's translate and the cards' flex-basis both
 * move a card at once, so the front-loading compounds: the row jumps, then
 * crawls the last few pixels, and reads as stuttering. A more even curve
 * spends the time proportionally and the slide looks continuous.
 */
const EASE = "cubic-bezier(.4,0,.2,1)";

/*
 * Rail and card widths must share one duration and one curve.
 *
 * Both move a card's position at once: the rail slides it left while the
 * outgoing active card shrinks 300 -> 200, pulling everything after it left
 * as well. Running those on different timings (0.5s vs 0.45s) made the two
 * contributions peak at different moments, so a card lurched forward and
 * then crawled the last few pixels — the motion read as stuttering even
 * though each property animated correctly on its own.
 */
const DURATION = "0.55s";
const MOVE = `${DURATION} ${EASE}`;

/**
 * Report carousel for the Sustainability and Financial sections.
 *
 * Driven by the arrows, the dots, clicking an inactive card, pointer drag,
 * and the left/right keys. Stepping past either end wraps around.
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
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState<{ x: number; dx: number } | null>(null);

  if (!reports.length) return null;

  const shift = (dir: 1 | -1) =>
    setActive((a) => (a + dir + reports.length) % reports.length);

  /*
   * Offset = the real width of everything before the active card.
   *
   * Cards before it are all inactive, so this is `active` inactive widths
   * plus the gaps between them. Using the *outgoing* geometry instead
   * (a flat INACTIVE_W + GAP per step) over-shoots by 100px, because the
   * card that just shrank pulls the row back by that much — which is what
   * made the slide lurch and then crawl.
   */
  const offset = active * (INACTIVE_W + GAP);

  const endDrag = () => {
    if (!drag) return;
    if (drag.dx < -60) shift(1);
    else if (drag.dx > 60) shift(-1);
    setDrag(null);
  };

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <div
        className="overflow-hidden pb-4 pt-2"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") shift(1);
          if (e.key === "ArrowLeft") shift(-1);
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
          className="flex items-stretch"
          style={{
            gap: GAP,
            transform: `translateX(${-offset + (drag?.dx ?? 0)}px)`,
            transition: drag ? "none" : `transform ${MOVE}`,
          }}
        >
          {reports.map((r, i) => {
            const isActive = i === active;

            return (
              <li
                key={r.year}
                onClick={(e) => {
                  // A drag should not read as a click, and the Detail link
                  // must navigate rather than merely activate the card.
                  if (drag && Math.abs(drag.dx) > 5) return;
                  if ((e.target as HTMLElement).closest("a")) return;
                  if (!isActive) setActive(i);
                }}
                style={{
                  flex: `0 0 ${isActive ? ACTIVE_W : INACTIVE_W}px`,
                  filter: isActive ? "none" : "saturate(0.6) opacity(0.85)",
                  transition: `flex-basis ${MOVE}, filter ${MOVE}`,
                }}
                className={cn(
                  "overflow-hidden rounded-[24px] bg-white",
                  isActive
                    ? "shadow-[0_12px_28px_rgba(0,0,0,0.10)]"
                    : "cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.05)]",
                )}
              >
                <div className="flex h-full flex-col p-4">
                  {/* Cover */}
                  <div className="relative flex aspect-4/3 flex-col overflow-hidden rounded-[12px] bg-ink-100 p-5">
                    <span className="relative z-10 flex items-center gap-2">
                      <Image
                        src="/brand/resona-mark.png"
                        alt=""
                        width={32}
                        height={40}
                        aria-hidden
                        className="h-6 w-auto shrink-0"
                      />
                      <span className="text-[12px] font-bold leading-tight text-brand-600 md:text-[13px]">
                        Resona Indonesia Finance
                      </span>
                    </span>

                    {/* Title grows and warms as the card becomes active */}
                    <span
                      className="relative z-10 mt-4 font-bold uppercase leading-[1.2]"
                      style={{
                        fontSize: isActive ? 22 : 16,
                        color: isActive ? "#F58220" : "#D8A87C",
                        transition: `font-size ${MOVE}, color ${MOVE}`,
                      }}
                    >
                      {label}
                    </span>

                    <Image
                      src="/brand/resona-mark.png"
                      alt=""
                      width={400}
                      height={500}
                      aria-hidden
                      className="pointer-events-none absolute -bottom-8 -right-8 h-[70%] w-auto opacity-[0.13]"
                    />
                  </div>

                  {/* Year + Detail */}
                  <div className="mt-auto flex items-center justify-between gap-3 px-1 pt-5">
                    <span className="text-[18px] font-bold text-ink-900 md:text-[20px]">
                      {r.year}
                    </span>
                    <Link
                      href={r.href}
                      className="inline-flex shrink-0 items-center rounded-full bg-brand-600 px-5 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand-700"
                    >
                      {t("detail")}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls — round green arrows with dots between */}
      <div className="mt-4 flex items-center gap-5">
        <button
          type="button"
          onClick={() => shift(-1)}
          aria-label={t("previous")}
          className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>

        <span className="flex gap-2">
          {reports.map((r, i) => (
            <button
              key={r.year}
              type="button"
              onClick={() => setActive(i)}
              aria-label={String(r.year)}
              aria-current={i === active}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors duration-300",
                i === active ? "bg-brand-600" : "bg-ink-200",
              )}
            />
          ))}
        </span>

        <button
          type="button"
          onClick={() => shift(1)}
          aria-label={t("next")}
          className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>

        <Link
          href={allHref}
          className="ml-auto hidden items-center gap-2 text-[16px] font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700 sm:inline-flex"
        >
          {t("viewMore")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
