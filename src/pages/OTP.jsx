import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyFirebaseOTP, sendFirebaseOTP } from '../services/auth';

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || 'Unknown Phone';
  
  // Firebase Auth usually uses 6 digits
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputs.current[0]) inputs.current[0].focus();
    
    // Safety check: if no confirmationResult, go back to login
    if (!window.confirmationResult) {
      navigate('/login/user');
    }
  }, [navigate]);

  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const digit = val.slice(-1); // only take last char if they paste/type fast
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setMsg({ text: 'Please enter the full 6-digit code.', type: 'nfe' });
      return;
    }

    setLoading(true);
    setMsg({ text: '⌛ Verifying code...', type: 'nfi' });

    try {
      const response = await verifyFirebaseOTP(code);
      if (response.success) {
        setMsg({ text: '✅ Phone verified! Redirecting...', type: 'nfs' });
        // After verification, proceed to Signup (or check if user already exists in DB)
        setTimeout(() => navigate('/signup'), 800);
      } else {
        setMsg({ text: `❌ ${response.error || 'Invalid OTP. Please try again.'}`, type: 'nfe' });
      }
    } catch (e) {
      setMsg({ text: 'Error during verification.', type: 'nfe' });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setMsg({ text: 'Resending code...', type: 'nfi' });
    const response = await sendFirebaseOTP(phone, 'recaptcha-container-resend');
    if (response.success) {
      setMsg({ text: '✅ New OTP sent!', type: 'nfs' });
    } else {
      setMsg({ text: `❌ ${response.error}`, type: 'nfe' });
    }
  };

  return (
    <div className="sc on" id="s-otp">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login/user')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="h2">Enter OTP</div>
        <p className="sub">6-digit code sent to {phone}</p>
      </div>
      <div className="form-body" style={{ alignItems: 'center' }}>
        
        {msg.text && (
          <div style={{ width: '100%', minHeight: 0 }}>
            <div className={`nf ${msg.type}`}>{msg.text}</div>
          </div>
        )}

        <div className="otp-row" style={{ width: '100%', gap: '8px' }}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              className="obox"
              maxLength="1"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        
        <button 
          className="btn btn-gold" 
          disabled={loading} 
          onClick={handleVerify}
          style={{ width: '100%', opacity: loading ? 0.7 : 1, marginTop: '20px' }}
        >
          {loading ? 'Verifying...' : 'Verify & Continue →'}
        </button>
        
        <button className="btn btn-ghost" style={{ marginTop: '8px' }} onClick={handleResend}>Resend OTP</button>
        <div id="recaptcha-container-resend"></div>
      </div>
    </div>
  );
}
