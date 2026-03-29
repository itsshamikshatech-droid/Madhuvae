import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UploadDocs() {
  const navigate = useNavigate();
  const location = useLocation();

  const [photo, setPhoto] = useState(null);
  const [cert, setCert] = useState(null);
  const [elderRef, setElderRef] = useState({ vElder: '', vPhone: '', fElder: '' });

  const handlePhotoPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto({ file, url: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleCertSelect = (e) => {
    const file = e.target.files[0];
    if (file) setCert(file);
  };

  const handleSubmit = () => {
    if (!photo) {
      alert('Please upload your profile photo. It is required.');
      return;
    }
    navigate('/signup/profile', {
      state: {
        ...location.state,
        step3: {
          photoFile: photo.file,
          certFile: cert,
          ...elderRef
        }
      }
    });
  };

  return (
    <div className="sc on" id="s-upload">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/signup/community')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="pbar" style={{ width: '75%' }}></div>
        <div className="h2">Verification</div>
        <p className="sub">Step 3 of 4 — Upload your documents</p>
      </div>
      <div className="form-body">
        <div className="nf nfi">Upload a clear profile photo and one identity document. Admin will verify before granting access.</div>

        <div className="section-label">Profile Photo <span style={{ color: 'var(--err)' }}>*</span></div>
        <div className="upload-box" onContextMenu={(e) => e.preventDefault()}>
          <input type="file" accept="image/*" onChange={handlePhotoPreview} />
          {!photo ? (
            <>
              <div className="upload-icon">📷</div>
              <div className="upload-title">Tap to upload your photo</div>
              <div className="upload-hint">One clear, genuine photo of yourself. Admin will verify it is authentic.</div>
            </>
          ) : (
            <>
              <img src={photo.url} className="upload-preview" alt="preview" style={{ display: 'block' }} onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
              <div className="upload-fname" style={{ display: 'block' }}>✅ {photo.file.name}</div>
            </>
          )}
        </div>

        <div className="section-label" style={{ marginTop: '18px' }}>Community Certificate</div>
        <div className="upload-box" onContextMenu={(e) => e.preventDefault()}>
          <input type="file" accept="image/*,application/pdf" onChange={handleCertSelect} />
          {!cert ? (
            <>
              <div className="upload-icon">📄</div>
              <div className="upload-title">Tap to upload certificate</div>
              <div className="upload-hint">PDF or image · Community certificate, ration card, or any official proof</div>
            </>
          ) : (
            <>
              <div className="upload-icon">✅</div>
              <div className="upload-title">File selected</div>
              <div className="upload-fname" style={{ display: 'block' }}>✅ {cert.name}</div>
            </>
          )}
        </div>

        <div className="section-label" style={{ marginTop: '18px' }}>Village Elder Reference</div>
        <div className="field">
          <label>Elder's Name</label>
          <input type="text" placeholder="Name of the village elder" value={elderRef.vElder} onChange={e => setElderRef({...elderRef, vElder: e.target.value})} />
        </div>
        <div className="field">
          <label>Elder's Phone</label>
          <input type="tel" placeholder="+91 XXXXX XXXXX" value={elderRef.vPhone} onChange={e => setElderRef({...elderRef, vPhone: e.target.value})} />
        </div>

        <div className="section-label">Family Elder Reference</div>
        <div className="field">
          <label>Family Elder's Name</label>
          <input type="text" placeholder="Name of family elder" value={elderRef.fElder} onChange={e => setElderRef({...elderRef, fElder: e.target.value})} />
        </div>

        <div className="nf nfw">After submitting, your status will be <strong>Verification Pending</strong>. You will see which admin has your application and can contact them.</div>
        <button className="btn btn-gold" style={{ marginTop: '4px' }} onClick={handleSubmit}>Submit Application →</button>
      </div>
    </div>
  );
}
