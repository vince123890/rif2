import { getTranslations, setRequestLocale } from "next-intl/server";

import { getFinancialReports } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { ReportGrid } from "@/components/content/report-grid";

const ROUTE = "/corporate-secretary/financial-report";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "financial-report", path: ROUTE });
}

/** FR-CS-02 — audited reports with a "Sort by Year" filter (All / per year). */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, documents] = await Promise.all([
    getTranslations("nav"),
    getFinancialReports(),
  ]);


  return (
    <InnerPage
      titleKey="financial-report"
      sectionKey="corporate-secretary"
      sectionHref="/corporate-secretary"
      bare
    >
      <ReportGrid documents={documents} coverLabel={tNav("financial-report")} />
    </InnerPage>
  );
}
