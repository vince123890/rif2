"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";
import { N, T } from "./canvas";
import { AccentBar } from "./ornaments";

const GREEN = "#006F4F";
const ORANGE = "#F58220";
const INK = "#0F0F0F";
const MINT = "#F2F8F6";

export type HomeReport = {
  year: string;
  title: string;
  downloadHref: string;
  viewHref: string;
};

export type HomeReports = {
  sustainability: HomeReport[];
  financial: HomeReport[];
};

type ReportsCopy = {
  tabSustainability: string;
  tabFinancial: string;
  download: string;
  viewPdf: string;
  seeMore: string;
};

/**
 * "Transparansi Kinerja" — the sustainability/financial report tab pill plus
 * up to three report cards.
 *
 * The old version was static markup: it always showed the sustainability
 * label on both tabs, the Download/View PDF "buttons" were plain divs with
 * no href, and "Lihat Lainnya" went nowhere. This makes the pill a real tab
 * switch (Frame 82 in the fig only ever shows one tab active at a time) and
 * wires the two buttons to the report's actual `file.url`, matching the
 * pattern already established on the dedicated report-listing pages
 * (`src/components/content/report-grid.tsx`): download via `<a download>`,
 * view via `<a target="_blank">`.
 */
export function ReportsSection({
  reports,
  copy,
}: {
  reports: HomeReports;
  copy: ReportsCopy;
}) {
  const [tab, setTab] = useState<"sustainability" | "financial">(
    "sustainability",
  );
  const active = reports[tab].slice(0, 3);
  const seeMoreHref =
    tab === "sustainability"
      ? "/corporate-secretary/sustainability-report"
      : "/corporate-secretary/financial-report";

  return (
    <>
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
        <button
          type="button"
          onClick={() => setTab("sustainability")}
          style={{
            width: 242,
            height: 44,
            borderRadius: 100,
            border: 0,
            padding: 0,
            cursor: "pointer",
            background: tab === "sustainability" ? ORANGE : "transparent",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1.7,
            fontWeight: 700,
            color: tab === "sustainability" ? "#FFFFFF" : INK,
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          {copy.tabSustainability}
        </button>
        <button
          type="button"
          onClick={() => setTab("financial")}
          style={{
            width: 203,
            height: 44,
            borderRadius: 100,
            border: 0,
            padding: 0,
            cursor: "pointer",
            background: tab === "financial" ? ORANGE : "transparent",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1.7,
            fontWeight: 700,
            color: tab === "financial" ? "#FFFFFF" : INK,
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          {copy.tabFinancial}
        </button>
      </N>

      {active.map((r, i) => (
        <ReportCard key={`${tab}-${r.year}`} report={r} index={i} copy={copy} />
      ))}

      <Link
        href={seeMoreHref}
        style={{
          position: "absolute",
          left: 638.5,
          top: 3501,
          width: 164,
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
          {copy.seeMore}
        </span>
      </Link>
    </>
  );
}

/**
 * A single report card — "Rectangle 116/119/122" mint block behind an
 * 80px year, the report title, an accent bar, and the Download/View PDF
 * actions. There were three of these hardcoded per tab in the fig, laid out
 * at x = 80 / 514 / 948; that spacing is preserved here by `index`.
 */
function ReportCard({
  report,
  index,
  copy,
}: {
  report: HomeReport;
  index: number;
  copy: ReportsCopy;
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
      <AccentBar x={x + 331} y={3327} />

      <a
        href={report.downloadHref}
        download
        style={{
          position: "absolute",
          left: x + 24,
          top: 3359,
          width: 176,
          height: 64,
          borderRadius: 12,
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
      </a>
      <a
        href={report.viewHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          left: x + 212,
          top: 3359,
          width: 174,
          height: 64,
          borderRadius: 12,
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
      </a>
    </>
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
