import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  getArticles,
  getFinancialReports,
  getProducts,
  getSustainabilityReports,
  pick,
  pickList,
} from "@/lib/content";
import { FigHero } from "@/components/home/fig-hero";
import { FigMessage } from "@/components/home/fig-message";
import { FigProducts } from "@/components/home/fig-products";
import { FigReports } from "@/components/home/fig-reports";
import { FigNews } from "@/components/home/fig-news";
import { FigHeading } from "@/components/ui/fig-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Homepage — a direct build of the `home page` frame in
 * `docs/Resona_Indonesia_Finance.fig` (1440×6627).
 *
 * Section order and geometry follow the decoded node tree:
 *   y    0 — hero, 1440×900 photo under a #00100C wash
 *   y  519 — the four tilted cards, bleeding off both edges
 *   y 1000 — management message (portrait card + copy)
 *   y 1650 — `Rectangle 123`, the 1392×963 #006F4F products panel
 *   y 2713 — reports, on the page ground
 *   y 3665 — `Rectangle 27`, the #EDB886 wash behind the news block
 *   y 5192 — footer
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [products, articles, sustainability, financial] = await Promise.all([
    getProducts(),
    getArticles({ limit: 6 }),
    getSustainabilityReports(),
    getFinancialReports(),
  ]);

  const dateFmt = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {/* ---- HERO (y 0) ---- */}
      <FigHero
        // fig sets this as one string with a U+2028 line separator
        // between the clauses so they always break together.
        title={t("heroTitle")}
        titleSecondLine={t("heroTitleAccent")}
        lead={t("heroLead")}
      />

      {/* ---- MANAGEMENT MESSAGE (y 1000) ---- */}
      <section className="bg-canvas py-16 md:py-[100px]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <FigMessage
            eyebrow={t("managementEyebrow")}
            title={t("managementHeading")}
            salutation={t("managementSalutation")}
            body={
              locale === "id"
                ? "Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi pada Triwulan IV Tahun 2024 sebesar 5,03% (yoy), lebih tinggi dibandingkan peer countries seperti Singapura (4,3%), Arab Saudi (4,4%), dan Malaysia (4,8%). Pertumbuhan ini didorong oleh sektor Jasa Lainnya, diikuti oleh Jasa Perusahaan, serta Transportasi dan Pergudangan. Indonesia juga mampu menjaga inflasi pada tingkat terkendali di level 1,57% (yoy) dan mencatatkan surplus neraca perdagangan sebesar USD 29,04 miliar."
                : "The global economy has delivered mixed results, shaped by geopolitical tension, trade fragmentation and diverging monetary policy. Amid that uncertainty Indonesia recorded 5.03% (yoy) growth in the fourth quarter of 2024 — ahead of peer countries such as Singapore (4.3%), Saudi Arabia (4.4%) and Malaysia (4.8%). Growth was led by Other Services, followed by Corporate Services and Transportation & Warehousing. Indonesia also held inflation at a controlled 1.57% (yoy) and posted a USD 29.04 billion trade surplus."
            }
            cta={t("managementCta")}
            ctaHref="/about/management-message"
          />
        </div>
      </section>

      {/*
       * ---- PRODUCTS (y 1650) ----
       * fig `Rectangle 123`: a 1392×963 #006F4F panel inset 24px from the
       * frame at radius 32, carrying the heading and the carousel.
       */}
      <section className="bg-canvas pb-16 md:pb-[100px]">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 lg:px-6">
          <Reveal>
            <div className="rounded-[32px] bg-brand-600 px-5 py-14 md:px-10 md:py-[64px] lg:px-14">
              <FigHeading
                eyebrow={t("productsEyebrow")}
                title={t("productsHeading")}
                tone="light"
              />

              <div className="mt-12">
                <FigProducts
                  labelPrev={t("prevSlide")}
                  labelNext={t("nextSlide")}
                  products={products.map((p, i) => ({
                    title: pick(p.name, locale),
                    description: pick(p.summary, locale),
                    points: pickList(p.highlights, locale).slice(0, 4),
                    // fig uses three distinct photos across the slides
                    image: [
                      "/fig/product-main.png",
                      "/fig/product-next.png",
                      "/fig/product-prev.png",
                    ][i % 3],
                  }))}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- REPORTS (y 2713) ---- */}
      <section className="bg-canvas pb-16 md:pb-[100px]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <Reveal>
            <FigHeading
              eyebrow={t("reportsEyebrow")}
              title={t("reportsHeading")}
            />
          </Reveal>

          <div className="mt-12">
            <FigReports
              downloadLabel={tc("download")}
              viewLabel={tc("viewPdf")}
              tabs={[
                { key: "sustainability", label: t("tabSustainability") },
                { key: "financial", label: t("tabFinancial") },
              ]}
              reports={{
                sustainability: sustainability.slice(0, 3).map((d) => ({
                  year: String(d.year),
                  title: t("tabSustainability"),
                  downloadHref: d.file.url,
                  viewHref: d.file.url,
                })),
                financial: financial.slice(0, 3).map((d) => ({
                  year: String(d.year),
                  title: t("tabFinancial"),
                  downloadHref: d.file.url,
                  viewHref: d.file.url,
                })),
              }}
            />
          </div>

          {/* fig `Button` at (638.5, 3501): 164×64, centred */}
          <div className="mt-12 flex justify-center">
            <ButtonLink
              href="/corporate-secretary/financial-report"
              className="h-16 rounded-[12px] px-6 text-[17px] font-normal leading-[1.7] shadow-[0_6px_15px_-4px_rgba(0,0,0,0.2)] md:text-[20px]"
            >
              {t("seeMore")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/*
       * ---- NEWS (y 3665) ----
       * fig `Rectangle 27`: a 1440×2926 #EDB886 plate behind this block,
       * painted at 5% — a warm wash, not a solid peach slab.
       */}
      <section className="relative isolate py-16 md:py-[100px]">
        <div
          aria-hidden
          /* fig `Rectangle 27`: #EDB886 painted at 5% */
          className="absolute inset-0 -z-10 bg-[#EDB886]/[0.05]"
        />

        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <Reveal>
            <FigHeading eyebrow={t("newsEyebrow")} title={t("newsHeading")} />
          </Reveal>

          <div className="mt-12">
            <FigNews
              readMore={tc("readMore")}
              items={articles.map((a) => ({
                slug: a.slug,
                title: pick(a.title, locale),
                excerpt: pick(a.excerpt, locale),
                date: dateFmt.format(new Date(a.publishedAt)),
                image: a.image,
              }))}
            />
          </div>

          {/* fig `Button` at (638.5, 5028) */}
          <div className="mt-12 flex justify-center">
            <ButtonLink
              href="/news"
              className="h-16 rounded-[12px] px-6 text-[17px] font-normal leading-[1.7] shadow-[0_6px_15px_-4px_rgba(0,0,0,0.2)] md:text-[20px]"
            >
              {t("seeMore")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
