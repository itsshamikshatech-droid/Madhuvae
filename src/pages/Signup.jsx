import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../services/auth';
import { useLanguage } from '../context/LanguageContext';

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    const res = await signUpWithEmail(email, password);
    if (res.success) {
      setShowSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setError(res.error);
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (res.success) {
      setShowSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(res.error);
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="sc on">
        <div className="fs-center">
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎊</div>
          <div className="h2">Thank You for Joining!</div>
          <p className="sub" style={{ fontSize: '16px' }}>
            Your account has been created successfully. 
            We are redirecting you to the login page to start your journey.
          </p>
          <div className="nf nfs" style={{ marginTop: '24px' }}>
            Redirecting in a moment...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sc on" id="s-signup">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login')} style={{ marginBottom: '16px' }}>{t('back')}</button>
        <div className="h2">Create Your Account</div>
        <p className="sub">Join the Baduga Matrimony community</p>
      </div>
      
      <div className="form-body">
        {error && <div className="nf nfe">{error}</div>}

        <form onSubmit={handleEmailSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="field">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Choose Password</label>
            <input type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-gold" disabled={loading} type="submit">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)', opacity: 0.4 }}></div>
          <span style={{ fontSize: '11px', color: 'var(--hint)', fontWeight: 600, textTransform: 'uppercase' }}>or sign up with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)', opacity: 0.4 }}></div>
        </div>

        <button className="btn btn-outline" style={{ display: 'flex', gap: '10px' }} onClick={handleGoogleSignup} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Account
        </button>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--hint)' }}>
            Already have an account? <span style={{ color: 'var(--g1)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}
