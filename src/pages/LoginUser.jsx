import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../services/auth';

export default function LoginUser() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleSendOTP = async () => {
    const raw = phone.replace(/[\s\-+]/g, '');
    const cleanPhone = raw.startsWith('91') ? raw.slice(2) : raw;

    if (!cleanPhone || cleanPhone.length !== 10 || !/^\d+$/.test(cleanPhone)) {
      setMsg({ text: 'Please enter a valid 10-digit phone number.', type: 'nfe' });
      return;
    }

    setLoading(true);
    setMsg({ text: 'Sending OTP via SMS…', type: 'nfi' });

    try {
      const response = await sendOTP(cleanPhone);
      if (response.success) {
        setMsg({ text: `✅ OTP sent to +91 ${cleanPhone}. Check your SMS.`, type: 'nfs' });
        setTimeout(() => navigate('/otp', { state: { phone: cleanPhone } }), 600);
      } else {
        setMsg({ text: `Demo mode — OTP is ${response.otp}`, type: 'nfi' });
        setTimeout(() => navigate('/otp', { state: { phone: cleanPhone } }), 1000);
      }
    } catch (e) {
      setMsg({ text: 'Error sending OTP.', type: 'nfe' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sc on" id="s-login-user">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/role')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="h2">Welcome</div>
        <p className="sub">Enter your phone number to login or register</p>
      </div>
      <div className="form-body">
        <div className="field">
          <label>Phone Number</label>
          <input 
            type="tel" 
            placeholder="+91 98765 43210" 
            maxLength="13" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>
        {msg.text && (
          <div id="u-msg" style={{ minHeight: 0 }}>
            <div className={`nf ${msg.type}`} style={{ marginBottom: '12px' }}>{msg.text}</div>
          </div>
        )}
        <button className="btn btn-gold" disabled={loading} onClick={handleSendOTP}>
          {loading ? 'Sending…' : 'Send OTP →'}
        </button>
        <div className="divf"></div>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--hint)' }}>New to Madhuve?</p>
        <button className="btn btn-ghost" onClick={() => navigate('/signup')}>Create Account →</button>
      </div>
    </div>
  );
}
