'use client';

import React, { useState, useEffect, useRef, useCallback, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius: propRadius, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const animationFrameRef = useRef<number | null>(null);

    const isDraggingRef = useRef(false);
    const lastPointerX = useRef(0);
    const touchSensitivity = 0.2;

    const [cardWidth, setCardWidth] = useState(300);
    const [cardHeight, setCardHeight] = useState(400);
    const [radius, setRadius] = useState(propRadius ?? 600);
    const [perspective, setPerspective] = useState('2000px');

    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        if (mobile) {
          setCardWidth(200);
          setCardHeight(280);
          setRadius(propRadius ?? 300);
          setPerspective('1000px');
        } else {
          setCardWidth(300);
          setCardHeight(400);
          setRadius(propRadius ?? 600);
          setPerspective('2000px');
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [propRadius]);

    useEffect(() => {
      const autoRotate = () => {
        if (!isDraggingRef.current) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const handlePointerStart = useCallback((clientX: number) => {
      isDraggingRef.current = true;
      lastPointerX.current = clientX;
    }, []);

    const handlePointerMove = useCallback((clientX: number) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - lastPointerX.current;
      lastPointerX.current = clientX;
      setRotation(prev => prev + deltaX * touchSensitivity);
    }, []);

    const handlePointerEnd = useCallback(() => {
      isDraggingRef.current = false;
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      handlePointerStart(e.touches[0].clientX);
    }, [handlePointerStart]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      handlePointerMove(e.touches[0].clientX);
    }, [handlePointerMove]);

    const handleTouchEnd = useCallback(() => {
      handlePointerEnd();
    }, [handlePointerEnd]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      handlePointerStart(e.clientX);
    }, [handlePointerStart]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      handlePointerMove(e.clientX);
    }, [handlePointerMove]);

    const handleMouseUp = useCallback(() => {
      handlePointerEnd();
    }, [handlePointerEnd]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
        style={{ perspective }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -(cardWidth / 2),
                  marginTop: -(cardHeight / 2),
                  opacity: opacity,
                  transition: 'opacity 0.3s linear',
                  pointerEvents: 'none',
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic opacity-80">{item.binomial}</em>
                    <p className="text-xs mt-2 opacity-70">Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
