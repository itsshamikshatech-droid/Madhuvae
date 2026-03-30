import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleLogin = async () => {
    if (!id || !password) {
      setMsg({ text: 'Enter your admin ID and password.', type: 'nfe' });
      return;
    }
    setMsg({ text: 'Checking credentials…', type: 'nfi' });
    
    // In a real app, query Firebase here.
    // auth.signInWithEmailAndPassword or fetch from custom admin collection.

    // Mock success
    setTimeout(() => {
      setMsg({ text: '✅ Logged in as Admin.', type: 'nfs' });
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="sc on" id="s-login-admin">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login')} style={{ marginBottom: '16px' }}>{t('back')}</button>
        <div className="h2">{t('admin_login')}</div>
        <p className="sub">Use the credentials provided by the Madhuve Team</p>
      </div>
      <div className="form-body">
        <div className="nf nfi">Admin accounts are created exclusively by the Madhuve system. Contact the administrator if you need access.</div>
        <div className="field">
          <label>Phone Number / Email</label>
          <input type="text" placeholder="Your admin ID" value={id} onChange={e => setId(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        
        {msg.text && (
          <div style={{ minHeight: 0 }}>
            <div className={`nf ${msg.type}`}>{msg.text}</div>
          </div>
        )}

        <button className="btn btn-gold" onClick={handleLogin}>Login as Admin →</button>
      </div>
    </div>
  );
}
