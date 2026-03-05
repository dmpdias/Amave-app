import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Flame, Activity, ChevronRight, Heart, Loader2, X,
  Share2, Edit2, Check, Mic, Clock, BookOpen, ChevronLeft,
  Play, Pause, SkipForward, SkipBack, ArrowRight,
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

// ─── Sparkline ───────────────────────────────────────────────────────────────
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const W = 64, H = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / (max - min || 1)) * H;
      return { x, y };
    });
  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="mb-2 overflow-visible">
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.8" fill="white" stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  );
};

// ─── Prayer Detail ────────────────────────────────────────────────────────────
function PrayerDetail({ prayer, onBack, onStart }: { prayer: any; onBack: () => void; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-[#FAF5EE] flex flex-col max-w-md mx-auto"
    >
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/70 border border-black/5 flex items-center justify-center text-[#2D1A0E]">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold tracking-widest uppercase text-[#B07840]">Prayer Detail</h2>
        <button className="w-10 h-10 rounded-full bg-white/70 border border-black/5 flex items-center justify-center text-[#2D1A0E]">
          <Heart size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl relative">
          <img src={`https://picsum.photos/seed/${prayer.title}/800/800`} alt={prayer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 mb-2 inline-block">
              {prayer.tag}
            </span>
            <h1 className="text-3xl font-serif text-white leading-tight">{prayer.title}</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Clock size={18} className="text-[#B07840]" />, label: 'Duration', val: prayer.duration },
            { icon: <Users size={18} className="text-[#B07840]" />, label: 'Praying', val: prayer.peopleCount },
            { icon: <BookOpen size={18} className="text-[#B07840]" />, label: 'Type', val: 'Guided' },
          ].map(({ icon, label, val }) => (
            <div key={label} className="bg-white/60 p-4 rounded-2xl border border-white/60 flex flex-col items-center gap-1">
              {icon}
              <span className="text-[10px] font-bold text-[#B5A898] uppercase tracking-wider">{label}</span>
              <span className="text-xs font-bold text-[#2D1A0E]">{val}</span>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-[#B5A898] uppercase tracking-widest mb-3">Context</h3>
            <p className="text-[#2D1A0E] leading-relaxed text-sm opacity-80">{prayer.context}</p>
          </section>
          <section>
            <h3 className="text-xs font-bold text-[#B5A898] uppercase tracking-widest mb-3">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {['Inner Peace', 'Gratitude', 'Mindfulness'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-[#B07840]/8 rounded-full text-xs font-medium text-[#B07840]">{tag}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="p-6 pb-10 bg-gradient-to-t from-[#FAF5EE] via-[#FAF5EE] to-transparent">
        <button onClick={onStart} className="w-full bg-[#2D1A0E] text-white rounded-2xl py-5 font-bold shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          <Play size={20} fill="currentColor" />
          Start Praying
        </button>
      </div>
    </motion.div>
  );
}

// ─── Prayer Player ────────────────────────────────────────────────────────────
function PrayerPlayer({ prayer, onBack, onComplete }: { prayer: any; onBack: () => void; onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setCurrentLine(p => (p + 1) % prayer.lyrics.length), 4000);
    return () => clearInterval(t);
  }, [isPlaying, prayer.lyrics.length]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[70] bg-[#130E08] text-white flex flex-col max-w-md mx-auto overflow-hidden"
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
              animate={{ opacity: i === currentLine ? 1 : 0.3, scale: i === currentLine ? 1.05 : 1, y: (i - currentLine) * 20 }}
              className={`text-2xl font-serif leading-tight ${i === currentLine ? 'text-white' : 'text-white/40'}`}
            >{line}</motion.p>
          ))}
        </div>
      </div>
      <div className="p-8 pb-12 space-y-8 z-10 bg-gradient-to-t from-[#130E08] to-transparent">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <button className="text-white/40"><SkipBack size={24} /></button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-white text-[#130E08] flex items-center justify-center shadow-2xl">
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/40"><SkipForward size={24} /></button>
          </div>
          <motion.button
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-full bg-[#C8804A] flex items-center justify-center shadow-[0_0_30px_rgba(200,128,74,0.5)]"
          >
            <Mic size={32} />
          </motion.button>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Hold to speak your prayer</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Glass card style helper ──────────────────────────────────────────────────
const glassLight: React.CSSProperties = {
  background: 'rgba(255,255,255,0.38)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.58)',
  boxShadow: '0 4px 24px rgba(180,130,80,0.08)',
};
const glassDark: React.CSSProperties = {
  background: 'rgba(28,18,8,0.76)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
};

// ─── Sanctuary ────────────────────────────────────────────────────────────────
export default function Sanctuary({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [true, true, true, false, false, false, false];
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goals, setGoals] = useState({ prayer: 15, reading: 15, reflection: 10 });
  const [tempGoals, setTempGoals] = useState({ prayer: 15, reading: 15, reflection: 10 });
  const [isSharing, setIsSharing] = useState(false);
  const [aiPrayer, setAiPrayer] = useState<{ title: string; description: string; tag: string } | null>(null);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(true);
  const [view, setView] = useState<'list' | 'detail' | 'player'>('list');
  const [activePrayer, setActivePrayer] = useState<any>(null);

  const hour = new Date().getHours();
  let greeting = 'Good morning';
  let fallbackPrayer = {
    title: 'Prayer for Clarity',
    description: 'Your morning routine is building something beautiful. Spend 5 quiet minutes anchoring your heart before the day begins.',
    tag: 'Morning',
  };
  if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
    fallbackPrayer = { title: 'Mid-day Strength', description: 'You are halfway through. Pause, breathe, and let grace carry you through the rest of the day.', tag: 'Afternoon' };
  } else if (hour >= 18 && hour < 22) {
    greeting = 'Good evening';
    fallbackPrayer = { title: 'Evening Reflection', description: 'Before the day closes, take a moment to offer thanks for what was, and surrender what was not.', tag: 'Evening' };
  } else if (hour >= 22 || hour < 5) {
    greeting = 'Good night';
    fallbackPrayer = { title: 'Restful Peace', description: 'Lay down every burden. You have been held today — and you will be held through the night.', tag: 'Night' };
  }

  useEffect(() => {
    async function fetchPersonalizedPrayer() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        let timeOfDay = 'Morning';
        if (hour >= 12 && hour < 18) timeOfDay = 'Afternoon';
        else if (hour >= 18 && hour < 22) timeOfDay = 'Evening';
        else if (hour >= 22 || hour < 5) timeOfDay = 'Night';
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Generate a short personalized prayer suggestion for a user named David. Time: ${timeOfDay}. Active 3 consecutive days. Tone: warm, calming, spiritual. The description should be 1-2 short, emotionally resonant sentences.`,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                tag: { type: Type.STRING },
              },
              required: ['title', 'description', 'tag'],
            },
          },
        });
        if (response.text) setAiPrayer(JSON.parse(response.text));
      } catch (error) {
        console.error('Failed to generate prayer:', error);
      } finally {
        setIsLoadingPrayer(false);
      }
    }
    fetchPersonalizedPrayer();
  }, [hour]);

  const handleShare = async () => {
    if (isSharing) return;
    const text = '"Peace I leave with you; my peace I give you." — John 14:27';
    if (navigator.share) {
      setIsSharing(true);
      try { await navigator.share({ title: 'Word of the Day', text, url: window.location.href }); }
      catch (e) { if (e instanceof Error && e.name !== 'AbortError') console.error(e); }
      finally { setIsSharing(false); }
    } else {
      try { await navigator.clipboard.writeText(text); alert('Copied to clipboard!'); } catch {}
    }
  };

  const saveGoals = () => { setGoals(tempGoals); setIsEditingGoals(false); };

  const suggestedPrayer = aiPrayer || fallbackPrayer;
  const streakCount = completedDays.filter(Boolean).length;

  // Devotion score
  const score = Math.min(100, Math.round(
    streakCount * 6 +
    Math.min(12 / goals.prayer, 1) * 30 +
    Math.min(10 / goals.reading, 1) * 30 +
    Math.min(5 / goals.reflection, 1) * 22,
  ));
  const scoreChange = 3; // week-on-week

  // Metric cards
  const metrics = [
    { label: 'Prayer', value: 12, unit: 'min', color: '#C8965A', sparkData: [8, 10, 7, 12, 15, 12, 12] },
    { label: 'Reading', value: 10, unit: 'min', color: '#9A7248', sparkData: [10, 8, 12, 10, 8, 11, 10] },
    { label: 'Reflection', value: 5, unit: 'min', color: '#B07060', sparkData: [3, 5, 4, 6, 5, 4, 5] },
  ];

  const activities = [
    { task: 'Morning Prayer', category: 'Prayer', points: 50, color: '#C8965A' },
    { task: 'Scripture Reading', category: 'Reading', points: 30, color: '#9A7248' },
    { task: 'Daily Reflection', category: 'Reflection', points: 20, color: '#B07060' },
  ];

  if (view === 'detail' && activePrayer) return <PrayerDetail prayer={activePrayer} onBack={() => setView('list')} onStart={() => setView('player')} />;
  if (view === 'player' && activePrayer) return <PrayerPlayer prayer={activePrayer} onBack={() => setView('detail')} onComplete={() => setView('list')} />;

  return (
    <div className="min-h-full pb-32">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="px-5 pt-8 mb-6 flex justify-between items-start">
        <div>
          <p className="text-[13px] text-[#2D1A0E]/55 leading-none mb-1">{greeting},</p>
          <h1
            className="text-[2.2rem] leading-tight text-[#2D1A0E]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            David.
          </h1>
        </div>
        <div className="relative shrink-0 mt-1">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/70 ring-offset-2 ring-offset-transparent shadow-md">
            <img src="https://picsum.photos/seed/david/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#C8965A] border-2 border-white shadow-sm" />
        </div>
      </header>

      {/* ── Score Hero ──────────────────────────────────────────── */}
      <div className="px-5 mb-4">
        <div className="rounded-[2rem] p-6 pb-7 relative overflow-hidden" style={glassLight}>
          {/* Grain texture inside card */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.055]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#2D1A0E]/40 mb-2 relative z-10">
            Devotion Score
          </p>
          <div className="flex items-start gap-2 relative z-10">
            <span
              className="text-[6.8rem] leading-none text-[#2D1A0E]"
              style={{ fontFamily: 'system-ui, -apple-system', fontWeight: 900, letterSpacing: '-4px' }}
            >
              {score}
            </span>
            <span className="mt-4 ml-1 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full leading-none">
              +{scoreChange}
            </span>
          </div>
          <button
            onClick={() => { setTempGoals(goals); setIsAnalyticsOpen(true); }}
            className="mt-3 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#2D1A0E]/55 relative z-10 transition-all active:scale-95"
            style={{ background: 'rgba(45,26,14,0.06)', border: '1px solid rgba(45,26,14,0.08)' }}
          >
            Inside the score
          </button>
        </div>
      </div>

      {/* ── Three Metric Cards ──────────────────────────────────── */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-4">
        {metrics.map(m => (
          <div key={m.label} className="rounded-[1.5rem] p-3.5" style={glassLight}>
            <Sparkline data={m.sparkData} color={m.color} />
            <div className="flex items-baseline gap-0.5">
              <span className="text-[1.45rem] font-bold text-[#2D1A0E] leading-none">{m.value}</span>
              <span className="text-[11px] text-[#2D1A0E]/45">{m.unit}</span>
            </div>
            <p className="text-[11px] text-[#2D1A0E]/55 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Suggested Prayer — dark glass card ─────────────────── */}
      <div className="px-5 mb-4">
        <div className="rounded-[2rem] p-6 relative overflow-hidden" style={glassDark}>
          {/* Subtle warm glow */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"
            style={{ background: 'rgba(200,150,90,0.12)' }} />

          <p className="text-[10px] font-bold tracking-widest uppercase text-white/35 mb-3 relative z-10">
            Spiritual Today
          </p>

          {isLoadingPrayer ? (
            <div className="space-y-3 animate-pulse relative z-10">
              <div className="h-5 bg-white/10 rounded-full w-3/4" />
              <div className="h-4 bg-white/10 rounded-full w-full" />
              <div className="h-4 bg-white/10 rounded-full w-5/6" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
              <p
                className="text-[1.45rem] text-white leading-snug mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                {suggestedPrayer.description}
              </p>
              <button
                onClick={() => {
                  setActivePrayer({
                    ...suggestedPrayer,
                    duration: '5 min',
                    peopleCount: '12,403',
                    context: 'This prayer is designed to align your heart with divine peace.',
                    lyrics: [
                      'Heavenly Father, I come before You today...',
                      'With a heart full of gratitude and a mind seeking peace.',
                      'Guide my steps as I navigate the challenges ahead.',
                      'Let Your light shine through me in every interaction.',
                      'Grant me the wisdom to speak with kindness...',
                      'And the strength to act with integrity.',
                      'I surrender my worries and embrace Your grace.',
                      'Amen.',
                    ],
                  });
                  setView('detail');
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all active:scale-95"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                <ArrowRight size={19} />
              </button>
            </motion.div>
          )}

          <p className="text-[10px] text-white/28 flex items-center gap-1.5 mt-5 pt-4 border-t border-white/8 relative z-10">
            <Users size={9} />
            12,403 praying right now
          </p>
        </div>
      </div>

      {/* ── This Week strip ─────────────────────────────────────── */}
      <div className="px-5 mb-4">
        <div className="rounded-[1.5rem] px-5 py-4" style={glassLight}>
          <p className="text-[9px] font-bold tracking-widest uppercase text-[#2D1A0E]/35 mb-3">This Week</p>
          <div className="flex items-center justify-between">
            {days.map((day, i) => {
              const r = 12;
              const circ = +(2 * Math.PI * r).toFixed(2);
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="relative w-8 h-8">
                    <svg width="32" height="32" viewBox="0 0 32 32" className="absolute inset-0 -rotate-90">
                      <circle cx="16" cy="16" r={r} stroke="rgba(45,26,14,0.1)" strokeWidth="3" fill="none" />
                      {completedDays[i] && (
                        <motion.circle
                          initial={{ strokeDashoffset: circ }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                          cx="16" cy="16" r={r}
                          stroke="#C8965A" strokeWidth="3" fill="none"
                          strokeDasharray={circ} strokeLinecap="round"
                        />
                      )}
                    </svg>
                    {completedDays[i] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check size={9} strokeWidth={3} style={{ color: '#C8965A' }} />
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] font-semibold tracking-wider ${completedDays[i] ? 'text-[#C8965A]' : 'text-[#2D1A0E]/30'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Scripture ───────────────────────────────────────────── */}
      <div className="px-5 mb-1">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#2D1A0E]/38 mb-1">Scripture</p>
        <p className="text-[1.2rem] leading-snug text-[#2D1A0E]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
          A word for today.
        </p>
      </div>
      <div className="px-5 mb-4 relative">
        <div className="absolute -top-2 left-7 text-[5rem] leading-none text-[#2D1A0E]/08 pointer-events-none select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</div>
        <div className="rounded-[1.75rem] p-6 relative overflow-hidden" style={glassLight}>
          <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full"
            style={{ background: 'linear-gradient(to bottom, #C8965A, #9A7248)' }} />
          <div className="pl-5 pt-2">
            <p className="text-[#2D1A0E] text-[1.15rem] leading-relaxed mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400 }}>
              Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#C8965A] tracking-widest uppercase">John 14:27</p>
                <p className="text-[9px] text-[#2D1A0E]/38 mt-0.5 tracking-wide">New International Version</p>
              </div>
              <button onClick={handleShare} className="p-2 rounded-full text-[#2D1A0E]/30 hover:text-[#C8965A] transition-colors active:scale-95">
                <Share2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Activity Log ────────────────────────────────────────── */}
      <div className="px-5 mb-1">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#2D1A0E]/38 mb-1">Activity Log</p>
        <p className="text-[1.2rem] leading-snug text-[#2D1A0E]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
          Your journey today.
        </p>
      </div>
      <div className="px-5 mb-6">
        <div className="rounded-[1.75rem] overflow-hidden" style={glassLight}>
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`px-4 py-3.5 flex items-center justify-between ${i < activities.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(45,26,14,0.07)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: a.color + '22' }}>
                  {i === 0 && <Flame size={16} style={{ color: a.color }} />}
                  {i === 1 && <BookOpen size={16} style={{ color: a.color }} />}
                  {i === 2 && <Activity size={16} style={{ color: a.color }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D1A0E] leading-tight">{a.task}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: a.color + 'cc' }}>{a.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full shrink-0" style={{ backgroundColor: a.color + '18' }}>
                <span className="text-xs font-bold" style={{ color: a.color }}>+{a.points}</span>
                <span className="text-[10px] text-[#2D1A0E]/40 ml-0.5">pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Analytics Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col p-6 overflow-y-auto max-w-md mx-auto"
            style={{ background: 'rgba(252,245,237,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex justify-between items-center mb-8 pt-4">
              <h2 className="text-2xl text-[#2D1A0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Daily Progress</h2>
              <div className="flex items-center gap-2">
                {!isEditingGoals ? (
                  <button onClick={() => { setTempGoals(goals); setIsEditingGoals(true); }} className="w-8 h-8 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-[#C8965A]">
                    <Edit2 size={16} />
                  </button>
                ) : (
                  <button onClick={saveGoals} className="w-8 h-8 rounded-full bg-[#2D1A0E] text-white flex items-center justify-center shadow-md active:scale-95">
                    <Check size={16} />
                  </button>
                )}
                <button onClick={() => { setIsAnalyticsOpen(false); setIsEditingGoals(false); }} className="w-8 h-8 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-[#2D1A0E]">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex justify-center mb-10">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="rgba(200,150,90,0.15)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="60" stroke="rgba(154,114,72,0.15)" strokeWidth="14" fill="none" />
                  <circle cx="96" cy="96" r="40" stroke="rgba(176,112,96,0.15)" strokeWidth="14" fill="none" />
                  <motion.circle initial={{ strokeDashoffset: 502 }} animate={{ strokeDashoffset: 502 * (1 - 12 / goals.prayer) }} transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }} cx="96" cy="96" r="80" stroke="#C8965A" strokeWidth="14" fill="none" strokeDasharray="502" strokeLinecap="round" />
                  <motion.circle initial={{ strokeDashoffset: 377 }} animate={{ strokeDashoffset: 377 * (1 - 10 / goals.reading) }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} cx="96" cy="96" r="60" stroke="#9A7248" strokeWidth="14" fill="none" strokeDasharray="377" strokeLinecap="round" />
                  <motion.circle initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 * (1 - 5 / goals.reflection) }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} cx="96" cy="96" r="40" stroke="#B07060" strokeWidth="14" fill="none" strokeDasharray="251" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-bold text-[#2D1A0E]">{score}</p>
                  <p className="text-[10px] text-[#2D1A0E]/40 tracking-widest uppercase">Score</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pb-10">
              {[
                { key: 'prayer' as const, label: 'Prayer', color: '#C8965A', current: 12, note: "You're almost at your daily prayer goal. Keep finding moments of peace." },
                { key: 'reading' as const, label: 'Reading', color: '#9A7248', current: 10, note: 'Great progress in scripture reading today. The Word is a lamp to your feet.' },
                { key: 'reflection' as const, label: 'Reflection', color: '#B07060', current: 5, note: 'Take a few more minutes to reflect on your day and express gratitude.' },
              ].map(({ key, label, color, current, note }, idx) => (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.15 }} className="rounded-3xl p-5" style={glassLight}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="font-medium text-[#2D1A0E]">{label}</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color }}>
                      {current} / {isEditingGoals ? (
                        <input type="number" value={tempGoals[key]} onChange={e => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) || 0 })} className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none text-[#2D1A0E]" />
                      ) : goals[key]} min
                    </span>
                  </div>
                  {isEditingGoals && (
                    <input type="range" min="1" max="60" value={tempGoals[key]} onChange={e => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) })} className="w-full mb-2" style={{ accentColor: color }} />
                  )}
                  <p className="text-xs text-[#2D1A0E]/50 leading-relaxed">{note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
