import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendFirebaseOTP } from '../services/auth';

export default function LoginUser() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleSendOTP = async () => {
    // 1. Clean the number (remove non-digits, leading 0, etc.)
    const cleanPhone = phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.length === 12 && cleanPhone.startsWith('91') 
      ? `+${cleanPhone}` 
      : cleanPhone.length === 10 
        ? `+91${cleanPhone}` 
        : cleanPhone;

    if (!/^\+91\d{10}$/.test(finalPhone)) {
      setMsg({ text: 'Please enter a valid 10-digit phone number.', type: 'nfe' });
      return;
    }

    setLoading(true);
    setMsg({ text: '📱 Requesting OTP from Firebase...', type: 'nfi' });

    try {
      const response = await sendFirebaseOTP(finalPhone, 'recaptcha-container');
      if (response.success) {
        setMsg({ text: `✅ OTP sent to ${finalPhone}. Check your SMS.`, type: 'nfs' });
        setTimeout(() => navigate('/login/otp', { state: { phone: finalPhone } }), 800);
      } else {
        setMsg({ text: `❌ ${response.error || 'Error sending OTP'}`, type: 'nfe' });
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
            placeholder="98765 43210" 
            maxLength="16" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <div style={{ fontSize: '11px', color: 'var(--hint)', marginTop: '4px' }}>Example: 98765 43210 or +91...</div>
        </div>
        
        {msg.text && (
          <div id="u-msg" style={{ minHeight: 0 }}>
            <div className={`nf ${msg.type}`} style={{ marginBottom: '12px' }}>{msg.text}</div>
          </div>
        )}

        <button 
          className="btn btn-gold" 
          disabled={loading} 
          onClick={handleSendOTP}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Sending…' : 'Send OTP →'}
        </button>

        {/* Firebase Invisible ReCAPTCHA Container */}
        <div id="recaptcha-container"></div>

        <div className="divf"></div>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--hint)' }}>New to Madhuve?</p>
        <button className="btn btn-ghost" onClick={() => navigate('/signup')}>Create Account →</button>
      </div>
    </div>
  );
}
