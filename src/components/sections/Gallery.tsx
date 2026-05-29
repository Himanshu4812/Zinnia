'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CircularGallery } from '@/components/ui/circular-gallery';
import { galleryItems } from '@/src/data/zinnia';

export function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section
      id="gallery"
      className="relative w-full bg-background text-foreground"
      style={{ height: '500vh' }}
    >
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center z-10 absolute top-16 md:top-24"
        >
          <p className="text-muted-foreground font-sans text-xs tracking-[0.4em] uppercase mb-2 font-semibold">
            Gallery
          </p>
        </motion.div>

        <div className="w-full h-full">
          <CircularGallery items={galleryItems} />
        </div>
      </div>
    </section>
  );
}
