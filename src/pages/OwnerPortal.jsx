import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerPortal() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([
    { id: 1, name: 'S. Bhojan', seemai: 'Thodha Naadu', role: 'Village Elder', phone: '9876543210', active: true },
    { id: 2, name: 'H. Mani', seemai: 'Porangaadu', role: 'Community Leader', phone: '9876543211', active: true }
  ]);
  const [users] = useState([
    { id: 1, name: 'Lingesh', seemai: 'Thodha Naadu', city: 'Coimbatore', verified: false },
    { id: 2, name: 'Madhavi', seemai: 'Thodha Naadu', city: 'Ooty', verified: true }
  ]);

  const stats = {
    users: users.length,
    verified: users.filter(u => u.verified).length,
    pending: users.filter(u => !u.verified).length,
    admins: admins.filter(a => a.active).length
  };

  const removeAdmin = (id) => {
    if (window.confirm('Are you sure you want to deactivate this admin?')) {
      setAdmins(admins.map(a => a.id === id ? { ...a, active: false } : a));
    }
  };

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
          {admins.filter(a => a.active).map(a => (
            <div className="arow" key={a.id}>
              <div className="aav">{a.name[0]}</div>
              <div className="ai">
                <strong>{a.name}</strong>
                <span>{a.seemai} · {a.role}</span>
                <span>{a.phone}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                <span className="chip cg">Active</span>
                <button onClick={() => removeAdmin(a.id)} style={{ fontSize: '10px', color: 'var(--err)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-label">All Users</div>
        <div id="owner-users-list">
          <div className="card">
            {users.map(u => (
              <div className="arow" key={u.id}>
                <div className="aav">{u.name[0]}</div>
                <div className="ai">
                  <strong>{u.name}</strong>
                  <span>{u.seemai} · {u.city}</span>
                </div>
                {u.verified ? <span className="chip cg">✓ Verified</span> : <span className="chip ca">Pending</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
}
