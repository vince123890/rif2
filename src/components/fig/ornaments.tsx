/**
 * Decorative geometry.
 *
 * Every path and number here is transcribed verbatim from the Claude Design
 * handoff bundle in `docs/dari_claude_design/`, which is a verified 1:1
 * export of the same `Resona_Indonesia_Finance.fig`. Earlier versions of this
 * file guessed at the shapes from the node's `cornerRadius` and bounding box
 * and got them wrong twice, so nothing below is derived — it is copied.
 */
import { N } from "./canvas";

const RULE_PATH =
  "M 233.269 38.946 L 234.426 39.901 L 234.426 39.901 L 233.269 38.946 Z " +
  "M 241.439 29.054 L 240.283 28.099 L 240.283 28.099 L 241.439 29.054 Z " +
  "M 0 68 L 0 69.5 L 171.588 69.5 L 171.588 68 L 171.588 66.5 L 0 66.5 L 0 68 Z " +
  "M 233.269 38.946 L 234.426 39.901 L 242.596 30.01 L 241.439 29.054 L 240.283 28.099 L 232.113 37.99 L 233.269 38.946 Z " +
  "M 303.12 0 L 303.12 1.5 L 392 1.5 L 392 0 L 392 -1.5 L 303.12 -1.5 L 303.12 0 Z " +
  "M 241.439 29.054 L 242.596 30.01 C 257.508 11.955 279.703 1.5 303.12 1.5 L 303.12 0 L 303.12 -1.5 C 278.808 -1.5 255.765 9.354 240.283 28.099 L 241.439 29.054 Z " +
  "M 171.588 68 L 171.588 69.5 C 195.901 69.5 218.943 58.646 234.426 39.901 L 233.269 38.946 L 232.113 37.99 C 217.2 56.045 195.006 66.5 171.588 66.5 L 171.588 68 Z";

/**
 * "Vector 5" — the longer rule beside "Pesan dari Pimpinan". Same construction
 * as RULE_PATH but a 561x66 box with its bends at x=137.326 and x=274.977.
 */
const RULE_PATH_561 =
  "M 224.21 18.172 L 223.258 17.013 L 224.21 18.172 Z " +
  "M 0 66 L 0 67.5 L 137.326 67.5 L 137.326 66 L 137.326 64.5 L 0 64.5 L 0 66 Z " +
  "M 188.094 47.828 L 189.046 48.987 L 225.162 19.332 L 224.21 18.172 L 223.258 17.013 L 187.142 46.668 L 188.094 47.828 Z " +
  "M 274.977 0 L 274.977 1.5 L 561 1.5 L 561 0 L 561 -1.5 L 274.977 -1.5 L 274.977 0 Z " +
  "M 224.21 18.172 L 225.162 19.332 C 239.203 7.802 256.809 1.5 274.977 1.5 L 274.977 0 L 274.977 -1.5 C 256.115 -1.5 237.836 5.043 223.258 17.013 L 224.21 18.172 Z " +
  "M 137.326 66 L 137.326 67.5 C 156.189 67.5 174.468 60.957 189.046 48.987 L 188.094 47.828 L 187.142 46.668 C 173.101 58.198 155.495 64.5 137.326 64.5 L 137.326 66 Z";

/**
 * The long rule that flanks each section heading.
 *
 * fig: VECTOR "Vector 4/6/7/8/9" — a 392x68 box. The shape is a flat run
 * along the bottom to x=171.588, a bezier sweep up to (242.596, 30.01), a
 * short diagonal, a second sweep, then a flat run along the top from
 * x=303.12 to 392. It is a filled outline (1.5px thick, expressed as the
 * path's own area), not a stroked pill.
 *
 * `flip` mirrors it for the right-hand side of the heading, which the design
 * does with `matrix(-1,0,0,1,x,y)` — the mirror happens about the left edge,
 * so the caller's x is the RIGHT edge of the mirrored copy. "Vector 5" is
 * mirrored too, which is why `long` also passes through the matrix.
 */
export function CurvedRule({
  x,
  y,
  color,
  flip,
  long,
}: {
  x: number;
  y: number;
  color: string;
  flip?: boolean;
  /** use the 561x66 "Vector 5" shape instead of the 392x68 one */
  long?: boolean;
}) {
  const w = long ? 561 : 392;
  const h = long ? 66 : 68;
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
        left: flip ? 0 : x,
        top: flip ? 0 : y,
        ...(flip
          ? { transform: `matrix(-1,0,0,1,${x},${y})`, transformOrigin: "0 0" }
          : null),
        width: w,
        height: h,
        color,
      }}
    >
      <path
        d={long ? RULE_PATH_561 : RULE_PATH}
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * The rule under a section title: a 2px hairline, a 10px cap over its first
 * 80px, and a 12px dot at the far end.
 *
 * fig: FRAME "Group 176/177/178/193", `overflow: hidden`, height 12. The dot
 * sits at `left: w - 12`; both lines sit at `top: 7` and are drawn upward
 * (negative viewBox), so they hang off the bottom of their own box.
 */
export function TitleRule({
  x,
  y,
  w,
  color,
  capColor,
}: {
  x: number;
  y: number;
  /** total group width, dot included */
  w: number;
  color: string;
  capColor?: string;
}) {
  const cap = capColor ?? color;
  const lineW = w - 11;
  return (
    <N x={x} y={y} w={w} h={12} style={{ overflow: "hidden" }} aria-hidden>
      {/* Ellipse 14 — 12px dot at the end */}
      <div
        style={{
          position: "absolute",
          left: w - 12,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: cap,
        }}
      />
      {/* Line 3 — 80x10 cap */}
      <svg
        width={80}
        height={10}
        viewBox="0 -10 80 10"
        fill="none"
        style={{
          overflow: "visible",
          position: "absolute",
          left: 0,
          top: 7,
          width: 80,
          height: 10,
          color: cap,
        }}
      >
        <path
          d="M 0 -5 L 0 0 L 80 0 L 80 -5 L 80 -10 L 0 -10 L 0 -5 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      {/* Line 4 — the 2px hairline */}
      <svg
        width={lineW}
        height={2}
        viewBox={`0 -2 ${lineW} 2`}
        fill="none"
        style={{
          overflow: "visible",
          position: "absolute",
          left: 0,
          top: 7,
          width: lineW,
          height: 2,
          color,
        }}
      >
        <path
          d={`M 0 -1 L 0 0 L ${lineW} 0 L ${lineW} -1 L ${lineW} -2 L 0 -2 L 0 -1 Z`}
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    </N>
  );
}

/**
 * The eyebrow dot beside a section kicker.
 * fig: ELLIPSE "Ellipse 13/15/16/17/18", 12x12.
 */
export function Dot({
  x,
  y,
  color,
  size = 12,
}: {
  x: number;
  y: number;
  color: string;
  size?: number;
}) {
  return (
    <N
      x={x}
      y={y}
      w={size}
      h={size}
      style={{ borderRadius: "50%", backgroundColor: color }}
      aria-hidden
    />
  );
}

/**
 * A short solid accent bar.
 * fig: LINE "Line 1/5/6/7" — w=80, stroke 4, #F58220, align CENTER
 * (so it straddles the y, hence the 2px offset).
 */
export function AccentBar({
  x,
  y,
  w = 80,
  color = "#F58220",
  weight = 4,
}: {
  x: number;
  y: number;
  w?: number;
  color?: string;
  weight?: number;
}) {
  return (
    <N
      x={x}
      y={y - weight / 2}
      w={w}
      h={weight}
      style={{ background: color }}
      aria-hidden
    />
  );
}

/**
 * The arrow used in every circular pager / "read more" button.
 * fig: INSTANCE "vuesax/linear/arrow-right".
 */
export function ArrowRight({
  size = 24,
  color = "#FFFFFF",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        d="M14.43 5.93 20.5 12l-6.07 6.07M3.5 12h16.83"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
