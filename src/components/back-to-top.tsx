'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from '@/lib/scroll';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 400);
  });

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/80 text-muted-foreground backdrop-blur-sm shadow-sm transition-colors hover:bg-accent hover:text-foreground hover:border-emerald-accent/30 cursor-pointer ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}
