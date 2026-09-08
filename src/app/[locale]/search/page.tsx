import { getTranslations, setRequestLocale } from "next-intl/server";

import { getArticles, getProducts, pick } from "@/lib/content";
import { visibleNavigation, type NavNode } from "@/config/navigation";
import { InnerPage } from "@/components/layout/inner-page";
import { SearchClient, type SearchDoc } from "@/components/content/search-client";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return buildMetadata({ locale, title: t("search"), path: "/search" });
}

/**
 * Site search.
 *
 * The fig puts a search icon in the header pill but never draws a results
 * screen, so the behaviour here is ours: everything the site already knows
 * about — navigation entries, products and articles — is flattened into a
 * list on the server and filtered in the browser. No index to keep in sync,
 * and it keeps working once the content moves to Strapi.
 */
export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  const [products, articles] = await Promise.all([
    getProducts(),
    getArticles(),
  ]);

  const docs: SearchDoc[] = [];

  // Navigation: every reachable page, at any depth.
  const walk = (nodes: NavNode[]) => {
    for (const n of nodes) {
      if (n.href !== "/") {
        docs.push({ title: tn(n.key), href: n.href, kind: t("searchPage") });
      }
      if (n.children?.length) walk(n.children);
    }
  };
  walk(visibleNavigation());

  for (const p of products) {
    docs.push({
      title: pick(p.name, locale),
      body: pick(p.summary, locale),
      href: `/products/${p.slug}`,
      kind: t("searchProduct"),
    });
  }

  for (const a of articles) {
    docs.push({
      title: pick(a.title, locale),
      body: pick(a.excerpt, locale),
      href: `/news/${a.slug}`,
      kind: t("searchNews"),
    });
  }

  // Same page can arrive from nav and from content; keep the richer entry.
  const unique = Array.from(
    docs.reduce((acc, d) => {
      const prev = acc.get(d.href);
      if (!prev || (!prev.body && d.body)) acc.set(d.href, d);
      return acc;
    }, new Map<string, SearchDoc>()),
    ([, d]) => d,
  );

  return (
    /*
     * Same shell as every other inner page: a full-bleed banner, a plain
     * breadcrumb back to the homepage, then the results in the white panel.
     */
    <InnerPage
      titleKey="search"
      sectionKey="home"
      sectionHref="/"
      heading={t("search")}
    >
      <SearchClient docs={unique} />
    </InnerPage>
  );
}
