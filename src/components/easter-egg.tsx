'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

interface CharRain {
  id: number;
  x: number;
  char: string;
  speed: number;
  delay: number;
  size: number;
}

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>/\|=+-*^%$#@!;:';

export function EasterEgg() {
  const [activated, setActivated] = useState(false);
  const [rain, setRain] = useState<CharRain[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const sequenceRef = useRef<string[]>([]);
  const idRef = useRef(0);

  const spawnRain = useCallback(() => {
    const chars: CharRain[] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      chars.push({
        id: idRef.current++,
        x: Math.random() * 100,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        speed: 3 + Math.random() * 6,
        delay: Math.random() * 2,
        size: 0.65 + Math.random() * 0.5,
      });
    }
    setRain(chars);
    setActivated(true);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activated) return;
      sequenceRef.current.push(e.code);
      if (sequenceRef.current.length > KONAMI.length) {
        sequenceRef.current.shift();
      }
      if (sequenceRef.current.length === KONAMI.length &&
          sequenceRef.current.every((k, i) => k === KONAMI[i])) {
        spawnRain();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activated, spawnRain]);

  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(() => {
      setActivated(false);
      setRain([]);
      sequenceRef.current = [];
    }, 6000);
    return () => clearTimeout(timer);
  }, [activated]);

  return (
    <AnimatePresence>
      {activated && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        >
          {rain.map((c) => (
            <motion.span
              key={c.id}
              initial={{ y: '-5%', opacity: 0 }}
              animate={{ y: '105%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: c.speed,
                delay: c.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute font-mono text-emerald-accent pointer-events-none select-none"
              style={{
                left: `${c.x}%`,
                fontSize: `${c.size}rem`,
                textShadow: '0 0 8px var(--emerald-accent)',
              }}
            >
              {c.char}
            </motion.span>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <button
              onClick={() => {
                setDismissed(true);
                setActivated(false);
                setRain([]);
                sequenceRef.current = [];
              }}
              className="rounded-lg border border-emerald-accent/30 bg-background/80 backdrop-blur-sm px-4 py-2 text-xs font-mono text-emerald-accent hover:bg-emerald-accent/10 transition-colors cursor-pointer"
            >
              [ESC] Nice find. Now get back to work.
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
