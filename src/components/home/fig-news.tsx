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
 * Latest-news block — measured from the `home page` node tree (y 3918–5092).
 *
 * The fig runs **six** stories in two rows, and every card is built the
 * same way: a photo card over (or beside) a separate body card whose
 * bottom-right corner has a circle punched out of it (`Subtract` +
 * `Ellipse 24`/`Rectangle 135`), with a 40px orange arrow seated in the
 * hole.
 *
 * Row 1 (y 3918):
 *   `Mask group`  81,3918  410×518  photo, radii [32,–,–,32]
 *   `Subtract`   483,3918  442×518  body  #F2F8F6, notch 66×66 @(866,4383)
 *   `Frame 22`   491,3918  434×518  copy, inner column 352 wide at 541,3968
 *   `Mask group` 949,3918  410×267  photo r32
 *   `Subtract`   949,4193  410×243  body white, notch 62×62 @(1308,4385)
 *   arrows       885 / 1319, 4396, 40×40
 *
 * Row 2 (y 4460): three photo/body pairs at x 81 / 515 / 949 —
 *   photo 410×267 @4460, body 410×243 @4735, copy 362×195 @4759,
 *   arrows at 451 / 885 / 1319, y 4938.
 *
 * So the first story is a **wide feature**: a 410 photo beside a 442 mint
 * body, spanning the same height as the card next to it — not a photo
 * stacked above its text.
 */
export function FigNews({
  items,
  readMore,
}: {
  items: FigNewsItem[];
  readMore: string;
}) {
  if (!items.length) return null;

  const [feature, second, ...rest] = items;

  return (
    <div className="space-y-6">
      {/*
       * Row 1 — the fig pairs the wide feature with one stacked card. With
       * fewer stories than the fig's six the feature simply spans the row,
       * rather than leaving a hole where the second card would sit.
       */}
      <div
        className={cn(
          "grid gap-6",
          /* fig: both row-1 cards stand 518 tall. */
          second && "lg:grid-cols-[852fr_410fr] lg:auto-rows-[518px]",
        )}
      >
        {feature ? <FeatureCard item={feature} readMore={readMore} /> : null}
        {second ? (
          <StackedCard item={second} readMore={readMore} delay={90} />
        ) : null}
      </div>

      {/* Row 2 — three stacked cards in the fig; fills what data exists. */}
      {rest.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((n, i) => (
            <StackedCard
              key={n.slug}
              item={n}
              readMore={readMore}
              delay={(i + 1) * 90}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * fig row 1, left: a 410×518 photo beside a 442×518 `#F2F8F6` body — the
 * two sit side by side and share the row's full height.
 */
function FeatureCard({
  item,
  readMore,
}: {
  item: FigNewsItem;
  readMore: string;
}) {
  return (
    <Reveal className="h-full">
      <article className="group relative grid h-full overflow-hidden rounded-[32px] sm:grid-cols-[410fr_442fr]">
        {/* fig `Mask group`: photo, left corners rounded only */}
        <div className="relative min-h-[240px] overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 410px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>

        {/* fig `Subtract`: the #F2F8F6 body, 442 wide, notched bottom-right */}
        <div className="relative flex flex-col bg-[#F2F8F6] p-[50px] max-sm:p-7">
          <h3 className="text-[20px] font-bold leading-[1.5] text-ink-900">
            <Link
              href={`/news/${item.slug}`}
              className="after:absolute after:inset-0"
            >
              {item.title}
            </Link>
          </h3>

          <p className="mt-4 line-clamp-6 text-[14px] leading-[1.5] text-ink-500">
            {item.excerpt}
          </p>

          <Meta date={item.date} readMore={readMore} className="mt-auto pt-8" />
        </div>

        <Notch />
      </article>
    </Reveal>
  );
}

/**
 * fig rows 1-right and 2: a 410×267 photo over a 410×243 white body, the
 * body notched at its bottom-right corner.
 */
function StackedCard({
  item,
  readMore,
  delay = 0,
}: {
  item: FigNewsItem;
  readMore: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_-28px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
        {/* fig: 410×267 photo */}
        <div className="relative aspect-[410/267] w-full overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 410px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>

        {/* fig `Frame 26812`: 362×195 copy, inset 24px in a 410×243 body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 text-[20px] font-bold leading-[1.5] text-ink-900">
            <Link
              href={`/news/${item.slug}`}
              className="after:absolute after:inset-0"
            >
              {item.title}
            </Link>
          </h3>

          <p className="mt-4 line-clamp-3 text-[14px] leading-[1.5] text-ink-500">
            {item.excerpt}
          </p>

          <Meta date={item.date} readMore={readMore} className="mt-auto pt-6" />
        </div>

        <Notch />
      </article>
    </Reveal>
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

      <span className="ml-auto inline-flex items-center gap-2 pr-12 text-[14px] leading-[1.5] text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {readMore}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </div>
  );
}

/**
 * fig `Ellipse 24` / `Rectangle 135`: a 62–66px circle punched out of the
 * body's bottom-right corner, with a 40px `#F58220` arrow seated in it.
 */
function Notch() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
    >
      <ArrowRight className="h-5 w-5" />
    </span>
  );
}
