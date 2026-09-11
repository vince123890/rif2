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
        {/*
         * fig `Rectangle 102`: a 400×550 card at radius 32 filled #006F4F
         * at 5% — a pale mint tint, not the solid brand green.
         */}
        {/*
         * Every offset below is the fig's own number expressed against the
         * 400×550 card, so the layout holds as the card scales:
         *
         *   card       `Rectangle 102`   400×550 @(80,1000)  #006F4F @ 0.05
         *   R mark     `Group 30`/Vector 704.53² @(-30,1236.93) #006F4F @ 0.04
         *   portrait   `image 29`        302×507 @(129,1043)
         *   logo R     `Group 161`/Vector 57.66×59.64 @(112,1091.64)
         *   "RESONA"   TEXT              @(112,1094.74) 14px #F58220
         */}
        <div className="relative aspect-[400/550] overflow-hidden rounded-[32px] bg-[#006F4F]/5">
          {/*
           * R mark: (-30-80)/400 = -27.5% left, (1236.93-1000)/550 = 43.08%
           * top, 704.53/400 = 176.13% wide. Painted as a masked block so the
           * fill is literally #006F4F at 4%, regardless of the artwork's own
           * colours.
           */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[-27.5%] top-[43.08%] block aspect-square w-[176.13%] bg-[#006F4F] opacity-[0.04]"
            style={{
              WebkitMaskImage: "url(/brand/resona-mark-only.png)",
              maskImage: "url(/brand/resona-mark-only.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          {/* portrait: (129-80)/400 = 12.25% left, (1043-1000)/550 = 7.82% top */}
          <Image
            src="/fig/ceo.png"
            alt=""
            width={604}
            height={1014}
            priority
            className="absolute left-[12.25%] top-[7.82%] h-[92.18%] w-[75.5%] object-contain object-bottom"
          />

          {/*
           * `Group 161`: the mark with its orange RESONA wordmark, at
           * (112-80)/400 = 8% left, (1032-1000)/550 = 5.82% top. The
           * supplied lockup already pairs the two, so it ships whole.
           */}
          <Image
            src="/brand/resona-mark.png"
            alt=""
            aria-hidden
            width={252}
            height={320}
            className="absolute left-[8%] top-[5.82%] w-[15.09%]"
          />
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
