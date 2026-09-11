"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  /** Render as a plain link even when it has children (see `navigation.ts`). */
  flat?: boolean;
  children?: NavItem[];
};

export function MainNav({
  items,
  brandName,
}: {
  items: NavItem[];
  brandName: string;
}) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /*
   * EXPERIMENT (RIF, temporary): the pill is fully transparent while the
   * page sits at the top, and turns solid as soon as it scrolls. Remove
   * this block, the `scrolled` classes on the pill, and restore the plain
   * `bg-brand-600` to go back.
   */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes. Deriving this during render
  // (rather than in an effect) avoids a cascading re-render on every nav.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Dismiss the desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /*
   * fig draws the pill two ways, and which one a page gets depends on the
   * banner underneath it:
   *
   *   white (`Frame 4` on `home page`, `Frame 87` on `list menu`) — over
   *         the dark hero photo and the green section banner, where a
   *         light bar reads as a floating panel.
   *   green (`Frame 4` on `detail`/`award`/`news`/`list doc`/`history`/
   *         `manajemen`) — over the cream #F8F3EF banner, where a white
   *         pill would disappear into the ground.
   *
   * Section landings (`/about`, `/products`, …) carry the green banner, so
   * they take the white pill; everything deeper sits on cream.
   */
  const SECTION_LANDINGS = [
    "/",
    "/about",
    "/products",
    "/gcg",
    "/corporate-secretary",
  ];
  const onLightBanner = !SECTION_LANDINGS.includes(pathname);

  /* The pill is dark-on-dark in every state now, so labels stay white. */
  const linkTone = "text-white hover:text-accent-300";

  /*
   * The fig's rail opens straight on "About Us" — the brand lockup is the
   * home link there — but RIF asked for an explicit Home entry, so the
   * desktop rail now shows the list whole.
   */
  const desktopItems = items;

  return (
    /*
     * fig: a floating pill (1312×72, radius 36, #006F4F) inset from the
     * frame and overlapping the hero, not a full-bleed bar. `absolute` on
     * desktop lets the dark hero photo run underneath it.
     */
    <div
      ref={navRef}
      /*
       * The pill overlays the page rather than pushing it down, so the
       * hero photo runs underneath it. `sticky` (not `absolute`) keeps it
       * in flow: a zero-height absolute header would let the next section
       * paint over it, which is exactly what happened to the inner-page
       * banner. The negative margin pulls the following content back up by
       * the pill's height so the overlay effect is preserved.
       */
      className="lg:sticky lg:top-10 lg:z-50 lg:-mb-[120px] lg:bg-transparent"
    >
      <div
        /*
         * fig `Frame 4`: a 1360×80 pill inset 40px from the 1440 frame, at
         * radius 24, filled #FFFFFF with a 10px background blur — a light
         * bar floating over the dark hero, not the solid green one the
         * previous design used.
         *
         * It stays translucent at the top of the page so the hero photo
         * reads through it, and turns opaque once the page scrolls and
         * lighter content passes underneath.
         */
        className={cn(
          "transition-colors duration-300 lg:mx-auto lg:w-[calc(100%-5rem)] lg:max-w-[1360px] lg:rounded-[24px] lg:px-6 lg:backdrop-blur-[10px]",
          "bg-brand-600",
          onLightBanner
            ? /* fig: solid #006F4F over the cream banner */
              "lg:bg-brand-600 lg:shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)]"
            : scrolled
              ? "lg:bg-brand-600 lg:shadow-[0_10px_40px_-18px_rgba(0,0,0,0.35)]"
              : /* fig `Frame 4`: #FFFFFF at 6% — a glass pane over the
                   hero photo, not a solid white bar. */
                "lg:bg-white/[0.06] lg:shadow-none",
        )}
      >
        <div className="container-rif flex h-16 items-center justify-between gap-3 lg:h-20 lg:flex-nowrap lg:gap-5 lg:px-0">
          {/* Brand lockup — inside the pill on desktop, per the fig */}
          <Link
            href="/"
            aria-label={brandName}
            className="shrink-0 lg:pl-2"
          >
            <Logo
              /* Always the white lockup: the pill is either the 6% glass
                 pane over the hero or solid #006F4F. */
              tone="light"
              wordmarkClassName="text-[15px] xl:text-[16px]"
            />
          </Link>

          {/* Desktop menu */}
          <nav aria-label="Main" className="hidden min-w-0 flex-1 lg:block">
            <ul
              /*
               * Even gaps rather than `justify-between`: with six labels of
               * very different widths, spreading them to the edges leaves
               * ragged holes between the short ones.
               */
              className="flex flex-nowrap items-center justify-center gap-1 xl:gap-3"
            >
            {desktopItems.map((item) => {
              const hasKids = !item.flat && !!item.children?.length;
              const expanded = open === item.key;

              return (
                <li key={item.key} className="relative">
                  {hasKids ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => setOpen(expanded ? null : item.key)}
                      onMouseEnter={() => setOpen(item.key)}
                      className={cn(
                        /*
                         * The active menu keeps a 2px rule under its label.
                         * `underline-offset` puts it clear of the descenders
                         * so it reads as a marker, not a text decoration.
                         */
                        "flex items-center gap-1 whitespace-nowrap px-1.5 py-4 text-[13px] font-normal underline-offset-[6px] transition-colors xl:px-2 xl:text-[16px]",
                        isActive(item.href) || expanded
                          ? "text-accent-300"
                          : linkTone,
                        isActive(item.href) &&
                          "underline decoration-accent-300 decoration-2",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          expanded && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onMouseEnter={() => setOpen(null)}
                      className={cn(
                        "flex items-center gap-1 whitespace-nowrap px-1.5 py-4 text-[13px] font-normal underline-offset-[6px] transition-colors xl:px-2 xl:text-[16px]",
                        isActive(item.href)
                          ? "text-accent-300 underline decoration-accent-300 decoration-2"
                          : linkTone,
                      )}
                    >
                      {item.label}
                      {/*
                       * fig keeps the caret on every section that has
                       * children even though the bar opens nothing — it
                       * marks "this leads somewhere deeper", so a section
                       * landing page still shows it.
                       */}
                      {item.children?.length ? (
                        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                      ) : null}
                    </Link>
                  )}

                  {hasKids && expanded && (
                    <div
                      onMouseLeave={() => setOpen(null)}
                      className="absolute left-0 top-full z-50 min-w-[290px] animate-fade-up rounded-b-md border-t-2 border-accent-500 bg-white py-2 shadow-xl"
                    >
                      <ul>
                        {item.children!.map((child) => (
                          <SubMenuItem key={child.key} item={child} />
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

          <div className="flex shrink-0 items-center gap-1 lg:pr-1">
            <LanguageSwitcher />

            {/* fig: a search icon sits at the trailing edge of the pill. */}
            <Link
              href="/search"
              aria-label={t("search")}
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <Search className="h-5 w-5" aria-hidden />
            </Link>

            <button
              type="button"
              className="rounded-[12px] p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && <MobileMenu items={items} isActive={isActive} />}
      </div>
    </div>
  );
}

/** Second level, with an optional flyout for the third (Company Profile). */
function SubMenuItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasKids = !!item.children?.length;

  if (!hasKids) {
    return (
      <li>
        <Link
          href={item.href}
          className="block px-5 py-2.5 text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
      >
        {item.label}
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </button>

      {open && (
        <div className="absolute left-full top-0 z-50 min-w-[270px] rounded-[12px] border-t-2 border-accent-500 bg-white py-2 shadow-xl">
          <ul>
            {item.children!.map((g) => (
              <li key={g.key}>
                <Link
                  href={g.href}
                  className="block px-5 py-2.5 text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function MobileMenu({
  items,
  isActive,
}: {
  items: NavItem[];
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggle = (key: string) =>
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <nav
      aria-label="Mobile"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/15 bg-brand-600 pb-6 lg:hidden"
    >
      <ul className="container-rif divide-y divide-white/10">
        {items.map((item) => {
          const hasKids = !item.flat && !!item.children?.length;
          const isOpen = expanded.includes(item.key);

          return (
            <li key={item.key}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "flex-1 py-3.5 text-[16px] font-medium",
                    isActive(item.href)
                      ? "text-accent-300 underline decoration-accent-300 decoration-2 underline-offset-[6px]"
                      : "text-white",
                  )}
                >
                  {item.label}
                </Link>
                {hasKids && (
                  <button
                    type="button"
                    onClick={() => toggle(item.key)}
                    aria-expanded={isOpen}
                    aria-label={item.label}
                    className="p-3 text-white/80"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                )}
              </div>

              {hasKids && isOpen && (
                <ul className="space-y-0.5 pb-3 pl-4">
                  {item.children!.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        className="block py-2 text-[14px] text-white/85"
                      >
                        {child.label}
                      </Link>
                      {child.children?.length ? (
                        <ul className="mb-1 space-y-0.5 border-l border-white/20 pl-4">
                          {child.children.map((g) => (
                            <li key={g.key}>
                              <Link
                                href={g.href}
                                className="block py-1.5 text-[13px] text-white/70"
                              >
                                {g.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
