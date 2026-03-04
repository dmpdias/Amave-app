import { motion } from 'motion/react';
import { User, Settings, Bookmark, Heart, Gift, CreditCard, Palette, ChevronRight, LogOut } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { icon: Bookmark, label: 'Saved Prayers & Quotes', color: 'text-[#8B7355]' },
    { icon: Heart, label: 'My Prayer Requests', color: 'text-[#E07A5F]' },
    { icon: Gift, label: 'Invite Friends (Earn Free Months)', color: 'text-[#5A5A40]' },
    { icon: CreditCard, label: 'Subscription Management', color: 'text-[#2D2A26]' },
    { icon: Palette, label: 'Customize App Icon', color: 'text-[#A39E93]' },
    { icon: Settings, label: 'Settings & Privacy', color: 'text-[#2D2A26]' },
  ];

  return (
    <div className="h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 bg-white/40 backdrop-blur-xl border-b border-white/50 z-10 sticky top-0 flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#2D2A26]">Profile</h1>
        <button className="text-[#A39E93] hover:text-[#2D2A26] transition-colors">
          <Settings size={20} />
        </button>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        
        {/* User Info */}
        <section className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center overflow-hidden border-4 border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <img src="https://picsum.photos/seed/david/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7A6244] transition-colors">
              <User size={14} />
            </button>
          </div>
          <h2 className="text-xl font-serif text-[#2D2A26] mb-1">David Kim</h2>
          <p className="text-sm text-[#A39E93]">Member since 2024</p>
          
          <div className="flex gap-4 mt-6 w-full">
            <div className="flex-1 bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50">
              <p className="text-2xl font-serif text-[#8B7355] mb-1">42</p>
              <p className="text-[10px] uppercase tracking-wider font-medium text-[#A39E93]">Prayers Read</p>
            </div>
            <div className="flex-1 bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50">
              <p className="text-2xl font-serif text-[#5A5A40] mb-1">14</p>
              <p className="text-[10px] uppercase tracking-wider font-medium text-[#A39E93]">Day Streak</p>
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-white/50 flex items-center justify-between group hover:border-[#8B7355] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full bg-[#F0EBE1] flex items-center justify-center ${item.color} group-hover:bg-[#8B7355] group-hover:text-white transition-colors`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-[#2D2A26]">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-[#A39E93] group-hover:text-[#8B7355] transition-colors" />
              </motion.button>
            );
          })}
        </section>

        {/* Logout */}
        <section className="pt-4 border-t border-white/50">
          <button className="w-full py-4 text-sm font-medium text-[#E07A5F] flex items-center justify-center gap-2 hover:bg-white/40 rounded-2xl transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </section>

      </div>
    </div>
  );
}
