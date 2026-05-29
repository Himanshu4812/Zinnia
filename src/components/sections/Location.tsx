'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Plane, ShoppingBag, Stethoscope, Store, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GOOGLE_MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119981.26415056722!2d73.73634044999999!3d19.991110700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb0038b71d6f%3A0xcb1b60d00f6063ed!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714400000000!5m2!1sen!2sin";

const landmarks = [
  { name: 'International Airport', time: '45 mins', icon: Plane },
  { name: 'Luxury District', time: '15 mins', icon: ShoppingBag },
  { name: 'Medical Center', time: '10 mins', icon: Stethoscope },
  { name: 'Shopping Center', time: '20 mins', icon: Store },
];

export const Location = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Heading Word Mask Reveal
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Address & Connectivity Cards Stagger Reveal
      const cardElements = cardsRef.current?.querySelectorAll('.loc-card');
      if (cardElements) {
        gsap.fromTo(cardElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Map Reveal
      gsap.fromTo(mapContainerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 85%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Map Mouse Parallax
  useEffect(() => {
    if (!mapRef.current || !mapContainerRef.current || shouldReduceMotion || window.matchMedia("(max-width: 768px)").matches) return;

    const map = mapRef.current;
    const container = mapContainerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      gsap.to(map, {
        x: x * 10,
        y: y * 10,
        rotationY: x * 2,
        rotationX: -y * 2,
        ease: "power2.out",
        duration: 1
      });
    };

    const onMouseLeave = () => {
      gsap.to(map, { x: 0, y: 0, rotationY: 0, rotationX: 0, ease: "power2.out", duration: 1 });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} id="location" className="py-24 md:py-40 bg-pure relative overflow-hidden">
      {/* Animated Background Gradients & Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sage/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(#1B5E20 1px, transparent 1px), linear-gradient(90deg, #1B5E20 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Details */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-pangaia font-light tracking-[-0.02em] leading-[0.88] text-[#1B5E20]/95 mb-6 flex flex-wrap gap-x-3 overflow-hidden">
                {"Secluded, Yet Connected.".split(' ').map((word, i) => (
                  <span key={i} className="word inline-block opacity-0">{word}</span>
                ))}
              </h2>
              <p className="text-[#1B5E20]/70 font-sans font-light text-base md:text-lg leading-relaxed max-w-md">
                Strategically positioned to provide serene living while remaining connected to urban conveniences.
              </p>
            </div>

            <div ref={cardsRef} className="flex flex-col gap-8">
              {/* Location Address Card */}
              <div className="loc-card bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-soft border border-forest/5 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-pangaia text-[1.35rem] font-light tracking-[-0.01em] text-[#1B5E20]/95 mb-2">Location Address</h3>
                  <p className="text-[#1B5E20]/60 font-sans font-light text-sm leading-relaxed">
                    Gate no. 129/1&2, Kachurli, Near Dugarwadi waterfall, Trimbakeshwar, Nashik, Maharashtra.
                  </p>
                </div>
              </div>

              {/* Nearby Destinations */}
              <div>
                <h3 className="text-[10px] font-sans font-semibold tracking-[0.3em] text-[#1B5E20]/40 uppercase mb-6">Nearby Destinations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {landmarks.map((landmark, idx) => (
                    <div key={idx} className="loc-card bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-forest/5 flex items-center gap-4 hover:shadow-soft hover:bg-white transition-all duration-300 group">
                      <div className="p-2.5 bg-forest/5 text-forest rounded-lg shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-500 ease-out" />
                        <landmark.icon size={20} className="relative z-10" />
                      </div>
                      <div>
                        <p className="font-pangaia font-light text-[1rem] tracking-[-0.01em] text-[#1B5E20]/95">{landmark.name}</p>
                        <p className="text-[11px] uppercase tracking-[0.1em] text-[#1B5E20]/50 font-sans font-light">{landmark.time} away</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div 
            ref={mapContainerRef}
            className="h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-visible relative"
            style={{ perspective: "1000px" }}
          >
            <div 
              ref={mapRef}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-soft border border-forest/10 bg-white group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none z-10 mix-blend-multiply" />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(27,94,32,0.05)] pointer-events-none z-10" />
              <iframe
                src={GOOGLE_MAP_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
              />
            </div>
            {/* Glow under map */}
            <div className="absolute inset-10 bg-primary/20 blur-[60px] -z-10 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};
