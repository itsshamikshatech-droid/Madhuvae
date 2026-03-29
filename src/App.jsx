import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Pages
import Splash from './pages/Splash';
import RoleSelect from './pages/RoleSelect';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import LoginOwner from './pages/LoginOwner';
import OTP from './pages/OTP';
import Signup from './pages/Signup';
import Community from './pages/Community';
import UploadDocs from './pages/UploadDocs';
import ProfileSetup from './pages/ProfileSetup';
import Pending from './pages/Pending';
import Home from './pages/Home';
import Connections from './pages/Connections';
import Journey from './pages/Journey';
import MyProfile from './pages/MyProfile';
import AdminPortal from './pages/AdminPortal';
import OwnerPortal from './pages/OwnerPortal';
import AddAdmin from './pages/AddAdmin';

function PhoneEnvironment({ children }) {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'));
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="outer">
      <div className="phone">
        <div className="notch"></div>
        <div className="sbar">
          <span id="clock">{time}</span>
          <span>●●●</span>
        </div>
        <div className="accent"></div>
        
        {/* React Router will inject screens here */}
        {children}

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <PhoneEnvironment>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/role" element={<RoleSelect />} />
          
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/owner" element={<LoginOwner />} />
          <Route path="/otp" element={<OTP />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/community" element={<Community />} />
          <Route path="/signup/upload" element={<UploadDocs />} />
          <Route path="/signup/profile" element={<ProfileSetup />} />
          <Route path="/signup/pending" element={<Pending />} />
          
          {/* User Tabs */}
          <Route path="/home" element={<Home />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/profile" element={<MyProfile />} />
          
          {/* Portals */}
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/owner" element={<OwnerPortal />} />
          <Route path="/owner/add-admin" element={<AddAdmin />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PhoneEnvironment>
    </Router>
  );
}

export default App;
