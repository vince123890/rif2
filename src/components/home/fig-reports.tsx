"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export type FigReport = {
  year: string;
  title: string;
  downloadHref: string;
  viewHref: string;
};

/**
 * Reports block — fig `Rectangle 113/117/120` and `Frame 82`.
 *
 * Geometry from the decoded tree:
 *   - `Frame 82`      : a 485×76 #EEEFF0 pill at radius 100 holding two
 *                       tabs; the active one is a 242×44 #F58220 pill
 *   - `Rectangle 113` : 410×480 white card, radius 32, at x=80/514/948
 *                       (i.e. a 3-up grid on a 24px gutter)
 *   - `Rectangle 116` : a 286×96 #F2F8F6 plate behind the year
 *   - `Rectangle 34`  : a 134×189 pattern block at 30% opacity, top-right
 *   - the year        : 80px Lato *Black Italic* in #006F4F
 *   - `Line 5`        : 80×4 #F58220 rule under the title
 *   - `Frame 127`     : Download (outlined) + View PDF (plain) buttons,
 *                       64px tall at radius 12
 */
export function FigReports({
  tabs,
  reports,
  downloadLabel,
  viewLabel,
}: {
  tabs: { key: string; label: string }[];
  reports: Record<string, FigReport[]>;
  downloadLabel: string;
  viewLabel: string;
}) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const list = reports[active] ?? [];

  return (
    <div>
      {/*
       * fig `Frame 82`: 485×76 at r=100, filled #EEEFF0 at **10%** with a
       * GLASS effect — a near-transparent rail, not a solid grey pill. The
       * active tab (`Frame 4`) is 242×44 filled #F58220, its label 20px
       * Lato Bold white; the inactive one is unfilled with #0F0F0F type.
       */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 rounded-full bg-[#EEEFF0]/10 p-4 backdrop-blur-[6px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              aria-pressed={active === tab.key}
              className={cn(
                "rounded-full px-5 py-[5px] text-[16px] leading-[1.7] transition-colors duration-200 md:text-[20px]",
                active === tab.key
                  ? "bg-accent-500 font-bold text-white"
                  : "text-ink-900 hover:bg-black/5",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* fig: three 410×480 cards on a 24px gutter */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <Reveal key={`${active}-${r.year}`} delay={i * 90}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] lg:p-[24px]">
              {/*
               * fig `Rectangle 34`: a blossom pattern block at 30% opacity
               * in the card's top-right corner.
               */}
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
                  {r.year}
                </p>
              </div>

              <h3 className="mt-10 text-[22px] font-bold leading-none text-ink-900 md:text-[28px]">
                {r.title}
              </h3>

              {/*
               * fig `Line 5`: an 80×4 orange rule at x=411 — flush with the
               * card's right edge (card spans 80–490), not under the title.
               */}
              <span
                aria-hidden
                className="mt-6 ml-auto block h-1 w-20 bg-accent-500"
              />

              {/* fig `Frame 127`: 64px-tall actions at radius 12 */}
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <a
                  href={r.downloadHref}
                  download
                  className="inline-flex h-14 items-center gap-3 rounded-[12px] border border-brand-600 px-6 text-[16px] leading-[1.7] text-brand-600 transition-colors duration-200 hover:bg-brand-50 md:text-[20px]"
                >
                  <Download className="h-6 w-6 text-accent-500" aria-hidden />
                  {downloadLabel}
                </a>

                <a
                  href={r.viewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-3 rounded-[12px] px-6 text-[16px] leading-[1.7] text-brand-600 transition-colors duration-200 hover:bg-brand-50 md:text-[20px]"
                >
                  <PdfIcon />
                  {viewLabel}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
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
