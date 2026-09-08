import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { FigHero } from "./fig-hero";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LandingRow = {
  key: string;
  title: string;
  body: string;
  href: string;
  /** One photo, or two for the stacked pair on alternating rows. */
  images: string[];
};

/**
 * Section landing page — the shape `Desktop - 8` gives About Us, reused for
 * the other sections that have children.
 *
 * A banner, then one row per child: the copy sits right of a pair of
 * overlapping photos on odd rows and left of a single tall photo on even
 * ones, with every other row on white. Each row's button opens that child's
 * own page.
 */
export async function SectionLanding({
  titleKey,
  subtitle,
  rows,
  image = "/images/inner-hero.jpg",
}: {
  titleKey: string;
  subtitle?: string;
  rows: LandingRow[];
  image?: string;
}) {
  const [tNav, tc] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
  ]);

  return (
    <>
      <FigHero variant="card" title={tNav(titleKey)} subtitle={subtitle} image={image} />

      {rows.map((row, i) => {
        /* fig: odd rows put the copy on the right, even rows on the left. */
        const copyRight = i % 2 === 0;

        return (
          <section
            key={row.key}
            className={cn("py-14 md:py-20", i % 2 === 1 ? "bg-white" : "bg-canvas")}
          >
            <div className="container-rif">
              <div
                className={cn(
                  "grid items-center gap-10",
                  copyRight
                    ? "lg:grid-cols-[459fr_663fr] lg:gap-[190px]"
                    : "lg:grid-cols-[663fr_451fr] lg:gap-[155px]",
                )}
              >
                <div className={cn("order-2", copyRight ? "lg:order-2" : "lg:order-1")}>
                  <h2 className="text-[28px] font-bold leading-[1.25] text-brand-600 md:text-[40px]">
                    {row.title}
                  </h2>
                  <p className="mt-4 max-w-[663px] text-justify text-[15px] leading-[1.6] text-ink-500 md:text-[16px]">
                    {row.body}
                  </p>
                  <div className="mt-8">
                    {/* fig `Frame 8`: 151x58 green pill opening the child page */}
                    <ButtonLink href={row.href} size="lg">
                      {tc("learnMore")}
                    </ButtonLink>
                  </div>
                </div>

                <div className={cn("order-1", copyRight ? "lg:order-1" : "lg:order-2")}>
                  {row.images.length > 1 ? (
                    /* fig `Frame 193`: 338x412 with a 222x271 overlapping it */
                    <div className="relative mx-auto aspect-[459/452] w-full max-w-[459px]">
                      <div className="absolute left-0 top-[9.1%] h-[91.2%] w-[73.6%] overflow-hidden rounded-[9px]">
                        <Image
                          src={row.images[0]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 24vw, 60vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute left-[52.3%] top-[32.5%] h-[60%] w-[48.4%] overflow-hidden rounded-[9px]">
                        <Image
                          src={row.images[1]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 16vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    /* fig `Rectangle 5`: a single 451x550 photo, radius 12 */
                    <div className="relative mx-auto aspect-[451/550] w-full max-w-[451px] overflow-hidden rounded-[12px]">
                      <Image
                        src={row.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 32vw, 80vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
