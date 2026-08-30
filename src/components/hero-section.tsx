'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { smoothScrollTo } from '@/lib/scroll';

const NAME = 'Sajjad Tahmouresi';
const CHAR_DELAY = 0.04; // seconds per character

export function HeroSection() {
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typed >= NAME.length) return;
    const timer = setTimeout(() => setTyped((t) => t + 1), CHAR_DELAY * 1000);
    return () => clearTimeout(timer);
  }, [started, typed]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5"
    >
      {/* Dot-grid & term-grid — hero only */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="term-grid absolute inset-0 pointer-events-none" />

      <div className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-emerald-accent/8 blur-[120px] glow-pulse" />
      <div className="pointer-events-none absolute bottom-1/3 -right-32 h-72 w-72 rounded-full bg-emerald-accent/5 blur-[100px] glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 mx-auto max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="term-chrome"
        >
          <div className="term-chrome-bar">
            <div className="term-chrome-dot bg-red-500/80" />
            <div className="term-chrome-dot bg-yellow-500/80" />
            <div className="term-chrome-dot bg-green-500/80" />
            <span className="ms-2 text-xs text-muted-foreground/60 font-mono">sajjad@portfolio:~</span>
          </div>

          <div className="bg-card/50 p-5 sm:p-8 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-2 font-mono text-sm"
            >
              <span className="text-emerald-accent">~$</span>
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-foreground/80"
              >
                whoami
              </motion.span>
            </motion.div>

            <div className="min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5.5rem]">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                {NAME.slice(0, typed)}
                {typed < NAME.length ? (
                  <span className="cursor-blink text-emerald-accent">_</span>
                ) : (
                  <span className="cursor-blink text-emerald-accent">_</span>
                )}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: started && typed >= NAME.length ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-base sm:text-lg text-emerald-accent"
            >
              Full-Stack Developer &amp; DevOps Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: started && typed >= NAME.length ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl"
            >
              I build reliable backend systems, configure production servers, and ship full-stack applications. My toolkit spans Go, JavaScript, TypeScript, Linux administration, and cloud infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: started && typed >= NAME.length ? 1 : 0, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 px-5 py-3 text-sm font-mono font-medium text-emerald-accent transition-all hover:bg-emerald-accent/20 hover:border-emerald-accent/40 hover:shadow-lg hover:shadow-emerald-accent/5 cursor-pointer"
              >
                <span>~$</span>
                <span>Get in touch</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade — blends hero into rest of site */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-t from-background to-transparent z-[5]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started && typed >= NAME.length ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-6 rounded-full border-2 border-border flex items-start justify-center pt-2"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
