import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Zap,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import Button from '../components/Button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'suggestion' | 'warning' | 'tip';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
}

const AIAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${user?.name || 'there'}! I'm your AI cybersecurity assistant. I'm here to help you improve your security posture, understand best practices, and answer any questions about cybersecurity. How can I assist you today?`,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type: 'text',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Security Assessment Help',
      description: 'Get guidance on completing your security assessment',
      icon: <Shield className="w-5 h-5" />,
      action: 'How can I improve my security assessment score?',
    },
    {
      id: '2',
      title: 'MFA Implementation',
      description: 'Learn about multi-factor authentication setup',
      icon: <Lock className="w-5 h-5" />,
      action: 'How do I implement multi-factor authentication?',
    },
    {
      id: '3',
      title: 'Phishing Protection',
      description: 'Tips for identifying and avoiding phishing attacks',
      icon: <AlertTriangle className="w-5 h-5" />,
      action: 'How can I better identify phishing emails?',
    },
    {
      id: '4',
      title: 'Data Encryption',
      description: 'Understanding data encryption best practices',
      icon: <CheckCircle className="w-5 h-5" />,
      action: 'What are the best practices for data encryption?',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('mfa') || lowerMessage.includes('multi-factor') || lowerMessage.includes('authentication')) {
      return `Multi-Factor Authentication (MFA) is crucial for security! Here's how to implement it:

1. **Choose an MFA method**: Authenticator apps (Google Authenticator, Authy), SMS, or hardware tokens
2. **Enable on all critical accounts**: Email, cloud services, admin panels
3. **Backup codes**: Always save backup codes in a secure location
4. **User training**: Educate your team on MFA importance

For your assessment, enabling MFA can increase your trust score by up to 20 points!`;
    }
    
    if (lowerMessage.includes('phishing') || lowerMessage.includes('email')) {
      return `Great question about phishing protection! Here are key indicators to watch for:

🚩 **Red Flags:**
- Urgent language ("Act now!", "Account suspended")
- Generic greetings ("Dear Customer")
- Suspicious sender addresses
- Unexpected attachments or links
- Grammar/spelling errors

✅ **Best Practices:**
- Hover over links to see actual URLs
- Verify sender through separate communication
- Use email security filters
- Regular phishing awareness training

Remember: When in doubt, don't click! Report suspicious emails instead.`;
    }
    
    if (lowerMessage.includes('encryption') || lowerMessage.includes('data')) {
      return `Data encryption is fundamental to cybersecurity! Here's what you need to know:

🔐 **Encryption Types:**
- **At Rest**: Encrypt stored data (AES-256 recommended)
- **In Transit**: Use TLS/SSL for data transmission
- **End-to-End**: For sensitive communications

📋 **Implementation Steps:**
1. Identify sensitive data locations
2. Choose appropriate encryption standards
3. Implement key management policies
4. Regular encryption audits

Proper encryption can significantly boost your security assessment score!`;
    }
    
    if (lowerMessage.includes('assessment') || lowerMessage.includes('score')) {
      return `I can help you improve your security assessment score! Here are the highest-impact areas:

⭐ **High Impact (15-20 points each):**
- Enable MFA across all systems
- Implement HTTPS with valid SSL certificates
- Encrypt data at rest and in transit

⭐ **Medium Impact (8-12 points each):**
- Regular security training
- Incident response plan
- Data retention policies

⭐ **Quick Wins:**
- Update SSL certificates
- Document security policies
- Regular backup testing

Would you like specific guidance on any of these areas?`;
    }
    
    return `I understand you're asking about "${userMessage}". Here are some general cybersecurity best practices:

🛡️ **Core Security Principles:**
- Keep software updated
- Use strong, unique passwords
- Enable MFA wherever possible
- Regular security training
- Backup data regularly

💡 **For Your Organization:**
- Conduct regular security assessments
- Implement a security incident response plan
- Monitor for unusual activities
- Keep security policies updated

Is there a specific security topic you'd like me to elaborate on?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Security Assistant</h1>
          <p className="text-gray-400 mt-2">
            Get real-time cybersecurity guidance and best practices
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">AI Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-honey-purple" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              onClick={() => handleQuickAction(action.action)}
              className="p-4 rounded-lg border border-gray-600 hover:border-honey-purple bg-gray-800/50 hover:bg-honey-purple/10 transition-all text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-honey-purple/20 rounded-lg flex items-center justify-center">
                  {action.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium">{action.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{action.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-honey-purple/20' 
                          : 'bg-honey-blue/20'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-honey-purple" />
                        ) : (
                          <Bot className="w-4 h-4 text-honey-blue" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-honey-purple/20 text-white'
                          : 'bg-gray-800/50 text-gray-200'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-honey-blue/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-honey-blue" />
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-honey-blue rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-honey-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-honey-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex space-x-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about cybersecurity..."
                  className="flex-1 p-3 bg-black/40 border border-honey-purple/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-honey-purple focus:ring-1 focus:ring-honey-purple/20 resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Tips Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
              Security Tips
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-300 font-medium text-sm">Password Security</h4>
                <p className="text-gray-300 text-xs mt-1">
                  Use unique passwords for each account and enable MFA
                </p>
              </div>
              <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-300 font-medium text-sm">Software Updates</h4>
                <p className="text-gray-300 text-xs mt-1">
                  Keep all software and systems updated with latest patches
                </p>
              </div>
              <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <h4 className="text-purple-300 font-medium text-sm">Data Backup</h4>
                <p className="text-gray-300 text-xs mt-1">
                  Regular backups protect against ransomware and data loss
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-honey-purple" />
              Resources
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:border-honey-purple transition-colors">
                <div className="text-white text-sm font-medium">Security Checklist</div>
                <div className="text-gray-400 text-xs">Complete security assessment guide</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:border-honey-purple transition-colors">
                <div className="text-white text-sm font-medium">Best Practices</div>
                <div className="text-gray-400 text-xs">Industry security standards</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:border-honey-purple transition-colors">
                <div className="text-white text-sm font-medium">Training Materials</div>
                <div className="text-gray-400 text-xs">Educational resources and guides</div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;