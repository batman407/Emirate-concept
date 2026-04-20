import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './AboutSection.css';

const pillars = [
  {
    id: 'business',
    title: 'Our Business',
    description: 'A global aviation leader connecting over 240 destinations across six continents, with a fleet that sets the standard for long-haul travel.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    stat: '240+',
    statLabel: 'Destinations'
  },
  {
    id: 'planet',
    title: 'Our Planet',
    description: 'Committed to sustainable aviation and a net-zero future. Investing in fuel efficiency, carbon offsets, and eco-conscious operations.',
    image: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?w=600&q=80',
    stat: '50%',
    statLabel: 'Emission reduction target'
  },
  {
    id: 'people',
    title: 'Our People',
    description: 'Over 100,000 dedicated professionals from 160+ nationalities, united by one shared passion for exceptional hospitality.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    stat: '100K+',
    statLabel: 'Team members'
  },
  {
    id: 'communities',
    title: 'Our Communities',
    description: 'Investing in the communities we serve through the Emirates Airline Foundation and partnerships that transform lives globally.',
    image: 'https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?w=600&q=80',
    stat: '50+',
    statLabel: 'Countries supported'
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider" />
          <p className="label about__eyebrow">The Emirates Story</p>
          <h2 className="display-md about__title">
            More Than Aviation.<br /><em>A Global Vision.</em>
          </h2>
          <p className="body-lg about__sub">
            From humble beginnings in Dubai to one of the world's most celebrated airlines.
            Excellence, innovation, and humanity define everything we do.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="about__stats"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { num: '1985', label: 'Year of founding' },
            { num: '240+', label: 'Global destinations' },
            { num: '270+', label: 'Aircraft in fleet' },
            { num: '160+', label: 'Nationalities employed' },
          ].map((stat, i) => (
            <div key={i} className="about__stat">
              <span className="about__stat-num">{stat.num}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {pillars.map(pillar => (
            <motion.div
              key={pillar.id}
              className="about-card"
              variants={cardVariants}
              id={`about-${pillar.id}`}
            >
              <div className="about-card__img-wrap">
                <img src={pillar.image} alt={pillar.title} className="about-card__img" loading="lazy" />
                <div className="about-card__img-overlay" />
                <div className="about-card__stat-badge">
                  <span className="about-card__stat-num">{pillar.stat}</span>
                  <span className="about-card__stat-label">{pillar.statLabel}</span>
                </div>
              </div>
              <div className="about-card__content">
                <h3 className="heading-md about-card__title">{pillar.title}</h3>
                <p className="body-sm about-card__desc">{pillar.description}</p>
                <a href="#" className="about-card__link">
                  Learn more <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
