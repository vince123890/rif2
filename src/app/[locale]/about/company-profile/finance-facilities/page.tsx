import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { Discs } from "@/components/content/journey-timeline";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";

const PAGE_KEY = "finance-facilities";
const ROUTE = "/about/company-profile/finance-facilities";

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
 * "Business & Financing" — `Desktop - 11`.
 *
 * The fig puts the business licence and the financing facilities on this
 * one tab, each in its own white panel (r=24) with the nested discs
 * bleeding off the top-right corner.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const facilities = getStaticPage(PAGE_KEY);
  const licence = getStaticPage("business-license");
  if (!facilities) notFound();

  const panels = [licence, facilities].filter(Boolean);

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <div className="space-y-6">
        {panels.map((page) => (
          <section
            key={page!.key}
            className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-10 lg:p-12"
          >
            <Discs className="-right-16 -top-24" />
            <div className="relative">
              {/* fig `Frame 5`: 32px green section heading */}
              <h2 className="text-[24px] font-bold leading-[1.2] text-brand-600 md:text-[32px]">
                {pick(page!.title, locale)}
              </h2>
              <div className="mt-6">
                <RichText html={pick(page!.body, locale)} />
              </div>
              {page!.document ? (
                <DocumentActions file={page!.document} className="mt-10" />
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </CompanyProfilePage>
  );
}
