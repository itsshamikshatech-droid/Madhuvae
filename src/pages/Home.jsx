import React from 'react';
import BottomNav from '../components/BottomNav';

export default function Home() {
  return (
    <div className="sc on" id="s-home">
      <div className="topbar">
        <div>
          <div className="topbar-title">Madhuve</div>
          <div className="topbar-sub">Your eligible matches</div>
        </div>
        <span className="chip cg" id="home-badge">✓ Verified</span>
      </div>
      
      <div className="sb" style={{ padding: '14px 20px 12px' }}>
        <div className="card-sm" style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--g1)', marginBottom: '9px' }}>Trust Score</div>
          <div className="trust-row" id="trust-display">
            <div className="ti ti-on">✓ ID Verified</div>
            <div className="ti ti-on">✓ Community</div>
            <div className="ti ti-on">✓ Photo</div>
            <div className="ti ti-off">○ Family</div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--hint)', marginTop: '6px' }}>
            Level: <strong style={{ color: 'var(--ok)' }}>High</strong> — Add family contact to reach Full.
          </div>
        </div>

        <div id="matches-list">
          <div className="empty">
            <div className="empty-icon">💑</div>
            <div className="empty-title">No matches yet</div>
            <div className="empty-sub">Eligible matches appear here after your account is verified. Matches are shown one at a time with intention.</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
