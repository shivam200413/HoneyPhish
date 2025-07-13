import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 glassmorphism border-b border-honey-purple/20 flex items-center justify-between px-6">
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search vendors, assessments..."
            className="w-full pl-10 pr-4 py-2 bg-card-bg/60 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20 focus:shadow-glow"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-neon-purple transition-colors hover:bg-honey-purple/10 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-honey-pink rounded-full animate-pulse"></span>
        </button>
        
        <div className="w-8 h-8 bg-gradient-to-r from-honey-purple to-honey-blue rounded-full flex items-center justify-center shadow-glow">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;