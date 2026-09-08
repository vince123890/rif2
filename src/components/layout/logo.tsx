import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official lockup: the Resona roundel with the RESONA wordmark beneath it,
 * followed by the company name.
 *
 * Two artworks are supplied by RIF — the full-colour mark for light
 * backgrounds and an all-white negative for dark ones (the footer and the
 * green nav bar), so neither needs a plate behind it.
 */
export function Logo({
  className,
  tone = "dark",
  wordmarkClassName,
}: {
  className?: string;
  /** "dark" = dark text on a light ground; "light" = on a dark ground. */
  tone?: "dark" | "light";
  /**
   * Extra classes for the company name. The header pill uses this to drop
   * the wordmark below xl, where eight menu labels would otherwise run
   * underneath it.
   */
  wordmarkClassName?: string;
}) {
  const light = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={light ? "/brand/resona-mark-white.png" : "/brand/resona-mark.png"}
        alt=""
        width={252}
        height={320}
        priority
        className="h-9 w-auto shrink-0 lg:h-10"
      />

      <span
        className={cn(
          /* fig: the wordmark is Lato Regular — 16px in the header pill,
             32px in the footer — never a black weight. */
          "text-[19px] font-normal leading-tight tracking-tight",
          light ? "text-white" : "text-ink-900",
          wordmarkClassName,
        )}
      >
        Resona Indonesia Finance
      </span>
    </span>
  );
}
