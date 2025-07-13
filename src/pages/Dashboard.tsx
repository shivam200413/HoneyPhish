import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Building2,
  Target,
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
} from 'recharts';
import Card from '../components/Card';

interface DashboardStats {
  totalVendors: number;
  averageScore: number;
  highRiskVendors: number;
  recentAssessments: number;
}

interface ScoreData {
  month: string;
  score: number;
}

interface RiskDistribution {
  name: string;
  value: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalVendors: 0,
    averageScore: 0,
    highRiskVendors: 0,
    recentAssessments: 0,
  });

  const [scoreData] = useState<ScoreData[]>([
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 79 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 91 },
  ]);

  const [riskDistribution] = useState<RiskDistribution[]>([
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' },
  ]);

  const [topRisks] = useState([
    { factor: 'Missing MFA', count: 12, severity: 'high' },
    { factor: 'Outdated SSL Certificates', count: 8, severity: 'medium' },
    { factor: 'Weak Password Policies', count: 15, severity: 'high' },
    { factor: 'No Data Encryption', count: 5, severity: 'high' },
    { factor: 'Inadequate Backup Strategy', count: 9, severity: 'medium' },
  ]);

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalVendors: 127,
        averageScore: 84,
        highRiskVendors: 13,
        recentAssessments: 24,
      });
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Monitor vendor security posture and risk assessments
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-gray-400 text-sm">High Risk Vendors</p>
                <p className="text-2xl font-bold text-white">{stats.highRiskVendors}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  <span className="text-red-400 text-sm">-3 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
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
                <p className="text-gray-400 text-sm">Recent Assessments</p>
                <p className="text-2xl font-bold text-white">{stats.recentAssessments}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">+8 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Security Score Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreData}>
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
                  stroke="#00D4FF"
                  strokeWidth={3}
                  dot={{ fill: '#00D4FF', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Risk Distribution
            </h3>
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
          </Card>
        </motion.div>
      </div>

      {/* Top Risk Factors */}
      <motion.div
        custom={6}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Risk Factors
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topRisks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="factor" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="count"
                fill="#00D4FF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        custom={7}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                action: 'New assessment completed',
                vendor: 'TechCorp Solutions',
                time: '2 hours ago',
                status: 'completed',
              },
              {
                action: 'High risk vendor identified',
                vendor: 'DataFlow Inc.',
                time: '4 hours ago',
                status: 'warning',
              },
              {
                action: 'Security score improved',
                vendor: 'CloudTech Ltd.',
                time: '6 hours ago',
                status: 'success',
              },
              {
                action: 'Phishing test failed',
                vendor: 'NetworkPro Systems',
                time: '8 hours ago',
                status: 'error',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      activity.status === 'completed'
                        ? 'bg-blue-400'
                        : activity.status === 'warning'
                        ? 'bg-yellow-400'
                        : activity.status === 'success'
                        ? 'bg-green-400'
                        : 'bg-red-400'
                    }`}
                  />
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.vendor}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;