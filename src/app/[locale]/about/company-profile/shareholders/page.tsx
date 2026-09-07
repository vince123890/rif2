import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { RichText } from "@/components/ui/rich-text";
import { ZoomableImage } from "@/components/content/zoomable-image";
import { DocumentActions } from "@/components/content/document-actions";

const PAGE_KEY = "shareholders";
const ROUTE = "/about/company-profile/shareholders";

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
      {/* fig `image 7`: the ownership split is flat artwork, not markup. */}
      <ZoomableImage
        src="/images/shareholders-structure.png"
        alt={pick(page.title, locale)}
        width={801}
        height={340}
      />
      <div className="mt-8">
        <RichText html={pick(page.body, locale)} />
      </div>
      {page.document ? <DocumentActions file={page.document} className="mt-10" /> : null}
    </CompanyProfilePage>
  );
}
