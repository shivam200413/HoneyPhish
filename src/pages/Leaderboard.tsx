import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Users,
  Target,
  Shield,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface LeaderboardEntry {
  id: string;
  name: string;
  email: string;
  company: string;
  score: number;
  rank: number;
  previousRank?: number;
  badge: 'platinum' | 'gold' | 'silver' | 'bronze' | null;
  phishingTestsPassed: number;
  totalTests: number;
  lastActivity: string;
  isCurrentUser?: boolean;
}

interface Badge {
  type: 'platinum' | 'gold' | 'silver' | 'bronze';
  name: string;
  color: string;
  icon: React.ReactNode;
  minScore: number;
  description: string;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBadge, setFilterBadge] = useState<string>('all');
  const [currentUserId] = useState('3'); // Mock current user

  const badges: Badge[] = [
    {
      type: 'platinum',
      name: 'Platinum Guardian',
      color: 'from-gray-300 to-gray-100',
      icon: <Crown className="w-6 h-6" />,
      minScore: 95,
      description: 'Elite security awareness - 95+ score',
    },
    {
      type: 'gold',
      name: 'Gold Defender',
      color: 'from-yellow-400 to-yellow-200',
      icon: <Trophy className="w-6 h-6" />,
      minScore: 85,
      description: 'Excellent security practices - 85+ score',
    },
    {
      type: 'silver',
      name: 'Silver Protector',
      color: 'from-gray-400 to-gray-200',
      icon: <Medal className="w-6 h-6" />,
      minScore: 75,
      description: 'Good security awareness - 75+ score',
    },
    {
      type: 'bronze',
      name: 'Bronze Sentinel',
      color: 'from-orange-400 to-orange-200',
      icon: <Award className="w-6 h-6" />,
      minScore: 65,
      description: 'Basic security knowledge - 65+ score',
    },
  ];

  useEffect(() => {
    // Mock leaderboard data
    const mockEntries: LeaderboardEntry[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@techcorp.com',
        company: 'TechCorp Solutions',
        score: 98,
        rank: 1,
        previousRank: 2,
        badge: 'platinum',
        phishingTestsPassed: 47,
        totalTests: 48,
        lastActivity: '2024-01-20T10:30:00Z',
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        email: 'michael.r@securenet.com',
        company: 'SecureNet Systems',
        score: 96,
        rank: 2,
        previousRank: 1,
        badge: 'platinum',
        phishingTestsPassed: 45,
        totalTests: 47,
        lastActivity: '2024-01-20T09:15:00Z',
      },
      {
        id: '3',
        name: 'You',
        email: 'current.user@company.com',
        company: 'Your Company',
        score: 92,
        rank: 3,
        previousRank: 4,
        badge: 'gold',
        phishingTestsPassed: 43,
        totalTests: 46,
        lastActivity: '2024-01-20T11:00:00Z',
        isCurrentUser: true,
      },
      {
        id: '4',
        name: 'Emily Johnson',
        email: 'emily.j@cloudtech.com',
        company: 'CloudTech Ltd.',
        score: 89,
        rank: 4,
        previousRank: 3,
        badge: 'gold',
        phishingTestsPassed: 41,
        totalTests: 45,
        lastActivity: '2024-01-19T16:45:00Z',
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david.kim@dataflow.com',
        company: 'DataFlow Inc.',
        score: 87,
        rank: 5,
        previousRank: 5,
        badge: 'gold',
        phishingTestsPassed: 38,
        totalTests: 44,
        lastActivity: '2024-01-19T14:20:00Z',
      },
      {
        id: '6',
        name: 'Lisa Wang',
        email: 'lisa.wang@networkpro.com',
        company: 'NetworkPro Solutions',
        score: 82,
        rank: 6,
        previousRank: 7,
        badge: 'silver',
        phishingTestsPassed: 35,
        totalTests: 42,
        lastActivity: '2024-01-19T12:10:00Z',
      },
      {
        id: '7',
        name: 'James Wilson',
        email: 'james.w@startup.com',
        company: 'Startup Inc.',
        score: 78,
        rank: 7,
        previousRank: 6,
        badge: 'silver',
        phishingTestsPassed: 32,
        totalTests: 41,
        lastActivity: '2024-01-18T18:30:00Z',
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria.g@consulting.com',
        company: 'Consulting Group',
        score: 71,
        rank: 8,
        previousRank: 8,
        badge: 'bronze',
        phishingTestsPassed: 28,
        totalTests: 39,
        lastActivity: '2024-01-18T15:45:00Z',
      },
    ];

    setEntries(mockEntries);
  }, []);

  const getBadgeForScore = (score: number): Badge | null => {
    for (const badge of badges) {
      if (score >= badge.minScore) {
        return badge;
      }
    }
    return null;
  };

  const getRankChange = (entry: LeaderboardEntry) => {
    if (!entry.previousRank) return null;
    const change = entry.previousRank - entry.rank;
    if (change > 0) {
      return { type: 'up', value: change };
    } else if (change < 0) {
      return { type: 'down', value: Math.abs(change) };
    }
    return { type: 'same', value: 0 };
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBadge === 'all' || entry.badge === filterBadge;
    
    return matchesSearch && matchesFilter;
  });

  const BadgeComponent: React.FC<{ badge: Badge; animated?: boolean }> = ({ badge, animated = false }) => (
    <motion.div
      className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-gray-800 text-sm font-medium`}
      animate={animated ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      title={badge.description}
    >
      {badge.icon}
      <span className="ml-1">{badge.name}</span>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Leaderboard</h1>
          <p className="text-gray-400 mt-2">
            Top performers in cybersecurity awareness training
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{entries.length}</div>
            <div className="text-gray-400 text-sm">Total Participants</div>
          </div>
        </div>
      </div>

      {/* Badge Legend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.type} className="text-center">
              <BadgeComponent badge={badge} />
              <p className="text-xs text-gray-400 mt-2">{badge.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterBadge}
              onChange={(e) => setFilterBadge(e.target.value)}
              className="px-4 py-2 bg-black/40 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Badges</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Badge
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tests Passed
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              <AnimatePresence>
                {filteredEntries.map((entry, index) => {
                  const rankChange = getRankChange(entry);
                  const badge = getBadgeForScore(entry.score);
                  
                  return (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`hover:bg-gray-800/30 transition-colors ${
                        entry.isCurrentUser ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {entry.rank <= 3 && (
                              <div className="mr-2">
                                {entry.rank === 1 && <Crown className="w-5 h-5 text-yellow-400" />}
                                {entry.rank === 2 && <Trophy className="w-5 h-5 text-gray-400" />}
                                {entry.rank === 3 && <Medal className="w-5 h-5 text-orange-400" />}
                              </div>
                            )}
                            <span className={`text-lg font-bold ${
                              entry.isCurrentUser ? 'text-blue-400' : 'text-white'
                            }`}>
                              #{entry.rank}
                            </span>
                          </div>
                          {rankChange && rankChange.type !== 'same' && (
                            <div className="flex items-center">
                              {rankChange.type === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-400" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-400" />
                              )}
                              <span className={`text-xs ml-1 ${
                                rankChange.type === 'up' ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {rankChange.value}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            entry.isCurrentUser ? 'bg-blue-600/20' : 'bg-gray-600/20'
                          }`}>
                            <Users className={`w-5 h-5 ${
                              entry.isCurrentUser ? 'text-blue-400' : 'text-gray-400'
                            }`} />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${
                              entry.isCurrentUser ? 'text-blue-300' : 'text-white'
                            }`}>
                              {entry.name}
                              {entry.isCurrentUser && (
                                <span className="ml-2 px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">{entry.email}</div>
                            <div className="text-xs text-gray-500">{entry.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`text-2xl font-bold mr-3 ${
                            entry.score >= 95 ? 'text-purple-400' :
                            entry.score >= 85 ? 'text-yellow-400' :
                            entry.score >= 75 ? 'text-gray-400' :
                            entry.score >= 65 ? 'text-orange-400' : 'text-red-400'
                          }`}>
                            {entry.score}
                          </div>
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${entry.score}%` }}
                              transition={{ delay: index * 0.1, duration: 1 }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {badge ? (
                          <BadgeComponent badge={badge} animated={entry.isCurrentUser} />
                        ) : (
                          <span className="text-gray-500 text-sm">No badge</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="text-white">
                            {entry.phishingTestsPassed}/{entry.totalTests}
                          </span>
                          <span className="text-gray-400 text-sm ml-2">
                            ({Math.round((entry.phishingTestsPassed / entry.totalTests) * 100)}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(entry.lastActivity).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Current User Highlight */}
      {entries.find(e => e.isCurrentUser) && (
        <Card className="p-6 border-blue-500/30 bg-blue-600/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Your Performance</h3>
                <p className="text-gray-400">
                  You're ranked #{entries.find(e => e.isCurrentUser)?.rank} out of {entries.length} participants
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">
                {entries.find(e => e.isCurrentUser)?.score}
              </div>
              <div className="text-gray-400 text-sm">Security Score</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;