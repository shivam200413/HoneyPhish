import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Building2,
  Target,
  Users,
  Mail,
  Activity,
  Clock,
  Award,
  Eye,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import Card from '../components/Card';

interface DashboardStats {
  totalVendors: number;
  averageScore: number;
  highRiskVendors: number;
  recentAssessments: number;
  phishingCampaigns: number;
  activeTests: number;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: 'phishing' | 'assessment' | 'score' | 'alert';
}

interface PhishingMetrics {
  totalEmails: number;
  clickRate: number;
  reportRate: number;
  averageResponseTime: number;
}

const EnhancedDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalVendors: 0,
    averageScore: 0,
    highRiskVendors: 0,
    recentAssessments: 0,
    phishingCampaigns: 0,
    activeTests: 0,
  });

  const [phishingMetrics, setPhishingMetrics] = useState<PhishingMetrics>({
    totalEmails: 0,
    clickRate: 0,
    reportRate: 0,
    averageResponseTime: 0,
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const [scoreData] = useState([
    { month: 'Jan', score: 78, phishingScore: 72 },
    { month: 'Feb', score: 82, phishingScore: 78 },
    { month: 'Mar', score: 79, phishingScore: 81 },
    { month: 'Apr', score: 85, phishingScore: 83 },
    { month: 'May', score: 88, phishingScore: 87 },
    { month: 'Jun', score: 91, phishingScore: 89 },
  ]);

  const [riskDistribution] = useState([
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' },
  ]);

  const [phishingResults] = useState([
    { campaign: 'Q1 Email Test', clicked: 12, reported: 68, total: 80 },
    { campaign: 'Social Engineering', clicked: 8, reported: 72, total: 80 },
    { campaign: 'Urgent Action', clicked: 15, reported: 65, total: 80 },
    { campaign: 'IT Support', clicked: 6, reported: 74, total: 80 },
  ]);

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalVendors: 127,
        averageScore: 84,
        highRiskVendors: 13,
        recentAssessments: 24,
        phishingCampaigns: 8,
        activeTests: 3,
      });

      setPhishingMetrics({
        totalEmails: 1240,
        clickRate: 8.5,
        reportRate: 73.2,
        averageResponseTime: 4.2,
      });

      setActivityLogs([
        {
          id: '1',
          timestamp: '2024-01-20T10:30:00Z',
          user: 'Sarah Chen',
          action: 'Reported phishing email correctly',
          details: 'Gained 15 security points',
          type: 'phishing',
        },
        {
          id: '2',
          timestamp: '2024-01-20T10:25:00Z',
          user: 'Michael Rodriguez',
          action: 'Clicked phishing link',
          details: 'Lost 10 security points',
          type: 'phishing',
        },
        {
          id: '3',
          timestamp: '2024-01-20T10:20:00Z',
          user: 'TechCorp Solutions',
          action: 'Completed security assessment',
          details: 'Score improved to 92',
          type: 'assessment',
        },
        {
          id: '4',
          timestamp: '2024-01-20T10:15:00Z',
          user: 'System',
          action: 'High risk vendor detected',
          details: 'DataFlow Inc. flagged for review',
          type: 'alert',
        },
        {
          id: '5',
          timestamp: '2024-01-20T10:10:00Z',
          user: 'Emily Johnson',
          action: 'Earned Gold Badge',
          details: 'Achieved 85+ security score',
          type: 'score',
        },
      ]);
    }, 1000);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'phishing':
        return <Mail className="w-4 h-4 text-red-400" />;
      case 'assessment':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'score':
        return <Award className="w-4 h-4 text-yellow-400" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">HoneyPhish Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Real-time security awareness and phishing simulation analytics
          </p>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Vendors</p>
                <p className="text-2xl font-bold text-white">{stats.totalVendors}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+12% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-white">{stats.averageScore}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+5.2% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Phishing Tests</p>
                <p className="text-2xl font-bold text-white">{stats.phishingCampaigns}</p>
                <div className="flex items-center mt-2">
                  <Target className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">{stats.activeTests} active</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Click Rate</p>
                <p className="text-2xl font-bold text-white">{phishingMetrics.clickRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">-2.1% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Report Rate</p>
                <p className="text-2xl font-bold text-white">{phishingMetrics.reportRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+8.3% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-white">{phishingMetrics.averageResponseTime}m</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">Average</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Security & Phishing Score Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={scoreData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#00D4FF"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  name="Security Score"
                />
                <Area
                  type="monotone"
                  dataKey="phishingScore"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorPhishing)"
                  name="Phishing Awareness"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Phishing Campaign Results
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={phishingResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="campaign" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="clicked" fill="#EF4444" name="Clicked" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reported" fill="#10B981" name="Reported" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Real-time Activity Feed */}
      <motion.div
        custom={8}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Live Activity Feed
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Live</span>
            </div>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activityLogs.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      {activity.user}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Risk Distribution */}
      <motion.div
        custom={9}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Risk Distribution
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-gray-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboard;