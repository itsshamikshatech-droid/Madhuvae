import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function MyProfile() {
  const navigate = useNavigate();

  return (
    <div className="sc on" id="s-myprofile">
      <div className="topbar">
        <div>
          <div className="topbar-title">My Profile</div>
        </div>
        <button 
          className="btn-err btn btn-sm" 
          style={{ width: 'auto' }} 
          onClick={() => {
            if(window.confirm('Are you sure you want to logout?')) {
              navigate('/');
            }
          }}
        >
          Logout
        </button>
      </div>
      <div className="sb" style={{ padding: '16px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', paddingTop: '8px' }}>
          <div className="photo-ring" style={{ width: '90px', height: '90px', fontSize: '34px', margin: '0 auto 12px' }}>
            <span id="myp-avatar">👤</span>
            <div className="photo-lock-badge">🔒</div>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600 }}>Your Name</div>
          
          <div className="trust-row" style={{ justifyContent: 'center', marginTop: '9px' }}>
            <div className="ti ti-on" style={{ fontSize: '10.5px' }}>✓ ID</div>
            <div className="ti ti-on" style={{ fontSize: '10.5px' }}>✓ Community</div>
            <div className="ti ti-on" style={{ fontSize: '10.5px' }}>✓ Photo</div>
            <div className="ti ti-off" style={{ fontSize: '10.5px' }}>○ Family</div>
          </div>
        </div>
        
        <div className="card" id="myp-details">
          <div className="irow">
            <span className="lbl">Seemai</span><span className="val" id="myp-seemai">—</span>
          </div>
          <div className="irow">
            <span className="lbl">Ooru</span><span className="val" id="myp-ooru">—</span>
          </div>
          <div className="irow">
            <span className="lbl">Hatti</span><span className="val" id="myp-hatti">—</span>
          </div>
        </div>
        <button className="btn btn-outline" style={{ marginTop: '4px' }}>Edit Profile</button>
      </div>
      <BottomNav />
    </div>
  );
}
