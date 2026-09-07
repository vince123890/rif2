import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import type { Article } from "@/lib/content";
import { pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";

/**
 * News card.
 *
 * The fig pairs a 16px-radius image card with a category chip, a 20px bold
 * headline, a 14px excerpt and a "Read more" link — date shown as plain text
 * rather than a badge.
 */
export async function ArticleCard({
  article,
  layout = "vertical",
}: {
  article: Article;
  layout?: "vertical" | "horizontal";
}) {
  const locale = await getLocale();
  const [t, tNav] = await Promise.all([
    getTranslations("news"),
    getTranslations("nav"),
  ]);

  const href = `/news/${article.slug}`;
  const categoryLabel = tNav(
    article.category === "education" ? "news-education" : "news-csr",
  );

  const thumb = (
    <div className="relative aspect-square overflow-hidden rounded-[24px] bg-ink-100">
      <Image
        src={article.image}
        alt={pick(article.title, locale)}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

    </div>
  );

  if (layout === "horizontal") {
    /*
     * fig: image and copy side by side in equal halves, both radius 24,
     * with the category as a solid green pill next to the date.
     */
    return (
      <article className="group grid items-stretch gap-6 sm:grid-cols-2">
        <Link href={href} tabIndex={-1} aria-hidden>
          {thumb}
        </Link>
        <div className="flex flex-col rounded-[24px] bg-ink-100 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-600 px-3 py-1 text-[12px] text-white">
              {categoryLabel}
            </span>
            <time
              dateTime={article.publishedAt}
              className="text-[12px] text-ink-500"
            >
              {formatDate(article.publishedAt, locale)}
            </time>
          </div>
          <h3 className="mt-3 text-[16px] font-bold leading-[1.35] text-ink-900">
            <Link href={href} className="transition-colors hover:text-brand-600">
              {pick(article.title, locale)}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-4 text-[12px] leading-[1.5] text-ink-500">
            {pick(article.excerpt, locale)}
          </p>
          <Link
            href={href}
            className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-bold text-accent-500 transition-colors hover:text-accent-600"
          >
            {t("readingMore")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[16px] bg-white transition-transform duration-300 hover:-translate-y-1">
      <Link href={href} tabIndex={-1} aria-hidden>
        {thumb}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-600 px-3 py-1 text-[12px] text-white">
            {categoryLabel}
          </span>
          <time
            dateTime={article.publishedAt}
            className="text-[12px] text-ink-500"
          >
            {formatDate(article.publishedAt, locale)}
          </time>
        </div>
        <h3 className="mt-3 text-[20px] font-bold leading-snug text-ink-900">
          <Link href={href} className="transition-colors hover:text-brand-600">
            {pick(article.title, locale)}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-500">
          {pick(article.excerpt, locale)}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-bold text-accent-500 transition-colors hover:text-accent-600"
        >
          {t("readingMore")}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
