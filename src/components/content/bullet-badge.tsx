/**
 * The medal-with-ribbon-tail bullet used in front of every product
 * highlight ("Alat Berat", "Mesin Industri", etc.) — confirmed verbatim
 * from the resolved fig export at
 * docs/dari_claude_design/project/components/HomePage.jsx (the two <svg>
 * nodes immediately preceding the "Alat Berat" label): an 11x11 ring is
 * the medal face, a 9.164x8.35 path is its ribbon tail. Rendering them
 * standalone confirmed the shape before this was wired in — not the
 * hexagon an unrelated, since-corrected list marker guessed instead.
 *
 * Shared by the homepage product carousel
 * (src/components/fig/product-carousel.tsx) and the standalone product
 * tabs panel (this directory) so both use the same verified icon rather
 * than two different guesses.
 */
export function BulletBadge({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <div style={{ position: "relative", width: 22, height: 22, overflow: "hidden" }}>
      <svg
        width={9.164}
        height={8.35}
        viewBox="0 0 9.164 8.350"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 6.419,
          top: 11.816,
          width: 9.164,
          height: 8.35,
          color,
        }}
      >
        <path
          d="M 8.63 -0.153 C 8.546 -0.629 8.091 -0.946 7.615 -0.862 C 7.14 -0.777 6.823 -0.323 6.907 0.153 L 7.769 0 L 8.63 -0.153 Z M 9.157 7.816 L 10.02 7.67 L 10.019 7.662 L 9.157 7.816 Z M 8.415 8.246 L 8.97 7.57 C 8.96 7.562 8.95 7.554 8.94 7.547 L 8.415 8.246 Z M 5.133 5.783 L 5.658 5.083 L 5.657 5.082 L 5.133 5.783 Z M 4.036 5.783 L 3.512 5.082 L 3.511 5.083 L 4.036 5.783 Z M 0.749 8.245 L 0.224 7.545 C 0.214 7.553 0.204 7.56 0.194 7.568 L 0.749 8.245 Z M 0.006 7.816 L -0.855 7.663 L -0.857 7.672 L 0.006 7.816 Z M 2.256 0.153 C 2.34 -0.323 2.023 -0.777 1.547 -0.862 C 1.071 -0.946 0.617 -0.629 0.533 -0.153 L 1.394 0 L 2.256 0.153 Z M 7.769 0 L 6.907 0.153 L 8.296 7.969 L 9.157 7.816 L 10.019 7.662 L 8.63 -0.153 L 7.769 0 Z M 9.157 7.816 L 8.295 7.961 C 8.28 7.878 8.292 7.792 8.328 7.715 L 9.12 8.087 L 9.912 8.458 C 10.028 8.213 10.065 7.937 10.02 7.67 L 9.157 7.816 Z M 9.12 8.087 L 8.328 7.715 C 8.364 7.638 8.423 7.574 8.496 7.531 L 8.935 8.288 L 9.375 9.045 C 9.609 8.909 9.797 8.704 9.912 8.458 L 9.12 8.087 Z M 8.935 8.288 L 8.496 7.531 C 8.57 7.489 8.654 7.47 8.739 7.477 L 8.669 8.349 L 8.598 9.221 C 8.869 9.243 9.14 9.181 9.375 9.045 L 8.935 8.288 Z M 8.669 8.349 L 8.739 7.477 C 8.823 7.483 8.904 7.516 8.97 7.57 L 8.415 8.246 L 7.86 8.923 C 8.07 9.095 8.328 9.199 8.598 9.221 L 8.669 8.349 Z M 8.415 8.246 L 8.94 7.547 L 5.658 5.083 L 5.133 5.783 L 4.608 6.483 L 7.89 8.946 L 8.415 8.246 Z M 5.133 5.783 L 5.657 5.082 C 5.347 4.851 4.971 4.726 4.585 4.726 L 4.585 5.601 L 4.585 6.476 C 4.594 6.476 4.602 6.479 4.609 6.484 L 5.133 5.783 Z M 4.585 5.601 L 4.585 4.726 C 4.198 4.726 3.822 4.851 3.512 5.082 L 4.036 5.783 L 4.56 6.484 C 4.567 6.479 4.576 6.476 4.585 6.476 L 4.585 5.601 Z M 4.036 5.783 L 3.511 5.083 L 0.224 7.545 L 0.749 8.245 L 1.273 8.946 L 4.56 6.484 L 4.036 5.783 Z M 0.749 8.245 L 0.194 7.568 C 0.26 7.515 0.34 7.482 0.425 7.476 L 0.495 8.348 L 0.566 9.22 C 0.836 9.198 1.093 9.094 1.303 8.922 L 0.749 8.245 Z M 0.495 8.348 L 0.425 7.476 C 0.509 7.469 0.594 7.488 0.667 7.53 L 0.229 8.287 L -0.21 9.045 C 0.025 9.181 0.295 9.242 0.566 9.22 L 0.495 8.348 Z M 0.229 8.287 L 0.667 7.53 C 0.74 7.573 0.799 7.637 0.835 7.713 L 0.044 8.086 L -0.748 8.459 C -0.632 8.705 -0.444 8.909 -0.21 9.045 L 0.229 8.287 Z M 0.044 8.086 L 0.835 7.713 C 0.871 7.79 0.883 7.876 0.869 7.959 L 0.006 7.816 L -0.857 7.672 C -0.901 7.939 -0.863 8.214 -0.748 8.459 L 0.044 8.086 Z M 0.006 7.816 L 0.868 7.968 L 2.256 0.153 L 1.394 0 L 0.533 -0.153 L -0.855 7.663 L 0.006 7.816 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      <svg
        width={11}
        height={11}
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden
        style={{
          overflow: "visible",
          position: "absolute",
          left: 5.5,
          top: 1.833,
          width: 11,
          height: 11,
          color,
        }}
      >
        <path
          d="M 11 5.5 L 10.125 5.5 C 10.125 8.054 8.054 10.125 5.5 10.125 L 5.5 11 L 5.5 11.875 C 9.021 11.875 11.875 9.021 11.875 5.5 L 11 5.5 Z M 5.5 11 L 5.5 10.125 C 2.946 10.125 0.875 8.054 0.875 5.5 L 0 5.5 L -0.875 5.5 C -0.875 9.021 1.979 11.875 5.5 11.875 L 5.5 11 Z M 0 5.5 L 0.875 5.5 C 0.875 2.946 2.946 0.875 5.5 0.875 L 5.5 0 L 5.5 -0.875 C 1.979 -0.875 -0.875 1.979 -0.875 5.5 L 0 5.5 Z M 5.5 0 L 5.5 0.875 C 8.054 0.875 10.125 2.946 10.125 5.5 L 11 5.5 L 11.875 5.5 C 11.875 1.979 9.021 -0.875 5.5 -0.875 L 5.5 0 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
    </div>
  );
}
