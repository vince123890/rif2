import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { getCsrActivities, pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { FeatureBand } from "@/components/content/feature-band";
import { formatDate } from "@/lib/utils";

const ROUTE = "/about/csr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "csr", path: ROUTE });
}

/**
 * Corporate Social Responsibility — `Desktop - 15`.
 *
 * An intro panel, then the newest activity as the wide feature card, with
 * the rest in a three-up grid below it.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t, activities] = await Promise.all([
    getTranslations("nav"),
    getTranslations("news"),
    getCsrActivities(),
  ]);

  const [lead, ...rest] = activities;

  return (
    <>
      <InnerPage titleKey="csr">
        <p className="text-[16px] leading-[1.6] text-ink-500 md:text-[20px]">
          {locale === "id"
            ? "Sejalan dengan semangat keuangan berkelanjutan, Lembaga Jasa Keuangan turut berkontribusi pada Tujuan Pembangunan Berkelanjutan melalui program tanggung jawab sosial perusahaan yang menyentuh tantangan iklim, pelestarian lingkungan, dan kesejahteraan masyarakat."
            : "In line with the spirit of sustainable finance, Financial Services Institutions have contributed to the Sustainable Development Goals through corporate social responsibility programmes that address climate challenges, environmental protection, and community welfare."}
        </p>
      </InnerPage>

      {lead ? (
        <FeatureBand
          href={`/about/csr/${lead.slug}`}
          image={lead.image}
          badge={tNav("csr")}
          title={pick(lead.title, locale)}
          excerpt={pick(lead.summary, locale)}
          meta={`${t("author")} · ${formatDate(lead.date, locale)}`}
        />
      ) : null}

      {rest.length ? (
        <section className="bg-canvas py-12 md:py-16">
          <div className="container-rif">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <article
                  key={c.slug}
                  /* fig `Frame 224`: 429x500 card, r=32, photo 413x270 r=24 */
                  className="group flex flex-col overflow-hidden rounded-[32px] bg-white p-2"
                >
                  <Link href={`/about/csr/${c.slug}`} tabIndex={-1} aria-hidden>
                    <div className="relative aspect-[413/270] overflow-hidden rounded-[24px] bg-ink-100">
                      <Image
                        src={c.image}
                        alt={pick(c.title, locale)}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-[16px] font-bold leading-[1.3] text-ink-900">
                      <Link
                        href={`/about/csr/${c.slug}`}
                        className="transition-colors hover:text-brand-600"
                      >
                        {pick(c.title, locale)}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-ink-500">
                      {pick(c.summary, locale)}
                    </p>

                    {/* fig `Frame 225`: date pill left, green "Read More" right */}
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <time
                        dateTime={c.date}
                        className="text-[12px] text-ink-500"
                      >
                        {formatDate(c.date, locale)}
                      </time>
                      <Link
                        href={`/about/csr/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-brand-700"
                      >
                        {t("readingMore")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
