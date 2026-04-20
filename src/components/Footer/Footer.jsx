import React from 'react';
import { Share2, AtSign, Rss, Tv, Smartphone } from 'lucide-react';
import './Footer.css';

const footerColumns = [
  {
    heading: 'About',
    links: ['About Emirates', 'Our business', 'Our people', 'Sustainability', 'Careers', 'Media centre']
  },
  {
    heading: 'Travel',
    links: ['Book flights', 'Manage booking', 'Check-in', 'Flight status', 'Where we fly', 'Travel updates']
  },
  {
    heading: 'Experience',
    links: ['First Class', 'Business Class', 'Premium Economy', 'Economy', 'Lounges', 'Dining', 'Entertainment']
  },
  {
    heading: 'Support',
    links: ['Help centre', 'Contact us', 'Baggage', 'Visa & passport', 'Special assistance', 'FAQs']
  }
];

const social = [
  { label: 'Instagram', icon: Share2, href: '#' },
  { label: 'X / Twitter', icon: AtSign, href: '#' },
  { label: 'Facebook', icon: Rss, href: '#' },
  { label: 'YouTube', icon: Tv, href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Decorative route lines */}
      <svg className="footer__routes" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 100 Q360 20 720 100 T1440 100" stroke="rgba(215,25,33,0.08)" strokeWidth="2" fill="none" />
        <path d="M0 140 Q480 40 960 140 T1440 80" stroke="rgba(201,169,110,0.05)" strokeWidth="1" fill="none" />
      </svg>

      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__brand">
          {/* Emirates Logo */}
          <div className="footer__logo">
            <img src="/emirates-logo.svg" alt="Emirates Main Logo" style={{ height: '48px', width: 'auto' }} />
          </div>

          <p className="footer__brand-desc">
            From Dubai to the world. Connecting cultures, enabling discoveries,
            and setting the standard in global aviation since 1985.
          </p>

          {/* Awards */}
          <div className="footer__awards">
            <div className="footer__award">
              <span className="footer__award-num">World's Best</span>
              <span className="footer__award-label">Airline, Skytrax 2024</span>
            </div>
            <div className="footer__award">
              <span className="footer__award-num">5 Star</span>
              <span className="footer__award-label">Airline Rating</span>
            </div>
          </div>

          {/* Social */}
          <div className="footer__social">
            {social.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} className="footer__social-btn" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* App download */}
          <div className="footer__app">
            <Smartphone size={16} />
            <div>
              <p className="footer__app-label">Download the Emirates app</p>
              <div className="footer__app-badges">
                <a href="#" className="footer__app-badge">App Store</a>
                <a href="#" className="footer__app-badge">Google Play</a>
              </div>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <div className="footer__nav">
          {footerColumns.map((col) => (
            <div key={col.heading} className="footer__col">
              <p className="footer__col-heading">{col.heading}</p>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skywards promo bar */}
      <div className="footer__skywards-bar">
        <div className="container footer__skywards-inner">
          <div>
            <p className="label footer__skywards-eyebrow">Emirates Skywards</p>
            <p className="footer__skywards-text">Join 30 million members. Earn miles, unlock rewards.</p>
          </div>
          <a href="#" className="btn footer__skywards-btn">Join free today →</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} Emirates. All rights reserved. This is an unofficial concept redesign for portfolio purposes only.
          </p>
          <div className="footer__legal">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Settings</a>
            <a href="#">Accessibility</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
