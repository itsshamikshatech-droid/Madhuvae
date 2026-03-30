import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../services/auth';
import { useLanguage } from '../context/LanguageContext';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      setMsg({ text: 'Please enter your admin ID and password.', type: 'nfe' });
      return;
    }

    setLoading(true);
    setMsg({ text: 'Verifying administrative access...', type: 'nfi' });
    
    // For admin, we assume their ID is an email or we handle accordingly
    const res = await signInWithEmail(id, password);
    if (res.success) {
      setMsg({ text: '✅ Access Authorized. Redirecting...', type: 'nfs' });
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      setMsg({ text: '❌ Access Denied. Invalid admin credentials.', type: 'nfe' });
      setLoading(false);
    }
  };

  return (
    <div className="sc on" id="s-admin-auth">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login')} style={{ marginBottom: '16px' }}>{t('back')}</button>
        <div className="h2">Admin Access</div>
        <p className="sub">Secure portal for Madhuve administrators</p>
      </div>
      
      <div className="form-body">
        <div className="nf nfi">Admin accounts are exclusive. Use the special credentials provided to you.</div>
        
        {msg.text && <div className={`nf ${msg.type}`} style={{ marginTop: '16px' }}>{msg.text}</div>}

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          <div className="field">
            <label>Admin ID / Email</label>
            <input type="text" placeholder="admin@madhuve.com" value={id} onChange={e => setId(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-gold" disabled={loading} type="submit" style={{ background: 'var(--ink)', color: '#fff' }}>
            {loading ? 'Authorizing...' : 'Authorize Access'}
          </button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.6 }}>
          <p style={{ fontSize: '12px' }}>Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
}
