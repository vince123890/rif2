import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page banner as drawn in the fig.
 *
 * The file uses two variants, and they differ by more than styling:
 *
 *   "card"   (`Desktop - 7` inside `Desktop - 8`) — a 1416x668 rounded
 *            card (r=36) inset from the page edge, title centred in white
 *            at 96px over a subtitle.
 *
 *   "bleed"  (`Desktop - 5` inside `Desktop - 9…12`) — a full-bleed
 *            1440x600 band, title left-aligned in orange at 96px, no
 *            subtitle, with the breadcrumb sitting *below* the band.
 *
 * Both lay a #0F0F0F wash at 80% over the photo.
 */
export function FigHero({
  title,
  subtitle,
  image = "/fig/menu-hero.png",
}: {
  /** Rendered as-is; pass "\n" to force a hard break. */
  title: string;
  subtitle?: string;
  image?: string;
  /**
   * Kept for callers that still pass it; the fig now draws one banner for
   * every inner page, so the variant no longer changes anything.
   */
  variant?: "card" | "bleed";
}) {
  return (
    /*
     * fig `list menu` / `Rectangle 108`: a flat 1440×800 #037756 band that
     * runs to the top of the page with the nav pill floating over it, with
     * an oversized pale blossom bleeding out of the left edge.
     *
     *   - `Group 168`  : 60px Lato Bold title at (80, 190), 20px lead at
     *                    x=675 on the same row
     *   - `Mask group` : a 1280×368 photo card at (80, 352), radius 32
     */
    <section className="relative isolate overflow-hidden bg-[#037756]">
      {/* fig `Group 30`: a 1262px blossom in #F1F5F5, off the left edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[26%] -top-[62%] block h-[1262px] w-[1262px] bg-[#F1F5F5] opacity-[0.10]"
        style={{
          WebkitMaskImage: "url(/brand/resona-blossom.png)",
          maskImage: "url(/brand/resona-blossom.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 pt-[150px] sm:px-8 lg:px-20 lg:pb-[80px] lg:pt-[190px]">
        {/* fig `Group 168`: title left, lead right, on one 1280px row */}
        <div className="grid gap-6 lg:grid-cols-[590fr_605fr] lg:items-start lg:gap-[85px]">
          <h1 className="whitespace-pre-line text-[36px] font-bold leading-none text-white md:text-[48px] lg:text-[60px]">
            {title}
          </h1>

          {subtitle ? (
            <p className="max-w-[605px] text-[16px] leading-[1.5] text-white md:text-[20px]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* fig `Mask group`: the 1280×368 photo card, radius 32 */}
        <div className="relative mt-10 aspect-[1280/368] w-full overflow-hidden rounded-[32px] lg:mt-[50px]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Breadcrumb — fig `Frame 73`: a 226x48 row with *no* fill, set in #0F0F0F
 * on the page ground just under the banner. (Only `Desktop - 9` sets it in
 * white, left over from when it sat inside the photo.)
 */
export function FigCrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs.length) return null;

  return (
    <div className="container-rif pt-8">
      <nav aria-label="Breadcrumb">
        <ol className="inline-flex items-center gap-2 text-[16px] text-ink-900">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 ? (
                <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden />
              ) : null}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-brand-600">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

/**
 * Tab rail — fig `Frame 83`: pills inside a white pill (r=34), the active
 * one filled #F58220 with white type. Here the tabs are links, since RIF
 * keeps one URL per company-profile section.
 */
export function FigTabs({
  tabs,
  current,
}: {
  tabs: { label: string; href: string }[];
  current: string;
}) {
  return (
    <div className="container-rif pt-6">
      {/*
       * fig `Frame 83`: one rail holding every pill. The six labels have to
       * fit the 1312px container without a scrollbar, so the rail wraps and
       * the type steps down a notch rather than overflowing. Its own fill is
       * white at 5% — nearly the page ground, just enough to read as a rail.
       */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-[34px] bg-white/5 p-2 lg:flex-nowrap lg:gap-x-0.5">
        {tabs.map((tab) => {
          const active = tab.href === current;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2.5 text-center text-[14px] transition-colors md:text-[16px] lg:px-3 xl:px-4 xl:text-[17px]",
                active
                  ? "bg-accent-500 font-bold text-white"
                  : "text-ink-900 hover:bg-white/60",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
