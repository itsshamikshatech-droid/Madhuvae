import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="sc on" id="s-role">
      <div className="fs-center">
        <div style={{ textAlign: 'center', marginBottom: '8px' }} className="fu fu1">
          <div className="h1" style={{ fontSize: '34px' }}>Who are you?</div>
          <p className="sub">Choose your role to continue</p>
        </div>
        <div className="role-cards fu fu2">
          
          <div className="role-card" onClick={() => navigate('/login/user')}>
            <span className="role-icon">👤</span>
            <div className="role-info">
              <div className="role-name">User</div>
              <div className="role-desc">I am seeking a life partner within the Baduga community</div>
            </div>
            <span className="role-arrow">›</span>
          </div>

          <div className="role-card" onClick={() => navigate('/login/admin')}>
            <span className="role-icon">🛡️</span>
            <div className="role-info">
              <div className="role-name">Admin</div>
              <div className="role-desc">I verify community members in my assigned Seemai region</div>
            </div>
            <span className="role-arrow">›</span>
          </div>

          <div className="role-card" onClick={() => navigate('/login/owner')}>
            <span className="role-icon">👑</span>
            <div className="role-info">
              <div className="role-name">Owner</div>
              <div className="role-desc">Madhuve founder — full system control</div>
            </div>
            <span className="role-arrow">›</span>
          </div>

        </div>
        <button className="back-btn fu fu3" onClick={() => navigate('/')} style={{ marginTop: '16px' }}>← Back to Home</button>
      </div>
    </div>
  );
}
