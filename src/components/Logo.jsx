/* Refined vector version of the Mindshift mark:
   half lightbulb / half brain in continuous-line style, with coil base.
   Drawn with currentColor so it inherits text color anywhere it's used. */
export default function LogoMark({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size * 1.24}
      viewBox="0 0 100 124"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* left half — smooth bulb */}
      <path d="M50 10 C31 10 17 24 17 42 c0 11 5 18 10 24 c4 5 7 10 8 17 h15" />
      {/* filament hint */}
      <path d="M36 64 c-4 -6 1 -11 7 -8" opacity="0.75" strokeWidth="3" />
      {/* right half — brain bumps */}
      <path d="M50 10 c7 -4 15 -1 18 4 c8 -2 15 3 15 10 c7 3 8 11 4 16 c5 5 3 13 -3 16 c2 7 -3 13 -10 13 c-1 7 -8 11 -14 8 c-3 4 -7 5 -10 4" />
      {/* inner brain folds */}
      <path
        d="M58 22 c6 0 9 5 7 10 m6 3 c5 3 4 10 -1 12 m-4 7 c2 5 -2 10 -7 9 m-3 -34 c-3 4 -1 8 3 10"
        opacity="0.75"
        strokeWidth="3"
      />
      {/* center divide */}
      <path d="M50 10 v73" />
      {/* coil base */}
      <path d="M36 92 c9 -3 20 3 28 -2 m-28 11 c9 -3 20 3 28 -2 m-25 11 c7 -2 15 2 22 -2 m-18 10 c5 -1 9 1 13 -1" />
    </svg>
  )
}
