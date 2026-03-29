import React from 'react';
import BottomNav from '../components/BottomNav';

export default function Connections() {
  return (
    <div className="sc on" id="s-connections">
      <div className="topbar">
        <div>
          <div className="topbar-title">Connections</div>
          <div className="topbar-sub">Requests sent & received</div>
        </div>
      </div>
      <div className="sb" style={{ padding: '16px 20px' }}>
        <div className="empty">
          <div className="empty-icon">💌</div>
          <div className="empty-title">No connections yet</div>
          <div className="empty-sub">Connection requests you send and receive will appear here. Once accepted, in-app chat is enabled.</div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
