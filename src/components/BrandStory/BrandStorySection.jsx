import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
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

  // Auto-play slideshow instead of scroll pinning
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScene(prev => (prev + 1) % storyBeats.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const scene = storyBeats[activeScene];

  // Voiceover effect using Web Speech API
  useEffect(() => {
    if (!isVoiceOverActive || !window.speechSynthesis) {
      window.speechSynthesis?.cancel();
      return;
    }

    window.speechSynthesis.cancel();
    
    // Slight delay to synchronize with text animation
    const timeoutMsg = setTimeout(() => {
      const msg = new SpeechSynthesisUtterance(scene.body);
      
      // Attempt to set a premium-sounding English voice, ideally British
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('UK'));
      if (ukVoice) {
        msg.voice = ukVoice;
      }
      
      msg.rate = 0.85; // Slow, cinematic pace
      msg.pitch = 0.95; // Slightly deeper, calming tone
      
      window.speechSynthesis.speak(msg);
    }, 400);

    return () => {
      clearTimeout(timeoutMsg);
      window.speechSynthesis?.cancel();
    };
  }, [activeScene, isVoiceOverActive, scene.body]);

  return (
    <section className="brand-story" id="brand-story" ref={containerRef}>
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

        <button 
          className="brand-story__voice-btn glass-card"
          onClick={() => setIsVoiceOverActive(!isVoiceOverActive)}
          aria-label={isVoiceOverActive ? "Disable Cinematic Voiceover" : "Enable Cinematic Voiceover"}
        >
          {isVoiceOverActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {scene.headline}
            </motion.h2>

            <motion.p
              key={`body-${activeScene}`}
              className="body-lg brand-story__body"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {scene.body}
            </motion.p>

            {scene.isFinal && (
              <motion.div
                className="brand-story__logo-reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                <div className="brand-story__logo-reveal">
                  <img src="/emirates-logo.svg" alt="Emirates Main Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="brand-story__progress">
          {storyBeats.map((_, i) => (
            <button
              key={i}
              className={`brand-story__progress-dot ${i === activeScene ? 'brand-story__progress-dot--active' : i < activeScene ? 'brand-story__progress-dot--done' : ''}`}
              aria-label={`Scene ${i + 1}`}
              onClick={() => setActiveScene(i)}
            />
          ))}
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
