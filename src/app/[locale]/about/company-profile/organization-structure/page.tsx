import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { CompanyProfilePage } from "@/components/layout/company-profile-page";
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
 * "Organization & Shareholder Structure".
 *
 * The fig draws both charts as flat artwork (`image 6` at 1309x509 and
 * `image 7` at 801x340 on the "Assets & Benchmark" canvas), each in its own
 * white panel under a 32px green heading — so both are shipped as the
 * exported images rather than rebuilt in markup.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");

  const panels = [
    {
      key: "organization-structure" as const,
      src: "/images/organization-structure.png",
      width: 1309,
      height: 509,
    },
    {
      key: "shareholders" as const,
      src: "/images/shareholders-structure.png",
      width: 801,
      height: 340,
    },
  ];

  return (
    <CompanyProfilePage route={ROUTE} bare>
      <div className="space-y-6">
        {panels.map((panel) => (
          <section
            key={panel.key}
            className="relative overflow-hidden rounded-[24px] bg-white p-6 md:p-10 lg:p-12"
          >
            <div className="relative">
              {/* fig `Frame 5`: a 5px green rule down the left of every heading */}
              <h2 className="border-l-[5px] border-brand-600 pl-6 text-[24px] font-bold leading-[1.2] text-brand-600 md:text-[32px]">
                {tNav(panel.key)}
              </h2>
              <div className="mt-6">
                <ZoomableImage
                  src={panel.src}
                  alt={tNav(panel.key)}
                  width={panel.width}
                  height={panel.height}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </CompanyProfilePage>
  );
}
