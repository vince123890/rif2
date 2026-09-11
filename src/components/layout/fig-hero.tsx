import Image from "next/image";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page banner. The fig draws two variants, and they differ by more
 * than styling — the ground, the title colour and the photo placement all
 * change:
 *
 *   "cream" (`detail` / `award` / `news` / `list doc`) — `Rectangle 108`,
 *           a 1440×900 #F8F3EF band with a 720×744 photo filling the right
 *           half. Title is 60px Lato Bold in #006F4F, the lead 20px in
 *           #6E6E6E, and an 80×4 orange rule with a 12px dot sits above
 *           the title. The header pill over this variant is solid green.
 *
 *   "green" (`list menu`) — `Rectangle 108`, a flat 1440×800 #027756 band
 *           with an oversized pale blossom off the left edge, the title
 *           and lead both white, and a 1280×368 photo card beneath them.
 *           The header pill over this variant is white.
 */
export function FigHero({
  title,
  subtitle,
  variant = "cream",
  image,
}: {
  /** Rendered as-is; pass "\n" to force a hard break. */
  title: string;
  subtitle?: string;
  variant?: "cream" | "green";
  image?: string;
}) {
  if (variant === "green") {
    return (
      /* fig `list menu` — `Rectangle 108`, 1440×800 #027756 */
      <section className="relative isolate overflow-hidden bg-[#027756]">
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
          {/* fig `Group 168`: 60px title left, 20px lead right */}
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
              src={image ?? "/fig/menu-hero.png"}
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

  return (
    /*
     * fig `detail` — `Rectangle 108`, a 1440×900 #F8F3EF band. The photo
     * fills the right half and runs to the top of the page, with the green
     * header pill floating over it.
     */
    <section className="relative isolate overflow-hidden bg-[#F8F3EF]">
      {/* fig `Mask group` / `image 165`: 720×744 filling the right half */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
      >
        <Image
          src={image ?? "/fig/inner-banner.webp"}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        {/* Feathered edge so the photo melts into the cream ground */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8F3EF] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-14 pt-[150px] sm:px-8 lg:px-20 lg:pb-[90px] lg:pt-[190px]">
        <div className="lg:max-w-[590px]">
          {/* fig `Line 1` + `Ellipse 10`: an 80×4 orange rule with a dot */}
          <span aria-hidden className="flex items-center gap-2">
            <span className="block h-1 w-20 bg-accent-500" />
            <span className="block h-3 w-3 rounded-full bg-accent-500" />
          </span>

          {/* fig: 60px Lato Bold in #006F4F, 100% line box */}
          <h1 className="mt-5 whitespace-pre-line text-[34px] font-bold leading-none text-brand-600 md:text-[46px] lg:text-[60px]">
            {title}
          </h1>

          {subtitle ? (
            /* fig: 20px Lato Regular in #6E6E6E, 550px wide */
            <p className="mt-6 max-w-[550px] text-[16px] leading-[1.5] text-ink-500 md:text-[20px]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Photo stacks under the copy below lg, where there is no right half */}
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:hidden">
          <Image
            src={image ?? "/fig/inner-banner.webp"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Breadcrumb — fig `Frame 26809`: a row of 56px-tall pills, not plain text.
 * Every crumb but the last is a #FBFBFB pill in black; the current page is
 * a #006F4F pill in white, with a chevron between each.
 */
export function FigCrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs.length) return null;

  return (
    <div className="container-rif pt-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-3">
          {crumbs.map((c, i) => {
            const current = i === crumbs.length - 1;

            return (
              <li key={c.label} className="flex items-center gap-3">
                {i > 0 ? (
                  <ChevronIcon />
                ) : null}

                {c.href && !current ? (
                  <Link
                    href={c.href}
                    className="inline-flex h-14 items-center rounded-full bg-[#FBFBFB] px-6 text-[15px] text-ink-900 shadow-sm transition-colors hover:bg-white md:text-[16px]"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex h-14 items-center rounded-full px-6 text-[15px] md:text-[16px]",
                      current
                        ? "bg-brand-600 text-white"
                        : "bg-[#FBFBFB] text-ink-900 shadow-sm",
                    )}
                  >
                    {c.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

/** fig `akar-icons:chevron-right-small`: a 6×12 stroke in the crumb row. */
function ChevronIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 shrink-0 text-ink-900"
    >
      <path
        d="M10 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Tab rail — fig `Frame 82`: a 76px #EEEFF0 pill at radius 100 holding the
 * section's pages, the current one filled #F58220 with white type. The fig
 * wraps the set onto a second rail when it runs long, which the flex wrap
 * here reproduces.
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
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-[38px] bg-[#EEEFF0] p-4">
        {tabs.map((tab) => {
          const active = tab.href === current;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2.5 text-center text-[15px] leading-[1.7] transition-colors md:text-[18px] lg:text-[20px]",
                active
                  ? "bg-accent-500 font-bold text-white"
                  : "text-ink-900 hover:bg-black/5",
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
