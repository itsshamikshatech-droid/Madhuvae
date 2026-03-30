import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createProfile } from '../services/firestore';
import { useAuth } from '../context/AuthContext';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const allData = location.state || {};

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '', height: '', education: '', occupation: '', city: '', about: '',
    minAge: '', maxAge: '', prefCity: '', familyPhones: ''
  });

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleComplete = async () => {
    if (!formData.age || !formData.occupation || !formData.city) {
      alert("Please fill in the required personal details.");
      return;
    }

    if (!user) {
      alert("Authentication session lost. Please log in again.");
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const uid = user.uid;
      
      // 1. Upload Files from Step 3
      const photoUrl = await uploadFile(allData.step3?.photoFile, `profiles/${uid}/photo`);
      const certUrl = await uploadFile(allData.step3?.certFile, `profiles/${uid}/certificate`);

      // 2. Prepare Final Unified Profile Data
      const profile = {
        uid,
        name: allData.step1?.name,
        phone: allData.step1?.phone,
        email: user.email,
        role: allData.step1?.role,
        timeline: allData.step1?.timeline,
        ...allData.step2, // seemai, ooru, hatti, lineage from Step 2
        vElder: allData.step3?.vElder, // from Step 3
        vPhone: allData.step3?.vPhone,
        fElder: allData.step3?.fElder,
        ...formData, // age, height, education, occupation, city, etc. from Step 4
        photoUrl,
        certUrl,
        status: 'pending',
        verified: false,
        createdAt: new Date().toISOString()
      };

      // 3. Save to Firestore
      await createProfile(profile);

      // Successfully submitted - redirect to the pending/waiting area
      navigate('/signup/pending');
    } catch (error) {
      console.error("Profile submission error:", error);
      alert("Failed to save profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sc on" id="s-profile-setup">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/signup/upload')} style={{ marginBottom: '16px' }}>← Back</button>
        <div className="pbar" style={{ width: '100%' }}></div>
        <div className="h2">Your Profile</div>
        <p className="sub">Step 4 of 4 — Personal details</p>
      </div>
      <div className="form-body">
        {loading && (
          <div className="nf nfi" style={{ marginBottom: '20px' }}>
            ⌛ Finalizing your profile... Uploading documents to secure storage.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Age</label>
            <input type="number" placeholder="25" min="18" max="60" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Height (cm)</label>
            <input type="number" placeholder="165" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
          </div>
        </div>
        <div className="field" style={{ marginTop: '14px' }}>
          <label>Education</label>
          <select value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})}>
            <option value="">Select</option>
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>PhD</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Occupation</label>
          <input type="text" placeholder="e.g. Teacher, Engineer, Farmer" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
        </div>
        <div className="field">
          <label>Current City</label>
          <input type="text" placeholder="e.g. Coimbatore, Bengaluru, Chennai" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
        </div>
        <div className="field">
          <label>About Me</label>
          <textarea placeholder="A thoughtful note about yourself that families will read. Be genuine." value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})}></textarea>
        </div>
        
        <div className="section-label">Match Preferences</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Min Age</label>
            <input type="number" placeholder="22" value={formData.minAge} onChange={e => setFormData({...formData, minAge: e.target.value})} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Max Age</label>
            <input type="number" placeholder="32" value={formData.maxAge} onChange={e => setFormData({...formData, maxAge: e.target.value})} />
          </div>
        </div>
        <div className="field" style={{ marginTop: '14px' }}>
          <label>Preferred City</label>
          <input type="text" placeholder="Any city, or specify your preference" value={formData.prefCity} onChange={e => setFormData({...formData, prefCity: e.target.value})} />
        </div>
        <div className="field">
          <label>Family Members' Phones (optional)</label>
          <input type="text" placeholder="Comma-separated phone numbers — notified of requests" value={formData.familyPhones} onChange={e => setFormData({...formData, familyPhones: e.target.value})} />
        </div>
        
        <button 
          className="btn btn-gold" 
          style={{ marginTop: '6px', opacity: loading ? 0.7 : 1 }} 
          onClick={handleComplete}
          disabled={loading}
        >
          {loading ? 'Finalizing Profile...' : 'Complete Registration →'}
        </button>
      </div>
    </div>
  );
}
