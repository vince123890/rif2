import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/reveal";

export type FigArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  tags?: string[];
};

/**
 * News card — `Group 211` in the fig's `news` frame.
 *
 * A 389×566 card in two parts: a 389×267 photo at radius 32, and a 389×291
 * body (`Subtract`) with a 59×62 circle punched out of its bottom-right
 * corner for the arrow button.
 *
 * The body carries a row of tag chips (32px pills at radius 29), a 20px
 * Bold title, a 14px #6E6E6E excerpt and a date/"Read more" footer. The fig
 * collapses the tag row past two entries into a "+N lainnya" chip, which is
 * what `extraLabel` renders.
 */
export function FigArticleCard({
  article,
  readMore,
  extraLabel,
  delay = 0,
}: {
  article: FigArticle;
  readMore: string;
  /** Builds the "+N lainnya" chip label. */
  extraLabel?: (count: number) => string;
  delay?: number;
}) {
  const tags = article.tags ?? [];
  const shown = tags.slice(0, 2);
  const extra = tags.length - shown.length;

  return (
    <Reveal as="article" delay={delay} className="group relative h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_-28px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
        {/* fig `Mask group`: 389×267 photo at radius 32 */}
        <div className="relative aspect-[389/267] w-full overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 389px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>

        {/* fig `Frame 26815`: the body, inset 24px */}
        <div className="flex flex-1 flex-col p-6">
          {shown.length ? (
            /* fig `Frame 145/146/147`: 32px chips at radius 29 */
            <ul className="flex flex-wrap gap-1">
              {shown.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[29px] bg-brand-600 px-3 py-1.5 text-[12px] leading-none text-white"
                >
                  {tag}
                </li>
              ))}
              {extra > 0 ? (
                <li className="rounded-[29px] bg-brand-600 px-3 py-1.5 text-[12px] leading-none text-white">
                  {extraLabel ? extraLabel(extra) : `+${extra}`}
                </li>
              ) : null}
            </ul>
          ) : null}

          <h3 className="mt-4 line-clamp-2 text-[20px] font-bold leading-[1.5] text-ink-900">
            <Link
              href={`/news/${article.slug}`}
              className="after:absolute after:inset-0"
            >
              {article.title}
            </Link>
          </h3>

          <p className="mt-4 line-clamp-3 text-[14px] leading-[1.5] text-ink-500">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center gap-4 pt-6">
            <span className="inline-flex items-center gap-2 text-[14px] leading-[1.5] text-ink-500">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              {article.date}
            </span>

            <span className="ml-auto inline-flex items-center gap-2 text-[14px] leading-[1.5] text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {readMore}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      {/* fig `Subtract` + `Button`: the arrow seated in the corner notch */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
      >
        <ArrowRight className="h-5 w-5" />
      </span>
    </Reveal>
  );
}
