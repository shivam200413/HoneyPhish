import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Database,
  Globe,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface AssessmentSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  questions: Question[];
  completed: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'multiple' | 'scale';
  options?: string[];
  value?: any;
  weight: number;
}

const Assessment: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Record<string, any>>({});

  const sections: AssessmentSection[] = [
    {
      id: 'https',
      title: 'HTTPS & SSL Configuration',
      icon: <Globe className="w-5 h-5" />,
      completed: false,
      questions: [
        {
          id: 'https_enabled',
          text: 'Does your organization use HTTPS for all web applications?',
          type: 'boolean',
          weight: 15,
        },
        {
          id: 'ssl_certificate',
          text: 'What type of SSL certificate do you use?',
          type: 'multiple',
          options: ['Self-signed', 'Domain Validated (DV)', 'Organization Validated (OV)', 'Extended Validation (EV)'],
          weight: 10,
        },
        {
          id: 'certificate_expiry',
          text: 'How often do you monitor SSL certificate expiry?',
          type: 'multiple',
          options: ['Never', 'Manually when remembered', 'Monthly', 'Weekly', 'Automated monitoring'],
          weight: 8,
        },
      ],
    },
    {
      id: 'mfa',
      title: 'Multi-Factor Authentication',
      icon: <Lock className="w-5 h-5" />,
      completed: false,
      questions: [
        {
          id: 'mfa_enabled',
          text: 'Is multi-factor authentication (MFA) enabled for all user accounts?',
          type: 'boolean',
          weight: 20,
        },
        {
          id: 'mfa_type',
          text: 'What type of MFA do you primarily use?',
          type: 'multiple',
          options: ['SMS', 'Email', 'Authenticator App', 'Hardware Token', 'Biometric'],
          weight: 12,
        },
        {
          id: 'mfa_coverage',
          text: 'What percentage of your users have MFA enabled?',
          type: 'scale',
          weight: 15,
        },
      ],
    },
    {
      id: 'encryption',
      title: 'Data Encryption',
      icon: <Database className="w-5 h-5" />,
      completed: false,
      questions: [
        {
          id: 'data_at_rest',
          text: 'Is sensitive data encrypted at rest?',
          type: 'boolean',
          weight: 18,
        },
        {
          id: 'data_in_transit',
          text: 'Is data encrypted in transit between systems?',
          type: 'boolean',
          weight: 16,
        },
        {
          id: 'encryption_standard',
          text: 'What encryption standard do you use?',
          type: 'multiple',
          options: ['No encryption', 'Basic encryption', 'AES-128', 'AES-256', 'Industry-specific standards'],
          weight: 14,
        },
      ],
    },
    {
      id: 'incidents',
      title: 'Security Incidents',
      icon: <AlertTriangle className="w-5 h-5" />,
      completed: false,
      questions: [
        {
          id: 'breach_history',
          text: 'Has your organization experienced any data breaches in the last 2 years?',
          type: 'boolean',
          weight: -25,
        },
        {
          id: 'incident_response',
          text: 'Do you have a documented incident response plan?',
          type: 'boolean',
          weight: 12,
        },
        {
          id: 'response_time',
          text: 'What is your average incident response time?',
          type: 'multiple',
          options: ['No formal process', '> 24 hours', '12-24 hours', '4-12 hours', '< 4 hours'],
          weight: 10,
        },
      ],
    },
    {
      id: 'policies',
      title: 'Data Policies',
      icon: <FileText className="w-5 h-5" />,
      completed: false,
      questions: [
        {
          id: 'data_retention',
          text: 'Do you have a documented data retention policy?',
          type: 'boolean',
          weight: 8,
        },
        {
          id: 'privacy_policy',
          text: 'Is your privacy policy regularly updated and compliant with regulations?',
          type: 'boolean',
          weight: 10,
        },
        {
          id: 'employee_training',
          text: 'How often do you conduct security awareness training for employees?',
          type: 'multiple',
          options: ['Never', 'Annually', 'Bi-annually', 'Quarterly', 'Monthly'],
          weight: 12,
        },
      ],
    },
  ];

  const handleAnswerChange = (questionId: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateSectionScore = (section: AssessmentSection) => {
    let totalWeight = 0;
    let earnedPoints = 0;

    section.questions.forEach(question => {
      const answer = assessmentData[question.id];
      if (answer !== undefined) {
        totalWeight += Math.abs(question.weight);
        
        if (question.type === 'boolean') {
          if (answer === true && question.weight > 0) {
            earnedPoints += question.weight;
          } else if (answer === false && question.weight < 0) {
            earnedPoints += Math.abs(question.weight);
          }
        } else if (question.type === 'multiple' && question.options) {
          const selectedIndex = question.options.indexOf(answer);
          const maxIndex = question.options.length - 1;
          const scoreRatio = selectedIndex / maxIndex;
          earnedPoints += question.weight * scoreRatio;
        } else if (question.type === 'scale') {
          const percentage = answer / 100;
          earnedPoints += question.weight * percentage;
        }
      }
    });

    return totalWeight > 0 ? Math.round((earnedPoints / totalWeight) * 100) : 0;
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    let sectionCount = 0;

    sections.forEach(section => {
      const score = calculateSectionScore(section);
      if (score > 0) {
        totalScore += score;
        sectionCount++;
      }
    });

    return sectionCount > 0 ? Math.round(totalScore / sectionCount) : 0;
  };

  const renderQuestion = (question: Question, sectionId: string) => {
    const questionKey = `${sectionId}_${question.id}`;
    
    switch (question.type) {
      case 'boolean':
        return (
          <div className="space-y-3">
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswerChange(question.id, true)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  assessmentData[question.id] === true
                    ? 'border-green-500 bg-green-500/20 text-green-300'
                    : 'border-gray-600 hover:border-blue-400 text-gray-300'
                }`}
              >
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                Yes
              </button>
              <button
                onClick={() => handleAnswerChange(question.id, false)}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  assessmentData[question.id] === false
                    ? 'border-red-500 bg-red-500/20 text-red-300'
                    : 'border-gray-600 hover:border-blue-400 text-gray-300'
                }`}
              >
                <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
                No
              </button>
            </div>
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerChange(question.id, option)}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  assessmentData[question.id] === option
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-gray-600 hover:border-blue-400 text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={assessmentData[question.id] || 0}
              onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-blue-300 font-semibold">
              {assessmentData[question.id] || 0}%
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentSectionData = sections[currentSection];
  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Assessment</h1>
          <p className="text-gray-400 mt-2">
            Complete your cybersecurity assessment to receive a trust score
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{overallScore}</div>
          <div className="text-gray-400 text-sm">Overall Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Assessment Sections</h3>
            <div className="space-y-2">
              {sections.map((section, index) => {
                const score = calculateSectionScore(section);
                const isCompleted = section.questions.every(q => assessmentData[q.id] !== undefined);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      currentSection === index
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {section.icon}
                        <span className="ml-2 text-sm font-medium text-white">
                          {section.title}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                        {score > 0 && (
                          <span className="ml-2 text-xs text-blue-300">{score}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Assessment Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                {currentSectionData.icon}
                <span className="ml-2">{currentSectionData.title}</span>
              </h2>
              <p className="text-gray-400 mt-2">
                Section {currentSection + 1} of {sections.length}
              </p>
            </div>

            <div className="space-y-8">
              {currentSectionData.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700/50 pb-6 last:border-b-0"
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    {question.text}
                  </h3>
                  {renderQuestion(question, currentSectionData.id)}
                  <div className="mt-2 text-xs text-gray-500">
                    Weight: {question.weight > 0 ? '+' : ''}{question.weight} points
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700/50">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;