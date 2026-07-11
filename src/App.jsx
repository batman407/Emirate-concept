import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import AuthPage from './components/Auth/AuthPage';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function LandingPage() {
  return (
    <>
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
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only enable smooth scrolling on the landing page
    if (location.pathname !== '/') return;

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
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="app">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
