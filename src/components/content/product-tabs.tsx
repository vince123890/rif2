"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import type { Product } from "@/lib/content";
import { pick, pickList } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Tabbed product panel — the "Pembiayaan Investasi / Modal Kerja / Anjak
 * Piutang" card (FR-HM-02, FR-PS-01..03).
 *
 * Styled from the fig, which drops the bordered card and underlined tabs in
 * favour of a floating pill rail (r=34) holding one pill per product (r=100);
 * the selected pill fills green with white Bold type.
 */
export function ProductTabs({ products }: { products: Product[] }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [active, setActive] = useState(0);

  if (!products.length) return null;
  const product = products[active];

  return (
    <div>
      {/* Tab rail — fig: pills inside a pill, centred above the panel */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Products"
          className="inline-flex max-w-full flex-wrap justify-center gap-2 rounded-[34px] bg-white p-3 shadow-sm"
        >
          {products.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              id={`tab-${p.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${p.slug}`}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[16px] transition-colors md:text-[20px]",
                i === active
                  ? "bg-brand-600 font-bold text-white"
                  : "text-ink-900 hover:bg-brand-50",
              )}
            >
              {pick(p.name, locale)}
            </button>
          ))}
        </div>
      </div>

      {/*
       * Panel — fig `Frame 125`: copy in a 600px column on the left, the
       * artwork as a 558px square bleeding off to the right. Switching tabs
       * cross-fades the panel so it reads as a change of subject rather
       * than a hard swap.
       */}
      <div
        role="tabpanel"
        id={`panel-${product.slug}`}
        aria-labelledby={`tab-${product.slug}`}
        key={product.slug}
        className="mt-14 grid animate-fade-up gap-10 lg:grid-cols-[600fr_558fr] lg:items-center lg:gap-14"
      >
        <div className="order-2 flex flex-col lg:order-1">
          {/* fig: heading, bullets and body all in brand green */}
          <h3 className="text-[24px] font-bold leading-[1.3] text-brand-600 md:text-[32px]">
            {pick(product.summary, locale)}
          </h3>

          {/* fig `Frame 113`: 28px hex marks, 24px copy in green */}
          <ul className="mt-6 space-y-2.5">
            {pickList(product.highlights, locale).map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[18px] font-bold text-brand-600 md:text-[24px]"
              >
                <Image
                  src="/brand/bullet-hex.svg"
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden
                  className="h-7 w-7 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>

          {/*
           * fig `Frame 116`: a bold green lead-in ("Benefit of Finance
           * Lease:") followed by two paragraphs — the first green Bold, the
           * second grey Regular. Only the investment product carries one.
           */}
          {product.benefit ? (
            <div className="mt-7">
              <p className="text-[16px] font-bold leading-[1.4] text-brand-600 md:text-[18px]">
                {pick(product.benefit.title, locale)}
              </p>
              {pickList(product.benefit.paragraphs, locale).map((para, i) => (
                <p
                  key={para}
                  className={cn(
                    "mt-3 text-justify text-[13px] leading-[1.6] md:text-[15px]",
                    i === 0
                      ? "font-bold text-brand-600"
                      : "text-ink-500",
                  )}
                >
                  {para}
                </p>
              ))}
            </div>
          ) : null}

          {/* fig: the CTA fills the column width rather than hugging its label */}
          <div className="mt-8">
            <ButtonLink
              href={`/products/${product.slug}`}
              variant="accent"
              size="lg"
              className="w-full"
            >
              {t("learnMore")}
            </ButtonLink>
          </div>
        </div>

        <div className="relative order-1 aspect-square lg:order-2">
          <Image
            src={product.image}
            alt={pick(product.name, locale)}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
