import { setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { JourneyTimeline } from "@/components/content/journey-timeline";

const ROUTE = "/about/company-profile/history";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "history", path: ROUTE });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* fig `Desktop - 10`: the whole tab is the journey card, nothing else. */
  return (
    <CompanyProfilePage route={ROUTE} bare>
      <JourneyTimeline image="/images/office-tower.jpg" />
    </CompanyProfilePage>
  );
}
