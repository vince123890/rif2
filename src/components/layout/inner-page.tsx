import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { FigHero, FigCrumbs } from "./fig-hero";
import { Discs } from "@/components/content/journey-timeline";

/**
 * Shell for the About-Us children — `Desktop - 15…19` in the fig.
 *
 * All five share one shape: a full-bleed banner with a 96px title, a plain
 * breadcrumb on the patterned ground, then the body in a white panel
 * (r=24) under a 32px green heading, with the nested discs bleeding off
 * the panel's top-right corner. The banner photo is the same asset across
 * the set, so it lives here rather than in each page.
 */
export async function InnerPage({
  /** Route this page sits at, used for the breadcrumb's last crumb. */
  titleKey,
  /** Heading above the body; defaults to the page title. */
  heading,
  /** Pass "\n" to force the fig's two-line banner break. */
  bannerTitle,
  children,
  bare = false,
}: {
  titleKey: string;
  heading?: string;
  bannerTitle?: string;
  children: ReactNode;
  /** Skip the white panel for pages that draw their own cards. */
  bare?: boolean;
}) {
  const tNav = await getTranslations("nav");
  const label = tNav(titleKey);

  return (
    <>
      <FigHero
        variant="bleed"
        title={bannerTitle ?? label}
        image="/images/inner-hero.jpg"
      />

      <div className="relative isolate bg-canvas pb-16 md:pb-24">
        {/* fig `Frame 124`: blossom sheet tiled at 399px, 5% over #F9FAFB */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "url(/brand/blossom-pattern.png)",
            backgroundSize: "399px auto",
            backgroundRepeat: "repeat",
          }}
        />

        <FigCrumbs
          crumbs={[
            { label: tNav("about"), href: "/about" },
            { label },
          ]}
        />

        <div className="container-rif pt-8">
          {bare ? (
            children
          ) : (
            <section className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-10 lg:p-12">
              <Discs className="-right-16 -top-24" />
              <div className="relative">
                {/* fig `Frame 5`: 32px green heading over the body */}
                <h2 className="text-[24px] font-bold leading-[1.2] text-brand-600 md:text-[32px]">
                  {heading ?? label}
                </h2>
                <div className="mt-6">{children}</div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
