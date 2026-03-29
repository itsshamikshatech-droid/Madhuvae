import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddAdmin() {
  const navigate = useNavigate();

  return (
    <div className="sc on" id="s-add-admin">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/owner')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="h2">Add Admin</div>
        <p className="sub">Create an admin account and assign their Seemai region</p>
      </div>
      <div className="form-body">
        <div className="nf nfi" style={{ fontSize: '12.5px' }}>
          This person will receive applications only from their assigned Seemai. Each application goes to exactly one admin — no duplication.
        </div>
        
        <div className="field">
          <label>Full Name</label>
          <input type="text" placeholder="Admin's full name" />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input type="tel" placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="field">
          <label>Email (used for login)</label>
          <input type="email" placeholder="admin@example.com" />
        </div>
        
        <div className="field">
          <label>Assign to Seemai Region</label>
          <select>
            <option value="">Select Seemai region</option>
            <option>Thodha Naadu</option>
            <option>Porangaadu</option>
            <option>Mekku Naadu</option>
            <option>Kundhe Naadu</option>
          </select>
        </div>
        <div className="field">
          <label>Role / Title</label>
          <input type="text" placeholder="e.g. Village Elder, Community Leader" />
        </div>
        <div className="field">
          <label>Initial Password</label>
          <input type="password" placeholder="They must change on first login" />
        </div>
        
        <div className="nf nfw">Login credentials will be shared with the admin via SMS. They must change their password on first login.</div>
        <button className="btn btn-gold" style={{ marginTop: '8px' }} onClick={() => navigate('/owner')}>Create Admin Account →</button>
      </div>
    </div>
  );
}
