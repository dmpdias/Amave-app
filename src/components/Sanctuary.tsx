import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Flame, Activity, ChevronRight, Heart, Loader2, X, Share2, Edit2, Check, Mic, Clock, BookOpen, ChevronLeft, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

// Inline cross icon — spiritual identity marker
const CrossIcon = ({ size = 20, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M5 9.5h14" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
            <p className="text-[#2D2A26] leading-relaxed text-sm opacity-80">{prayer.context}</p>
          </section>
          <section>
            <h3 className="text-xs font-bold text-[#A39E93] uppercase tracking-widest mb-3">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {['Inner Peace', 'Gratitude', 'Mindfulness'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[#5A5A40]/5 rounded-full text-xs font-medium text-[#5A5A40]">{tag}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="p-6 pb-10 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent">
        <button onClick={onStart} className="w-full bg-[#5A5A40] text-white rounded-2xl py-5 font-bold shadow-xl shadow-[#5A5A40]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
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
        <div className="space-y-8 z-10">
          {prayer.lyrics.map((line: string, i: number) => (
            <motion.p
              key={i}
              animate={{ opacity: i === currentLine ? 1 : 0.3, scale: i === currentLine ? 1.1 : 1, y: (i - currentLine) * 20 }}
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
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-white text-[#151619] flex items-center justify-center shadow-2xl">
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

export default function Sanctuary({ onNavigate }: { onNavigate?: (tab: string) => void }) {
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
        await navigator.share({ title: 'Quote of the Day', text: `"${quote}" - ${verse}`, url: window.location.href });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') console.error('Error sharing:', error);
      } finally {
        setIsSharing(false);
      }
    } else {
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
    fallbackPrayer = { title: "Mid-day Strength", description: "A moment of pause to renew your energy and focus for the rest of the day.", tag: "Afternoon" };
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening";
    fallbackPrayer = { title: "Evening Reflection", description: "Reflect on the day's blessings and challenges with a heart of gratitude.", tag: "Evening" };
  } else if (hour >= 22 || hour < 5) {
    greeting = "Good night";
    fallbackPrayer = { title: "Restful Peace", description: "Surrender your worries and find rest in the quiet presence of the Divine.", tag: "Night" };
  }

  const [aiPrayer, setAiPrayer] = useState<{ title: string; description: string; tag: string } | null>(null);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(false);
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
        if (response.text) setAiPrayer(JSON.parse(response.text));
      } catch (error) {
        console.error("Failed to generate prayer:", error);
      } finally {
        setIsLoadingPrayer(false);
      }
    }
    fetchPersonalizedPrayer();
  }, [hour]);

  const suggestedPrayer = aiPrayer || fallbackPrayer;
  const streakCount = completedDays.filter(Boolean).length;
  const streakText = streakCount >= 3
    ? `${streakCount} days of devotion — keep going.`
    : streakCount > 0 ? `Day ${streakCount} of your journey.`
    : 'Your peace starts here today.';

  const activities = [
    { task: 'Morning Prayer', category: 'Prayer', points: 50, color: '#8B7355' },
    { task: 'Scripture Reading', category: 'Reading', points: 30, color: '#E07A5F' },
    { task: 'Daily Reflection', category: 'Reflection', points: 20, color: '#5A5A40' },
  ];

  if (view === 'detail' && activePrayer) {
    return <PrayerDetail prayer={activePrayer} onBack={() => setView('list')} onStart={() => setView('player')} />;
  }
  if (view === 'player' && activePrayer) {
    return <PrayerPlayer prayer={activePrayer} onBack={() => setView('detail')} onComplete={() => setView('list')} />;
  }

  return (
    <div className="min-h-full p-6 max-w-md mx-auto pb-32 relative">

      {/* ── Ambient warm glow behind header ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(212,197,176,0.35) 0%, transparent 70%)' }}
      />

      {/* ── Header ── */}
      <header className="mb-7 pt-4 relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1
              className="text-[2.1rem] leading-tight text-[#2D2A26]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              {greeting}, David.
            </h1>
            <p
              className="text-[1.05rem] text-[#8B7355] mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300 }}
            >
              {streakText}
            </p>
          </div>
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-md ring-2 ring-[#8B7355]/25 ring-offset-2 ring-offset-[#FDFBF7]">
              <img src="https://picsum.photos/seed/david/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#8B7355] border-2 border-[#FDFBF7] shadow-sm"></span>
          </div>
        </div>

        {/* Weekday rings */}
        <div className="mb-1.5">
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#C4BAB0]">This week</span>
        </div>
        <div className="flex items-center justify-between">
          {days.map((day, i) => {
            const r = 13;
            const circ = +(2 * Math.PI * r).toFixed(2);
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="relative w-9 h-9">
                  <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                    <circle cx="18" cy="18" r={r} stroke="#E8E0D5" strokeWidth="3" fill="none" />
                    {completedDays[i] && (
                      <motion.circle
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                        cx="18" cy="18" r={r}
                        stroke="#E07A5F" strokeWidth="3" fill="none"
                        strokeDasharray={circ} strokeLinecap="round"
                      />
                    )}
                  </svg>
                  {completedDays[i] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check size={10} className="text-[#E07A5F]" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className={`text-[9px] font-semibold tracking-wider ${completedDays[i] ? 'text-[#E07A5F]' : 'text-[#C4BAB0]'}`}>{day}</span>
              </div>
            );
          })}
        </div>
      </header>

      {/* ── Community intro ── */}
      <div className="mb-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#C4BAB0] mb-1">Community</p>
        <p
          className="text-[1.3rem] leading-snug text-[#2D2A26]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          You are not alone in this.
        </p>
      </div>

      {/* ── Live Counter — cross icon, warm amber card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl px-5 py-4 mb-6 flex items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255,249,240,0.95) 0%, rgba(254,244,228,0.85) 100%)',
          border: '1px solid rgba(139,115,85,0.18)',
          boxShadow: '0 4px 24px rgba(139,115,85,0.09)',
        }}
      >
        {/* Cross icon in gradient circle */}
        <div
          className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-md"
          style={{ background: 'linear-gradient(135deg, #8B7355 0%, #A08560 100%)', boxShadow: '0 4px 12px rgba(139,115,85,0.35)' }}
        >
          <CrossIcon size={18} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#2D2A26] leading-tight">12,403 souls praying right now</p>
        </div>
        <button
          onClick={() => onNavigate?.('community')}
          className="shrink-0 px-3.5 py-2 rounded-xl text-[11px] font-bold text-white transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #8B7355 0%, #A08560 100%)', boxShadow: '0 2px 8px rgba(139,115,85,0.35)' }}
        >
          Join
        </button>
      </motion.div>

      {/* ── Goals section intro ── */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#C4BAB0] mb-1">Daily Practice</p>
          <p
            className="text-[1.3rem] leading-snug text-[#2D2A26]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Your practice today.
          </p>
        </div>
        <button
          onClick={() => { setTempGoals(goals); setIsAnalyticsOpen(true); }}
          className="flex items-center gap-1 text-[10px] font-semibold text-[#8B7355] hover:opacity-70 transition-opacity mb-1"
        >
          <Edit2 size={10} /> Edit
        </button>
      </div>

      {/* ── Today's Goals — 3 rings ── */}
      <section
        className="rounded-3xl p-5 mb-6 relative overflow-hidden"
        style={{
          backgroundColor: '#FDFBF7',
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(139,115,85,0.025) 0px, rgba(139,115,85,0.025) 1px, transparent 1px, transparent 8px)',
          border: '1px solid rgba(232,224,213,0.7)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
        }}
      >
        <div className="grid grid-cols-3 gap-3">
          {([
            { label: 'Prayer', current: 12, goal: goals.prayer, color: '#8B7355', trackColor: 'rgba(139,115,85,0.12)' },
            { label: 'Reading', current: 10, goal: goals.reading, color: '#E07A5F', trackColor: 'rgba(224,122,95,0.12)' },
            { label: 'Reflection', current: 5, goal: goals.reflection, color: '#5A5A40', trackColor: 'rgba(90,90,64,0.12)' },
          ] as const).map(({ label, current, goal, color, trackColor }) => {
            const r = 30;
            const circ = +(2 * Math.PI * r).toFixed(2);
            const progress = Math.min(current / goal, 1);
            const offset = +(circ * (1 - progress)).toFixed(2);
            const isDone = current >= goal;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="relative w-[76px] h-[76px]"
                  style={isDone ? { filter: `drop-shadow(0 0 7px ${color}55)` } : {}}
                >
                  <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90 absolute inset-0">
                    <circle cx="38" cy="38" r={r} stroke={trackColor} strokeWidth="7" fill="none" />
                    <motion.circle
                      initial={{ strokeDashoffset: circ }}
                      animate={{ strokeDashoffset: offset }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      cx="38" cy="38" r={r} stroke={color} strokeWidth="7" fill="none"
                      strokeDasharray={circ} strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {isDone ? (
                      <Check size={20} style={{ color }} strokeWidth={2.5} />
                    ) : (
                      <>
                        <span className="text-[13px] font-bold leading-none" style={{ color }}>{current}m</span>
                        <span className="text-[8px] text-[#B5AFA8] leading-none mt-0.5">of {goal}</span>
                      </>
                    )}
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: isDone ? color : '#2D2A26' }}
                >
                  {label}{isDone ? ' ✓' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Daily Focus intro ── */}
      <div className="mb-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#C4BAB0] mb-1">Guided Prayer</p>
        <p
          className="text-[1.3rem] leading-snug text-[#2D2A26]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          {hour >= 18 ? 'Tonight\'s invitation.' : hour >= 12 ? 'This afternoon\'s invitation.' : 'This morning\'s invitation.'}
        </p>
      </div>

      {/* ── Daily Focus ── */}
      <section className="bg-gradient-to-br from-[#6B6B4A] via-[#5A5A40] to-[#3D3D28] text-white rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(90,90,64,0.35)] mb-6 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#8B7355]/25 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 8px)' }}></div>

        <div className="relative z-10">
          {isLoadingPrayer && (
            <div className="flex justify-end mb-4">
              <Loader2 size={16} className="text-white/50 animate-spin" />
            </div>
          )}

          {isLoadingPrayer ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-white/15 rounded-full w-2/5 mb-3"></div>
              <div className="h-8 bg-white/20 rounded-xl w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-white/20 rounded-full w-32 mt-4"></div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <p className="text-[10px] text-white/50 mb-2 flex items-center gap-1.5">
                <span className="text-amber-300">✦</span>
                Based on your {streakCount}-day streak
              </p>

              <h3 className="text-2xl font-serif mb-1.5 leading-tight">{suggestedPrayer.title}</h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 text-[10px] text-white/45">
                  <Clock size={10} /> 5 min
                </span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/25"></span>
                <span className="text-[10px] text-white/45">Guided</span>
              </div>

              <p className="text-white/60 mb-6 leading-relaxed text-sm">
                {suggestedPrayer.description}
              </p>

              <div className="flex items-center gap-3">
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
                  className="bg-white text-[#5A5A40] rounded-2xl px-7 py-3.5 text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-white/90 transition-all active:scale-95"
                >
                  Begin Prayer <ChevronRight size={16} />
                </button>
                <button className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-95">
                  <Heart size={17} />
                </button>
              </div>

              <p className="text-[10px] text-white/35 flex items-center gap-1.5 mt-5 pt-4 border-t border-white/10">
                <Users size={10} />
                12,403 people praying this tonight
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Daily Quote intro ── */}
      <div className="mb-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#C4BAB0] mb-1">Scripture</p>
        <p
          className="text-[1.3rem] leading-snug text-[#2D2A26]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          A word for today.
        </p>
      </div>

      {/* ── Daily Quote — editorial style ── */}
      <section className="mb-6 relative">
        {/* Large decorative opening quote */}
        <div
          className="absolute -top-4 left-3 text-[5.5rem] leading-none text-[#E8DDD0] pointer-events-none select-none z-0"
          style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}
        >
          "
        </div>
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.65)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}
        >
          {/* Left accent bar */}
          <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, #E07A5F, #8B7355)' }}></div>

          <div className="pl-5 pt-5">
            <p
              className="text-[#2D2A26] text-[1.2rem] leading-relaxed mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: 'italic' }}
            >
              Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#8B7355] tracking-widest uppercase">John 14:27</p>
                <p className="text-[9px] text-[#C4BAB0] mt-0.5 tracking-wide">New International Version</p>
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-[#C4BAB0] hover:text-[#8B7355] hover:bg-white/60 transition-all active:scale-95"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities section intro ── */}
      <div className="mb-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#C4BAB0] mb-1">Activity Log</p>
        <p
          className="text-[1.3rem] leading-snug text-[#2D2A26]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          Your journey today.
        </p>
      </div>

      {/* ── Today's Activities — unified card ── */}
      <section className="mb-6">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.65)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}
        >
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`px-4 py-3.5 flex items-center justify-between ${i < activities.length - 1 ? 'border-b border-[#F0EAE0]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activity.color + '28' }}
                >
                  {i === 0 && <Flame size={16} style={{ color: activity.color }} />}
                  {i === 1 && <BookOpen size={16} style={{ color: activity.color }} />}
                  {i === 2 && <Activity size={16} style={{ color: activity.color }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D2A26] leading-tight">{activity.task}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: activity.color + 'cc' }}>{activity.category}</span>
                </div>
              </div>
              <div
                className="flex items-center gap-0.5 px-3 py-1.5 rounded-full shrink-0"
                style={{ backgroundColor: activity.color + '18' }}
              >
                <span className="text-xs font-bold" style={{ color: activity.color }}>+{activity.points}</span>
                <span className="text-[10px] text-[#A39E93] ml-0.5">pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Analytics / Edit Goals Modal ── */}
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
                    onClick={() => { setTempGoals(goals); setIsEditingGoals(true); }}
                    className="w-8 h-8 rounded-full bg-white/40 border border-white/50 flex items-center justify-center text-[#8B7355] hover:bg-white/60 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                ) : (
                  <button onClick={saveGoals} className="w-8 h-8 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shadow-md transition-transform active:scale-95">
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => { setIsAnalyticsOpen(false); setIsEditingGoals(false); }}
                  className="w-8 h-8 rounded-full bg-white/40 border border-white/50 flex items-center justify-center text-[#2D2A26] hover:bg-white/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-10">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="rgba(139,115,85,0.2)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="60" stroke="rgba(224,122,95,0.2)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="40" stroke="rgba(90,90,64,0.2)" strokeWidth="14" fill="none" />
                  <motion.circle initial={{ strokeDashoffset: 502 }} animate={{ strokeDashoffset: 502 * (1 - 12 / goals.prayer) }} transition={{ duration: 1, delay: 0.1, ease: "easeOut" }} cx="96" cy="96" r="80" stroke="#8B7355" strokeWidth="14" fill="none" strokeDasharray="502" strokeLinecap="round" />
                  <motion.circle initial={{ strokeDashoffset: 377 }} animate={{ strokeDashoffset: 377 * (1 - 10 / goals.reading) }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} cx="96" cy="96" r="60" stroke="#E07A5F" strokeWidth="14" fill="none" strokeDasharray="377" strokeLinecap="round" />
                  <motion.circle initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 * (1 - 5 / goals.reflection) }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} cx="96" cy="96" r="40" stroke="#5A5A40" strokeWidth="14" fill="none" strokeDasharray="251" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 pb-10">
              {[
                { key: 'prayer' as const, label: 'Prayer', color: '#8B7355', current: 12, note: "You're almost at your daily prayer goal. Keep finding moments of peace." },
                { key: 'reading' as const, label: 'Reading', color: '#E07A5F', current: 10, note: "Great progress in scripture reading today. The Word is a lamp to your feet." },
                { key: 'reflection' as const, label: 'Reflection', color: '#5A5A40', current: 5, note: "Take a few more minutes to reflect on your day and express gratitude." },
              ].map(({ key, label, color, current, note }, idx) => (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.2 }} className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                      <span className="font-medium text-[#2D2A26]">{label}</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color }}>
                      {current} / {isEditingGoals ? (
                        <input type="number" value={tempGoals[key]} onChange={(e) => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) || 0 })} className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none" />
                      ) : goals[key]} min
                    </span>
                  </div>
                  {isEditingGoals && (
                    <input type="range" min="1" max="60" value={tempGoals[key]} onChange={(e) => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) })} className="w-full mb-2" style={{ accentColor: color }} />
                  )}
                  <p className="text-xs text-[#A39E93] leading-relaxed">{note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
