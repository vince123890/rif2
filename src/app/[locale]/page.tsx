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
    { value: "1.57%", label: t("macroInflation"), emphasis: false },
    // fig sets GDP growth larger than its neighbours
    { value: "5.03%", label: t("macroGdp"), emphasis: true },
    { value: "USD 29.04B", label: t("macroTrade"), emphasis: false },
  ];

  const stats = [
    { value: `${new Date().getFullYear() - 1984}+`, label: t("statYears") },
    { value: "1984", label: t("statSince") },
    { value: "Resona Group", label: t("statGroup") },
    { value: "OJK", label: t("statOjk") },
  ];

  return (
    <>
      {/* FR-HM-01 */}
      <HeroCarousel slides={slides} />

      {/* Key facts strip */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-rif grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-[30px] font-bold leading-tight text-brand-600 md:text-[40px]">
                {s.value}
              </p>
              <p className="mt-1.5 text-[15px] text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/*
       * Section order follows `Desktop - 4` in `docs/Resona Indonesia
       * Finance.fig`: hero, key facts, management message, products,
       * sustainability report, financial report, news.
       *
       * The fig has no history/timeline section on the homepage — that
       * content now lives only on /about/company-profile/history — and it
       * splits the single reports panel into two separate sections.
       */}

      {/* ---- 3. MESSAGE FROM THE MANAGEMENT ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading title={t("managementTitle")} />

          {/*
           * fig: a photo panel on the left and, on the right, the message
           * set in white directly over a dark image — not black type on a
           * white card. Both panels are radius 12.
           */}
          <div className="mt-14 grid gap-6 lg:grid-cols-[652fr_600fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-[12px] bg-brand-50 lg:min-h-[531px]">
              <Image
                src="/images/team-batik.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-contain object-bottom"
              />
            </div>

            <div className="relative overflow-hidden rounded-[12px] bg-brand-800">
              <Image
                src="/images/management-message.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-[#0F0F0F]/70" />

              <div className="relative flex h-full flex-col p-6 md:p-8">
                <h3 className="text-[18px] font-normal leading-[1.5] text-white md:text-[20px]">
                  {locale === "id"
                    ? "Menjaga Pertumbuhan di Tengah Dinamika Global"
                    : "Sustaining Growth Amid Global Dynamics"}
                </h3>

                <p className="mt-6 text-[15px] leading-[1.6] text-white/90 md:text-[20px]">
                  {locale === "id"
                    ? "Para Pemegang Saham dan Pemangku Kepentingan yang terhormat, di tengah ketidakpastian ekonomi global, Indonesia berhasil mencatatkan pertumbuhan ekonomi yang terjaga, ditopang oleh sektor jasa keuangan yang tetap resilien."
                    : "Dear respected Shareholders and Stakeholders, amid global economic uncertainty, Indonesia has maintained steady economic growth, supported by a financial services sector that remains resilient."}
                </p>

                {/*
                 * Macro indicators, laid out as in the fig: values in brand
                 * green, hairline rules between them.
                 *
                 * TODO(RIF): these figures came from the design file with no
                 * cited source — confirm them and their reference period
                 * before go-live, or drop the strip.
                 */}
                <dl className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4 divide-ink-300">
                  {macroIndicators.map((m, i) => (
                    <div
                      key={m.label}
                      className={i > 0 ? "border-ink-300/40 sm:border-l sm:pl-8" : ""}
                    >
                      <dt className="sr-only">{m.label}</dt>
                      <dd
                        className={
                          m.emphasis
                            ? "text-[28px] font-bold leading-tight text-white md:text-[40px]"
                            : "text-[20px] font-bold leading-tight text-white md:text-[24px]"
                        }
                      >
                        {m.value}
                      </dd>
                      <p
                        className={
                          m.emphasis
                            ? "mt-1 text-[16px] font-bold text-white md:text-[24px]"
                            : "mt-1 text-[14px] text-white/70"
                        }
                      >
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
                    {tc("more")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- 4. PRODUCTS ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading
            title={t("productsTitle")}
            lead={t("productsLead")}
          />
          <div className="mt-14">
            <ProductTabs products={products} />
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/products" size="lg">
              {t("productsCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/*
       * ---- 5 & 6. REPORTS ----
       * fig: two separate sections on the plain page ground, each a
       * carousel of report-cover cards — not the dark green feature panel
       * the page used before.
       */}
      <Section tone="white">
        <div className="container-rif">
          <SectionHeading title={t("sustainabilityTitle")} />
          <div className="mt-10">
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
          <SectionHeading title={t("financialTitle")} />
          <div className="mt-10">
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

      {/* ---- 7. NEWS — peach wash (fig: #EDB886 @ 10%) ---- */}
      <Section tone="peach">
        <div className="container-rif">
          <SectionHeading
            title={t("newsTitle")}
            lead={t("newsLead")}
          />

          {/* fig: stacked horizontal cards, image beside copy */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} layout="horizontal" />
            ))}
          </div>

          <div className="mt-14 text-center">
            <ButtonLink href="/news" size="lg">
              {t("newsCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>

    </>
  );
}
