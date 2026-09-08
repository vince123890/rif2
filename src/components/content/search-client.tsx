"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Search } from "lucide-react";

import { Link } from "@/i18n/routing";

export type SearchDoc = {
  title: string;
  body?: string;
  href: string;
  /** Localised label — "Page", "Product", "News". */
  kind: string;
};

/**
 * Client-side filter over the documents the server handed us.
 *
 * The corpus is small (nav entries plus products and articles), so matching
 * in the browser keeps the page instant and avoids shipping a search index.
 */
export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const t = useTranslations("common");
  const [query, setQuery] = useState("");

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const results = useMemo(() => {
    if (!terms.length) return [];
    return docs
      .map((d) => {
        const title = d.title.toLowerCase();
        const body = (d.body ?? "").toLowerCase();
        // Every term must appear somewhere; title hits rank higher.
        let score = 0;
        for (const term of terms) {
          if (title.includes(term)) score += 3;
          else if (body.includes(term)) score += 1;
          else return null;
        }
        return { doc: d, score };
      })
      .filter((r): r is { doc: SearchDoc; score: number } => r !== null)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .map((r) => r.doc);
  }, [docs, terms]);

  return (
    <div>
      <div>
        <label htmlFor="site-search" className="sr-only">
          {t("search")}
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
          <input
            id="site-search"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            /* fig radius language: pill inputs and buttons at r=100 */
            className="h-[58px] w-full rounded-full border border-ink-200 bg-white pl-14 pr-6 text-[16px] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-600"
          />
        </div>

        {terms.length > 0 && (
          <p className="mt-6 text-[14px] text-ink-500" aria-live="polite">
            {t("searchCount", { count: results.length })}
          </p>
        )}

        <ul className="mt-6 space-y-4">
          {results.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex items-start gap-4 rounded-[24px] border border-ink-200 bg-white p-6 transition-colors hover:border-brand-600"
              >
                <div className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-[12px] text-white">
                    {d.kind}
                  </span>
                  <p className="mt-3 text-[18px] font-bold text-ink-900">
                    {d.title}
                  </p>
                  {d.body ? (
                    <p className="mt-1.5 line-clamp-2 text-[16px] text-ink-500">
                      {d.body}
                    </p>
                  ) : null}
                </div>
                <span
                  aria-hidden
                  className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-1"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
