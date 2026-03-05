import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import {
  Users, Flame, Activity, Heart, Loader2, X,
  Share2, Edit2, Check, Mic, BookOpen, ChevronLeft,
  Play, Pause, SkipForward, SkipBack, ChevronRight,
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

// ─── Swipe-to-Start pill ──────────────────────────────────────────────────────
function SwipeToStart({ onSwipe }: { onSwipe: () => void }) {
  const x = useMotionValue(0);
  const MAX_DRAG = 186;

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > MAX_DRAG * 0.55) {
      onSwipe();
    } else {
      animate(x, 0, { type: 'spring', stiffness: 380, damping: 34 });
    }
  };

  return (
    <div
      className="relative rounded-2xl select-none"
      style={{
        width: 252,
        height: 52,
        background: 'rgba(255,255,255,0.09)',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      {/* Track label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[12px] font-medium text-white/38 tracking-wider">Swipe to begin ›</span>
      </div>
      {/* Draggable handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: MAX_DRAG }}
        dragElastic={0}
        dragMomentum={false}
        style={{
          x,
          position: 'absolute',
          left: 6,
          top: 6,
          width: 40,
          height: 40,
          borderRadius: 11,
          background: 'rgba(255,255,255,0.96)',
          boxShadow: '0 3px 12px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          zIndex: 10,
          touchAction: 'none',
        }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.93 }}
      >
        <ChevronRight size={14} style={{ color: '#2D1A0E' }} />
      </motion.div>
    </div>
  );
}

// ─── Prayer Detail ────────────────────────────────────────────────────────────
function PrayerDetail({ prayer, onBack, onStart }: { prayer: any; onBack: () => void; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-[#FAF5EE] flex flex-col max-w-md mx-auto"
    >
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/70 border border-black/5 flex items-center justify-center text-[#2D1A0E]">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold tracking-widest uppercase text-[#C8965A]">Prayer Detail</h2>
        <button className="w-10 h-10 rounded-full bg-white/70 border border-black/5 flex items-center justify-center text-[#2D1A0E]">
          <Heart size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl relative">
          <img src={`https://picsum.photos/seed/${prayer.title}/800/800`} alt={prayer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 mb-2 inline-block">{prayer.tag}</span>
            <h1 className="text-3xl font-serif text-white leading-tight">{prayer.title}</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[{ label: 'Duration', val: prayer.duration }, { label: 'Praying', val: prayer.peopleCount }, { label: 'Type', val: 'Guided' }].map(({ label, val }) => (
            <div key={label} className="bg-white/60 p-4 rounded-2xl border border-white/60 flex flex-col items-center gap-1">
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
        </div>
      </div>
      <div className="p-6 pb-10 bg-gradient-to-t from-[#FAF5EE] via-[#FAF5EE] to-transparent">
        <button onClick={onStart} className="w-full bg-[#2D1A0E] text-white rounded-2xl py-5 font-bold shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          <Play size={20} fill="currentColor" /> Start Praying
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[70] bg-[#130E08] text-white flex flex-col max-w-md mx-auto overflow-hidden">
      <div className="p-6 flex items-center justify-between z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"><ChevronLeft size={20} /></button>
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
            <motion.p key={i} animate={{ opacity: i === currentLine ? 1 : 0.3, scale: i === currentLine ? 1.05 : 1, y: (i - currentLine) * 20 }}
              className={`text-2xl font-serif leading-tight ${i === currentLine ? 'text-white' : 'text-white/40'}`}>{line}</motion.p>
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
          <motion.button animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-full bg-[#C8804A] flex items-center justify-center shadow-[0_0_30px_rgba(200,128,74,0.5)]">
            <Mic size={32} />
          </motion.button>
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Hold to speak your prayer</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Glass helpers ─────────────────────────────────────────────────────────────
const glassDark: React.CSSProperties = {
  background: 'rgba(28,18,8,0.76)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
};
const glassLight: React.CSSProperties = {
  background: 'rgba(255,255,255,0.38)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.58)',
  boxShadow: '0 4px 24px rgba(180,130,80,0.08)',
};

// ─── Ring Chart ───────────────────────────────────────────────────────────────
const RINGS = [
  { label: 'Prayer',     r: 88, sw: 15, color: '#C8965A', trackColor: 'rgba(200,150,90,0.14)' },
  { label: 'Reading',    r: 65, sw: 15, color: '#9A7248', trackColor: 'rgba(154,114,72,0.12)' },
  { label: 'Reflection', r: 42, sw: 15, color: '#B07060', trackColor: 'rgba(176,112,96,0.13)' },
] as const;

function RingChart({ prayer, reading, reflection, score }: { prayer: number; reading: number; reflection: number; score: number }) {
  const CX = 110, CY = 110;
  const values = [prayer, reading, reflection];

  return (
    <div className="flex flex-col items-center">
      <svg width={220} height={220} viewBox="0 0 220 220" style={{ overflow: 'visible' }}>
        <g transform={`rotate(-45, ${CX}, ${CY})`}>
          {RINGS.map((ring, i) => {
            const fullCirc = 2 * Math.PI * ring.r;
            const arcLen   = fullCirc * 0.75; // 270° of the circle
            const progress = Math.min(values[i], 1);
            const progLen  = progress * arcLen;

            return (
              <g key={ring.label}>
                {/* Track */}
                <circle
                  cx={CX} cy={CY} r={ring.r}
                  fill="none"
                  stroke={ring.trackColor}
                  strokeWidth={ring.sw}
                  strokeDasharray={`${arcLen} ${fullCirc - arcLen}`}
                  strokeLinecap="round"
                />
                {/* Progress arc */}
                <motion.circle
                  cx={CX} cy={CY} r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={ring.sw}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${fullCirc}` }}
                  animate={{ strokeDasharray: `${progLen} ${fullCirc - progLen}` }}
                  transition={{ duration: 1.6, ease: 'easeOut', delay: i * 0.15 }}
                />
                {/* Glow behind progress tip — only when there's progress */}
                {progLen > 0 && (
                  <motion.circle
                    cx={CX} cy={CY} r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={ring.sw + 4}
                    strokeLinecap="round"
                    strokeOpacity={0}
                    initial={{ strokeDasharray: `0 ${fullCirc}`, strokeOpacity: 0 }}
                    animate={{ strokeDasharray: `2 ${fullCirc - 2}`, strokeOpacity: 0.35 }}
                    transition={{ duration: 1.6, ease: 'easeOut', delay: i * 0.15 + 1.5 }}
                    style={{ filter: `blur(4px)` }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Score in centre */}
        <text
          x={CX} y={CY - 10}
          textAnchor="middle"
          fill="#2D1A0E"
          style={{ fontFamily: 'system-ui,-apple-system', fontWeight: 900, fontSize: 52, letterSpacing: -2 }}
        >
          {score}
        </text>
        <text
          x={CX} y={CY + 16}
          textAnchor="middle"
          fill="rgba(45,26,14,0.36)"
          style={{ fontFamily: 'system-ui', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase' }}
        >
          DEVOTION
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-1">
        {RINGS.map(r => (
          <div key={r.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
            <span className="text-[11px] text-[#2D1A0E]/45 font-medium">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  let greeting = 'Good morning,';
  let fallbackPrayer = {
    title: 'Prayer for Clarity',
    description: 'Your morning routine is building something beautiful. Spend 5 quiet minutes anchoring your heart before the day begins.',
    tag: 'Morning',
  };
  if (hour >= 12 && hour < 18) { greeting = 'Good afternoon,'; fallbackPrayer = { title: 'Mid-day Strength', description: 'You are halfway through. Pause, breathe, and let grace carry you through the rest of the day.', tag: 'Afternoon' }; }
  else if (hour >= 18 && hour < 22) { greeting = 'Good evening,'; fallbackPrayer = { title: 'Evening Reflection', description: 'Before the day closes, take a moment to offer thanks for what was, and surrender what was not.', tag: 'Evening' }; }
  else if (hour >= 22 || hour < 5) { greeting = 'Good night,'; fallbackPrayer = { title: 'Restful Peace', description: 'Lay down every burden. You have been held today — and you will be held through the night.', tag: 'Night' }; }

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
          contents: `Generate a short personalized prayer suggestion for a user named David. Time: ${timeOfDay}. 3 consecutive active days. Tone: warm, calming, spiritual. Description: 1-2 short emotionally resonant sentences.`,
          config: {
            responseMimeType: 'application/json',
            responseSchema: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, tag: { type: Type.STRING } }, required: ['title', 'description', 'tag'] },
          },
        });
        if (response.text) setAiPrayer(JSON.parse(response.text));
      } catch (e) { console.error('Failed to generate prayer:', e); }
      finally { setIsLoadingPrayer(false); }
    }
    fetchPersonalizedPrayer();
  }, [hour]);

  const handleShare = async () => {
    if (isSharing) return;
    const text = '"Peace I leave with you; my peace I give you." — John 14:27';
    if (navigator.share) { setIsSharing(true); try { await navigator.share({ title: 'Word of the Day', text, url: window.location.href }); } catch {} finally { setIsSharing(false); } }
    else { try { await navigator.clipboard.writeText(text); alert('Copied!'); } catch {} }
  };

  const saveGoals = () => { setGoals(tempGoals); setIsEditingGoals(false); };

  const suggestedPrayer = aiPrayer || fallbackPrayer;
  const streakCount = completedDays.filter(Boolean).length;

  // Progress ratios (0–1) for ring chart
  const prayerProg     = Math.min(12 / goals.prayer, 1);
  const readingProg    = Math.min(10 / goals.reading, 1);
  const reflectionProg = Math.min(5  / goals.reflection, 1);

  // Devotion score
  const score = Math.min(100, Math.round(streakCount * 6 + prayerProg * 30 + readingProg * 30 + reflectionProg * 22));

  const activities = [
    { task: 'Morning Prayer',    category: 'Prayer',     points: 50, color: '#C8965A' },
    { task: 'Scripture Reading', category: 'Reading',    points: 30, color: '#9A7248' },
    { task: 'Daily Reflection',  category: 'Reflection', points: 20, color: '#B07060' },
  ];

  const openPrayer = () => {
    setActivePrayer({
      ...suggestedPrayer,
      duration: '5 min', peopleCount: '12,403',
      context: 'This prayer is designed to align your heart with divine peace.',
      lyrics: ['Heavenly Father, I come before You today...', 'With a heart full of gratitude and a mind seeking peace.', 'Guide my steps as I navigate the challenges ahead.', 'Let Your light shine through me in every interaction.', 'Grant me the wisdom to speak with kindness...', 'And the strength to act with integrity.', 'I surrender my worries and embrace Your grace.', 'Amen.'],
    });
    setView('detail');
  };

  if (view === 'detail' && activePrayer) return <PrayerDetail prayer={activePrayer} onBack={() => setView('list')} onStart={() => setView('player')} />;
  if (view === 'player' && activePrayer) return <PrayerPlayer prayer={activePrayer} onBack={() => setView('detail')} onComplete={() => setView('list')} />;

  return (
    <div className="min-h-full pb-32">

      {/* ── HEADER — large greeting + premium avatar ─────────────── */}
      <header className="px-6 pt-10 pb-4 flex justify-between items-start">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="text-[15px] text-[#2D1A0E]/45 font-medium leading-none mb-1"
          >
            {greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="leading-none text-[#2D1A0E]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 'clamp(3rem, 12vw, 3.6rem)' }}
          >
            David.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="text-[13px] mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#C8965A' }}
          >
            {streakCount} days of devotion — keep going.
          </motion.p>
        </div>

        {/* Premium avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
          className="relative shrink-0 ml-4 mt-1"
        >
          {/* Rotating conic gradient ring */}
          <div
            className="absolute -inset-[3px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #C8965A 0%, #E8C078 25%, #F5E0B0 50%, #D4A860 75%, #C8965A 100%)',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
          {/* White separator ring */}
          <div className="absolute -inset-[1px] rounded-full bg-white/90" />
          {/* Avatar image */}
          <div className="relative w-[58px] h-[58px] rounded-full overflow-hidden">
            <img src="https://picsum.photos/seed/david/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          {/* Status indicator with pulse */}
          <div className="absolute bottom-0 right-0 w-4 h-4 flex items-center justify-center">
            <span className="absolute w-full h-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white block" />
          </div>
        </motion.div>
      </header>

      {/* ── WEEKLY STREAK — squared days, no card ───────────────── */}
      <div className="px-6 mb-7">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#2D1A0E]/30 mb-2.5">This Week</p>
        <div className="flex gap-2">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300 }}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={completedDays[i]
                  ? { background: 'linear-gradient(135deg, #C8965A 0%, #DBA866 100%)', boxShadow: '0 3px 10px rgba(200,150,90,0.38)' }
                  : { background: 'rgba(45,26,14,0.06)', border: '1px solid rgba(45,26,14,0.10)' }
                }
              >
                {completedDays[i] && <Check size={11} strokeWidth={3} style={{ color: 'white' }} />}
              </motion.div>
              <span
                className="text-[9px] font-bold tracking-wider"
                style={{ color: completedDays[i] ? '#C8965A' : 'rgba(45,26,14,0.25)' }}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CIRCULAR RING SCORE CHART ────────────────────────────── */}
      <div className="px-6 mb-2 flex flex-col items-center">
        <RingChart
          prayer={prayerProg}
          reading={readingProg}
          reflection={reflectionProg}
          score={score}
        />
        <button
          onClick={() => { setTempGoals(goals); setIsAnalyticsOpen(true); }}
          className="mt-4 px-6 py-2 rounded-full text-[12px] font-medium text-[#2D1A0E]/45 transition-all active:scale-95"
          style={{ background: 'rgba(45,26,14,0.055)', border: '1px solid rgba(45,26,14,0.08)' }}
        >
          Inside the score
        </button>
      </div>

      {/* ── SPIRITUAL TODAY — dark card with swipe ───────────────── */}
      <div className="px-5 mt-6 mb-4">
        <div className="rounded-[2rem] p-6 relative overflow-hidden" style={glassDark}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" style={{ background: 'rgba(200,150,90,0.12)' }} />
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/32 mb-3 relative z-10">Spiritual Today</p>

          {isLoadingPrayer ? (
            <div className="space-y-3 animate-pulse relative z-10">
              <div className="h-5 bg-white/10 rounded-full w-3/4" />
              <div className="h-4 bg-white/10 rounded-full w-full" />
              <div className="h-4 bg-white/10 rounded-full w-5/6" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
              <p
                className="text-[1.45rem] text-white leading-snug mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                {suggestedPrayer.description}
              </p>
              <SwipeToStart onSwipe={openPrayer} />
            </motion.div>
          )}

          <p className="text-[10px] text-white/25 flex items-center gap-1.5 mt-5 pt-4 border-t border-white/8 relative z-10">
            <Users size={9} /> 12,403 praying right now
          </p>
        </div>
      </div>

      {/* ── SCRIPTURE ────────────────────────────────────────────── */}
      <div className="px-5 mb-1 mt-2">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#2D1A0E]/32 mb-1">Scripture</p>
        <p className="text-[1.2rem] leading-snug text-[#2D1A0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
          A word for today.
        </p>
      </div>
      <div className="px-5 mb-4 relative">
        <div className="absolute -top-2 left-7 text-[5rem] leading-none pointer-events-none select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(45,26,14,0.07)' }}>"</div>
        <div className="rounded-[1.75rem] p-6 relative overflow-hidden" style={glassLight}>
          <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, #C8965A, #9A7248)' }} />
          <div className="pl-5 pt-2">
            <p className="text-[#2D1A0E] text-[1.15rem] leading-relaxed mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400 }}>
              Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#C8965A] tracking-widest uppercase">John 14:27</p>
                <p className="text-[9px] mt-0.5 tracking-wide" style={{ color: 'rgba(45,26,14,0.35)' }}>New International Version</p>
              </div>
              <button onClick={handleShare} className="p-2 rounded-full hover:text-[#C8965A] transition-colors active:scale-95" style={{ color: 'rgba(45,26,14,0.28)' }}>
                <Share2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVITY LOG ─────────────────────────────────────────── */}
      <div className="px-5 mb-1">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#2D1A0E]/32 mb-1">Activity Log</p>
        <p className="text-[1.2rem] leading-snug text-[#2D1A0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
          Your journey today.
        </p>
      </div>
      <div className="px-5 mb-6">
        <div className="rounded-[1.75rem] overflow-hidden" style={glassLight}>
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
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
                <span className="text-[10px] ml-0.5" style={{ color: 'rgba(45,26,14,0.4)' }}>pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── ANALYTICS MODAL ──────────────────────────────────────── */}
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col p-6 overflow-y-auto max-w-md mx-auto"
            style={{ background: 'rgba(252,245,237,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex justify-between items-center mb-8 pt-4">
              <h2 className="text-2xl text-[#2D1A0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Daily Progress</h2>
              <div className="flex items-center gap-2">
                {!isEditingGoals
                  ? <button onClick={() => { setTempGoals(goals); setIsEditingGoals(true); }} className="w-8 h-8 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-[#C8965A]"><Edit2 size={16} /></button>
                  : <button onClick={saveGoals} className="w-8 h-8 rounded-full bg-[#2D1A0E] text-white flex items-center justify-center shadow-md active:scale-95"><Check size={16} /></button>
                }
                <button onClick={() => { setIsAnalyticsOpen(false); setIsEditingGoals(false); }} className="w-8 h-8 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-[#2D1A0E]"><X size={18} /></button>
              </div>
            </div>

            <div className="flex justify-center mb-10">
              <RingChart prayer={prayerProg} reading={readingProg} reflection={reflectionProg} score={score} />
            </div>

            <div className="space-y-4 pb-10">
              {([
                { key: 'prayer'     as const, label: 'Prayer',     color: '#C8965A', current: 12, note: "You're almost at your daily prayer goal. Keep finding moments of peace." },
                { key: 'reading'    as const, label: 'Reading',    color: '#9A7248', current: 10, note: 'Great progress in scripture reading today. The Word is a lamp to your feet.' },
                { key: 'reflection' as const, label: 'Reflection', color: '#B07060', current: 5,  note: 'Take a few more minutes to reflect on your day and express gratitude.' },
              ]).map(({ key, label, color, current, note }, idx) => (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.15 }} className="rounded-3xl p-5" style={glassLight}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="font-medium text-[#2D1A0E]">{label}</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color }}>
                      {current} / {isEditingGoals
                        ? <input type="number" value={tempGoals[key]} onChange={e => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) || 0 })} className="w-12 bg-white/50 border border-white/50 rounded px-1 focus:outline-none text-[#2D1A0E]" />
                        : goals[key]} min
                    </span>
                  </div>
                  {isEditingGoals && <input type="range" min="1" max="60" value={tempGoals[key]} onChange={e => setTempGoals({ ...tempGoals, [key]: parseInt(e.target.value) })} className="w-full mb-2" style={{ accentColor: color }} />}
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(45,26,14,0.5)' }}>{note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
