import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerPortal() {
  const navigate = useNavigate();
  const [stats] = useState({ users: 0, verified: 0, pending: 0, admins: 0 });

  return (
    <div className="sc on" id="s-owner">
      <div className="topbar">
        <div>
          <div className="topbar-title" style={{ color: 'var(--cr)' }}>👑 Owner Portal</div>
          <div className="topbar-sub">Full system control</div>
        </div>
        <button className="chip cr2" style={{ cursor: 'pointer', border: 'none', fontSize: '11px', fontWeight: 600 }} onClick={() => navigate('/')}>
          Logout
        </button>
      </div>

      <div className="sb" style={{ padding: '14px 20px' }}>
        <div className="sgrid" id="owner-stats">
          <div className="sbox">
            <div className="snum" id="os-users">{stats.users}</div>
            <div className="slbl">Total Users</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--ok)' }} id="os-ver">{stats.verified}</div>
            <div className="slbl">Verified</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--warn)' }} id="os-pend">{stats.pending}</div>
            <div className="slbl">Pending</div>
          </div>
          <div className="sbox">
            <div className="snum" id="os-adm">{stats.admins}</div>
            <div className="slbl">Admins</div>
          </div>
        </div>

        <div className="section-label">Admin Management</div>
        <button className="btn btn-gold" onClick={() => navigate('/owner/add-admin')} style={{ marginBottom: '14px' }}>
          + Add New Admin
        </button>

        <div className="card" id="owner-admins-list">
          <div className="empty" style={{ padding: '20px 0' }}>
            <div className="empty-icon" style={{ fontSize: '32px' }}>🛡️</div>
            <div className="empty-title" style={{ fontSize: '17px' }}>No admins added yet</div>
            <div className="empty-sub" style={{ fontSize: '12.5px' }}>Add your first admin above.</div>
          </div>
        </div>

        <div className="section-label">All Users</div>
        <div id="owner-users-list">
          <div className="empty" style={{ padding: '20px 0' }}>
            <div className="empty-icon" style={{ fontSize: '32px' }}>👥</div>
            <div className="empty-title" style={{ fontSize: '17px' }}>No users registered yet</div>
            <div className="empty-sub" style={{ fontSize: '12.5px' }}>Registered users appear here.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
