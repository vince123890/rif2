import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";

const PAGE_KEY = "good-corporate-governance";
const ROUTE = "/gcg/good-corporate-governance";

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
    <InnerPage titleKey="good-corporate-governance" sectionKey="gcg" sectionHref="/gcg">
      <RichText html={pick(page.body, locale)} />
      {page.document ? <DocumentActions file={page.document} className="mt-10" /> : null}
    </InnerPage>
  );
}
