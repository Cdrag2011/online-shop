const OilDropsBackground = () => {
  const drops = [
    { cx: 200, size: 70, dur: 5 },
    { cx: 400, size: 90, dur: 6 },
    { cx: 650, size: 80, dur: 7 },
    { cx: 850, size: 110, dur: 8 },
    { cx: 300, size: 60, dur: 4.5 },
    { cx: 550, size: 95, dur: 7.5 },
    { cx: 780, size: 75, dur: 6.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="none"
      >
        <defs>
          {/* GOLD realistic oil gradient */}
          <linearGradient id="oilDrop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#D89200" />
          </linearGradient>

          {/* Glow / reflections */}
          <filter id="oilGlow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Splash shape */}
          <path
            id="splash"
            d="
              M0 0 
              C20 -10, 40 -10, 60 0 
              C40 10, 20 10, 0 0
              Z
            "
          />
        </defs>

        {/* ===================== */}
        {/*  BIG OIL DROPS LOOP  */}
        {/* ===================== */}

        {drops.map((drop, i) => (
          <g key={i} filter="url(#oilGlow)">
            <circle
              cx={drop.cx}
              cy="-200"
              r={drop.size}
              fill="url(#oilDrop)"
              opacity="0.9"
            >
              {/* falling animation */}
              <animate
                attributeName="cy"
                from="-200"
                to="2100"
                dur={`${drop.dur}s`}
                repeatCount="indefinite"
              />

              {/* slight size pulsation (real oil wobble) */}
              <animate
                attributeName="r"
                values={`
                  ${drop.size};
                  ${drop.size * 1.2};
                  ${drop.size * 0.9};
                  ${drop.size}
                `}
                dur={`${drop.dur}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* splash effect on impact */}
            <use
              href="#splash"
              x={drop.cx - 30}
              y="1850"
              fill="#FFB300"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0; 0.9; 0"
                dur="0.6s"
                begin={`${drop.dur / 1.2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="transform"
                values="scale(1); scale(2); scale(1)"
                dur="0.6s"
                begin={`${drop.dur / 1.2}s`}
                repeatCount="indefinite"
              />
            </use>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default OilDropsBackground;
