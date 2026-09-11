/**
 * Fig canvas primitives.
 *
 * The Figma frame `home page` is an absolute 1440 x 6627 canvas: every node
 * carries a literal x/y/w/h decoded out of the file's Kiwi node tree
 * (see `docs/fig-spec/SPEC-home.txt`). Rebuilding that in flow layout means
 * re-deriving each position from paddings and gaps, and the rounding drifts a
 * few pixels at every step.
 *
 * So at >= 1440px we don't re-derive anything: `<Canvas>` opens a 1440-wide
 * positioning context and `<N>` drops each node at its decoded coordinate.
 * Below 1440px the same sections render as a separate, genuinely responsive
 * flow layout — see the `mobile` prop on each section.
 */
import type { CSSProperties, ReactNode } from "react";

export const FIG_W = 1440;

/** Absolute box at fig coordinates. */
export function N({
  x,
  y,
  w,
  h,
  r,
  style,
  className,
  children,
  as: Tag = "div",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** cornerRadius, straight from the node */
  r?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}) {
  return (
    <Tag
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        ...(w !== undefined ? { width: w } : null),
        ...(h !== undefined ? { height: h } : null),
        ...(r !== undefined ? { borderRadius: r } : null),
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * The 1440-wide stage. Height is the fig frame height so absolute children
 * have something to sit in.
 */
export function Canvas({
  h,
  children,
  className,
  style,
}: {
  h: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: FIG_W,
        height: h,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Text node. The fig stores line-height either as a percentage of font size
 * or as a raw multiplier; both arrive here already normalised to a number.
 */
export function T({
  x,
  y,
  w,
  h,
  size,
  lh,
  weight = 400,
  italic,
  color,
  align,
  tracking,
  style,
  className,
  children,
  as: Tag = "div",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  size: number;
  /** unitless line-height multiplier */
  lh: number;
  weight?: 300 | 400 | 700 | 900;
  italic?: boolean;
  color: string;
  align?: "left" | "center" | "right";
  tracking?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
}) {
  return (
    <Tag
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        ...(w !== undefined ? { width: w } : null),
        ...(h !== undefined ? { height: h } : null),
        fontSize: size,
        lineHeight: lh,
        fontWeight: weight,
        ...(italic ? { fontStyle: "italic" } : null),
        color,
        ...(align ? { textAlign: align } : null),
        ...(tracking ? { letterSpacing: tracking } : null),
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
