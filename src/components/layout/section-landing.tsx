import { getTranslations } from "next-intl/server";

import { FigHero } from "./fig-hero";
import { FigMenuRows, type MenuRow } from "./fig-menu-rows";

export type LandingRow = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** Three photos make up the fig's stacked cluster. */
  images: string[];
};

/**
 * Section landing page — the shape `list menu` gives About Us, reused for
 * the other sections that have children.
 *
 * A green banner, then one row per child alternating side, each pairing a
 * 379×400 photo cluster with a 676×246 copy block. See `fig-menu-rows` for
 * the measured geometry.
 */
export async function SectionLanding({
  titleKey,
  subtitle,
  rows,
  image = "/fig/menu-hero.png",
}: {
  titleKey: string;
  subtitle?: string;
  rows: LandingRow[];
  image?: string;
}) {
  const [tNav, tc] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
  ]);

  return (
    <>
      <FigHero
        variant="green"
        title={tNav(titleKey)}
        subtitle={subtitle}
        image={image}
      />

      {/* fig: the rows sit on the plain #F9FAFB ground, with no pattern */}
      <div className="bg-canvas py-16 md:py-[100px]">
        <FigMenuRows rows={rows as MenuRow[]} cta={tc("readMore")} />
      </div>
    </>
  );
}
