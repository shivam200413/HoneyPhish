import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Mail,
  Flag,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface Vendor {
  id: string;
  name: string;
  email: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastAssessment: string;
  status: 'active' | 'pending' | 'inactive';
  industry: string;
}

const VendorPortal: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trustScore');

  useEffect(() => {
    // Simulate loading vendors
    const mockVendors: Vendor[] = [
      {
        id: '1',
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        trustScore: 92,
        riskLevel: 'low',
        lastAssessment: '2024-01-15',
        status: 'active',
        industry: 'Technology',
      },
      {
        id: '2',
        name: 'DataFlow Inc.',
        email: 'info@dataflow.com',
        trustScore: 45,
        riskLevel: 'high',
        lastAssessment: '2024-01-10',
        status: 'active',
        industry: 'Data Analytics',
      },
      {
        id: '3',
        name: 'CloudTech Ltd.',
        email: 'hello@cloudtech.com',
        trustScore: 78,
        riskLevel: 'medium',
        lastAssessment: '2024-01-12',
        status: 'active',
        industry: 'Cloud Services',
      },
      {
        id: '4',
        name: 'SecureNet Systems',
        email: 'contact@securenet.com',
        trustScore: 88,
        riskLevel: 'low',
        lastAssessment: '2024-01-14',
        status: 'pending',
        industry: 'Cybersecurity',
      },
      {
        id: '5',
        name: 'NetworkPro Solutions',
        email: 'info@networkpro.com',
        trustScore: 62,
        riskLevel: 'medium',
        lastAssessment: '2024-01-08',
        status: 'active',
        industry: 'Networking',
      },
    ];
    setVendors(mockVendors);
    setFilteredVendors(mockVendors);
  }, []);

  useEffect(() => {
    let filtered = vendors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply risk filter
    if (filterRisk !== 'all') {
      filtered = filtered.filter((vendor) => vendor.riskLevel === filterRisk);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'trustScore':
          return b.trustScore - a.trustScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastAssessment':
          return new Date(b.lastAssessment).getTime() - new Date(a.lastAssessment).getTime();
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [vendors, searchTerm, filterRisk, sortBy]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'inactive':
        return 'text-gray-400 bg-gray-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vendor Management</h1>
          <p className="text-gray-400 mt-2">
            Monitor and manage vendor security assessments
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="trustScore">Sort by Trust Score</option>
              <option value="name">Sort by Name</option>
              <option value="lastAssessment">Sort by Last Assessment</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Vendors Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Trust Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Assessment
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredVendors.map((vendor, index) => (
                <motion.tr
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                        <Building2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {vendor.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {vendor.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {vendor.industry}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">
                        {vendor.trustScore}
                      </div>
                      <div className="ml-2 w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          style={{ width: `${vendor.trustScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRiskColor(
                        vendor.riskLevel
                      )}`}
                    >
                      {vendor.riskLevel === 'low' && (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {vendor.riskLevel === 'medium' && (
                        <Shield className="w-3 h-3 mr-1" />
                      )}
                      {vendor.riskLevel === 'high' && (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {vendor.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        vendor.status
                      )}`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(vendor.lastAssessment).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Flag className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {vendors.filter((v) => v.riskLevel === 'low').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Low Risk Vendors</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {vendors.filter((v) => v.riskLevel === 'medium').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Medium Risk Vendors</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {vendors.filter((v) => v.riskLevel === 'high').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">High Risk Vendors</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VendorPortal;