/**
 * The news card body — a rounded rectangle whose bottom-right corner is
 * bitten out by a circle, leaving a concave notch the orange pager button
 * nests into.
 *
 * fig: BOOLEAN_OPERATION "Subtract". Earlier versions cut the hole with an
 * SVG mask, which needed the circle's centre and radius guessed from the
 * child node's box. The design bundle in `docs/dari_claude_design/` expresses
 * it as a single filled outline instead, so the two paths below are copied
 * verbatim rather than reconstructed.
 */

/** 410x243 — the standard news card. */
export const NOTCH_CARD_410 =
  "M 410 177.575 C 410 186.163 398.588 192 390 192 " +
  "C 372.879 192 359 205.879 359 223 " +
  "C 359 231.588 353.163 243 344.575 243 " +
  "L 32 243 C 14.327 243 0 228.673 0 211 " +
  "L 0 32 C 0 14.327 14.327 0 32 0 " +
  "L 378 0 C 395.673 0 410 14.327 410 32 " +
  "L 410 177.575 Z";

/** 481x518 — the tall featured article panel. */
export const NOTCH_CARD_481 =
  "M 481 447.731 C 481 457.547 464.816 465 455 465 " +
  "C 436.775 465 422 479.775 422 498 " +
  "C 422 506.803 416.066 518 407.263 518 " +
  "L 32 518 C 14.327 518 0 503.673 0 486 " +
  "L 0 32 C 0 14.327 14.327 0 32 0 " +
  "L 449 0 C 466.673 0 481 14.327 481 32 " +
  "L 481 447.731 Z";

export function NotchedCard({
  x,
  y,
  w,
  h,
  d,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  /** one of the NOTCH_CARD_* paths, matched to w/h */
  d: string;
  fill: string;
}) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden
      style={{
        overflow: "visible",
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 32,
        color: fill,
      }}
    >
      <path d={d} fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}
