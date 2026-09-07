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

  /* fig `Frame 169`: a 258×294 photo tile, radius 24 — not a square. */
  const thumb = (
    <div className="relative aspect-[258/294] overflow-hidden rounded-[24px] bg-ink-100">
      <Image
        src={article.image}
        alt={pick(article.title, locale)}
        fill
        sizes="(min-width: 1024px) 20vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );

  if (layout === "horizontal") {
    /*
     * fig `Frame 167`: a 529×294 row split into two 258px halves — the
     * photo on the left, the copy on its own #EDEDED panel (radius 24) on
     * the right, with a 31px green disc punched out of the panel's
     * bottom-right corner. "Reading More" is not in the fig; the disc is
     * the only affordance.
     */
    return (
      <article className="group grid items-stretch gap-3 sm:grid-cols-2">
        <Link href={href} tabIndex={-1} aria-hidden>
          {thumb}
        </Link>

        {/*
         * The mask must sit on its own layer: a masked element clips its
         * children too, so the arrow disc lives outside it as a sibling.
         */}
        <div className="relative">
          <div
            className="flex h-full flex-col rounded-[24px] bg-ink-100 p-6"
            /*
             * fig `Subtract`: a 41px circle punched out of the panel's
             * bottom-right corner so it curves around the 31px arrow disc.
             *
             * The fig offsets this hole 5px from the disc's centre while the
             * featured card keeps the two concentric — an inconsistency in
             * the file. We follow the featured card: hole and disc share a
             * centre 15.5px in from each edge, leaving an even 5px ring.
             */
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 20.5px at calc(100% - 15.5px) calc(100% - 15.5px), transparent 20.5px, #000 21.5px)",
              maskImage:
                "radial-gradient(circle 20.5px at calc(100% - 15.5px) calc(100% - 15.5px), transparent 20.5px, #000 21.5px)",
            }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-600 px-3 py-1.5 text-[12px] leading-none text-white">
                {categoryLabel}
              </span>
              <time
                dateTime={article.publishedAt}
                className="text-[12px] text-ink-500"
              >
                {formatDate(article.publishedAt, locale)}
              </time>
            </div>

            <h3 className="mt-3 text-justify text-[16px] font-bold leading-[1.35] text-ink-900">
              <Link href={href} className="transition-colors hover:text-brand-600">
                {pick(article.title, locale)}
              </Link>
            </h3>

            <p className="mt-2 line-clamp-4 text-justify text-[12px] leading-[1.5] text-ink-500">
              {pick(article.excerpt, locale)}
            </p>
          </div>

          <Link
            href={href}
            aria-label={pick(article.title, locale)}
            className="absolute bottom-0 right-0 grid h-[31px] w-[31px] place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:scale-105"
          >
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
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
