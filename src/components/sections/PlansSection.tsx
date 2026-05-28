'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const masterplanData = [
  {
    id: 'master',
    title: 'Master Plan',
    subtitle: 'The 17-Acre Blueprint',
    description: 'A meticulously sculpted eco-estate spread across 17 pristine acres. The layout is engineered to maximize individual privacy while fostering a deeply harmonious community.',
    area: '17 Acres Total Coverage',
    amenities: 'Villas on 15,000 sq.ft Farms',
    imageUrl: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map1-1024x618.jpg',
  },
  {
    id: 'plana',
    title: 'Plan A',
    subtitle: 'A Lifeline to Nature',
    description: 'Immerse yourself in a curated, deeply rejuvenating wilderness. Situated alongside a calming waterfall, the estate serves as a living, breathing retreat shaded by ancient trees and dappled golden sunlight.',
    area: 'Prime Waterfall View',
    amenities: 'Curated Walking Trails, Meditation Zones',
    imageUrl: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map2-1024x724.jpg',
  },
  {
    id: 'planb',
    title: 'Plan B',
    subtitle: 'Eco-Conscious Elegance',
    description: 'Experience the absolute pinnacle of convenience with our ready-to-build facilities. Every plot is pre-equipped with world-class, sustainable utilities, allowing you to bypass the setup and begin living your architectural dream instantly.',
    area: 'Fully Developed Avenues',
    amenities: 'Underground Electricity, Solar Ambient Streetlights',
    imageUrl: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map3-1024x725.jpg',
  },
  {
    id: 'planc',
    title: 'Plan C',
    subtitle: 'The Perfect Balance',
    description: 'A highly coveted, hidden sanctuary that respects the surrounding ecosystem, yet remains effortlessly connected. Enjoy absolute tranquility while being just a short, scenic drive away from the conveniences of Nashik.',
    area: 'Trimbakeshwar Proximity',
    amenities: '24/7 Gated Security, Seamless City Connectivity',
    imageUrl: 'https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-map4-1024x724.jpg',
  },
];

export function PlansSection() {
  const [activeId, setActiveId] = useState(masterplanData[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeSector = masterplanData.find(s => s.id === activeId) || masterplanData[0];
  const selectedSector = masterplanData.find(s => s.id === selectedId);

  return (
    <section id="plans" className="relative w-full min-h-[100vh] bg-[#FDFBF7] text-[#1B5E20] flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Menu Side */}
      <div className="w-full md:w-2/5 xl:w-1/3 flex flex-col justify-center px-8 md:px-16 pt-12 pb-12 z-20 bg-[#FDFBF7] relative">
        <div className="mb-8 pb-4 pt-4 px-8 md:px-16 -mx-8 md:-mx-16 sticky top-24 z-30 bg-[#FDFBF7]">
          <span className="inline-block mb-3 mt-2">
            <p className="text-[#1B5E20] font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
              Masterplan Layout
            </p>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-wide text-[#1B5E20]">
            Visionary <span className="italic opacity-80 text-[#4CAF50]">Design</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {masterplanData.map((sector) => {
            const isActive = activeId === sector.id;
            return (
              <div 
                key={sector.id}
                onMouseEnter={() => setActiveId(sector.id)}
                onClick={() => setSelectedId(sector.id)}
                className="group cursor-pointer py-3 md:py-4 border-b border-[#1B5E20]/10 relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0"
              >
                {/* Subtle animated indicator line */}
                <div 
                  className={`absolute bottom-[-1px] left-0 h-[2px] bg-[#1B5E20] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-full' : 'w-0 group-hover:w-1/4'}`} 
                />
                
                <h3 
                  className={`text-2xl md:text-3xl font-serif tracking-wide transition-colors duration-700 ${
                    isActive ? 'text-[#1B5E20]' : 'text-[#1B5E20] md:text-[#1B5E20]/40 md:group-hover:text-[#1B5E20]/70'
                  }`}
                >
                  {sector.title}
                </h3>

                {/* Mobile-only: Inline Image & Details Button */}
                <div className="flex md:hidden flex-col gap-4 w-full mt-2">
                  <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-sm border border-[#1B5E20]/10">
                    <img src={sector.imageUrl} alt={sector.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center text-[10px] tracking-[0.2em] uppercase font-bold text-[#1B5E20]/70 group-hover:text-[#1B5E20] transition-colors">
                    Explore Details <ArrowRight className="w-3 h-3 ml-2" />
                  </div>
                </div>

                {/* Desktop-only: Arrow Inside Circle Beside Entry */}
                <div 
                  className={`hidden md:flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#1B5E20]/20 transition-all duration-700 ease-out mr-4 ${
                    isActive ? 'opacity-100 translate-x-0 bg-[#1B5E20]/5' : 'opacity-0 -translate-x-4 pointer-events-none'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#1B5E20]" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content/Image Reveal Side */}
      <div 
        className="hidden md:block w-full md:w-3/5 xl:w-2/3 relative min-h-[50vh] md:min-h-full overflow-hidden bg-[#FDFBF7] cursor-pointer group"
        onClick={() => setSelectedId(activeId)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={activeSector.imageUrl} 
              alt={activeSector.title} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.02]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Deep Details Drawer / Sub-section */}
      <AnimatePresence>
        {selectedSector && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1050]"
              onClick={() => setSelectedId(null)}
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] lg:w-[500px] bg-[#FDFBF7]/85 backdrop-blur-xl border-l border-white/50 text-[#1B5E20] z-[1100] shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-8 border-b border-[#1B5E20]/10">
                <span className="font-sans text-xs tracking-[0.2em] uppercase opacity-60 font-semibold">
                  Sector Details
                </span>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="p-2 rounded-full hover:bg-[#1B5E20]/5 transition-colors"
                >
                  <X className="w-6 h-6 text-[#1B5E20]" strokeWidth={1.5} />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto no-scrollbar flex flex-col">
                {/* The image is now shown in the main menu on mobile, so we removed the redundant one here */}

                <h4 className="text-[#1B5E20]/60 font-sans text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
                  {selectedSector.subtitle}
                </h4>
                <h3 className="text-4xl font-bold font-serif mb-8">
                  {selectedSector.title}
                </h3>
                
                <p className="text-lg font-light leading-relaxed text-[#1B5E20]/80 mb-12">
                  {selectedSector.description}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-8 border-t border-[#1B5E20]/10 pt-8">
                  <div>
                    <p className="text-[#1B5E20]/60 font-sans text-[10px] tracking-[0.2em] uppercase mb-2 font-semibold">
                      Area Focus
                    </p>
                    <p className="text-lg font-medium">{selectedSector.area}</p>
                  </div>
                  <div>
                    <p className="text-[#1B5E20]/60 font-sans text-[10px] tracking-[0.2em] uppercase mb-2 font-semibold">
                      Key Amenities
                    </p>
                    <p className="text-lg font-medium">{selectedSector.amenities}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
