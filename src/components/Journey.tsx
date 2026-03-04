import { useState } from 'react';
import { motion } from 'motion/react';
import { Book, Search, Play, Library, Target, Sparkles, ChevronRight } from 'lucide-react';

export default function Journey() {
  const [searchQuery, setSearchQuery] = useState('');

  const growthAreas = [
    { name: 'Patience', score: 85, color: '#8B7355' },
    { name: 'Gratitude', score: 92, color: '#5A5A40' },
    { name: 'Compassion', score: 78, color: '#E07A5F' },
    { name: 'Wisdom', score: 65, color: '#A39E93' },
  ];

  return (
    <div className="h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 bg-white/40 backdrop-blur-xl border-b border-white/50 z-10 sticky top-0">
        <h1 className="text-2xl font-serif text-[#2D2A26] mb-4">Journey</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39E93]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Bible, prayers, or topics..."
            className="w-full bg-white/50 backdrop-blur-md border border-white/50 rounded-full py-3 pl-12 pr-4 text-sm text-[#2D2A26] placeholder:text-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 transition-all"
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        
        {/* Spiritual Score */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-[#2D2A26] flex items-center gap-2">
              <Target size={18} className="text-[#8B7355]" /> Spiritual Growth
            </h2>
            <span className="text-xs font-medium text-[#A39E93] uppercase tracking-wider">This Month</span>
          </div>
          
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50">
            <div className="grid grid-cols-2 gap-4">
              {growthAreas.map((area, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-[#2D2A26]">{area.name}</span>
                    <span className="text-xs text-[#A39E93]">{area.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F0EBE1] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${area.score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: area.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="grid grid-cols-2 gap-4">
          <button className="bg-[#5A5A40]/80 backdrop-blur-md text-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(90,90,64,0.15)] flex flex-col justify-between h-32 relative overflow-hidden group hover:scale-[1.02] transition-transform border border-[#5A5A40]/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
            <Book size={24} className="text-white/80" />
            <div className="text-left">
              <h3 className="text-base font-serif mb-1">Holy Bible</h3>
              <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Read & Study</p>
            </div>
          </button>
          
          <button className="bg-white/40 backdrop-blur-md text-[#2D2A26] border border-white/50 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between h-32 group hover:border-[#8B7355] transition-colors">
            <Library size={24} className="text-[#8B7355]" />
            <div className="text-left">
              <h3 className="text-base font-serif mb-1">Prayer Library</h3>
              <p className="text-[10px] text-[#A39E93] uppercase tracking-wider font-medium">Browse Collections</p>
            </div>
          </button>
        </section>

        {/* AI Guided Prayers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-[#2D2A26] flex items-center gap-2">
              <Sparkles size={18} className="text-[#8B7355]" /> Guided by AI
            </h2>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Morning Gratitude', duration: '5 min', guide: 'Brother Thomas' },
              { title: 'Anxiety Relief', duration: '10 min', guide: 'Sister Mary' },
              { title: 'Evening Examen', duration: '15 min', guide: 'Father John' },
            ].map((prayer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50 flex items-center justify-between group cursor-pointer hover:border-[#8B7355] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center text-[#8B7355] group-hover:bg-[#8B7355] group-hover:text-white transition-colors">
                    <Play size={16} className="ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#2D2A26]">{prayer.title}</h3>
                    <p className="text-xs text-[#A39E93] mt-0.5">{prayer.duration} • {prayer.guide}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#A39E93] group-hover:text-[#8B7355] transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
