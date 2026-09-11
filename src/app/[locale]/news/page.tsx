import { getTranslations, setRequestLocale } from "next-intl/server";

import { getArticles, pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";
import { FigArticleCard } from "@/components/content/fig-article-card";
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
 * News — the `news` frame in the fig.
 *
 * `Frame 26820`: a 1280×1498 white panel at radius 32 holding the whole
 * listing — a year filter on the first row, then a 3-up grid of 389×566
 * cards on a 413px pitch, and a 164×64 "Lihat Lainnya" button centred at
 * the foot. The category rail (`Frame 82`) sits above the panel.
 */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; year?: string }>;
}) {
  const { locale } = await params;
  const { category, year } = await searchParams;
  setRequestLocale(locale);

  const activeCategory =
    category === "education" || category === "csr" ? category : undefined;

  const [tNav, tc, articles] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
    getArticles({ category: activeCategory }),
  ]);

  /* fig `Frame 82`: one pill per category, the active one filled orange */
  const filters = [
    { key: "csr" as const, label: tNav("news-csr") },
    { key: "education" as const, label: tNav("news-education") },
  ];

  /* fig `Frame 282`: a "Pilih tahun" control on the panel's first row */
  const years = [
    ...new Set(articles.map((a) => new Date(a.publishedAt).getFullYear())),
  ].sort((a, b) => b - a);

  const activeYear = year && /^\d{4}$/.test(year) ? Number(year) : undefined;
  const shown = activeYear
    ? articles.filter(
        (a) => new Date(a.publishedAt).getFullYear() === activeYear,
      )
    : articles;

  const categoryQuery = activeCategory ? `category=${activeCategory}` : "";

  return (
    <InnerPage titleKey="news" bare>
      {/* fig `Frame 82`: the category rail, on the patterned ground */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-[38px] bg-[#EEEFF0] p-4">
          {filters.map((f) => {
            const active = activeCategory === f.key;
            return (
              <Link
                key={f.key}
                href={active ? "/news" : `/news?category=${f.key}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-2.5 text-[16px] leading-[1.7] transition-colors md:text-[20px]",
                  active
                    ? "bg-accent-500 font-bold text-white"
                    : "text-ink-900 hover:bg-black/5",
                )}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* fig `Frame 26820`: the white listing panel */}
      <div className="mt-10 rounded-[32px] bg-white p-6 md:p-8">
        {years.length > 1 ? (
          <div className="flex flex-wrap items-center justify-end gap-3">
            <span className="text-[18px] font-normal text-ink-900 md:text-[24px]">
              {tc("sortByYear")}
            </span>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/news${categoryQuery ? `?${categoryQuery}` : ""}`}
                aria-current={!activeYear ? "true" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[14px] transition-colors md:text-[16px]",
                  !activeYear
                    ? "bg-brand-600 text-white"
                    : "bg-[#FBFBFB] text-ink-900 ring-1 ring-ink-200 hover:bg-brand-50",
                )}
              >
                {tc("allYears")}
              </Link>

              {years.map((y) => (
                <Link
                  key={y}
                  href={`/news?${[categoryQuery, `year=${y}`]
                    .filter(Boolean)
                    .join("&")}`}
                  aria-current={activeYear === y ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[14px] transition-colors md:text-[16px]",
                    activeYear === y
                      ? "bg-brand-600 text-white"
                      : "bg-[#FBFBFB] text-ink-900 ring-1 ring-ink-200 hover:bg-brand-50",
                  )}
                >
                  {y}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {shown.length ? (
          /* fig `Frame 26830/26832`: three 389px cards on a 413px pitch */
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a, i) => (
              <FigArticleCard
                key={a.slug}
                delay={i * 80}
                readMore={tc("readMore")}
                extraLabel={(n) =>
                  locale === "id" ? `+${n} lainnya` : `+${n} more`
                }
                article={{
                  slug: a.slug,
                  title: pick(a.title, locale),
                  excerpt: pick(a.excerpt, locale),
                  date: formatDate(a.publishedAt, locale),
                  image: a.image,
                  tags: [...a.tags],
                }}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-[16px] text-ink-500">
            {tc("noData")}
          </p>
        )}
      </div>
    </InnerPage>
  );
}
