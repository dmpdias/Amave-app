import { useState } from 'react';
import { Home, MessageCircleHeart, Users, BookOpen, User } from 'lucide-react';
import Sanctuary from './components/Sanctuary';
import Counselor from './components/Counselor';
import Community from './components/Community';
import Journey from './components/Journey';
import Profile from './components/Profile';
import ParticleBackground from './components/ParticleBackground';
import { motion, AnimatePresence } from 'motion/react';

// Sandy desert background — fixed, renders behind all pages
function SandyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base warm gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #DDB896 0%, #E8CBAE 18%, #EDD9C2 38%, #F3E6D4 60%, #F8EDDF 80%, #FCF5ED 100%)',
        }}
      />
      {/* Dune shapes */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 390 340"
        preserveAspectRatio="xMidYMax meet"
        style={{ height: '52vh' }}
      >
        {/* Back dune */}
        <path
          d="M-10,165 C70,128 165,112 250,130 C315,144 360,158 400,155 L400,340 L-10,340 Z"
          fill="rgba(240,223,200,0.55)"
        />
        {/* Mid dune */}
        <path
          d="M-10,200 C55,172 120,162 205,178 C280,192 338,214 400,204 L400,340 L-10,340 Z"
          fill="rgba(248,236,220,0.70)"
        />
        {/* Front dune */}
        <path
          d="M-10,242 C85,222 185,216 295,230 C345,238 372,242 400,238 L400,340 L-10,340 Z"
          fill="rgba(252,244,234,0.88)"
        />
        {/* Foreground */}
        <path
          d="M-10,278 C90,265 190,260 300,270 C348,276 374,278 400,274 L400,340 L-10,340 Z"
          fill="rgba(254,250,244,0.97)"
        />
      </svg>
    </div>
  );
}

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
    <div className="flex flex-col h-screen font-sans overflow-hidden">
      <SandyBackground />
      <ParticleBackground />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[380px] bg-white/55 backdrop-blur-2xl border border-white/55 px-6 py-3.5 rounded-full shadow-[0_8px_32px_rgba(180,130,80,0.12)] z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-[#B07840]' : 'text-[#B5A898]'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B07840]"
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
