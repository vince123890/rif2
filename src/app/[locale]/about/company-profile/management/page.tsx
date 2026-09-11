import { setRequestLocale } from "next-intl/server";

import { getManagement } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { ManagementGrid } from "@/components/content/management-grid";
import { FigHeading } from "@/components/ui/fig-heading";

const ROUTE = "/about/company-profile/management";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "management", path: ROUTE });
}

/**
 * FR-AB-07 — Board of Commissioners and Board of Directors.
 *
 * `Desktop - 12` gives each board its own orange heading and its own
 * carousel of portrait cards, rather than the flat grid this page used.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const people = await getManagement();

  const boards = [
    {
      key: "commissioners" as const,
      /* fig sets a 16px orange eyebrow over each 40px board title. */
      eyebrow: "KOMISARIS",
      title: locale === "id" ? "Dewan Komisaris" : "Board of Commissioners",
    },
    {
      key: "directors" as const,
      eyebrow: "DIREKSI",
      title: locale === "id" ? "Dewan Direksi" : "Board of Directors",
    },
  ];

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <div className="space-y-20">
        {boards.map((board) => {
          const members = people.filter((p) => p.board === board.key);
          if (!members.length) return null;

          return (
            <section key={board.key}>
              {/*
               * fig: an eyebrow over a 40px Bold title, both centred, with
               * the gradient rule and end dot either side.
               */}
              <FigHeading
                eyebrow={board.eyebrow}
                title={board.title}
              />

              <div className="mt-12">
                <ManagementGrid
                  people={members}
                  locale={locale}
                  detailLabel={board.title}
                />
              </div>
            </section>
          );
        })}
      </div>
    </CompanyProfilePage>
  );
}
