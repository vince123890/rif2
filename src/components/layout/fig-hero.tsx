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
  variant = "bleed",
  image = "/images/office-tower.jpg",
}: {
  /** Rendered as-is; pass "\n" to force the fig's two-line break. */
  title: string;
  subtitle?: string;
  variant?: "card" | "bleed";
  image?: string;
}) {
  const photo = (
    <>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* fig: #0F0F0F at 80% — a flat wash, not a gradient */}
      <div aria-hidden className="absolute inset-0 bg-[#0F0F0F]/80" />
    </>
  );

  if (variant === "card") {
    return (
      /* Photo runs to the top of the page with the nav floating over it. */
      <section className="bg-canvas">
        <div className="relative isolate overflow-hidden">
          {photo}
          <div className="relative flex min-h-[380px] flex-col items-center justify-center px-6 py-20 pt-32 text-center md:min-h-[520px] lg:min-h-[668px] lg:pt-40">
            <h1 className="max-w-[900px] text-[44px] font-bold leading-[1.12] text-white md:text-[68px] lg:text-[96px]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 max-w-[679px] text-[16px] font-bold leading-[1.2] text-white md:text-[20px] lg:text-[24px]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    /*
     * fig `Desktop - 5`: a full-bleed 1440x600 band that runs to the top of
     * the page with the nav pill floating over it — the same treatment the
     * homepage hero gets, so the two read as one system. The band's own
     * top padding keeps the title clear of the pill.
     */
    <section className="relative isolate">
      {photo}
      <div className="container-rif relative flex min-h-[380px] flex-col justify-center py-20 pt-32 md:min-h-[480px] lg:min-h-[600px] lg:pt-40">
        {/* fig: orange, left-aligned, hard line break kept from the design */}
        <h1 className="whitespace-pre-line text-[44px] font-bold leading-[1.12] text-accent-500 md:text-[68px] lg:text-[96px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-[679px] text-[16px] font-bold leading-[1.2] text-white md:text-[24px]">
            {subtitle}
          </p>
        ) : null}
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
