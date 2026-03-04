import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles, Send, Mic, UserRound } from 'lucide-react';

export default function Counselor() {
  const [message, setMessage] = useState('');
  const [activePersona, setActivePersona] = useState('guide');

  const personas = [
    { id: 'guide', name: 'Spiritual Guide', icon: Sparkles, color: 'bg-[#E8E4D9] text-[#8B7355]' },
    { id: 'priest', name: 'Father Thomas', icon: UserRound, color: 'bg-[#5A5A40] text-white' },
    { id: 'confessional', name: 'Confessional', icon: MessageCircle, color: 'bg-[#2D2A26] text-white' },
  ];

  return (
    <div className="h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-6 pt-10 pb-4 bg-white/40 backdrop-blur-xl border-b border-white/50 z-10 sticky top-0">
        <h1 className="text-2xl font-serif text-[#2D2A26] mb-4">Counselor</h1>
        
        {/* Persona Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {personas.map(p => {
            const Icon = p.icon;
            const isActive = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersona(p.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? p.color : 'bg-white/40 backdrop-blur-md border border-white/50 text-[#A39E93]'
                }`}
              >
                <Icon size={16} />
                {p.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        <div className="flex justify-center">
          <span className="text-xs font-medium text-[#A39E93] uppercase tracking-wider bg-[#F0EBE1] px-3 py-1 rounded-full">Today</span>
        </div>

        {/* AI Message */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 max-w-[85%]"
        >
          <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-[#8B7355]" />
          </div>
          <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl rounded-tl-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50">
            <p className="text-sm text-[#2D2A26] leading-relaxed">
              Peace be with you. I am here to listen, guide, and pray with you. What is on your heart today?
            </p>
          </div>
        </motion.div>

        {/* User Message */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 max-w-[85%] self-end ml-auto"
        >
          <div className="bg-[#5A5A40]/80 backdrop-blur-md p-4 rounded-2xl rounded-tr-none shadow-[0_2px_10px_rgba(90,90,64,0.1)] border border-[#5A5A40]/50 text-white">
            <p className="text-sm leading-relaxed">
              I've been feeling a bit overwhelmed with work lately and struggling to find time for myself.
            </p>
          </div>
        </motion.div>

        {/* AI Message */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 max-w-[85%]"
        >
          <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-[#8B7355]" />
          </div>
          <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl rounded-tl-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50">
            <p className="text-sm text-[#2D2A26] leading-relaxed mb-3">
              It is natural to feel burdened when the world demands so much of our time. Remember that even Jesus sought solitude to pray and recharge.
            </p>
            <div className="bg-white/30 backdrop-blur-md p-3 rounded-xl border border-white/40">
              <p className="text-xs font-medium text-[#8B7355] mb-1">Suggested Action</p>
              <p className="text-sm text-[#2D2A26]">Would you like me to guide you through a 3-minute prayer for peace and grounding?</p>
              <div className="flex gap-2 mt-3">
                <button className="bg-[#8B7355] text-white text-xs px-3 py-1.5 rounded-full font-medium">Yes, please</button>
                <button className="bg-white/50 backdrop-blur-md border border-white/50 text-[#5A5A40] text-xs px-3 py-1.5 rounded-full font-medium">Not right now</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-20 left-0 w-full bg-gradient-to-t from-[#FDFBF7]/80 via-[#FDFBF7]/50 to-transparent pt-10 pb-4 px-6 backdrop-blur-[2px]">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-white/50 backdrop-blur-md border border-white/50 rounded-full py-3.5 pl-5 pr-12 text-sm shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#8B7355] transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {message ? (
              <button className="w-8 h-8 bg-[#5A5A40] text-white rounded-full flex items-center justify-center transition-transform active:scale-95">
                <Send size={14} className="ml-0.5" />
              </button>
            ) : (
              <button className="w-8 h-8 text-[#A39E93] hover:text-[#5A5A40] rounded-full flex items-center justify-center transition-colors">
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
