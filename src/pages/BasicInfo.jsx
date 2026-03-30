import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function BasicInfo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    role: '',
    timeline: ''
  });

  const handleNext = () => {
    if (!formData.name || !formData.phone || !formData.role || !formData.timeline) {
      alert("Please fill in all basic details to continue.");
      return;
    }
    navigate('/signup/community', { state: { step1: formData } });
  };

  return (
    <div className="sc on" id="s-basics">
      <div className="form-header">
        <div className="pbar" style={{ width: '25%' }}></div>
        <div className="h2">Basic Information</div>
        <p className="sub">Step 1 of 4 — About yourself</p>
      </div>
      
      <div className="form-body">
        <div className="nf nfi">Great to have you here! Help us with these basic details to personalize your experience.</div>

        <div className="field">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Your full name" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        
        <div className="field">
          <label>Phone Number</label>
          <input 
            type="tel" 
            placeholder="+91 98765 43210" 
            value={formData.phone} 
            onChange={e => setFormData({ ...formData, phone: e.target.value })} 
          />
        </div>

        <div className="field">
          <label>Email (read-only)</label>
          <input 
            type="email" 
            value={formData.email} 
            disabled 
            style={{ background: 'var(--gpale)', opacity: 0.7 }}
          />
        </div>

        <div className="field">
          <label>I am registering as</label>
          <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
            <option value="">Select</option>
            <option>Bride</option>
            <option>Groom</option>
            <option>Parent / Guardian</option>
          </select>
        </div>

        <div className="field">
          <label>Marriage Timeline</label>
          <select value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })}>
            <option value="">How soon are you ready?</option>
            <option>Ready immediately</option>
            <option>Within 6 months</option>
            <option>Within 1 year</option>
            <option>Just exploring</option>
          </select>
        </div>

        <button className="btn btn-gold" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}
