import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OWNER_EMAIL, OWNER_PASS } from '../services/auth';

export default function LoginOwner() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleLogin = () => {
    if (!email || !password) {
      setMsg({ text: 'Enter email and password.', type: 'nfe' });
      return;
    }
    if (email !== OWNER_EMAIL || password !== OWNER_PASS) {
      setMsg({ text: '❌ Invalid credentials. Only the Madhuve Owner can access this portal.', type: 'nfe' });
      return;
    }
    setMsg({ text: '✅ Owner access granted. Loading portal…', type: 'nfs' });
    
    // Set role=owner context here
    setTimeout(() => navigate('/owner'), 600);
  };

  return (
    <div className="sc on" id="s-login-owner">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/role')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="h2">Owner Login</div>
        <p className="sub">Madhuve founder access only</p>
      </div>
      <div className="form-body">
        <div className="owner-banner">
          <span style={{ fontSize: '28px' }}>👑</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cr)' }}>Madhuve Owner Portal</div>
            <div style={{ fontSize: '12px', color: 'var(--hint)' }}>Full system control · Restricted access</div>
          </div>
        </div>
        <div className="field">
          <label>Owner Email</label>
          <input type="email" placeholder="shamikshaanandkumar@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {msg.text && (
          <div style={{ minHeight: 0 }}>
            <div className={`nf ${msg.type}`}>{msg.text}</div>
          </div>
        )}
        <button className="btn btn-gold" onClick={handleLogin}>Enter Owner Portal →</button>
      </div>
    </div>
  );
}
