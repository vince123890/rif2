import { getTranslations, setRequestLocale } from "next-intl/server";

import { FigHero } from "@/components/layout/fig-hero";
import { FigMenuRows, type MenuRow } from "@/components/layout/fig-menu-rows";
import { buildMetadata } from "@/lib/seo";

/**
 * About Us — `Desktop - 8` in the fig ("about page").
 *
 * A card banner, then six full-width rows that alternate side: the copy
 * sits right over a pair of overlapping photos on odd rows, and left of a
 * single tall photo on even rows. Even rows also take a white ground,
 * which is what breaks up the flat #F9FAFB page.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("heroTitle"),
    description: t("heroSubtitle"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tc = await getTranslations("common");

  /*
   * fig `list menu` lists five children, in this order. Each cluster takes
   * three photos (`Group 169` stacks three cards).
   */
  const rows: MenuRow[] = [
    {
      key: "managementMessage",
      title: t("tManagementMessage"),
      body: t("managementMessage"),
      href: "/about/management-message",
      images: [
        "/images/management-board.jpg",
        "/images/team-laptop.jpg",
        "/images/office-lounge.jpg",
      ],
    },
    {
      key: "companyProfile",
      title: t("tCompanyProfile"),
      body: t("companyProfile"),
      href: "/about/company-profile/vision-mission",
      images: [
        "/images/office-tower.jpg",
        "/images/team-laptop.jpg",
        "/images/office-lounge.jpg",
      ],
    },
    {
      key: "csr",
      title: t("tCsr"),
      body: t("csr"),
      href: "/about/csr",
      images: [
        "/images/csr-tree-planting.jpg",
        "/images/team-batik.png",
        "/images/library-study.jpg",
      ],
    },
    {
      key: "privacy",
      title: t("tPrivacy"),
      body: t("privacy"),
      href: "/about/privacy",
      images: [
        "/images/privacy-policy.jpg",
        "/images/reading-lamp.jpg",
        "/images/library-study.jpg",
      ],
    },
    {
      key: "bankResona",
      title: t("tBankResona"),
      body: t("bankResona"),
      href: "/about/bank-resona-perdania",
      images: [
        "/images/office-lounge.jpg",
        "/images/office-tower.jpg",
        "/images/management-board.jpg",
      ],
    },
  ];

  return (
    <>
      <FigHero
        variant="green"
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        image="/fig/menu-hero.png"
      />

      {/* fig `list menu`: five alternating rows on the plain ground */}
      <div className="bg-canvas py-16 md:py-[100px]">
        <FigMenuRows rows={rows} cta={tc("readMore")} />
      </div>
    </>
  );
}
