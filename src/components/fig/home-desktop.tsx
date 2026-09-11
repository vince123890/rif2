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
import { NotchedCard } from "./notched-card";

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

      {/* Children — 70px Lato. The node is WIDTH_AND_HEIGHT auto-sized to
          641x168, i.e. two lines of 84px, so line-height is 84/70 = 1.2.
          The text carries a U+2028 separator: it always breaks after the
          comma, never on width, hence `whiteSpace: pre` on the break. */}
      <T
        x={80}
        y={220}
        w={720}
        h={168}
        size={70}
        lh={1.2}
        color="#FFFFFF"
        as="h1"
        style={{ whiteSpace: "nowrap" }}
      >
        {copy.heroTitle}
        <br />
        <span>for a </span>
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
      <CurvedRule x={1360} y={1030} w={561} vw={600} color={GREEN} />
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
function HeroStrip() {
  const cards = [
    { x: -90, y: 519, w: 411.16, h: 352.67, src: "/fig2/strip-1.webp", rot: -10 },
    { x: 327.18, y: 551.69, w: 391.38, h: 286.43, src: "/fig2/strip-2.webp", rot: 0 },
    { x: 722.86, y: 551.69, w: 391.37, h: 286.43, src: "/fig2/strip-3.webp", rot: 0 },
    { x: 1119.39, y: 519, w: 411.16, h: 352.67, src: "/fig2/strip-4.webp", rot: 10 },
  ];
  return (
    <>
      {cards.map((c) => (
        <N
          key={c.src}
          x={c.x}
          y={c.y}
          w={c.w}
          h={c.h}
          r={32}
          style={{
            overflow: "hidden",
            border: "1px solid #0F0F0F",
            transform: c.rot ? `rotate(${c.rot}deg)` : undefined,
          }}
        >
          <Image
            src={c.src}
            alt=""
            fill
            sizes="420px"
            style={{ objectFit: "cover" }}
          />
          {/* the #000000 @0.3 veil the fig lays over each card */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
            }}
          />
        </N>
      ))}
    </>
  );
}

/**
 * The product carousel: a 976x600 main panel flanked by two 128x600 slivers,
 * all r32, each veiled with the same top-to-bottom gradient
 * (#00100C -> #999792, rotated 90deg per the paint transform).
 */
function ProductPanel({ copy }: { copy: HomeCopy }) {
  const veil =
    "linear-gradient(180deg, rgba(0,16,12,1) 0%, rgba(153,151,146,0) 100%)";
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
        <span style={{ position: "absolute", inset: 0, background: veil }} />
      </N>

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
        <span style={{ position: "absolute", inset: 0, background: veil }} />
      </N>

      {/* main panel */}
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
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,16,12,1) 0%, rgba(52,52,52,0) 100%)",
          }}
        />
      </N>

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
            <Image src="/brand/bullet-hex.svg" alt="" width={22} height={22} />
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
      {/* Rectangle 116/119/122 — mint block behind the year */}
      <N x={x} y={3039} w={286} h={96} style={{ background: MINT }} />
      {/* Rectangle 34/118/121 — seigaiha pattern @30% */}
      <N
        x={x + 256}
        y={2991}
        w={134}
        h={189}
        style={{
          opacity: 0.3,
          backgroundImage: "url(/fig/pattern-seigaiha.webp)",
          backgroundSize: "cover",
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

      {/* Subtract: 442x518 r32 #F2F8F6 minus a 66px circle whose centre is
          at x=899 y=4416 absolute -> (+416, +498) inside the panel. */}
      <N x={483} y={3918}>
        <NotchedCard
          w={442}
          h={518}
          r={32}
          cx={416}
          cy={498}
          cr={33}
          fill={MINT}
          id="feature"
        />
      </N>

      {/* Frame 21 — copy inset 58/50 from the panel */}
      <T
        x={541}
        y={3968}
        w={352}
        h={90}
        size={20}
        lh={1.5}
        weight={700}
        color={INK}
        as="h3"
      >
        {article.title}
      </T>
      <T x={541} y={4074} w={352} h={126} size={14} lh={1.5} color={MUTED} as="p">
        {article.excerpt}
      </T>
      <T x={565} y={4381.5} w={82} h={21} size={14} lh={1.5} color={MUTED}>
        {article.date}
      </T>
      <T x={802} y={4381.5} w={67} h={21} size={14} lh={1.5} color={GREEN}>
        {copy.readMore}
      </T>
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
      <N x={x} y={yImage} w={410} h={267} r={32} style={{ overflow: "hidden" }}>
        <Image
          src="/fig2/news-thumb.webp"
          alt=""
          fill
          sizes="410px"
          style={{ objectFit: "cover" }}
        />
      </N>

      {/* circle centre sits at (+390, +223) from the body's origin, r=31 */}
      <N x={x} y={yBody}>
        <NotchedCard
          w={410}
          h={243}
          r={32}
          cx={390}
          cy={223}
          cr={31}
          fill="#FFFFFF"
          id={id}
        />
      </N>

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
