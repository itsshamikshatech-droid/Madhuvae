import React from 'react';
import BottomNav from '../components/BottomNav';

export default function Journey() {
  return (
    <div className="sc on" id="s-journey">
      <div className="topbar">
        <div>
          <div className="topbar-title">Marriage Journey</div>
          <div className="topbar-sub">Your progress tracker</div>
        </div>
      </div>
      <div className="sb" style={{ padding: '16px 20px' }}>
        <div className="empty">
          <div className="empty-icon">📅</div>
          <div className="empty-title">Journey begins with a connection</div>
          <div className="empty-sub">Once you and another person accept each other's connection, your marriage journey tracker appears here.</div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
