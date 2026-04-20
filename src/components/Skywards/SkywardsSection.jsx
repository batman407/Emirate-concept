import React, { useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Star, Zap, Gift, Crown } from 'lucide-react';
import './SkywardsSection.css';

const tiers = [
  {
    id: 'blue',
    name: 'Blue',
    icon: Star,
    miles: '0 – 24,999',
    color: '#6B7280',
    benefits: ['Earn miles on flights', 'Access to Skywards e-store', 'Hotel partner miles', 'Car rental miles']
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: Zap,
    miles: '25,000 – 49,999',
    color: '#9CA3AF',
    benefits: ['Priority check-in', 'Extra baggage allowance', 'Lounge access (select)', 'Bonus miles on bookings']
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Gift,
    miles: '50,000 – 149,999',
    color: '#C9A96E',
    benefits: ['Business Class lounge', 'Guaranteed upgrades', 'Chauffeur-drive priority', 'Double tier miles']
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: Crown,
    miles: '150,000+',
    color: '#D71921',
    benefits: ['Unlimited lounge access', 'Premium upgrades', 'Global First Class service', 'Exclusive partner benefits']
  }
];

export default function SkywardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTier, setActiveTier] = useState('gold');

  return (
    <section className="skywards section" id="skywards" ref={ref}>
      {/* BG texture */}
      <div className="skywards__bg" aria-hidden="true">
        <div className="skywards__bg-gradient" />
        <div className="skywards__bg-lines" />
      </div>

      <div className="container skywards__container">
        {/* Left — copy */}
        <motion.div
          className="skywards__left"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="section-divider-gold" />
          <p className="label skywards__eyebrow">Emirates Skywards</p>
          <h2 className="display-md skywards__title">
            Every Mile Tells<br /><em>Your Story</em>
          </h2>
          <p className="body-lg skywards__desc">
            Join the world's most rewarding loyalty programme. Earn miles when you fly,
            dine, shop, and stay. Then redeem them for flights, upgrades, and unforgettable experiences.
          </p>

          <div className="skywards__ctas">
            <a href="#" className="btn btn-primary skywards__join-btn">
              Join Skywards <ArrowRight size={16} />
            </a>
            <a href="#" className="btn btn-ghost skywards__learn-btn">
              Learn More
            </a>
          </div>

          {/* Quick stats */}
          <div className="skywards__stats">
            {[
              { num: '30M+', label: 'Members worldwide' },
              { num: '100+', label: 'Airline partners' },
              { num: '1,000+', label: 'Partner brands' },
            ].map((s, i) => (
              <div key={i} className="skywards__stat">
                <span className="skywards__stat-num">{s.num}</span>
                <span className="skywards__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — tier cards */}
        <motion.div
          className="skywards__right"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="skywards__tiers">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isActive = activeTier === tier.id;
              return (
                <motion.div
                  key={tier.id}
                  className={`tier-card ${isActive ? 'tier-card--active' : ''}`}
                  onClick={() => setActiveTier(tier.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  id={`tier-${tier.id}`}
                  style={{ '--tier-color': tier.color }}
                >
                  <div className="tier-card__header">
                    <div className="tier-card__icon-wrap">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="tier-card__name">{tier.name}</p>
                      <p className="tier-card__miles">{tier.miles} miles</p>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      className="tier-card__benefits"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tier.benefits.map((benefit, bi) => (
                        <div key={bi} className="tier-benefit">
                          <span className="tier-benefit__dot" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress visual */}
          <div className="skywards__progress-visual">
            <div className="skywards__progress-bar">
              <div className="skywards__progress-fill" style={{ width: '38%' }} />
            </div>
            <div className="skywards__progress-labels">
              <span className="label">Blue</span>
              <span className="label">Silver</span>
              <span className="label" style={{ color: 'var(--champagne)', fontWeight: 700 }}>Gold</span>
              <span className="label">Platinum</span>
            </div>
            <p className="skywards__progress-note body-sm">
              You're 12,400 miles away from <strong>Gold</strong> status
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
