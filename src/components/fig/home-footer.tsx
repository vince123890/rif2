/**
 * Footer, drawn from the fig's own `Group 160` (x=0 y=5192, 1440x1435).
 *
 * The site's shared <SiteFooter> predates the fig and looks nothing like it,
 * so the homepage canvas draws its own. Every value below is decoded from the
 * node tree; y-coordinates are given relative to the group's origin (5192).
 *
 *   Rectangle 99  0,0      1440x1366  #101828   — body
 *   Rectangle 98  0,1366   1440x69    #064631   — legal strip
 *   Group         50,190   501x90               — wordmark
 *   text          50,240   589x84     #FFF @0.7 — company blurb, Lato Italic
 *   Frame 26807   745,252  645x52               — phone / fax
 *   Frame 26808   745,328  645x52               — customer report / questionnaire
 *   Frame 26803   50,348   390x42               — address
 *   Frame 26798   50,466   1340x500             — four link columns
 *   Mask group    50,1016  1340x300   R50       — map
 *   text          50,1390  519x21               — OJK line
 *   text          1036,1390 354x21              — copyright
 */
import Image from "next/image";

import { Link } from "@/i18n/routing";
import { site } from "@/config/site";
import { N, T } from "./canvas";

const DARK = "#101828";
const STRIP = "#064631";
const LINK = "#338C72";
const GREEN = "#006F4F";

/** y offsets inside the footer group */
const Y = 5192;

type Item = { label: string; href?: string };
type Col = { heading: string; items: Item[] };

/*
 * The fig's own footer text (docs/fig-spec/texts.txt, y=5658..6124) really
 * does repeat "INVESTOR RELATIONS" as both the 3rd and 4th column heading
 * with identical items in each — an unfinished spot in the design, not a
 * transcription bug here. Labels are kept exactly as the fig has them;
 * `href` is only set where the label maps to a page that actually exists
 * elsewhere in this app (see src/components/layout/site-footer.tsx, which
 * carries the same mapping for the non-canvas pages), everything else stays
 * plain text rather than guessing a URL for it.
 */
const COLUMNS: { x: number; blocks: Col[] }[] = [
  {
    x: 50,
    blocks: [
      {
        heading: "ABOUT PERDANIA",
        items: [
          { label: "Management", href: "/about/company-profile/management" },
          { label: "Bank Profile" },
          {
            label: "Resona Indonesia Finance",
            href: "/about/bank-resona-perdania",
          },
          { label: "Privacy & Security Policy", href: "/about/privacy" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "GCG",
        items: [
          { label: "Anti Fraud & Integrity Pact", href: "/gcg" },
          {
            label: "Good Corporate Governance",
            href: "/gcg/good-corporate-governance",
          },
        ],
      },
    ],
  },
  {
    x: 397.5,
    blocks: [
      {
        heading: "PRODUCT & SERVICE",
        items: [
          { label: "Current Account" },
          { label: "Deposit" },
          { label: "Loan" },
          { label: "Factoring", href: "/products/factoring" },
          { label: "Import" },
          { label: "Export" },
          { label: "Interbank Payment Transaction" },
          { label: "Others" },
        ],
      },
    ],
  },
  {
    x: 745,
    blocks: [
      {
        heading: "INVESTOR RELATIONS",
        items: [
          { label: "Laporan Bank" },
          { label: "Risk Disclosure" },
          { label: "Disclosure Recovery Action Plan" },
          {
            label: "Business Strategy & Future Plan",
            href: "/corporate-secretary/business-strategy",
          },
          { label: "Company Profile", href: "/about/company-profile" },
          { label: "Disclosure Information & Materials Facts" },
          { label: "News", href: "/news" },
        ],
      },
    ],
  },
  {
    x: 1092.5,
    blocks: [
      {
        heading: "INVESTOR RELATIONS",
        items: [
          { label: "Laporan Bank" },
          { label: "Risk Disclosure" },
          { label: "Disclosure Recovery Action Plan" },
          {
            label: "Business Strategy & Future Plan",
            href: "/corporate-secretary/business-strategy",
          },
          { label: "Company Profile", href: "/about/company-profile" },
          { label: "Disclosure Information & Materials Facts" },
          { label: "News", href: "/news" },
        ],
      },
    ],
  },
];

const CONTACTS = [
  {
    x: 745,
    y: 5444,
    icon: "phone",
    label: "Phone Number",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
  },
  { x: 1098.5, y: 5444, icon: "fax", label: "Fax Number", value: site.fax },
  {
    x: 745,
    y: 5520,
    icon: "globe",
    label: "Customer Report",
    value: "rif_helpdesk@perdania.co.id",
    href: "mailto:rif_helpdesk@perdania.co.id",
  },
  {
    x: 1098.5,
    y: 5520,
    icon: "chat",
    label: "Customer Questionnaire",
    value: "cust_rif@perdania.co.id",
    href: "mailto:cust_rif@perdania.co.id",
  },
] as const;

export function HomeFooter({ blurb }: { blurb: string }) {
  return (
    <>
      {/* Rectangle 99 — the dark body */}
      <N x={0} y={Y} w={1440} h={1366} style={{ background: DARK }} />
      {/* Rectangle 98 — the legal strip beneath it */}
      <N x={0} y={Y + 1366} w={1440} h={69} style={{ background: STRIP }} />

      {/*
       * Wordmark. The fig group spans y=5382..5472 (90 tall) but its glyphs
       * only occupy the upper ~50px; the blurb starts at y=5432. Rendering a
       * 90-tall logo box therefore ran it straight through the blurb, so the
       * art is capped at 50 and left-aligned.
       */}
      <N x={50} y={Y + 190} w={501} h={50}>
        <Image
          src="/brand/resona-mark-white.png"
          alt="Bank Resona Perdania"
          width={501}
          height={50}
          style={{ width: "auto", height: 50, objectFit: "contain", objectPosition: "left top" }}
        />
      </N>

      {/* company blurb — 14px Lato Italic at 70% */}
      <T
        x={50}
        y={Y + 240}
        w={589}
        h={84}
        size={14}
        lh={1.5}
        italic
        color="#FFFFFF"
        style={{ opacity: 0.7 }}
        as="p"
      >
        {blurb}
      </T>

      {/* address row */}
      <N
        x={50}
        y={Y + 348}
        w={390}
        h={42}
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <PinIcon />
        <span
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: "#FFFFFF",
            whiteSpace: "pre-line",
          }}
        >
          {"Sampoerna Strategic Square South Tower, Level 9\nJl. Jend.Sudirman Kav.45-46 Jakarta Selatan 12930"}
        </span>
      </N>

      {CONTACTS.map((c) => (
        <ContactTile key={c.label} {...c} />
      ))}

      {COLUMNS.map((col) => {
        let y = Y + 466;
        return (
          <div key={col.x}>
            {col.blocks.map((b) => {
              const headingY = y;
              // heading 29 tall + 24 gap, then each item 34 tall + 24 gap
              y += 53;
              const rows = b.items.map((it) => {
                const iy = y;
                /*
                 * "Disclosure Information & Materials Facts" is the one item
                 * the fig sets two lines tall (h=68 rather than 34), so the
                 * row after it starts 92px down instead of 58. Advancing every
                 * row by a flat 58 collided it with the item below.
                 */
                y += it.label.length > 34 ? 92 : 58;
                return { it, iy };
              });
              y += 12; // gap between blocks within a column
              return (
                <div key={b.heading}>
                  <T
                    x={col.x}
                    y={headingY}
                    w={297.5}
                    size={24}
                    lh={1.2}
                    weight={700}
                    color="#FFFFFF"
                  >
                    {b.heading}
                  </T>
                  {rows.map(({ it, iy }) =>
                    it.href ? (
                      <Link
                        key={it.label}
                        href={it.href}
                        style={{
                          position: "absolute",
                          left: col.x,
                          top: iy,
                          width: 297.5,
                          fontSize: 20,
                          lineHeight: 1.7,
                          fontWeight: 700,
                          color: LINK,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {it.label}
                      </Link>
                    ) : (
                      <T
                        key={it.label}
                        x={col.x}
                        y={iy}
                        w={297.5}
                        size={20}
                        lh={1.7}
                        weight={700}
                        color={LINK}
                      >
                        {it.label}
                      </T>
                    ),
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* map — 1340x300 at R50 */}
      <N
        x={50}
        y={Y + 1016}
        w={1340}
        h={300}
        style={{ borderRadius: 50, overflow: "hidden", background: "#243B6A" }}
      >
        <Image
          src="/fig2/map.webp"
          alt=""
          width={1350}
          height={685}
          style={{
            position: "absolute",
            left: -1,
            top: -223,
            width: 1350,
            maxWidth: "none",
            height: 685,
            objectFit: "cover",
          }}
        />
      </N>

      {/* legal lines on the green strip */}
      {/* one line in the fig (w=519, h=21) — must not wrap */}
      <T
        x={50}
        y={Y + 1390}
        h={21}
        size={14}
        lh={1.5}
        weight={700}
        color="#FFFFFF"
        style={{ whiteSpace: "nowrap" }}
      >
        PT Resona Indonesia Finance berizin Dan diawasi oleh Otoritas Jasa
        Keuangan (OJK)
      </T>
      <T
        x={1036}
        y={Y + 1390}
        w={354}
        h={21}
        size={14}
        lh={1.5}
        color="#FFFFFF"
        align="right"
      >
        ©2025 PT Resona Indonesia Finance. All Rights Reserved.
      </T>
    </>
  );
}

/**
 * A contact row: a 52x52 rounded tile in brand green carrying a 16px glyph,
 * then a two-line label/value stack.
 */
function ContactTile({
  x,
  y,
  icon,
  label,
  value,
  href,
}: {
  x: number;
  y: number;
  icon: "phone" | "fax" | "globe" | "chat";
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <N x={x} y={y} w={291.5} h={52} style={{ display: "flex", gap: 12 }}>
      <span
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: GREEN,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ContactGlyph kind={icon} />
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 700, color: "#FFFFFF" }}>
          {label}
        </span>
        {href ? (
          <a
            href={href}
            style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 700, color: LINK }}
          >
            {value}
          </a>
        ) : (
          <span style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 700, color: LINK }}>
            {value}
          </span>
        )}
      </span>
    </N>
  );
}

function ContactGlyph({ kind }: { kind: "phone" | "fax" | "globe" | "chat" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    style: { display: "block" as const },
  };
  const s = { stroke: "#FFFFFF", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "phone")
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" {...s} />
      </svg>
    );
  if (kind === "fax")
    return (
      <svg {...common}>
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6v-8Z" {...s} />
      </svg>
    );
  if (kind === "globe")
    return (
      <svg {...common}>
        <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z" {...s} />
        <path d="M8 3h1a28 28 0 0 0 0 18H8M15 3a28 28 0 0 1 0 18M3 16v-1h18v1M3 9h18" {...s} />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" {...s} />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <path
        d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.19 5.19 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
    </svg>
  );
}
