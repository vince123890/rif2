"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";

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

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${product.slug}`}
        aria-labelledby={`tab-${product.slug}`}
        className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div className="relative order-2 aspect-square overflow-hidden rounded-[24px] bg-ink-100 lg:order-none">
          <Image
            src={product.image}
            alt={pick(product.name, locale)}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-[24px] font-bold leading-snug text-brand-600 md:text-[32px]">
            {pick(product.summary, locale)}
          </h3>

          <ul className="mt-6 space-y-3 border-t border-ink-200 pt-6">
            {pickList(product.highlights, locale).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          {/* Multi-currency marks, as on the existing product card */}
          <div className="mt-7 flex gap-3" aria-label="IDR, USD, JPY">
            {["Rp", "$", "¥"].map((c) => (
              <span
                key={c}
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-[17px] font-bold text-white"
              >
                {c}
              </span>
            ))}
          </div>

          {/* fig: the CTA fills the column width rather than hugging its label */}
          <div className="mt-8">
            <ButtonLink
              href={`/products/${product.slug}`}
              variant="accent"
              size="lg"
              className="w-full"
            >
              {t("more")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
