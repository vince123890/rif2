/**
 * The faint "R" swoosh watermark — one path, reused across the site with a
 * different clip box, rotation/flip transform chain and colour each time
 * (the homepage draws it twice already, inline, with its own numbers per
 * spot; see src/components/fig/home-desktop.tsx). Factored out here so a
 * normal flow-layout page (not the homepage's absolute canvas) can drop it
 * in without re-copying the path.
 *
 * Callers supply the exact transform chain decoded for their spot — this
 * component does not compute or guess one.
 */
export function RWatermark({
  className,
  clip,
  rotate,
  flip,
  color,
}: {
  className?: string;
  /** outer clip box: { left, top, width, height } */
  clip: { left: number; top: number; width: number; height: number };
  /** the rotate/skew matrix (fig's `matrix(a,b,c,d,e,f)`) and its box size */
  rotate: { matrix: string; width: number; height: number };
  /** the vertical-flip matrix and its box size (the path's own coordinate space) */
  flip: { matrix: string; width: number; height: number };
  /** e.g. "rgba(241,245,245,0.03)" */
  color: string;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        left: clip.left,
        top: clip.top,
        width: clip.width,
        height: clip.height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: rotate.matrix,
          transformOrigin: "0 0",
          width: rotate.width,
          height: rotate.height,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: flip.matrix,
            transformOrigin: "0 0",
            width: flip.width,
            height: flip.height,
            overflow: "hidden",
          }}
        >
          <svg
            width={flip.width}
            height={flip.height}
            viewBox={`0 0 ${flip.width} ${flip.height}`}
            fill="none"
            style={{
              overflow: "visible",
              position: "absolute",
              left: 0,
              top: 0,
              width: flip.width,
              height: flip.height,
              color,
            }}
          >
            <path
              d="M 240.627 543.793 C 223.796 541.053 223.796 541.053 236.712 540.271 C 287.204 537.922 332.607 515.612 353.351 483.908 C 362.745 469.035 363.919 463.947 363.919 434.2 C 363.528 405.236 362.353 398.974 353.351 385.274 C 347.871 376.664 339.26 365.704 334.172 361.399 C 321.647 350.048 293.075 336.74 275.07 333.609 C 266.851 332.435 260.197 329.304 260.197 326.955 C 260.197 324.607 268.025 308.559 277.81 291.337 C 287.204 274.116 300.12 250.24 305.991 238.498 C 322.43 206.794 347.871 182.527 375.661 171.959 C 395.231 164.914 405.016 163.739 433.589 164.914 C 454.725 166.088 467.25 164.914 466.467 162.565 C 465.684 160.608 455.116 153.563 442.591 146.909 C 424.978 137.907 413.236 134.775 392.492 133.601 C 368.616 132.036 362.745 133.21 340.435 144.169 C 286.029 171.176 251.586 215.013 207.749 314.43 C 202.269 326.955 197.572 337.914 197.572 338.306 C 197.572 339.089 207.749 340.654 220.273 342.22 C 246.889 345.351 277.027 360.616 289.944 377.446 C 303.643 395.451 309.122 426.763 303.643 452.205 C 290.335 511.698 197.963 530.877 118.117 490.562 C 89.544 475.689 49.621 434.2 32.008 400.539 C 6.567 351.222 -4.784 293.686 1.87 245.152 C 10.481 182.135 35.922 127.73 75.845 86.633 C 162.737 -3.782 283.681 -24.918 397.188 30.27 C 428.109 45.144 439.851 53.755 468.033 81.544 C 495.822 109.726 504.433 121.468 519.307 152.389 C 538.877 193.095 543.965 210.708 547.879 252.197 C 551.402 287.032 542.791 340.263 527.917 378.621 C 515.393 410.716 478.209 460.424 450.811 481.951 L 434.372 494.868 L 448.462 477.255 C 516.175 392.32 536.528 261.982 490.734 204.054 C 465.684 171.568 420.673 178.221 383.098 220.102 C 363.528 242.02 318.125 328.912 325.561 331.261 C 327.518 332.043 343.566 341.829 360.396 353.179 C 409.713 385.666 426.935 416.195 416.759 453.379 C 411.279 474.515 371.356 515.221 344.349 527.746 C 327.518 535.574 273.505 548.099 262.154 546.925 C 260.197 546.925 250.412 545.359 240.627 543.793 Z M 210.488 482.343 C 217.534 478.037 226.927 468.644 232.016 461.207 C 239.844 449.856 241.018 443.985 239.844 423.632 C 236.712 375.881 203.443 347.7 145.907 344.96 C 129.076 344.177 115.377 341.829 115.377 340.263 C 115.377 333.218 161.171 250.24 184.264 215.013 C 237.104 133.993 287.595 101.898 363.528 101.115 L 391.317 100.723 L 369.79 90.938 C 335.738 75.673 304.425 69.02 263.328 69.411 C 155.3 69.411 65.669 137.907 39.053 240.455 C 30.051 276.464 30.834 371.184 40.619 398.191 C 55.101 437.723 96.981 476.08 138.079 487.822 C 161.171 494.085 194.049 491.737 210.488 482.343 Z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
