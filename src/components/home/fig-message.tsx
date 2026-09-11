import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { FigHeading } from "@/components/ui/fig-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Management message — fig `Rectangle 102`, `Group 161`, and the copy block
 * at x=530.
 *
 * Geometry from the decoded tree:
 *   - `Rectangle 102` : 400×550 #006F4F card at (80, 1000), radius 32
 *   - `Mask group`    : a white card of the same size sits on it, carrying
 *                       an oversized #006F4F blossom bleeding off the
 *                       bottom-left — the photo's backdrop
 *   - `image 29`      : the 302×507 cut-out portrait at (129, 1043)
 *   - `Group 161`     : the 60×80 Resona mark, orange RESONA wordmark
 *   - copy block      : eyebrow at y=1018, 40px title at y=1054, 24px Bold
 *                       salutation at y=1158, 16px/1.6 body at y=1203
 *   - `Button`        : 216×64 #006F4F at (529, 1469), radius 12
 */
export function FigMessage({
  eyebrow,
  title,
  salutation,
  body,
  cta,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  salutation: string;
  body: string;
  cta: string;
  ctaHref: string;
}) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[400fr_830fr] lg:gap-[50px]">
      {/* Portrait card */}
      <Reveal className="mx-auto w-full max-w-[400px]">
        <div className="relative aspect-[400/550] overflow-hidden rounded-[32px] bg-white">
          {/*
           * fig `Group 30`: a single oversized blossom filled #006F4F,
           * bleeding out of the bottom-left of the card behind the
           * portrait. Painted as a masked block rather than a tinted <img>
           * so the colour is the literal brand green, not a filter
           * approximation of it.
           */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[18%] -left-[28%] block h-[140%] w-[140%] bg-brand-600"
            style={{
              WebkitMaskImage: "url(/brand/resona-blossom.png)",
              maskImage: "url(/brand/resona-blossom.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />

          {/* fig `image 29`: the cut-out portrait, 302×507 */}
          <Image
            src="/fig/ceo.png"
            alt=""
            width={604}
            height={1014}
            priority
            className="absolute bottom-0 left-1/2 h-[92%] w-auto -translate-x-1/2 object-contain"
          />

          {/* fig `Group 161`: the mark + orange RESONA wordmark, top-left */}
          <span className="absolute left-8 top-8 flex flex-col items-center gap-1">
            <Image
              src="/brand/resona-mark.png"
              alt=""
              width={252}
              height={320}
              aria-hidden
              className="h-[58px] w-auto"
            />
            <span className="text-[13px] font-semibold leading-none tracking-[0.08em] text-accent-500">
              RESONA
            </span>
          </span>
        </div>
      </Reveal>

      {/* Copy */}
      <Reveal delay={120}>
        <FigHeading eyebrow={eyebrow} title={title} align="left" />

        {/* fig: 24px Lato Bold, 100% line box */}
        <p className="mt-10 text-[19px] font-bold leading-none text-ink-900 md:text-[24px]">
          {salutation}
        </p>

        {/* fig: 16px Lato Regular on 1.6, #6E6E6E, 830px wide */}
        <p className="mt-5 max-w-[830px] text-[15px] leading-[1.6] text-ink-500 md:text-[16px]">
          {body}
        </p>

        {/* fig `Button`: 216×64, #006F4F, radius 12 — square, not a pill */}
        <ButtonLink
          href={ctaHref}
          className="mt-10 h-16 rounded-[12px] px-6 text-[17px] font-normal leading-[1.7] shadow-[0_6px_15px_-4px_rgba(0,0,0,0.2)] md:text-[20px]"
        >
          {cta}
        </ButtonLink>
      </Reveal>
    </div>
  );
}
