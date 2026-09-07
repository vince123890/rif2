import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe } from "lucide-react";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { RichText } from "@/components/ui/rich-text";

const ROUTE = "/about/bank-resona-perdania";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "bank-resona-perdania", path: ROUTE });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getStaticPage("bank-resona-perdania")!;
  const t = await getTranslations("common");


  return (
    <InnerPage titleKey="bank-resona-perdania">
      <RichText html={pick(page.body, locale)} />

      {/* FR-AB-13 — external link to the parent company, new tab */}
      <a
        href={site.external.bankResonaPerdania}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-[12px] border border-ink-200 bg-white px-5 py-3 text-[15px] font-medium text-ink-700 transition-colors hover:border-brand-600 hover:text-brand-600"
      >
        <Globe className="h-4 w-4" aria-hidden />
        {t("clickHere")}
        <span className="sr-only"> ({t("externalLink")})</span>
      </a>
    </InnerPage>
  );
}
