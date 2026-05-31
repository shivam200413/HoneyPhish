import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Mail, Lock, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Card from '../components/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [userType, setUserType] = useState<'admin' | 'vendor'>('vendor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password, name, company);
      } else {
        await signIn(email, password, userType);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-honey-purple/20 to-black" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-honey-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-honey-blue/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-honey-purple/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-honey-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold honeyphish-logo">HoneyPhish</h1>
            <p className="text-gray-400 mt-2">
              Next-Generation Security Awareness Platform
            </p>
          </div>

          {/* User Type Selection */}
          {!isSignUp && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Login as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('vendor')}
                  className={`p-3 rounded-lg border transition-all ${
                    userType === 'vendor'
                      ? 'border-honey-purple bg-honey-purple/20 text-honey-purple'
                      : 'border-gray-600 hover:border-honey-purple/50 text-gray-300'
                  }`}
                >
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Vendor</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`p-3 rounded-lg border transition-all ${
                    userType === 'admin'
                      ? 'border-honey-purple bg-honey-purple/20 text-honey-purple'
                      : 'border-gray-600 hover:border-honey-purple/50 text-gray-300'
                  }`}
                >
                  <UserCheck className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Admin</div>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-600/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-honey-purple hover:text-neon-purple text-sm transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-honey-purple/10 border border-honey-purple/20 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Admin Demo:</p>
              <p className="text-xs text-honey-purple">Email: admin@honeyphish.com</p>
              <p className="text-xs text-honey-purple">Password: admin123</p>
            </div>
            <div className="p-4 bg-honey-blue/10 border border-honey-blue/20 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Vendor Demo:</p>
              <p className="text-xs text-honey-blue">Email: sarah.chen@techcorp.com</p>
              <p className="text-xs text-honey-blue">Password: vendor123</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;