import { Printer } from "lucide-react";

const GREEN = "#006F4F";

/**
 * The 52x52 contact badge — a faint 0.3-alpha disc behind a segmented ring
 * outline (both `rgb(0,111,79)`), with a 16px glyph centred in white.
 *
 * Both the ring path and three of the four inner glyphs are copied verbatim
 * from the fig's own icon components in
 * docs/dari_claude_design/project/components/ — LinearCallPhoneRounded.jsx,
 * LinearCallCallChatRounded.jsx, and the globe paths inline beside
 * "Customer Report" in HomePage.jsx (~line 4090-4131) — including the
 * scale(0.667) transform the fig uses to fit each 24x24 icon into the 16px
 * slot, rather than stretched into a flat 16x16 viewBox.
 *
 * The fax/printer glyph is the one exception: the fig's own printer icon is
 * an ornate hairline-outline drawing meant to be read much larger, and its
 * fine strokes collapse into an illegible blur at 16px (confirmed by
 * rendering that path standalone at this size). lucide's Printer glyph is
 * used there instead, purely for legibility.
 *
 * Used by site-footer.tsx, the single footer rendered on every page
 * (including the homepage — see the root layout).
 */
const RING_PATH =
  "M 26 0 C 25.222 0 24.591 0.631 24.591 1.409 C 24.591 2.188 25.222 2.819 26 2.819 C 31.885 2.819 37.264 5.024 41.356 8.651 L 38.027 11.98 C 34.68 9.1 30.461 7.529 26 7.529 C 21.414 7.529 17.213 9.21 13.98 11.987 L 9.653 7.66 C 9.645 7.652 9.637 7.646 9.629 7.638 C 9.622 7.631 9.616 7.623 9.608 7.615 C 9.058 7.065 8.165 7.065 7.615 7.615 C 2.704 12.526 0 19.055 0 26 C 0 40.336 11.664 52 26 52 C 32.945 52 39.474 49.296 44.385 44.385 C 49.296 39.474 52 32.945 52 26 C 52 11.664 40.336 0 26 0 Z M 37.075 14.939 C 37.625 15.49 38.517 15.491 39.068 14.94 C 39.109 14.899 39.146 14.856 39.18 14.812 C 39.183 14.809 39.187 14.806 39.19 14.804 L 43.349 10.644 C 46.684 14.407 48.816 19.258 49.137 24.591 L 47.569 24.591 C 46.791 24.591 46.16 25.222 46.16 26 C 46.16 26.778 46.791 27.409 47.569 27.409 L 49.137 27.409 C 48.828 32.604 46.811 37.472 43.357 41.364 L 40.013 38.02 C 42.79 34.787 44.471 30.586 44.471 26 C 44.471 25.222 43.84 24.591 43.061 24.591 C 42.283 24.591 41.652 25.222 41.652 26 C 41.652 34.631 34.63 41.652 26 41.652 C 17.369 41.652 10.347 34.631 10.347 26 C 10.347 17.369 17.369 10.348 26 10.348 C 30.184 10.348 34.118 11.978 37.075 14.939 Z M 26 46.024 C 25.222 46.024 24.591 46.655 24.591 47.433 L 24.591 49.137 C 19.258 48.816 14.407 46.684 10.644 43.35 L 13.98 40.013 C 17.213 42.79 21.414 44.471 26 44.471 C 30.586 44.471 34.787 42.79 38.02 40.013 L 41.364 43.358 C 37.472 46.812 32.604 48.829 27.409 49.138 L 27.409 47.433 C 27.409 46.655 26.778 46.024 26 46.024 Z M 2.863 27.409 L 7.582 27.409 C 7.888 31.444 9.497 35.121 11.987 38.02 L 8.651 41.356 C 5.316 37.593 3.184 32.742 2.863 27.409 Z M 8.643 10.636 L 11.987 13.98 C 9.497 16.879 7.888 20.555 7.582 24.591 L 2.862 24.591 C 3.172 19.396 5.189 14.528 8.643 10.636 Z";

export type ContactIconKind = "phone" | "fax" | "globe" | "chat";

export function ContactBadge({ icon }: { icon: ContactIconKind }) {
  return (
    <span style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
      <svg
        width={34.123}
        height={34.123}
        viewBox="0 0 34.123 34.123"
        fill="none"
        aria-hidden
        style={{
          position: "absolute",
          left: 8.938,
          top: 8.938,
          width: 34.123,
          height: 34.123,
          color: "rgba(0,111,79,0.3)",
        }}
      >
        <path
          d="M 17.062 34.123 C 26.484 34.123 34.123 26.484 34.123 17.062 C 34.123 7.639 26.484 0 17.062 0 C 7.639 0 0 7.639 0 17.062 C 0 26.484 7.639 34.123 17.062 34.123 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      <svg
        width={52}
        height={52}
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden
        style={{ position: "absolute", left: 0, top: 0, width: 52, height: 52, color: GREEN }}
      >
        <path d={RING_PATH} fill="currentColor" fillRule="nonzero" />
      </svg>
      <span style={{ position: "absolute", left: 18, top: 18, width: 16, height: 16, display: "block" }}>
        <ContactGlyph kind={icon} />
      </span>
    </span>
  );
}

function ContactGlyph({ kind }: { kind: ContactIconKind }) {
  if (kind === "phone")
    return (
      <span style={{ display: "block", width: 16, height: 16, overflow: "hidden" }}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ transform: "scale(0.667, 0.667)", transformOrigin: "0 0" }}
        >
          <path
            d="M 6.687 2.479 L 6.038 1.316 M 6.115 5.828 C 7.037 4.905 7.272 3.529 6.687 2.479 M 7.025 8.975 C 4.996 6.947 6.115 5.828 6.115 5.828 M 7.025 8.975 C 9.053 11.004 10.172 9.885 10.172 9.885 C 11.095 8.963 12.471 8.728 13.521 9.313 L 14.684 9.962 C 16.269 10.847 16.456 13.069 15.063 14.462 C 14.226 15.299 13.2 15.95 12.067 15.993 C 10.159 16.066 6.918 15.583 3.668 12.332 C 0.417 9.082 -0.066 5.841 0.007 3.933 C 0.05 2.8 0.701 1.774 1.538 0.937 C 2.931 -0.456 5.153 -0.269 6.038 1.316 Z"
            stroke="#FFFFFF"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(4,4)"
          />
        </svg>
      </span>
    );
  if (kind === "fax")
    return (
      <span style={{ display: "flex", width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>
        <Printer size={16} color="#FFFFFF" strokeWidth={1.75} aria-hidden />
      </span>
    );
  if (kind === "globe")
    return (
      <span style={{ position: "relative", display: "block", width: 16, height: 16 }}>
        <span style={{ position: "absolute", left: 1.333, top: 1.333, width: 13.333, height: 13.333 }}>
          <svg
            width={13.333}
            height={13.333}
            viewBox="0 0 13.333 13.333"
            fill="none"
            aria-hidden
            style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
          >
            <path
              d="M 13.333 6.667 L 12.583 6.667 C 12.583 9.934 9.934 12.583 6.667 12.583 L 6.667 13.333 L 6.667 14.083 C 10.763 14.083 14.083 10.763 14.083 6.667 L 13.333 6.667 Z M 6.667 13.333 L 6.667 12.583 C 3.399 12.583 0.75 9.934 0.75 6.667 L 0 6.667 L -0.75 6.667 C -0.75 10.763 2.571 14.083 6.667 14.083 L 6.667 13.333 Z M 0 6.667 L 0.75 6.667 C 0.75 3.399 3.399 0.75 6.667 0.75 L 6.667 0 L 6.667 -0.75 C 2.571 -0.75 -0.75 2.571 -0.75 6.667 L 0 6.667 Z M 6.667 0 L 6.667 0.75 C 9.934 0.75 12.583 3.399 12.583 6.667 L 13.333 6.667 L 14.083 6.667 C 14.083 2.571 10.763 -0.75 6.667 -0.75 L 6.667 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
          <svg
            width={13.333}
            height={5.333}
            viewBox="0 0 13.333 5.333"
            fill="none"
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "visible",
              transform: "matrix(0,1,-1,0,9.333,0)",
              transformOrigin: "0 0",
            }}
          >
            <path
              d="M 13.333 2.667 L 12.583 2.667 C 12.583 2.762 12.538 2.929 12.294 3.16 C 12.049 3.392 11.653 3.636 11.102 3.856 C 10.004 4.295 8.437 4.583 6.667 4.583 L 6.667 5.333 L 6.667 6.083 C 8.579 6.083 10.344 5.775 11.659 5.249 C 12.315 4.986 12.896 4.655 13.325 4.25 C 13.756 3.842 14.083 3.308 14.083 2.667 L 13.333 2.667 Z M 6.667 5.333 L 6.667 4.583 C 4.897 4.583 3.329 4.295 2.231 3.856 C 1.68 3.636 1.285 3.392 1.039 3.16 C 0.795 2.929 0.75 2.762 0.75 2.667 L 0 2.667 L -0.75 2.667 C -0.75 3.308 -0.422 3.842 0.009 4.25 C 0.438 4.655 1.019 4.986 1.674 5.249 C 2.989 5.775 4.755 6.083 6.667 6.083 L 6.667 5.333 Z M 0 2.667 L 0.75 2.667 C 0.75 2.571 0.795 2.404 1.039 2.174 C 1.285 1.941 1.68 1.698 2.231 1.477 C 3.329 1.038 4.897 0.75 6.667 0.75 L 6.667 0 L 6.667 -0.75 C 4.755 -0.75 2.989 -0.441 1.674 0.085 C 1.019 0.347 0.438 0.678 0.009 1.084 C -0.422 1.491 -0.75 2.026 -0.75 2.667 L 0 2.667 Z M 6.667 0 L 6.667 0.75 C 8.437 0.75 10.004 1.038 11.102 1.477 C 11.653 1.698 12.049 1.941 12.294 2.174 C 12.538 2.404 12.583 2.571 12.583 2.667 L 13.333 2.667 L 14.083 2.667 C 14.083 2.026 13.756 1.491 13.325 1.084 C 12.896 0.678 12.315 0.347 11.659 0.085 C 10.344 -0.441 8.579 -0.75 6.667 -0.75 L 6.667 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
          <svg
            width={13.333}
            height={1.5}
            viewBox="0 -0.750 13.333 1.500"
            fill="none"
            aria-hidden
            style={{ position: "absolute", left: 0, top: 6.667, overflow: "visible" }}
          >
            <path
              d="M 0 -0.75 C -0.414 -0.75 -0.75 -0.414 -0.75 0 C -0.75 0.414 -0.414 0.75 0 0.75 L 0 0 L 0 -0.75 Z M 13.333 0.75 C 13.748 0.75 14.083 0.414 14.083 0 C 14.083 -0.414 13.748 -0.75 13.333 -0.75 L 13.333 0 L 13.333 0.75 Z M 0 0 L 0 0.75 L 13.333 0.75 L 13.333 0 L 13.333 -0.75 L 0 -0.75 L 0 0 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            />
          </svg>
        </span>
      </span>
    );
  /*
   * "Linear / Call / Call Chat Rounded" — a 24x24 icon scaled 0.667 to fit
   * the 16px slot, same as the bundle wraps it.
   */
  return (
    <span style={{ display: "block", width: 16, height: 16, overflow: "hidden" }}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ transform: "scale(0.667, 0.667)", transformOrigin: "0 0" }}
      >
        <path
          d="M 0 5 C 0 7.761 2.239 10 5 10 M 5 0 C 2.239 0 0 2.239 0 5 M 10 5 C 10 2.239 7.761 0 5 0 M 9.478 7.226 C 9.812 6.556 10 5.8 10 5 M 9.411 7.8 C 9.36 7.608 9.39 7.404 9.478 7.226 M 9.709 8.913 L 9.411 7.8 M 9.709 8.913 C 9.839 9.396 9.396 9.839 8.913 9.709 L 7.8 9.411 C 7.608 9.36 7.404 9.39 7.226 9.478 C 6.556 9.812 5.8 10 5 10 Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transform="matrix(-1,0,0,1,22,2)"
        />
        <path
          d="M 6.687 2.479 L 6.038 1.316 M 6.115 5.828 C 7.037 4.905 7.272 3.529 6.687 2.479 M 7.025 8.975 C 4.996 6.947 6.115 5.828 6.115 5.828 M 7.025 8.975 C 9.053 11.004 10.172 9.885 10.172 9.885 C 11.095 8.963 12.471 8.728 13.521 9.313 L 14.684 9.962 C 16.269 10.847 16.456 13.069 15.063 14.462 C 14.226 15.299 13.2 15.95 12.067 15.993 C 10.159 16.066 6.918 15.583 3.668 12.332 C 0.417 9.082 -0.066 5.841 0.007 3.933 C 0.05 2.8 0.701 1.774 1.538 0.937 C 2.931 -0.456 5.153 -0.269 6.038 1.316 Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transform="translate(2,6)"
        />
      </svg>
    </span>
  );
}
