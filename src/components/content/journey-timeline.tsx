import Image from "next/image";
import { getLocale } from "next-intl/server";

import { milestones } from "@/lib/content/milestones";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Company history — the `history` frame in the fig.
 *
 * A single rail runs down the centre of the 1440 frame at x=717 (2px wide)
 * with six entries hung off it, alternating side on a ~446px rhythm:
 *
 *   odd  entries — photo left (x=125), copy right (x=781)
 *   even entries — copy left (x=80), photo right (x=781)
 *
 * Each entry carries a 46×46 node on the rail, a 32px Lato Bold date, a
 * 20px #6E6E6E body and a 530×350 photo at radius 32. `Group 180…185` is
 * the short dash linking the node to its date.
 *
 * Rendered server-side: the fig's timeline is static, so unlike the old
 * year-picker version there is nothing here that needs client JS.
 */
export async function JourneyTimeline({ image }: { image: string }) {
  const locale = await getLocale();

  /* The fig repeats one photo down the rail; callers may pass their own. */
  const photos = [image, "/fig/history-1.jpg"];

  return (
    <div className="relative">
      {/*
       * fig `Container`: a 2px rail down the centre. Hidden below lg,
       * where the entries stack into one column and a centre rail would
       * have nothing to sit between.
       */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-brand-600/20 lg:block"
      />

      <ol className="space-y-12 lg:space-y-0">
        {milestones.map((m, i) => {
          /* fig: the first entry puts its photo on the left. */
          const photoLeft = i % 2 === 0;
          const date = `${m.month[locale as "id" | "en"] ?? m.month.id} ${m.year}`;

          return (
            <li
              key={`${m.year}-${m.month.id}`}
              className="relative lg:grid lg:grid-cols-2 lg:gap-x-[126px] lg:pb-[96px]"
            >
              {/* fig `Frame 109`: the 46px node centred on the rail */}
              <span
                aria-hidden
                className="absolute left-1/2 top-2 hidden h-[46px] w-[46px] -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-brand-600 shadow-[0_0_0_4px_rgba(0,111,79,0.12)] lg:grid"
              >
                <span className="h-3 w-3 rounded-full bg-white" />
              </span>

              {/* Photo — fig `Mask group`, 530×350 at radius 32 */}
              <Reveal
                className={cn(
                  photoLeft ? "lg:col-start-1" : "lg:col-start-2 lg:row-start-1",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[530/350] w-full overflow-hidden rounded-[32px]",
                    "lg:max-w-[530px]",
                    photoLeft ? "lg:ml-auto" : "lg:mr-auto",
                  )}
                >
                  <Image
                    src={photos[i % photos.length]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 530px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              {/* Copy — fig: 32px date over a 20px body */}
              <Reveal
                delay={110}
                className={cn(
                  "mt-6 lg:mt-0 lg:self-center",
                  photoLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1",
                )}
              >
                <div
                  className={cn(
                    "lg:max-w-[580px]",
                    photoLeft ? "lg:mr-auto" : "lg:ml-auto",
                  )}
                >
                  <p className="text-[24px] font-bold leading-[1.2] text-ink-900 md:text-[32px]">
                    {date}
                  </p>

                  {/* fig `Group 180`: a short dash under the date */}
                  <span
                    aria-hidden
                    className="mt-3 block h-1 w-[91px] rounded-full bg-accent-500"
                  />

                  <p className="mt-5 text-[16px] leading-[1.5] text-ink-500 md:text-[20px]">
                    {m.body[locale as "id" | "en"] ?? m.body.id}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
