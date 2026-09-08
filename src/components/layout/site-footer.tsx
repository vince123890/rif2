import Image from "next/image";
import { MapPin, Phone, Printer } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { Link } from "@/i18n/routing";
import { Logo } from "./logo";

/**
 * FR-GL-02 — footer, laid out from `docs/Resona Indonesia Finance.fig`
 * (frame "Frame 190").
 *
 * A green band holding the brand lockup with the address, phone numbers and
 * a map of the office, beside two columns of grouped links. The company
 * blurb from the old footer is gone — the design has no equivalent. Below
 * the band sits a light strip carrying the OJK statement and the copyright.
 */
export async function SiteFooter() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  /*
   * Link groups exactly as the fig lists them. The first column runs
   * ungrouped entries under "About Us"; the second carries three headed
   * groups. Labels resolve through the existing `nav.*` messages so both
   * languages keep working.
   */
  const columns: { heading: string; links: { key: string; href: string }[] }[][] =
    [
      [
        {
          heading: "about",
          links: [
            { key: "company-profile", href: "/about/company-profile" },
            { key: "csr", href: "/about/csr" },
            { key: "privacy", href: "/about/privacy" },
            { key: "bank-resona-perdania", href: "/about/bank-resona-perdania" },
            { key: "news", href: "/news" },
            { key: "careers", href: "/careers" },
          ],
        },
        {
          heading: "products",
          links: [
            { key: "products", href: "/products" },
            { key: "sbdp", href: "/products/sbdp" },
          ],
        },
      ],
      [
        {
          heading: "gcg",
          links: [
            { key: "anti-fraud", href: "/gcg/anti-fraud" },
            { key: "integrity-pact", href: "/gcg/integrity-pact" },
            {
              key: "good-corporate-governance",
              href: "/gcg/good-corporate-governance",
            },
            { key: "aml-cft", href: "/gcg/aml-cft" },
          ],
        },
        {
          heading: "corporate-secretary",
          links: [
            {
              key: "sustainability-report",
              href: "/corporate-secretary/sustainability-report",
            },
            {
              key: "financial-report",
              href: "/corporate-secretary/financial-report",
            },
            {
              key: "business-strategy",
              href: "/corporate-secretary/business-strategy",
            },
            { key: "privacy", href: "/corporate-secretary/privacy" },
          ],
        },
      ],
    ];

  return (
    <footer>
      <div className="relative isolate overflow-hidden bg-brand-600 text-white">
        {/* fig: an oversized Resona mark in #E6F1ED washes the right side */}
        <Image
          src="/brand/resona-mark-white.png"
          alt=""
          width={976}
          height={1000}
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 -z-10 h-[140%] w-auto opacity-[0.06]"
        />

        <div className="container-rif grid gap-12 py-16 lg:grid-cols-[415fr_538fr] lg:gap-24">
          {/* Brand, contact details, and the office map */}
          <div>
            {/* fig `Frame 175`: the footer wordmark is 32px Lato Regular */}
            <Logo
              tone="light"
              wordmarkClassName="text-[22px] md:text-[32px]"
            />

            {/* fig/capture: address and contact lines carry small outline icons */}
            <p className="mt-8 flex max-w-[420px] items-start gap-3 text-[15px] leading-[1.5] md:text-[16px]">
              <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </p>

            <p className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] md:text-[16px]">
              <span className="inline-flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" aria-hidden />
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-accent-300"
                >
                  {site.phone}
                </a>
              </span>
              <span className="inline-flex items-center gap-3">
                <Printer className="h-5 w-5 shrink-0" aria-hidden />
                {site.fax}
              </span>
            </p>

            {/*
             * The design puts a map of the office here, not a photo. A live
             * embed keeps it useful (pan, zoom, "open in Maps") rather than
             * being a picture of a map.
             */}
            <div className="mt-10 aspect-[415/212] max-w-[415px] overflow-hidden rounded-[24px]">
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name} — ${site.address.short}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((column, i) => (
              <div key={i} className="space-y-10">
                {column.map((group) => (
                  <nav key={group.heading} aria-label={tNav(group.heading)}>
                    <h2 className="text-[18px] font-bold text-white md:text-[20px]">
                      {tNav(group.heading)}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {group.links.map((l) => (
                        <li key={`${group.heading}-${l.href}`}>
                          <Link
                            href={l.href}
                            className="text-[15px] text-white transition-colors hover:text-accent-300 md:text-[16px]"
                          >
                            {tNav(l.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fig: the legal strip sits on the page ground, in black — not inside
          the green band */}
      <div className="bg-canvas">
        <div className="container-rif flex flex-col gap-2 py-6 text-[14px] text-ink-900 md:flex-row md:items-center md:justify-between md:text-[16px]">
          <p>{t("ojk")}</p>
          <p>
            ©{new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
