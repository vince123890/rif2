import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type MenuRow = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** Three photos make up the fig's stacked cluster. */
  images: string[];
};

/**
 * Section-landing rows — `list menu` in the fig
 * (docs/dari_claude_design/project/components/ListMenu.jsx).
 *
 * Five rows alternate side on a 1160px rhythm (900 tall band + 260 gap in
 * the fig's own y-deltas: 900, 2060, 3220 for the copy-right rows; 1480,
 * 2640 for the copy-left ones):
 *
 *   Rows 1/3/5 — copy at x=609 (right), 379x400 photo cluster at x=130
 *   (left), sitting on a dark-navy `rgb(16,24,40)` wavy band.
 *
 *   Rows 2/4 — copy at x=155 (left), the same cluster mirrored to x≈931
 *   (right, via `matrix(-1,0,0,1,1310,Y)`), on a light-grey
 *   `rgb(242,242,242)` wavy band.
 *
 * The band itself is not a rectangle: every row uses the identical
 * 1280x580 wavy-edged path (viewBox "0 0 1280 580"), just recoloured and,
 * on even rows, horizontally mirrored. Text and button colours invert
 * with the band: white copy / white-button-green-text on the dark rows,
 * dark-ink copy / green-button-white-text on the light rows — confirmed
 * against the export rather than assumed from row order alone.
 */
export function FigMenuRows({ rows, cta }: { rows: MenuRow[]; cta: string }) {
  return (
    <div className="space-y-16 lg:space-y-20">
      {rows.map((row, i) => {
        /* fig: rows 1, 3 and 5 (even index) put the copy on the right, on a dark band. */
        const dark = i % 2 === 0;

        return (
          <div key={row.key} className="container-rif">
            {/*
              fig: the band is a bare <svg overflow="visible"> floating
              directly on the page — no clipping wrapper, no extra
              border-radius on a container. The wave IS the whole shape,
              so this div carries no rounding/background/overflow of its
              own; RowBand paints the entire visible silhouette.
            */}
            <div className="relative">
              {/* fig: the wavy 1280x580 band the row sits on, mirrored on light rows */}
              <RowBand dark={dark} mirror={!dark} />

              <div
                className={cn(
                  "relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:gap-[100px] lg:px-[65px] lg:py-16",
                  "lg:grid-cols-[379fr_676fr]",
                )}
              >
                <Reveal className={cn("order-1", dark ? "lg:order-1" : "lg:order-2")}>
                  <PhotoCluster images={row.images} dark={dark} mirror={!dark} />
                </Reveal>

                <Reveal
                  delay={110}
                  className={cn("order-2", dark ? "lg:order-2" : "lg:order-1")}
                >
                  {/* fig: 40px Bold title over a 16px body, gap 24 */}
                  <h2
                    className={cn(
                      "text-[28px] font-bold leading-[1.2] md:text-[40px] md:leading-[1.5]",
                      dark ? "text-white" : "text-ink-900",
                    )}
                  >
                    {row.title}
                  </h2>

                  <p
                    className={cn(
                      "mt-6 max-w-[676px] text-[15px] leading-[1.6] md:text-[16px]",
                      dark ? "text-white/90" : "text-ink-500",
                    )}
                  >
                    {row.body}
                  </p>

                  {/* fig: 64-tall button, radius 12, white-on-dark / green-on-light */}
                  <ButtonLink
                    href={row.href}
                    className={cn(
                      "mt-[50px] h-16 rounded-[12px] px-6 text-[17px] font-normal leading-[1.7] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] md:text-[20px]",
                      dark
                        ? "bg-white text-brand-600 hover:bg-white/90"
                        : "bg-brand-600 text-white hover:bg-brand-700",
                    )}
                  >
                    {cta}
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The row's own background shape — fig: a single 1280x580 wavy rounded
 * rectangle (not a plain rect), `rgb(16,24,40)` on dark rows and
 * `rgb(242,242,242)` on light rows, horizontally mirrored via
 * `matrix(-1,0,0,1,W,Y)` on the light rows so the wave reads the same
 * direction either side.
 */
function RowBand({ dark, mirror }: { dark: boolean; mirror: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1280 580"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M 0 75.259 C 0 34.605 34.515 2.502 75.062 5.442 L 1215.062 88.092 C 1251.662 90.745 1280 121.213 1280 157.909 L 1280 422.091 C 1280 458.787 1251.662 489.255 1215.062 491.908 L 75.062 574.558 C 34.515 577.498 0 545.395 0 504.741 L 0 75.259 Z"
        fill={dark ? "#101828" : "#F2F2F2"}
      />
    </svg>
  );
}

/*
 * The three cluster photo masks — fig: two mirrored "teardrop" shapes (top
 * and bottom) and one "pill/lozenge" shape (middle), each 245.123x126.537 /
 * 218.543x126.537. Copied verbatim from the resolved export
 * (ListMenu.jsx:3039/3089/3114 — the bottom teardrop is the top one's own
 * path with `transform="matrix(1,0,0,-1,0,126.537)"` applied, i.e. flipped
 * vertically in place) rather than approximated with a plain rounded rect.
 */
const TEARDROP_PATH =
  "M 42.457 126.537 L 228.383 126.537 C 236.774 126.537 242.812 118.516 240.387 110.484 C 236.232 96.723 230.004 76.871 224.45 62.28 C 217.529 44.099 205.989 19.202 200.288 7.135 C 198.218 2.754 193.808 0 188.963 0 L 17.984 0 C 9.231 0 3.095 8.69 5.898 16.982 C 10.32 30.064 16.19 48.228 19.689 62.28 C 23.832 78.924 27.744 102.232 29.862 115.721 C 30.838 121.931 36.171 126.537 42.457 126.537 Z";
const LOZENGE_PATH =
  "M 0.941 13.604 C 0.47 6.261 6.281 0 13.64 0 L 203.197 0 C 209.677 0 215.1 4.898 215.666 11.354 C 216.832 24.656 218.543 46.951 218.543 63.268 C 218.543 79.586 216.832 101.88 215.666 115.183 C 215.1 121.638 209.677 126.537 203.197 126.537 L 13.64 126.537 C 6.281 126.537 0.47 120.275 0.941 112.932 C 1.806 99.466 2.953 78.687 2.953 63.268 C 2.953 47.85 1.806 27.071 0.941 13.604 Z";

/**
 * fig cluster group: three masked photos plus a 128px roundel carrying an
 * icon, 379x400. On light rows the whole cluster mirrors
 * (`matrix(-1,0,0,1,1310,Y)` in the source) so the wide teardrop lobe faces
 * the copy on both sides; reproduced here with a CSS `scaleX(-1)` on the
 * cluster and a matching un-mirror on each photo's own crop so the photos
 * themselves don't render backwards.
 */
function PhotoCluster({
  images,
  dark,
  mirror,
}: {
  images: string[];
  dark: boolean;
  mirror: boolean;
}) {
  const [a, b, c] = [images[0], images[1] ?? images[0], images[2] ?? images[0]];
  // fig percentages, derived from the 379x400 cluster box.
  const topLeft = (129.94 / 379) * 100;
  const topWidth = (245.123 / 379) * 100;
  const topHeight = (126.537 / 400) * 100;
  const midLeft = (160.457 / 379) * 100;
  const midTop = (136.606 / 400) * 100;
  const midWidth = (218.543 / 379) * 100;
  const bottomTop = (273.463 / 400) * 100;
  const roundelSize = (128.032 / 379) * 100;
  const roundelTop = (136.606 / 400) * 100;

  return (
    <div
      className="relative mx-auto aspect-[379/400] w-full max-w-[379px]"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      <MaskedPhoto
        src={a}
        path={TEARDROP_PATH}
        viewBox="0 0 245.123 126.537"
        style={{ left: `${topLeft}%`, top: 0, width: `${topWidth}%`, height: `${topHeight}%` }}
        unmirror={mirror}
      />

      <MaskedPhoto
        src={b}
        path={LOZENGE_PATH}
        viewBox="0 0 218.543 126.537"
        style={{ left: `${midLeft}%`, top: `${midTop}%`, width: `${midWidth}%`, height: `${topHeight}%` }}
        unmirror={mirror}
      />

      <MaskedPhoto
        src={c}
        path={TEARDROP_PATH}
        viewBox="0 0 245.123 126.537"
        pathTransform="matrix(1,0,0,-1,0,126.537)"
        style={{ left: `${topLeft}%`, top: `${bottomTop}%`, width: `${topWidth}%`, height: `${topHeight}%` }}
        unmirror={mirror}
      />

      {/* fig: 128px roundel, white on dark rows, dark-navy on light rows (inverts with the band) */}
      <div
        className={cn(
          "absolute grid place-items-center rounded-full shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] backdrop-blur-[2px]",
          dark ? "bg-white" : "bg-[#101828]",
        )}
        style={{ left: 0, top: `${roundelTop}%`, width: `${roundelSize}%`, height: `${roundelSize}%` }}
      >
        <ChatIcon className={cn("h-1/2 w-1/2", dark ? "text-brand-600" : "text-white")} />
      </div>
    </div>
  );
}

function MaskedPhoto({
  src,
  path,
  viewBox,
  pathTransform,
  style,
  unmirror,
}: {
  src: string;
  path: string;
  viewBox: string;
  pathTransform?: string;
  style: React.CSSProperties;
  unmirror: boolean;
}) {
  const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}'><path d='${path}' fill='#000'${
      pathTransform ? ` transform='${pathTransform}'` : ""
    }/></svg>`,
  )}")`;

  return (
    <div
      className="absolute overflow-hidden shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)]"
      style={{
        ...style,
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="245px"
        className="object-cover"
        style={unmirror ? { transform: "scaleX(-1)" } : undefined}
      />
    </div>
  );
}

/**
 * fig `LinearCallCallChatRounded` — the icon inside the roundel. Same
 * two-path glyph already used at 16px in the footer's contact badges
 * (src/components/layout/contact-badge.tsx), here drawn with
 * `stroke="currentColor"` instead of a hardcoded white so it can flip with
 * the roundel's own background colour.
 */
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M 0 5 C 0 7.761 2.239 10 5 10 M 5 0 C 2.239 0 0 2.239 0 5 M 10 5 C 10 2.239 7.761 0 5 0 M 9.478 7.226 C 9.812 6.556 10 5.8 10 5 M 9.411 7.8 C 9.36 7.608 9.39 7.404 9.478 7.226 M 9.709 8.913 L 9.411 7.8 M 9.709 8.913 C 9.839 9.396 9.396 9.839 8.913 9.709 L 7.8 9.411 C 7.608 9.36 7.404 9.39 7.226 9.478 C 6.556 9.812 5.8 10 5 10 Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="matrix(-1,0,0,1,22,2)"
      />
      <path
        d="M 6.687 2.479 L 6.038 1.316 M 6.115 5.828 C 7.037 4.905 7.272 3.529 6.687 2.479 M 7.025 8.975 C 4.996 6.947 6.115 5.828 6.115 5.828 M 7.025 8.975 C 9.053 11.004 10.172 9.885 10.172 9.885 C 11.095 8.963 12.471 8.728 13.521 9.313 L 14.684 9.962 C 16.269 10.847 16.456 13.069 15.063 14.462 C 14.226 15.299 13.2 15.95 12.067 15.993 C 10.159 16.066 6.918 15.583 3.668 12.332 C 0.417 9.082 -0.066 5.841 0.007 3.933 C 0.05 2.8 0.701 1.774 1.538 0.937 C 2.931 -0.456 5.153 -0.269 6.038 1.316 Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(2,6)"
      />
    </svg>
  );
}
