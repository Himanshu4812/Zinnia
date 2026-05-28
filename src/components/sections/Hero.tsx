"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/Hero-section.webm" type="video/webm" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-end min-h-screen px-6 lg:px-16 xl:px-24 pb-32">
        {/* Main Title Container */}
        <div className="text-left w-full max-w-4xl">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-medium tracking-[0.3em] text-white/80 mb-6 lg:mb-8 uppercase">
            A Life Rooted in Green Luxury
          </p>

          {/* Main Title - Large Typography */}
          <h1 className="font-serif text-7xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] font-medium text-white tracking-wide leading-none mb-6 lg:mb-8">
            Zinnia
          </h1>

          {/* Subheading */}
          <p className="max-w-xl text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed mb-10 lg:mb-12">
            Our villa communities are thoughtfully designed for those who seek more than just a home — they seek a lifestyle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 px-8 py-6 text-sm font-medium tracking-wide"
            >
              <Link href="#contact">Schedule a Visit</Link>
            </Button>
            <Link
              href="#overview"
              className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              Explore Overview
              <span className="text-white/60">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 lg:right-16 xl:right-24 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/50" style={{ writingMode: 'vertical-rl' }}>
          SCROLL
        </span>
        <ChevronDown className="w-4 h-4 text-white/50 animate-bounce mt-2" />
      </div>
    </section>
  );
}
