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
import { ContactBadge, type ContactIconKind } from "@/components/layout/contact-badge";
import { N, T } from "./canvas";

const DARK = "#101828";
const STRIP = "#064631";
const LINK = "#338C72";

/** y offsets inside the footer group */
const Y = 5192;

type Item = { label: string; href?: string };
type Col = { heading: string; items: Item[] };

/*
 * The fig's own footer text (docs/fig-spec/texts.txt, y=5658..6124) really
 * does repeat "INVESTOR RELATIONS" as both the 3rd and 4th column heading
 * with identical items in each — an unfinished spot in the design, not a
 * transcription bug here. Labels are kept exactly as the fig has them.
 *
 * Every item is a link. Where the label matches a page that actually
 * exists in this app, `href` points straight at it (see
 * src/components/layout/site-footer.tsx, which carries the same mapping
 * for the non-canvas pages). The rest — "Current Account", "Laporan Bank",
 * "Risk Disclosure" and the like — have no dedicated page anywhere in the
 * app; rather than invent a URL for content that doesn't exist yet, those
 * fall back to the nearest real landing page for that topic
 * (/products or /corporate-secretary) so the link still goes somewhere
 * true instead of a fabricated route or a dead "#".
 */
const COLUMNS: { x: number; blocks: Col[] }[] = [
  {
    x: 50,
    blocks: [
      {
        heading: "ABOUT PERDANIA",
        items: [
          { label: "Management", href: "/about/company-profile/management" },
          { label: "Bank Profile", href: "/about/company-profile" },
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
          { label: "Current Account", href: "/products" },
          { label: "Deposit", href: "/products" },
          { label: "Loan", href: "/products" },
          { label: "Factoring", href: "/products/factoring" },
          { label: "Import", href: "/products" },
          { label: "Export", href: "/products" },
          { label: "Interbank Payment Transaction", href: "/products" },
          { label: "Others", href: "/products" },
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
          { label: "Laporan Bank", href: "/corporate-secretary" },
          { label: "Risk Disclosure", href: "/corporate-secretary" },
          {
            label: "Disclosure Recovery Action Plan",
            href: "/corporate-secretary",
          },
          {
            label: "Business Strategy & Future Plan",
            href: "/corporate-secretary/business-strategy",
          },
          { label: "Company Profile", href: "/about/company-profile" },
          {
            label: "Disclosure Information & Materials Facts",
            href: "/corporate-secretary",
          },
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
          { label: "Laporan Bank", href: "/corporate-secretary" },
          { label: "Risk Disclosure", href: "/corporate-secretary" },
          {
            label: "Disclosure Recovery Action Plan",
            href: "/corporate-secretary",
          },
          {
            label: "Business Strategy & Future Plan",
            href: "/corporate-secretary/business-strategy",
          },
          { label: "Company Profile", href: "/about/company-profile" },
          {
            label: "Disclosure Information & Materials Facts",
            href: "/corporate-secretary",
          },
          { label: "News", href: "/news" },
        ],
      },
    ],
  },
];

/* y values below are the fig's own (5444/5520) minus the 94px tightened above. */
const CONTACTS = [
  {
    x: 745,
    y: 5350,
    icon: "phone",
    label: "Phone Number",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
  },
  { x: 1098.5, y: 5350, icon: "fax", label: "Fax Number", value: site.fax },
  {
    x: 745,
    y: 5426,
    icon: "globe",
    label: "Customer Report",
    value: "rif_helpdesk@perdania.co.id",
    href: "mailto:rif_helpdesk@perdania.co.id",
  },
  {
    x: 1098.5,
    y: 5426,
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
       * Wordmark. The fig group sits at y=5382 (190 below the footer's own
       * top edge, per docs/fig-spec/SPEC-home.txt) — accurate to the file,
       * but visually that reads as a big dead gap once the mark carries its
       * own text beside it rather than just the roundel, so it (and
       * everything below it down to the link columns) is pulled up by a
       * flat 94px, tightening the top padding without touching the
       * spacing between the wordmark/blurb/address/contact rows.
       */}
      <N
        x={50}
        y={Y + 96}
        w={501}
        h={50}
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <Image
          src="/brand/resona-mark-white.png"
          alt=""
          width={501}
          height={50}
          style={{ width: "auto", height: 50, objectFit: "contain", objectPosition: "left top" }}
        />
        <span style={{ fontSize: 28, lineHeight: 1.2, fontWeight: 400, color: "#FFFFFF", whiteSpace: "nowrap" }}>
          Resona Indonesia Finance
        </span>
      </N>

      {/* company blurb — 14px Lato Italic at 70% */}
      <T
        x={50}
        y={Y + 146}
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
        y={Y + 254}
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

      {/*
       * map — 1340x300 at R50. Was a static crop of the map
       * (/fig2/map.webp); swapped for the same live Google Maps embed
       * SiteFooter already uses (src/config/site.ts `mapEmbedUrl`, pinned
       * to the office's coordinates) so it's the real interactive map with
       * the RIF listing's info card, not a flat image.
       */}
      <N
        x={50}
        y={Y + 1016}
        w={1340}
        h={300}
        style={{ borderRadius: 50, overflow: "hidden" }}
      >
        <iframe
          src={site.mapEmbedUrl}
          title={`${site.name} — ${site.address.short}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
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
  icon: ContactIconKind;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <N x={x} y={y} w={291.5} h={52} style={{ display: "flex", gap: 12 }}>
      <ContactBadge icon={icon} />
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
