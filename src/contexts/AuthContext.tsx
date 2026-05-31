import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, role: 'admin' | 'vendor') => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock vendor data for demonstration
const mockVendors = [
  { email: 'sarah.chen@techcorp.com', password: 'vendor123', name: 'Sarah Chen', company: 'TechCorp Solutions' },
  { email: 'michael.r@securenet.com', password: 'vendor123', name: 'Michael Rodriguez', company: 'SecureNet Systems' },
  { email: 'emily.j@cloudtech.com', password: 'vendor123', name: 'Emily Johnson', company: 'CloudTech Ltd.' },
  { email: 'david.kim@dataflow.com', password: 'vendor123', name: 'David Kim', company: 'DataFlow Inc.' },
  { email: 'lisa.wang@networkpro.com', password: 'vendor123', name: 'Lisa Wang', company: 'NetworkPro Solutions' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string, role: 'admin' | 'vendor') => {
    if (role === 'admin' && email === 'admin@honeyphish.com' && password === 'admin123') {
      const mockUser: User = {
        id: '1',
        email,
        role: 'admin',
        name: 'Admin User',
        user_metadata: { role: 'admin', name: 'Admin User' },
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else if (role === 'vendor') {
      const vendor = mockVendors.find(v => v.email === email && v.password === password);
      if (vendor) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          role: 'vendor',
          name: vendor.name,
          company: vendor.company,
          user_metadata: { role: 'vendor', name: vendor.name, company: vendor.company },
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid vendor credentials');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      role: 'vendor',
      name,
      company,
      user_metadata: { role: 'vendor', name, company },
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};