import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { FigHero, FigCrumbs, FigTabs } from "./fig-hero";
import { Discs } from "@/components/content/journey-timeline";

/**
 * Shell for the Company Profile sections — `Desktop - 9…12` in the fig.
 *
 * The fig draws these as one page with six tabs. RIF keeps a URL per
 * section, so the rail is rendered as links and the active pill is
 * whichever route is showing. Sections the fig folds into one tab share
 * that tab: "Company Overview" covers vision/mission, at-a-glance and the
 * business licence, and "Business & Financing" covers finance facilities.
 */

/** fig `Frame 106`, left to right. */
export const COMPANY_PROFILE_TABS = [
  {
    key: "overview",
    href: "/about/company-profile/vision-mission",
    /** Routes that light this pill up. */
    routes: [
      "/about/company-profile/vision-mission",
      "/about/company-profile/at-a-glance",
      "/about/company-profile/business-license",
    ],
  },
  {
    key: "journey",
    href: "/about/company-profile/history",
    routes: ["/about/company-profile/history"],
  },
  {
    key: "business",
    href: "/about/company-profile/finance-facilities",
    routes: ["/about/company-profile/finance-facilities"],
  },
  {
    key: "management",
    href: "/about/company-profile/management",
    routes: ["/about/company-profile/management"],
  },
  {
    key: "structure",
    href: "/about/company-profile/organization-structure",
    routes: [
      "/about/company-profile/organization-structure",
      "/about/company-profile/shareholders",
    ],
  },
  {
    key: "award",
    href: "/about/company-profile/award",
    routes: ["/about/company-profile/award"],
  },
] as const;

export async function CompanyProfilePage({
  route,
  children,
  bare = false,
}: {
  route: string;
  children: ReactNode;
  /**
   * Skip the white panel — for tabs that draw their own card, like the
   * journey timeline in `Desktop - 10`.
   */
  bare?: boolean;
}) {
  const tNav = await getTranslations("nav");
  const tCp = await getTranslations("companyProfile");

  const active =
    COMPANY_PROFILE_TABS.find((t) =>
      (t.routes as readonly string[]).includes(route),
    ) ?? COMPANY_PROFILE_TABS[0];

  return (
    <>
      {/* fig `Desktop - 5`: full-bleed band, title orange over two lines */}
      <FigHero
        variant="bleed"
        title={tCp("heroTitle")}
        image="/images/inner-hero.jpg"
      />

      {/*
       * fig: the page ground is #F9FAFB with the blossom sheet tiled over
       * it as a PATTERN fill at 5% — the wash behind the breadcrumb, the
       * tab rail and the gaps between panels.
       */}
      <div className="relative isolate bg-canvas pb-16 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "url(/brand/blossom-pattern.png)",
            /*
             * fig `Frame 124`: the PATTERN fill draws a 1330x1183 tile at
             * scale 0.3, i.e. 399x355 on the page. The asset ships at 2x.
             */
            backgroundSize: "399px auto",
            backgroundRepeat: "repeat",
          }}
        />

        <FigCrumbs
          crumbs={[
            { label: tNav("about"), href: "/about" },
            { label: tNav("company-profile") },
          ]}
        />

        <FigTabs
          current={active.href}
          tabs={COMPANY_PROFILE_TABS.map((t) => ({
            label: tCp(`tab-${t.key}`),
            href: t.href,
          }))}
        />

        {/* fig `Frame 12`: white panel, radius 24, inset 64px from the edge */}
        <div className="container-rif pt-6">
          {bare ? (
            children
          ) : (
            <div className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-10 lg:p-12">
              {/* fig `Frame 8`: nested discs bleeding off the top-right */}
              <Discs className="-right-16 -top-24" />
              <div className="relative">{children}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
