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
  // For now, we'll default to 'Thodha Naadu' for the admin demo
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

  const approvedCount = apps.filter(a => a.verified === true).length;
  const pendingApps = apps.filter(a => !a.verified && a.status !== 'rejected');
  const rejectedCount = apps.filter(a => a.status === 'rejected').length;

  const handleAction = async (user, newStatus) => {
    const actionText = newStatus === 'approved' ? 'Approve & Issue Baduga Badge' : 'Reject';
    if (window.confirm(`Are you sure you want to ${actionText} for ${user.name}?`)) {
      try {
        const userRef = doc(db, "profiles", user.id);
        await updateDoc(userRef, { 
          status: newStatus,
          verified: newStatus === 'approved',
          verifiedAt: newStatus === 'approved' ? new Date().toISOString() : null
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
          <div className="topbar-title">Admin Portal</div>
          <div className="topbar-sub">{adminSeemai} Seemai</div>
        </div>
        <button 
          className="chip" 
          style={{ cursor: 'pointer', border: '1px solid var(--border)', fontSize: '11px', fontWeight: 600, background: '#fff' }} 
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </div>
      
      <div className="sb" style={{ padding: '14px 20px' }}>
        <div className="sgrid">
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--warn)' }}>{pendingApps.length}</div>
            <div className="slbl">New Apps</div>
          </div>
          <div className="sbox">
            <div className="snum" style={{ color: 'var(--ok)' }}>{approvedCount}</div>
            <div className="slbl">Badges Issued</div>
          </div>
        </div>

        <div className="section-label" style={{ marginTop: '24px' }}>Review Applications</div>
        
        {loading ? (
          <div className="nf nfi">⌛ Fetching community applications...</div>
        ) : pendingApps.length === 0 ? (
          <div className="empty" style={{ padding: '40px 0' }}>
            <div className="empty-icon" style={{ fontSize: '40px' }}>✅</div>
            <div className="empty-title">All Caught Up!</div>
            <div className="empty-sub">No pending applications for {adminSeemai}.</div>
          </div>
        ) : (
          pendingApps.map(u => (
            <div className="card" key={u.id} style={{ border: '2px solid var(--gpale)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--g1)', color: '#fff', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {u.name ? u.name[0] : '?'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--hint)' }}>{u.ooru} · {u.hatti}</div>
                </div>
                <span className="chip" style={{ marginLeft: 'auto', background: 'var(--gpale)', color: 'var(--warn)' }}>New</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {u.photoUrl && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--hint)', marginBottom: '4px' }}>Profile Photo</div>
                    <img src={u.photoUrl} alt="User" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                  </div>
                )}
                {u.certUrl && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--hint)', marginBottom: '4px' }}>Community ID</div>
                    <a href={u.certUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', border: '1px solid var(--border)', borderRadius: '8px', background: '#fcfcfc', textDecoration: 'none' }}>
                      <span style={{ fontSize: '24px' }}>📄</span>
                      <span style={{ fontSize: '11px', color: 'var(--g1)', fontWeight: 600, marginTop: '4px' }}>View Document</span>
                    </a>
                  </div>
                )}
              </div>

              <div style={{ background: 'var(--gpale)', padding: '12px', borderRadius: '10px', fontSize: '12px', marginBottom: '16px' }}>
                <strong>V-Elder:</strong> {u.vElder} ({u.vPhone})<br />
                <strong>Lineage:</strong> {u.lineage || 'Not specified'}
              </div>

              <div className="btn-row">
                <button 
                  className="btn btn-gold btn-sm" 
                  style={{ flex: 2, background: 'var(--ok)' }} 
                  onClick={() => handleAction(u, 'approved')}
                >
                  ✓ Issue Baduga Badge
                </button>
                <button 
                  className="btn btn-outline btn-sm" 
                  style={{ flex: 1, borderColor: 'var(--err)', color: 'var(--err)' }} 
                  onClick={() => handleAction(u, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
        <div style={{ height: '60px' }} />
      </div>
    </div>
  );
}
