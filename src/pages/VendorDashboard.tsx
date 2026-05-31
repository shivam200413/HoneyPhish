import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  Award,
  FileText,
  Mail,
  Upload,
  MessageCircle,
  Activity,
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../contexts/DataContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { vendors, getVendorById, getAssessmentByVendorId } = useData();
  const [vendorData, setVendorData] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);

  const [scoreHistory] = useState([
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 82 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 88 },
  ]);

  const [recentActivities] = useState([
    {
      id: '1',
      action: 'Assessment completed',
      timestamp: '2024-01-20T10:30:00Z',
      type: 'assessment',
      details: 'Security assessment submitted successfully',
    },
    {
      id: '2',
      action: 'Phishing email reported',
      timestamp: '2024-01-20T09:15:00Z',
      type: 'phishing',
      details: 'Correctly identified phishing attempt (+15 points)',
    },
    {
      id: '3',
      action: 'Document uploaded',
      timestamp: '2024-01-19T16:45:00Z',
      type: 'document',
      details: 'ISO 27001 certification uploaded',
    },
  ]);

  const [recommendations] = useState([
    {
      id: '1',
      title: 'Enable Multi-Factor Authentication',
      description: 'Implement MFA across all user accounts to improve security score',
      priority: 'high',
      impact: '+15 points',
    },
    {
      id: '2',
      title: 'Update SSL Certificate',
      description: 'Renew SSL certificate before expiration',
      priority: 'medium',
      impact: '+8 points',
    },
    {
      id: '3',
      title: 'Complete Security Training',
      description: 'Finish remaining phishing simulation modules',
      priority: 'low',
      impact: '+5 points',
    },
  ]);

  useEffect(() => {
    if (user && user.role === 'vendor') {
      // Find vendor data by email
      const vendor = vendors.find(v => v.email === user.email);
      if (vendor) {
        setVendorData(vendor);
        const vendorAssessment = getAssessmentByVendorId(vendor.id);
        setAssessment(vendorAssessment);
      }
    }
  }, [user, vendors, getAssessmentByVendorId]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'phishing':
        return <Mail className="w-4 h-4 text-green-400" />;
      case 'document':
        return <FileText className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (!vendorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-honey-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
          <p className="text-gray-400 mt-2">
            {vendorData.company} • Security Dashboard
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-honey-purple">{vendorData.trustScore}</div>
            <div className="text-gray-400 text-sm">Trust Score</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trust Score</p>
                <p className="text-2xl font-bold text-white">{vendorData.trustScore}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+5 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-honey-purple/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-honey-purple" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Phishing Score</p>
                <p className="text-2xl font-bold text-white">{vendorData.phishingScore}</p>
                <div className="flex items-center mt-2">
                  <Target className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">8/10 tests passed</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-honey-blue/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-honey-blue" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Documents</p>
                <p className="text-2xl font-bold text-white">{vendorData.documentsUploaded}</p>
                <div className="flex items-center mt-2">
                  <FileText className="w-4 h-4 text-purple-400 mr-1" />
                  <span className="text-purple-400 text-sm">Uploaded</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Badges</p>
                <p className="text-2xl font-bold text-white">{vendorData.badges.length}</p>
                <div className="flex items-center mt-2">
                  <Award className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-sm">Earned</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="flex items-center justify-center p-4">
              <Shield className="w-5 h-5 mr-2" />
              Complete Assessment
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4">
              <Mail className="w-5 h-5 mr-2" />
              Phishing Inbox
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4">
              <Upload className="w-5 h-5 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              AI Assistant
            </Button>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#9333EA"
                  strokeWidth={3}
                  dot={{ fill: '#9333EA', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Security Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{rec.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          rec.priority
                        )}`}
                      >
                        {rec.priority}
                      </span>
                      <span className="text-green-400 text-sm font-medium">{rec.impact}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{rec.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Assessment Status */}
      {!assessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-6 border-yellow-500/30 bg-yellow-600/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Complete Your Security Assessment</h3>
                <p className="text-gray-400 mt-1">
                  Complete your cybersecurity assessment to improve your trust score and unlock additional features.
                </p>
              </div>
              <Button>
                <Shield className="w-4 h-4 mr-2" />
                Start Assessment
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default VendorDashboard;