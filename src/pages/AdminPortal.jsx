import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPortal() {
  const navigate = useNavigate();
  // Mock data
  const [stats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  return (
    <div className="sc on" id="s-admin">
      <div className="topbar">
        <div>
          <div className="topbar-title">Admin Panel</div>
          <div className="topbar-sub" id="admin-region-label">Your Seemai Region</div>
        </div>
        <button className="chip cr2" style={{ cursor: 'pointer', border: 'none', fontSize: '11px', fontWeight: 600 }} onClick={() => navigate('/')}>
          Logout
        </button>
      </div>
      
      <div className="sb" style={{ padding: '14px 20px' }}>
        <div className="sgrid" id="admin-stats">
          <div className="sbox">
            <div className="snum" id="as-total">{stats.total}</div>
            <div className="slbl">Total Assigned</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--warn)' }} id="as-pend">{stats.pending}</div>
            <div className="slbl">Pending Review</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--ok)' }} id="as-appr">{stats.approved}</div>
            <div className="slbl">Approved</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--err)' }} id="as-rej">{stats.rejected}</div>
            <div className="slbl">Rejected</div>
          </div>
        </div>

        <div className="section-label" style={{ marginTop: '4px' }}>Pending Applications</div>
        <div id="admin-apps">
          <div className="empty" style={{ padding: '30px 0' }}>
            <div className="empty-icon" style={{ fontSize: '36px' }}>📋</div>
            <div className="empty-title" style={{ fontSize: '18px' }}>No pending applications</div>
            <div className="empty-sub">New applications from your Seemai region will appear here.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
