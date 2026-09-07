import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { getArticles, pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { FeatureBand } from "@/components/content/feature-band";
import { formatDate, cn } from "@/lib/utils";

const ROUTE = "/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "news", path: ROUTE });
}

/**
 * News — `Desktop - 18`.
 *
 * A category rail (`Frame 83`), the newest story as the wide feature card,
 * then the rest in a three-up grid. The fig drops the year facet and the
 * sidebar the old list had.
 */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const activeCategory =
    category === "education" || category === "csr" ? category : undefined;

  const [tNav, t, articles] = await Promise.all([
    getTranslations("nav"),
    getTranslations("news"),
    getArticles({ category: activeCategory }),
  ]);

  /* fig `Frame 106`: one pill per category, the active one filled orange */
  const filters = [
    { key: "csr" as const, label: tNav("news-csr") },
    { key: "education" as const, label: tNav("news-education") },
  ];

  const [lead, ...rest] = articles;

  return (
    <>
      <InnerPage titleKey="news" bare>
        <div className="inline-flex flex-wrap items-center gap-1 rounded-[34px] bg-white/5 p-2">
          {filters.map((f) => {
            const active = activeCategory === f.key;
            return (
              <Link
                key={f.key}
                href={active ? "/news" : `/news?category=${f.key}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-2.5 text-[16px] transition-colors md:text-[20px]",
                  active
                    ? "bg-accent-500 font-bold text-white"
                    : "text-ink-900 hover:bg-white/60",
                )}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </InnerPage>

      {lead ? (
        <FeatureBand
          href={`/news/${lead.slug}`}
          image={lead.image}
          badge={tNav(lead.category === "education" ? "news-education" : "news-csr")}
          title={pick(lead.title, locale)}
          excerpt={pick(lead.excerpt, locale)}
          meta={`${t("author")} · ${formatDate(lead.publishedAt, locale)}`}
        />
      ) : null}

      <section className="bg-canvas py-12 md:py-16">
        <div className="container-rif">
          {rest.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <article
                  key={a.slug}
                  /* fig `Frame 224`: 429x500 card, r=32, photo 413x270 r=24 */
                  className="group flex flex-col overflow-hidden rounded-[32px] bg-white p-2"
                >
                  <Link href={`/news/${a.slug}`} tabIndex={-1} aria-hidden>
                    <div className="relative aspect-[413/270] overflow-hidden rounded-[24px] bg-ink-100">
                      <Image
                        src={a.image}
                        alt={pick(a.title, locale)}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-[16px] font-bold leading-[1.3] text-ink-900">
                      <Link
                        href={`/news/${a.slug}`}
                        className="transition-colors hover:text-brand-600"
                      >
                        {pick(a.title, locale)}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-ink-500">
                      {pick(a.excerpt, locale)}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-ink-500 px-3 py-1 text-[11px] leading-none text-white">
                          {tNav(
                            a.category === "education"
                              ? "news-education"
                              : "news-csr",
                          )}
                        </span>
                        <time
                          dateTime={a.publishedAt}
                          className="text-[12px] text-ink-500"
                        >
                          {formatDate(a.publishedAt, locale)}
                        </time>
                      </div>
                      <Link
                        href={`/news/${a.slug}`}
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
          ) : !lead ? (
            <p className="rounded-[12px] border border-dashed border-ink-200 bg-ink-100 px-6 py-16 text-center text-ink-500">
              {t("empty")}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
