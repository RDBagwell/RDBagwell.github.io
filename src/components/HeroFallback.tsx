/** Static stand-in for the 3D accent: a flat-shaded low-poly gem in SVG. */
export default function HeroFallback() {
  return (
    <svg
      data-testid="hero-fallback"
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#818cf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#hero-glow)" />
      <g strokeLinejoin="round" strokeWidth="1.5" className="stroke-white/60 dark:stroke-slate-950/60">
        <polygon points="200,60 310,140 200,180" fill="#6366f1" />
        <polygon points="200,60 90,140 200,180" fill="#818cf8" />
        <polygon points="90,140 200,180 130,290" fill="#4f46e5" />
        <polygon points="310,140 200,180 270,290" fill="#4338ca" />
        <polygon points="200,180 130,290 270,290" fill="#a5b4fc" />
        <polygon points="130,290 270,290 200,340" fill="#3730a3" />
      </g>
      <g className="fill-violet-400">
        <polygon points="330,70 342,88 330,106 318,88" />
        <polygon points="62,270 72,284 62,298 52,284" />
        <polygon points="320,300 328,311 320,322 312,311" />
      </g>
    </svg>
  );
}
