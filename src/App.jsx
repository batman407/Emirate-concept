import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import BookingPanel from './components/Booking/BookingPanel';
import ServicesSection from './components/Services/ServicesSection';
import ExperienceSection from './components/Experience/ExperienceSection';
import BrandStorySection from './components/BrandStory/BrandStorySection';
import RouteGlobe from './components/Globe/RouteGlobe';
import AboutSection from './components/About/AboutSection';
import DestinationsSection from './components/Destinations/DestinationsSection';
import SkywardsSection from './components/Skywards/SkywardsSection';
import SignUpSection from './components/SignUp/SignUpSection';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <BookingPanel />
          <ServicesSection />
          <ExperienceSection />
          <BrandStorySection />
          <RouteGlobe />
          <AboutSection />
          <DestinationsSection />
          <SkywardsSection />
          <SignUpSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
