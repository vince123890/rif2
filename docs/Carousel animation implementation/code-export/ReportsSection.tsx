import ReportCarousel from "./ReportCarousel";

const sustainabilityItems = [
  { year: "2025", lines: ["SUSTAINABILITY", "REPORT"], href: "/reports/sustainability/2025" },
  { year: "2024", lines: ["SUSTAINABILITY", "REPORT"], href: "/reports/sustainability/2024" },
  { year: "2023", lines: ["SUSTAINABILITY", "REPORT"], href: "/reports/sustainability/2023" },
  { year: "2022", lines: ["SUSTAINABILITY", "REPORT"], href: "/reports/sustainability/2022" },
  { year: "2021", lines: ["SUSTAINABILITY", "REPORT"], href: "/reports/sustainability/2021" },
];

const annualItems = [
  { year: "2025", lines: ["ANNUAL", "REPORT"], href: "/reports/annual/2025" },
  { year: "2024", lines: ["ANNUAL", "REPORT"], href: "/reports/annual/2024" },
  { year: "2023", lines: ["ANNUAL", "REPORT"], href: "/reports/annual/2023" },
];

export default function ReportsSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 72, padding: "64px 24px", background: "#F4F5F7" }}>
      <ReportCarousel title="Sustainability Report" items={sustainabilityItems} />
      <ReportCarousel title="Annual Report" items={annualItems} />
    </div>
  );
}
