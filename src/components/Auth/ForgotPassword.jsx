import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setSent(true);
        setMessage({
          type: 'success',
          text: 'Password reset link sent! Check your email inbox.',
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Left Hero Panel */}
      <div className="auth-hero">
        <div className="auth-hero__bg" />
        <div className="auth-hero__pattern" />

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
            Don't worry, <span>we've got you</span>
          </h1>
          <p className="auth-hero__subtitle">
            Enter the email address associated with your Emirates account and we'll send you a link
            to reset your password.
          </p>
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
            <Link to="/login" className="auth-card__back">
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
            <h2 className="auth-card__title">Reset Password</h2>
            <p className="auth-card__subtitle">
              We'll send a password reset link to your email
            </p>
          </div>

          {message && (
            <motion.div
              className={`auth-message auth-message--${message.type}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
              {message.text}
            </motion.div>
          )}

          {!sent ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-field__label" htmlFor="reset-email">
                  Email Address
                </label>
                <div className="auth-field__input-wrap">
                  <Mail size={16} className="auth-field__icon" />
                  <input
                    id="reset-email"
                    className="auth-field__input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setMessage(null); }}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="auth-submit__spinner" />
                    Sending link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Send size={16} />
                  </>
                )}
              </button>

              <div className="auth-footer">
                Remember your password?{' '}
                <Link to="/login">Sign in</Link>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center', padding: '24px 0' }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <CheckCircle size={32} style={{ color: '#22c55e' }} />
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: 24,
              }}>
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Link to="/login" className="auth-submit" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                Back to Sign In
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
