"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the shared <SiteFooter> on the homepage.
 *
 * The homepage renders the fig canvas, which draws the design's own footer
 * ("Group 160", y=5192, 1440x1435). Letting the shared footer render as well
 * would stack two of them. Every other route still gets the shared one.
 *
 * Matching is on the locale-stripped path, so `/id`, `/en` and a bare `/`
 * all count as the homepage.
 */
export function HomeFooterGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const withoutLocale = pathname.replace(/^\/(id|en)(?=\/|$)/, "");
  const isHome = withoutLocale === "" || withoutLocale === "/";

  return isHome ? null : <>{children}</>;
}
