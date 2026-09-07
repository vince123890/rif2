import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  getArticles,
  getFinancialReports,
  getHeroSlides,
  getProducts,
  getSustainabilityReports,
} from "@/lib/content";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductTabs } from "@/components/content/product-tabs";
import { ArticleCard } from "@/components/content/article-card";
import { FeaturedArticle } from "@/components/content/featured-article";
import { ReportCarousel } from "@/components/content/report-carousel";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [slides, products, articles, sustainability, financial] =
    await Promise.all([
      getHeroSlides(),
      getProducts(),
      getArticles({ limit: 3 }),
      getSustainabilityReports(),
      getFinancialReports(),
    ]);

  /*
   * Macro indicators shown beside the management message, transcribed from
   * the fig. Kept here rather than inline so the values are easy to find
   * and update when RIF confirms them.
   */
  const macroIndicators = [
    { value: "1.57%", label: t("macroInflation") },
    { value: "5.03%", label: t("macroGdp") },
    { value: "USD 29.04B", label: t("macroTrade") },
  ];

  const [featured, ...rest] = articles;

  return (
    <>
      {/* FR-HM-01 */}
      <HeroCarousel slides={slides} />

      {/*
       * Section order follows `Desktop - 4` in `docs/Resona Indonesia
       * Finance.fig`: hero, management message, products, sustainability
       * report, financial report, news. The fig has no key-facts strip
       * between the hero and the management message.
       *
       * The fig has no history/timeline section on the homepage — that
       * content now lives only on /about/company-profile/history — and it
       * splits the single reports panel into two separate sections.
       */}

      {/* ---- 3. MESSAGE FROM THE MANAGEMENT ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading title={t("managementTitle")} color="ink" size="lg" />

          {/*
           * A single raised white card holding the photo on the left and the
           * message on the right. The .fig node data sets this copy in white
           * over the photo, but the rendered design the client supplied puts
           * it as dark type on white — the render is what we follow.
           */}
          <div className="mt-6 overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
            <div className="grid lg:grid-cols-[652fr_600fr]">
              <div className="relative min-h-[280px] lg:min-h-[420px]">
                <Image
                  src="/images/management-message.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col p-7 md:p-10">
                <h3 className="text-[22px] font-bold leading-[1.3] text-brand-600 md:text-[28px]">
                  {locale === "id"
                    ? "Menjaga Pertumbuhan di Tengah Dinamika Global"
                    : "Sustaining Growth Amid Global Dynamics"}
                </h3>

                <p className="mt-5 text-[14px] leading-[1.7] text-ink-500 md:text-[15px]">
                  {locale === "id"
                    ? "Para Pemegang Saham dan Pemangku Kepentingan yang terhormat, di tengah ketidakpastian ekonomi global, Indonesia mempertahankan fundamental ekonomi yang solid: pertumbuhan 5,03%, inflasi terkendali 1,57%, dan surplus perdagangan USD 29,04 miliar. Ketahanan ini turut menopang stabilitas sektor jasa keuangan dan momentum pertumbuhan industri pembiayaan nasional."
                    : "Dear respected Shareholders and Stakeholders, amid global economic uncertainty, Indonesia has maintained solid economic fundamentals, recording 5.03% growth, controlled inflation at 1.57%, and a trade surplus of USD 29.04 billion. This resilience has also supported the stability of the financial services sector and sustained the growth momentum of the national financing industry."}
                </p>

                {/*
                 * Macro indicators, split by hairline rules.
                 *
                 * TODO(RIF): these figures came from the design with no cited
                 * source — confirm them and their reference period before
                 * go-live, or drop the strip.
                 */}
                <dl className="mt-8 grid grid-cols-3 gap-4">
                  {macroIndicators.map((m, i) => (
                    <div
                      key={m.label}
                      className={
                        i > 0 ? "border-l border-ink-200 pl-4" : undefined
                      }
                    >
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="text-[18px] font-bold leading-tight text-brand-600 md:text-[24px]">
                        {m.value}
                      </dd>
                      <p className="mt-1 text-[12px] text-ink-400 md:text-[13px]">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-8">
                  <ButtonLink
                    href="/about/management-message"
                    variant="accent"
                    size="lg"
                    className="w-full"
                  >
                    {tc("learnMore")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- 4. PRODUCTS ---- */}
      <Section tone="white">
        <div className="container-rif">
          <SectionHeading title={t("productsTitle")} size="lg" />
          <div className="mt-8">
            <ProductTabs products={products} />
          </div>
        </div>
      </Section>

      {/*
       * ---- 5 & 6. REPORTS ----
       * fig: two separate sections on the plain page ground, each a
       * carousel of report-cover cards — not the dark green feature panel
       * the page used before.
       */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading title={t("sustainabilityTitle")} size="lg" />
          <div className="mt-6">
            <ReportCarousel
              reports={sustainability.slice(0, 6).map((d) => ({
                year: d.year,
                href: "/corporate-secretary/sustainability-report",
              }))}
              label={t("sustainabilityTitle")}
              allHref="/corporate-secretary/sustainability-report"
            />
          </div>
        </div>
      </Section>

      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading title={t("financialTitle")} size="lg" />
          <div className="mt-6">
            <ReportCarousel
              reports={financial.slice(0, 6).map((d) => ({
                year: d.year,
                href: "/corporate-secretary/financial-report",
              }))}
              label={t("financialTitle")}
              allHref="/corporate-secretary/financial-report"
            />
          </div>
        </div>
      </Section>

      {/* ---- 7. NEWS — the one white band in the fig (#FFFFFF) ---- */}
      <Section tone="white">
        <div className="container-rif">
          <SectionHeading
            title={t("newsTitle")}
            align="left"
            size="lg"
            action={<ButtonLink href="/news">{t("newsCta")}</ButtonLink>}
          />

          {/* fig `Frame 166`: 759 + 529 columns, 24px gutter, 600px tall */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[759fr_529fr]">
            {featured ? <FeaturedArticle article={featured} /> : null}

            <div className="grid content-between gap-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} layout="horizontal" />
              ))}
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
