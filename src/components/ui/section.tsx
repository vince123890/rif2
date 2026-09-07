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
}: {
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "max-w-[900px]",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {/*
       * fig: the Japanese/English eyebrow is gone. Each section title is
       * flanked by the Resona blossom instead — 40×36 either side, with the
       * title centred between them.
       */}
      <div
        className={cn(
          "flex items-center gap-5",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <Blossom />
        <h2
          className={cn(
            "text-[30px] font-bold leading-[1.15] md:text-[40px]",
            tone === "light" ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>
        <Blossom />
      </div>

      {lead ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.6] md:text-[24px]",
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
