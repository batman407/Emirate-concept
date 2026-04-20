import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './DestinationsSection.css';

const destinations = [
  {
    id: 'santorini',
    city: 'Santorini',
    country: 'Greece',
    mood: 'Idyllic Escape',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=700&q=85',
    featured: true,
  },
  {
    id: 'bali',
    city: 'Bali',
    country: 'Indonesia',
    mood: 'Spiritual Journey',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85',
  },
  {
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    mood: 'Urban Energy',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=700&q=85',
  },
  {
    id: 'maldives',
    city: 'Maldives',
    country: 'Indian Ocean',
    mood: 'Pure Serenity',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&q=85',
    featured: true,
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    mood: 'Timeless Harmony',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=85',
  },
  {
    id: 'capetown',
    city: 'Cape Town',
    country: 'South Africa',
    mood: 'Wild Beauty',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=700&q=85',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="destinations section" id="destinations" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="destinations__header"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider" />
          <p className="label destinations__eyebrow">Curated for Discerning Travellers</p>
          <div className="destinations__title-row">
            <h2 className="display-md destinations__title">
              Signature <em>Destinations</em>
            </h2>
            <a href="#" className="btn btn-ghost destinations__all-btn">
              View all destinations <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="destinations__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {destinations.map(dest => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DestinationCard({ dest }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={cardRef}
      className={`dest-tile ${dest.featured ? 'dest-tile--featured' : ''}`}
      variants={cardVariants}
      id={`dest-${dest.id}`}
    >
      <div className="dest-tile__media">
        <motion.img 
          src={dest.image} 
          alt={`${dest.city}, ${dest.country}`} 
          className="dest-tile__img" 
          loading="lazy"
          style={{ y, scale: 1.25 }}
        />
        <div className="dest-tile__overlay" />
      </div>

      <div className="dest-tile__content">
        <span className="label dest-tile__mood">{dest.mood}</span>
        <div className="dest-tile__meta">
          <div>
            <p className="dest-tile__country">{dest.country}</p>
            <h3 className="dest-tile__city">{dest.city}</h3>
          </div>
          <button className="dest-tile__arrow">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
