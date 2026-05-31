import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vendor, Assessment, PhishingResult, Document } from '../types';

interface DataContextType {
  vendors: Vendor[];
  assessments: Assessment[];
  phishingResults: PhishingResult[];
  documents: Document[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  submitAssessment: (assessment: Assessment) => void;
  updateAssessment: (id: string, updates: Partial<Assessment>) => void;
  addPhishingResult: (result: PhishingResult) => void;
  uploadDocument: (document: Document) => void;
  getVendorById: (id: string) => Vendor | undefined;
  getAssessmentByVendorId: (vendorId: string) => Assessment | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Generate 127 mock vendors to match dashboard display
const generateMockVendors = (): Vendor[] => {
  const companies = [
    'TechCorp Solutions', 'SecureNet Systems', 'CloudTech Ltd.', 'DataFlow Inc.', 'NetworkPro Solutions',
    'CyberGuard Technologies', 'InfoSec Partners', 'Digital Fortress', 'SafeData Systems', 'TrustShield Corp',
    'SecureCloud Services', 'DataProtect Inc.', 'CyberDefense Group', 'InfoGuard Solutions', 'SecureTech Labs',
    'DigitalSafe Systems', 'TrustNet Technologies', 'CyberShield Corp', 'DataSecure Partners', 'InfoTrust Solutions'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Government',
    'Energy', 'Transportation', 'Telecommunications', 'Media', 'Real Estate', 'Insurance', 'Legal'
  ];

  const firstNames = ['Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'James', 'Maria', 'Robert', 'Jennifer', 'William'];
  const lastNames = ['Chen', 'Rodriguez', 'Johnson', 'Kim', 'Wang', 'Wilson', 'Garcia', 'Brown', 'Davis', 'Miller'];

  const vendors: Vendor[] = [];

  for (let i = 0; i < 127; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    
    const trustScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const phishingScore = Math.floor(Math.random() * 30) + 70; // 70-100
    
    let riskLevel: 'low' | 'medium' | 'high';
    if (trustScore >= 85) riskLevel = 'low';
    else if (trustScore >= 70) riskLevel = 'medium';
    else riskLevel = 'high';

    const badges = [];
    if (trustScore >= 95) badges.push('Platinum Guardian');
    else if (trustScore >= 85) badges.push('Gold Defender');
    else if (trustScore >= 75) badges.push('Silver Protector');
    else if (trustScore >= 65) badges.push('Bronze Sentinel');

    vendors.push({
      id: (i + 1).toString(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      company,
      trustScore,
      riskLevel,
      lastAssessment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: Math.random() > 0.1 ? 'active' : Math.random() > 0.5 ? 'pending' : 'inactive',
      industry,
      assessmentCompleted: Math.random() > 0.3,
      phishingScore,
      documentsUploaded: Math.floor(Math.random() * 5),
      badges,
    });
  }

  return vendors;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [phishingResults, setPhishingResults] = useState<PhishingResult[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Initialize with mock data
    setVendors(generateMockVendors());
  }, []);

  const addVendor = (vendor: Vendor) => {
    setVendors(prev => [...prev, vendor]);
  };

  const updateVendor = (id: string, updates: Partial<Vendor>) => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === id ? { ...vendor, ...updates } : vendor
    ));
  };

  const submitAssessment = (assessment: Assessment) => {
    setAssessments(prev => [...prev, assessment]);
    
    // Update vendor's assessment status and trust score
    updateVendor(assessment.vendorId, {
      assessmentCompleted: true,
      trustScore: assessment.score,
      lastAssessment: assessment.completedAt,
      riskLevel: assessment.score >= 85 ? 'low' : assessment.score >= 70 ? 'medium' : 'high'
    });
  };

  const updateAssessment = (id: string, updates: Partial<Assessment>) => {
    setAssessments(prev => prev.map(assessment => 
      assessment.id === id ? { ...assessment, ...updates } : assessment
    ));
  };

  const addPhishingResult = (result: PhishingResult) => {
    setPhishingResults(prev => [...prev, result]);
    
    // Update vendor's phishing score
    const vendor = vendors.find(v => v.id === result.vendorId);
    if (vendor) {
      const newPhishingScore = Math.max(0, Math.min(100, vendor.phishingScore + result.scoreChange));
      updateVendor(result.vendorId, { phishingScore: newPhishingScore });
    }
  };

  const uploadDocument = (document: Document) => {
    setDocuments(prev => [...prev, document]);
    
    // Update vendor's document count
    const vendor = vendors.find(v => v.id === document.vendorId);
    if (vendor) {
      updateVendor(document.vendorId, { 
        documentsUploaded: vendor.documentsUploaded + 1 
      });
    }
  };

  const getVendorById = (id: string) => {
    return vendors.find(vendor => vendor.id === id);
  };

  const getAssessmentByVendorId = (vendorId: string) => {
    return assessments.find(assessment => assessment.vendorId === vendorId);
  };

  return (
    <DataContext.Provider value={{
      vendors,
      assessments,
      phishingResults,
      documents,
      addVendor,
      updateVendor,
      submitAssessment,
      updateAssessment,
      addPhishingResult,
      uploadDocument,
      getVendorById,
      getAssessmentByVendorId,
    }}>
      {children}
    </DataContext.Provider>
  );
};