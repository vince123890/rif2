import Image from "next/image";
import { Globe, MapPin, MessageSquare, Phone, Printer } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { Link } from "@/i18n/routing";

/**
 * FR-GL-02 — footer, built from `Group 160` in
 * `docs/Resona_Indonesia_Finance.fig` (1440×1435 at y=5192).
 *
 * Geometry from the decoded node tree:
 *   - `Rectangle 99`  : 1440×1366 #101828 ground (dark navy, not green)
 *   - `Rectangle 98`  : a 1440×69 #064631 strip under it, carrying the
 *                       OJK line and the copyright
 *   - `Group`         : the white wordmark at (50, 190), 501×90
 *   - the italic blurb: 589px wide at (50, 240), 14px Lato Italic
 *   - `Frame 26803`   : the address row at (50, 348)
 *   - `Frame 26807/8` : four contact cards at x=745, each a 52px #006F4F
 *                       roundel beside a 16px Bold label over a #338C72 value
 *   - `Frame 26798`   : four link columns at (50, 466), 297.5 wide on a
 *                       50px gap — headings 24px Bold white, links 20px
 *                       Bold #338C72 on a 58px rhythm
 *   - `Mask group`    : the 1340×300 map at (50, 1016), radius 50
 */
export async function SiteFooter() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  /* fig `Frame 387-390`: four headed columns. */
  const columns: { heading: string; links: { label: string; href: string }[] }[] =
    [
      {
        heading: t("colAbout"),
        links: [
          { label: tNav("management"), href: "/about/company-profile/management" },
          { label: tNav("company-profile"), href: "/about/company-profile" },
          {
            label: tNav("bank-resona-perdania"),
            href: "/about/bank-resona-perdania",
          },
          { label: tNav("privacy"), href: "/about/privacy" },
          { label: tNav("careers"), href: "/careers" },
          { label: tNav("csr"), href: "/about/csr" },
        ],
      },
      {
        heading: t("colProduct"),
        links: [
          { label: tNav("products"), href: "/products" },
          { label: tNav("sbdp"), href: "/products/sbdp" },
        ],
      },
      {
        heading: t("colGcg"),
        links: [
          { label: tNav("anti-fraud"), href: "/gcg/anti-fraud" },
          { label: tNav("integrity-pact"), href: "/gcg/integrity-pact" },
          {
            label: tNav("good-corporate-governance"),
            href: "/gcg/good-corporate-governance",
          },
          { label: tNav("aml-cft"), href: "/gcg/aml-cft" },
        ],
      },
      {
        heading: t("colInvestor"),
        links: [
          {
            label: tNav("financial-report"),
            href: "/corporate-secretary/financial-report",
          },
          {
            label: tNav("sustainability-report"),
            href: "/corporate-secretary/sustainability-report",
          },
          {
            label: tNav("business-strategy"),
            href: "/corporate-secretary/business-strategy",
          },
          { label: tNav("news"), href: "/news" },
        ],
      },
    ];

  /* fig `Frame 26807` / `Frame 26808`: the 2×2 block of contact cards. */
  const contacts = [
    { icon: Phone, label: t("phoneLabel"), value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
    { icon: Printer, label: t("faxLabel"), value: site.fax },
    { icon: Globe, label: t("customerReport"), value: "rif_helpdesk@perdania.co.id", href: "mailto:rif_helpdesk@perdania.co.id" },
    { icon: MessageSquare, label: t("customerQuestionnaire"), value: "cust_rif@perdania.co.id", href: "mailto:cust_rif@perdania.co.id" },
  ];

  return (
    <footer>
      {/* fig `Rectangle 99`: #101828 */}
      <div className="bg-[#101828] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-[50px] lg:py-[50px]">
          {/* ---- Brand, blurb, address, contacts ---- */}
          <div className="grid gap-12 lg:grid-cols-[589fr_645fr] lg:gap-[106px]">
            <div>
              <Image
                src="/brand/resona-mark-white.png"
                alt={site.name}
                width={252}
                height={320}
                className="h-[68px] w-auto lg:h-[90px]"
              />

              {/* fig: 14px Lato Italic, 589px wide */}
              <p className="mt-6 max-w-[589px] text-[13px] italic leading-[1.5] text-white/90 md:text-[14px]">
                {t("legalBlurb")}
              </p>

              {/* fig `Frame 26803`: address row with a 24px pin */}
              <p className="mt-8 flex max-w-[390px] items-start gap-3 text-[13px] leading-[1.5] md:text-[14px]">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0" aria-hidden />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </p>
            </div>

            {/* fig: contact cards, two per row on a 62px gap */}
            <ul className="grid gap-6 sm:grid-cols-2 lg:gap-x-[62px] lg:gap-y-6 lg:pt-[62px]">
              {contacts.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  {/* fig `euro-coin-svgrepo-com 1`: a 52px #006F4F roundel */}
                  <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-brand-600">
                    <c.icon className="h-4 w-4" aria-hidden />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold leading-[1.5] md:text-[16px]">
                      {c.label}
                    </span>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="block truncate text-[15px] font-bold leading-[1.5] text-brand-400 transition-colors hover:text-accent-300 md:text-[16px]"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="block truncate text-[15px] font-bold leading-[1.5] text-brand-400 md:text-[16px]">
                        {c.value}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- fig `Frame 26798`: four link columns ---- */}
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-[76px] lg:grid-cols-4 lg:gap-[50px]">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                {/* fig: 24px Lato Bold, white, 100% line box */}
                <h2 className="text-[20px] font-bold leading-none text-white md:text-[24px]">
                  {col.heading}
                </h2>

                {/* fig: 20px Lato Bold #338C72, 58px rhythm */}
                <ul className="mt-6 space-y-[18px]">
                  {col.links.map((l) => (
                    <li key={`${col.heading}-${l.href}`}>
                      <Link
                        href={l.href}
                        className="text-[16px] font-bold leading-[1.7] text-brand-400 transition-colors hover:text-white md:text-[20px]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---- fig `Mask group`: the 1340×300 map, radius 50 ---- */}
          <div className="mt-14 h-[220px] overflow-hidden rounded-[32px] lg:mt-[50px] lg:h-[300px] lg:rounded-[50px]">
            <iframe
              src={site.mapEmbedUrl}
              title={`${site.name} — ${site.address.short}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>

      {/* fig `Rectangle 98`: a 69px #064631 strip closing the page */}
      <div className="bg-[#064631] text-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-5 py-5 text-[13px] leading-[1.5] sm:px-8 md:flex-row md:items-center md:justify-between md:text-[14px] lg:px-[50px]">
          <p className="font-semibold">{t("ojk")}</p>
          <p>
            ©{new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
