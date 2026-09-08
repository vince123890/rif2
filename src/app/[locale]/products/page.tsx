import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { SectionLanding, type LandingRow } from "@/components/layout/section-landing";

const ROUTE = "/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "products", path: ROUTE });
}

/** Product & Service landing — the About-Us shape from `Desktop - 8`. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t] = await Promise.all([
    getTranslations("nav"),
    getTranslations("productsSection"),
  ]);

  const rows: LandingRow[] = [
    {
      key: "investment-financing",
      title: tNav("investment-financing"),
      body: t("investmentFinancing"),
      href: "/products/investment-financing",
      images: ["/images/investment-growth.png"],
    },
    {
      key: "working-capital",
      title: tNav("working-capital"),
      body: t("workingCapital"),
      href: "/products/working-capital",
      images: ["/images/financing-forklift.png", "/images/office-lounge.jpg"],
    },
    {
      key: "factoring",
      title: tNav("factoring"),
      body: t("factoring"),
      href: "/products/factoring",
      images: ["/images/financing-truck.png"],
    },
    {
      key: "sbdp",
      title: tNav("sbdp"),
      body: t("sbdp"),
      href: "/products/sbdp",
      images: ["/images/office-tower.jpg", "/images/team-laptop.jpg"],
    },
  ];

  return (
    <SectionLanding titleKey="products" subtitle={t("heroSubtitle")} rows={rows} />
  );
}
