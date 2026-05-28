'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { zinnia } from '@/src/data/zinnia';

const chapters = [
  {
    id: 'overview-sanctuary',
    src: '/images/gallery-1.webp',
    title: 'Sanctuary',
    tagline: 'Natural Living',
    line: 'Lush greenery and tranquil surroundings designed for peace.',
    volume: '01',
  },
  {
    id: 'overview-retreat',
    src: '/images/gallery-2.webp',
    title: 'Retreat',
    tagline: 'Private Solitude',
    line: 'Serene spaces crafted for quiet reflection and calm.',
    volume: '02',
  },
  {
    id: 'overview-oasis',
    src: '/images/gallery-3.webp',
    title: 'Oasis',
    tagline: 'Modern Comfort',
    line: 'Thoughtfully planned community with premium amenities.',
    volume: '03',
  },
];

const projectStats = [
  { label: 'Area', value: '3 Acres' },
  { label: 'Plots', value: '10' },
  { label: 'Infrastructure', value: 'Ready' },
  { label: 'Location', value: 'Near Nashik' },
];

export const Overview = () => {
  const [cards, setCards] = useState(chapters);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveCardToEnd = () => {
    setCards((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      if (first) updated.push(first);
      return updated;
    });
  };

  const moveCardToFront = () => {
    setCards((prev) => {
      const updated = [...prev];
      const last = updated.pop();
      if (last) updated.unshift(last);
      return updated;
    });
  };

  return (
    <section id="overview" className="bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute top-25 left-10 text-[25rem] font-serif italic font-light text-primary/[0.04] select-none pointer-events-none leading-none hidden md:block">
        zinnia
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-20 relative z-10 max-w-[1600px] pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="text-primary flex flex-col justify-center"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-5 mb-6"
              >
                <div className="w-16 h-px bg-primary/25" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-primary/45 font-sans font-normal">
                  The Vision
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-light leading-[1.1] tracking-wide mb-8"
              >
                {zinnia.overview.title}
                <span className="font-serif italic font-light text-primary/85">
                  {' '}{zinnia.overview.subtitle}
                </span>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="pl-8 border-l border-primary/15 mb-8"
              >
                <p className="text-base md:text-lg font-sans font-light text-muted-foreground max-w-lg leading-[1.65]">
                  {zinnia.overview.paragraphs[0]}
                </p>
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="button"
                className="group flex items-center gap-5 hover:opacity-80 transition-opacity duration-500 w-fit mb-8"
                onClick={() =>
                  document
                    .getElementById('gallery')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="text-xl font-light leading-none mb-1">
                    ›
                  </span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary/55 font-sans">
                  Discover our philosophy
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="pt-8 border-t border-primary/10"
            >
              <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
                {zinnia.highlights.items.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="group flex-row items-start"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.6,
                    }}
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-primary/50 mb-2 font-sans font-semibold">
                      {item.label}
                    </span>
                    <p className="text-lg md:text-xl font-serif italic font-light text-primary leading-tight group-hover:text-primary/90 transition-colors duration-300">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Card Carousel */}
          <div className="flex flex-col items-center">
            <motion.div
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[420px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[480px] cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.8,
                  },
                },
              }}
            >
              {cards.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  drag={isMobile && index === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => {
                    if (
                      isMobile &&
                      Math.abs(info.offset.x) > 80 &&
                      index === 0
                    ) {
                      moveCardToEnd();
                    }
                  }}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="absolute w-full h-full touch-pan-y"
                  animate={{
                    opacity:
                      index === 0
                        ? 1
                        : hoveredCardIndex === index
                          ? 1
                          : index < 5
                            ? 1 - index * 0.15
                            : 0,
                    scale:
                      index === 0
                        ? hoveredCardIndex === 0
                          ? 1.03
                          : 1
                        : hoveredCardIndex === index
                          ? 1.03
                          : Math.max(0.75, 1 - index * 0.05),
                    y: 0,
                    x:
                      index === 0
                        ? '0%'
                        : index % 2 === 1
                          ? `${Math.ceil(index / 2) * (isMobile ? 10 : 20)}%`
                          : `-${Math.ceil(index / 2) * (isMobile ? 10 : 20)}%`,
                    rotate:
                      index === 0
                        ? 0
                        : index % 2 === 1
                          ? Math.ceil(index / 2) * 3
                          : -Math.ceil(index / 2) * 3,
                    zIndex: hoveredCardIndex === index ? 20 : 10 - index,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 26,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (index === 0) return;
                    if (index % 2 === 1) {
                      moveCardToEnd();
                    } else {
                      moveCardToFront();
                    }
                  }}
                >
                  <div
                    className={`relative w-full h-full overflow-hidden bg-[#111111] transition-all duration-500 ${
                      index === 0
                        ? 'border-[3px] border-primary/40 shadow-[0_0_40px_rgba(139,168,136,0.45)]'
                        : 'border border-white/10'
                    }`}
                  >
                    <Image
                      src={chapter.src}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={75}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/5" />
                    {index > 0 && (
                      <div
                        className={`absolute inset-0 bg-black/50 transition-opacity duration-500 pointer-events-none ${
                          hoveredCardIndex === index ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 bg-black/30 backdrop-blur-sm rounded-sm px-2 py-1">
                          Volume {chapter.volume}
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 bg-black/20 backdrop-blur-sm rounded-sm px-2 py-1">
                          {chapter.title}
                        </span>
                      </div>
                      <h3 className="font-serif italic text-xl text-white/95 leading-tight mb-2">
                        {chapter.tagline}
                      </h3>
                      <p className="text-sm font-sans font-light text-white/75 leading-relaxed max-w-xs">
                        {chapter.line}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {cards.length > 1 && (
              <div className="flex items-center gap-6 mt-6 z-30">
                <button
                  type="button"
                  onClick={moveCardToFront}
                  className="group flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <span className="text-xl font-light leading-none transform transition-transform group-hover:-translate-x-0.5 duration-300">
                    ←
                  </span>
                </button>
                <span className="text-xs uppercase tracking-[0.25em] text-primary/65 font-sans font-medium min-w-[80px] text-center">
                  {hoveredCardIndex !== null && cards[hoveredCardIndex]
                    ? cards[hoveredCardIndex].volume
                    : cards[0]?.volume || '01'}{' '}
                  / {String(cards.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={moveCardToEnd}
                  className="group flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <span className="text-xl font-light leading-none transform transition-transform group-hover:translate-x-0.5 duration-300">
                    →
                  </span>
                </button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.75, 0.7, 0.75],
                x: [0, 6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center gap-3 mt-8 md:hidden"
            >
              <div className="w-8 h-px bg-primary/35" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary/75 font-sans font-medium">
                Swipe to explore
              </span>
              <div className="w-8 h-px bg-primary/35" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
