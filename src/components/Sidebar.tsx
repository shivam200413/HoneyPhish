import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  Shield,
  Mail,
  Trophy,
  FileText,
  Settings,
  LogOut,
  Target,
  Upload,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Role-based navigation
  const adminNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Vendors', href: '/vendors', icon: Building2 },
    { name: 'Phishing Tests', href: '/phishing', icon: Shield },
    { name: 'Audit Logs', href: '/audit', icon: FileText },
  ];

  const vendorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Assessment', href: '/assessment', icon: ClipboardCheck },
    { name: 'Documents', href: '/documents', icon: Upload },
    { name: 'AI Assistant', href: '/assistant', icon: MessageCircle },
    { name: 'Phishing Inbox', href: '/phishing-inbox', icon: Mail },
  ];

  const sharedNavigation = [
    { name: 'Phishing Inbox', href: '/phishing-inbox', icon: Mail },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  const navigation = user?.role === 'admin' 
    ? [...adminNavigation, ...sharedNavigation]
    : [...vendorNavigation, ...sharedNavigation];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 glassmorphism border-r border-honey-purple/20">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-honey-purple/20">
          <div className="w-8 h-8 bg-gradient-to-r from-honey-purple to-honey-blue rounded-lg flex items-center justify-center shadow-glow mr-3">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold honeyphish-logo">HoneyPhish</span>
        </div>

        {/* User Role Badge */}
        <div className="px-4 py-3 border-b border-honey-purple/20">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            user?.role === 'admin' 
              ? 'bg-red-600/20 text-red-300 border border-red-500/30'
              : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
          }`}>
            {user?.role === 'admin' ? 'Administrator' : 'Vendor Portal'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-honey-purple/20 to-honey-blue/20 text-neon-purple border border-honey-purple/30 shadow-glow'
                    : 'text-gray-300 hover:bg-honey-purple/10 hover:text-neon-purple hover:border-honey-purple/20 border border-transparent'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-honey-purple/20">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-honey-purple to-honey-blue rounded-full flex items-center justify-center shadow-glow">
              <span className="text-white font-semibold">
                {user?.name?.[0] || user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-gray-400">
                {user?.company || (user?.role === 'admin' ? 'HoneyPhish Admin' : 'Vendor')}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;