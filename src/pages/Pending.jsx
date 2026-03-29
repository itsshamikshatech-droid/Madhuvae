import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pending() {
  const navigate = useNavigate();
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(new Date().toLocaleString('en-IN'));
  }, []);

  return (
    <div className="sc on" id="s-pending">
      <div className="sb">
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '14px' }}>⏳</div>
          <div className="h2" style={{ fontSize: '26px' }}>Application Submitted</div>
          <p style={{ fontSize: '13.5px', color: 'var(--hint)', lineHeight: 1.7, marginTop: '8px', marginBottom: '24px' }}>
            Your application is with the admin for your Seemai. Track your progress in real time below.
          </p>
        </div>
        <div style={{ padding: '0 24px 32px', flex: 1 }}>
          <div className="tracker">
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--g1)', marginBottom: '14px' }}>
              Application Status
            </div>
            
            <div className="tstep">
              <div className="tdot td-done">✓</div>
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Application Submitted</div>
                <div style={{ fontSize: '11.5px', color: 'var(--hint)', marginTop: '2px' }}>{time || 'Today'}</div>
              </div>
            </div>
            <div className="tline tl-ok" style={{ marginLeft: '14px' }}></div>
            
            <div className="tstep">
              <div className="tdot td-now">→</div>
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--g1)' }}>Assigned to Admin</div>
                <div style={{ fontSize: '11.5px', color: 'var(--hint)', marginTop: '2px' }}>Assigned to your Seemai admin</div>
                <button 
                  onClick={() => alert('Your admin has been assigned. Contact details will be shown here once available.')}
                  style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--g1)', fontWeight: 600, cursor: 'pointer', padding: '4px 0', fontFamily: "'DM Sans', sans-serif", marginTop: '2px' }}
                >
                  📞 View Admin Contact
                </button>
              </div>
              <span className="chip cgold">Active</span>
            </div>
            <div className="tline tl-no" style={{ marginLeft: '14px' }}></div>
            
            <div className="tstep">
              <div className="tdot td-wait" style={{ fontSize: '12px' }}>3</div>
              <div style={{ flex: 1, paddingTop: '5px' }}><div style={{ fontSize: '13.5px', color: 'var(--hint)' }}>Document Review</div></div>
            </div>
            <div className="tline tl-no" style={{ marginLeft: '14px' }}></div>
            
            <div className="tstep">
              <div className="tdot td-wait" style={{ fontSize: '12px' }}>4</div>
              <div style={{ flex: 1, paddingTop: '5px' }}><div style={{ fontSize: '13.5px', color: 'var(--hint)' }}>Baduga Badge Granted</div></div>
            </div>
            
          </div>
          
          <div className="nf nfs">✅ Your application has been submitted and assigned.</div>
          <div className="nf nfi">🔔 You will receive an SMS when your account is verified.</div>

          {/* Mock continuation button for demo navigation */}
          <button className="btn btn-outline" style={{marginTop: '16px'}} onClick={() => navigate('/home')}>[Demo: Skip to Approved Dash]</button>
        </div>
      </div>
    </div>
  );
}
