import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/Card';
import Button from '../components/Button';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}

const VendorDocuments: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'ISO 27001 Certificate.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-01-15T10:30:00Z',
      status: 'approved',
      category: 'Certification',
    },
    {
      id: '2',
      name: 'Security Policy Document.docx',
      type: 'DOCX',
      size: '1.8 MB',
      uploadedAt: '2024-01-10T14:20:00Z',
      status: 'pending',
      category: 'Policy',
    },
    {
      id: '3',
      name: 'Penetration Test Report.pdf',
      type: 'PDF',
      size: '5.2 MB',
      uploadedAt: '2024-01-08T09:15:00Z',
      status: 'approved',
      category: 'Audit Report',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newDocument: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        category: 'Other',
      };

      setDocuments(prev => [newDocument, ...prev]);
      addToast({
        type: 'success',
        message: `${file.name} uploaded successfully`,
      });
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ['All Categories', 'Certification', 'Policy', 'Audit Report', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Document Management</h1>
          <p className="text-gray-400 mt-2">
            Upload and manage your security documentation
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-honey-purple">{documents.length}</div>
            <div className="text-gray-400 text-sm">Total Documents</div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? 'border-honey-purple bg-honey-purple/10'
              : 'border-gray-600 hover:border-honey-purple/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-honey-purple mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Upload Security Documents
          </h3>
          <p className="text-gray-400 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
          </p>
        </div>
      </Card>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {documents.filter(d => d.status === 'approved').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Approved</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {documents.filter(d => d.status === 'pending').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Pending Review</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {documents.filter(d => d.status === 'rejected').length}
            </div>
            <div className="text-gray-400 text-sm mt-1">Rejected</div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-honey-purple/20 rounded-lg text-white focus:outline-none focus:border-honey-purple"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-honey-purple/20 rounded-lg text-white focus:outline-none focus:border-honey-purple"
            >
              {categories.map((category) => (
                <option key={category} value={category === 'All Categories' ? 'all' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredDocuments.map((document, index) => (
                <motion.tr
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-honey-purple/20 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-honey-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {document.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {document.type} • {document.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {document.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        document.status
                      )}`}
                    >
                      {getStatusIcon(document.status)}
                      <span className="ml-1 capitalize">{document.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(document.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-honey-purple hover:text-neon-purple transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-honey-blue hover:text-neon-blue transition-colors">
                        <Download className="w-4 h-4" />
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
    </div>
  );
};

export default VendorDocuments;