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

/**
 * The 52x52 contact badge — a faint 0.3-alpha disc behind a segmented ring
 * outline (both `rgb(0,111,79)`), the icon centred 16x16 on top in white.
 *
 * Earlier this was a plain solid-green rounded square with a lucide-style
 * glyph; neither shape is in the fig. Both the ring path and the four inner
 * glyphs below are copied verbatim from the bundle's own icon components
 * (LinearCallPhoneRounded / OutlineElectronicDevicesPrinter / the globe
 * paths inline beside "Customer Report" / LinearCallCallChatRounded in
 * docs/dari_claude_design/project/components/HomePage.jsx, ~line 3859-4223),
 * not redrawn from a generic icon set.
 */
const RING_PATH =
  "M 26 0 C 25.222 0 24.591 0.631 24.591 1.409 C 24.591 2.188 25.222 2.819 26 2.819 C 31.885 2.819 37.264 5.024 41.356 8.651 L 38.027 11.98 C 34.68 9.1 30.461 7.529 26 7.529 C 21.414 7.529 17.213 9.21 13.98 11.987 L 9.653 7.66 C 9.645 7.652 9.637 7.646 9.629 7.638 C 9.622 7.631 9.616 7.623 9.608 7.615 C 9.058 7.065 8.165 7.065 7.615 7.615 C 2.704 12.526 0 19.055 0 26 C 0 40.336 11.664 52 26 52 C 32.945 52 39.474 49.296 44.385 44.385 C 49.296 39.474 52 32.945 52 26 C 52 11.664 40.336 0 26 0 Z M 37.075 14.939 C 37.625 15.49 38.517 15.491 39.068 14.94 C 39.109 14.899 39.146 14.856 39.18 14.812 C 39.183 14.809 39.187 14.806 39.19 14.804 L 43.349 10.644 C 46.684 14.407 48.816 19.258 49.137 24.591 L 47.569 24.591 C 46.791 24.591 46.16 25.222 46.16 26 C 46.16 26.778 46.791 27.409 47.569 27.409 L 49.137 27.409 C 48.828 32.604 46.811 37.472 43.357 41.364 L 40.013 38.02 C 42.79 34.787 44.471 30.586 44.471 26 C 44.471 25.222 43.84 24.591 43.061 24.591 C 42.283 24.591 41.652 25.222 41.652 26 C 41.652 34.631 34.63 41.652 26 41.652 C 17.369 41.652 10.347 34.631 10.347 26 C 10.347 17.369 17.369 10.348 26 10.348 C 30.184 10.348 34.118 11.978 37.075 14.939 Z M 26 46.024 C 25.222 46.024 24.591 46.655 24.591 47.433 L 24.591 49.137 C 19.258 48.816 14.407 46.684 10.644 43.35 L 13.98 40.013 C 17.213 42.79 21.414 44.471 26 44.471 C 30.586 44.471 34.787 42.79 38.02 40.013 L 41.364 43.358 C 37.472 46.812 32.604 48.829 27.409 49.138 L 27.409 47.433 C 27.409 46.655 26.778 46.024 26 46.024 Z M 2.863 27.409 L 7.582 27.409 C 7.888 31.444 9.497 35.121 11.987 38.02 L 8.651 41.356 C 5.316 37.593 3.184 32.742 2.863 27.409 Z M 8.643 10.636 L 11.987 13.98 C 9.497 16.879 7.888 20.555 7.582 24.591 L 2.862 24.591 C 3.172 19.396 5.189 14.528 8.643 10.636 Z";

function ContactBadge({ icon }: { icon: "phone" | "fax" | "globe" | "chat" }) {
  return (
    <span
      style={{
        position: "relative",
        width: 52,
        height: 52,
        flexShrink: 0,
      }}
    >
      <svg
        width={34.123}
        height={34.123}
        viewBox="0 0 34.123 34.123"
        fill="none"
        aria-hidden
        style={{
          position: "absolute",
          left: 8.938,
          top: 8.938,
          width: 34.123,
          height: 34.123,
          color: "rgba(0,111,79,0.3)",
        }}
      >
        <path
          d="M 17.062 34.123 C 26.484 34.123 34.123 26.484 34.123 17.062 C 34.123 7.639 26.484 0 17.062 0 C 7.639 0 0 7.639 0 17.062 C 0 26.484 7.639 34.123 17.062 34.123 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      <svg
        width={52}
        height={52}
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: 0, top: 0, width: 52, height: 52, color: GREEN }}
      >
        <path d={RING_PATH} fill="currentColor" fillRule="nonzero" />
      </svg>
      <span
        style={{
          position: "absolute",
          left: 18,
          top: 18,
          width: 16,
          height: 16,
          display: "block",
        }}
      >
        <ContactGlyph kind={icon} />
      </span>
    </span>
  );
}

function ContactGlyph({ kind }: { kind: "phone" | "fax" | "globe" | "chat" }) {
  if (kind === "phone")
    return (
      <span style={{ display: "block", width: 16, height: 16, overflow: "hidden" }}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ transform: "scale(0.667, 0.667)", transformOrigin: "0 0" }}
        >
          <path
            d="M 6.687 2.479 L 6.038 1.316 M 6.115 5.828 C 7.037 4.905 7.272 3.529 6.687 2.479 M 7.025 8.975 C 4.996 6.947 6.115 5.828 6.115 5.828 M 7.025 8.975 C 9.053 11.004 10.172 9.885 10.172 9.885 C 11.095 8.963 12.471 8.728 13.521 9.313 L 14.684 9.962 C 16.269 10.847 16.456 13.069 15.063 14.462 C 14.226 15.299 13.2 15.95 12.067 15.993 C 10.159 16.066 6.918 15.583 3.668 12.332 C 0.417 9.082 -0.066 5.841 0.007 3.933 C 0.05 2.8 0.701 1.774 1.538 0.937 C 2.931 -0.456 5.153 -0.269 6.038 1.316 Z"
            stroke="#FFFFFF"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(4,4)"
          />
        </svg>
      </span>
    );
  if (kind === "fax")
    /*
     * "Outline / Electronic, Devices / Printer" — a 24x24 icon, its art
     * inset (1.25, 1.25) at 21.5x21.5, scaled 0.667 the same way as the
     * other three glyphs rather than stretched to fill a 16x16 viewBox.
     */
    return (
      <span style={{ display: "block", width: 16, height: 16, overflow: "hidden" }}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ transform: "scale(0.667, 0.667)", transformOrigin: "0 0" }}
        >
        <path
          d="M 16.75 8.75 C 16.75 9.302 16.302 9.75 15.75 9.75 C 15.198 9.75 14.75 9.302 14.75 8.75 C 14.75 8.198 15.198 7.75 15.75 7.75 C 16.302 7.75 16.75 8.198 16.75 8.75 Z"
          fill="#FFFFFF"
          fillRule="evenodd"
          transform="translate(1.25,1.25)"
        />
        <path
          d="M 10.805 0 L 10.695 0 M 14.142 0.117 C 13.275 0 12.172 0 10.805 0 M 16.402 1.098 C 15.8 0.496 15.042 0.238 14.142 0.117 M 17.451 4.049 C 17.37 2.825 17.142 1.838 16.402 1.098 M 18.142 4.117 C 17.926 4.088 17.696 4.066 17.451 4.049 M 20.402 5.098 C 19.8 4.496 19.042 4.238 18.142 4.117 M 21.383 7.358 C 21.262 6.458 21.004 5.7 20.402 5.098 M 21.5 10.695 C 21.5 9.328 21.5 8.225 21.383 7.358 M 21.5 10.805 L 21.5 10.695 M 21.383 14.142 C 21.5 13.275 21.5 12.172 21.5 10.805 M 20.402 16.402 C 21.004 15.8 21.262 15.042 21.383 14.142 M 17.451 17.451 C 18.675 17.37 19.662 17.142 20.402 16.402 M 17.383 18.142 C 17.412 17.926 17.434 17.696 17.451 17.451 M 16.402 20.402 C 17.004 19.8 17.262 19.042 17.383 18.142 M 14.142 21.383 C 15.042 21.262 15.8 21.004 16.402 20.402 M 10.805 21.5 C 12.172 21.5 13.275 21.5 14.142 21.383 M 10.695 21.5 L 10.805 21.5 M 7.358 21.383 C 8.225 21.5 9.328 21.5 10.695 21.5 M 5.098 20.402 C 5.7 21.004 6.458 21.262 7.358 21.383 M 4.117 18.142 C 4.238 19.042 4.496 19.8 5.098 20.402 M 4.049 17.451 C 4.066 17.696 4.088 17.926 4.117 18.142 M 1.098 16.402 C 1.838 17.142 2.825 17.37 4.049 17.451 M 0.117 14.142 C 0.238 15.042 0.496 15.8 1.098 16.402 M 0 10.805 C 0 12.172 0 13.275 0.117 14.142 M 0 10.695 L 0 10.805 M 0.117 7.358 C 0 8.225 0 9.328 0 10.695 M 1.098 5.098 C 0.496 5.7 0.238 6.458 0.117 7.358 M 3.358 4.117 C 2.458 4.238 1.7 4.496 1.098 5.098 M 4.049 4.049 C 3.804 4.066 3.574 4.088 3.358 4.117 M 5.098 1.098 C 4.358 1.838 4.13 2.825 4.049 4.049 M 7.358 0.117 C 6.458 0.238 5.7 0.496 5.098 1.098 M 10.695 0 C 9.328 0 8.225 0 7.358 0.117 Z M 6.695 4 C 6.293 4 5.914 4 5.557 4.003 M 14.805 4 L 6.695 4 M 15.943 4.003 C 15.586 4 15.207 4 14.805 4 M 15.341 2.159 C 15.677 2.495 15.861 2.982 15.943 4.003 M 13.942 1.603 C 14.676 1.702 15.064 1.882 15.341 2.159 M 10.75 1.5 C 12.185 1.5 13.187 1.502 13.942 1.603 M 7.558 1.603 C 8.313 1.502 9.315 1.5 10.75 1.5 M 6.159 2.159 C 6.436 1.882 6.824 1.702 7.558 1.603 M 5.557 4.003 C 5.639 2.982 5.823 2.495 6.159 2.159 Z M 4 14.805 C 4 15.207 4 15.586 4.003 15.943 M 4 13.5 L 4 14.805 M 3.75 13.5 L 4 13.5 M 3 12.75 C 3 13.164 3.336 13.5 3.75 13.5 M 3.75 12 C 3.336 12 3 12.336 3 12.75 M 17.75 12 L 3.75 12 M 18.5 12.75 C 18.5 12.336 18.164 12 17.75 12 M 17.75 13.5 C 18.164 13.5 18.5 13.164 18.5 12.75 M 17.5 13.5 L 17.75 13.5 M 17.5 14.805 L 17.5 13.5 M 17.497 15.943 C 17.5 15.586 17.5 15.207 17.5 14.805 M 19.341 15.341 C 19.005 15.677 18.518 15.861 17.497 15.943 M 19.897 13.942 C 19.798 14.676 19.618 15.064 19.341 15.341 M 20 10.75 C 20 12.185 19.998 13.187 19.897 13.942 M 19.897 7.558 C 19.998 8.313 20 9.315 20 10.75 M 19.341 6.159 C 19.618 6.436 19.798 6.824 19.897 7.558 M 17.942 5.603 C 18.676 5.702 19.064 5.882 19.341 6.159 M 14.75 5.5 C 16.185 5.5 17.187 5.502 17.942 5.603 M 6.75 5.5 L 14.75 5.5 M 3.558 5.603 C 4.313 5.502 5.315 5.5 6.75 5.5 M 2.159 6.159 C 2.436 5.882 2.824 5.702 3.558 5.603 M 1.603 7.558 C 1.702 6.824 1.882 6.436 2.159 6.159 M 1.5 10.75 C 1.5 9.315 1.502 8.313 1.603 7.558 M 1.603 13.942 C 1.502 13.187 1.5 12.185 1.5 10.75 M 2.159 15.341 C 1.882 15.064 1.702 14.676 1.603 13.942 M 4.003 15.943 C 2.982 15.861 2.495 15.677 2.159 15.341 Z M 5.5 13.5 L 16 13.5 M 5.5 14.75 L 5.5 13.5 M 5.603 17.942 C 5.502 17.187 5.5 16.185 5.5 14.75 M 6.159 19.341 C 5.882 19.064 5.702 18.676 5.603 17.942 M 7.558 19.897 C 6.824 19.798 6.436 19.618 6.159 19.341 M 10.75 20 C 9.315 20 8.313 19.998 7.558 19.897 M 13.942 19.897 C 13.187 19.998 12.185 20 10.75 20 M 15.341 19.341 C 15.064 19.618 14.676 19.798 13.942 19.897 M 15.897 17.942 C 15.798 18.676 15.618 19.064 15.341 19.341 M 16 14.75 C 16 16.185 15.998 17.187 15.897 17.942 M 16 13.5 L 16 14.75 Z M 4.75 8 C 4.336 8 4 8.336 4 8.75 M 7.75 8 L 4.75 8 M 8.5 8.75 C 8.5 8.336 8.164 8 7.75 8 M 7.75 9.5 C 8.164 9.5 8.5 9.164 8.5 8.75 M 4.75 9.5 L 7.75 9.5 M 4 8.75 C 4 9.164 4.336 9.5 4.75 9.5 Z M 7.75 14.805 C 7.336 14.805 7 15.141 7 15.555 M 13.75 14.805 L 7.75 14.805 M 14.5 15.555 C 14.5 15.141 14.164 14.805 13.75 14.805 M 13.75 16.305 C 14.164 16.305 14.5 15.969 14.5 15.555 M 7.75 16.305 L 13.75 16.305 M 7 15.555 C 7 15.969 7.336 16.305 7.75 16.305 Z M 7.75 17.305 C 7.336 17.305 7 17.641 7 18.055 M 11.75 17.305 L 7.75 17.305 M 12.5 18.055 C 12.5 17.641 12.164 17.305 11.75 17.305 M 11.75 18.805 C 12.164 18.805 12.5 18.469 12.5 18.055 M 7.75 18.805 L 11.75 18.805 M 7 18.055 C 7 18.469 7.336 18.805 7.75 18.805 Z"
          fill="#FFFFFF"
          fillRule="nonzero"
          transform="translate(1.25,1.25)"
        />
        </svg>
      </span>
    );
  if (kind === "globe")
    return (
      <span style={{ position: "relative", display: "block", width: 16, height: 16 }}>
        <span
          style={{
            position: "absolute",
            left: 1.333,
            top: 1.333,
            width: 13.333,
            height: 13.333,
          }}
        >
          {/* the meridian ellipse */}
          <svg
            width={13.333}
            height={13.333}
            viewBox="0 0 13.333 13.333"
            fill="none"
            aria-hidden
            style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
          >
            <path
              d="M 13.333 6.667 L 12.583 6.667 C 12.583 9.934 9.934 12.583 6.667 12.583 L 6.667 13.333 L 6.667 14.083 C 10.763 14.083 14.083 10.763 14.083 6.667 L 13.333 6.667 Z M 6.667 13.333 L 6.667 12.583 C 3.399 12.583 0.75 9.934 0.75 6.667 L 0 6.667 L -0.75 6.667 C -0.75 10.763 2.571 14.083 6.667 14.083 L 6.667 13.333 Z M 0 6.667 L 0.75 6.667 C 0.75 3.399 3.399 0.75 6.667 0.75 L 6.667 0 L 6.667 -0.75 C 2.571 -0.75 -0.75 2.571 -0.75 6.667 L 0 6.667 Z M 6.667 0 L 6.667 0.75 C 9.934 0.75 12.583 3.399 12.583 6.667 L 13.333 6.667 L 14.083 6.667 C 14.083 2.571 10.763 -0.75 6.667 -0.75 L 6.667 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
          {/* the equator ellipse, rotated 90deg */}
          <svg
            width={13.333}
            height={5.333}
            viewBox="0 0 13.333 5.333"
            fill="none"
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "visible",
              transform: "matrix(0,1,-1,0,9.333,0)",
              transformOrigin: "0 0",
            }}
          >
            <path
              d="M 13.333 2.667 L 12.583 2.667 C 12.583 2.762 12.538 2.929 12.294 3.16 C 12.049 3.392 11.653 3.636 11.102 3.856 C 10.004 4.295 8.437 4.583 6.667 4.583 L 6.667 5.333 L 6.667 6.083 C 8.579 6.083 10.344 5.775 11.659 5.249 C 12.315 4.986 12.896 4.655 13.325 4.25 C 13.756 3.842 14.083 3.308 14.083 2.667 L 13.333 2.667 Z M 6.667 5.333 L 6.667 4.583 C 4.897 4.583 3.329 4.295 2.231 3.856 C 1.68 3.636 1.285 3.392 1.039 3.16 C 0.795 2.929 0.75 2.762 0.75 2.667 L 0 2.667 L -0.75 2.667 C -0.75 3.308 -0.422 3.842 0.009 4.25 C 0.438 4.655 1.019 4.986 1.674 5.249 C 2.989 5.775 4.755 6.083 6.667 6.083 L 6.667 5.333 Z M 0 2.667 L 0.75 2.667 C 0.75 2.571 0.795 2.404 1.039 2.174 C 1.285 1.941 1.68 1.698 2.231 1.477 C 3.329 1.038 4.897 0.75 6.667 0.75 L 6.667 0 L 6.667 -0.75 C 4.755 -0.75 2.989 -0.441 1.674 0.085 C 1.019 0.347 0.438 0.678 0.009 1.084 C -0.422 1.491 -0.75 2.026 -0.75 2.667 L 0 2.667 Z M 6.667 0 L 6.667 0.75 C 8.437 0.75 10.004 1.038 11.102 1.477 C 11.653 1.698 12.049 1.941 12.294 2.174 C 12.538 2.404 12.583 2.571 12.583 2.667 L 13.333 2.667 L 14.083 2.667 C 14.083 2.026 13.756 1.491 13.325 1.084 C 12.896 0.678 12.315 0.347 11.659 0.085 C 10.344 -0.441 8.579 -0.75 6.667 -0.75 L 6.667 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
          {/* the equator's straight middle bar */}
          <svg
            width={13.333}
            height={1.5}
            viewBox="0 -0.750 13.333 1.500"
            fill="none"
            aria-hidden
            style={{ position: "absolute", left: 0, top: 6.667, overflow: "visible" }}
          >
            <path
              d="M 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 C -0.75 0.414 -0.414 0.75 0 0.75 L 0 0 L 0 -0.75 Z M 13.333 0.75 C 13.748 0.75 14.083 0.414 14.083 0 C 14.083 -0.414 13.748 -0.75 13.333 -0.75 L 13.333 0 L 13.333 0.75 Z M 0 0 L 0 0.75 L 13.333 0.75 L 13.333 0 L 13.333 -0.75 L 0 -0.75 L 0 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
        </span>
      </span>
    );
  /*
   * "Linear / Call / Call Chat Rounded" — a 24x24 icon scaled 0.667 to fit
   * the 16px slot (24 * 0.667 = 16), same as the bundle wraps it. Copied as
   * its own 24x24 box rather than hand-fit into a 16x16 viewBox, so the two
   * strokes keep their original relative scale.
   */
  return (
    <span style={{ display: "block", width: 16, height: 16, overflow: "hidden" }}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ transform: "scale(0.667, 0.667)", transformOrigin: "0 0" }}
      >
        <path
          d="M 0 5 C 0 7.761 2.239 10 5 10 M 5 0 C 2.239 0 0 2.239 0 5 M 10 5 C 10 2.239 7.761 0 5 0 M 9.478 7.226 C 9.812 6.556 10 5.8 10 5 M 9.411 7.8 C 9.36 7.608 9.39 7.404 9.478 7.226 M 9.709 8.913 L 9.411 7.8 M 9.709 8.913 C 9.839 9.396 9.396 9.839 8.913 9.709 L 7.8 9.411 C 7.608 9.36 7.404 9.39 7.226 9.478 C 6.556 9.812 5.8 10 5 10 Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transform="matrix(-1,0,0,1,22,2)"
        />
        <path
          d="M 6.687 2.479 L 6.038 1.316 M 6.115 5.828 C 7.037 4.905 7.272 3.529 6.687 2.479 M 7.025 8.975 C 4.996 6.947 6.115 5.828 6.115 5.828 M 7.025 8.975 C 9.053 11.004 10.172 9.885 10.172 9.885 C 11.095 8.963 12.471 8.728 13.521 9.313 L 14.684 9.962 C 16.269 10.847 16.456 13.069 15.063 14.462 C 14.226 15.299 13.2 15.95 12.067 15.993 C 10.159 16.066 6.918 15.583 3.668 12.332 C 0.417 9.082 -0.066 5.841 0.007 3.933 C 0.05 2.8 0.701 1.774 1.538 0.937 C 2.931 -0.456 5.153 -0.269 6.038 1.316 Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transform="translate(2,6)"
        />
      </svg>
    </span>
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
