import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MapPin, Heart, MessageCircle, MoreHorizontal, Globe, Shield, UserPlus } from 'lucide-react';

export default function Community() {
  const [activeTab, setActiveTab] = useState('wall');

  const tabs = [
    { id: 'wall', label: 'Prayer Wall' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'local', label: 'Local Acts' },
  ];

  return (
    <div className="h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-6 pt-10 pb-4 bg-white/40 backdrop-blur-xl border-b border-white/50 z-10 sticky top-0">
        <h1 className="text-2xl font-serif text-[#2D2A26] mb-4">Community</h1>
        
        {/* Tab Selector */}
        <div className="flex gap-4 border-b border-[#E8E4D9]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? 'text-[#8B7355]' : 'text-[#A39E93]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="community-tab-indicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B7355]"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        
        {/* Community Insights */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border border-white/50">
          <MapPin className="text-[#8B7355] shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-xs font-medium text-[#8B7355] uppercase tracking-wider mb-1">Local Insight</p>
            <p className="text-sm text-[#2D2A26] leading-snug">
              People in your area are praying an average of <strong>5 mins/day</strong> this week. Join them in a collective room.
            </p>
          </div>
        </div>

        {activeTab === 'wall' && (
          <div className="space-y-4">
            {/* New Request Button */}
            <button className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3 text-[#A39E93] hover:border-[#8B7355] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#F0EBE1] flex items-center justify-center">
                <Heart size={14} className="text-[#8B7355]" />
              </div>
              <span className="text-sm">Share a prayer request...</span>
            </button>

            {/* Prayer Wall Items */}
            {[
              { name: 'Sarah M.', time: '2h ago', content: 'Praying for my mother\'s upcoming surgery tomorrow morning. May the doctors have steady hands and clear minds.', prayers: 124, comments: 12 },
              { name: 'Anonymous', time: '5h ago', content: 'Struggling with anxiety about my career path. Seeking clarity and peace in my decisions.', prayers: 89, comments: 4 },
              { name: 'David K.', time: '1d ago', content: 'Thankful for the birth of our healthy baby girl, Eliana. God is good!', prayers: 342, comments: 45 },
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E8E4D9] flex items-center justify-center text-xs font-medium text-[#5A5A40]">
                      {post.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2D2A26]">{post.name}</p>
                      <p className="text-[10px] text-[#A39E93]">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-[#A39E93] hover:text-[#2D2A26]"><MoreHorizontal size={16} /></button>
                </div>
                <p className="text-sm text-[#2D2A26] leading-relaxed mb-4">{post.content}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-[#F0EBE1]">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#8B7355] hover:opacity-80 transition-opacity">
                    <Heart size={14} className="fill-current" />
                    <span>{post.prayers} Praying</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#A39E93] hover:text-[#2D2A26] transition-colors">
                    <MessageCircle size={14} />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-[#2D2A26] mb-2">Active Rooms</h2>
            
            {/* Room Cards */}
            {[
              { title: 'Morning Devotion', type: 'Community', icon: Globe, count: 145, host: 'Brother Thomas' },
              { title: 'Silent Meditation', type: 'Private', icon: Shield, count: 12, host: 'Sister Mary' },
              { title: 'Prayers for Healing', type: 'Community', icon: Globe, count: 89, host: 'Pastor John' },
            ].map((room, i) => {
              const Icon = room.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 flex items-center justify-between group cursor-pointer hover:border-[#8B7355] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F0EBE1] flex items-center justify-center text-[#8B7355] group-hover:bg-[#8B7355] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[#2D2A26]">{room.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider font-medium text-[#A39E93]">{room.type}</span>
                        <span className="w-1 h-1 rounded-full bg-[#E8E4D9]"></span>
                        <span className="text-xs text-[#8B7355] flex items-center gap-1">
                          <Users size={10} /> {room.count}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white/50 backdrop-blur-md text-[#5A5A40] border border-white/50 rounded-full px-4 py-1.5 text-xs font-medium group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    Join
                  </button>
                </motion.div>
              );
            })}
            
            <button className="w-full mt-4 py-3 border border-dashed border-[#A39E93] rounded-2xl text-sm font-medium text-[#8B7355] flex items-center justify-center gap-2 hover:bg-[#F0EBE1] transition-colors">
              <UserPlus size={16} /> Create a Room
            </button>
          </div>
        )}

        {activeTab === 'local' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-[#2D2A26] mb-2">Opportunities Near You</h2>
            
            {[
              { title: 'Food Bank Volunteer', org: 'St. Jude Parish', date: 'This Saturday, 9 AM', distance: '1.2 miles away' },
              { title: 'Elderly Care Visit', org: 'Mercy Home', date: 'Flexible', distance: '3.5 miles away' },
            ].map((act, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-medium text-[#2D2A26]">{act.title}</h3>
                  <span className="text-[10px] font-medium text-[#8B7355] bg-[#F0EBE1] px-2 py-1 rounded-full">{act.distance}</span>
                </div>
                <p className="text-sm text-[#A39E93] mb-4">{act.org} • {act.date}</p>
                <button className="w-full bg-[#5A5A40] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#4A4A30] transition-colors">
                  Sign Up
                </button>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
