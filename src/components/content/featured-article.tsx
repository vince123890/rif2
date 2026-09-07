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
    <article className="group relative isolate rounded-[24px] lg:aspect-[759/600]">
      {/*
       * fig `Subtract`: the photo is a 759×600 rounded rect minus a 100px
       * circle centred 32px in from the bottom-right corner, so the card
       * curves around the arrow disc (which is only 64px) leaving an even
       * 18px gap. Reproduced with a radial-gradient mask.
       */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink-900"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 50px at calc(100% - 32px) calc(100% - 32px), transparent 50px, #000 51px)",
          maskImage:
            "radial-gradient(circle 50px at calc(100% - 32px) calc(100% - 32px), transparent 50px, #000 51px)",
        }}
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/*
       * fig `Frame 164`: no scrim over the photo — the copy sits on a
       * #EDEDED panel at 90% opacity (so the photo reads through it),
       * inset 24px from the card edges and pinned to the bottom:
       * 613×270 inside a 759×600 card.
       */}
      <div className="relative flex h-full min-h-[460px] flex-col justify-end p-6 lg:min-h-0">
        <div className="w-full rounded-[24px] bg-ink-100/90 p-8 lg:w-[613px]">
          <span className="inline-flex rounded-full bg-brand-600 px-3 py-1.5 text-[12px] leading-none text-white">
            {categoryLabel}
          </span>

          <h3 className="mt-3 text-[26px] font-bold leading-[1.25] text-ink-900 md:text-[40px]">
            <Link href={href} className="transition-colors hover:text-brand-600">
              {pick(article.title, locale)}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.5] text-ink-500 md:text-[16px]">
            {pick(article.excerpt, locale)}
          </p>

          <p className="mt-5 text-[12px] text-ink-500">
            {t("author")} ·{" "}
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt, locale)}
            </time>
          </p>
        </div>
      </div>

      {/*
       * fig `Frame 147`: a 64px green disc concentric with the notch above
       * — flush to the card's bottom-right corner, so the 18px ring of page
       * ground shows between the disc and the photo's curved edge.
       */}
      <Link
        href={href}
        aria-label={pick(article.title, locale)}
        className="absolute bottom-0 right-0 grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:scale-105"
      >
        <ArrowRight className="h-7 w-7" aria-hidden />
      </Link>
    </article>
  );
}
