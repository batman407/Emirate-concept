import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, AlertCircle, CheckCircle, Plane } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const isSignUp = location.pathname === '/signup';
  const [mode, setMode] = useState(isSignUp ? 'signup' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage(null);
    navigate(newMode === 'signup' ? '/signup' : '/login', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(form.email, form.password);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        if (!form.firstName.trim()) {
          setMessage({ type: 'error', text: 'Please enter your first name.' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(form.email, form.password, {
          first_name: form.firstName,
          last_name: form.lastName,
          full_name: `${form.firstName} ${form.lastName}`.trim(),
        });
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({
            type: 'success',
            text: 'Account created! Check your email to confirm your account.',
          });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }

    setLoading(false);
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
  };

  return (
    <div className="auth-page">
      {/* Left Hero Panel */}
      <div className="auth-hero">
        <div className="auth-hero__bg" />
        <div className="auth-hero__pattern" />

        {/* Decorative SVG plane */}
        <svg className="auth-hero__plane" viewBox="0 0 200 200" fill="none">
          <path
            d="M100 10L120 60L190 80L130 100L140 190L100 140L60 190L70 100L10 80L80 60Z"
            stroke="rgba(201,169,110,0.3)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <div className="auth-hero__content">
          <img
            src="/emirates-logo.svg"
            alt="Emirates"
            className="auth-hero__logo"
          />
          <h1 className="auth-hero__tagline">
            Your journey begins <span>before you board</span>
          </h1>
          <p className="auth-hero__subtitle">
            Sign in to your Emirates account to manage bookings, earn Skywards Miles,
            and unlock exclusive benefits tailored to your travel style.
          </p>
          <div className="auth-hero__stats">
            <div>
              <span className="auth-hero__stat-value">160+</span>
              <span className="auth-hero__stat-label">Destinations</span>
            </div>
            <div>
              <span className="auth-hero__stat-value">30M+</span>
              <span className="auth-hero__stat-label">Skywards Members</span>
            </div>
            <div>
              <span className="auth-hero__stat-value">6★</span>
              <span className="auth-hero__stat-label">Rated Airline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="auth-card__header">
            <Link to="/" className="auth-card__back">
              <ArrowLeft size={14} />
              Back to home
            </Link>
            <h2 className="auth-card__title">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="auth-card__subtitle">
              {mode === 'login'
                ? 'Sign in to access your Emirates experience'
                : 'Join Emirates Skywards and start earning Miles'}
            </p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Messages */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                className={`auth-message auth-message--${message.type}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              className="auth-form"
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {mode === 'signup' && (
                <div className="auth-name-row">
                  <div className="auth-field">
                    <label className="auth-field__label" htmlFor="auth-first-name">
                      First Name
                    </label>
                    <div className="auth-field__input-wrap">
                      <User size={16} className="auth-field__icon" />
                      <input
                        id="auth-first-name"
                        className="auth-field__input"
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                      />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label className="auth-field__label" htmlFor="auth-last-name">
                      Last Name
                    </label>
                    <div className="auth-field__input-wrap">
                      <User size={16} className="auth-field__icon" />
                      <input
                        id="auth-last-name"
                        className="auth-field__input"
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-field__label" htmlFor="auth-email">
                  Email Address
                </label>
                <div className="auth-field__input-wrap">
                  <Mail size={16} className="auth-field__icon" />
                  <input
                    id="auth-email"
                    className="auth-field__input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-field__label" htmlFor="auth-password">
                  Password
                </label>
                <div className="auth-field__input-wrap">
                  <Lock size={16} className="auth-field__icon" />
                  <input
                    id="auth-password"
                    className="auth-field__input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    className="auth-field__toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === 'login' && (
                <div className="auth-options">
                  <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="auth-forgot">
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="auth-submit__spinner" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <Plane size={16} />
                  </>
                )}
              </button>

              <div className="auth-footer">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); switchMode('signup'); }}>
                      Create one
                    </a>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); switchMode('login'); }}>
                      Sign in
                    </a>
                  </>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
