import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
import { DetailCard } from "@/components/content/detail-card";
import { ZoomableImage } from "@/components/content/zoomable-image";

const ROUTE = "/about/company-profile/organization-structure";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "organization-structure", path: ROUTE });
}

/**
 * "Struktur Organisasi" — its own tab in the fig's 9-tab rail, separate
 * from "Struktur Pemegang Saham" (see /about/company-profile/shareholders).
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");

  return (
    <CompanyProfilePage route={ROUTE}>
      <DetailCard title={tNav("organization-structure")}>
        <ZoomableImage
          src="/images/organization-structure.png"
          alt={tNav("organization-structure")}
          width={1309}
          height={509}
        />
      </DetailCard>
    </CompanyProfilePage>
  );
}
