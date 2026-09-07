import { setRequestLocale } from "next-intl/server";

import { getManagement } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { ManagementCarousel } from "@/components/content/management-carousel";

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
      title: locale === "id" ? "Dewan Komisaris" : "Board of Commissioners",
    },
    {
      key: "directors" as const,
      title: locale === "id" ? "Dewan Direksi" : "Board of Directors",
    },
  ];

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <div className="space-y-16">
        {boards.map((board) => {
          const members = people.filter((p) => p.board === board.key);
          if (!members.length) return null;

          return (
            <section key={board.key}>
              {/* fig `Frame 138/214`: 30px orange, centred over the carousel */}
              <h2 className="text-center text-[24px] font-bold text-accent-500 md:text-[30px]">
                {board.title}
              </h2>
              <div className="mt-8">
                <ManagementCarousel people={members} />
              </div>
            </section>
          );
        })}
      </div>
    </CompanyProfilePage>
  );
}
