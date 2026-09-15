import { redirect } from "@/i18n/routing";

/**
 * Section landing — no page of its own; go to the first child (BRD §5).
 *
 * "Sekilas Perusahaan" (at-a-glance) rather than "Visi Misi": the fig's
 * own base "detail" export (figma node 1:4837) — the one this whole
 * section's shell is built from — shows that tab active by default.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/about/company-profile/at-a-glance", locale });
}
