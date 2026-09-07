import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Buttons follow `docs/Resona Indonesia Finance.fig`, which uses one shape
 * throughout: a full pill at radius 100. The primary call to action ("Learn
 * More") is 58px tall with 20px Bold white type on #F58220, and stretches to
 * the width of its column rather than hugging its label.
 */

type Variant = "primary" | "accent" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800",
  accent: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
  outline:
    "border border-ink-200 bg-white text-ink-700 hover:border-brand-600 hover:text-brand-600",
  ghost: "text-brand-600 hover:bg-brand-50",
  onDark:
    "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-brand-700",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-12 px-7 text-[15px]",
  lg: "h-[58px] px-9 text-[17px] md:text-[20px]", // fig: 58px tall, 20px Bold
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href"
  >) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...props}
      />
    );
  }

  return <Link href={href} className={cls} {...props} />;
}
