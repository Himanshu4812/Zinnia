'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MenuToggleIconProps {
  open: boolean;
  className?: string;
  duration?: number;
}

export const MenuToggleIcon: React.FC<MenuToggleIconProps> = ({ open, className, duration = 300 }) => {
  return (
    <div className={className}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          animate={open ? { d: 'M 18 6 L 6 18' } : { d: 'M 4 6 L 20 6' }}
          transition={{ duration: duration / 1000 }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: duration / 1000 }}
          d="M 4 12 L 20 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          animate={open ? { d: 'M 6 6 L 18 18' } : { d: 'M 4 18 L 20 18' }}
          transition={{ duration: duration / 1000 }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
