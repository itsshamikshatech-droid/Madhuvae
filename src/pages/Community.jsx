import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DATA = {
  "Thodha Naadu": {"Kallatti_Ooru": ["Kallatti", "Sholur", "Mynale", "Melur", "Hosa Hatti", "Osa Hatti", "Konagatti", "Kagguchi", "Hullathi", "Uyilatti", "Thambatti", "Kambatti", "Ajjoor", "Alattane", "Masickal", "Davane", "Beragallu", "Ullupatti", "Bekkodu", "Bendatti", "Honnadale", "Omeyaratti", "Jakkalorai", "Thummanada", "Kappachi", "Melatti", "Nadu Hatti"]},
  "Porangaadu": {"Hubbathalai_Ooru": ["Hubbathalai"], "Jakkadha_Ooru": ["Jakkadha", "Kaarakorai", "Bearhatti", "Mel Bikkatti", "Kil Bikkatti", "Manjida"], "Jakkanarai_Ooru": ["Jakkanarai", "Thumboor", "Thinniyur", "Kallada", "Bettatti", "Aravenu"], "General_Porangaadu": ["Kappatti", "Kanneri", "Sundatti", "Kerbetta", "Osatti", "Denadu", "Ketti", "Adikaratti", "Anehatti", "Kattery", "Koderi", "Mel Koderi", "Allattane", "Mynale", "Kokkalada", "Masikandi", "Bengal", "Kothiben", "Melur", "Godalatti", "Haraguchi"]},
  "Mekku Naadu": {"Kundha_Ooru": ["Porthy", "Thodhanadu", "Nedugula", "Balacola", "Ithalar", "Melkunda", "Kilkundha", "Nanjanad", "Kadanad", "Thuneri", "Kundha", "Ketti Valley", "Aravenu", "Yedakkadu", "Kanneri Mukku"]},
  "Kundhe Naadu": {"Kundhe_Ooru": ["Osatti", "Bikkatti", "Mel Kundhe", "Kil Kundhe", "Nadu Hatti", "Kechigatti", "Manjoor", "Edakkadu", "Thooneri", "Bakore", "Mullegooru", "Kunjanare", "Gundinaali", "Mukki Male", "Baigada"]}
};

export default function Community() {
  const navigate = useNavigate();
  const location = useLocation();
  const step1 = location.state?.step1 || {};

  const [seemai, setSeemai] = useState('');
  const [ooru, setOoru] = useState('');
  const [hatti, setHatti] = useState('');
  const [lineage, setLineage] = useState('');

  const availableOorus = seemai ? Object.keys(DATA[seemai] || {}) : [];
  const availableHattis = ooru ? (DATA[seemai]?.[ooru] || []) : [];

  const handleNext = () => {
    if (!seemai || !ooru || !hatti) {
      alert("Please select your Seemai, Ooru, and Hatti.");
      return;
    }
    navigate('/signup/upload', { 
      state: { 
        ...location.state, 
        step2: { seemai, ooru, hatti, lineage } 
      } 
    });
  };

  return (
    <div className="sc on" id="s-community">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/signup/basics')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="pbar" style={{ width: '50%' }}></div>
        <div className="h2">Community Identity</div>
        <p className="sub">Step 2 of 4 — Your Baduga details</p>
      </div>
      <div className="form-body">
        <div className="nf nfi">Be accurate — an admin from your Seemai region will verify this information.</div>
        <div className="field">
          <label>Seemai</label>
          <select value={seemai} onChange={(e) => { setSeemai(e.target.value); setOoru(''); setHatti(''); }}>
            <option value="">Select your Seemai</option>
            <option>Thodha Naadu</option>
            <option>Porangaadu</option>
            <option>Mekku Naadu</option>
            <option>Kundhe Naadu</option>
          </select>
        </div>
        <div className="field">
          <label>Ooru (Village Cluster)</label>
          <select value={ooru} onChange={(e) => { setOoru(e.target.value); setHatti(''); }} disabled={!seemai}>
            <option value="">{seemai ? "Select Ooru" : "Select Seemai first"}</option>
            {availableOorus.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Hatti (Village)</label>
          <select value={hatti} onChange={(e) => setHatti(e.target.value)} disabled={!ooru}>
            <option value="">{ooru ? "Select Hatti" : "Select Ooru first"}</option>
            {availableHattis.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Lineage / Family Line Name</label>
          <input type="text" placeholder="Ask your elders if unsure" value={lineage} onChange={e => setLineage(e.target.value)} />
        </div>
        <button className="btn btn-gold" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}
