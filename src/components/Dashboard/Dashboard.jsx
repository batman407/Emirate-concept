import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Plane, Award, Settings, Bell, Search, LogOut,
  CreditCard, MapPin, Star, Clock, ChevronRight, Menu, X,
  Armchair, Globe, ArrowRight, Moon, Sun, TrendingUp, Users, Wallet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Dashboard.css';

// Mock data
const mockBookings = [
  {
    id: 1,
    from: 'Dubai (DXB)',
    to: 'London (LHR)',
    date: 'Aug 15, 2026',
    flight: 'EK 003',
    class: 'Business',
    status: 'confirmed',
  },
  {
    id: 2,
    from: 'London (LHR)',
    to: 'New York (JFK)',
    date: 'Sep 2, 2026',
    flight: 'EK 201',
    class: 'First Class',
    status: 'pending',
  },
  {
    id: 3,
    from: 'Dubai (DXB)',
    to: 'Tokyo (NRT)',
    date: 'Jul 5, 2026',
    flight: 'EK 318',
    class: 'Economy',
    status: 'completed',
  },
];

const mockActivity = [
  { id: 1, text: 'Earned <strong>2,500 Miles</strong> from flight EK 003', time: '2 hours ago', dot: 'gold' },
  { id: 2, text: 'Booking <strong>confirmed</strong> for Dubai → London', time: '1 day ago', dot: 'green' },
  { id: 3, text: 'Upgraded to <strong>Silver Tier</strong>', time: '3 days ago', dot: 'red' },
  { id: 4, text: 'Checked in for flight <strong>EK 318</strong>', time: '1 week ago', dot: 'blue' },
  { id: 5, text: 'Redeemed <strong>5,000 Miles</strong> for lounge access', time: '2 weeks ago', dot: 'gold' },
];

const sidebarNav = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'bookings', label: 'My Bookings', icon: Plane, badge: 2 },
  { key: 'miles', label: 'Miles & Rewards', icon: Award },
  { key: 'profile', label: 'Profile', icon: Users },
  { key: 'payments', label: 'Payment Methods', icon: CreditCard },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const quickActions = [
  { icon: Plane, label: 'Book a Flight', desc: 'Search & book flights' },
  { icon: Armchair, label: 'Online Check-in', desc: 'Check in for your flight' },
  { icon: Globe, label: 'Manage Booking', desc: 'Change or cancel trips' },
  { icon: MapPin, label: 'Lounge Access', desc: 'Find airport lounges' },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userName = user?.user_metadata?.full_name
    || user?.user_metadata?.first_name
    || user?.email?.split('@')[0]
    || 'Traveller';

  const userInitials = (() => {
    const first = user?.user_metadata?.first_name || '';
    const last = user?.user_metadata?.last_name || '';
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    if (first) return first[0].toUpperCase();
    return (user?.email?.[0] || 'U').toUpperCase();
  })();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="dashboard">
      {/* Sidebar Overlay (Mobile) */}
      <div
        className={`dash-sidebar-overlay ${sidebarOpen ? 'dash-sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="dash-sidebar__header">
          <Link to="/">
            <img src="/emirates-logo.svg" alt="Emirates" className="dash-sidebar__logo" />
          </Link>
        </div>

        <div className="dash-sidebar__profile">
          <div className="dash-sidebar__avatar">
            {userInitials}
            <div className="dash-sidebar__avatar-badge">
              <Star />
            </div>
          </div>
          <p className="dash-sidebar__user-name">{userName}</p>
          <p className="dash-sidebar__user-email">{user?.email}</p>
          <span className="dash-sidebar__tier dash-sidebar__tier--silver">
            <Star size={10} />
            Silver Member
          </span>
        </div>

        <nav className="dash-sidebar__nav">
          <p className="dash-sidebar__nav-label">Menu</p>
          {sidebarNav.map(item => (
            <button
              key={item.key}
              className={`dash-nav-item ${activeTab === item.key ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
            >
              <item.icon size={18} />
              {item.label}
              {item.badge && (
                <span className="dash-nav-item__badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar__footer">
          <button className="dash-signout" onClick={handleSignOut}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dash-main">
        {/* Top Bar */}
        <div className="dash-topbar">
          <div className="dash-topbar__left">
            <button
              className="dash-topbar__hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="dash-topbar__greeting">
              {getGreeting()}, <span>{userName.split(' ')[0]}</span>
            </h1>
          </div>
          <div className="dash-topbar__right">
            <button
              className="dash-topbar__btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="dash-topbar__btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="dash-topbar__btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="dash-topbar__notif-dot" />
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="dash-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stat Cards */}
          <motion.div className="dash-grid" variants={itemVariants}>
            <div className="dash-stat-card">
              <div className="dash-stat-card__header">
                <div className="dash-stat-card__icon dash-stat-card__icon--gold">
                  <Award size={22} />
                </div>
                <span className="dash-stat-card__change dash-stat-card__change--up">+2,500</span>
              </div>
              <p className="dash-stat-card__value">47,250</p>
              <p className="dash-stat-card__label">Skywards Miles</p>
            </div>

            <div className="dash-stat-card">
              <div className="dash-stat-card__header">
                <div className="dash-stat-card__icon dash-stat-card__icon--red">
                  <Plane size={22} />
                </div>
              </div>
              <p className="dash-stat-card__value">12</p>
              <p className="dash-stat-card__label">Flights This Year</p>
            </div>

            <div className="dash-stat-card">
              <div className="dash-stat-card__header">
                <div className="dash-stat-card__icon dash-stat-card__icon--blue">
                  <Globe size={22} />
                </div>
              </div>
              <p className="dash-stat-card__value">8</p>
              <p className="dash-stat-card__label">Countries Visited</p>
            </div>

            <div className="dash-stat-card">
              <div className="dash-stat-card__header">
                <div className="dash-stat-card__icon dash-stat-card__icon--green">
                  <Wallet size={22} />
                </div>
              </div>
              <p className="dash-stat-card__value">$240</p>
              <p className="dash-stat-card__label">Savings from Rewards</p>
            </div>
          </motion.div>

          {/* Tier Progress */}
          <motion.div className="dash-tier-card" variants={itemVariants}>
            <div className="dash-tier__info">
              <span className="dash-tier__current">
                <Star size={14} style={{ color: 'var(--champagne)', marginRight: 6, verticalAlign: 'middle' }} />
                Silver Tier
              </span>
              <span className="dash-tier__next">
                Next: <span>Gold</span> — 2,750 miles to go
              </span>
            </div>
            <div className="dash-tier__bar">
              <motion.div
                className="dash-tier__fill"
                initial={{ width: 0 }}
                animate={{ width: '62%' }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              />
            </div>
            <p className="dash-tier__miles-text">
              <span>47,250</span> / 50,000 Tier Miles
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="dash-section" variants={itemVariants}>
            <div className="dash-section__header">
              <h2 className="dash-section__title">Quick Actions</h2>
            </div>
            <div className="dash-actions-grid">
              {quickActions.map((action, i) => (
                <div key={i} className="dash-action-card">
                  <div className="dash-action-card__icon">
                    <action.icon size={22} />
                  </div>
                  <span className="dash-action-card__label">{action.label}</span>
                  <span className="dash-action-card__desc">{action.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* My Bookings */}
          <motion.div className="dash-section" variants={itemVariants}>
            <div className="dash-section__header">
              <h2 className="dash-section__title">My Bookings</h2>
              <button className="dash-section__action">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="dash-bookings">
              {mockBookings.map(booking => (
                <div key={booking.id} className="dash-booking-row">
                  <div className="dash-booking__icon">
                    <Plane size={20} />
                  </div>
                  <div className="dash-booking__route">
                    <p className="dash-booking__cities">
                      {booking.from}
                      <ArrowRight size={14} />
                      {booking.to}
                    </p>
                    <p className="dash-booking__meta">
                      {booking.flight} · {booking.date}
                    </p>
                  </div>
                  <span className="dash-booking__class">{booking.class}</span>
                  <span className={`dash-booking__status dash-booking__status--${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="dash-section" variants={itemVariants}>
            <div className="dash-section__header">
              <h2 className="dash-section__title">Recent Activity</h2>
              <button className="dash-section__action">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="dash-activity">
              {mockActivity.map(item => (
                <div key={item.id} className="dash-activity-item">
                  <div className={`dash-activity__dot dash-activity__dot--${item.dot}`} />
                  <p
                    className="dash-activity__text"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                  <span className="dash-activity__time">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
