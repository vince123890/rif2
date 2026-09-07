"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import { milestones } from "@/lib/content/milestones";
import { cn } from "@/lib/utils";

/**
 * "Our Journey" — `Frame 203` in `Desktop - 10`.
 *
 * A white card (r=24) holding three columns: a rail of years down the left
 * that selects the entry, the entry's month/year/body in the middle, and a
 * 550x536 photo (r=24) on the right. Picking a year scrolls the story to
 * the first milestone of that year, which is what the fig's "Scroll to
 * Explore" disc hints at.
 */
export function JourneyTimeline({ image }: { image: string }) {
  const locale = useLocale();
  const [active, setActive] = useState(0);

  /* fig `Frame 206`: the rail lists each distinct year once. */
  const years = useMemo(() => {
    const seen = new Map<string, number>();
    milestones.forEach((m, i) => {
      if (!seen.has(m.year)) seen.set(m.year, i);
    });
    return [...seen.entries()];
  }, []);

  const current = milestones[active];
  const activeYear = current.year;

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-8 lg:p-10">
      {/* fig `Frame 8`: three nested discs bleeding off the top-right */}
      <Discs className="-right-16 -top-24" />

      <div className="relative grid gap-8 lg:grid-cols-[56px_450fr_550fr] lg:gap-10">
        {/* Year rail */}
        <ul className="flex gap-4 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
          {years.map(([year, index]) => (
            <li key={year}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={year === activeYear}
                className={cn(
                  "text-[24px] font-bold leading-[1.1] transition-colors md:text-[30px]",
                  year === activeYear
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-700",
                )}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>

        {/* Story — fig `Frame 203`: month at 30px, year at 30px, body at 20px */}
        <div className="flex flex-col justify-center">
          <p className="text-[24px] font-bold leading-[1.2] text-ink-900 md:text-[30px]">
            {current.month[locale === "id" ? "id" : "en"]}
          </p>
          <p className="text-[36px] font-bold leading-[1.1] text-ink-900 md:text-[48px]">
            {current.year}
          </p>
          <p className="mt-6 max-w-[350px] text-[16px] leading-[1.6] text-ink-900 md:text-[20px]">
            {current.body[locale === "id" ? "id" : "en"]}
          </p>

          {/* Step through the milestones within (and across) the years */}
          <div className="mt-8 flex items-center gap-3">
            {milestones.map((m, i) => (
              <button
                key={`${m.year}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${m.month[locale === "id" ? "id" : "en"]} ${m.year}`}
                aria-current={i === active}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === active ? "w-8 bg-brand-600" : "w-2.5 bg-brand-200",
                )}
              />
            ))}
          </div>
        </div>

        {/* Photo — fig `Frame 204`: 550x536, radius 24 */}
        <div className="relative aspect-[550/536] overflow-hidden rounded-[24px] bg-ink-100">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * fig `Frame 8` — 219/164/110px discs in the three lightest greens, used as
 * a corner ornament on every Company Profile panel.
 */
export function Discs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute hidden lg:block", className)}
    >
      <div className="relative h-[219px] w-[219px] rounded-full bg-brand-50">
        <div className="absolute left-[27px] top-[27px] h-[164px] w-[164px] rounded-full bg-brand-100">
          <div className="absolute left-[27px] top-[27px] h-[110px] w-[110px] rounded-full bg-brand-200" />
        </div>
      </div>
    </div>
  );
}
