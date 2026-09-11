import { cn } from "@/lib/utils";

/**
 * Section heading — measured from the decoded `home page` node tree.
 *
 * Centred variant, taking "Transparansi Kinerja" (frame centre x = 720):
 *
 *   eyebrow     TEXT         x=642  y=2713  157×24  #F58220, 16px/1.5, CENTER
 *   title       TEXT         x=540  y=2749  361×48  #0F0F0F, 40px Bold, lh 100%
 *   left rule   `Vector 6`   x=188  y=2724  392×68  r=80, stroke #006F4F→#0B3706@0, w=3
 *   left dot    `Ellipse 15` x=579  y=2718   12×12  #006F4F
 *   right dot   `Ellipse 16` x=862  y=2718   12×12  #006F4F
 *   right rule  `Vector 7`   x=1253 y=2724  392×68  same as left
 *   under-rule  `Group 178`  x=540  y=2809  372×12  (orange, see below)
 *
 * Two things the earlier build got wrong:
 *
 *   - the side rules are 392×68 at r=80, i.e. long *curved* sweeps sitting
 *     well outside the title (the left one ends at x=580 while the title
 *     starts at 540; the right one runs off the 1440 frame). They are not
 *     straight hairlines butted against the text.
 *   - the dots sit at the rules' inner ends, flanking the title.
 *
 * `Group 177/178` under the title is orange `#F58220` and has three parts:
 * an 80px stub at stroke-width 10, a full-width tail at stroke-width 2, and
 * a 12px dot at the tail's far end.
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
  /* fig: white on the green products panel, #006F4F on the page ground. */
  const rule = light ? "#FFFFFF" : "#006F4F";
  const ruleFade = light ? "#FFFFFF" : "#0B3706";

  if (align === "left") {
    return (
      <div className={className}>
        {eyebrow ? (
          <p
            className={cn(
              "text-[14px] leading-[1.5] md:text-[16px]",
              light ? "text-white" : "text-accent-500",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        {/* fig: 40px Lato Bold on a 100% line box */}
        <h2
          className={cn(
            "mt-2 text-[28px] font-bold leading-none md:text-[40px]",
            light ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>

        <UnderRule />
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-[14px] leading-[1.5] md:text-[16px]",
            light ? "text-white" : "text-accent-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <div className="mt-2 flex items-center justify-center gap-0">
        <SweepRule side="left" color={rule} fade={ruleFade} />

        <h2
          className={cn(
            "shrink-0 px-4 text-[28px] font-bold leading-none md:text-[40px]",
            light ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>

        <SweepRule side="right" color={rule} fade={ruleFade} />
      </div>

      <div className="flex justify-center">
        <UnderRule />
      </div>
    </div>
  );
}

/**
 * fig `Vector 6` + `Ellipse 15`: a 392×68 curved sweep at r=80 that fades
 * out along its length, capped by a 12px dot at the inner end nearest the
 * title. Drawn as one SVG so the curve and its dot stay locked together.
 */
function SweepRule({
  side,
  color,
  fade,
}: {
  side: "left" | "right";
  color: string;
  fade: string;
}) {
  const id = `sweep-${side}-${color.slice(1)}`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 392 68"
      preserveAspectRatio="none"
      className={cn(
        "hidden h-[34px] min-w-0 flex-1 md:block",
        side === "right" && "-scale-x-100",
      )}
    >
      <defs>
        <linearGradient id={id} x1="1" x2="0">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={fade} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/*
       * The fig's own path blob for this vector could not be decoded
       * reliably, so the sweep is rebuilt from its bounding box: 392×68
       * with an r=80 curve easing up to the title's baseline at the inner
       * end. Stroke width 3, as measured.
       */}
      <path
        d="M0 4 C 150 4, 250 4, 320 34 C 350 47, 370 60, 392 64"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* fig `Ellipse 15`: the 12px dot at the inner end */}
      <circle cx="386" cy="64" r="6" fill={color} />
    </svg>
  );
}

/**
 * fig `Group 177/178`: an 80px stub at stroke-width 10 over a full-width
 * tail at stroke-width 2, with a 12px dot at the tail's far end — all in
 * `#F58220`. Measured 371–372 wide and 12 tall.
 */
function UnderRule() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 372 12"
      className="mt-5 h-3 w-[280px] max-w-full md:w-[372px]"
    >
      {/* `Line 4`: the thin tail, 361 long at width 2 */}
      <rect x="0" y="5" width="361" height="2" fill="#F58220" />
      {/* `Line 3`: the thick stub, 80 long at width 10 */}
      <rect x="0" y="1" width="80" height="10" rx="1" fill="#F58220" />
      {/* `Ellipse 14`: the 12px dot at the far end */}
      <circle cx="366" cy="6" r="6" fill="#F58220" />
    </svg>
  );
}
