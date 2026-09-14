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

import { Canvas, N, T } from "./canvas";
import {
  AccentBar,
  ArrowRight,
  CurvedRule,
  Dot,
  TitleRule,
} from "./ornaments";
import {
  NotchedCard,
  NOTCH_CARD_410,
  NOTCH_CARD_481,
} from "./notched-card";

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
  productTitle: string;
  productBody: string;
  productBullets: string[];
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
};

export function HomeDesktop({
  copy,
  articles,
  reports,
}: {
  copy: HomeCopy;
  articles: HomeArticle[];
  reports: HomeReport[];
}) {
  return (
    <Canvas h={6627} style={{ background: "#F9FAFB", overflow: "hidden" }}>
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
        style={{ background: GREEN, opacity: 0.05 }}
      />
      {/* Rectangle 103 — white card, clipping the portrait */}
      <N
        x={80}
        y={1000}
        w={400}
        h={550}
        r={32}
        style={{ background: "#FFFFFF", overflow: "hidden" }}
      >
        {/*
         * image 29 — the node is 302x507 at +49/+43 inside the card, but its
         * paint is STRETCH with a transform that scales the source to 0.62 x
         * 0.97 and offsets it, so the portrait fills the frame rather than
         * sitting inside it as a small contained image. Reproduced by
         * covering the box and anchoring to the bottom, which is where the
         * transform lands it.
         */}
        <Image
          src="/fig2/ceo.webp"
          alt=""
          width={302}
          height={507}
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
      <CurvedRule x={1360} y={1030} color={GREEN} flip long />
      <Dot x={800} y={1024} color={GREEN} />

      <T
        x={530}
        y={1018}
        w={207}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        align="center"
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

      {/* Button — 216x64 r12, two stacked drop shadows */}
      <N
        x={529}
        y={1469}
        w={216}
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
          {copy.managementCta}
        </span>
      </N>

      {/* ================================================================
          PRODUK & LAYANAN — Rectangle 123, y 1650, 1392x963 r32 #006F4F
          ================================================================ */}
      <N x={24} y={1650} w={1392} h={963} r={32} style={{ background: GREEN }} />

      <T
        x={640}
        y={1750}
        w={160}
        h={24}
        size={16}
        lh={1.5}
        color="#FFFFFF"
        align="center"
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
      <CurvedRule x={186} y={1762} color="#FFFFFF" />
      <Dot x={577} y={1756} color="#FFFFFF" />
      <CurvedRule x={1254} y={1762} color="#FFFFFF" flip />
      <Dot x={863} y={1756} color="#FFFFFF" />
      {/* Group 176 — 331 wide, white */}
      <TitleRule x={555} y={1846} w={331} color="#FFFFFF" />

      <ProductPanel copy={copy} />

      {/* ================================================================
          TRANSPARANSI KINERJA — y 2713..3565
          ================================================================ */}
      <T
        x={642}
        y={2713}
        w={157}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        align="center"
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
      <CurvedRule x={188} y={2724} color={GREEN} />
      <Dot x={579} y={2718} color={GREEN} />
      <CurvedRule x={1253} y={2724} color={GREEN} flip />
      <Dot x={862} y={2718} color={GREEN} />
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
        x={640}
        y={3765}
        w={160}
        h={24}
        size={16}
        lh={1.5}
        color={ORANGE}
        align="center"
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
      <CurvedRule x={186} y={3776} color={GREEN} />
      <Dot x={577} y={3770} color={GREEN} />
      <CurvedRule x={1254} y={3776} color={GREEN} flip />
      <Dot x={863} y={3770} color={GREEN} />
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
    </Canvas>
  );
}

/* -------------------------------------------------------------------- */

/**
 * "Group 167" — four photo cards bleeding off both edges, each rotated
 * slightly. Outer pair 411.16x352.67 at y=519; inner pair 391.37x286.43 at
 * y=551.69. The fig rotates them via the node transform; the angles below
 * come from those matrices.
 */
/**
 * The cards are NOT rotated — an earlier version applied `rotate(±10deg)` and
 * a 1px border, both invented. The tilt is an illusion: each card is an
 * upright clipped box whose dark veil is a curved outline, bowing along the
 * top and bottom edges. The two right-hand cards are the same two shapes
 * mirrored with `matrix(-1,0,0,1,w,0)`.
 */
const STRIP_VEIL_411 =
  "M 0 64.828 C 0 47.491 13.802 33.294 31.128 32.687 C 73.035 31.217 148.877 28.092 205.579 23.126 C 258.726 18.472 331.911 9.805 375.106 4.505 C 394.253 2.155 411.159 17.08 411.159 36.371 L 411.159 317.155 C 411.159 336.141 394.769 350.962 375.88 349.031 C 332.78 344.623 259.013 337.195 205.579 332.432 C 149.423 327.427 72.428 322.974 30.406 320.71 C 13.364 319.792 0 305.722 0 288.655 L 0 64.828 Z";

const STRIP_VEIL_391 =
  "M 0 40.359 C 0 22.812 14.091 8.535 31.637 8.331 C 72.312 7.856 143.865 6.935 195.687 5.787 C 246.959 4.651 317.436 2.437 358.324 1.101 C 376.418 0.51 391.375 15.014 391.375 33.117 L 391.375 253.161 C 391.375 271.324 376.322 285.854 358.171 285.205 C 317.255 283.743 246.877 281.405 195.687 280.648 C 144.121 279.886 73.033 280.153 32.257 280.407 C 14.466 280.517 0 266.135 0 248.344 L 0 40.359 Z";

function HeroStrip() {
  // offsets are relative to "Group 167" at x=-90, y=519 (1620.55 x 352.667)
  const cards = [
    { left: 0, top: 0, w: 411.159, h: 352.667, veil: STRIP_VEIL_411, src: "/fig2/strip-1.webp", ix: -86, iy: -11, iw: 598, ih: 374, flip: false },
    { left: 417.18, top: 32.686, w: 391.375, h: 286.435, veil: STRIP_VEIL_391, src: "/fig2/strip-2.webp", ix: 0.145, iy: -32.686, iw: 569, ih: 356, flip: false },
    { left: 812.855, top: 32.686, w: 391.375, h: 286.435, veil: STRIP_VEIL_391, src: "/fig2/strip-3.webp", ix: 0.145, iy: -32.686, iw: 700, ih: 438, flip: true },
    { left: 1209.392, top: 0, w: 411.159, h: 352.667, veil: STRIP_VEIL_411, src: "/fig2/strip-4.webp", ix: -135.392, iy: -119, iw: 825, ih: 516, flip: true },
  ];
  return (
    <N x={-90} y={519} w={1620.55} h={352.667} style={{ overflow: "hidden" }}>
      {cards.map((c) => (
        <div
          key={c.src}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: c.w,
            height: c.h,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 32,
            }}
          >
            <Image
              src={c.src}
              alt=""
              width={Math.round(c.iw)}
              height={Math.round(c.ih)}
              style={{
                position: "absolute",
                left: c.ix,
                top: c.iy,
                width: c.iw,
                height: c.ih,
                borderRadius: 32,
                objectFit: "cover",
              }}
            />
          </div>
          <svg
            width={c.w}
            height={c.h}
            viewBox={`0 0 ${c.w} ${c.h}`}
            fill="none"
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: c.w,
              height: c.h,
              borderRadius: 32,
              ...(c.flip
                ? {
                    transform: `matrix(-1,0,0,1,${c.w},0)`,
                    transformOrigin: "0 0",
                  }
                : null),
            }}
          >
            <path d={c.veil} fill="rgba(0,0,0,0.3)" fillRule="nonzero" />
          </svg>
        </div>
      ))}
    </N>
  );
}

/**
 * The product carousel: a 976x600 main panel flanked by two 128x600 slivers,
 * all r32, each veiled with the same top-to-bottom gradient
 * (#00100C -> #999792, rotated 90deg per the paint transform).
 */
function ProductPanel({ copy }: { copy: HomeCopy }) {
  /*
   * The slivers' scrim is a plain gradient div stacked ON TOP of the clipped
   * photo, running bottom-up: opaque #00100C at 0% rising to transparent at
   * 100%. An earlier version ran it the other way and painted the slivers
   * almost solid black.
   */
  const sliverVeil =
    "linear-gradient(0deg, rgb(0,16,12) 0%, rgba(153,151,146,0) 100%)";
  return (
    <>
      {/* left sliver */}
      <N x={80} y={1913} w={128} h={600} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/product-prev.webp"
          alt=""
          width={974}
          height={609}
          style={{
            position: "absolute",
            left: -396,
            top: 0,
            width: 974,
            height: 609,
            objectFit: "cover",
          }}
        />
      </N>
      <N
        x={80}
        y={1913}
        w={128}
        h={600}
        r={32}
        style={{ background: sliverVeil }}
      />

      {/* right sliver */}
      <N x={1232} y={1913} w={128} h={600} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/product-next.webp"
          alt=""
          width={959}
          height={600}
          style={{
            position: "absolute",
            left: -247,
            top: 0,
            width: 959,
            height: 600,
            objectFit: "cover",
          }}
        />
      </N>
      <N
        x={1232}
        y={1913}
        w={128}
        h={600}
        r={32}
        style={{ background: sliverVeil }}
      />

      {/* main panel photo */}
      <N x={232} y={1913} w={976} h={600} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/product-main.webp"
          alt=""
          width={985}
          height={616}
          style={{
            position: "absolute",
            left: -9,
            top: 0,
            width: 985,
            height: 616,
            objectFit: "cover",
          }}
        />
      </N>
      {/*
       * The scrim over the main panel is NOT a full rectangle — it is a
       * notched outline that bites a 96px corner out of the bottom right so
       * the white pager button sits in clear space. Gradient runs top (clear)
       * to bottom (#00100C).
       */}
      <svg
        width={976}
        height={600}
        viewBox="0 0 976 600"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 232,
          top: 1913,
          width: 976,
          height: 600,
          borderRadius: 32,
        }}
      >
        <defs>
          <linearGradient id="rif-card-scrim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(52,52,52)" stopOpacity="0" />
            <stop offset="1" stopColor="rgb(0,16,12)" />
          </linearGradient>
        </defs>
        <path
          d="M 976 488 C 976 505.673 961.673 520 944 520 L 928 520 C 910.327 520 896 534.327 896 552 L 896 568 C 896 585.673 881.673 600 864 600 L 32 600 C 14.327 600 0 585.673 0 568 L 0 32 C 0 14.327 14.327 0 32 0 L 944 0 C 961.673 0 976 14.327 976 32 L 976 488 Z"
          fill="url(#rif-card-scrim)"
          fillRule="nonzero"
        />
      </svg>

      {/* copy sits above the panel */}
      <T x={264} y={2173} w={319} h={38} size={32} lh={1} weight={700} color="#FFFFFF" as="h3">
        {copy.productTitle}
      </T>
      <AccentBar x={264} y={2223} />
      <T x={264} y={2255} w={912} h={58} size={24} lh={1} color="#FFFFFF" as="p">
        {copy.productBody}
      </T>

      {/* Frame 26871 — bullets, 4 rows of 30 with an 8px gap */}
      {copy.productBullets.slice(0, 4).map((b, i) => (
        <N key={b} x={264} y={2337 + i * 38} w={287} h={30}>
          {/* solid white hex, per the bundle — not the outline asset */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 4,
              width: 22,
              height: 22,
              display: "inline-flex",
            }}
          >
            <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
              <path
                d="M10.05 1.577a1.9 1.9 0 0 1 1.9 0l6.062 3.5a1.9 1.9 0 0 1 .95 1.645v7a1.9 1.9 0 0 1-.95 1.645l-6.062 3.5a1.9 1.9 0 0 1-1.9 0l-6.062-3.5a1.9 1.9 0 0 1-.95-1.645v-7a1.9 1.9 0 0 1 .95-1.645l6.062-3.5Z"
                fill="#FFFFFF"
              />
            </svg>
          </span>
          <span
            style={{
              position: "absolute",
              left: 34,
              top: 0,
              fontSize: 20,
              lineHeight: 1.5,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            {b}
          </span>
        </N>
      ))}

      {/* pagers — 64x64 r100, orange at the edges, white inside the panel */}
      <PagerButton x={112} y={2417} size={64} bg="#F58220" icon={24} />
      <PagerButton x={1264} y={2417} size={64} bg="#F58220" icon={24} />
      <PagerButton x={1144} y={2449} size={64} bg="#FFFFFF" icon={24} iconColor={INK} />
    </>
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
      <N x={x} y={2971} w={410} h={480} r={32} style={{ background: "#FFFFFF" }} />
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
          <span style={{ fontSize: 14, lineHeight: 1.5, color: MUTED }}>
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
          style={{
            position: "absolute",
            left: -0.181,
            top: -18.819,
            width: 446.637,
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

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke={GREEN}
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
