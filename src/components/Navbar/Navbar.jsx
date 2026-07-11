import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Heart, Menu, X, ChevronDown, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const navData = {
  Book: {
    columns: [
      {
        heading: 'Flights',
        items: ['Search flights', 'Flight + hotel', 'Destinations', 'Special offers', 'Fare types', 'Travel services']
      },
      {
        heading: 'Travel Extras',
        items: ['Airport transfers', 'Chauffeur-drive', 'Meet & Greet', 'Tours & activities', 'Car rentals', 'Hotels']
      }
    ]
  },
  Manage: {
    columns: [
      {
        heading: 'Your Booking',
        items: ['Manage booking', 'Check-in online', 'Flight status', 'Travel updates', 'Request a refund', 'Upgrade your seat']
      }
    ]
  },
  Experience: {
    columns: [
      {
        heading: 'Cabin Classes',
        items: ['First Class', 'Business Class', 'Premium Economy', 'Economy Class']
      },
      {
        heading: 'On Board',
        items: ['Dining', 'Entertainment', 'Wi-Fi & connectivity', 'Lounges', 'Chauffeur-drive', 'Aircraft types']
      }
    ]
  },
  'Where We Fly': {
    columns: [
      {
        heading: 'Destinations',
        items: ['Route map', 'Featured destinations', 'Explore by region', 'Travel inspiration', 'City guides', 'Stopover in Dubai']
      }
    ]
  },
  Loyalty: {
    columns: [
      {
        heading: 'Emirates Skywards',
        items: ['About Skywards', 'Join now', 'Earn miles', 'Spend miles', 'Tiers & benefits', 'Partner airlines']
      },
      {
        heading: 'Partners',
        items: ['Hotel partners', 'Car rental partners', 'Retail partners', 'Financial partners']
      }
    ]
  },
  Help: {
    columns: [
      {
        heading: 'Support',
        items: ['Help centre', 'Contact us', 'FAQs', 'Special assistance', 'Accessibility', 'Compensation']
      },
      {
        heading: 'Travel Info',
        items: ['Baggage', 'Visa & passport', 'Health & safety', 'Travel insurance', 'Travel requirements']
      }
    ]
  }
};

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  const userInitials = (() => {
    if (!user) return null;
    const first = user?.user_metadata?.first_name || '';
    const last = user?.user_metadata?.last_name || '';
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    if (first) return first[0].toUpperCase();
    return (user?.email?.[0] || 'U').toUpperCase();
  })();

  const handleUserClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (key) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -12, pointerEvents: 'none' },
    visible: { 
      opacity: 1, 
      y: 0, 
      pointerEvents: 'auto', 
      transition: { 
        duration: 0.35, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08
      } 
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
  };

  const colVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.28 } }
  };

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'} ${isDark ? 'navbar--dark' : ''}`}
    >
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="/" className="navbar__logo" aria-label="Emirates Home">
          <div className="navbar__logo-block">
            <EmiratesLogoSVG />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {Object.keys(navData).map(key => (
            <div
              key={key}
              className={`navbar__item ${activeMenu === key ? 'navbar__item--active' : ''}`}
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navbar__link">
                {key}
                <ChevronDown size={13} className={`navbar__chevron ${activeMenu === key ? 'navbar__chevron--up' : ''}`} />
              </button>
              <AnimatePresence>
                {activeMenu === key && (
                  <motion.div
                    className="mega-menu"
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={() => clearTimeout(closeTimer.current)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mega-menu__inner">
                      {navData[key].columns.map((col, ci) => (
                        <motion.div key={ci} className="mega-menu__col" variants={colVariants}>
                          <p className="mega-menu__heading">{col.heading}</p>
                          <ul className="mega-menu__list">
                            {col.items.map((item, ii) => (
                              <li key={ii}>
                                <a href="#" className="mega-menu__link">{item}</a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Utilities */}
        <div className="navbar__utils">
          <button
            className="navbar__util-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Day Mode' : 'Night Experience'}
            title={isDark ? 'Day Mode' : 'Night Experience'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className="navbar__util-label">{isDark ? 'Day' : 'Night'}</span>
          </button>
          <button className="navbar__util-btn" aria-label="Select language">
            <Globe size={18} />
          </button>
          <button className="navbar__util-btn" aria-label="Search">
            <Search size={18} />
          </button>
          <button
            className="navbar__util-btn"
            aria-label={user ? 'Go to dashboard' : 'Sign in'}
            onClick={handleUserClick}
            style={user ? {
              background: 'var(--emirates-red)',
              color: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              fontSize: '0.7rem',
              fontWeight: '700',
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } : {}}
          >
            {user ? userInitials : <User size={18} />}
          </button>
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mobile-menu__header">
                <EmiratesLogoSVG />
                <button
                  className="mobile-menu__close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mobile-menu__nav">
                {Object.keys(navData).map(key => (
                  <div key={key} className="mobile-nav__item">
                    <button
                      className="mobile-nav__link"
                      onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    >
                      {key}
                      <ChevronDown
                        size={16}
                        className={`mobile-nav__chevron ${mobileExpanded === key ? 'mobile-nav__chevron--up' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileExpanded === key && (
                        <motion.div
                          className="mobile-nav__sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {navData[key].columns.map((col, ci) => (
                            <div key={ci} className="mobile-nav__col">
                              <p className="mobile-nav__col-heading">{col.heading}</p>
                              {col.items.map((item, ii) => (
                                <a key={ii} href="#" className="mobile-nav__sub-link">{item}</a>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="mobile-menu__footer">
                <button
                  className="mobile-night-toggle"
                  onClick={toggleTheme}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? 'Day Mode' : 'Night Experience'}
                </button>
                {user ? (
                  <>
                    <button
                      className="mobile-night-toggle"
                      onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                      style={{ marginTop: 8 }}
                    >
                      <User size={16} />
                      My Dashboard
                    </button>
                    <button
                      className="mobile-night-toggle"
                      onClick={handleSignOut}
                      style={{ marginTop: 8, color: 'var(--emirates-red)' }}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    className="mobile-night-toggle"
                    onClick={() => { navigate('/login'); setMobileOpen(false); }}
                    style={{ marginTop: 8 }}
                  >
                    <User size={16} />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function EmiratesLogoSVG() {
  return (
    <img 
      src="/emirates-logo.svg" 
      alt="Emirates" 
      className="emirates-logo-svg"
      style={{ height: '48px', width: 'auto', display: 'block' }}
    />
  );
}
