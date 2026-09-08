import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalLink, MapPin, Phone } from "lucide-react";

import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { InnerPage } from "@/components/layout/inner-page";

const ROUTE = "/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "contact", path: ROUTE });
}

/** FR-CT-01..05 — contact details, map, and external Microsoft Forms links. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tc] = await Promise.all([
    getTranslations("contact"),
    getTranslations("common"),
  ]);

  const links = [
    { intro: t("formIntro"), label: t("formLink"), href: site.external.contactForm },
    {
      intro: t("complaintIntro"),
      label: t("complaintLink"),
      href: site.external.complaintReport,
    },
    {
      intro: t("surveyIntro"),
      label: t("surveyLink"),
      href: site.external.satisfactionSurvey,
    },
  ];


  const channels = [
    {
      kind: t("verbal"),
      note: t("verbalNote"),
      ways: [t("byPhoneChannel"), t("byVisit")],
    },
    {
      kind: t("written"),
      note: t("writtenNote"),
      ways: [t("byEmail"), t("byPost")],
    },
  ];

  return (
    <InnerPage titleKey="contact" sectionKey="home" sectionHref="/" heading={t("title")}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[16px] text-ink-700">{t("lead")}</p>

          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-[14px] text-ink-500">{t("byPhone")}</dt>
                <dd className="mt-0.5 text-[16px] text-ink-800">
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-brand-600"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-[14px] text-ink-500">{t("byOffice")}</dt>
                <dd className="mt-0.5 text-[16px] leading-relaxed text-ink-800">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
            </div>
          </dl>

          {/* FR-CT-03/04/05 — external forms */}
          <div className="mt-10 space-y-6 border-t border-ink-200 pt-8">
            {links.map((l) => (
              <div key={l.label}>
                <p className="text-[15px] leading-relaxed text-ink-700">
                  {l.intro}
                </p>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
                >
                  {l.label}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> ({tc("externalLink")})</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FR-CT-02 — Google Maps embed */}
        <div>
          <div className="overflow-hidden rounded-[16px] border border-ink-200">
            <iframe
              src={site.mapEmbedUrl}
              title={`${site.name} — ${locale === "id" ? "Lokasi" : "Location"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
          <a
            href={site.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-brand-600 hover:text-brand-700"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Google Maps
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      {/*
       * FR-CT-06 — the complaint mechanism the existing site carries under
       * the contact details: how a complaint may be raised, what a written
       * one must include, and how far it can be escalated.
       */}
      <section className="mt-10 border-t border-ink-200 pt-10">
        <h2 className="text-[24px] font-bold leading-[1.2] text-brand-600 md:text-[32px]">
          {t("mechanismTitle")}
        </h2>
        <p className="mt-4 text-justify text-[15px] leading-[1.6] text-ink-500 md:text-[16px]">
          {t("mechanismIntro")}
        </p>

        <h3 className="mt-8 text-[18px] font-bold text-ink-900 md:text-[20px]">
          {t("channelsTitle")}
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {channels.map((c) => (
            <div
              key={c.kind}
              className="rounded-[16px] border border-brand-200 bg-brand-50 p-6"
            >
              <p className="text-[16px] font-bold text-brand-700">{c.kind}</p>
              <p className="mt-1 text-[14px] leading-[1.5] text-ink-500">
                {c.note}
              </p>
              <ul className="mt-4 space-y-2">
                {c.ways.map((w) => (
                  <li
                    key={w}
                    className="rounded-[10px] bg-white px-4 py-2.5 text-[14px] leading-[1.5] text-ink-700"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[16px] bg-ink-100 p-6 md:p-8">
          <p className="text-[16px] font-bold text-ink-900">{t("docsTitle")}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-[1.6] text-ink-700 md:text-[15px]">
            <li>{t("doc1")}</li>
            <li>{t("doc2")}</li>
            <li>{t("doc3")}</li>
            <li>{t("doc4")}</li>
            <li>{t("doc5")}</li>
          </ul>
        </div>

        <h3 className="mt-10 text-[18px] font-bold text-ink-900 md:text-[20px]">
          {t("flowTitle")}
        </h3>
        <ol className="mt-4 list-decimal space-y-3 rounded-[16px] bg-brand-50 p-6 pl-10 text-[14px] leading-[1.6] text-ink-700 md:p-8 md:pl-12 md:text-[15px]">
          <li>{t("flow1")}</li>
          <li>{t("flow2")}</li>
          <li>{t("flow3")}</li>
        </ol>
      </section>
    </InnerPage>
  );
}
