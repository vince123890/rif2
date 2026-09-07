import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";

/**
 * The wide feature card the fig repeats across the About-Us children —
 * `Frame 165` in `Desktop - 15`, `18` and `19`.
 *
 * A 1312x600 photo on a white band, with a #EDEDED panel (613x270) inset
 * 24px and pinned to the bottom-left, and a 64px green disc sitting in a
 * notch cut out of the photo's bottom-right corner.
 */
export function FeatureBand({
  href,
  image,
  badge,
  title,
  excerpt,
  meta,
}: {
  href: string;
  image: string;
  badge?: string;
  title: string;
  excerpt: string;
  /** Small print under the excerpt, e.g. "Resona Admin · 23 October 2024". */
  meta?: string;
}) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-rif">
        <article className="group relative isolate rounded-[24px] lg:aspect-[1312/600]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink-900"
            /*
             * fig `Subtract`: the photo is the card minus a 99px circle
             * centred 32px in from the bottom-right, so it curves around
             * the 64px disc and leaves an even ring of page ground.
             */
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 50px at calc(100% - 32px) calc(100% - 32px), transparent 50px, #000 51px)",
              maskImage:
                "radial-gradient(circle 50px at calc(100% - 32px) calc(100% - 32px), transparent 50px, #000 51px)",
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 1312px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 lg:min-h-0">
            {/* fig `Frame 170`: #EDEDED at 90%, so the photo reads through */}
            <div className="w-full rounded-[24px] bg-ink-100/90 p-8 lg:w-[613px]">
              {badge ? (
                <span className="inline-flex rounded-full bg-brand-600 px-3 py-1.5 text-[12px] leading-none text-white">
                  {badge}
                </span>
              ) : null}

              <h3 className="mt-3 text-[26px] font-bold leading-[1.25] text-ink-900 md:text-[40px]">
                <Link href={href} className="transition-colors hover:text-brand-600">
                  {title}
                </Link>
              </h3>

              <p className="mt-3 line-clamp-3 text-[15px] leading-[1.5] text-ink-500 md:text-[16px]">
                {excerpt}
              </p>

              {meta ? (
                <p className="mt-5 text-[12px] text-ink-500">{meta}</p>
              ) : null}
            </div>
          </div>

          <Link
            href={href}
            aria-label={title}
            className="absolute bottom-0 right-0 grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:scale-105"
          >
            <ArrowRight className="h-7 w-7" aria-hidden />
          </Link>
        </article>
      </div>
    </section>
  );
}
