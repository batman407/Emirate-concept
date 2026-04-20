import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Hotel, Car, Compass, Sun, Building2, Star, Users, Plane } from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels',
    description: 'Curated luxury stays across the world\'s finest destinations.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
    cta: 'Explore Hotels',
    tag: 'World-class stays'
  },
  {
    id: 'cars',
    icon: Car,
    title: 'Car Rentals',
    description: 'Premium vehicles at over 165 destinations globally.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    cta: 'Rent a car',
    tag: 'Travel freely'
  },
  {
    id: 'tours',
    icon: Compass,
    title: 'Tours & Activities',
    description: 'Curated experiences and immersive local adventures.',
    image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=600&q=80',
    cta: 'Discover tours',
    tag: 'Live the moment'
  },
  {
    id: 'holidays',
    icon: Sun,
    title: 'Book a Holiday',
    description: 'Complete holiday packages with flights, hotels, and more.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    cta: 'Plan a holiday',
    tag: 'Complete packages'
  },
  {
    id: 'dubai',
    icon: Building2,
    title: 'Dubai Experience',
    description: 'Discover the jewel of the Middle East in ultimate luxury.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    cta: 'Explore Dubai',
    tag: 'Icon of the UAE'
  },
  {
    id: 'chauffeur',
    icon: Star,
    title: 'Chauffeur-drive',
    description: 'Complimentary door-to-door transfers for premium cabin guests.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    cta: 'Book transfer',
    tag: 'Premium service'
  },
  {
    id: 'meet-greet',
    icon: Users,
    title: 'Meet & Greet',
    description: 'Personalized airport service with dedicated assistance.',
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=600&q=80',
    cta: 'Arrange service',
    tag: 'Personal touch'
  },
  {
    id: 'transfers',
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Seamless connections between airport and your destination.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    cta: 'Plan transfer',
    tag: 'Smooth arrivals'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="services section" id="services" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider" />
          <p className="label services__eyebrow">Your Complete Journey</p>
          <h2 className="display-md services__title">
            Travel Beyond <em>the Flight</em>
          </h2>
          <p className="body-lg services__sub">
            Every service, thoughtfully curated to extend the Emirates experience beyond the cabin.
          </p>
        </motion.div>

        {/* Service grid */}
        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isHovered={hoveredCard === service.id}
              onEnter={() => setHoveredCard(service.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isHovered, onEnter, onLeave }) {
  const { icon: Icon } = service;

  return (
    <motion.div
      className={`service-card ${isHovered ? 'service-card--hovered' : ''}`}
      variants={cardVariants}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      id={`service-${service.id}`}
    >
      {/* Image background */}
      <div className="service-card__img-wrap">
        <img
          src={service.image}
          alt={service.title}
          className="service-card__img"
          loading="lazy"
        />
        <div className="service-card__overlay" />
      </div>

      {/* Content */}
      <div className="service-card__content">
        <div className="service-card__top">
          <div className="service-card__icon-wrap">
            <Icon size={20} className="service-card__icon" />
          </div>
          <p className="label service-card__tag">{service.tag}</p>
        </div>

        <h3 className="heading-md service-card__title">{service.title}</h3>
        <p className="body-sm service-card__desc">{service.description}</p>

        <div className="service-card__cta">
          <span>{service.cta}</span>
          <ArrowRight size={15} className="service-card__arrow" />
        </div>
      </div>
    </motion.div>
  );
}
