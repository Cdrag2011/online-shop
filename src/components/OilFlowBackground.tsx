const OilFlowBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient galben semi-translucid */}
          <linearGradient id="oilVertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,215,0,0.7)" />
            <stop offset="50%" stopColor="rgba(255,179,0,0.65)" />
            <stop offset="100%" stopColor="rgba(218,145,0,0.6)" />
          </linearGradient>

          {/* Reflexii pentru realism */}
          <linearGradient id="oilHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>

          {/* Efect fluid */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 21 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>

          {/* Jet 1 */}
          <path
            id="oilStream1"
            d="
              M300,0
              C350,250 550,300 480,850
              C420,1300 600,1600 380,1920
              L0,1920 L0,0 Z
            "
          />

          {/* Jet 2 (paralel) */}
          <path
            id="oilStream2"
            d="
              M650,0
              C700,300 900,400 750,900
              C600,1400 900,1600 650,1920
              L1080,1920 L1080,0 Z
            "
          />
        </defs>

        {/* STRAT 1 — Jet principal (stânga) */}
        <g filter="url(#goo)">
          <use href="#oilStream1" fill="url(#oilVertical)">
            <animate
              attributeName="d"
              dur="12s"     // 🔸 MAI LENT
              repeatCount="indefinite"
              values="
                M300,0 C350,250 550,300 480,850 C420,1300 600,1600 380,1920 L0,1920 L0,0 Z;
                M320,0 C380,300 570,350 500,900 C440,1300 620,1500 410,1920 L0,1920 L0,0 Z;
                M300,0 C350,250 550,300 480,850 C420,1300 600,1600 380,1920 L0,1920 L0,0 Z;
              "
            />
          </use>
        </g>

        {/* STRAT 2 — Jet secundar (dreapta) */}
        <g filter="url(#goo)" opacity="0.85"> {/* semi-transparent */}
          <use href="#oilStream2" fill="url(#oilVertical)">
            <animate
              attributeName="d"
              dur="14s"    // 🔸 chiar mai lent, desincronizat
              repeatCount="indefinite"
              values="
                M650,0 C700,300 900,400 750,900 C600,1400 900,1600 650,1920 L1080,1920 L1080,0 Z;
                M670,0 C730,350 950,450 780,850 C620,1350 920,1550 680,1920 L1080,1920 L1080,0 Z;
                M650,0 C700,300 900,400 750,900 C600,1400 900,1600 650,1920 L1080,1920 L1080,0 Z;
              "
            />
          </use>
        </g>

        {/* STRAT 3 — Reflexii pentru ambele jeturi */}
        <g opacity="0.3">
          <use href="#oilStream1" fill="url(#oilHighlight)" />
          <use href="#oilStream2" fill="url(#oilHighlight)" />
        </g>
      </svg>
    </div>
  );
};

export default OilFlowBackground;
