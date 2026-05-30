'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Ruler, Leaf, Sun, Building2, TreePine, Waves, Shield } from 'lucide-react';

// ---------- Types ----------

interface Metric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface PlanSector {
  id: string;
  title: string;
  subtitle: string;
  volume: string;
  description: string;
  features: string[];
  imageUrl: string;
  planUrl: string;
  metrics: Metric[];
}

// ---------- Data ----------

const planData: PlanSector[] = [
  {
    id: 'masterplan',
    title: 'Masterplan',
    subtitle: 'The Grand Vision',
    volume: '01',
    description:
      '17 acres of thoughtfully planned spaces that blend nature, luxury and community.',
    features: [
      '17 acres of meticulously planned development',
      '65% open & green coverage',
      '10 premium villa plots',
      'Central clubhouse & recreation hub',
      'Botanical gardens & lake promenade',
      '24/7 gated security with concierge',
    ],
    imageUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg',
    planUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map1-1024x618.jpg',
    metrics: [
      { label: 'Total Area', value: '17 Acres', icon: <Ruler className="w-4 h-4" /> },
      { label: 'Green Cover', value: '65%', icon: <Leaf className="w-4 h-4" /> },
      { label: 'Total Plots', value: '10', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Solar Ready', value: '100%', icon: <Sun className="w-4 h-4" /> },
    ],
  },
  {
    id: 'clubhouse',
    title: 'Clubhouse',
    subtitle: 'The Social Heart',
    volume: '02',
    description:
      'A stunning modern clubhouse designed as the vibrant social nucleus of Zinnia, offering world-class leisure facilities amidst lush tropical landscaping.',
    features: [
      'Modern lounge & sitting area',
      'Indoor games & recreation',
      'Multipurpose hall',
      'Café & community space',
      'Premium fitness center',
      'Rooftop terrace with panoramic views',
    ],
    imageUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg',
    planUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map1-1024x618.jpg',
    metrics: [
      { label: 'Built-up', value: '8,500 sq ft', icon: <Ruler className="w-4 h-4" /> },
      { label: 'Capacity', value: '200+', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Green Rating', value: 'Gold', icon: <Leaf className="w-4 h-4" /> },
    ],
  },
  {
    id: 'villas',
    title: 'Villas',
    subtitle: 'Architectural Mastery',
    volume: '03',
    description:
      'Exquisite villas that blend contemporary design with natural materials. Each villa is a private sanctuary with double-height spaces and panoramic views.',
    features: [
      'Private gardens & decks',
      'Smart home automation',
      'Premium double-height spaces',
      'Custom interior finish options',
      'EV charging pre-wiring',
      'Rainwater harvesting system',
    ],
    imageUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-4.jpg',
    planUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map4-1024x724.jpg',
    metrics: [
      { label: 'Plot Size', value: '15,000+ sq ft', icon: <Ruler className="w-4 h-4" /> },
      { label: 'Built-up', value: '3,000+ sq ft', icon: <Building2 className="w-4 h-4" /> },
      { label: 'Premium Units', value: '8', icon: <Sun className="w-4 h-4" /> },
    ],
  },
  {
    id: 'gardens',
    title: 'Gardens & Lake',
    subtitle: 'Mirror of Nature',
    volume: '04',
    description:
      'A meticulously curated botanical garden and pristine man-made lake offering serene walking trails, meditation zones, and breathtaking sunset views.',
    features: [
      'Native flora & botanical path',
      'Meditation & yoga decks',
      'Aromatic herb garden',
      'Shaded seating arbors',
      'Lakeside promenade & seating',
      'Boating jetty & deck',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&auto=format&fit=crop&q=80',
    planUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map3-1024x725.jpg',
    metrics: [
      { label: 'Garden Area', value: '3.5 Acres', icon: <TreePine className="w-4 h-4" /> },
      { label: 'Plant Species', value: '50+', icon: <Leaf className="w-4 h-4" /> },
      { label: 'Water Frontage', value: '400 m', icon: <Waves className="w-4 h-4" /> },
    ],
  },
  {
    id: 'entrance',
    title: 'Entrance',
    subtitle: 'Threshold of Luxury',
    volume: '05',
    description:
      'A majestic entrance avenue lined with heritage trees, grand water cascades, and 24/7 manned security for ultimate privacy and a grand arrival experience.',
    features: [
      'Heritage tree-lined avenue',
      'Grand water cascades',
      '24/7 manned security gate',
      'Visitor registration lounge',
      'Well-lit boulevard',
      'Automated vehicle screening',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
    planUrl:
      'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map3-1024x725.jpg',
    metrics: [
      { label: 'Boulevard Width', value: '30 m', icon: <Ruler className="w-4 h-4" /> },
      { label: 'Landscaping', value: 'Heritage Trees', icon: <TreePine className="w-4 h-4" /> },
      { label: 'Security', value: '24/7', icon: <Shield className="w-4 h-4" /> },
    ],
  },
];

// ---------- Helpers ----------

function renderFeatureIcon(feature: string) {
  const n = feature.toLowerCase();
  if (n.includes('lounge') || n.includes('sitting') || n.includes('seating'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v6H4v-6M2 9v9a1 1 0 001 1h18a1 1 0 001-1V9M9 5h6M6 9h12" />
      </svg>
    );
  if (n.includes('garden') || n.includes('flora') || n.includes('herb') || n.includes('tree') || n.includes('green'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 3.31 2.69 6 6 6h3m0-15c4.97 0 9 4.03 9 9 0 3.31-2.69 6-6 6h-3" />
      </svg>
    );
  if (n.includes('smart') || n.includes('automation') || n.includes('tech'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  if (n.includes('water') || n.includes('rain') || n.includes('harvest'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.105-11.25 11.25-11.25 11.25S-3 17.605-3 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    );
  if (n.includes('security') || n.includes('gate') || n.includes('concierge') || n.includes('manned') || n.includes('screening'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.956 11.956 0 0112 2.714z" />
      </svg>
    );
  if (n.includes('hall') || n.includes('room') || n.includes('space') || n.includes('terrace'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 9h6v4H9V9z" />
      </svg>
    );
  if (n.includes('caf') || n.includes('coffee') || n.includes('community') || n.includes('kitchen'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h2a2 2 0 012 2v2a2 2 0 01-2 2h-2M2 8h14v8a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v2M10 3v2M14 3v2" />
      </svg>
    );
  if (n.includes('game') || n.includes('recreation') || n.includes('play') || n.includes('fitness'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  if (n.includes('lake') || n.includes('boat') || n.includes('jetty') || n.includes('promenade'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9.75M3.284 14.253a8.974 8.974 0 018.716-6.748M3.284 14.253A8.995 8.995 0 0012 9.75m0-6V9.75M20.716 14.253a8.974 8.974 0 00-8.716-6.748M20.716 14.253A8.995 8.995 0 0112 9.75" />
      </svg>
    );
  if (n.includes('pool') || n.includes('lap'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c8.954 0 12.822-4 15-4 2.178 0 6.046 4 15 4M2.25 16c8.954 0 12.822-4 15-4 2.178 0 6.046 4 15 4" />
      </svg>
    );
  if (n.includes('walk') || n.includes('trail') || n.includes('path') || n.includes('avenue') || n.includes('boulevard'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h1.5m-1.5 3h.008v.008H9V6.75zm.375 0h.007v.008h-.007V6.75zm.375 0h.007v.008h-.007V6.75zM12 18.75c-3.008 0-5.45-2.238-5.45-5 0-2.762 2.442-5 5.45-5s5.45 2.238 5.45 5c0 2.762-2.442 5-5.45 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
      </svg>
    );
  if (n.includes('cabana') || n.includes('shade') || n.includes('arbor'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3a9 9 0 019 9H3a9 9 0 019-9z" />
      </svg>
    );
  if (n.includes('finish') || n.includes('premium') || n.includes('double'))
    return (
      <svg className="w-4 h-4 text-forest/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-2.22-.984 3 3 0 00-2.22.984l-1.08 1.08a1 1 0 000 1.415l4.344 4.343a1 1 0 001.414 0l1.08-1.08a3 3 0 000-4.438zM17.5 12a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
      </svg>
    );
  return <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] shrink-0" />;
}

// ---------- Constants ----------

const easeArr: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ---------- Component ----------

export function PlansSection() {
  const [activeId, setActiveId] = useState<string>('masterplan');
  const [shuttersOpen, setShuttersOpen] = useState(false);
  const [detailSectorId, setDetailSectorId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const active = planData.find((p) => p.id === activeId);
  const detailSector = planData.find((p) => p.id === detailSectorId);

  const handleExplore = useCallback((id: string) => {
    setDetailSectorId(id);
    setShuttersOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setShuttersOpen(false);
    setTimeout(() => setDetailSectorId(null), 600);
  }, []);

  const handleSelectPlan = useCallback(
    (id: string) => {
      setActiveId(id);
      if (shuttersOpen) {
        setDetailSectorId(id);
      }
    },
    [shuttersOpen]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && shuttersOpen) handleCloseDetail();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [shuttersOpen, handleCloseDetail]);

  const shutterX = shuttersOpen
    ? prefersReducedMotion
      ? '0%'
      : '-100%'
    : '0%';

  return (
    <section
      id="plans"
      className="relative w-full h-screen bg-[#FAF9F6] overflow-hidden"
    >
      {/* Ambient soft glow circles */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#A5D6A7]/30 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#C8E6C9]/50 blur-[150px] pointer-events-none z-0" />



      {/* Header — Mobile */}
      <div className="pt-10 px-6 pb-2 block md:hidden w-full shrink-0 relative z-30">
        <div className="space-y-1">
          <span className="text-forest/60 font-sans text-[10px] tracking-[0.2em] uppercase font-bold">
            The Vision
          </span>
          <h2 className="text-3xl font-serif font-bold text-forest tracking-tight">
            Master Plan
          </h2>
        </div>
      </div>

      {/* ===== SPLIT CANVAS CONTAINER ===== */}
      <div className="absolute inset-0 top-[80px] md:top-0 flex">
        {/* ---- Detail View (behind shutters) ---- */}
        <AnimatePresence>
          {detailSector && (
            <motion.div
              key={`detail-${detailSector.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeArr }}
              className="absolute inset-0 z-10 flex items-center justify-center p-8 md:p-16"
            >
              <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Blueprint Visual */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative rounded-3xl overflow-hidden border border-forest/10 bg-white/80 backdrop-blur-sm shadow-[0_20px_50px_-6px_rgba(27,94,32,0.12)] aspect-[4/3] flex items-center justify-center p-6">
                    <img
                      src={detailSector.planUrl}
                      alt={`${detailSector.title} plan`}
                      className="max-w-full max-h-full object-contain"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-forest/10 backdrop-blur-sm rounded-full border border-forest/5">
                      <span className="text-forest font-sans text-[9px] tracking-wider uppercase font-bold">
                        Architectural Plan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text & Metrics */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-forest leading-none mt-0">
                      {detailSector.title}
                    </h3>
                    <p className="text-forest/50 font-sans text-xs uppercase tracking-wider font-semibold mt-1.5">
                      {detailSector.subtitle}
                    </p>
                  </div>

                  <p className="text-forest/80 font-sans text-sm leading-relaxed max-w-md">
                    {detailSector.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {detailSector.metrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                        className="bg-white/60 backdrop-blur-sm rounded-xl border border-forest/5 p-3 flex flex-col items-start gap-1.5"
                      >
                        <div className="text-forest/60">{m.icon}</div>
                        <span className="text-forest font-sans text-xs font-semibold">
                          {m.value}
                        </span>
                        <span className="text-forest/40 font-sans text-[9px] uppercase tracking-wider">
                          {m.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-forest/40 font-sans text-[9px] tracking-[0.2em] uppercase font-bold mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {detailSector.features.slice(0, 4).map((f, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + i * 0.04,
                            duration: 0.35,
                          }}
                          className="flex items-center gap-3 text-forest/85 font-sans text-[12px] font-medium"
                        >
                          <div className="p-1 bg-forest/5 rounded-lg border border-forest/5 flex items-center justify-center shrink-0">
                            {renderFeatureIcon(f)}
                          </div>
                          <span>{f}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- LEFT SHUTTER PANEL (Luxury brochure aesthetic) ---- */}
        <motion.div
          animate={{ x: shutterX }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 1 }}
          className="absolute top-0 left-0 w-1/2 h-full z-20 hidden md:block"
        >
          <div className="relative w-full h-full bg-[#FAF9F6] overflow-hidden flex flex-col justify-start pt-16 px-14 lg:px-16 xl:px-20">
            {/* Decorative botanical illustration — bottom left */}
            <svg
              className="absolute -bottom-6 -left-6 w-[200px] h-[200px] text-[#1E5A31] opacity-[0.04] pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <path d="M 30,170 Q 50,120 80,100 Q 110,80 140,60 Q 160,45 170,30" />
              <path d="M 40,180 Q 60,140 85,115 Q 110,95 130,75 Q 150,55 165,40" />
              <path d="M 20,160 Q 40,110 70,90 Q 100,70 130,50" />
              <path d="M 70,130 Q 85,105 110,85 Q 130,70 150,55" />
              <circle cx="170" cy="30" r="3" />
              <circle cx="165" cy="40" r="2" />
              <circle cx="130" cy="50" r="2" />
              <path d="M 45,185 C 55,170 65,160 75,155" strokeWidth="0.5" />
              <path d="M 30,195 C 40,185 55,175 70,168" strokeWidth="0.5" />
            </svg>

            {/* Content wrapper */}
            <div className="max-w-md relative z-0 h-full flex flex-col">
              {/* Section heading */}
              <div className="shrink-0 space-y-2">
                <span className="text-forest/60 font-sans text-[10px] tracking-[0.25em] uppercase font-bold">
                  The Vision
                </span>
                <h2 className="text-5xl font-serif font-bold text-forest tracking-tight leading-none">
                  Master Plan
                </h2>
              </div>

              <p className="shrink-0 text-forest/70 font-sans text-sm leading-relaxed max-w-xs mt-2">
                {active?.description}
              </p>

              {/* Plan navigation list */}
              <div className="flex-1 flex flex-col justify-center mt-6">
                {planData.map((plan) => {
                  const isActive = plan.id === activeId;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`group relative flex items-start gap-5 py-3 text-left transition-all duration-[400ms] ${
                        isActive ? '' : 'opacity-45 hover:opacity-80'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                    >
                      {/* Active vertical accent line */}
                      {isActive && (
                        <motion.div
                          layoutId="active-accent-line"
                          className="absolute -left-6 top-4 bottom-4 w-[3px] bg-[#1E5A31] rounded-full"
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        />
                      )}

                      {/* Volume number */}
                      <span
                        className={`relative z-10 font-sans text-[11px] md:text-xs tracking-[0.15em] font-bold transition-all duration-[400ms] min-w-[28px] ${
                          isActive ? 'text-[#1E5A31]' : 'text-[#7A8B7E] group-hover:text-[#1E5A31]'
                        }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                      >
                        {plan.volume}
                      </span>

                      {/* Plan title + subtitle */}
                      <div
                        className={`relative z-10 flex-1 transition-all duration-[400ms] ${
                          isActive ? '' : 'group-hover:translate-x-2'
                        }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                      >
                        <span
                          className={`font-serif text-lg md:text-xl lg:text-[28px] font-bold block leading-tight transition-colors duration-[400ms] ${
                            isActive ? 'text-[#1E5A31]' : 'text-[#1E5A31]/60 group-hover:text-[#1E5A31]'
                          }`}
                          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                        >
                          {plan.title}
                        </span>
                        <span className="text-[#7A8B7E] font-sans text-[9px] md:text-[10px] uppercase tracking-wider font-semibold mt-1 block">
                          {plan.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Separator */}
              <div className="shrink-0 h-px bg-[#1E5A31]/8" />

              {/* Explore Details CTA */}
              <button
                onClick={() => handleExplore(activeId)}
                className="shrink-0 group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1E5A31] text-white rounded-full text-[11px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-[400ms] shadow-[0_4px_14px_rgba(30,90,49,0.15)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(30,90,49,0.2)] mt-4"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                Explore Details
                <svg
                  className="w-4 h-4 transition-transform duration-[400ms] group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ---- RIGHT SHUTTER PANEL (Warm ivory) ---- */}
        <motion.div
          animate={{
            x: shuttersOpen
              ? prefersReducedMotion
                ? '0%'
                : '100%'
              : '0%',
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 1 }}
          className="absolute top-0 right-0 w-1/2 h-full z-20 hidden md:block"
        >
          <div className="w-full h-full bg-[#FDFBF7] relative overflow-hidden">
            {/* Background geometric pattern */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 0L80 40L40 80L0 40Z\' fill=\'none\' stroke=\'%231B5E20\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
                backgroundSize: '60px 60px',
              }}
            />

            {/* Active plan image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={active?.id}
                src={active?.imageUrl}
                alt={active?.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: easeArr }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/5" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-transparent to-[#FDFBF7]" />

            {/* Metric badges — bottom left */}
            <div className="absolute bottom-10 left-10 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  {active?.metrics.slice(0, 3).map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-forest/10 shadow-sm"
                    >
                      <span className="text-forest/70">{m.icon}</span>
                      <span className="text-forest font-sans text-[10px] font-semibold tracking-wide">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sector label — top right */}
            <div className="absolute top-10 right-10 z-10 text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-forest font-serif text-xl font-bold -mt-1">
                    {active?.title}
                  </h3>
                  <p className="text-forest/50 font-sans text-[9px] uppercase tracking-wider font-semibold mt-0.5">
                    {active?.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ---- Close button (visible when shutters open) ---- */}
        <AnimatePresence>
          {shuttersOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={handleCloseDetail}
              className="absolute top-8 right-8 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-forest/10 hover:bg-white hover:scale-105 transition-all text-forest shadow-lg hidden md:block"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ---- Right-side navigation dots ---- */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex-col gap-3.5 hidden md:flex">
          {planData.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                plan.id === activeId
                  ? 'bg-forest scale-125 ring-2 ring-forest/20'
                  : shuttersOpen
                    ? 'bg-forest/10'
                    : 'bg-forest/20 hover:bg-forest/40'
              }`}
              aria-label={`Select ${plan.title}`}
            />
          ))}
        </div>
      </div>

      {/* ===== MOBILE VIEW ===== */}
      <div className="md:hidden relative z-20 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-x-auto no-scrollbar flex gap-4 px-6 snap-x snap-mandatory py-4">
          {planData.map((plan) => (
            <div
              key={plan.id}
              onClick={() => {
                setActiveId(plan.id);
              }}
              className={`snap-center shrink-0 w-[72vw] aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#FAF9F6] border transition-all duration-300 ${
                plan.id === activeId
                  ? 'border-forest ring-2 ring-forest/10 shadow-lg'
                  : 'border-forest/10 opacity-60 shadow-sm'
              }`}
            >
              <img
                src={plan.imageUrl}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-4">
                <span className="text-white/60 font-sans text-[9px] tracking-widest uppercase font-bold">
                  Sector {plan.volume}
                </span>
                <span className="text-white font-sans text-sm font-bold tracking-wide uppercase mt-0.5">
                  {plan.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 shrink-0">
          <button
            onClick={() => handleExplore(activeId)}
            className="w-full py-4 bg-forest text-white rounded-full text-[11px] font-sans font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Explore Details
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== MOBILE BOTTOM SHEET ===== */}
      <AnimatePresence>
        {detailSector && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[100] md:hidden"
              onClick={handleCloseDetail}
            />

            <motion.div
              key={`sheet-${detailSector.id}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 26,
                mass: 0.95,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.35 }}
              onDragEnd={(_e, info) => {
                if (info.offset.y > 80) handleCloseDetail();
              }}
              className="fixed bottom-0 left-0 right-0 z-[110] h-[82vh] bg-[#FAF9F6]/95 backdrop-blur-2xl rounded-t-[32px] shadow-2xl md:hidden flex flex-col overflow-hidden border-t border-white/40"
              style={{ touchAction: 'none' }}
            >
              <div className="flex justify-center pt-3.5 pb-2.5 shrink-0 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-forest/25" />
              </div>

              <button
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-forest/10 text-forest"
                aria-label="Close details"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>

              <div className="relative h-[180px] shrink-0 overflow-hidden">
                <img
                  src={detailSector.imageUrl}
                  alt={detailSector.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent" />
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2 no-scrollbar">
                <h3 className="text-2xl font-serif font-bold text-forest leading-none">
                  {detailSector.title}
                </h3>
                <p className="text-forest/50 font-sans text-[10px] uppercase tracking-wider font-semibold mt-0.5">
                  {detailSector.subtitle}
                </p>

                <p className="text-forest/80 font-sans text-xs leading-relaxed mt-4">
                  {detailSector.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-5">
                  {detailSector.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white/70 rounded-xl border border-forest/5 p-3 flex flex-col items-center gap-1 text-center"
                    >
                      <div className="text-forest/60">{m.icon}</div>
                      <span className="text-forest font-sans text-[11px] font-bold">
                        {m.value}
                      </span>
                      <span className="text-forest/40 font-sans text-[8px] uppercase tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-2xl border border-forest/10 bg-white shadow-inner flex items-center justify-center h-[160px]">
                  <img
                    src={detailSector.planUrl}
                    alt={`${detailSector.title} Plan`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="mt-5">
                  <h4 className="text-forest/40 font-sans text-[9px] tracking-[0.2em] uppercase font-bold mb-3">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {detailSector.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-forest/85 font-sans text-[12px] font-medium"
                      >
                        <div className="p-1 bg-forest/5 rounded-lg border border-forest/5 flex items-center justify-center shrink-0">
                          {renderFeatureIcon(f)}
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
