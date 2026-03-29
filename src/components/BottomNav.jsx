import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="nav">
      <button className={`ni ${current === '/home' ? 'on' : ''}`} onClick={() => navigate('/home')}>
        <span className="ni-ic">🏠</span>
        <span className="ni-lb">Home</span>
      </button>
      <button className={`ni ${current === '/connections' ? 'on' : ''}`} onClick={() => navigate('/connections')}>
        <span className="ni-ic">💌</span>
        <span className="ni-lb">Connect</span>
      </button>
      <button className={`ni ${current === '/journey' ? 'on' : ''}`} onClick={() => navigate('/journey')}>
        <span className="ni-ic">📅</span>
        <span className="ni-lb">Journey</span>
      </button>
      <button className={`ni ${current === '/profile' ? 'on' : ''}`} onClick={() => navigate('/profile')}>
        <span className="ni-ic">👤</span>
        <span className="ni-lb">Me</span>
      </button>
    </div>
  );
}
