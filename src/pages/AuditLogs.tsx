import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  Download,
  Calendar,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  type: 'create' | 'update' | 'delete' | 'access' | 'security';
  severity: 'low' | 'medium' | 'high';
  ip: string;
}

const AuditLogs: React.FC = () => {
  const [logs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2024-01-20T10:30:00Z',
      user: 'admin@company.com',
      action: 'Assessment Completed',
      resource: 'TechCorp Solutions',
      details: 'Security assessment completed with score 92',
      type: 'create',
      severity: 'low',
      ip: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: '2024-01-20T09:15:00Z',
      user: 'system',
      action: 'Risk Score Updated',
      resource: 'DataFlow Inc.',
      details: 'Risk score decreased from 65 to 45 due to missing MFA',
      type: 'update',
      severity: 'high',
      ip: '10.0.0.1',
    },
    {
      id: '3',
      timestamp: '2024-01-20T08:45:00Z',
      user: 'vendor@cloudtech.com',
      action: 'Profile Updated',
      resource: 'CloudTech Ltd.',
      details: 'Updated encryption settings and security policies',
      type: 'update',
      severity: 'medium',
      ip: '203.0.113.45',
    },
    {
      id: '4',
      timestamp: '2024-01-19T16:20:00Z',
      user: 'admin@company.com',
      action: 'Phishing Test Launched',
      resource: 'All Vendors',
      details: 'Initiated Q1 2024 phishing simulation campaign',
      type: 'create',
      severity: 'medium',
      ip: '192.168.1.100',
    },
    {
      id: '5',
      timestamp: '2024-01-19T14:30:00Z',
      user: 'system',
      action: 'SSL Certificate Check',
      resource: 'TechCorp Solutions',
      details: 'Automated SSL certificate validation passed',
      type: 'access',
      severity: 'low',
      ip: '10.0.0.1',
    },
    {
      id: '6',
      timestamp: '2024-01-19T12:15:00Z',
      user: 'admin@company.com',
      action: 'Vendor Flagged',
      resource: 'NetworkPro Systems',
      details: 'Flagged vendor for manual security review',
      type: 'security',
      severity: 'high',
      ip: '192.168.1.100',
    },
    {
      id: '7',
      timestamp: '2024-01-19T11:00:00Z',
      user: 'vendor@securenet.com',
      action: 'Evidence Uploaded',
      resource: 'SecureNet Systems',
      details: 'Uploaded ISO 27001 certification document',
      type: 'create',
      severity: 'low',
      ip: '198.51.100.22',
    },
    {
      id: '8',
      timestamp: '2024-01-18T17:45:00Z',
      user: 'system',
      action: 'Breach Check',
      resource: 'All Vendors',
      details: 'Daily HaveIBeenPwned API check completed',
      type: 'access',
      severity: 'low',
      ip: '10.0.0.1',
    },
  ]);

  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(logs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  React.useEffect(() => {
    let filtered = logs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((log) => log.type === filterType);
    }

    // Apply severity filter
    if (filterSeverity !== 'all') {
      filtered = filtered.filter((log) => log.severity === filterSeverity);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, filterType, filterSeverity]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'update':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'delete':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'access':
        return <User className="w-4 h-4 text-gray-400" />;
      case 'security':
        return <Shield className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-400 bg-green-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'high':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
          <p className="text-gray-400 mt-2">
            Track all system activities and security events
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{logs.length}</div>
            <div className="text-gray-400 text-sm mt-1">Total Events</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {logs.filter(l => l.severity === 'high').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">High Severity</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {logs.filter(l => l.type === 'security').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Security Events</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {logs.filter(l => l.user === 'system').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">System Events</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Types</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="access">Access</option>
              <option value="security">Security</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  IP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {format(new Date(log.timestamp), 'MMM dd, HH:mm')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(log.timestamp), 'yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white">
                          {log.user === 'system' ? 'System' : log.user}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(log.type)}
                      <span className="ml-2 text-sm text-white">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300 max-w-md truncate">
                      {log.details}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getSeverityColor(
                        log.severity
                      )}`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {log.ip}
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

export default AuditLogs;