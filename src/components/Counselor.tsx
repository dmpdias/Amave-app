import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, BookmarkPlus, ChevronRight } from 'lucide-react';

const personas = [
  {
    id: 'guide',
    name: 'Spiritual Guide',
    role: 'AI Companion',
    bio: 'Your always-available spiritual companion. Guided prayers, scripture reflections, and personalized insights based on your journey.',
    initial: '✦',
    color: '#8B7355',
    cardBg: 'rgba(245,240,232,0.9)',
    openingMessage: 'Peace be with you. I am here to listen, guide, and pray with you. What is on your heart today?',
    dark: false,
  },
  {
    id: 'priest',
    name: 'Father Thomas',
    role: 'Spiritual Director',
    bio: 'Ordained priest with 20 years of pastoral experience. Offers sacramental guidance, spiritual direction, and prayerful counsel.',
    initial: 'FT',
    color: '#5A5A40',
    cardBg: 'rgba(234,234,222,0.9)',
    openingMessage: "God's peace be with you, David. I'm here to walk with you in faith. How may I guide you today?",
    dark: false,
  },
  {
    id: 'confessional',
    name: 'Confessional',
    role: 'Sacred & Private',
    bio: 'A solemn, confidential space for examination of conscience and spiritual reconciliation. All conversations are fully private.',
    initial: '✝',
    color: '#A39E93',
    cardBg: 'rgba(35,32,28,0.95)',
    openingMessage: 'In the name of the Father, and of the Son, and of the Holy Spirit. This is a sacred and private space. Take your time.',
    dark: true,
  },
];

const moodOptions = ['Burdened', 'Anxious', 'Seeking', 'Peaceful', 'Grateful'];

const promptChips = [
  'Guide me through a prayer',
  'I\'m struggling with something',
  'Help me reflect on my day',
  'I need guidance on a decision',
];

export default function Counselor() {
  const [message, setMessage] = useState('');
  const [activePersona, setActivePersona] = useState('guide');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const persona = personas.find(p => p.id === activePersona)!;
  const isConfessional = activePersona === 'confessional';

  return (
    <div
      className="h-full flex flex-col max-w-md mx-auto transition-colors duration-500"
      style={{ background: isConfessional ? '#151310' : undefined }}
    >
      {/* ── Header ── */}
      <header
        className="px-6 pt-10 pb-4 z-10 sticky top-0 transition-colors duration-500"
        style={{
          background: isConfessional
            ? 'rgba(21,19,16,0.97)'
            : 'rgba(253,251,247,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: isConfessional
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(255,255,255,0.5)',
        }}
      >
        <h1
          className="text-[2rem] leading-tight mb-5 transition-colors duration-500"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: isConfessional ? 'rgba(255,255,255,0.85)' : '#2D2A26',
          }}
        >
          Counselor
        </h1>

        {/* ── Persona cards ── */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
          {personas.map(p => {
            const isActive = activePersona === p.id;
            return (
              <motion.button
                key={p.id}
                onClick={() => setActivePersona(p.id)}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 w-[188px] text-left rounded-2xl p-3.5 transition-all duration-300"
                style={{
                  background: isActive
                    ? p.cardBg
                    : isConfessional
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.5)',
                  border: isActive
                    ? `1.5px solid ${p.color}45`
                    : isConfessional
                      ? '1px solid rgba(255,255,255,0.07)'
                      : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: isActive ? `0 4px 18px ${p.color}18` : 'none',
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{
                      background: p.dark ? `${p.color}25` : `${p.color}18`,
                      color: p.dark ? 'rgba(255,255,255,0.75)' : p.color,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    {p.initial}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[12px] font-semibold leading-tight truncate"
                      style={{ color: p.dark ? 'rgba(255,255,255,0.85)' : '#2D2A26' }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ color: p.color }}
                    >
                      {p.role}
                    </p>
                  </div>
                </div>
                <p
                  className="text-[10px] leading-relaxed line-clamp-2"
                  style={{ color: p.dark ? 'rgba(255,255,255,0.38)' : '#A39E93' }}
                >
                  {p.bio}
                </p>
              </motion.button>
            );
          })}
        </div>
      </header>

      {/* ── Chat Area ── */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-5 pb-44 transition-colors duration-500"
        style={{ background: isConfessional ? '#151310' : undefined }}
      >

        {/* Mood check-in */}
        {!selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4"
            style={{
              background: isConfessional ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
              border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.6)',
            }}
          >
            <p
              className="text-[10px] font-bold tracking-widest uppercase mb-3"
              style={{ color: isConfessional ? 'rgba(255,255,255,0.3)' : '#A39E93' }}
            >
              How are you feeling right now?
            </p>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
                  style={{
                    background: isConfessional ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                    border: isConfessional ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.6)',
                    color: isConfessional ? 'rgba(255,255,255,0.55)' : '#5A5A40',
                  }}
                >
                  {mood}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mood + date pill */}
        <div className="flex justify-center gap-2">
          {selectedMood && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: isConfessional ? 'rgba(255,255,255,0.06)' : '#F0EBE1',
                color: isConfessional ? 'rgba(255,255,255,0.3)' : '#A39E93',
              }}
            >
              Feeling {selectedMood}
            </span>
          )}
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              background: isConfessional ? 'rgba(255,255,255,0.06)' : '#F0EBE1',
              color: isConfessional ? 'rgba(255,255,255,0.3)' : '#A39E93',
            }}
          >
            Today
          </span>
        </div>

        {/* AI opening message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 max-w-[88%]"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold mt-5"
            style={{
              background: `${persona.color}18`,
              color: isConfessional ? 'rgba(255,255,255,0.6)' : persona.color,
              border: `1px solid ${persona.color}25`,
            }}
          >
            {persona.initial}
          </div>
          <div>
            <p
              className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: isConfessional ? 'rgba(255,255,255,0.25)' : '#A39E93' }}
            >
              {persona.name}
            </p>
            <div
              className="p-4 rounded-2xl rounded-tl-none"
              style={{
                background: isConfessional ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.6)',
                boxShadow: isConfessional ? 'none' : '0 2px 12px rgba(0,0,0,0.02)',
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: isConfessional ? 'rgba(255,255,255,0.7)' : '#2D2A26' }}
              >
                {persona.openingMessage}
              </p>
            </div>
          </div>
        </motion.div>

        {/* User message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex max-w-[88%] ml-auto justify-end"
        >
          <div
            className="p-4 rounded-2xl rounded-tr-none"
            style={{
              background: isConfessional ? 'rgba(255,255,255,0.09)' : '#5A5A40cc',
              border: isConfessional ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(90,90,64,0.4)',
              color: isConfessional ? 'rgba(255,255,255,0.75)' : 'white',
            }}
          >
            <p className="text-sm leading-relaxed">
              I've been feeling a bit overwhelmed with work lately and struggling to find time for myself.
            </p>
          </div>
        </motion.div>

        {/* AI response with action card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 max-w-[88%]"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold mt-5"
            style={{
              background: `${persona.color}18`,
              color: isConfessional ? 'rgba(255,255,255,0.6)' : persona.color,
              border: `1px solid ${persona.color}25`,
            }}
          >
            {persona.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: isConfessional ? 'rgba(255,255,255,0.25)' : '#A39E93' }}
            >
              {persona.name}
            </p>
            <div
              className="p-4 rounded-2xl rounded-tl-none"
              style={{
                background: isConfessional ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.6)',
                boxShadow: isConfessional ? 'none' : '0 2px 12px rgba(0,0,0,0.02)',
              }}
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: isConfessional ? 'rgba(255,255,255,0.7)' : '#2D2A26' }}
              >
                It is natural to feel burdened when the world demands so much of our time. Remember that even Jesus sought solitude to pray and recharge.
              </p>

              {/* Suggested action card */}
              <div
                className="rounded-xl p-3.5 mb-3"
                style={{
                  background: isConfessional ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                  border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.55)',
                }}
              >
                <p
                  className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: isConfessional ? 'rgba(255,255,255,0.3)' : persona.color }}
                >
                  Suggested
                </p>
                <p
                  className="text-sm leading-snug mb-3.5"
                  style={{ color: isConfessional ? 'rgba(255,255,255,0.6)' : '#2D2A26' }}
                >
                  Would you like me to guide you through a 3-minute prayer for peace and grounding?
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(135deg, ${persona.color} 0%, ${persona.color}cc 100%)`,
                      boxShadow: `0 4px 12px ${persona.color}35`,
                    }}
                  >
                    Yes, guide me
                  </button>
                  <button
                    className="w-full py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
                    style={{
                      background: isConfessional ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                      border: isConfessional ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.5)',
                      color: isConfessional ? 'rgba(255,255,255,0.4)' : '#5A5A40',
                    }}
                  >
                    Not right now
                  </button>
                </div>
              </div>

              {/* Save to Journey */}
              <button
                className="flex items-center gap-1.5 text-[10px] font-medium transition-colors"
                style={{ color: isConfessional ? 'rgba(255,255,255,0.22)' : '#C4BAB0' }}
              >
                <BookmarkPlus size={11} />
                Save to Journey
              </button>
            </div>
          </div>
        </motion.div>

        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3 max-w-[88%]"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
            style={{
              background: `${persona.color}18`,
              color: isConfessional ? 'rgba(255,255,255,0.6)' : persona.color,
              border: `1px solid ${persona.color}25`,
            }}
          >
            {persona.initial}
          </div>
          <div
            className="px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5"
            style={{
              background: isConfessional ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
              border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.6)',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.35, 1, 0.35] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.22, ease: 'easeInOut' }}
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: isConfessional ? 'rgba(255,255,255,0.35)' : '#C4BAB0' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Prompt chips */}
        {!message && (
          <div className="pt-3">
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: isConfessional ? 'rgba(255,255,255,0.2)' : '#C4BAB0' }}
            >
              Or begin with
            </p>
            <div className="flex flex-col gap-2">
              {promptChips.map((chip, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.07 }}
                  onClick={() => setMessage(chip)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all active:scale-[0.98]"
                  style={{
                    background: isConfessional ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
                    border: isConfessional ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.6)',
                    color: isConfessional ? 'rgba(255,255,255,0.45)' : '#5A5A40',
                  }}
                >
                  {chip}
                  <ChevronRight size={14} className="shrink-0 opacity-40 ml-2" />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Input Area ── */}
      <div
        className="absolute bottom-28 left-0 w-full pt-10 pb-4 px-6"
        style={{
          background: isConfessional
            ? 'linear-gradient(to top, rgba(21,19,16,0.98) 60%, transparent)'
            : 'linear-gradient(to top, rgba(253,251,247,0.95) 60%, transparent)',
        }}
      >
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full rounded-full py-3.5 pl-5 pr-12 text-sm focus:outline-none transition-all"
            style={{
              background: isConfessional ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.65)',
              border: isConfessional ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.6)',
              color: isConfessional ? 'rgba(255,255,255,0.75)' : '#2D2A26',
              boxShadow: isConfessional ? 'none' : '0 4px 20px rgba(0,0,0,0.04)',
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {message ? (
              <button
                className="w-8 h-8 text-white rounded-full flex items-center justify-center transition-transform active:scale-95"
                style={{ background: persona.color }}
              >
                <Send size={14} className="ml-0.5" />
              </button>
            ) : (
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: isConfessional ? 'rgba(255,255,255,0.3)' : '#A39E93' }}
              >
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
