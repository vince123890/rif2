import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { Discs } from "@/components/content/journey-timeline";
import { RichText } from "@/components/ui/rich-text";

const ROUTE = "/about/company-profile/vision-mission";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getStaticPage("vision");
  return buildMetadata({
    locale,
    title: pick(page?.title, locale),
    path: ROUTE,
  });
}

/**
 * "Company Overview" — `Desktop - 9`.
 *
 * The fig gives Vision, Mission and Company At A Glance a white panel each
 * rather than running them together under one heading, so this tab draws
 * three cards.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const panels = ["vision", "mission", "at-a-glance"]
    .map((key) => getStaticPage(key))
    .filter((p) => p !== undefined);

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <div className="space-y-6">
        {panels.map((page) => (
          <section
            key={page.key}
            className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-10 lg:p-12"
          >
            <Discs className="-right-16 -top-24" />
            <div className="relative">
              {/* fig `Frame 5`: 32px green heading behind a 5px green rule */}
              <h2 className="border-l-[5px] border-brand-600 pl-6 text-[24px] font-bold leading-[1.2] text-brand-600 md:text-[32px]">
                {pick(page.title, locale)}
              </h2>
              <div className="mt-6">
                {/* fig: only the Mission list takes the hex bullets */}
                <RichText
                  html={pick(page.body, locale)}
                  className={page.key === "mission" ? "prose-hex" : undefined}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </CompanyProfilePage>
  );
}
