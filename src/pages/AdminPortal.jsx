import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc 
} from "firebase/firestore";

export default function AdminPortal() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this would come from the logged-in admin's profile
  const adminSeemai = "Thodha Naadu"; 

  useEffect(() => {
    const q = query(
      collection(db, "profiles"), 
      where("seemai", "==", adminSeemai)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedApps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApps(fetchedApps);
      setLoading(false);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminSeemai]);

  const approvedCount = apps.filter(a => a.status === 'approved' || a.verified === true).length;
  const rejectedCount = apps.filter(a => a.status === 'rejected').length;
  const pendingApps = apps.filter(a => a.status === 'pending');

  const handleAction = async (id, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      try {
        const userRef = doc(db, "profiles", id);
        await updateDoc(userRef, { 
          status: newStatus,
          verified: newStatus === 'approved' 
        });
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Action failed: " + error.message);
      }
    }
  };

  return (
    <div className="sc on" id="s-admin">
      <div className="topbar">
        <div>
          <div className="topbar-title">Admin Panel</div>
          <div className="topbar-sub" id="admin-region-label">{adminSeemai} Region</div>
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
            <div className="snum" style={{ color: 'var(--warn)' }} id="as-pend">{pendingApps.length}</div>
            <div className="slbl">Pending Review</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--ok)' }} id="as-appr">{approvedCount}</div>
            <div className="slbl">Approved</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--err)' }} id="as-rej">{rejectedCount}</div>
            <div className="slbl">Rejected</div>
          </div>
        </div>

        <div className="section-label" style={{ marginTop: '4px' }}>Pending Applications</div>
        <div id="admin-apps">
          {loading ? (
            <div className="nf nfi">⌛ Loading live applications...</div>
          ) : pendingApps.length === 0 ? (
            <div className="empty" style={{ padding: '30px 0' }}>
              <div className="empty-icon" style={{ fontSize: '36px' }}>📋</div>
              <div className="empty-title" style={{ fontSize: '18px' }}>No pending applications</div>
              <div className="empty-sub">All applications from your Seemai have been processed.</div>
            </div>
          ) : (
            pendingApps.map(u => (
              <div className="card" key={u.id} style={{ marginBottom: '12px' }}>
                <div className="arow" style={{ border: 'none', padding: '0 0 12px' }}>
                  <div className="aav">{u.name ? u.name[0] : '?'}</div>
                  <div className="ai">
                    <strong>{u.name}</strong>
                    <span>{u.seemai} · {u.ooru}</span>
                    <span style={{ color: 'var(--hint)' }}>Submitted · {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Today'}</span>
                  </div>
                  <span className="chip ca">Pending</span>
                </div>
                
                {u.photoUrl && (
                  <img src={u.photoUrl} alt="Profile" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                ) : (
                  <div className="nf nfe" style={{marginBottom: '12px'}}>No profile photo uploaded.</div>
                )}

                <div style={{ background: 'rgba(184,134,58,.06)', borderRadius: '12px', padding: '11px 13px', marginBottom: '12px', fontSize: '12.5px', color: 'var(--muted)', lineHeight: '1.65' }}>
                  <strong>Hatti:</strong> {u.hatti} · <strong>Lineage:</strong> {u.lineage || '—'}<br />
                  <strong>Age:</strong> {u.age} · <strong>City:</strong> {u.city} · <strong>Occ:</strong> {u.occupation}
                </div>
                
                {u.certUrl && (
                  <a href={u.certUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ marginBottom: '12px', display: 'block', textAlign: 'center' }}>
                    📄 View Community Certificate
                  </a>
                )}

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
