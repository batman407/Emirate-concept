import React from 'react';

export default function WorldMapBg() {
  return (
    <g className="world-map-vector-bg">
      <defs>
        {/* Land gradient for night mode */}
        <linearGradient id="landGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141c2b" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#0f1624" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#181324" stopOpacity="0.85" />
        </linearGradient>

        {/* Land gradient for day mode */}
        <linearGradient id="landGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
        </linearGradient>

        {/* Coastline glow filter */}
        <filter id="coastGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dot pattern overlay for flight radar feel */}
        <pattern id="radarGridDots" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.25" fill="rgba(201, 169, 110, 0.15)" />
        </pattern>
      </defs>

      {/* Lat / Long Graticules */}
      <g className="graticule-lines" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.15" strokeDasharray="0.5,0.5">
        {/* Equator & Tropics */}
        <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="rgba(201, 169, 110, 0.15)" strokeWidth="0.2" />
        <line x1="0" y1="20" x2="100" y2="20" />
        <line x1="0" y1="55" x2="100" y2="55" />
        
        {/* Meridians */}
        <line x1="20" y1="0" x2="20" y2="75" />
        <line x1="40" y1="0" x2="40" y2="75" />
        <line x1="60" y1="0" x2="60" y2="75" stroke="rgba(201, 169, 110, 0.12)" strokeWidth="0.2" />
        <line x1="80" y1="0" x2="80" y2="75" />
      </g>

      {/* Continents Vector Paths (Mapped to 0-100 x, 0-75 y equirectangular projection) */}
      <g className="continents-layer" filter="url(#coastGlow)">
        {/* Greenland */}
        <path
          d="M 24,5 C 28,4 35,5 34,11 C 30,13 25,10 24,5 Z"
          className="continent-shape"
        />

        {/* North America */}
        <path
          d="M 4,10 
             C 10,6 22,7 32,10 
             C 34,13 32,18 29,22 
             C 25,24 22,26 21,30 
             C 20,33 24,37 24,40 
             C 22,44 19,43 16,40 
             C 14,37 11,35 7,33 
             C 4,28 3,18 4,10 Z"
          className="continent-shape"
        />

        {/* Central America */}
        <path
          d="M 21,39 C 23,41 26,44 25,47 C 23,48 21,44 21,39 Z"
          className="continent-shape"
        />

        {/* South America */}
        <path
          d="M 24,47 
             C 30,46 36,49 38,55 
             C 37,63 33,69 28,72 
             C 25,71 24,65 24,58 
             C 23,53 23,49 24,47 Z"
          className="continent-shape"
        />

        {/* Europe */}
        <path
          d="M 40,14 
             C 45,12 54,13 58,17 
             C 56,22 51,25 49,27 
             C 46,28 43,27 41,24 
             C 40,20 39,16 40,14 Z"
          className="continent-shape"
        />

        {/* UK & Ireland */}
        <path
          d="M 42,18 C 44,17 45,20 44,23 C 42,23 41,20 42,18 Z"
          className="continent-shape"
        />

        {/* Africa */}
        <path
          d="M 39,32 
             C 47,31 58,34 59,40 
             C 57,47 54,54 50,62 
             C 46,64 42,60 41,52 
             C 38,46 37,38 39,32 Z"
          className="continent-shape"
        />

        {/* Madagascar */}
        <path
          d="M 59,54 C 60,53 61,58 60,61 C 59,61 58,56 59,54 Z"
          className="continent-shape"
        />

        {/* Arabian Peninsula (Hub region) */}
        <path
          d="M 55,34 C 60,33 63,36 61,43 C 57,44 55,42 55,34 Z"
          className="continent-shape continent-shape--hub-land"
        />

        {/* Asia (Eurasia) */}
        <path
          d="M 58,12 
             C 68,9 84,10 93,14 
             C 95,20 90,28 85,32 
             C 80,34 76,38 73,42 
             C 68,44 65,38 64,32 
             C 61,28 58,22 58,12 Z"
          className="continent-shape"
        />

        {/* India */}
        <path
          d="M 62,35 C 66,35 68,42 66,48 C 64,46 62,40 62,35 Z"
          className="continent-shape"
        />

        {/* Japan */}
        <path
          d="M 79,27 C 82,26 83,29 81,33 C 79,32 78,28 79,27 Z"
          className="continent-shape"
        />

        {/* Southeast Asia Islands */}
        <path
          d="M 72,43 C 78,44 83,48 80,51 C 75,52 70,48 72,43 Z"
          className="continent-shape"
        />

        {/* Australia */}
        <path
          d="M 76,53 
             C 83,52 91,54 92,62 
             C 89,70 82,71 77,67 
             C 75,62 75,56 76,53 Z"
          className="continent-shape"
        />

        {/* New Zealand */}
        <path
          d="M 94,66 C 96,66 96,70 95,72 C 93,72 93,68 94,66 Z"
          className="continent-shape"
        />
      </g>

      {/* Radar Matrix Dots Fill over continents */}
      <rect x="0" y="0" width="100" height="75" fill="url(#radarGridDots)" pointerEvents="none" opacity="0.6" />
    </g>
  );
}
