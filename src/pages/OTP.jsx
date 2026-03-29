import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, sendOTP } from '../services/auth';

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || 'Unknown';
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const inputs = useRef([]);

  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      setMsg({ text: 'Enter all 4 digits.', type: 'nfe' });
      return;
    }

    const { success } = verifyOTP(code);
    if (success) {
      setMsg({ text: '✅ Phone verified!', type: 'nfs' });
      // In a real app, you would set a user token in state here.
      setTimeout(() => navigate('/signup'), 600);
    } else {
      setMsg({ text: '❌ Incorrect OTP. Try again or resend.', type: 'nfe' });
    }
  };

  const handleResend = async () => {
    setMsg({ text: 'Resending...', type: 'nfi' });
    const response = await sendOTP(phone);
    if (!response.success) {
      setMsg({ text: `Demo mode — new OTP is ${response.otp}`, type: 'nfi' });
    }
  };

  return (
    <div className="sc on" id="s-otp">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login/user')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="h2">Enter OTP</div>
        <p className="sub">4-digit code sent to +91 {phone}</p>
      </div>
      <div className="form-body" style={{ alignItems: 'center' }}>
        
        {msg.text && (
          <div style={{ width: '100%', minHeight: 0 }}>
            <div className={`nf ${msg.type}`}>{msg.text}</div>
          </div>
        )}

        <div className="otp-row" style={{ width: '100%' }}>
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
        <button className="btn btn-gold" style={{ width: '100%' }} onClick={handleVerify}>Verify & Continue →</button>
        <button className="btn btn-ghost" style={{ marginTop: '8px' }} onClick={handleResend}>Resend OTP</button>
      </div>
    </div>
  );
}
