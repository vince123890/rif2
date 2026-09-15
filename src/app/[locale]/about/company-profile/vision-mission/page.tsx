import { setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { DetailCard } from "@/components/content/detail-card";
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
 * "Visi Misi" — its own tab in the fig's 9-tab rail, separate from
 * "Sekilas Perusahaan" (see /about/company-profile/at-a-glance, which used
 * to be folded into this same page before the tab rail was corrected).
 *
 * No page in the resolved fig export actually contains Vision/Mission
 * content (searched the full docs/dari_claude_design bundle — see the
 * comment on `.prose-hex` in globals.css), so the card chrome below
 * follows the confirmed `detail` shell (DetailCard, radius 16) but the
 * Mission list's hex bullet is unverified — left as-is rather than
 * guessing a replacement.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const panels = ["vision", "mission"]
    .map((key) => getStaticPage(key))
    .filter((p) => p !== undefined);

  return (
    <CompanyProfilePage route={ROUTE}>
      <div className="space-y-6">
        {panels.map((page) => (
          <DetailCard key={page.key} title={pick(page.title, locale)}>
            <RichText
              html={pick(page.body, locale)}
              className={page.key === "mission" ? "prose-hex" : undefined}
            />
          </DetailCard>
        ))}
      </div>
    </CompanyProfilePage>
  );
}
