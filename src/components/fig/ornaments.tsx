/**
 * Decorative geometry, rebuilt from the decoded node values rather than traced
 * off a screenshot. Every number below appears in `docs/fig-spec/SPEC-home.txt`.
 */
import { N } from "./canvas";

/**
 * The long curved rule that flanks each section heading.
 *
 * fig: VECTOR "Vector 4/6/7/8/9", w=392 h=68, cornerRadius 80, stroke 3,
 * drawn on a normalized canvas of 509.5 x 68.5 — i.e. it is a stadium
 * (pill) whose right end is CLIPPED: only 392 of the 509.5 shows. The stroke
 * is a linear gradient running from full colour to fully transparent, which
 * is why the line fades out as it travels away from the title.
 *
 * `flip` mirrors it for the right-hand side of the heading.
 */
export function CurvedRule({
  x,
  y,
  color,
  flip,
  w = 392,
  vw = 509.5,
}: {
  x: number;
  y: number;
  color: string;
  flip?: boolean;
  w?: number;
  vw?: number;
}) {
  const h = 68;
  const vh = 68.5;
  return (
    <N x={x} y={y} w={w} h={h} style={{ overflow: "hidden" }} aria-hidden>
      <svg
        width={vw}
        height={vh}
        viewBox={`0 0 ${vw} ${vh}`}
        fill="none"
        style={{
          position: "absolute",
          top: 0,
          /*
           * The pill is wider (509.5) than the visible node (392), so one end
           * is cut off. The CLOSED, rounded end is the one that sits away
           * from the heading; the cut end runs into it. For the left-hand
           * rule that means anchoring the drawing's left edge and letting the
           * right (heading-side) end overflow out of the clip.
           */
          left: 0,
          transform: flip ? "scaleX(-1)" : undefined,
          transformOrigin: "center",
        }}
      >
        <defs>
          {/* Solid at the heading-side (right) end, fading out as it travels
              away — matching the fig's stroke gradient, whose transform
              reverses it along x. */}
          <linearGradient
            id={`cr-${x}-${y}`}
            x1={vw}
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={color} stopOpacity="0.9" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width={vw - 3}
          height={vh - 3}
          rx={80 - 1.5}
          stroke={`url(#cr-${x}-${y})`}
          strokeWidth="3"
        />
      </svg>
    </N>
  );
}

/**
 * The rule under a section title: a 2px hairline the full width, a 10px cap
 * over its first 80px, and a 12px dot at the far end.
 *
 * fig: FRAME "Group 176/177/178/193" — LINE "Line 4" (w varies, stroke 2),
 * LINE "Line 3" (w=80, stroke 10), ELLIPSE "Ellipse 14" (12x12).
 * The lines sit 7px below the group's top; the dot sits at the top.
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
  return (
    <N x={x} y={y} w={w} h={12} aria-hidden>
      {/* Line 4 — 2px hairline, stops short of the dot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 6,
          width: w - 12 + 1,
          height: 2,
          background: color,
        }}
      />
      {/* Line 3 — 10px cap over the first 80px */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 2,
          width: 80,
          height: 10,
          background: cap,
        }}
      />
      {/* Ellipse 14 — 12px dot at the end */}
      <div
        style={{
          position: "absolute",
          left: w - 12,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: 6,
          background: cap,
        }}
      />
    </N>
  );
}

/**
 * The eyebrow dot that sits beside a section kicker.
 * fig: ELLIPSE "Ellipse 13/15/16/17/18", 12x12, 1px gradient stroke.
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
      r={size / 2}
      style={{ background: color }}
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
