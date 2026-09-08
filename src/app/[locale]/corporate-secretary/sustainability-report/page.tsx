import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSustainabilityReports } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { ReportGrid } from "@/components/content/report-grid";

const ROUTE = "/corporate-secretary/sustainability-report";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "sustainability-report", path: ROUTE });
}

/** FR-CS-01 — reports grouped per year, with View PDF & Download. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, documents] = await Promise.all([
    getTranslations("nav"),
    getSustainabilityReports(),
  ]);


  return (
    <InnerPage
      titleKey="sustainability-report"
      sectionKey="corporate-secretary"
      sectionHref="/corporate-secretary"
      bare
    >
      <ReportGrid documents={documents} coverLabel={tNav("sustainability-report")} />
    </InnerPage>
  );
}
