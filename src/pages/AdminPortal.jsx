import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([
    { id: 1, name: 'Lingesh', seemai: 'Thodha Naadu', ooru: 'Kallatti_Ooru', hatti: 'Kallatti', age: 26, occupation: 'Software Engineer', city: 'Coimbatore', status: 'pending' },
    { id: 2, name: 'Madhavi', seemai: 'Thodha Naadu', ooru: 'Kallatti_Ooru', hatti: 'Mynale', age: 24, occupation: 'Teacher', city: 'Ooty', status: 'pending' },
    { id: 3, name: 'Gowtham', seemai: 'Thodha Naadu', ooru: 'Kallatti_Ooru', hatti: 'Sholur', age: 28, occupation: 'Farmer', city: 'Ooty', status: 'pending' }
  ]);

  const approved = apps.filter(a => a.status === 'approved').length;
  const rejected = apps.filter(a => a.status === 'rejected').length;
  const pending = apps.filter(a => a.status === 'pending').length;

  const handleAction = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
  };

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
            <div className="snum" id="as-total">{apps.length}</div>
            <div className="slbl">Total Assigned</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--warn)' }} id="as-pend">{pending}</div>
            <div className="slbl">Pending Review</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--ok)' }} id="as-appr">{approved}</div>
            <div className="slbl">Approved</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--err)' }} id="as-rej">{rejected}</div>
            <div className="slbl">Rejected</div>
          </div>
        </div>

        <div className="section-label" style={{ marginTop: '4px' }}>Pending Applications</div>
        <div id="admin-apps">
          {pending === 0 ? (
            <div className="empty" style={{ padding: '30px 0' }}>
              <div className="empty-icon" style={{ fontSize: '36px' }}>📋</div>
              <div className="empty-title" style={{ fontSize: '18px' }}>No pending applications</div>
              <div className="empty-sub">All applications from your Seemai have been processed.</div>
            </div>
          ) : (
            apps.filter(a => a.status === 'pending').map(u => (
              <div className="card" key={u.id} style={{ marginBottom: '12px' }}>
                <div className="arow" style={{ border: 'none', padding: '0 0 12px' }}>
                  <div className="aav">{u.name[0]}</div>
                  <div className="ai">
                    <strong>{u.name}</strong>
                    <span>{u.seemai} · {u.ooru}</span>
                    <span style={{ color: 'var(--hint)' }}>Submitted · Today</span>
                  </div>
                  <span className="chip ca">Pending</span>
                </div>
                <div style={{ background: 'rgba(184,134,58,.06)', borderRadius: '12px', padding: '11px 13px', marginBottom: '12px', fontSize: '12.5px', color: 'var(--muted)', lineHeight: '1.65' }}>
                  <strong>Hatti:</strong> {u.hatti} · <strong>Lineage:</strong> —<br />
                  <strong>Age:</strong> {u.age} · <strong>City:</strong> {u.city} · <strong>Occ:</strong> {u.occupation}
                </div>
                <div className="btn-row">
                  <button className="btn btn-ok btn-sm" onClick={() => handleAction(u.id, 'approved')}>✓ Approve</button>
                  <button className="btn btn-err btn-sm" onClick={() => handleAction(u.id, 'rejected')}>Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ height: '40px' }} /> {/* Spacing */}
      </div>
    </div>
  );
}
