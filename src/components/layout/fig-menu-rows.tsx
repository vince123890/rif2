import Image from "next/image";
import { MessageSquare } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type MenuRow = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** Three photos make up the fig's stacked cluster. */
  images: string[];
};

/**
 * Section-landing rows — `list menu` in the fig.
 *
 * Five rows alternate side on a 580px rhythm:
 *
 *   `Frame 82/84/86` (copy at x=609) pair with `Group 169/171/173`
 *   (cluster at x=130) — copy right, photos left.
 *
 *   `Frame 83/85` (copy at x=155) pair with `Group 170/172` (cluster at
 *   x=1310) — copy left, photos right, the cluster running off the frame.
 *
 * Each copy block is 676×246: a 40px Lato Bold title, 16px body, and a
 * 216×64 button at radius 12. The button is #006F4F on the copy-left rows
 * and #FFFFFF on the copy-right ones.
 *
 * Each cluster is 379×400 and holds three ~245×127 cards at radius ~13
 * plus a 128px white roundel carrying an icon.
 */
export function FigMenuRows({ rows, cta }: { rows: MenuRow[]; cta: string }) {
  return (
    <div className="space-y-20 lg:space-y-[110px]">
      {rows.map((row, i) => {
        /* fig: rows 1, 3 and 5 put the copy on the right. */
        const copyRight = i % 2 === 0;

        return (
          <div key={row.key} className="container-rif">
            <div
              className={cn(
                "grid items-center gap-10 lg:gap-[100px]",
                "lg:grid-cols-[379fr_676fr]",
              )}
            >
              <Reveal
                className={cn(
                  "order-1",
                  copyRight ? "lg:order-1" : "lg:order-2",
                )}
              >
                <PhotoCluster images={row.images} />
              </Reveal>

              <Reveal
                delay={110}
                className={cn(
                  "order-2",
                  copyRight ? "lg:order-2" : "lg:order-1",
                )}
              >
                {/* fig `Frame 81`: 40px Bold title over a 16px body */}
                <h2 className="text-[28px] font-bold leading-none text-ink-900 md:text-[40px]">
                  {row.title}
                </h2>

                <p className="mt-6 max-w-[676px] text-[15px] leading-[1.6] text-ink-500 md:text-[16px]">
                  {row.body}
                </p>

                {/* fig `Button`: 216×64 at radius 12 */}
                <ButtonLink
                  href={row.href}
                  className="mt-[50px] h-16 rounded-[12px] px-6 text-[17px] font-normal leading-[1.7] shadow-[0_6px_15px_-4px_rgba(0,0,0,0.15)] md:text-[20px]"
                >
                  {cta}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * fig `Group 169`: three soft-cornered cards stacked down the right of the
 * cluster, with a 128px white roundel seated at the left of the middle row.
 */
function PhotoCluster({ images }: { images: string[] }) {
  const [a, b, c] = [images[0], images[1] ?? images[0], images[2] ?? images[0]];

  return (
    <div className="relative mx-auto aspect-[379/400] w-full max-w-[379px]">
      {/* top card — fig 245×127 at x=130, y=0 */}
      <div className="absolute left-[34.3%] top-0 h-[31.6%] w-[64.7%] overflow-hidden rounded-[13px] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)]">
        <Image src={a} alt="" fill sizes="245px" className="object-cover" />
      </div>

      {/* middle card — fig 219×127 at x=160, y=137 */}
      <div className="absolute left-[42.3%] top-[34.2%] h-[31.6%] w-[57.7%] overflow-hidden rounded-[13px] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)]">
        <Image src={b} alt="" fill sizes="219px" className="object-cover" />
      </div>

      {/* bottom card — fig 245×127 at x=130, y=273 */}
      <div className="absolute left-[34.3%] top-[68.4%] h-[31.6%] w-[64.7%] overflow-hidden rounded-[13px] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)]">
        <Image src={c} alt="" fill sizes="245px" className="object-cover" />
      </div>

      {/* fig `Button`: a 128px white roundel with a 63px icon */}
      <div className="absolute left-0 top-[34.2%] grid h-[33.8%] w-[33.8%] place-items-center rounded-full bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
        <MessageSquare
          className="h-1/2 w-1/2 text-brand-600"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </div>
  );
}
