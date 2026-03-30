import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getUserProfile, getAdminBySeemai } from '../services/firestore';

export default function Pending() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTime(new Date().toLocaleString('en-IN'));
    
    const fetchStatus = async () => {
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

      if (userProfile.verified) {
        navigate('/home');
        return;
      }

      const assignedAdmin = getAdminBySeemai(userProfile.seemai);
      setProfile(userProfile);
      setAdmin(assignedAdmin);
      setLoading(false);
    };

    fetchStatus();
  }, [navigate]);

  if (loading) {
    return <div className="sc on" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="nf nfi">⌛ Checking application status...</div>
    </div>;
  }

  return (
    <div className="sc on" id="s-pending">
      <div className="sb">
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '14px' }}>⏳</div>
          <div className="h2" style={{ fontSize: '26px' }}>Application Pending</div>
          <p style={{ fontSize: '13.5px', color: 'var(--hint)', lineHeight: 1.7, marginTop: '8px', marginBottom: '24px' }}>
            Your application is currently being reviewed by the admin for <strong>{profile?.seemai}</strong>.
          </p>
        </div>
        <div style={{ padding: '0 24px 32px', flex: 1 }}>
          <div className="tracker">
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--g1)', marginBottom: '14px' }}>
              Approval Tracker
            </div>
            
            <div className="tstep">
              <div className="tdot td-done">✓</div>
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Form Submitted</div>
                <div style={{ fontSize: '11.5px', color: 'var(--hint)', marginTop: '2px' }}>{time || 'Today'}</div>
              </div>
            </div>
            <div className="tline tl-ok" style={{ marginLeft: '14px' }}></div>
            
            <div className="tstep">
              <div className="tdot td-now">→</div>
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g1)' }}>Assigned to {admin?.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--hint)', marginTop: '2px' }}>{admin?.title}</div>
                <div style={{ marginTop: '8px', background: 'var(--gpale)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--hint)', fontWeight: 700 }}>Contact Admin</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', margin: '2px 0' }}>{admin?.phone}</div>
                </div>
              </div>
              <span className="chip cgold">In Review</span>
            </div>
          </div>
          
          <div className="nf nfi" style={{ marginTop: '24px' }}>🔔 Your dashboard will unlock automatically once {admin?.name} approves your profile.</div>
          
          <button 
            className="btn btn-outline" 
            style={{marginTop: '20px', borderStyle: 'dashed'}} 
            onClick={() => window.location.reload()}
          >
            ↻ Check Status
          </button>
        </div>
      </div>
    </div>
  );
}
