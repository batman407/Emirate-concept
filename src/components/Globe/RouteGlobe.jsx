import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, MapPin } from 'lucide-react';
import AnimatedRoutes from './AnimatedRoutes';
import './RouteGlobe.css';

// City data with approximate x/y positions on a simplified world map (0–100 range)
const cities = [
  { id: 'dubai', name: 'Dubai', country: 'UAE', x: 58, y: 42, hub: true,
    mood: 'The World\'s Gateway', copy: 'Where every journey begins. The vibrant heart of global aviation.', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
  { id: 'london', name: 'London', country: 'United Kingdom', x: 44, y: 22,
    mood: 'Royal & Timeless', copy: 'From Heathrow to the world. Culture, history, and elegance await.', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
  { id: 'new-york', name: 'New York', country: 'United States', x: 20, y: 28,
    mood: 'Energy of the World', copy: 'The city that never sleeps, connected to Dubai in just hours.', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80' },
  { id: 'paris', name: 'Paris', country: 'France', x: 45, y: 24,
    mood: 'Art. Love. Cuisine.', copy: 'La Ville Lumière awaits, with Emirates flying you there in style.', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', x: 80, y: 30,
    mood: 'Harmony & Innovation', copy: 'Ancient tradition meets futuristic modernity in one perfect city.', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
  { id: 'milan', name: 'Milan', country: 'Italy', x: 48, y: 26,
    mood: 'Fashion & Culture', copy: 'The design capital of the world, within reach of your Emirates flight.', img: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400&q=80' },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', x: 42, y: 50,
    mood: 'Vibrant & Bold', copy: 'Africa\'s most dynamic city, bursting with culture, energy and ambition.', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', x: 84, y: 68,
    mood: 'Wild & Beautiful', copy: 'Golden harbours, golden skies, and the warmth of Australian welcome.', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { id: 'maldives', name: 'Maldives', country: 'Maldives', x: 64, y: 52,
    mood: 'Pure Serenity', copy: 'Turquoise atolls and infinite horizons. Paradise, reachable from Dubai.', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80' },
];

const DUBAI = cities.find(c => c.id === 'dubai');

export default function RouteGlobe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const cityNodeRefs = useRef({});

  // Callback ref setter for city node dots
  const setCityNodeRef = useCallback((id, el) => {
    if (el) cityNodeRefs.current[id] = el;
  }, []);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setAnimPhase(1), 600);
    }
  }, [isInView]);

  return (
    <section className="globe-section section" id="wherewfly" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="globe-section__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider" />
          <p className="label globe-section__eyebrow">Where We Fly</p>
          <h2 className="display-md globe-section__title">
            Connected to <em>the World</em>
          </h2>
          <p className="body-lg globe-section__sub">
            Explore our global network. From Dubai, to over 240 destinations across six continents.
          </p>
        </motion.div>

        <div className="globe-wrapper">
          {/* Map container */}
          <motion.div
            className="globe-map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Real satellite world map via ArcGIS */}
            <img
              src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/export?bbox=-180,-90,180,90&bboxSR=4326&size=1400,1050&imageSR=4326&format=png&f=image"
              alt="World Map"
              className="globe-map__bg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Atmospheric dark tint */}
            <div className="globe-map__tint" />

            {/* SVG animated route lines — GSAP-powered */}
            <svg className="globe-map__svg" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
              <AnimatedRoutes
                cities={cities}
                hub={DUBAI}
                animPhase={animPhase}
                cityNodeRefs={cityNodeRefs}
              />

              {/* Interactive hover/select route highlight (kept for interactivity) */}
              {cities.filter(c => !c.hub).map((city) => {
                const mx = (DUBAI.x + city.x) / 2;
                const my = (DUBAI.y + city.y) / 2 - 12;
                const isActive = hoveredCity === city.id || selected?.id === city.id;
                const arcPath = `M${DUBAI.x},${DUBAI.y} Q${mx},${my} ${city.x},${city.y}`;
                return (
                  <g key={`hover-${city.id}`}>
                    {isActive && (
                      <>
                        <path
                          d={arcPath}
                          stroke="#C9A96E"
                          strokeWidth="0.55"
                          fill="none"
                          opacity="0.7"
                          strokeLinecap="round"
                        />
                        <circle r="0.9" fill="#C9A96E" opacity="0.9">
                          <animateMotion dur="2.5s" repeatCount="indefinite" path={arcPath} />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* City nodes */}
            {cities.map((city, i) => (
              <motion.button
                key={city.id}
                className={`city-node ${city.hub ? 'city-node--hub' : ''} ${selected?.id === city.id ? 'city-node--selected' : ''}`}
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={animPhase === 1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.07, type: 'spring', stiffness: 200 }}
                onClick={() => setSelected(selected?.id === city.id ? null : city)}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
                aria-label={`${city.name}, ${city.country}`}
              >
                <span
                  className="city-node__dot"
                  ref={(el) => setCityNodeRef(city.id, el)}
                />
                <span className="city-node__ring" />
                <span className="city-node__label">{city.name}</span>
              </motion.button>
            ))}

            {/* Subtle longitude/latitude grid */}
            <div className="globe-map__grid" aria-hidden="true" />

            {/* Corner legend */}
            <div className="globe-map__legend">
              <span className="globe-map__legend-dot hub" /> Dubai Hub
              <span className="globe-map__legend-dot dest" /> Destination
            </div>
          </motion.div>

          {/* Destination Card — slides in on city click */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="dest-card"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button
                  className="dest-card__close"
                  onClick={() => setSelected(null)}
                  aria-label="Close destination card"
                >
                  <X size={16} />
                </button>

                <div className="dest-card__img-wrap">
                  <img src={selected.img} alt={selected.name} className="dest-card__img" loading="lazy" />
                  <div className="dest-card__img-overlay" />
                  <div className="dest-card__route-badge">
                    <span>DXB</span>
                    <span className="dest-card__route-arrow">→</span>
                    <span>{selected.name.substring(0, 3).toUpperCase()}</span>
                  </div>
                </div>

                <div className="dest-card__body">
                  <p className="label dest-card__mood">{selected.mood}</p>
                  <div className="dest-card__title-row">
                    <MapPin size={14} className="dest-card__pin" />
                    <div>
                      <h3 className="heading-lg dest-card__city">{selected.name}</h3>
                      <p className="body-sm dest-card__country">{selected.country}</p>
                    </div>
                  </div>
                  <p className="body-sm dest-card__copy">{selected.copy}</p>
                  <a href="#booking" className="btn btn-primary dest-card__cta">
                    Explore {selected.name} <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* City pills */}
        <div className="globe-cities">
          {cities.filter(c => !c.hub).map((city) => (
            <button
              key={city.id}
              className={`globe-city-pill ${selected?.id === city.id ? 'globe-city-pill--active' : ''}`}
              onClick={() => setSelected(selected?.id === city.id ? null : city)}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
