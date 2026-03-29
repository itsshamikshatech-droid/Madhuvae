import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: '', timeline: '' });

  return (
    <div className="sc on" id="s-signup">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/login/user')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="pbar" style={{ width: '25%' }}></div>
        <div className="h2">Create Account</div>
        <p className="sub">Step 1 of 4 — Your Details</p>
      </div>
      <div className="form-body">
        <div className="field">
          <label>Full Name</label>
          <input type="text" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="field">
          <label>Email (optional)</label>
          <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
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
        <button className="btn btn-gold" onClick={() => navigate('/signup/community')}>Continue →</button>
      </div>
    </div>
  );
}
