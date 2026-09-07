import type { SVGProps } from "react";

/**
 * Language switcher glyph, traced from the fig's own
 * "vuesax/linear/translate" symbol rather than substituted with a
 * look-alike from an icon set. The paths below are its decoded vector
 * network, so the artwork matches the design exactly.
 */
export function TranslateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M19.06 18.67L16.92 14.40L14.78 18.67" />
      <path d="M15.17 17.91L18.69 17.91" />
      <path d="M16.92 22.00C14.12 22.00 11.84 19.73 11.84 16.92C11.84 14.12 14.11 11.84 16.92 11.84C19.72 11.84 22.00 14.11 22.00 16.92C22.00 19.73 19.73 22.00 16.92 22.00Z" />
      <path d="M5.02 2.00L8.94 2.00C11.01 2.00 12.01 3.00 11.96 5.02L11.96 8.94C12.01 11.01 11.01 12.01 8.94 11.96L5.02 11.96C3.00 12.00 2.00 11.00 2.00 8.93L2.00 5.01C2.00 3.00 3.00 2.00 5.02 2.00Z" />
      <path d="M9.01 5.85L4.95 5.85" />
      <path d="M6.97 5.17L6.97 5.85" />
      <path d="M7.99 5.84C7.99 7.59 6.62 9.01 4.94 9.01" />
      <path d="M9.01 9.01C8.28 9.01 7.62 8.62 7.16 8.00" />
      <path d="M2.00 15.00C2.00 18.87 5.13 22.00 9.00 22.00L7.95 20.25" />
      <path d="M22.00 9.00C22.00 5.13 18.87 2.00 15.00 2.00L16.05 3.75" />
    </svg>
  );
}
