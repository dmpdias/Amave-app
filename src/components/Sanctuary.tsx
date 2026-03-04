import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Quote, Flame, Activity, ChevronRight, Heart, Loader2, X, Share2, Edit2, Check, Mic, Clock, BookOpen, ChevronLeft, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

function PrayerDetail({ prayer, onBack, onStart }: { prayer: any, onBack: () => void, onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-[#FDFBF7] flex flex-col max-w-md mx-auto"
    >
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#2D2A26]">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold tracking-widest uppercase text-[#8B7355]">Prayer Detail</h2>
        <button className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#2D2A26]">
          <Heart size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl relative">
          <img src={`https://picsum.photos/seed/${prayer.title}/800/800`} alt={prayer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                {prayer.tag}
              </span>
            </div>
            <h1 className="text-3xl font-serif text-white leading-tight">{prayer.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col items-center gap-1">
            <Clock size={18} className="text-[#8B7355]" />
            <span className="text-[10px] font-bold text-[#A39E93] uppercase tracking-wider">Duration</span>
            <span className="text-xs font-bold text-[#2D2A26]">{prayer.duration}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col items-center gap-1">
            <Users size={18} className="text-[#8B7355]" />
            <span className="text-[10px] font-bold text-[#A39E93] uppercase tracking-wider">Praying</span>
            <span className="text-xs font-bold text-[#2D2A26]">{prayer.peopleCount}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col items-center gap-1">
            <BookOpen size={18} className="text-[#8B7355]" />
            <span className="text-[10px] font-bold text-[#A39E93] uppercase tracking-wider">Type</span>
            <span className="text-xs font-bold text-[#2D2A26]">Guided</span>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-[#A39E93] uppercase tracking-widest mb-3">Context</h3>
            <p className="text-[#2D2A26] leading-relaxed text-sm opacity-80">
              {prayer.context}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-bold text-[#A39E93] uppercase tracking-widest mb-3">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {['Inner Peace', 'Gratitude', 'Mindfulness'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[#5A5A40]/5 rounded-full text-xs font-medium text-[#5A5A40]">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="p-6 pb-10 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent">
        <button 
          onClick={onStart}
          className="w-full bg-[#5A5A40] text-white rounded-2xl py-5 font-bold shadow-xl shadow-[#5A5A40]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          <Play size={20} fill="currentColor" />
          Start Praying
        </button>
      </div>
    </motion.div>
  );
}

function PrayerPlayer({ prayer, onBack, onComplete }: { prayer: any, onBack: () => void, onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % prayer.lyrics.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, prayer.lyrics.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[70] bg-[#151619] text-white flex flex-col max-w-md mx-auto overflow-hidden"
    >
      <div className="p-6 flex items-center justify-between z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Now Praying</p>
          <h2 className="text-sm font-bold">{prayer.title}</h2>
        </div>
        <button onClick={onComplete} className="text-xs font-bold text-white/60">Done</button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={`https://picsum.photos/seed/${prayer.title}/800/800`} alt="" className="w-full h-full object-cover blur-3xl" referrerPolicy="no-referrer" />
        </div>
        
        <div className="space-y-8 z-10 mask-fade-edges">
          {prayer.lyrics.map((line: string, i: number) => (
            <motion.p
              key={i}
              animate={{ 
                opacity: i === currentLine ? 1 : 0.3,
                scale: i === currentLine ? 1.1 : 1,
                y: (i - currentLine) * 20
              }}
              className={`text-2xl font-serif leading-tight transition-all duration-700 ${i === currentLine ? 'text-white' : 'text-white/40'}`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="p-8 pb-12 space-y-8 z-10 bg-gradient-to-t from-[#151619] to-transparent">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <button className="text-white/40"><SkipBack size={24} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white text-[#151619] flex items-center justify-center shadow-2xl"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/40"><SkipForward size={24} /></button>
          </div>
          
          <motion.button 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-full bg-[#FF4444] flex items-center justify-center shadow-[0_0_30px_rgba(255,68,68,0.4)]"
          >
            <Mic size={32} />
          </motion.button>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Hold to speak your prayer</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Sanctuary() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [true, true, true, false, false, false, false];
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goals, setGoals] = useState({ prayer: 15, reading: 15, reflection: 10 });
  const [tempGoals, setTempGoals] = useState({ prayer: 15, reading: 15, reflection: 10 });

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    
    const quote = "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.";
    const verse = "John 14:27";
    
    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title: 'Quote of the Day',
          text: `"${quote}" - ${verse}`,
          url: window.location.href,
        });
      } catch (error) {
        // Only log if it's not a user cancellation
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`"${quote}" - ${verse}`);
        alert('Quote copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const saveGoals = () => {
    setGoals(tempGoals);
    setIsEditingGoals(false);
  };

  const hour = new Date().getHours();
  let greeting = "Good morning";
  let fallbackPrayer = {
    title: "Prayer for Clarity",
    description: "Guided by Brother Thomas, this short prayer helps center your mind before a busy workday.",
    tag: "Morning"
  };

  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
    fallbackPrayer = {
      title: "Mid-day Strength",
      description: "A moment of pause to renew your energy and focus for the rest of the day.",
      tag: "Afternoon"
    };
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening";
    fallbackPrayer = {
      title: "Evening Reflection",
      description: "Reflect on the day's blessings and challenges with a heart of gratitude.",
      tag: "Evening"
    };
  } else if (hour >= 22 || hour < 5) {
    greeting = "Good night";
    fallbackPrayer = {
      title: "Restful Peace",
      description: "Surrender your worries and find rest in the quiet presence of the Divine.",
      tag: "Night"
    };
  }

  const [aiPrayer, setAiPrayer] = useState<{ title: string; description: string; tag: string } | null>(null);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(true);
  const [view, setView] = useState<'list' | 'detail' | 'player'>('list');
  const [activePrayer, setActivePrayer] = useState<any>(null);

  useEffect(() => {
    async function fetchPersonalizedPrayer() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        let timeOfDay = "Morning";
        if (hour >= 12 && hour < 18) timeOfDay = "Afternoon";
        else if (hour >= 18 && hour < 22) timeOfDay = "Evening";
        else if (hour >= 22 || hour < 5) timeOfDay = "Night";

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate a short, personalized prayer suggestion for a user named David. The current time is ${timeOfDay}. The user has been active for 3 consecutive days. Tone should be warm, calming, and spiritual.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A short, comforting title for the prayer" },
                description: { type: Type.STRING, description: "A 1-2 sentence description of what the prayer focuses on" },
                tag: { type: Type.STRING, description: "A short tag like 'Morning', 'Evening', 'Clarity', 'Peace'" }
              },
              required: ["title", "description", "tag"]
            }
          }
        });
        
        if (response.text) {
          setAiPrayer(JSON.parse(response.text));
        }
      } catch (error) {
        console.error("Failed to generate prayer:", error);
      } finally {
        setIsLoadingPrayer(false);
      }
    }
    
    fetchPersonalizedPrayer();
  }, [hour]);

  const suggestedPrayer = aiPrayer || fallbackPrayer;

  if (view === 'detail' && activePrayer) {
    return <PrayerDetail prayer={activePrayer} onBack={() => setView('list')} onStart={() => setView('player')} />;
  }

  if (view === 'player' && activePrayer) {
    return <PrayerPlayer prayer={activePrayer} onBack={() => setView('detail')} onComplete={() => setView('list')} />;
  }

  return (
    <div className="h-full flex flex-col p-6 max-w-md mx-auto overflow-y-auto pb-32">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-serif text-[#2D2A26]">{greeting}, David.</h1>
          <p className="text-sm text-[#8B7355] mt-1">Your spirit is at peace today.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center overflow-hidden">
          <img src="https://picsum.photos/seed/david/100/100" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </header>

      {/* Live Counter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white/40 backdrop-blur-md rounded-full px-4 py-2 w-max mb-6 border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-xs font-medium text-[#5A5A40]">12,403 praying right now</span>
      </motion.div>

      {/* Quote of the Day */}
      <section className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6 border border-white/50 relative group">
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 text-[#8B7355]"
        >
          <Share2 size={16} />
        </button>
        <div className="flex items-start gap-3">
          <Quote className="text-[#D4C5B0] shrink-0" size={20} />
          <div>
            <p className="text-[#2D2A26] font-serif text-lg leading-snug mb-3">
              "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled."
            </p>
            <p className="text-xs text-[#8B7355] font-medium tracking-wide uppercase">John 14:27</p>
          </div>
        </div>
      </section>

      {/* Suggested Prayer */}
      <section className="bg-[#5A5A40] text-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(90,90,64,0.3)] mb-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B7355]/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Flame size={12} className="text-orange-300" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white/90">
                {isLoadingPrayer ? "Curating..." : `Daily Focus • ${suggestedPrayer.tag}`}
              </span>
            </div>
            {isLoadingPrayer ? (
              <Loader2 size={16} className="text-white/50 animate-spin" />
            ) : (
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#5A5A40] overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 backdrop-blur-md border-2 border-[#5A5A40] flex items-center justify-center text-[7px] sm:text-[8px] font-bold">
                  +12k
                </div>
              </div>
            )}
          </div>
          
          {isLoadingPrayer ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-8 bg-white/20 rounded-xl w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-white/20 rounded-full w-32 mt-4"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl sm:text-3xl font-serif mb-2 sm:mb-3 leading-tight">{suggestedPrayer.title}</h3>
              <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                {suggestedPrayer.description}
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    setActivePrayer({
                      ...suggestedPrayer,
                      duration: "5 min",
                      category: "Spiritual Growth",
                      peopleCount: "12,403",
                      context: "This prayer is designed to align your heart with divine peace during your morning transition.",
                      lyrics: [
                        "Heavenly Father, I come before You today...",
                        "With a heart full of gratitude and a mind seeking peace.",
                        "Guide my steps as I navigate the challenges ahead.",
                        "Let Your light shine through me in every interaction.",
                        "Grant me the wisdom to speak with kindness...",
                        "And the strength to act with integrity.",
                        "I surrender my worries and embrace Your grace.",
                        "Amen."
                      ]
                    });
                    setView('detail');
                  }}
                  className="bg-white text-[#5A5A40] rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-white/90 transition-all active:scale-95"
                >
                  Begin Prayer <ChevronRight size={16} />
                </button>
                <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Heart size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Progress & Analytics */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        {/* Weekly Streak */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-[#E07A5F]" size={18} />
            <span className="text-sm font-medium text-[#2D2A26]">3 Day Streak</span>
          </div>
          <div className="flex justify-between items-end h-10">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-1.5 rounded-full ${completedDays[i] ? 'bg-[#E07A5F] h-6' : 'bg-[#F0EBE1] h-3'}`}></div>
                <span className="text-[9px] font-medium text-[#A39E93]">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Rings */}
        <div 
          onClick={() => setIsAnalyticsOpen(true)}
          className="bg-white/40 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 flex flex-col justify-between items-center relative cursor-pointer hover:bg-white/50 transition-colors group"
        >
          <div className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="text-[#8B7355]" size={18} />
              <span className="text-sm font-medium text-[#2D2A26]">Daily Goal</span>
            </div>
            <ChevronRight size={16} className="text-[#A39E93] group-hover:text-[#8B7355] transition-colors" />
          </div>
          
          <div className="relative w-20 h-20 flex items-center justify-center mt-2">
            {/* Background Rings */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="rgba(139,115,85,0.2)" strokeWidth="5" fill="none" />
              <circle cx="40" cy="40" r="24" stroke="rgba(224,122,95,0.2)" strokeWidth="5" fill="none" />
              <circle cx="40" cy="40" r="16" stroke="rgba(90,90,64,0.2)" strokeWidth="5" fill="none" />
              
              {/* Progress Rings */}
              <circle cx="40" cy="40" r="32" stroke="#8B7355" strokeWidth="5" fill="none" strokeDasharray="201" strokeDashoffset={201 * (1 - 12/15)} strokeLinecap="round" />
              <circle cx="40" cy="40" r="24" stroke="#E07A5F" strokeWidth="5" fill="none" strokeDasharray="150" strokeDashoffset={150 * (1 - 10/15)} strokeLinecap="round" />
              <circle cx="40" cy="40" r="16" stroke="#5A5A40" strokeWidth="5" fill="none" strokeDasharray="100" strokeDashoffset={100 * (1 - 5/10)} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Analytics Modal */}
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto max-w-md mx-auto"
          >
            <div className="flex justify-between items-center mb-8 pt-4">
              <h2 className="text-2xl font-serif text-[#2D2A26]">Daily Progress</h2>
              <div className="flex items-center gap-2">
                {!isEditingGoals ? (
                  <button 
                    onClick={() => {
                      setTempGoals(goals);
                      setIsEditingGoals(true);
                    }}
                    className="w-8 h-8 rounded-full bg-white/40 border border-white/50 flex items-center justify-center text-[#8B7355] hover:bg-white/60 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={saveGoals}
                    className="w-8 h-8 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button 
                  onClick={() => {
                    setIsAnalyticsOpen(false);
                    setIsEditingGoals(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/40 border border-white/50 flex items-center justify-center text-[#2D2A26] hover:bg-white/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-10">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Rings */}
                  <circle cx="96" cy="96" r="80" stroke="rgba(139,115,85,0.2)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="60" stroke="rgba(224,122,95,0.2)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="40" stroke="rgba(90,90,64,0.2)" strokeWidth="14" fill="none" />
                  
                  {/* Progress Rings */}
                  <motion.circle 
                    initial={{ strokeDashoffset: 502 }}
                    animate={{ strokeDashoffset: 502 * (1 - 12/goals.prayer) }}
                    transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                    cx="96" cy="96" r="80" stroke="#8B7355" strokeWidth="14" fill="none" strokeDasharray="502" strokeLinecap="round" 
                  />
                  <motion.circle 
                    initial={{ strokeDashoffset: 377 }}
                    animate={{ strokeDashoffset: 377 * (1 - 10/goals.reading) }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    cx="96" cy="96" r="60" stroke="#E07A5F" strokeWidth="14" fill="none" strokeDasharray="377" strokeLinecap="round" 
                  />
                  <motion.circle 
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 251 * (1 - 5/goals.reflection) }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    cx="96" cy="96" r="40" stroke="#5A5A40" strokeWidth="14" fill="none" strokeDasharray="251" strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-4 pb-10">
              {/* Prayer Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8B7355]"></div>
                    <span className="font-medium text-[#2D2A26]">Prayer</span>
                  </div>
                  <span className="text-sm font-medium text-[#8B7355]">12 / {isEditingGoals ? (
                    <input 
                      type="number" 
                      value={tempGoals.prayer} 
                      onChange={(e) => setTempGoals({...tempGoals, prayer: parseInt(e.target.value) || 0})}
                      className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none"
                    />
                  ) : goals.prayer} min</span>
                </div>
                {isEditingGoals && (
                  <input 
                    type="range" 
                    min="1" 
                    max="60" 
                    value={tempGoals.prayer} 
                    onChange={(e) => setTempGoals({...tempGoals, prayer: parseInt(e.target.value)})}
                    className="w-full accent-[#8B7355] mb-2"
                  />
                )}
                <p className="text-xs text-[#A39E93] leading-relaxed">You're almost at your daily prayer goal. Keep finding moments of peace.</p>
              </motion.div>

              {/* Reading Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#E07A5F]"></div>
                    <span className="font-medium text-[#2D2A26]">Reading</span>
                  </div>
                  <span className="text-sm font-medium text-[#E07A5F]">10 / {isEditingGoals ? (
                    <input 
                      type="number" 
                      value={tempGoals.reading} 
                      onChange={(e) => setTempGoals({...tempGoals, reading: parseInt(e.target.value) || 0})}
                      className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none"
                    />
                  ) : goals.reading} min</span>
                </div>
                {isEditingGoals && (
                  <input 
                    type="range" 
                    min="1" 
                    max="60" 
                    value={tempGoals.reading} 
                    onChange={(e) => setTempGoals({...tempGoals, reading: parseInt(e.target.value)})}
                    className="w-full accent-[#E07A5F] mb-2"
                  />
                )}
                <p className="text-xs text-[#A39E93] leading-relaxed">Great progress in scripture reading today. The Word is a lamp to your feet.</p>
              </motion.div>

              {/* Reflection Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#5A5A40]"></div>
                    <span className="font-medium text-[#2D2A26]">Reflection</span>
                  </div>
                  <span className="text-sm font-medium text-[#5A5A40]">5 / {isEditingGoals ? (
                    <input 
                      type="number" 
                      value={tempGoals.reflection} 
                      onChange={(e) => setTempGoals({...tempGoals, reflection: parseInt(e.target.value) || 0})}
                      className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none"
                    />
                  ) : goals.reflection} min</span>
                </div>
                {isEditingGoals && (
                  <input 
                    type="range" 
                    min="1" 
                    max="60" 
                    value={tempGoals.reflection} 
                    onChange={(e) => setTempGoals({...tempGoals, reflection: parseInt(e.target.value)})}
                    className="w-full accent-[#5A5A40] mb-2"
                  />
                )}
                <p className="text-xs text-[#A39E93] leading-relaxed">Take a few more minutes to reflect on your day and express gratitude.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
