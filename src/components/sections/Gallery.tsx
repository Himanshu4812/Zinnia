'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const galleryItems = [
  {
    title: 'LUXURY VILLAS',
    subtitle: 'Exquisite architecture blending with nature',
    image: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg',
  },
  {
    title: 'MODERN INTERIORS',
    subtitle: 'Expansive luxury and natural light',
    image: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-5.jpg',
  },
  {
    title: 'NIGHT VIEW',
    subtitle: 'A beautifully illuminated environment',
    image: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-4.jpg',
  },
  {
    title: 'FINE DINING',
    subtitle: 'A lavish 1.5-acre restaurant',
    image: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-3-scaled.jpg',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    zIndex: 10,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 10,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    zIndex: 0,
  })
};

export function Gallery() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<'prev' | 'next' | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Notify header about intro state
    window.dispatchEvent(new CustomEvent('gallery-intro', { detail: showIntro }));

    if (isInView) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        window.dispatchEvent(new CustomEvent('gallery-intro', { detail: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView, showIntro]);

  // Wrap around index
  const imageIndex = ((page % galleryItems.length) + galleryItems.length) % galleryItems.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (x < rect.width / 2) {
        setHoverState('prev');
      } else {
        setHoverState('next');
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && e.touches.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      setMousePos({ x, y });

      if (x < rect.width / 2) {
        setHoverState('prev');
      } else {
        setHoverState('next');
      }
    }
  };

  const handleMouseLeave = () => {
    setHoverState(null);
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let clientX = 0;
      if ('touches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
      } else if ('clientX' in e) {
        clientX = e.clientX;
      }

      const x = clientX - rect.left;
      if (x < rect.width / 2) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
  };

  return (
      <section 
        id="gallery"
        ref={containerRef}
        className="relative w-full h-[100vh] bg-[#111] overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Cinematic Introductory Slide */}
        <AnimatePresence>
          {showIntro && (
            <motion.div 
              key="gallery-intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 z-[100] bg-gradient-to-br from-[#1B5E20] via-[#0D3812] to-[#041A08] flex flex-col items-center justify-center text-center px-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              >
                <p className="text-white/50 font-sans text-xs tracking-[0.4em] uppercase mb-6 font-semibold">
                  Immersive Experience
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-serif tracking-wide text-white leading-tight drop-shadow-2xl">
                  Step Into <span className="italic opacity-90">Abloom</span>
                </h2>
                <div className="mt-12 flex md:hidden items-center justify-center gap-3 text-white/70 animate-pulse bg-white/5 border border-white/10 px-5 py-2.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">
                    Rotate device for best view
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Images with AnimatePresence */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;
            if (swipe < -50) {
              paginate(1);
            } else if (swipe > 50) {
              paginate(-1);
            }
          }}
        >
          {/* Subtle Ken Burns Scale Effect */}
          <motion.img
            src={galleryItems[imageIndex].image}
            alt={galleryItems[imageIndex].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Massive Typography Overlay & Pagination */}
      <AnimatePresence>
        {!showIntro && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
            >
              <div className="overflow-hidden mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`subtitle-${page}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/70 font-sans tracking-[0.4em] uppercase text-xs md:text-sm text-center"
                  >
                    {galleryItems[imageIndex].subtitle}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              <div className="overflow-hidden py-2">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`title-${page}`}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                    className="text-5xl md:text-[8vw] font-serif font-light text-white text-center leading-none tracking-wide"
                  >
                    {galleryItems[imageIndex].title}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sleek Pagination Lines */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3 pointer-events-none"
            >
              {galleryItems.map((_, i) => (
                <div key={i} className="w-10 h-[2px] bg-white/20 overflow-hidden relative">
                  {i === imageIndex && (
                    <motion.div 
                      layoutId="activeLine" 
                      className="absolute inset-0 bg-white" 
                      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Fluid Interaction Cursor (Universal) */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center pointer-events-none z-50"
        animate={{
          x: mousePos.x - 48,
          y: mousePos.y - 48,
          scale: hoverState ? 1 : 0,
          opacity: hoverState ? 1 : 0
        }}
        transition={{
          x: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
          y: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 }
        }}
      >
        <span className="text-white font-sans text-xs tracking-widest uppercase font-medium">
          {hoverState}
        </span>
      </motion.div>

    </section>
  );
}
