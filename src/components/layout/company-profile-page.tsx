import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { FigHero, FigCrumbs, FigTabs } from "./fig-hero";

/**
 * Shell for the Company Profile sections — the fig's shared "detail" page
 * template (docs/dari_claude_design/project/components/Detail.jsx, also
 * reused verbatim by History.jsx/Manajemen1.jsx/Award.jsx for their own
 * topics), figma node 1:4837.
 *
 * That file's tab rail carries 9 tabs, one per child route — not the 6
 * grouped tabs this shell used to assume. "Sekilas Perusahaan" (at-a-glance)
 * and "Visi Misi" (vision-mission) are two separate tabs in the fig, not one
 * combined "Company Overview" tab; "Izin Usaha" (business-license) and
 * "Fasilitas Pembiayaan" (finance-facilities) are each their own tab too.
 */

/** fig: 9 tabs, in the order the two pill rails give them. */
export const COMPANY_PROFILE_TABS = [
  {
    key: "vision-mission",
    href: "/about/company-profile/vision-mission",
    routes: ["/about/company-profile/vision-mission"],
  },
  {
    key: "at-a-glance",
    href: "/about/company-profile/at-a-glance",
    routes: ["/about/company-profile/at-a-glance"],
  },
  {
    key: "history",
    href: "/about/company-profile/history",
    routes: ["/about/company-profile/history"],
  },
  {
    key: "business-license",
    href: "/about/company-profile/business-license",
    routes: ["/about/company-profile/business-license"],
  },
  {
    key: "finance-facilities",
    href: "/about/company-profile/finance-facilities",
    routes: ["/about/company-profile/finance-facilities"],
  },
  {
    key: "management",
    href: "/about/company-profile/management",
    routes: ["/about/company-profile/management"],
  },
  {
    key: "organization-structure",
    href: "/about/company-profile/organization-structure",
    routes: ["/about/company-profile/organization-structure"],
  },
  {
    key: "shareholders",
    href: "/about/company-profile/shareholders",
    routes: ["/about/company-profile/shareholders"],
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
}: {
  route: string;
  children: ReactNode;
}) {
  const tNav = await getTranslations("nav");
  const tCp = await getTranslations("companyProfile");

  const active =
    COMPANY_PROFILE_TABS.find((t) =>
      (t.routes as readonly string[]).includes(route),
    ) ?? COMPANY_PROFILE_TABS[0];

  return (
    <>
      {/*
       * fig `detail` — cream band, title "Profil Perusahaan" in
       * #006F4F (green, not orange), the founding-history subtitle beside
       * it, a photo filling the right half.
       */}
      <FigHero
        variant="cream"
        title={tCp("heroTitle")}
        subtitle={tCp("heroSubtitle")}
        image="/fig/inner-banner.webp"
      />

      {/*
       * There is no seigaiha (or any other) tiled pattern behind this page
       * in the fig — grepped the full resolved export for it and found
       * nothing; the plain ground colour is the whole background. An
       * earlier version painted one in anyway; removed rather than kept
       * as an unverified guess.
       */}
      <div className="relative isolate bg-canvas pb-16 md:pb-24">
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

        {/*
         * fig: each tab's content is its own stack of radius-16 white
         * cards (see e.g. Detail.jsx's three "Sekilas Perusahaan" cards),
         * not one big radius-32 panel wrapping everything — so this shell
         * no longer draws an outer panel; each page's own content supplies
         * its own card(s) at the fig's actual 16px radius.
         */}
        <div className="container-rif pt-6">{children}</div>
      </div>
    </>
  );
}
