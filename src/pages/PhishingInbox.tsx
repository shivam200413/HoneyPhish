import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MailOpen,
  Shield,
  AlertTriangle,
  Flag,
  Clock,
  User,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
  isRead: boolean;
  isPhishing: boolean;
  content: string;
  hasAttachment?: boolean;
  priority?: 'high' | 'normal' | 'low';
  type: 'phishing' | 'safe' | 'reward' | 'misreport';
}

const PhishingInbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [userScore, setUserScore] = useState(85);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { addToast } = useToast();

  useEffect(() => {
    // Initialize with sample emails
    const initialEmails: Email[] = [
      {
        id: '1',
        sender: 'IT Security Team',
        senderEmail: 'security@company.com',
        subject: 'Urgent: Account Verification Required',
        timestamp: '2024-01-20T10:30:00Z',
        isRead: false,
        isPhishing: true,
        type: 'phishing',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #d32f2f;">URGENT: Account Verification Required</h2>
            <p>Dear User,</p>
            <p>We have detected suspicious activity on your account. To prevent unauthorized access, please verify your account immediately by clicking the link below:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="#" style="background: #d32f2f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">VERIFY ACCOUNT NOW</a>
            </div>
            <p>If you do not verify within 24 hours, your account will be suspended.</p>
            <p>Best regards,<br>IT Security Team</p>
            <p style="font-size: 12px; color: #666;">This is a simulated phishing email for training purposes.</p>
          </div>
        `,
        priority: 'high',
        hasAttachment: false,
      },
      {
        id: '2',
        sender: 'HR Department',
        senderEmail: 'hr@company.com',
        subject: 'Monthly Security Newsletter',
        timestamp: '2024-01-20T09:15:00Z',
        isRead: true,
        isPhishing: false,
        type: 'safe',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1976d2;">Monthly Security Newsletter</h2>
            <p>Dear Team,</p>
            <p>Welcome to our monthly security newsletter. This month we're focusing on:</p>
            <ul>
              <li>Password best practices</li>
              <li>Recognizing phishing attempts</li>
              <li>Secure remote work guidelines</li>
            </ul>
            <p>Remember to always verify suspicious emails before clicking any links.</p>
            <p>Stay secure,<br>HR Department</p>
          </div>
        `,
        priority: 'normal',
        hasAttachment: true,
      },
      {
        id: '3',
        sender: 'Bank Security',
        senderEmail: 'security@bank.com',
        subject: 'Suspicious Transaction Alert',
        timestamp: '2024-01-20T08:45:00Z',
        isRead: false,
        isPhishing: true,
        type: 'phishing',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #d32f2f;">Suspicious Transaction Detected</h2>
            <p>Dear Customer,</p>
            <p>We have detected a suspicious transaction of $2,500 on your account. If this was not you, please click below to secure your account:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="#" style="background: #d32f2f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">SECURE ACCOUNT</a>
            </div>
            <p>Transaction Details:</p>
            <ul>
              <li>Amount: $2,500.00</li>
              <li>Merchant: Online Store</li>
              <li>Time: 08:30 AM</li>
            </ul>
            <p>Best regards,<br>Bank Security Team</p>
            <p style="font-size: 12px; color: #666;">This is a simulated phishing email for training purposes.</p>
          </div>
        `,
        priority: 'high',
        hasAttachment: false,
      },
    ];
    setEmails(initialEmails);
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, isRead: true } : e
      ));
    }
  };

  const handleLinkClick = (email: Email) => {
    if (email.isPhishing) {
      // Redirect to fail page
      window.location.href = '/phishing-fail';
      setUserScore(prev => Math.max(0, prev - 10));
      addToast({
        type: 'error',
        message: 'You clicked a phishing link! Score decreased by 10 points.',
      });
    }
  };

  const handleReportPhishing = (email: Email) => {
    if (email.isPhishing) {
      // Correct report
      setUserScore(prev => prev + 15);
      addToast({
        type: 'success',
        message: 'Correct! You identified a phishing email. +15 points!',
      });
      
      // Add reward email
      const rewardEmail: Email = {
        id: `reward-${Date.now()}`,
        sender: 'HoneyPhish Security',
        senderEmail: 'security@honeyphish.com',
        subject: '🎉 Great Job! Phishing Email Detected',
        timestamp: new Date().toISOString(),
        isRead: false,
        isPhishing: false,
        type: 'reward',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #4caf50;">🎉 Excellent Security Awareness!</h2>
            <p>Congratulations!</p>
            <p>You correctly identified and reported a phishing email. This demonstrates excellent security awareness!</p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin: 0 0 10px 0;">Rewards:</h3>
              <ul style="margin: 0; color: #2e7d32;">
                <li>+15 Security Points</li>
                <li>Improved Trust Score</li>
                <li>Enhanced Security Badge Progress</li>
              </ul>
            </div>
            <p>Keep up the great work in protecting our organization!</p>
            <p>Best regards,<br>HoneyPhish Security Team</p>
          </div>
        `,
        priority: 'normal',
      };
      
      setEmails(prev => [rewardEmail, ...prev]);
    } else {
      // Incorrect report
      addToast({
        type: 'warning',
        message: 'This was a legitimate email. Review the educational content sent to your inbox.',
      });
      
      // Add educational email
      const educationalEmail: Email = {
        id: `education-${Date.now()}`,
        sender: 'HoneyPhish Security',
        senderEmail: 'security@honeyphish.com',
        subject: '📚 Learning Opportunity: Email Analysis',
        timestamp: new Date().toISOString(),
        isRead: false,
        isPhishing: false,
        type: 'misreport',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #ff9800;">📚 Learning Opportunity</h2>
            <p>You reported a legitimate email as phishing. Let's learn from this!</p>
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #f57c00; margin: 0 0 10px 0;">How to identify legitimate emails:</h3>
              <ul style="margin: 0; color: #f57c00;">
                <li>Check the sender's email domain</li>
                <li>Look for proper company branding</li>
                <li>Verify the content is relevant to your role</li>
                <li>Check for spelling and grammar</li>
              </ul>
            </div>
            <p>Remember: When in doubt, contact the sender through a separate channel to verify.</p>
            <p>Keep learning,<br>HoneyPhish Security Team</p>
          </div>
        `,
        priority: 'normal',
      };
      
      setEmails(prev => [educationalEmail, ...prev]);
    }
    
    setSelectedEmail(null);
  };

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.senderEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && !email.isRead) ||
                         (filterType === 'phishing' && email.isPhishing) ||
                         (filterType === 'safe' && !email.isPhishing);
    
    return matchesSearch && matchesFilter;
  });

  const getEmailIcon = (email: Email) => {
    if (email.type === 'reward') return <Star className="w-4 h-4 text-yellow-400" />;
    if (email.type === 'misreport') return <AlertTriangle className="w-4 h-4 text-orange-400" />;
    if (email.isPhishing) return <Shield className="w-4 h-4 text-red-400" />;
    return <Mail className="w-4 h-4 text-blue-400" />;
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Phishing Simulation Inbox</h1>
          <p className="text-gray-400 mt-2">
            Practice identifying phishing emails in a safe environment
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{userScore}</div>
            <div className="text-gray-400 text-sm">Security Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Inbox</h3>
              <span className="text-sm text-gray-400">
                {emails.filter(e => !e.isRead).length} unread
              </span>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Emails</option>
                <option value="unread">Unread</option>
                <option value="phishing">Phishing</option>
                <option value="safe">Safe</option>
              </select>
            </div>

            {/* Email List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredEmails.map((email, index) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleEmailClick(email)}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:bg-gray-800/50 ${
                    getPriorityColor(email.priority)
                  } ${
                    !email.isRead ? 'bg-blue-600/10 border-blue-500/30' : 'bg-gray-800/30 border-gray-600/30'
                  } ${
                    selectedEmail?.id === email.id ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {getEmailIcon(email)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm truncate ${!email.isRead ? 'font-semibold text-white' : 'text-gray-300'}`}>
                            {email.sender}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className={`text-sm truncate ${!email.isRead ? 'font-medium text-gray-200' : 'text-gray-400'}`}>
                          {email.subject}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {email.hasAttachment && <Paperclip className="w-3 h-3 text-gray-400" />}
                      {!email.isRead && <div className="w-2 h-2 bg-blue-400 rounded-full" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {selectedEmail ? (
              <div>
                {/* Email Header */}
                <div className="border-b border-gray-700/50 pb-4 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {selectedEmail.subject}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{selectedEmail.sender} &lt;{selectedEmail.senderEmail}&gt;</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(selectedEmail.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {selectedEmail.priority === 'high' && (
                      <span className="px-2 py-1 bg-red-600/20 text-red-300 text-xs rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReportPhishing(selectedEmail)}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Report as Phishing
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Email Content */}
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.tagName === 'A') {
                      e.preventDefault();
                      handleLinkClick(selectedEmail);
                    }
                  }}
                />

                {/* Phishing Warning */}
                {selectedEmail.isPhishing && (
                  <div className="mt-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-300 font-medium">
                        This is a simulated phishing email for training purposes
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">
                  Select an email to view
                </h3>
                <p className="text-gray-500">
                  Choose an email from the inbox to read its content
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhishingInbox;