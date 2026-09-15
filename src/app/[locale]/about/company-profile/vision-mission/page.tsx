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
 * No page in the resolved fig export actually contains Vision/Mission body
 * text (confirmed by decoding docs/Resona_Indonesia_Finance.fig directly —
 * zstd + Kiwi, not just the resolved JSX bundle — and searching all
 * 39,700+ extracted strings for "Visi"/"Misi"/"Vision"/"Mission": only the
 * "Visi Misi" tab label exists, four times, always a bare nav item with no
 * attached body). The Mission list's bullet marker was a hexagon
 * (.prose-hex) that turned out to have the same problem: a second decode
 * pass searched the whole file's layer names for anything
 * hexagon/polygon-shaped and found none — the file's entire vector
 * vocabulary is Ellipse/Rectangle/Line/Vector, nothing else, so a hexagon
 * bullet has no basis here either. The only bullet actually confirmed
 * in the file is the ring icon already used on at-a-glance /
 * business-license / finance-facilities (`.prose-ring`, ellipse-based —
 * see Detail.jsx), so the Mission list uses that one too now rather than
 * a shape with no source at all.
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
              className={page.key === "mission" ? "prose-ring" : undefined}
            />
          </DetailCard>
        ))}
      </div>
    </CompanyProfilePage>
  );
}
