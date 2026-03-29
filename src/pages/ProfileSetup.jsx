import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Basic validation mock
    navigate('/signup/pending');
  };

  return (
    <div className="sc on" id="s-profile-setup">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/signup/upload')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="pbar" style={{ width: '100%' }}></div>
        <div className="h2">Your Profile</div>
        <p className="sub">Step 4 of 4 — Personal details</p>
      </div>
      <div className="form-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Age</label>
            <input type="number" placeholder="25" min="18" max="60" />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Height (cm)</label>
            <input type="number" placeholder="165" />
          </div>
        </div>
        <div className="field" style={{ marginTop: '14px' }}>
          <label>Education</label>
          <select>
            <option value="">Select</option>
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>PhD</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Occupation</label>
          <input type="text" placeholder="e.g. Teacher, Engineer, Farmer" />
        </div>
        <div className="field">
          <label>Current City</label>
          <input type="text" placeholder="e.g. Coimbatore, Bengaluru, Chennai" />
        </div>
        <div className="field">
          <label>About Me</label>
          <textarea placeholder="A thoughtful note about yourself that families will read. Be genuine."></textarea>
        </div>
        <div className="section-label">Match Preferences</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Min Age</label>
            <input type="number" placeholder="22" />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Max Age</label>
            <input type="number" placeholder="32" />
          </div>
        </div>
        <div className="field" style={{ marginTop: '14px' }}>
          <label>Preferred City</label>
          <input type="text" placeholder="Any city, or specify your preference" />
        </div>
        <div className="field">
          <label>Family Members' Phones (optional)</label>
          <input type="text" placeholder="Comma-separated phone numbers — notified of requests" />
        </div>
        <button className="btn btn-gold" style={{ marginTop: '6px' }} onClick={handleComplete}>Complete Registration →</button>
      </div>
    </div>
  );
}
