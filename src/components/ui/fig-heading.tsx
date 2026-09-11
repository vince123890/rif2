import { cn } from "@/lib/utils";

/**
 * Section heading — `home page` frame in the fig.
 *
 * The design repeats one lockup for every section title:
 *   - a 16px uppercase eyebrow (#F58220 on light, #FFFFFF on the green panel)
 *   - a 40px Lato Bold title on a 100% line box
 *   - a rule either side: an 80px solid stub that fades out along a
 *     ~320px gradient, capped by a 12px dot (`Group 176/177/178/193`)
 *
 * `tone` picks the colour the fig uses for that section's ground: sections
 * on the page canvas draw the rule in #006F4F, the one inside the dark
 * green products panel draws it in white.
 */
export function FigHeading({
  eyebrow,
  title,
  tone = "dark",
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** "dark" = on the light page ground; "light" = on the green panel. */
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-[14px] leading-[1.5] tracking-[0.04em] md:text-[16px]",
            light ? "text-white" : "text-accent-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <div
        className={cn(
          "mt-2 flex items-center gap-4",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {align === "center" ? <Rule side="left" light={light} /> : null}

        <h2
          className={cn(
            "shrink-0 text-[28px] font-bold leading-[1.1] md:text-[40px]",
            light ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>

        <Rule side="right" light={light} />
      </div>
    </div>
  );
}

/**
 * fig `Group 176`: an 80px stub at 10px weight, a 320px hairline at 2px
 * fading to transparent, and a 12px dot at the far end. Drawn as one SVG so
 * the three pieces stay locked together as the row flexes.
 */
function Rule({ side, light }: { side: "left" | "right"; light: boolean }) {
  const color = light ? "#FFFFFF" : "#006F4F";
  const id = `fig-rule-${side}-${light ? "l" : "d"}`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 332 12"
      preserveAspectRatio="none"
      className={cn(
        "hidden h-3 min-w-0 flex-1 md:block",
        side === "left" && "-scale-x-100",
      )}
    >
      <defs>
        <linearGradient id={id} x1="1" x2="0">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* hairline, fading away from the title */}
      <rect x="0" y="5" width="320" height="2" fill={`url(#${id})`} />
      {/* solid stub nearest the title */}
      <rect x="240" y="1" width="80" height="10" fill={color} />
      {/* end dot */}
      <circle cx="326" cy="6" r="6" fill={color} />
    </svg>
  );
}
