import { setRequestLocale } from "next-intl/server";

import { getAwards } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { AwardGrid } from "@/components/content/award-grid";

const ROUTE = "/about/company-profile/award";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "award", path: ROUTE });
}

/**
 * Award — the fig names this tab but never draws it, so the carousel
 * borrows the board composition from `Desktop - 12`.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const awards = await getAwards();

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <AwardGrid awards={awards} />
    </CompanyProfilePage>
  );
}
