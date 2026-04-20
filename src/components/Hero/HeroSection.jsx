import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import './HeroSection.css';

const heroSlides = [
  {
    headline: 'The Journey Begins',
    headlineItalic: 'Before You Board.',
    sub: 'Experience world-class hospitality, seamless luxury, and global connectivity. From the moment you think of travel.',
    cta: 'Book Your Journey',
    ctaSecondary: 'Explore First Class',
    tag: 'A New Standard in Aviation',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1920&q=90',
    bgPosition: 'center center',
    bgSize: 'cover',
  },
  {
    headline: 'A World of Destinations,',
    headlineItalic: 'One Airline.',
    sub: 'With routes spanning six continents, every journey with Emirates is a story waiting to be written.',
    cta: 'Explore Destinations',
    ctaSecondary: 'Our Fleet',
    tag: 'Dubai to the World',
    image: '/images/hero/aircraft.png',
    bgPosition: 'center center',
    bgSize: 'cover',
  },
  {
    headline: 'Crafted for the',
    headlineItalic: "World's Finest Journeys.",
    sub: 'From private suites at 40,000 feet to legendary in-flight dining. Every detail meticulously designed for you.',
    cta: 'Discover First Class',
    ctaSecondary: 'See Our Dining',
    tag: 'Premium Luxury Redefined',
    image: '/images/hero/cabin.png',
    bgPosition: 'center center',
    bgSize: 'cover',
  }
];

const overlayImg = 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=1920&q=80';

export default function HeroSection() {
  const [current, setCurrent] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    intervalRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = heroSlides[current];

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <section className="hero" id="hero">
      {/* Background Images */}
      <div className="hero__bg">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`hero__bg-slide ${i === current ? 'hero__bg-slide--active' : ''}`}
            style={{
              backgroundImage: `url("${s.image}")`,
              backgroundPosition: s.bgPosition || 'center center',
              backgroundSize: s.bgSize || 'cover',
            }}
          />
        ))}
        {/* Cinematic overlay gradient */}
        <div className="hero__overlay" />
        <div className="hero__overlay-left" />
        <div className="hero__overlay-bottom" />
      </div>

      {/* Floating particles */}
      <div className="hero__particles" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="hero__particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Content */}
      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag line */}
          <motion.div
            key={`tag-${current}`}
            className="hero__tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="hero__tag-line" />
            <span className="label">{slide.tag}</span>
          </motion.div>

          {/* Headline */}
          <div className="hero__headline display-xl">
            <motion.span
              key={`h1-${current}`}
              className="hero__headline-line"
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {slide.headline}
            </motion.span>
            <motion.span
              key={`h2-${current}`}
              className="hero__headline-line hero__headline-italic"
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {slide.headlineItalic}
            </motion.span>
          </div>

          {/* Sub */}
          <motion.p
            key={`sub-${current}`}
            className="hero__sub body-lg"
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {slide.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${current}`}
            className="hero__ctas"
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#booking" className="btn btn-primary hero__cta-primary">
              {slide.cta}
              <ArrowRight size={16} />
            </a>
            <a href="#experience" className="btn btn-outline hero__cta-secondary">
              {slide.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        {/* Fly Better mark */}
        <motion.div
          className="hero__flybetter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <div className="hero__flybetter-ring" />
          <p className="hero__flybetter-text">Fly<br /><em>Better</em></p>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="hero__indicators">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero__indicator ${i === current ? 'hero__indicator--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#booking"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scroll to booking"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
