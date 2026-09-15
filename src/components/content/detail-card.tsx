import type { ReactNode } from "react";

/**
 * A single content card inside the Company Profile detail shell — fig
 * `detail` (docs/dari_claude_design/project/components/Detail.jsx, e.g.
 * lines 1833-1943): a white, radius-16 panel with 32px padding, a 32px
 * bold black heading, then an 80×4 orange rule with a 12px orange dot at
 * each end sitting just under it, then body content.
 *
 * Earlier versions of these pages used a green heading with a 5px
 * left-border rule and a 24px radius — neither is in the fig; both are
 * replaced here with the verified values.
 */
export function DetailCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-[16px] bg-white p-6 md:p-8 lg:p-8">
      <h2 className="text-[24px] font-bold leading-[1.2] text-ink-900 md:text-[32px]">
        {title}
      </h2>

      {/* fig: 80x4 orange rule with a 12px dot at each end, under the heading */}
      <span aria-hidden className="mt-2 flex items-center gap-[3px]">
        <span className="block h-3 w-3 rounded-full bg-accent-500" />
        <span className="block h-1 w-20 bg-accent-500" />
        <span className="block h-3 w-3 rounded-full bg-accent-500" />
      </span>

      <div className="mt-8">{children}</div>
    </section>
  );
}
