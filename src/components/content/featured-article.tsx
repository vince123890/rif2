import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import type { Article } from "@/lib/content";
import { pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";

/**
 * The lead story on the homepage news section.
 *
 * A full-bleed photo with the headline and excerpt floating over it on a
 * translucent panel, and a round arrow button in the corner — the treatment
 * the design uses to set the first story apart from the two summaries
 * stacked beside it.
 */
export async function FeaturedArticle({ article }: { article: Article }) {
  const locale = await getLocale();
  const [t, tNav] = await Promise.all([
    getTranslations("news"),
    getTranslations("nav"),
  ]);

  const href = `/news/${article.slug}`;
  const categoryLabel = tNav(
    article.category === "education" ? "news-education" : "news-csr",
  );

  return (
    <article className="group relative isolate min-h-[460px] overflow-hidden rounded-[24px] bg-ink-900 lg:min-h-[600px]">
      <Image
        src={article.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      />

      <div className="relative flex h-full flex-col justify-end p-5 md:p-7">
        <div className="rounded-[24px] bg-ink-100/95 p-8 backdrop-blur-sm">
          <span className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-[12px] text-white">
            {categoryLabel}
          </span>

          <h3 className="mt-4 text-[26px] font-bold leading-[1.25] text-ink-900 md:text-[34px]">
            <Link href={href} className="transition-colors hover:text-brand-600">
              {pick(article.title, locale)}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.5] text-ink-500 md:text-[16px]">
            {pick(article.excerpt, locale)}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-[12px] text-ink-400">
              {t("author")} ·{" "}
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, locale)}
              </time>
            </p>

            <Link
              href={href}
              aria-label={pick(article.title, locale)}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-1"
            >
              <ArrowRight className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
