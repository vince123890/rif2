import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section wrapper.
 *
 * The fig alternates plain canvas sections with two signature treatments:
 * a full-bleed dark-green feature panel (radius 50) and a warm peach wash
 * behind the news block (#EDB886 at 10%).
 */
export function Section({
  children,
  tone = "canvas",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "canvas" | "white" | "mint" | "peach";
  className?: string;
  id?: string;
}) {
  /*
   * fig: the page is one flat #F9FAFB ground; only the Latest News band is
   * white. The old alternating canvas/white/peach rhythm was ours, not the
   * design's.
   */
  const tones = {
    canvas: "bg-canvas",
    white: "bg-white",
    mint: "bg-brand-50",
    peach: "bg-accent-200/10",
  } as const;

  return (
    <section
      id={id}
      /*
       * fig: sections are separated by 100px, not the 224px the previous
       * py-28 produced. Halved to py-[50px] a side so two adjacent sections
       * add up to the design's gap.
       */
      className={cn("py-12 md:py-[50px]", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/**
 * The dark-green feature panel from the fig — rounded 50px, inset from the
 * page edges, with a large low-opacity glyph bleeding out of one corner.
 */
export function FeaturePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="container-rif">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[28px] bg-brand-600 px-6 py-16 md:rounded-[50px] md:px-12 md:py-20 lg:px-16",
          className,
        )}
      >
        {/* Decorative mark — fig uses a white vector at 5% opacity */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] text-white/5"
          fill="none"
        >
          <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="8" />
          <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="8" />
          <path
            d="M62 148V56a4 4 0 0 1 4-4h44a30 30 0 0 1 11 58l24 38h-26l-21-34h-16v34z"
            fill="currentColor"
          />
        </svg>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/**
 * Section header: Japanese-plus-English eyebrow, 40px heading, 24px lead —
 * the exact rhythm measured in the fig.
 */
export function SectionHeading({
  title,
  lead,
  align = "center",
  tone = "dark",
  size = "lg",
  action,
}: {
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  /**
   * The fig mixes 40px and 30px headings; RIF asked for one size across
   * the homepage, so every section passes "lg". "md" is kept for the
   * inner pages, which do use the smaller heading.
   */
  size?: "lg" | "md";
  /** Rendered opposite the title, e.g. the news section's "View More". */
  action?: ReactNode;
}) {
  /*
   * fig `Frame 82/83/125/156`: the title row is a plain auto-layout frame
   * with a blossom either side — 24px padding, 16px gap, and *no* fill.
   * The white pill this used to draw was ours, not the design's.
   */
  const heading = (
    <div className="inline-flex items-center gap-4 px-6 py-3">
      <Blossom />
      <h2
        className={cn(
          "font-bold leading-[1.2]",
          size === "lg"
            ? "text-[28px] md:text-[40px]"
            : "text-[24px] md:text-[30px]",
          tone === "light" ? "text-white" : "text-accent-500",
        )}
      >
        {title}
      </h2>
      <Blossom />
    </div>
  );

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left")}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-4",
          align === "center" ? "justify-center" : "justify-between",
        )}
      >
        {heading}
        {action}
      </div>

      {lead ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.6] md:text-[20px]",
            align === "center" ? "mx-auto max-w-[900px]" : "",
            tone === "light" ? "text-white/85" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** The Resona blossom used as a title ornament (fig: 40×36 either side). */
function Blossom() {
  return (
    <Image
      src="/brand/resona-blossom.png"
      alt=""
      width={40}
      height={36}
      aria-hidden
      className="h-[26px] w-auto shrink-0 md:h-9"
    />
  );
}
