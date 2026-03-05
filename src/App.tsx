import { useState } from 'react';
import { Home, MessageCircleHeart, Users, BookOpen, User } from 'lucide-react';
import Sanctuary from './components/Sanctuary';
import Counselor from './components/Counselor';
import Community from './components/Community';
import Journey from './components/Journey';
import Profile from './components/Profile';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sanctuary');

  const renderTab = () => {
    switch (activeTab) {
      case 'sanctuary': return <Sanctuary onNavigate={setActiveTab} />;
      case 'counselor': return <Counselor />;
      case 'community': return <Community />;
      case 'journey': return <Journey />;
      case 'profile': return <Profile />;
      default: return <Sanctuary />;
    }
  };

  const navItems = [
    { id: 'sanctuary', icon: Home, label: 'Sanctuary' },
    { id: 'counselor', icon: MessageCircleHeart, label: 'Counselor' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'journey', icon: BookOpen, label: 'Journey' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen text-[#2D2A26] font-sans overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[380px] bg-white/60 backdrop-blur-2xl border border-white/50 px-6 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-[#8B7355]' : 'text-[#A39E93]'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8B7355]"
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
