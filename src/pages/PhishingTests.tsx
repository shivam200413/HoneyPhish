import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Mail,
  Shield,
  TrendingUp,
  Users,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  BarChart3,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PhishingCampaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'scheduled';
  targetCount: number;
  clickRate: number;
  reportRate: number;
  startDate: string;
  endDate?: string;
  type: 'email' | 'sms' | 'social';
}

interface VendorResult {
  id: string;
  name: string;
  emailsSent: number;
  clicked: number;
  reported: number;
  score: number;
  badge?: string;
}

const PhishingTests: React.FC = () => {
  const [campaigns] = useState<PhishingCampaign[]>([
    {
      id: '1',
      name: 'Q1 2024 Email Security Test',
      status: 'completed',
      targetCount: 25,
      clickRate: 12,
      reportRate: 68,
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      type: 'email',
    },
    {
      id: '2',
      name: 'Vendor Awareness Campaign',
      status: 'active',
      targetCount: 15,
      clickRate: 8,
      reportRate: 72,
      startDate: '2024-01-20',
      type: 'email',
    },
    {
      id: '3',
      name: 'Social Engineering Test',
      status: 'scheduled',
      targetCount: 30,
      clickRate: 0,
      reportRate: 0,
      startDate: '2024-02-01',
      type: 'social',
    },
  ]);

  const [vendorResults] = useState<VendorResult[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      emailsSent: 10,
      clicked: 0,
      reported: 8,
      score: 95,
      badge: 'Security Champion',
    },
    {
      id: '2',
      name: 'DataFlow Inc.',
      emailsSent: 10,
      clicked: 6,
      reported: 2,
      score: 40,
    },
    {
      id: '3',
      name: 'CloudTech Ltd.',
      emailsSent: 10,
      clicked: 2,
      reported: 6,
      score: 75,
    },
    {
      id: '4',
      name: 'SecureNet Systems',
      emailsSent: 10,
      clicked: 1,
      reported: 8,
      score: 88,
      badge: 'Security Aware',
    },
    {
      id: '5',
      name: 'NetworkPro Solutions',
      emailsSent: 10,
      clicked: 3,
      reported: 4,
      score: 65,
    },
  ]);

  const [trendData] = useState([
    { month: 'Jan', clickRate: 15, reportRate: 65 },
    { month: 'Feb', clickRate: 12, reportRate: 70 },
    { month: 'Mar', clickRate: 8, reportRate: 75 },
    { month: 'Apr', clickRate: 10, reportRate: 72 },
    { month: 'May', clickRate: 6, reportRate: 80 },
    { month: 'Jun', clickRate: 5, reportRate: 85 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-400 bg-blue-400/20';
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'scheduled':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Phishing Simulation</h1>
          <p className="text-gray-400 mt-2">
            Test vendor security awareness and improve their cybersecurity posture
          </p>
        </div>
        <Button>
          <Target className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold text-white">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Click Rate</p>
              <p className="text-2xl font-bold text-white">8.5%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">-3.2% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Report Rate</p>
              <p className="text-2xl font-bold text-white">73%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+8% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Security Badges</p>
              <p className="text-2xl font-bold text-white">
                {vendorResults.filter(v => v.badge).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Campaign Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Campaign
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Targets
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Click Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Report Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {campaigns.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-800/30"
                >
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(campaign.startDate).toLocaleDateString()}
                        {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString()}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-white">
                    {campaign.targetCount}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span className="text-sm text-white mr-2">
                        {campaign.clickRate}%
                      </span>
                      <div className="w-12 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${campaign.clickRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span className="text-sm text-white mr-2">
                        {campaign.reportRate}%
                      </span>
                      <div className="w-12 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${campaign.reportRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'active' ? (
                        <button className="text-red-400 hover:text-red-300">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : campaign.status === 'scheduled' ? (
                        <button className="text-green-400 hover:text-green-300">
                          <Play className="w-4 h-4" />
                        </button>
                      ) : null}
                      <button className="text-blue-400 hover:text-blue-300">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Security Awareness Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
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
                dataKey="clickRate"
                stroke="#EF4444"
                strokeWidth={2}
                name="Click Rate %"
              />
              <Line
                type="monotone"
                dataKey="reportRate"
                stroke="#10B981"
                strokeWidth={2}
                name="Report Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Vendor Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorResults}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="score" fill="#00D4FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Vendor Results */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Vendor Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Vendor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Emails Sent
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Clicked
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Reported
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Badge
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {vendorResults.map((vendor, index) => (
                <motion.tr
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-800/30"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {vendor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white">
                    {vendor.emailsSent}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-sm text-white">{vendor.clicked}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm text-white">{vendor.reported}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-medium ${getScoreColor(vendor.score)}`}>
                      {vendor.score}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {vendor.badge ? (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-yellow-400">{vendor.badge}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">None</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PhishingTests;