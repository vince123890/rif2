import { setRequestLocale } from "next-intl/server";

import { getSbdpDocuments } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { DocumentList } from "@/components/content/document-list";

const ROUTE = "/products/sbdp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "sbdp", path: ROUTE });
}

/** FR-PS-04 — SBDP documents listed per year and per month. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const documents = await getSbdpDocuments();


  return (
    <InnerPage titleKey="sbdp" sectionKey="products" sectionHref="/products">
      <DocumentList documents={documents} groupByMonth />
    </InnerPage>
  );
}
