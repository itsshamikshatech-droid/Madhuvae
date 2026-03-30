import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Splash from './pages/Splash';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import Signup from './pages/Signup';
import BasicInfo from './pages/BasicInfo';
import Community from './pages/Community';
import UploadDocs from './pages/UploadDocs';
import ProfileSetup from './pages/ProfileSetup';
import Pending from './pages/Pending';
import Home from './pages/Home';
import Connections from './pages/Connections';
import Journey from './pages/Journey';
import MyProfile from './pages/MyProfile';
import AdminPortal from './pages/AdminPortal';
import AddAdmin from './pages/AddAdmin';

function AppLayout({ children }) {
  return (
    <div className="outer">
      <div className="app-container">
        <div className="accent"></div>
        {children}
      </div>
    </div>
  );
}

// Redirects logged-in users away from auth pages (Splash, Login, Signup)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isProfileComplete, isVerified } = useAuth();
  
  if (isAuthenticated) {
    if (!isProfileComplete) return <Navigate to="/signup/profile" replace />;
    if (!isVerified) return <Navigate to="/signup/pending" replace />;
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

// Protects routes and handles profile-based redirection
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isProfileComplete, isVerified } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // Basic check for admin portal access
  if (requireAdmin) return children;

  const currentPath = window.location.pathname;

  // Force profile setup if missing (Start at Basics)
  if (!isProfileComplete && currentPath !== '/signup/basics' && 
      currentPath !== '/signup/community' && 
      currentPath !== '/signup/upload' && 
      currentPath !== '/signup/profile') {
    return <Navigate to="/signup/basics" replace />;
  }

  // Force pending page if not verified
  if (isProfileComplete && !isVerified && currentPath !== '/signup/pending') {
    return <Navigate to="/signup/pending" replace />;
  }

  // If already verified, don't allow access to setup/pending pages
  if (isVerified && (currentPath === '/signup/profile' || currentPath === '/signup/pending')) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public/Guest Routes */}
          <Route path="/" element={<GuestRoute><Splash /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><LoginUser /></GuestRoute>} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          
          {/* Onboarding Flow (Protected) */}
          <Route path="/signup/basics" element={<ProtectedRoute><BasicInfo /></ProtectedRoute>} />
          <Route path="/signup/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/signup/upload" element={<ProtectedRoute><UploadDocs /></ProtectedRoute>} />
          <Route path="/signup/profile" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
          <Route path="/signup/pending" element={<ProtectedRoute><Pending /></ProtectedRoute>} />
          
          {/* Main App (Protected & Verified Only via check in ProtectedRoute) */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
          <Route path="/journey" element={<ProtectedRoute><Journey /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          
          {/* Admin Tools (Protected) */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminPortal /></ProtectedRoute>} />
          <Route path="/admin/add" element={<ProtectedRoute requireAdmin={true}><AddAdmin /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
