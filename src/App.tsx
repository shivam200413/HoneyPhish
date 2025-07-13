import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EnhancedDashboard from './pages/EnhancedDashboard';
import VendorPortal from './pages/VendorPortal';
import Assessment from './pages/Assessment';
import PhishingTests from './pages/PhishingTests';
import PhishingInbox from './pages/PhishingInbox';
import PhishingFail from './pages/PhishingFail';
import Leaderboard from './pages/Leaderboard';
import AuditLogs from './pages/AuditLogs';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<EnhancedDashboard />} />
              <Route path="/vendors" element={<VendorPortal />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/phishing" element={<PhishingTests />} />
              <Route path="/phishing-inbox" element={<PhishingInbox />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/audit" element={<AuditLogs />} />
            </Routes>
          </main>
        </div>
      </div>
      
      {/* Standalone routes outside main layout */}
      <Routes>
        <Route path="/phishing-fail" element={<PhishingFail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;