import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './contexts/ToastContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EnhancedDashboard from './pages/EnhancedDashboard';
import VendorDashboard from './pages/VendorDashboard';
import VendorPortal from './pages/VendorPortal';
import Assessment from './pages/Assessment';
import VendorAssessment from './pages/VendorAssessment';
import PhishingTests from './pages/PhishingTests';
import PhishingInbox from './pages/PhishingInbox';
import PhishingFail from './pages/PhishingFail';
import Leaderboard from './pages/Leaderboard';
import AuditLogs from './pages/AuditLogs';
import VendorDocuments from './pages/VendorDocuments';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-honey-purple"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  // Role-based routing
  const isAdmin = user.role === 'admin';
  const isVendor = user.role === 'vendor';

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
              
              {/* Admin Routes */}
              {isAdmin && (
                <>
                  <Route path="/dashboard" element={<EnhancedDashboard />} />
                  <Route path="/vendors" element={<VendorPortal />} />
                  <Route path="/phishing" element={<PhishingTests />} />
                  <Route path="/audit" element={<AuditLogs />} />
                </>
              )}
              
              {/* Vendor Routes */}
              {isVendor && (
                <>
                  <Route path="/dashboard" element={<VendorDashboard />} />
                  <Route path="/assessment" element={<VendorAssessment />} />
                  <Route path="/documents" element={<VendorDocuments />} />
                  <Route path="/assistant" element={<AIAssistant />} />
                </>
              )}
              
              {/* Shared Routes */}
              <Route path="/phishing-inbox" element={<PhishingInbox />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              
              {/* Fallback for unauthorized routes */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
        <DataProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;