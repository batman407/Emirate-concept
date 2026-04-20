import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeftRight, Calendar, Users, PlaneTakeoff, PlaneLanding, Search } from 'lucide-react';
import './BookingPanel.css';

const tabs = ['Search Flights', 'Manage Booking', 'Check-in', 'Flight Status'];

const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First Class'];
const popularRoutes = ['Dubai → London', 'Dubai → New York', 'Dubai → Sydney', 'Dubai → Tokyo'];

export default function BookingPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [tripType, setTripType] = useState('return');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [from, setFrom] = useState('Dubai (DXB)');
  const [to, setTo] = useState('');
  const [swapped, setSwapped] = useState(false);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengers, setShowPassengers] = useState(false);

  const handleSwap = () => {
    setFrom(to || 'Dubai (DXB)');
    setTo(from === 'Dubai (DXB)' ? '' : from);
    setSwapped(!swapped);
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const adj = (type, delta) => {
    setPassengers(p => ({
      ...p,
      [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(9, p[type] + delta))
    }));
  };

  return (
    <section className="booking" id="booking">
      <div className="booking__panel">
        {/* Tabs */}
        <div className="booking__tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`booking__tab ${activeTab === i ? 'booking__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Panel Body */}
        <div className="booking__body">
          {activeTab === 0 && (
            <motion.div
              className="booking__flight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Options row */}
              <div className="booking__options">
                <div className="booking__trip-types">
                  {['return', 'one-way', 'multi-city'].map(t => (
                    <button
                      key={t}
                      className={`booking__trip-btn ${tripType === t ? 'booking__trip-btn--active' : ''}`}
                      onClick={() => setTripType(t)}
                    >
                      {t.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </button>
                  ))}
                </div>
                <div className="booking__cabin-select">
                  <select
                    value={cabinClass}
                    onChange={e => setCabinClass(e.target.value)}
                    className="booking__select"
                    aria-label="Cabin class"
                  >
                    {cabinClasses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main form */}
              <div className="booking__form">
                {/* From / To */}
                <div className="booking__route">
                  <div className="booking__field booking__field--route">
                    <label className="booking__label">
                      <PlaneTakeoff size={14} /> From
                    </label>
                    <input
                      type="text"
                      className="booking__input"
                      placeholder="City or airport"
                      value={from}
                      onChange={e => setFrom(e.target.value)}
                      aria-label="Departure city"
                    />
                  </div>

                  <button
                    className={`booking__swap ${swapped ? 'booking__swap--rotated' : ''}`}
                    onClick={handleSwap}
                    aria-label="Swap destinations"
                  >
                    <ArrowLeftRight size={16} />
                  </button>

                  <div className="booking__field booking__field--route">
                    <label className="booking__label">
                      <PlaneLanding size={14} /> To
                    </label>
                    <input
                      type="text"
                      className="booking__input"
                      placeholder="City or airport"
                      value={to}
                      onChange={e => setTo(e.target.value)}
                      aria-label="Destination city"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="booking__dates">
                  <div className="booking__field">
                    <label className="booking__label">
                      <Calendar size={14} /> Depart
                    </label>
                    <input
                      type="date"
                      className="booking__input"
                      value={departDate}
                      onChange={e => setDepartDate(e.target.value)}
                      aria-label="Departure date"
                    />
                  </div>
                  {tripType === 'return' && (
                    <div className="booking__field">
                      <label className="booking__label">
                        <Calendar size={14} /> Return
                      </label>
                      <input
                        type="date"
                        className="booking__input"
                        value={returnDate}
                        onChange={e => setReturnDate(e.target.value)}
                        aria-label="Return date"
                      />
                    </div>
                  )}
                </div>

                {/* Passengers */}
                <div className="booking__pax-wrapper" style={{ position: 'relative' }}>
                  <div className="booking__field">
                    <label className="booking__label">
                      <Users size={14} /> Passengers
                    </label>
                    <button
                      className="booking__input booking__pax-trigger"
                      onClick={() => setShowPassengers(!showPassengers)}
                      aria-expanded={showPassengers}
                    >
                      {totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}
                    </button>
                  </div>

                  {showPassengers && (
                    <motion.div
                      className="pax-dropdown"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {[
                        { label: 'Adults', sub: '16+ years', key: 'adults' },
                        { label: 'Children', sub: '2–15 years', key: 'children' },
                        { label: 'Infants', sub: 'Under 2', key: 'infants' }
                      ].map(({ label, sub, key }) => (
                        <div key={key} className="pax-row">
                          <div>
                            <p className="pax-label">{label}</p>
                            <p className="pax-sub">{sub}</p>
                          </div>
                          <div className="pax-controls">
                            <button className="pax-btn" onClick={() => adj(key, -1)} aria-label={`Decrease ${label}`}>−</button>
                            <span className="pax-count">{passengers[key]}</span>
                            <button className="pax-btn" onClick={() => adj(key, 1)} aria-label={`Increase ${label}`}>+</button>
                          </div>
                        </div>
                      ))}
                      <button className="pax-done" onClick={() => setShowPassengers(false)}>Done</button>
                    </motion.div>
                  )}
                </div>

                {/* Search button */}
                <button className="booking__search-btn">
                  <Search size={18} />
                  Search Flights
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Popular routes */}
              <div className="booking__popular">
                <span className="label" style={{ color: 'var(--text-muted)' }}>Popular:</span>
                <div className="booking__popular-routes">
                  {popularRoutes.map((r, i) => (
                    <button
                      key={i}
                      className="booking__popular-route"
                      onClick={() => {
                        const [f, t] = r.split(' → ');
                        setFrom(f);
                        setTo(t);
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div className="booking__manage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="booking__form">
                <div className="booking__field">
                  <label className="booking__label">Booking Reference</label>
                  <input type="text" className="booking__input" placeholder="e.g. EMAB12" />
                </div>
                <div className="booking__field">
                  <label className="booking__label">Last Name</label>
                  <input type="text" className="booking__input" placeholder="As on passport" />
                </div>
                <button className="booking__search-btn">Retrieve Booking <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div className="booking__manage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="booking__form">
                <div className="booking__field">
                  <label className="booking__label">Booking Reference</label>
                  <input type="text" className="booking__input" placeholder="e.g. EMAB12" />
                </div>
                <div className="booking__field">
                  <label className="booking__label">Family Name</label>
                  <input type="text" className="booking__input" placeholder="As on passport" />
                </div>
                <button className="booking__search-btn">Check In Now <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div className="booking__manage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="booking__form">
                <div className="booking__field">
                  <label className="booking__label">Flight Number</label>
                  <input type="text" className="booking__input" placeholder="e.g. EK001" />
                </div>
                <div className="booking__field">
                  <label className="booking__label">Date</label>
                  <input type="date" className="booking__input" />
                </div>
                <button className="booking__search-btn">Check Status <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
