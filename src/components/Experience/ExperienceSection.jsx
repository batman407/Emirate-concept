import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ExperienceSection.css';

const experiences = [
  {
    id: 'dubai',
    label: 'Dubai Experience',
    title: 'The Spirit of Dubai',
    description: 'Where modern luxury meets ancient culture. Explore the city that inspired an airline.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85',
    featured: true,
    tag: 'Destination'
  },
  {
    id: 'first',
    label: 'First Class',
    title: 'Private Suite at 40,000 Feet',
    description: 'Experience the epitome of luxury travel. Your own private sanctuary above the clouds.',
    image: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=700&q=85',
    tag: 'Cabin Class'
  },
  {
    id: 'business',
    label: 'Business Class',
    title: 'Crafted for Distinction',
    description: 'Full-flat beds, gourmet dining, and curated entertainment. All on your schedule.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=85',
    tag: 'Cabin Class'
  },
  {
    id: 'premium',
    label: 'Premium Economy',
    title: 'More Space. More Comfort.',
    description: 'Extra legroom, premium dining, and priority service. The smart way to travel well.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=85',
    tag: 'Cabin Class'
  },
  {
    id: 'economy',
    label: 'Economy Class',
    title: 'Comfort That Connects the World',
    description: 'Thoughtful seating, world-class entertainment, and a warm Emirates welcome.',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=700&q=85',
    tag: 'Cabin Class'
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const [activeExp, setActiveExp] = useState(null);

  return (
    <section className="experience section" id="experience" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider" />
          <p className="label experience__eyebrow">Make Every Moment Remarkable</p>
          <h2 className="display-md experience__title">
            An Incredible Journey <em>Awaits</em>
          </h2>
        </motion.div>

        {/* Experience grid */}
        <motion.div
          className="experience__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Featured card */}
          {experiences.filter(e => e.featured).map(exp => (
            <motion.div
              key={exp.id}
              className="exp-card exp-card--featured"
              variants={cardVariants}
              id={`exp-${exp.id}`}
              onMouseEnter={() => setActiveExp(exp.id)}
              onMouseLeave={() => setActiveExp(null)}
            >
              <ExperienceCardInner exp={exp} />
            </motion.div>
          ))}

          {/* Secondary cards */}
          <div className="experience__secondary">
            {experiences.filter(e => !e.featured).map(exp => (
              <motion.div
                key={exp.id}
                className="exp-card"
                variants={cardVariants}
                id={`exp-${exp.id}`}
                onMouseEnter={() => setActiveExp(exp.id)}
                onMouseLeave={() => setActiveExp(null)}
              >
                <ExperienceCardInner exp={exp} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCardInner({ exp }) {
  return (
    <>
      <div className="exp-card__media">
        <img src={exp.image} alt={exp.title} className="exp-card__img" loading="lazy" />
        <div className="exp-card__overlay" />
      </div>
      <div className="exp-card__content">
        <div className="exp-card__meta">
          <span className="label exp-card__tag">{exp.tag}</span>
        </div>
        <h3 className="exp-card__label">{exp.label}</h3>
        <p className="exp-card__title">{exp.title}</p>
        <p className="exp-card__desc">{exp.description}</p>
        <div className="exp-card__cta">
          <span>Explore</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </>
  );
}
