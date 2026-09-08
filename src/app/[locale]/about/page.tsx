import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FigHero } from "@/components/layout/fig-hero";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * About Us — `Desktop - 8` in the fig ("about page").
 *
 * A card banner, then six full-width rows that alternate side: the copy
 * sits right over a pair of overlapping photos on odd rows, and left of a
 * single tall photo on even rows. Even rows also take a white ground,
 * which is what breaks up the flat #F9FAFB page.
 */

type Row = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** fig: odd rows put the copy on the right, even rows on the left. */
  copy: "left" | "right";
  images: string[];
};

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

  const rows: Row[] = [
    {
      key: "companyProfile",
      title: t("tCompanyProfile"),
      body: t("companyProfile"),
      href: "/about/company-profile/vision-mission",
      copy: "right",
      images: ["/images/office-tower.jpg", "/images/team-laptop.jpg"],
    },
    {
      key: "csr",
      title: t("tCsr"),
      body: t("csr"),
      href: "/about/csr",
      copy: "left",
      images: ["/images/csr-tree-planting.jpg"],
    },
    {
      key: "privacy",
      title: t("tPrivacy"),
      body: t("privacy"),
      href: "/about/privacy",
      copy: "right",
      images: ["/images/privacy-policy.jpg", "/images/reading-lamp.jpg"],
    },
    {
      key: "bankResona",
      title: t("tBankResona"),
      body: t("bankResona"),
      href: "/about/bank-resona-perdania",
      copy: "left",
      images: ["/images/office-lounge.jpg"],
    },
    {
      key: "news",
      title: t("tNews"),
      body: t("news"),
      href: "/news",
      copy: "right",
      images: ["/images/library-study.jpg", "/images/team-batik.png"],
    },
    {
      key: "career",
      title: t("tCareer"),
      body: t("career"),
      href: "/careers",
      copy: "left",
      images: ["/images/management-board.jpg"],
    },
  ];

  return (
    <>
      <FigHero
        variant="card"
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        image="/images/about-hero.jpg"
      />

      {rows.map((row, i) => (
        <section
          key={row.key}
          /* fig `Frame 192/194`: every other row sits on white */
          className={cn("py-14 md:py-20", i % 2 === 1 ? "bg-white" : "bg-canvas")}
        >
          <div className="container-rif">
            <div
              /*
               * fig: the two columns are not halves. Inside the 1312px
               * container the artwork occupies 459px and the copy 663px,
               * with the gap between them carrying the rest.
               */
              className={cn(
                "grid items-center gap-10",
                row.copy === "right"
                  ? "lg:grid-cols-[459fr_663fr] lg:gap-[190px]"
                  : "lg:grid-cols-[663fr_451fr] lg:gap-[155px]",
              )}
            >
              {/* Copy — fig `Frame 75`, 791px wide with a 663px measure */}
              <div className={cn("order-2", row.copy === "right" ? "lg:order-2" : "lg:order-1")}>
                <h2 className="text-[28px] font-bold leading-[1.25] text-brand-600 md:text-[40px]">
                  {row.title}
                </h2>
                <p className="mt-4 max-w-[663px] text-justify text-[15px] leading-[1.6] text-ink-500 md:text-[16px]">
                  {row.body}
                </p>
                <div className="mt-8">
                  {/* fig `Frame 8`: 151x58 green pill, not the orange CTA */}
                  <ButtonLink href={row.href} size="lg">
                    {tc("learnMore")}
                  </ButtonLink>
                </div>
              </div>

              <div className={cn("order-1", row.copy === "right" ? "lg:order-1" : "lg:order-2")}>
                {row.images.length > 1 ? (
                  /*
                   * fig `Frame 193`: a 338x412 photo with a 222x271 one
                   * overlapping its lower-right corner, both radius 9.
                   */
                  <div className="relative mx-auto aspect-[459/452] w-full max-w-[459px]">
                    {/* Rectangle 5 — 338x412, flush left, 9.1% down */}
                    {/* fig `Rectangle 5`: tilted -7deg */}
                    <div className="absolute left-0 top-[9.1%] h-[91.2%] w-[73.6%] -rotate-[7deg] overflow-hidden rounded-[9px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
                      <Image
                        src={row.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 24vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Rectangle 6 — 222x271, overlapping the lower right */}
                    {/* fig `Rectangle 6`: tilted +10deg, overlapping */}
                    <div className="absolute left-[52.3%] top-[32.5%] h-[60%] w-[48.4%] rotate-[10deg] overflow-hidden rounded-[9px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
                      <Image
                        src={row.images[1]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 16vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  /*
                   * fig `Rectangle 5`: a 451x550 photo tilted +7deg. It starts 46px
                   * above its row, so it breaks the band edge, and clears the
                   * bottom by 96px rather than filling the height.
                   */
                  <div className="relative z-10 mx-auto aspect-[451/550] w-full max-w-[451px] rotate-[7deg] overflow-hidden rounded-[12px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] lg:-mt-[46px] lg:mb-[96px]">
                    <Image
                      src={row.images[0]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 32vw, 80vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
