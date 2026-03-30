import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getUserProfile } from '../services/firestore';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      
      const userProfile = await getUserProfile(user.uid);
      if (!userProfile) {
        navigate('/signup');
        return;
      }

      if (!userProfile.verified) {
        navigate('/signup/pending');
        return;
      }

      setProfile(userProfile);
      setLoading(false);
    };

    checkStatus();
  }, [navigate]);

  if (loading) {
    return <div className="sc on" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="nf nfi">⌛ Loading your dashboard...</div>
    </div>;
  }

  return (
    <div className="sc on" id="s-home">
      <div className="topbar">
        <div>
          <div className="topbar-title">Madhuve</div>
          <div className="topbar-sub">Your eligible matches</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="chip cg" id="home-badge" style={{ backgroundColor: 'var(--ok)', color: '#fff' }}>✓ Baduga Badge</span>
          <span className="chip cg" id="home-verified">Verified</span>
        </div>
      </div>
      
      <div className="sb" style={{ padding: '14px 20px 12px' }}>
        <div className="card-sm" style={{ marginBottom: '14px', background: 'rgba(26,107,53,.05)', border: '1px solid var(--ok)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ok)', marginBottom: '4px' }}>Community Trust</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Baduga Badge Holder</div>
          <div style={{ fontSize: '11px', color: 'var(--hint)', marginTop: '2px' }}>You have full access to community connections.</div>
        </div>
        
        <div id="matches-list">
          <div className="empty">
            <div className="empty-icon">💑</div>
            <div className="empty-title">Welcome, {profile.name}!</div>
            <div className="empty-sub">We are searching for matches. Currently verified matches will appears here.</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
