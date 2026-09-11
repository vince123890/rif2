import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  getArticles,
  getFinancialReports,
  getProducts,
  getSustainabilityReports,
  pick,
  pickList,
} from "@/lib/content";
import { HomeDesktop } from "@/components/fig/home-desktop";

/**
 * Homepage — a 1:1 rebuild of the `home page` frame in
 * `docs/Resona_Indonesia_Finance.fig` (1440×6627).
 *
 * The frame is an absolute canvas: every node carries a literal x/y/w/h
 * decoded out of the file's Kiwi node tree. Rather than re-derive those
 * positions from flow layout — which drifts a few pixels at every step — the
 * page renders the canvas itself. See `src/components/fig/canvas.tsx`.
 *
 * Section order and geometry follow the decoded node tree:
 *   y    0 — hero, 1440×900 photo under a #00100C @0.8 wash
 *   y  519 — `Group 167`, the four tilted cards bleeding off both edges
 *   y 1000 — management message (portrait card + copy)
 *   y 1650 — `Rectangle 123`, the 1392×963 #006F4F products panel
 *   y 2713 — reports, on the page ground
 *   y 3665 — `Rectangle 27`, the #EDB886 @0.05 wash behind the news block
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

  const [products, articles, sustainability] = await Promise.all([
    getProducts(),
    getArticles({ limit: 6 }),
    getSustainabilityReports(),
  ]);

  const dateFmt = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const managementBody =
    locale === "id"
      ? "Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi pada Triwulan IV Tahun 2024 sebesar 5,03% (yoy), lebih tinggi dibandingkan peer countries seperti Singapura (4,3%), Arab Saudi (4,4%), dan Malaysia (4,8%). Pertumbuhan ini didorong oleh sektor Jasa Lainnya, diikuti oleh Jasa Perusahaan, serta Transportasi dan Pergudangan. Indonesia juga mampu menjaga inflasi pada tingkat terkendali di level 1,57% (yoy) dan mencatatkan surplus neraca perdagangan sebesar USD 29,04 miliar."
      : "The global economy has delivered mixed results, shaped by geopolitical tension, trade fragmentation and diverging monetary policy. Amid that uncertainty Indonesia recorded 5.03% (yoy) growth in the fourth quarter of 2024 — ahead of peer countries such as Singapore (4.3%), Saudi Arabia (4.4%) and Malaysia (4.8%). Growth was led by Other Services, followed by Corporate Services and Transportation & Warehousing. Indonesia also held inflation at a controlled 1.57% (yoy) and posted a USD 29.04 billion trade surplus.";

  const copy = {
    heroTitle: t("heroTitle"),
    heroTitleAccent: t("heroTitleAccent"),
    heroLead: t("heroLead"),
    managementEyebrow: t("managementEyebrow"),
    managementHeading: t("managementHeading"),
    managementSalutation: t("managementSalutation"),
    managementBody,
    managementCta: t("managementCta"),
    productsEyebrow: t("productsEyebrow"),
    productsHeading: t("productsHeading"),
    productTitle: products[0] ? pick(products[0].name, locale) : "",
    productBody: products[0] ? pick(products[0].summary, locale) : "",
    productBullets: products[0]
      ? pickList(products[0].highlights, locale).slice(0, 4)
      : [],
    reportsEyebrow: t("reportsEyebrow"),
    reportsHeading: t("reportsHeading"),
    tabSustainability: t("tabSustainability"),
    tabFinancial: t("tabFinancial"),
    download: tc("download"),
    viewPdf: tc("viewPdf"),
    newsEyebrow: t("newsEyebrow"),
    newsHeading: t("newsHeading"),
    seeMore: t("seeMore"),
    readMore: tc("readMore"),
  };

  return (
    <HomeDesktop
      copy={copy}
      articles={articles.map((a) => ({
        title: pick(a.title, locale),
        excerpt: pick(a.excerpt, locale),
        date: dateFmt.format(new Date(a.publishedAt)),
        href: `/news/${a.slug}`,
      }))}
      reports={sustainability.slice(0, 3).map((d) => ({
        year: String(d.year),
        title: t("tabSustainability"),
        downloadHref: d.file.url,
        viewHref: d.file.url,
      }))}
    />
  );
}
