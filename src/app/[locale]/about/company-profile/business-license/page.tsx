import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";

const PAGE_KEY = "business-license";
const ROUTE = "/about/company-profile/business-license";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getStaticPage(PAGE_KEY);
  return buildMetadata({
    locale,
    title: pick(page?.title, locale),
    path: ROUTE,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getStaticPage(PAGE_KEY);
  if (!page) notFound();



  return (
    <CompanyProfilePage route={ROUTE}>
      <RichText html={pick(page.body, locale)} />
      {page.document ? <DocumentActions file={page.document} className="mt-10" /> : null}
    </CompanyProfilePage>
  );
}
