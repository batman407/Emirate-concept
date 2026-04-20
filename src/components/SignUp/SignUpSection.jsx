import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import './SignUpSection.css';

const preferences = ['Business travel', 'Leisure travel', 'Family travel', 'First Class', 'Luxury stays', 'Adventure'];
const regions = ['Middle East', 'Europe', 'Asia Pacific', 'Americas', 'Africa', 'Australia'];

export default function SignUpSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const togglePref = (pref) => {
    setSelectedPrefs(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="signup section" id="signup" ref={ref}>
      {/* Background */}
      <div className="signup__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=70"
          alt=""
          className="signup__bg-img"
        />
        <div className="signup__bg-overlay" />
      </div>

      <div className="container">
        <motion.div
          className="signup__card"
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {!submitted ? (
            <>
              <div className="signup__header">
                <div className="section-divider" style={{ margin: '0 auto 20px' }} />
                <p className="label signup__eyebrow">Stay Inspired</p>
                <h2 className="display-md signup__title">
                  Begin Your Next <em>Journey</em>
                </h2>
                <p className="body-lg signup__desc">
                  Be the first to discover new destinations, exclusive offers, and premium travel experiences from Emirates.
                </p>
              </div>

              <form className="signup__form" onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="signup__field">
                  <label htmlFor="signup-email" className="signup__label">Email address</label>
                  <input
                    id="signup-email"
                    type="email"
                    className="signup__input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>

                {/* Region */}
                <div className="signup__field">
                  <label htmlFor="signup-region" className="signup__label">Your region</label>
                  <select
                    id="signup-region"
                    className="signup__input signup__select"
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    aria-label="Select your region"
                  >
                    <option value="">Select region (optional)</option>
                    {regions.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Preferences */}
                <div className="signup__prefs-section">
                  <p className="signup__label">Travel interests (optional)</p>
                  <div className="signup__prefs">
                    {preferences.map(pref => (
                      <button
                        key={pref}
                        type="button"
                        className={`signup__pref ${selectedPrefs.includes(pref) ? 'signup__pref--active' : ''}`}
                        onClick={() => togglePref(pref)}
                        aria-pressed={selectedPrefs.includes(pref)}
                      >
                        {selectedPrefs.includes(pref) && <Check size={12} />}
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary signup__submit">
                  Stay Inspired <ArrowRight size={16} />
                </button>

                <p className="signup__privacy">
                  By subscribing, you agree to our <a href="#">privacy policy</a>. Unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <motion.div
              className="signup__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="signup__success-icon">
                <Check size={32} />
              </div>
              <h3 className="heading-xl">Welcome Aboard</h3>
              <p className="body-lg">
                Thank you for joining the Emirates world. Your next journey begins here.
              </p>
              <p className="signup__success-sub">A confirmation has been sent to <strong>{email}</strong></p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
