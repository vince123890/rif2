"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, User } from "lucide-react";

import type { Person } from "@/lib/content";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Board carousel — `Frame 210` in `Desktop - 12`.
 *
 * Three cards fan out from the centre at falling scale: the focused card is
 * 437x650 (r=21), its neighbours 328x488 (r=15.7) and 218x325 (r=10.5) —
 * i.e. 0.75 and 0.5 of the lead. Each card is a portrait over a white
 * caption strip carrying the name, the role and a green "Detail" pill.
 * Arrows (64px, #006F4F) and dots sit beneath.
 */
export function ManagementCarousel({ people }: { people: Person[] }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [active, setActive] = useState(0);

  if (!people.length) return null;

  const go = (next: number) =>
    setActive((next + people.length) % people.length);

  /** Position of a card relative to the focused one, wrapped both ways. */
  const offsetOf = (i: number) => {
    const raw = i - active;
    const half = people.length / 2;
    if (raw > half) return raw - people.length;
    if (raw < -half) return raw + people.length;
    return raw;
  };

  return (
    <div>
      <div className="relative flex h-[420px] items-center justify-center md:h-[560px] lg:h-[650px]">
        {people.map((person, i) => {
          const offset = offsetOf(i);
          const distance = Math.abs(offset);
          if (distance > 2) return null;

          /* fig: 1 → 0.75 → 0.5, sliding out by roughly 60% of the width */
          const scale = distance === 0 ? 1 : distance === 1 ? 0.75 : 0.5;
          const shift = offset * 62;

          return (
            <button
              key={person.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={person.name}
              aria-current={distance === 0}
              tabIndex={distance === 0 ? 0 : -1}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${shift}%) scale(${scale})`,
                zIndex: 10 - distance,
                opacity: distance === 2 ? 0.85 : 1,
              }}
            >
              <article className="w-[300px] overflow-hidden rounded-[21px] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] md:w-[380px] lg:w-[437px]">
                <div className="relative aspect-[415/524] bg-ink-100">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 437px, 70vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-ink-300">
                      <User className="h-16 w-16" aria-hidden />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 p-4 lg:p-5">
                  <div className="min-w-0 text-left">
                    <p className="truncate text-[18px] font-bold leading-[1.2] text-ink-700 lg:text-[26px]">
                      {person.name}
                    </p>
                    <p className="truncate text-[11px] leading-[1.3] text-ink-700 lg:text-[14px]">
                      {pick(person.position, locale)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-600 px-4 py-2 text-[12px] font-bold text-white lg:text-[17px]">
                    {t("detail")}
                  </span>
                </div>
              </article>
            </button>
          );
        })}
      </div>

      {/* fig `Frame 161`: 64px green arrows either side of a row of dots */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label={t("previous")}
          className="grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white transition-transform hover:-translate-x-0.5"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {people.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={p.name}
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
          className="grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white transition-transform hover:translate-x-0.5"
        >
          <ArrowRight className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </div>
  );
}
