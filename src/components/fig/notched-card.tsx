/**
 * The news card body.
 *
 * fig: BOOLEAN_OPERATION "Subtract" — ROUNDED_RECTANGLE 410x243 (r=32)
 * MINUS an ELLIPSE 62x62 positioned at the card's bottom-right, overhanging
 * it. That subtraction is what carves the concave bite the orange pager
 * button nests into. A plain rounded div cannot produce it — the cut has to
 * be a real hole, so it is cut with an SVG mask.
 *
 * Node numbers (news row, card 3): card at x=949 y=4193 w=410 h=243,
 * circle "Rectangle 135" at x=1308 y=4385 w=62 h=62 — i.e. the circle centre
 * sits at (+390, +223) from the card origin, radius 31.
 */
import type { ReactNode } from "react";

export function NotchedCard({
  w,
  h,
  r = 32,
  /** circle centre, relative to the card's top-left */
  cx,
  cy,
  cr,
  fill,
  id,
  children,
  className,
}: {
  w: number;
  h: number;
  r?: number;
  cx: number;
  cy: number;
  cr: number;
  fill: string;
  /** unique per instance — SVG mask ids are global */
  id: string;
  children?: ReactNode;
  className?: string;
}) {
  const maskId = `notch-${id}`;
  return (
    <div
      className={className}
      style={{ position: "relative", width: w, height: h }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <defs>
          <mask id={maskId}>
            {/* keep the card … */}
            <rect x="0" y="0" width={w} height={h} rx={r} fill="#fff" />
            {/* … minus the circle */}
            <circle cx={cx} cy={cy} r={cr} fill="#000" />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width={w}
          height={h}
          rx={r}
          fill={fill}
          mask={`url(#${maskId})`}
        />
      </svg>
      {children}
    </div>
  );
}
