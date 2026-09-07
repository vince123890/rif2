import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { Link } from "@/i18n/routing";
import { Logo } from "./logo";

/**
 * FR-GL-02 — footer, laid out from `docs/Resona Indonesia Finance.fig`
 * (frame "Frame 190").
 *
 * The fig's footer is a green band holding three blocks: the brand lockup
 * with the address and phone numbers, an office photo beneath it, and two
 * columns of grouped links. There is no map embed and no company blurb —
 * both were in the old footer and neither appears in the design. Below the
 * band sits a light strip carrying the OJK statement and the copyright.
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
      <div className="bg-brand-600 text-white">
        <div className="container-rif grid gap-12 py-16 lg:grid-cols-[415fr_538fr] lg:gap-24">
          {/* Brand, contact, and the office photo the fig places beneath */}
          <div>
            <Logo tone="light" />

            <p className="mt-8 max-w-[390px] text-[15px] leading-[1.5] md:text-[16px]">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>

            <p className="mt-6 text-[15px] md:text-[16px]">
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-accent-300"
              >
                {site.phone}
              </a>
              <span className="px-2 text-white/50">/</span>
              {site.fax}
            </p>

            <div className="relative mt-10 aspect-[415/212] max-w-[415px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/office-tower.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 415px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((column, i) => (
              <div key={i} className="space-y-10">
                {column.map((group) => (
                  <nav key={group.heading} aria-label={tNav(group.heading)}>
                    <h2 className="text-[18px] font-bold md:text-[20px]">
                      {tNav(group.heading)}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {group.links.map((l) => (
                        <li key={`${group.heading}-${l.href}`}>
                          <Link
                            href={l.href}
                            className="text-[15px] transition-colors hover:text-accent-300 md:text-[16px]"
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
