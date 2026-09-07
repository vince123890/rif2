import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import {
  getArticles,
  getFinancialReports,
  getHeroSlides,
  getProducts,
  getSustainabilityReports,
} from "@/lib/content";
import { Link } from "@/i18n/routing";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductTabs } from "@/components/content/product-tabs";
import { ArticleCard } from "@/components/content/article-card";
import {
  FeaturePanel,
  Section,
  SectionHeading,
} from "@/components/ui/section";
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
    { value: "5.03%", label: t("macroGdp") },
    { value: "1.57%", label: t("macroInflation") },
    { value: "USD 29.04B", label: t("macroTrade") },
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
      <Section tone="white">
        <div className="container-rif grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/*
           * RIF's own team portrait, shot as a cutout on white. It sits on
           * the brand tint rather than a photo crop so the figures keep
           * their full height instead of being cropped at the torso.
           */}
          <div className="relative aspect-4/3 overflow-hidden rounded-[16px] bg-brand-50">
            <Image
              src="/images/team-batik.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain object-bottom"
            />
          </div>
          <div>
            <p className="eyebrow">{t("managementKicker")}</p>
            <h2 className="mt-4 text-[28px] font-bold leading-tight text-ink-900 md:text-[36px]">
              {locale === "id"
                ? "Para Pemegang Saham dan Pemangku Kepentingan yang terhormat,"
                : "Dear Shareholders and Stakeholders,"}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.9] text-ink-700">
              {locale === "id"
                ? "Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi yang terjaga, ditopang oleh sektor jasa keuangan yang tetap resilien."
                : "The global economy has shown varied performance, influenced by geopolitical tensions, trade fragmentation, and monetary policy dynamics across countries. Amid this uncertainty, Indonesia has recorded steady economic growth, supported by a resilient financial services sector."}
            </p>

            {/*
             * Macro indicators, as laid out in the fig's management section.
             * TODO(RIF): these figures came from the design file, not from a
             * cited source — confirm them (and their reference period) with
             * RIF before go-live, or drop the strip.
             */}
            <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-ink-200 pt-7">
              {macroIndicators.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-[22px] font-bold leading-tight text-brand-600 md:text-[26px]">
                    {m.value}
                  </dd>
                  <p className="mt-1 text-[14px] text-ink-500">{m.label}</p>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <ButtonLink href="/about/management-message" variant="accent">
                {tc("more")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- 4. PRODUCTS ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("productsKicker")}
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

      {/* ---- 5. SUSTAINABILITY REPORT — dark green panel (fig: radius 50) ---- */}
      <div className="bg-canvas pt-20 md:pt-24 lg:pt-28">
        <FeaturePanel>
          <SectionHeading
            eyebrow={t("sustainabilityKicker")}
            title={t("sustainabilityTitle")}
            lead={t("sustainabilityLead")}
            tone="light"
          />
          <ReportYearGrid
            reports={sustainability.slice(0, 3)}
            href="/corporate-secretary/sustainability-report"
            label={t("sustainabilityTitle")}
            cta={t("sustainabilityCta")}
          />
        </FeaturePanel>
      </div>

      {/* ---- 6. FINANCIAL REPORT ---- */}
      <div className="bg-canvas py-20 md:py-24 lg:py-28">
        <FeaturePanel>
          <SectionHeading
            eyebrow={t("financialKicker")}
            title={t("financialTitle")}
            lead={t("financialLead")}
            tone="light"
          />
          <ReportYearGrid
            reports={financial.slice(0, 3)}
            href="/corporate-secretary/financial-report"
            label={t("financialTitle")}
            cta={t("financialCta")}
          />
        </FeaturePanel>
      </div>

      {/* ---- 7. NEWS — peach wash (fig: #EDB886 @ 10%) ---- */}
      <Section tone="peach">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("newsKicker")}
            title={t("newsTitle")}
            lead={t("newsLead")}
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
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

/**
 * Year tiles for a report section, sitting on the dark green panel.
 *
 * The fig shows each year as its own cover-like tile rather than the single
 * card with year pills the page used before, so the two report sections can
 * stand alone.
 */
function ReportYearGrid({
  reports,
  href,
  label,
  cta,
}: {
  reports: { year: number }[];
  href: string;
  label: string;
  cta: string;
}) {
  if (!reports.length) return null;

  return (
    <>
      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
        {reports.map((r) => (
          <li key={r.year}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-[16px] bg-white/95 p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand-600">
                {label}
              </span>
              <span className="mt-3 text-[30px] font-bold leading-none text-ink-900 md:text-[40px]">
                {r.year}
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-bold text-accent-500 transition-colors group-hover:text-accent-600">
                {cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[15px] font-bold text-white underline underline-offset-4 transition-colors hover:text-accent-300"
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </>
  );
}
