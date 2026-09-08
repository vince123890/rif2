import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { SectionLanding, type LandingRow } from "@/components/layout/section-landing";

const ROUTE = "/gcg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "gcg", path: ROUTE });
}

/**
 * Good Corporate Governance landing — the About-Us shape from `Desktop - 8`,
 * one row per child with its own "Learn More".
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t] = await Promise.all([
    getTranslations("nav"),
    getTranslations("gcg"),
  ]);

  const rows: LandingRow[] = [
    {
      key: "anti-fraud",
      title: tNav("anti-fraud"),
      body: t("antiFraud"),
      href: "/gcg/anti-fraud",
      images: ["/images/office-tower.jpg", "/images/team-laptop.jpg"],
    },
    {
      key: "integrity-pact",
      title: tNav("integrity-pact"),
      body: t("integrityPact"),
      href: "/gcg/integrity-pact",
      images: ["/images/management-board.jpg"],
    },
    {
      key: "good-corporate-governance",
      title: tNav("good-corporate-governance"),
      body: t("goodCorporateGovernance"),
      href: "/gcg/good-corporate-governance",
      images: ["/images/office-lounge.jpg", "/images/team-batik.png"],
    },
    {
      key: "aml-cft",
      title: tNav("aml-cft"),
      body: t("amlCft"),
      href: "/gcg/aml-cft",
      images: ["/images/privacy-policy.jpg"],
    },
  ];

  return (
    <SectionLanding titleKey="gcg" subtitle={t("heroSubtitle")} rows={rows} />
  );
}
