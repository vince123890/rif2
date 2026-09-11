import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export type FigNewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

/**
 * Latest-news block — fig `Mask group` / `Subtract` / `Frame 26812-14`.
 *
 * The design runs one tall feature card beside a 2×2 grid of shorter ones,
 * and every card uses the same trick: a `Subtract` boolean punches a 62px
 * circle out of the card's bottom-right corner, and the orange arrow button
 * sits in the hole. Reproduced here with a radial-gradient mask, which
 * gives the same notch without shipping a boolean path per card.
 *
 *   - feature card : 442×518 at (483, 3918), photo 410×518 alongside
 *   - grid cards   : 410×267 photo over a 410×243 body, radius 32
 *   - notch        : 62px circle inset 359,192 from the card's top-left
 *   - arrow button : 40px #F58220 circle
 */
export function FigNews({
  items,
  readMore,
}: {
  items: FigNewsItem[];
  readMore: string;
}) {
  if (!items.length) return null;

  const [feature, ...rest] = items;

  return (
    <div className="grid gap-6 lg:grid-cols-[442fr_852fr]">
      {/* Tall feature card — fig `Frame 22`, 434×518 body beside a 410×518 photo */}
      <Reveal className="h-full">
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[#F2F8F6]">
          <div className="relative aspect-[410/280] w-full overflow-hidden lg:aspect-auto lg:h-[260px]">
            <Image
              src={feature.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 442px, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-[50px_50px_50px] max-lg:p-7">
            <h3 className="text-[20px] font-bold leading-[1.5] text-ink-900">
              <Link
                href={`/news/${feature.slug}`}
                className="after:absolute after:inset-0"
              >
                {feature.title}
              </Link>
            </h3>

            <p className="mt-4 line-clamp-6 text-[14px] leading-[1.5] text-ink-500">
              {feature.excerpt}
            </p>

            <Meta date={feature.date} readMore={readMore} className="mt-auto pt-8" />
          </div>

          <Notch />
        </article>
      </Reveal>

      {/* 2×2 grid of shorter cards — fig `Mask group` 410×267 + body 410×243 */}
      <div className="grid gap-6 sm:grid-cols-2">
        {rest.slice(0, 4).map((n, i) => (
          <Reveal key={n.slug} delay={(i + 1) * 90}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_-28px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
              {/* fig: 410×267 photo, radius 32 */}
              <div className="relative aspect-[410/267] w-full overflow-hidden">
                <Image
                  src={n.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 410px, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>

              {/* fig `Frame 26812`: 362×195 body, inset 24px */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-[20px] font-bold leading-[1.5] text-ink-900">
                  <Link
                    href={`/news/${n.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {n.title}
                  </Link>
                </h3>

                <p className="mt-4 line-clamp-3 text-[14px] leading-[1.5] text-ink-500">
                  {n.excerpt}
                </p>

                <Meta date={n.date} readMore={readMore} className="mt-auto pt-6" />
              </div>

              <Notch />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** fig `Frame 23` + the zero-opacity "Read more" button beside it. */
function Meta({
  date,
  readMore,
  className,
}: {
  date: string;
  readMore: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="inline-flex items-center gap-2 text-[14px] leading-[1.5] text-ink-500">
        <Calendar className="h-4 w-4 shrink-0" aria-hidden />
        {date}
      </span>

      <span className="ml-auto inline-flex items-center gap-2 text-[14px] leading-[1.5] text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {readMore}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </div>
  );
}

/**
 * fig `Subtract` + `Button`: the 62px circular bite out of the card's
 * bottom-right corner, with the 40px orange arrow seated in it.
 */
function Notch() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
    >
      <ArrowRight className="h-5 w-5" />
    </span>
  );
}
