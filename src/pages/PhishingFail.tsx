import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ArrowLeft, LogOut, TrendingDown, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const PhishingFail: React.FC = () => {
  const [scoreDecrease] = useState(10);
  const [newScore, setNewScore] = useState(75);
  const [previousScore] = useState(85);

  useEffect(() => {
    // Animate score change
    const timer = setTimeout(() => {
      setNewScore(previousScore - scoreDecrease);
    }, 1000);

    return () => clearTimeout(timer);
  }, [previousScore, scoreDecrease]);

  const securityTips = [
    "Always verify the sender's email address carefully",
    "Look for spelling and grammar mistakes in emails",
    "Hover over links to see the actual destination URL",
    "Be suspicious of urgent or threatening language",
    "When in doubt, contact the sender through a separate channel",
    "Check for official company branding and signatures"
  ];

  const randomTip = securityTips[Math.floor(Math.random() * securityTips.length)];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Card className="p-8 border-red-500/30 bg-red-900/10">
          {/* Warning Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">
              Phishing Simulation Failed!
            </h1>
            <p className="text-gray-300 text-lg">
              You clicked on a simulated phishing link
            </p>
          </motion.div>

          {/* Score Change Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="bg-red-600/20 border border-red-500/30 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-4">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  Score Decreased by {scoreDecrease}
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <span className="line-through">{previousScore}</span>
                  <span>→</span>
                  <motion.span
                    initial={{ color: '#ef4444' }}
                    animate={{ color: '#ffffff' }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="font-bold text-xl"
                  >
                    {newScore}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Tip */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Security Tip
                </h3>
                <p className="text-gray-300">
                  {randomTip}
                </p>
              </div>
            </div>
          </motion.div>

          {/* What Happened */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              What Happened?
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                • You clicked on a link in a simulated phishing email
              </p>
              <p>
                • In a real scenario, this could have compromised your account or device
              </p>
              <p>
                • Your security score has been reduced to reflect this action
              </p>
              <p>
                • This is a learning opportunity to improve your security awareness
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/phishing-inbox" className="flex-1">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Inbox
              </Button>
            </Link>
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </Link>
            <Button variant="outline" className="flex-1">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>

          {/* Additional Learning Resources */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">
              Want to learn more about phishing protection?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm">
                Security Training
              </Button>
              <Button variant="outline" size="sm">
                Best Practices
              </Button>
              <Button variant="outline" size="sm">
                Report Real Phishing
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PhishingFail;