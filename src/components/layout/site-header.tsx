import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { headerNavigation } from "@/config/navigation";
import { MainNav } from "./main-nav";

/**
 * Site header, styled from `docs/Resona Indonesia Finance.fig`.
 *
 * The fig replaces the old two-row header (white utility bar above a
 * full-bleed green nav) with a single floating pill: 1312×72 at radius 36,
 * filled #006F4F, inset 64px from the frame and overlapping the hero rather
 * than sitting above it. Every label, the language toggle and the search
 * icon are white.
 *
 * Contact details are no longer in the header — the fig keeps them in the
 * footer only.
 */
export async function SiteHeader() {
  const t = await getTranslations("nav");
  const nav = headerNavigation();

  // Labels resolve on the server so the client nav stays a thin shell.
  const items = nav.map((n) => ({
    key: n.key,
    label: t(n.key),
    href: n.href,
    flat: n.flat,
    children: n.children?.map((c) => ({
      key: c.key,
      label: t(c.key),
      href: c.href,
      children: c.children?.map((g) => ({
        key: g.key,
        label: t(g.key),
        href: g.href,
      })),
    })),
  }));

  return <MainNav items={items} brandName={site.name} />;
}
