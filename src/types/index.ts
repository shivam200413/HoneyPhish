export interface User {
  id: string;
  email: string;
  role: 'admin' | 'vendor';
  name?: string;
  company?: string;
  user_metadata?: {
    role?: string;
    name?: string;
    company?: string;
  };
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  company: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastAssessment: string;
  status: 'active' | 'pending' | 'inactive';
  industry: string;
  assessmentCompleted: boolean;
  phishingScore: number;
  documentsUploaded: number;
  badges: string[];
}

export interface Assessment {
  id: string;
  vendorId: string;
  responses: Record<string, any>;
  score: number;
  completedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export interface AssessmentSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  questions: Question[];
  completed: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'multiple' | 'scale';
  options?: string[];
  value?: any;
  weight: number;
}

export interface PhishingResult {
  id: string;
  vendorId: string;
  emailId: string;
  action: 'clicked' | 'reported' | 'ignored';
  timestamp: string;
  scoreChange: number;
}

export interface Document {
  id: string;
  vendorId: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}