import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useTheme } from '../../context/ThemeContext';
import './AnimatedRoutes.css';

// Register GSAP plugin
gsap.registerPlugin(MotionPathPlugin);

/* ----------------------------------------------------------------
   THEME CONFIGURATION
   ---------------------------------------------------------------- */
const THEME = {
  day: {
    routeGradientStart: '#d71920',
    routeGradientEnd: '#ff6a00',
    routeStroke: 'url(#routeGradDay)',
    routeOpacity: 0.75,
    routeWidth: 0.35,
    glowDeviation: 0.6,
    glowColor: 'rgba(215, 25, 33, 0.3)',
    trailStroke: 'rgba(215, 25, 33, 0.25)',
    trailWidth: 1.2,
    planeFill: '#d71920',
    planeGlow: 'rgba(215, 25, 33, 0.4)',
    pulseColor: 'rgba(215, 25, 33, 0.6)',
    pulseHighlight: 'rgba(255, 120, 50, 0.3)',
  },
  night: {
    routeGradientStart: '#d71920',
    routeGradientEnd: '#d71920',
    routeStroke: '#d71920',
    routeOpacity: 0.85,
    routeWidth: 0.38,
    glowDeviation: 1.0,
    glowColor: 'rgba(215, 25, 33, 0.5)',
    trailStroke: 'rgba(215, 25, 33, 0.35)',
    trailWidth: 1.4,
    planeFill: '#ff3b3b',
    planeGlow: 'rgba(255, 59, 59, 0.6)',
    pulseColor: 'rgba(215, 25, 33, 0.8)',
    pulseHighlight: 'rgba(255, 80, 80, 0.5)',
  },
};

/* ----------------------------------------------------------------
   COMPONENT
   ---------------------------------------------------------------- */
export default function AnimatedRoutes({ cities, hub, animPhase, cityNodeRefs }) {
  const { isDark } = useTheme();
  const svgRef = useRef(null);
  const timelineRef = useRef(null);
  const themeRef = useRef(isDark ? 'night' : 'day');

  // Keep theme ref in sync without re-building timeline
  useEffect(() => {
    themeRef.current = isDark ? 'night' : 'day';
  }, [isDark]);

  const theme = isDark ? THEME.night : THEME.day;

  // Sort destinations left-to-right by x-coordinate for stagger order
  const destinations = [...cities.filter((c) => !c.hub)].sort((a, b) => a.x - b.x);

  // Build & run GSAP timeline when animPhase === 1
  useEffect(() => {
    if (animPhase !== 1 || !svgRef.current) return;

    const svg = svgRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        // Pause 2 seconds, then restart
        gsap.delayedCall(2, () => {
          tl.restart();
        });
      },
    });

    destinations.forEach((city, i) => {
      const routePath = svg.querySelector(`#route-path-${city.id}`);
      const trailPath = svg.querySelector(`#trail-path-${city.id}`);
      const planeGroup = svg.querySelector(`#plane-${city.id}`);

      if (!routePath || !planeGroup) return;

      const pathLength = routePath.getTotalLength();

      // Prepare route — hidden initially
      gsap.set(routePath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });

      if (trailPath) {
        const trailLength = trailPath.getTotalLength();
        gsap.set(trailPath, {
          strokeDasharray: trailLength,
          strokeDashoffset: trailLength,
          opacity: 0,
        });
      }

      // Hide plane initially
      gsap.set(planeGroup, { opacity: 0, scale: 0 });

      const staggerDelay = i * 0.15;

      // ---- Route draw ----
      tl.to(
        routePath,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power2.inOut',
        },
        staggerDelay
      );

      // ---- Trail draw (follows route but slightly behind) ----
      if (trailPath) {
        tl.to(
          trailPath,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          staggerDelay + 0.05
        );
      }

      // ---- Plane appear ----
      tl.to(
        planeGroup,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        staggerDelay
      );

      // ---- Plane motion along path ----
      // Use the actual SVG path DOM element for alignment
      tl.to(
        planeGroup,
        {
          motionPath: {
            path: routePath,
            align: routePath,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 1.8,
          ease: 'power2.inOut',
          onComplete: () => {
            // ---- Destination activation ----
            const currentTheme = THEME[themeRef.current];

            // Pulse the city marker via DOM ref
            const markerDot = cityNodeRefs?.current?.[city.id];
            if (markerDot) {
              gsap.fromTo(
                markerDot,
                { scale: 1, boxShadow: `0 0 8px ${currentTheme.pulseColor}` },
                {
                  scale: 1.15,
                  boxShadow: `0 0 20px ${currentTheme.pulseHighlight}`,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  yoyo: true,
                  repeat: 1,
                }
              );
            }

            // Pulse the SVG destination dot
            const destDot = svg.querySelector(`#dest-dot-${city.id}`);
            if (destDot) {
              gsap.fromTo(
                destDot,
                { attr: { r: 1 }, opacity: 0.8 },
                {
                  attr: { r: 1.5 },
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  yoyo: true,
                  repeat: 1,
                }
              );
            }

            // Hide plane after reaching destination
            gsap.to(planeGroup, {
              opacity: 0,
              scale: 0.5,
              duration: 0.4,
              delay: 0.2,
              ease: 'power2.in',
            });
          },
        },
        staggerDelay
      );
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      gsap.killTweensOf('*');
    };
  }, [animPhase]); // Only re-run when animPhase changes

  // ---- Compute arc path strings for SVG ----
  const getArcPath = (city) => {
    const mx = (hub.x + city.x) / 2;
    const my = (hub.y + city.y) / 2 - 12;
    return `M${hub.x},${hub.y} Q${mx},${my} ${city.x},${city.y}`;
  };

  return (
    <g ref={svgRef} className="animated-routes-layer">
      {/* SVG Defs — gradients and filters */}
      <defs>
        {/* Day mode route gradient */}
        <linearGradient id="routeGradDay" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d71920" />
          <stop offset="100%" stopColor="#ff6a00" stopOpacity="0.7" />
        </linearGradient>

        {/* Day glow filter */}
        <filter id="routeGlowDay" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feFlood floodColor="rgba(215, 25, 33, 0.3)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
          <feMerge>
            <feMergeNode in="colorBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Night glow filter */}
        <filter id="routeGlowNight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.0" result="blur" />
          <feFlood floodColor="rgba(215, 25, 33, 0.5)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
          <feMerge>
            <feMergeNode in="colorBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Plane glow — day */}
        <filter id="planeGlowDay" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Plane glow — night */}
        <filter id="planeGlowNight" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Destination pulse filter */}
        <filter id="destPulse" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- Hub Location Pin (Dubai) ---- */}
      <g transform={`translate(${hub.x}, ${hub.y - 2.8}) scale(0.12)`} filter="url(#destPulse)">
        {/* Teardrop Location Pin Body */}
        <path
          d="M 0,-16 C -6.6,-16 -12,-10.6 -12,-4 C -12,4 0,16 0,16 C 0,16 12,4 12,-4 C 12,-10.6 6.6,-16 0,-16 Z"
          fill="#C9A96E"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <circle cx="0" cy="-4" r="4.5" fill="#ffffff" />
      </g>

      {/* ---- Route lines + location pins + commercial jet planes ---- */}
      {destinations.map((city) => {
        const arcPath = getArcPath(city);

        return (
          <g key={city.id}>
            {/* Trail path (behind route, wider, dashed) */}
            <path
              id={`trail-path-${city.id}`}
              d={arcPath}
              className="animated-plane-trail"
              stroke={theme.trailStroke}
              strokeWidth={theme.trailWidth}
              strokeDasharray="0.8, 0.5"
              opacity="0"
            />

            {/* Main route path (dashed high-tech flight arc matching reference style) */}
            <path
              id={`route-path-${city.id}`}
              d={arcPath}
              className="animated-route-path"
              stroke={theme.routeStroke}
              strokeWidth={theme.routeWidth}
              strokeDasharray="1, 0.6"
              opacity="0"
              filter={isDark ? 'url(#routeGlowNight)' : 'url(#routeGlowDay)'}
            />

            {/* Glowing Teardrop Location Pin Marker (Matching reference image map pins) */}
            <g
              id={`dest-dot-${city.id}`}
              transform={`translate(${city.x}, ${city.y - 2.8}) scale(0.1)`}
              filter="url(#destPulse)"
              opacity="0.85"
            >
              <path
                d="M 0,-16 C -6.6,-16 -12,-10.6 -12,-4 C -12,4 0,16 0,16 C 0,16 12,4 12,-4 C 12,-10.6 6.6,-16 0,-16 Z"
                fill="#d71920"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-4" r="4.2" fill="#ffffff" />
            </g>

            {/* Commercial Passenger Airliner Jet Silhouette (Matching reference image plane icons) */}
            <g
              id={`plane-${city.id}`}
              className="animated-plane"
              filter={isDark ? 'url(#planeGlowNight)' : 'url(#planeGlowDay)'}
            >
              {/* Jet thrust engine aura */}
              <ellipse cx="-1.5" cy="0" rx="1.2" ry="0.45" fill="rgba(255, 106, 0, 0.7)" filter="blur(0.4px)" />

              {/* Commercial Airliner Shape (Swept wings, fuselage, jet engines, tailfin) */}
              <path
                className="animated-plane__body"
                d="M 2.2,0 
                   C 1.8,-0.2 1.0,-0.3 0.2,-0.3 
                   L -0.2,-1.6 
                   C -0.3,-1.7 -0.5,-1.7 -0.6,-1.5 
                   L -0.5,-0.3 
                   L -1.5,-0.3 
                   L -1.8,-0.8 
                   C -1.9,-0.9 -2.0,-0.9 -2.1,-0.7 
                   L -1.8,0 
                   L -2.1,0.7 
                   C -2.0,0.9 -1.9,0.9 -1.8,0.8 
                   L -1.5,0.3 
                   L -0.5,0.3 
                   L -0.6,1.5 
                   C -0.5,1.7 -0.3,1.7 -0.2,1.6 
                   L 0.2,0.3 
                   C 1.0,0.3 1.8,0.2 2.2,0 Z"
                fill={theme.planeFill}
                stroke="#ffffff"
                strokeWidth="0.08"
              />
            </g>
          </g>
        );
      })}
    </g>
  );
}
