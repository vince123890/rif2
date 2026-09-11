import Image from "next/image";
import { ArrowRight, User } from "lucide-react";

import type { Person } from "@/lib/content";
import { pick } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

/**
 * Board grid — `manajemen - 1` in the fig.
 *
 * Each member is a 400×484 portrait with a 400×150 white caption panel
 * overlapping its foot (`Subtract`, radius 32). The panel carries the name
 * at 32px Lato Bold and the role at 20px #6E6E6E, and a 64px circular
 * button sits in the notch punched out of its top-right corner.
 *
 * The fig lays the cards out as a plain row — two commissioners, then the
 * directors — not the fan-out carousel the previous design used.
 */
export function ManagementGrid({
  people,
  locale,
  detailLabel,
}: {
  people: Person[];
  locale: string;
  detailLabel: string;
}) {
  if (!people.length) return null;

  return (
    <ul className="grid justify-center gap-x-6 gap-y-[70px] sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person, i) => (
        <Reveal as="li" key={person.id} delay={i * 90} className="mx-auto w-full max-w-[400px]">
          <article className="group relative">
            {/* fig: the 400×484 portrait at radius 32 */}
            <div className="relative aspect-[400/484] w-full overflow-hidden rounded-[32px] bg-brand-50">
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              ) : (
                <span className="grid h-full w-full place-items-center text-brand-300">
                  <User className="h-20 w-20" aria-hidden />
                </span>
              )}
            </div>

            {/*
             * fig `Subtract`: a 400×150 white panel pulled up over the
             * portrait's foot, with a circular bite out of its top-right
             * corner for the button.
             */}
            <div className="relative -mt-[92px] mx-auto w-[calc(100%-32px)] rounded-[32px] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]">
              <h3 className="pr-16 text-[24px] font-bold leading-[1.2] text-ink-900 md:text-[32px]">
                {person.name}
              </h3>

              <p className="mt-2 pr-16 text-[15px] uppercase leading-[1.5] tracking-[0.02em] text-ink-500 md:text-[20px]">
                {pick(person.position, locale)}
              </p>

              {/* fig `Button`: a 64px #006F4F circle seated in the notch */}
              <span
                aria-hidden
                className="absolute -top-5 right-5 grid h-16 w-16 place-items-center rounded-full bg-brand-600 text-white shadow-lg ring-8 ring-[#F9FAFB] transition-transform duration-300 group-hover:scale-110"
                title={detailLabel}
              >
                <ArrowRight className="h-6 w-6" />
              </span>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
