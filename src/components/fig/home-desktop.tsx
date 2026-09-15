/**
 * Home page, desktop (>= 1440px) — a 1:1 rebuild of the fig frame
 * `home page` (1440 x 6627).
 *
 * Every coordinate, size, radius, colour and effect below is a literal value
 * decoded from the .fig node tree; the matching line in
 * `docs/fig-spec/SPEC-home.txt` is cited next to anything non-obvious.
 * Nothing here is eyeballed from a screenshot.
 */
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { Canvas, N, T } from "./canvas";
import {
  AccentBar,
  ArrowRight,
  CalendarIcon,
  CurvedRule,
  Dot,
  TitleRule,
} from "./ornaments";
import { FigReveal } from "./fig-reveal";
import { HomeFooter } from "./home-footer";
import { ProductCarousel, type HomeProduct } from "./product-carousel";
import {
  NotchedCard,
  NOTCH_CARD_410,
  NOTCH_CARD_481,
} from "./notched-card";

export type { HomeProduct };

const GREEN = "#006F4F";
const ORANGE = "#F58220";
const INK = "#0F0F0F";
const MUTED = "#6E6E6E";
const MINT = "#F2F8F6";

export type HomeArticle = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

export type HomeReport = {
  year: string;
  title: string;
  downloadHref: string;
  viewHref: string;
};

export type HomeCopy = {
  heroTitle: string;
  heroTitleAccent: string;
  heroLead: string;
  managementEyebrow: string;
  managementHeading: string;
  managementSalutation: string;
  managementBody: string;
  managementCta: string;
  productsEyebrow: string;
  productsHeading: string;
  reportsEyebrow: string;
  reportsHeading: string;
  tabSustainability: string;
  tabFinancial: string;
  download: string;
  viewPdf: string;
  newsEyebrow: string;
  newsHeading: string;
  seeMore: string;
  readMore: string;
  prevSlide: string;
  nextSlide: string;
  footerBlurb: string;
};

export function HomeDesktop({
  copy,
  products,
  articles,
  reports,
}: {
  copy: HomeCopy;
  products: HomeProduct[];
  articles: HomeArticle[];
  reports: HomeReport[];
}) {
  return (
    <Canvas h={6627} style={{ background: "#F9FAFB", overflow: "hidden" }}>
      {/* drives the scroll-reveal on every node marked `reveal` */}
      <FigReveal />
      {/* ================================================================
          HERO — y 0..900
          "Mask group" 1440x900 photo, then "Rectangle 5" #00100C @0.8
          ================================================================ */}
      <N x={0} y={0} w={1440} h={900} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/hero-bg.webp"
          alt=""
          width={1440}
          height={901}
          priority
          style={{ width: 1440, height: 901, objectFit: "cover" }}
        />
      </N>
      {/* Rectangle 5 — the wash that makes the white type legible */}
      <N
        x={0}
        y={0}
        w={1440}
        h={900}
        style={{ background: "#00100C", opacity: 0.8 }}
      />

      {/*
       * 70px Lato in a 641x168 box at lineHeight 100%. The break after the
       * comma is a literal U+2028 LINE SEPARATOR inside the string, honoured
       * by `pre-wrap` — the text must never rewrap on width, or the second
       * line starts with "a" instead of "for".
       */}
      <T
        x={80}
        y={220}
        w={641}
        h={168}
        size={70}
        lh={1}
        color="#FFFFFF"
        as="h1"
        style={{ whiteSpace: "nowrap", display: "inline-block" }}
      >
        {copy.heroTitle}
        <br />
        {"for a "}
        <span style={{ color: ORANGE }}>Brighter Future.</span>
      </T>

      <T
        x={935}
        y={290}
        w={425}
        h={90}
        size={20}
        lh={1.5}
        color="#FFFFFF"
        as="p"
      >
        {copy.heroLead}
      </T>

      {/* The four tilted photo cards, "Group 167" x=-90 y=519, bleeding
          off both edges. Outer pair 411.16x352.67, inner pair
          391.37x286.43 and dropped 32.69px lower. */}
      <HeroStrip />

      {/* ================================================================
          PESAN DARI PIMPINAN — y 1000..1533
          ================================================================ */}
      {/* Rectangle 102 — the green tint behind the portrait */}
      <N
        x={80}
        y={1000}
        w={400}
        h={550}
        r={32}
        reveal
        style={{ background: GREEN, opacity: 0.05 }}
      />
      {/*
       * The faint "R" watermark. There is no white card underneath it —
       * an earlier version added `background: "#FFFFFF"` here, which isn't
       * in the fig at all and is what flattened this into a plain white
       * panel. The watermark is its own clip frame (same 400x550 rounded
       * bounds as Rectangle 102, no fill of its own) sitting between the
       * tint and the photo, so it only shows through where the photo
       * doesn't cover it.
       *
       * Geometry is copied verbatim from the fig's own resolved transform
       * chain (974x974 box -> rotated 704.528 box -> flipped 548.665x547.002
       * box -> the mark's path), not re-derived from the raw vector blob:
       *   left:-110 top:-355, 974x974
       *     matrix(0.542,-0.840,0.840,0.542, 0, 591.934), 704.528x704.528
       *       matrix(1,0,0,-1, 76.411, 625.988), 548.665x547.002
       *         <path> fill rgba(0,111,79,0.04)
       */}
      <N
        x={80}
        y={1000}
        w={400}
        h={550}
        r={32}
        reveal
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            left: -110,
            top: -355,
            width: 974,
            height: 974,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: "matrix(0.542,-0.840,0.840,0.542,0,591.934)",
              transformOrigin: "0 0",
              width: 704.528,
              height: 704.528,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "matrix(1,0,0,-1,76.411,625.988)",
                transformOrigin: "0 0",
                width: 548.665,
                height: 547.002,
                overflow: "hidden",
              }}
            >
              <svg
                width={548.665}
                height={547.002}
                viewBox="0 0 548.665 547.002"
                fill="none"
                aria-hidden
                style={{
                  overflow: "visible",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 548.665,
                  height: 547.002,
                  color: "rgba(0,111,79,0.04)",
                }}
              >
                <path
                  d="M 240.627 543.793 C 223.796 541.053 223.796 541.053 236.712 540.271 C 287.204 537.922 332.607 515.612 353.351 483.908 C 362.745 469.035 363.919 463.947 363.919 434.2 C 363.528 405.236 362.353 398.974 353.351 385.274 C 347.871 376.664 339.26 365.704 334.172 361.399 C 321.647 350.048 293.075 336.74 275.07 333.609 C 266.851 332.435 260.197 329.304 260.197 326.955 C 260.197 324.607 268.025 308.559 277.81 291.337 C 287.204 274.116 300.12 250.24 305.991 238.498 C 322.43 206.794 347.871 182.527 375.661 171.959 C 395.231 164.914 405.016 163.739 433.589 164.914 C 454.725 166.088 467.25 164.914 466.467 162.565 C 465.684 160.608 455.116 153.563 442.591 146.909 C 424.978 137.907 413.236 134.775 392.492 133.601 C 368.616 132.036 362.745 133.21 340.435 144.169 C 286.029 171.176 251.586 215.013 207.749 314.43 C 202.269 326.955 197.572 337.914 197.572 338.306 C 197.572 339.089 207.749 340.654 220.273 342.22 C 246.889 345.351 277.027 360.616 289.944 377.446 C 303.643 395.451 309.122 426.763 303.643 452.205 C 290.335 511.698 197.963 530.877 118.117 490.562 C 89.544 475.689 49.621 434.2 32.008 400.539 C 6.567 351.222 -4.784 293.686 1.87 245.152 C 10.481 182.135 35.922 127.73 75.845 86.633 C 162.737 -3.782 283.681 -24.918 397.188 30.27 C 428.109 45.144 439.851 53.755 468.033 81.544 C 495.822 109.726 504.433 121.468 519.307 152.389 C 538.877 193.095 543.965 210.708 547.879 252.197 C 551.402 287.032 542.791 340.263 527.917 378.621 C 515.393 410.716 478.209 460.424 450.811 481.951 L 434.372 494.868 L 448.462 477.255 C 516.175 392.32 536.528 261.982 490.734 204.054 C 465.684 171.568 420.673 178.221 383.098 220.102 C 363.528 242.02 318.125 328.912 325.561 331.261 C 327.518 332.043 343.566 341.829 360.396 353.179 C 409.713 385.666 426.935 416.195 416.759 453.379 C 411.279 474.515 371.356 515.221 344.349 527.746 C 327.518 535.574 273.505 548.099 262.154 546.925 C 260.197 546.925 250.412 545.359 240.627 543.793 Z M 210.488 482.343 C 217.534 478.037 226.927 468.644 232.016 461.207 C 239.844 449.856 241.018 443.985 239.844 423.632 C 236.712 375.881 203.443 347.7 145.907 344.96 C 129.076 344.177 115.377 341.829 115.377 340.263 C 115.377 333.218 161.171 250.24 184.264 215.013 C 237.104 133.993 287.595 101.898 363.528 101.115 L 391.317 100.723 L 369.79 90.938 C 335.738 75.673 304.425 69.02 263.328 69.411 C 155.3 69.411 65.669 137.907 39.053 240.455 C 30.051 276.464 30.834 371.184 40.619 398.191 C 55.101 437.723 96.981 476.08 138.079 487.822 C 161.171 494.085 194.049 491.737 210.488 482.343 Z"
                  fill="currentColor"
                  fillRule="nonzero"
                />
              </svg>
            </div>
          </div>
        </div>
      </N>
      {/*
       * image 29 — the node is 302x507 at +49/+43 inside the card, but its
       * paint is STRETCH with a transform that scales the source to 0.62 x
       * 0.97 and offsets it, so the portrait fills the frame rather than
       * sitting inside it as a small contained image. Reproduced by
       * covering the box and anchoring to the bottom, which is where the
       * transform lands it. This is its own layer (not nested in a white
       * card — the fig has no white fill here), clipped to the same
       * rounded bounds so it still reads as one card with the tint/mark.
       */}
      <N x={80} y={1000} w={400} h={550} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/ceo.webp"
          alt=""
          width={302}
          height={507}
          loading="eager"
          style={{
            position: "absolute",
            left: 49,
            top: 43,
            width: 302,
            height: 507,
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
        />
      </N>
      {/* Group 161 — the RESONA mark over the card */}
      <N x={112} y={1032} w={60.37} h={80.67}>
        <Image
          src="/brand/resona-mark.png"
          alt="Resona"
          width={58}
          height={60}
          style={{ width: 57.66, height: 59.64, objectFit: "contain" }}
        />
      </N>

      {/* Vector 5 — the long curve that sweeps in from the right margin.
          x=1360 w=561 on a 600-wide normalized canvas, no fill. */}
      <CurvedRule x={1360} y={1030} color={GREEN} fadeTo="#0B3706" flip long />
      <Dot x={800} y={1024} color={GREEN} fadeTo="#0B3706" />

      <T
        x={530}
        y={1018}
        w={420}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.managementEyebrow}
      </T>
      {/* The node is auto-sized to 360x48 — one line at 40px. Browsers
          measure Lato a shade wider than Figma does, so the box is given
          room and told not to wrap rather than being pinned to 360. */}
      <T
        x={530}
        y={1054}
        h={48}
        size={40}
        lh={1.2}
        weight={700}
        color={INK}
        as="h2"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.managementHeading}
      </T>
      {/* Group 177 — w=371 (360 rule + 12 dot, overlapping by 1) */}
      <TitleRule x={530} y={1114} w={371} color={ORANGE} />

      <T
        x={530}
        y={1158}
        w={830}
        h={29}
        size={24}
        lh={1}
        weight={700}
        color={INK}
        as="p"
      >
        {copy.managementSalutation}
      </T>
      <T
        x={530}
        y={1203}
        w={830}
        h={234}
        size={16}
        lh={1.6}
        color={MUTED}
        align="left"
        as="p"
        style={{ textAlign: "justify" }}
      >
        {copy.managementBody}
      </T>

      {/*
       * Button — 216x64 r12, two stacked drop shadows. The flow-layout
       * version of this section linked to /about/management-message; that
       * href was lost when the section was rebuilt as an absolute canvas
       * (N has no `Link` variant), so this restores it via next-intl's
       * locale-aware Link rather than a plain <a>.
       */}
      <Link
        href="/about/management-message"
        style={{
          position: "absolute",
          left: 529,
          top: 1469,
          width: 216,
          height: 64,
          borderRadius: 12,
          background: GREEN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1.7, color: "#FFFFFF" }}>
          {copy.managementCta}
        </span>
      </Link>

      {/* ================================================================
          PRODUK & LAYANAN — Rectangle 123, y 1650, 1392x963 r32 #006F4F
          ================================================================ */}
      <N x={24} y={1650} w={1392} h={963} r={32} reveal style={{ background: GREEN }} />

      <T
        x={440}
        y={1750}
        w={560}
        h={24}
        size={16}
        lh={1.5}
        color="#FFFFFF"
        align="center"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.productsEyebrow}
      </T>
      <T
        x={220}
        y={1786}
        w={1001}
        h={48}
        size={40}
        lh={1.2}
        weight={700}
        color="#FFFFFF"
        align="center"
        as="h2"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.productsHeading}
      </T>
      <CurvedRule x={186} y={1762} color="#FFFFFF" fadeTo="#FFFFFF" />
      <Dot x={577} y={1756} color="#FFFFFF" fadeTo="#FFFFFF" />
      <CurvedRule x={1254} y={1762} color="#FFFFFF" fadeTo="#FFFFFF" flip />
      <Dot x={863} y={1756} color="#FFFFFF" fadeTo="#FFFFFF" />
      {/* Group 176 — 331 wide, white */}
      <TitleRule x={555} y={1846} w={331} color="#FFFFFF" />

      <ProductCarousel
        products={products}
        labelPrev={copy.prevSlide}
        labelNext={copy.nextSlide}
      />

      {/* ================================================================
          TRANSPARANSI KINERJA — y 2713..3565
          ================================================================ */}
      <T
        x={440}
        y={2713}
        w={561}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        align="center"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.reportsEyebrow}
      </T>
      <T
        x={220}
        y={2749}
        w={1001}
        h={48}
        size={40}
        lh={1.2}
        weight={700}
        color={INK}
        align="center"
        as="h2"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.reportsHeading}
      </T>
      <CurvedRule x={188} y={2724} color={GREEN} fadeTo="#0B3706" />
      <Dot x={579} y={2718} color={GREEN} fadeTo="#0B3706" />
      <CurvedRule x={1253} y={2724} color={GREEN} fadeTo="#0B3706" flip />
      <Dot x={862} y={2718} color={GREEN} fadeTo="#0B3706" />
      <TitleRule x={540} y={2809} w={372} color={ORANGE} />

      {/* Frame 82 — the glass tab pill, 485x76 r100, #EEEFF0 @0.1 */}
      <N
        x={477.5}
        y={2871}
        w={485}
        h={76}
        r={100}
        style={{
          background: "rgba(238,239,240,0.1)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {/* Frame 4 — active tab, 242x44 r100 #F58220 */}
        <span
          style={{
            width: 242,
            height: 44,
            borderRadius: 100,
            background: ORANGE,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1.7,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          {copy.tabSustainability}
        </span>
        {/* Frame 3 — inactive, 203x44, no fill */}
        <span
          style={{
            width: 203,
            height: 44,
            borderRadius: 100,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1.7,
            color: INK,
          }}
        >
          {copy.tabFinancial}
        </span>
      </N>

      {reports.slice(0, 3).map((r, i) => (
        <ReportCard key={r.year} report={r} index={i} copy={copy} />
      ))}

      {/* Button "Lihat Lainnya" — 164x64 r12 */}
      <SeeMore x={638.5} y={3501} label={copy.seeMore} />

      {/* ================================================================
          BERITA TERKINI — Rectangle 27 wash y 3665, 1440x2926 #EDB886 @0.05
          ================================================================ */}
      <N
        x={0}
        y={3665}
        w={1440}
        h={2926}
        style={{ background: "#EDB886", opacity: 0.05 }}
      />

      <T
        x={440}
        y={3765}
        w={560}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        align="center"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.newsEyebrow}
      </T>
      <T
        x={220}
        y={3801}
        w={1000}
        h={48}
        size={40}
        lh={1.2}
        weight={700}
        color={INK}
        align="center"
        as="h2"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.newsHeading}
      </T>
      <CurvedRule x={186} y={3776} color={GREEN} fadeTo="#0B3706" />
      <Dot x={577} y={3770} color={GREEN} fadeTo="#0B3706" />
      <CurvedRule x={1254} y={3776} color={GREEN} fadeTo="#0B3706" flip />
      <Dot x={863} y={3770} color={GREEN} fadeTo="#0B3706" />
      <TitleRule x={602} y={3861} w={247} color={ORANGE} />

      <FeatureArticle article={articles[0]} copy={copy} />

      {/* Top-right card — y 3918 image, y 4193 body */}
      {articles[1] ? (
        <NewsCard article={articles[1]} x={949} yImage={3918} yBody={4193} id="n1" copy={copy} />
      ) : null}

      {/* Bottom row — y 4460 image, y 4735 body */}
      {articles.slice(2, 5).map((a, i) => (
        <NewsCard
          key={a.href + i}
          article={a}
          x={[81, 515, 949][i]}
          yImage={4460}
          yBody={4735}
          id={`n${i + 2}`}
          copy={copy}
        />
      ))}

      <SeeMore x={638.5} y={5028} label={copy.seeMore} />

      {/* ================================================================
          FOOTER — "Group 160", y 5192, 1440x1435
          ================================================================ */}
      <HomeFooter blurb={copy.footerBlurb} />
    </Canvas>
  );
}

/* -------------------------------------------------------------------- */

/**
 * The strip cards are NOT rectangles and are NOT rotated.
 *
 * `Rectangle 11/12/13/14` are VECTOR nodes whose blob decodes to six points:
 * four tilted corners plus a control midpoint on the top and bottom edge, so
 * each edge bows outward. Decoded from the fig:
 *
 *   411.159 x 352.667      135 x 99 (scaled to 391.375 x 286.435)
 *   v0 (0,      33.681)    v0 (0,     3)
 *   v1 (411.159, 0)        v1 (135,   0)
 *   v2 (411.159, 352.667)  v2 (135,  99)
 *   v3 (0,      319.132)   v3 (0,    97)
 *   v4 (205.579, 23.126)   v4 (67.5,  2)   <- top edge midpoint
 *   v5 (205.579, 332.432)  v5 (67.5, 97)   <- bottom edge midpoint
 *
 * Earlier versions guessed a rotate(10deg), then a bowed outline with the
 * curve running the wrong way, then a plain rounded rect — which flattened
 * the tilt away entirely.
 */
function stripShape(w: number, h: number, big: boolean) {
  /*
   * Normalised source boxes the verts were decoded against. There are only
   * TWO distinct shapes in the fig, one per card size:
   *
   *   big  (411.159 x 352.667 cards) -> 142 x 122, top edge -4.69deg
   *   small(391.375 x 286.435 cards) -> 135 x  99, top edge -1.27deg
   *
   * An earlier version paired the big cards with a 411 x 352 source box and
   * verts 33.681 / 319.132 — numbers that came from a name collision while
   * looking the node up, not from the file.
   */
  const [sw, sh] = big ? [142, 122] : [135, 99];
  const [v0y, v1y, v3y, v4y, v5y] = big
    ? [11.652, 0, 110.399, 8, 115]
    : [3, 0, 97, 2, 97];
  const sx = w / sw;
  const sy = h / sh;
  const mx = (big ? 71 : 67.5) * sx;

  // the four tilted corners, in draw order
  const c0: [number, number] = [0, v0y * sy]; // top-left
  const c1: [number, number] = [w, v1y * sy]; // top-right
  const c2: [number, number] = [w, h]; // bottom-right
  const c3: [number, number] = [0, v3y * sy]; // bottom-left
  // control points that bow the top and bottom edges outward
  const tMid: [number, number] = [mx, v4y * sy];
  const bMid: [number, number] = [mx, v5y * sy];

  /*
   * clip-path cuts exactly on the outline, so a CSS border-radius no longer
   * applies — the 32px rounding has to be built into the path. Each corner is
   * reached by stopping `r` short along the incoming edge, then curving
   * through the corner point to a point `r` along the outgoing edge.
   */
  const r = 32;
  const lerp = (
    a: [number, number],
    b: [number, number],
    d: number,
  ): [number, number] => {
    const [ax, ay] = a;
    const [bx, by] = b;
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const t = Math.min(d / len, 0.5);
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  };
  const f = (pt: [number, number]) =>
    `${+pt[0].toFixed(2)} ${+pt[1].toFixed(2)}`;

  // approach/leave points around each corner, measured along the real edges
  const a0 = lerp(c0, tMid, r); // leaving top-left along the top edge
  const b1 = lerp(c1, tMid, r); // arriving at top-right along the top edge
  const a1 = lerp(c1, c2, r); // leaving top-right down the right edge
  const b2 = lerp(c2, c1, r); // arriving at bottom-right up the right edge
  const a2 = lerp(c2, bMid, r); // leaving bottom-right along the bottom edge
  const b3 = lerp(c3, bMid, r); // arriving at bottom-left along the bottom edge
  const a3 = lerp(c3, c0, r); // leaving bottom-left up the left edge
  const b0 = lerp(c0, c3, r); // arriving at top-left down the left edge

  return (
    `M ${f(a0)} ` +
    `Q ${f(tMid)} ${f(b1)} ` + // bowed top edge
    `Q ${f(c1)} ${f(a1)} ` + // top-right corner
    `L ${f(b2)} ` +
    `Q ${f(c2)} ${f(a2)} ` + // bottom-right corner
    `Q ${f(bMid)} ${f(b3)} ` + // bowed bottom edge
    `Q ${f(c3)} ${f(a3)} ` + // bottom-left corner
    `L ${f(b0)} ` +
    `Q ${f(c0)} ${f(a0)} Z` // top-left corner
  );
}

function HeroStrip() {
  /*
   * Re-verified directly against the decoded node tree (Group 162..165,
   * their image children, and the raw vertex bytes of Rectangle 11-14) —
   * not eyeballed off a screenshot. Four distinct photos, each group's own
   * image node, exact position/size, and mirror flag taken from m00 on the
   * rectangle that actually draws that card's mask:
   *
   *   Group 162 (card 1, leftmost)  -> Rectangle 13 (m00=-1, MIRRORED) + image 10
   *   Group 163 (card 2)            -> Rectangle 14 (m00=-1, MIRRORED) + image 12
   *   Group 164 (card 3)            -> Rectangle 11 (m00=1,  normal)   + image 11
   *   Group 165 (card 4, rightmost) -> Rectangle 12 (m00=1,  normal)   + image 9
   *
   * An earlier version put `flip` on cards 2 and 4 instead of 1 and 2, and
   * never actually applied the flag to a transform at all — so every card
   * rendered with the same tilt handedness. It also carried the wrong
   * image sizes for cards 2 and 4 (569x356 instead of 700x438, and
   * 598x374 instead of 825x516).
   *
   * Offsets below are relative to "Group 167" at x=-90, y=519 (1620.55 x 352.667).
   */
  const cards = [
    { left: 0, top: 0, w: 411.159, h: 352.667, src: "/fig2/strip-1.webp", ix: -86, iy: -11, iw: 598, ih: 374, flip: true },
    { left: 417.18, top: 32.686, w: 391.375, h: 286.435, src: "/fig2/strip-3.webp", ix: -6.18, iy: -105.686, iw: 700, ih: 438, flip: true },
    { left: 812.855, top: 32.686, w: 391.375, h: 286.435, src: "/fig2/strip-2.webp", ix: 0.145, iy: -32.686, iw: 569, ih: 356, flip: false },
    { left: 1209.392, top: 0, w: 411.159, h: 352.667, src: "/fig2/strip-4.webp", ix: -135.392, iy: -119, iw: 825, ih: 516, flip: false },
  ];
  return (
    <N x={-90} y={519} w={1620.55} h={352.667} style={{ overflow: "hidden" }}>
      {cards.map((c) => {
        const shape = stripShape(c.w, c.h, c.w > 400);
        /*
         * fig mirrors Group 163/165 horizontally (T=[-1,0,0,1]) rather than
         * drawing a second shape — the tilt direction flips left-to-right.
         * `flip` was previously carried on each card's data but never
         * actually applied to the rendered shape, so all four cards drew
         * with the same handedness instead of alternating.
         */
        const mirror = c.flip
          ? { transform: "scaleX(-1)", transformOrigin: "center" }
          : undefined;
        return (
          <div
            key={c.src}
            style={{
              position: "absolute",
              left: c.left,
              top: c.top,
              width: c.w,
              height: c.h,
              overflow: "hidden",
              ...mirror,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                clipPath: `path('${shape}')`,
              }}
            >
              <Image
                src={c.src}
                alt=""
                width={Math.round(c.iw)}
                height={Math.round(c.ih)}
                loading="eager"
                style={{
                  position: "absolute",
                  left: c.ix,
                  top: c.iy,
                  width: c.iw,
                  maxWidth: "none",
                  height: c.ih,
                  borderRadius: 32,
                  objectFit: "cover",
                }}
              />
            </div>
            {/* veil: same tilted, bowed shape, filled #000000 at 0.3 */}
            <svg
              width={c.w}
              height={c.h}
              viewBox={`0 0 ${c.w} ${c.h}`}
              fill="none"
              aria-hidden
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <path d={shape} fill="rgba(0,0,0,0.3)" />
            </svg>
          </div>
        );
      })}
    </N>
  );
}

function PagerButton({
  x,
  y,
  size,
  bg,
  icon,
  iconColor = "#FFFFFF",
}: {
  x: number;
  y: number;
  size: number;
  bg: string;
  icon: number;
  iconColor?: string;
}) {
  return (
    <N
      x={x}
      y={y}
      w={size}
      h={size}
      r={size / 2}
      style={{
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ArrowRight size={icon} color={iconColor} />
    </N>
  );
}

/**
 * Report card — Rectangle 113/117/120, 410x480 r32 white, at x 80/514/948.
 * Inside: a 286x96 mint block behind an 80px Lato Black Italic year,
 * a 134x189 pattern at 30% opacity, the title, a 4px orange bar and two
 * 64-tall buttons.
 */
function ReportCard({
  report,
  index,
  copy,
}: {
  report: HomeReport;
  index: number;
  copy: HomeCopy;
}) {
  const x = [80, 514, 948][index];
  return (
    <>
      <N
        x={x}
        y={2971}
        w={410}
        h={480}
        r={32}
        reveal
        delay={index * 80}
        style={{ background: "#FFFFFF" }}
      />
      {/*
       * Rectangle 116/119/122 — the mint block behind the year. Rounded only
       * on its right edge (16px); it runs off the card's left side.
       */}
      <N
        x={x}
        y={3039}
        w={286}
        h={96}
        style={{
          background: MINT,
          borderRadius: "0px 16px 16px 0px",
        }}
      />
      <T
        x={x + 50}
        y={2991}
        w={186}
        h={96}
        size={80}
        lh={1}
        weight={900}
        italic
        color={GREEN}
      >
        {report.year}
      </T>
      <T
        x={x + 24}
        y={3185}
        w={249}
        h={68}
        size={28}
        lh={1}
        weight={700}
        color={INK}
        as="h3"
      >
        {report.title}
      </T>
      {/* Line 5/6/7 — the 80px orange bar, right-aligned in the card */}
      <AccentBar x={x + 331} y={3327} />

      {/* Frame 127/128/129 — Download (outlined) + View PDF */}
      <N
        x={x + 24}
        y={3359}
        w={176}
        h={64}
        r={12}
        style={{
          border: `1px solid ${GREEN}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <DownloadIcon />
        <span style={{ fontSize: 20, lineHeight: 1.7, color: GREEN }}>
          {copy.download}
        </span>
      </N>
      <N
        x={x + 212}
        y={3359}
        w={174}
        h={64}
        r={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <PdfIcon />
        <span style={{ fontSize: 20, lineHeight: 1.7, color: GREEN }}>
          {copy.viewPdf}
        </span>
      </N>
    </>
  );
}

/**
 * The tall featured article — "Mask group" 410x518 photo at x=81 and the
 * mint panel at x=483 w=442 whose bottom-right is notched by a 66px circle.
 */
function FeatureArticle({
  article,
  copy,
}: {
  article?: HomeArticle;
  copy: HomeCopy;
}) {
  if (!article) return null;
  return (
    <>
      <N x={81} y={3918} w={410} h={518} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/news-thumb.webp"
          alt=""
          fill
          sizes="410px"
          style={{ objectFit: "cover" }}
        />
      </N>

      {/*
       * Two layers, not one. The notched mint shape is 481x518 at x=444 —
       * wider than, and starting left of, the 442x518 image panel at x=483
       * that sits on top of it.
       */}
      <NotchedCard
        x={444}
        y={3918}
        w={481}
        h={518}
        d={NOTCH_CARD_481}
        fill={MINT}
      />

      {/*
       * The copy sits in its own 434x518 flex column at x=491, padded
       * 50/32/24/50 and rounded only on the right — the bundle lays it out
       * rather than pinning each line, so the date row stays glued to the
       * bottom however long the excerpt runs.
       */}
      <N
        x={491}
        y={3918}
        w={434}
        h={518}
        style={{
          borderRadius: "0px 32px 32px 0px",
          padding: "50px 32px 24px 50px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignSelf: "stretch",
            flexGrow: 1,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              lineHeight: 1.5,
              fontWeight: 700,
              color: INK,
            }}
          >
            {article.title}
          </h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: MUTED }}>
            {article.excerpt}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch",
            paddingRight: 32,
          }}
        >
          {/* fig "Frame 23" — calendar icon then the date, 8px apart */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              lineHeight: 1.5,
              color: MUTED,
            }}
          >
            <CalendarIcon />
            {article.date}
          </span>
          <span style={{ fontSize: 14, lineHeight: 1.5, color: GREEN }}>
            {copy.readMore}
          </span>
        </div>
      </N>
      <PagerButton x={885} y={4396} size={40} bg={ORANGE} icon={20} />
    </>
  );
}

/**
 * Standard news card: a 410x267 r32 photo, then the notched 410x243 body
 * 275px below the photo's top.
 */
function NewsCard({
  article,
  x,
  yImage,
  yBody,
  id,
  copy,
}: {
  article: HomeArticle;
  x: number;
  yImage: number;
  yBody: number;
  id: string;
  copy: HomeCopy;
}) {
  return (
    <>
      {/* 410x267 window onto a 446.637 square offset by (-0.181, -18.819) */}
      <N
        x={x}
        y={yImage}
        w={410}
        h={267}
        style={{ overflow: "hidden", borderRadius: 32 }}
      >
        <Image
          src="/fig2/news-thumb.webp"
          alt=""
          width={447}
          height={447}
          loading="eager"
          style={{
            position: "absolute",
            left: -0.181,
            top: -18.819,
            width: 446.637,
            maxWidth: "none",
            height: 446.637,
            borderRadius: 32,
            objectFit: "cover",
          }}
        />
      </N>

      <NotchedCard
        x={x}
        y={yBody}
        w={410}
        h={243}
        d={NOTCH_CARD_410}
        fill="#FFFFFF"
      />

      <T
        x={x + 24}
        y={yBody + 24}
        w={362}
        h={60}
        size={20}
        lh={1.5}
        weight={700}
        color={INK}
        as="h3"
      >
        {article.title}
      </T>
      <T
        x={x + 24}
        y={yBody + 100}
        w={362}
        h={63}
        size={14}
        lh={1.5}
        color={MUTED}
        as="p"
      >
        {article.excerpt}
      </T>
      {/* fig "Frame 23" — 16px calendar at x+24, date 8px after it */}
      <N x={x + 24} y={yBody + 191} w={16} h={16}>
        <CalendarIcon />
      </N>
      <T x={x + 48} y={yBody + 188.5} w={82} h={21} size={14} lh={1.5} color={MUTED}>
        {article.date}
      </T>
      <T x={x + 295} y={yBody + 188.5} w={67} h={21} size={14} lh={1.5} color={GREEN}>
        {copy.readMore}
      </T>
      <PagerButton x={x + 370} y={yBody + 203} size={40} bg={ORANGE} icon={20} />
    </>
  );
}

function SeeMore({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <N
      x={x}
      y={y}
      w={164}
      h={64}
      r={12}
      style={{
        background: GREEN,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1.7, color: "#FFFFFF" }}>
        {label}
      </span>
    </N>
  );
}

/* fig: the download glyph is ORANGE (#F58220), not green like its label. */
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke={ORANGE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="#E23D28"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6" stroke="#E23D28" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
