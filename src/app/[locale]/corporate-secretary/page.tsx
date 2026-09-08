import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { SectionLanding, type LandingRow } from "@/components/layout/section-landing";

const ROUTE = "/corporate-secretary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "corporate-secretary", path: ROUTE });
}

/** Corporate Secretary landing — the About-Us shape from `Desktop - 8`. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t] = await Promise.all([
    getTranslations("nav"),
    getTranslations("corporateSecretary"),
  ]);

  const rows: LandingRow[] = [
    {
      key: "sustainability-report",
      title: tNav("sustainability-report"),
      body: t("sustainabilityReport"),
      href: "/corporate-secretary/sustainability-report",
      images: ["/images/csr-tree-planting.jpg", "/images/team-batik.png"],
    },
    {
      key: "financial-report",
      title: tNav("financial-report"),
      body: t("financialReport"),
      href: "/corporate-secretary/financial-report",
      images: ["/images/investment-growth.png"],
    },
    {
      key: "business-strategy",
      title: tNav("business-strategy"),
      body: t("businessStrategy"),
      href: "/corporate-secretary/business-strategy",
      images: ["/images/office-tower.jpg", "/images/team-laptop.jpg"],
    },
  ];

  return (
    <SectionLanding
      titleKey="corporate-secretary"
      subtitle={t("heroSubtitle")}
      rows={rows}
    />
  );
}
