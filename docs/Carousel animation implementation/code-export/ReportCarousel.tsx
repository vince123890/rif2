"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ReportItem = {
  year: string;
  lines: string[];
  href: string; // detail page route, e.g. /reports/sustainability/2025
};

export type ReportCarouselProps = {
  title: string;
  items: ReportItem[];
};

const ACTIVE_W = 300;
const INACTIVE_W = 200;
const GAP = 20;

export default function ReportCarousel({ title, items }: ReportCarouselProps) {
  const [active, setActive] = useState(0);

  const offset = useMemo(() => {
    let o = 0;
    for (let i = 0; i < active; i++) o += INACTIVE_W + GAP;
    return o;
  }, [active]);

  const shift = (dir: 1 | -1) => {
    setActive((a) => (a + dir + items.length) % items.length);
  };

  return (
    <div style={{ width: "100%", maxWidth: 1080, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1E7145", display: "inline-block" }} />
        <h2 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: "#F0821E" }}>{title}</h2>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1E7145", display: "inline-block" }} />
      </div>

      <div style={{ width: "100%", overflow: "hidden", padding: "6px 0 8px" }}>
        <div
          style={{
            display: "flex",
            gap: GAP,
            transition: "transform 0.5s cubic-bezier(.22,.9,.35,1)",
            transform: `translateX(-${offset}px)`,
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === active;
            return (
              <div
                key={item.year}
                onClick={() => (isActive ? undefined : setActive(idx))}
                style={{
                  flex: isActive ? `0 0 ${ACTIVE_W}px` : `0 0 ${INACTIVE_W}px`,
                  filter: isActive ? "none" : "saturate(0.6) opacity(0.85)",
                  transition: "flex-basis 0.45s cubic-bezier(.22,.9,.35,1), filter 0.45s ease",
                  borderRadius: 14,
                  boxShadow: isActive ? "0 12px 28px rgba(0,0,0,0.10)" : "0 4px 10px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div style={{ background: "#EAEAEC", borderRadius: "14px 14px 0 0", height: 210, padding: 20, position: "relative", overflow: "hidden", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, position: "relative", zIndex: 1 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#1E7145", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#1E7145" }}>Resona Indonesia Finance</span>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      position: "relative",
                      zIndex: 1,
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 800,
                      fontSize: isActive ? 22 : 16,
                      lineHeight: 1.2,
                      color: isActive ? "#F0821E" : "#D8A87C",
                      transition: "font-size 0.45s ease, color 0.45s ease",
                    }}
                  >
                    {item.lines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", right: -10, bottom: -30, fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 110, color: "#1E7145", opacity: 0.12, zIndex: 0, lineHeight: 1 }}>R</div>
                </div>
                <div style={{ background: "#FFFFFF", borderRadius: "0 0 14px 14px", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#2B2B2B" }}>{item.year}</span>
                  <Link
                    href={item.href}
                    style={{ background: "#1E7145", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, padding: "8px 20px", borderRadius: 999, display: "inline-block", textDecoration: "none" }}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => shift(-1)}
          aria-label="Previous"
          style={{ width: 36, height: 36, borderRadius: "50%", background: "#1E7145", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          ‹
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {items.map((_, i) => (
            <span
              key={i}
              style={{ width: 8, height: 8, borderRadius: "50%", background: i === active ? "#1E7145" : "#D9D9D9", transition: "background 0.3s ease" }}
            />
          ))}
        </div>
        <button
          onClick={() => shift(1)}
          aria-label="Next"
          style={{ width: 36, height: 36, borderRadius: "50%", background: "#1E7145", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
