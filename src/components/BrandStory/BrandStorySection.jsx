import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import './BrandStorySection.css';

const storyBeats = [
  {
    id: 1,
    scene: '01',
    headline: 'A Vision Born in Dubai',
    body: 'In the heart of Dubai, a bold vision began. One shaped by ambition, possibility, and the desire to connect the world in a more meaningful way.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85',
  },
  {
    id: 2,
    scene: '02',
    headline: 'More Than an Airline',
    body: 'It was more than the launch of an airline. It was the beginning of a new travel experience, one where comfort, elegance, and global connection could exist in perfect harmony.',
    image: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=1400&q=85',
  },
  {
    id: 3,
    scene: '03',
    headline: 'Redefining Expectations',
    body: 'From the very beginning, Emirates set out to challenge expectations. With innovation at its core and hospitality in every detail, it reimagined what flying could feel like.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=85',
  },
  {
    id: 4,
    scene: '04',
    headline: 'Built Piece by Piece',
    body: 'Piece by piece, journey by journey, that vision began to take shape. Built on precision, refined by experience, and inspired by the spirit of Dubai.',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1400&q=85',
  },
  {
    id: 5,
    scene: '05',
    headline: 'Connecting Continents',
    body: 'As its network expanded across continents, so did its impact. Cities became more connected. Cultures moved closer. Travel became more than movement. It became discovery.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85',
  },
  {
    id: 6,
    scene: '06',
    headline: 'Beyond the Ordinary',
    body: 'With every destination added, every cabin elevated, and every service refined, Emirates continued to push beyond the ordinary. Redefining not just where people fly, but how they feel.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85',
  },
  {
    id: 7,
    scene: '07',
    headline: 'From Dubai to the World',
    body: 'Today, Emirates stands as one of the world\'s most recognized names in aviation. A brand defined by innovation, world-class hospitality, and journeys designed to inspire.',
    image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1400&q=85',
    isFinal: true
  }
];

export default function BrandStorySection() {
  const containerRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const [isVoiceOverActive, setIsVoiceOverActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scene = storyBeats[activeScene];

  const handleNext = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % storyBeats.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveScene((prev) => (prev - 1 + storyBeats.length) % storyBeats.length);
  }, []);

  // Handle Speech Synthesis Voiceover
  useEffect(() => {
    if (!isVoiceOverActive || !window.speechSynthesis) {
      window.speechSynthesis?.cancel();
      return;
    }

    window.speechSynthesis.cancel();

    let isSubscribed = true;
    let fallbackTimer = null;
    let transitionTimer = null;

    const timeoutMsg = setTimeout(() => {
      if (!isSubscribed) return;

      const msg = new SpeechSynthesisUtterance(scene.body);

      // Attempt to pick a premium-sounding English voice
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(
        (v) => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('Natural')
      );
      if (ukVoice) {
        msg.voice = ukVoice;
      }

      msg.rate = 0.88; // Natural, cinematic pace
      msg.pitch = 0.95;

      // When voiceover FINISHES speaking, auto-advance to next slide after 1.2s pause
      msg.onend = () => {
        if (!isSubscribed) return;
        if (isPlaying && !isHovered) {
          transitionTimer = setTimeout(() => {
            handleNext();
          }, 1200);
        }
      };

      msg.onerror = () => {
        if (!isSubscribed) return;
        if (isPlaying && !isHovered) {
          fallbackTimer = setTimeout(handleNext, 8000);
        }
      };

      window.speechSynthesis.speak(msg);
    }, 300);

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutMsg);
      clearTimeout(fallbackTimer);
      clearTimeout(transitionTimer);
      window.speechSynthesis?.cancel();
    };
  }, [activeScene, isVoiceOverActive, isPlaying, isHovered, scene.body, handleNext]);

  // Standard Auto-play slideshow (when Voiceover is OFF)
  useEffect(() => {
    if (isVoiceOverActive || !isPlaying || isHovered) return;

    // 8 seconds per slide when Voiceover is off so users have ample time to read
    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [isVoiceOverActive, isPlaying, isHovered, handleNext]);

  return (
    <section 
      className="brand-story" 
      id="brand-story" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="brand-story__container">
        {/* Background images — cross-fade on scene change */}
        <div className="brand-story__bg">
          {storyBeats.map((beat, i) => (
            <div
              key={beat.id}
              className={`brand-story__bg-slide ${i === activeScene ? 'brand-story__bg-slide--active' : ''}`}
              style={{ backgroundImage: `url("${beat.image}")` }}
            />
          ))}
          <div className="brand-story__overlay" />
        </div>

        {/* Top Controls Bar: Voiceover toggle */}
        <div className="brand-story__top-controls">
          <button 
            className={`brand-story__voice-btn glass-card ${isVoiceOverActive ? 'brand-story__voice-btn--active' : ''}`}
            onClick={() => setIsVoiceOverActive(!isVoiceOverActive)}
            aria-label={isVoiceOverActive ? "Disable Voiceover" : "Enable Voiceover"}
            title={isVoiceOverActive ? "Voiceover ON" : "Voiceover OFF"}
          >
            {isVoiceOverActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* Content - changes per scene */}
        <div className="brand-story__content container">
          <div className="brand-story__left">
            <motion.p
              key={`scene-${activeScene}`}
              className="brand-story__scene-num"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {scene.scene} / {String(storyBeats.length).padStart(2, '0')}
            </motion.p>

            <motion.h2
              key={`headline-${activeScene}`}
              className="display-lg brand-story__headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {scene.headline}
            </motion.h2>

            <motion.p
              key={`body-${activeScene}`}
              className="body-lg brand-story__body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {scene.body}
            </motion.p>

            {scene.isFinal && (
              <motion.div
                className="brand-story__logo-reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.3 }}
              >
                <div className="brand-story__logo-reveal">
                  <img src="/emirates-logo.svg" alt="Emirates Main Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation & Controls panel (Prev / Play-Pause / Next & Dots) */}
        <div className="brand-story__nav-panel glass-card">
          {/* Quick Prev / Next Arrow Buttons */}
          <div className="brand-story__nav-arrows">
            <button 
              className="brand-story__nav-btn" 
              onClick={handlePrev}
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>

            <button 
              className="brand-story__nav-btn" 
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button 
              className="brand-story__nav-btn" 
              onClick={handleNext}
              aria-label="Next Slide"
              title="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="brand-story__nav-divider" />

          {/* Slide Dots */}
          <div className="brand-story__progress">
            {storyBeats.map((beat, i) => (
              <button
                key={beat.id}
                className={`brand-story__progress-dot ${i === activeScene ? 'brand-story__progress-dot--active' : i < activeScene ? 'brand-story__progress-dot--done' : ''}`}
                aria-label={`Go to slide ${i + 1}: ${beat.headline}`}
                onClick={() => setActiveScene(i)}
              >
                <span className="brand-story__dot-tooltip">{beat.headline}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Route line animation */}
        <svg className="brand-story__route-svg" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 300 Q200 100 400 280 T800 200 T1200 300"
            stroke="rgba(201, 169, 110, 0.25)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 6"
            className="brand-story__route-path"
          />
        </svg>
      </div>
    </section>
  );
}
