import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { DetailCard } from "@/components/content/detail-card";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";

const PAGE_KEY = "at-a-glance";
const ROUTE = "/about/company-profile/at-a-glance";

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

/**
 * "Sekilas Perusahaan" — fig `detail`
 * (docs/dari_claude_design/project/components/Detail.jsx), figma node
 * 1:4837. This is the tab that file's own hero/tab-rail is actually
 * showing active, so its card content and bullet-ring list marker are
 * transcribed directly from that export rather than approximated.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const panels = [
    PAGE_KEY,
    "at-a-glance-articles",
    "at-a-glance-current-year",
  ]
    .map((key) => getStaticPage(key))
    .filter((p) => p !== undefined);
  if (!panels.length) notFound();

  const main = panels[0];

  return (
    <CompanyProfilePage route={ROUTE}>
      <div className="space-y-6">
        {panels.map((page) => (
          <DetailCard key={page.key} title={pick(page.title, locale)}>
            <RichText html={pick(page.body, locale)} className="prose-ring" />
          </DetailCard>
        ))}
        {main.document ? (
          <DocumentActions file={main.document} className="mt-10" />
        ) : null}
      </div>
    </CompanyProfilePage>
  );
}
