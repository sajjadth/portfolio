'use client';

import { useEffect } from 'react';
import { smoothScrollBy, smoothScrollTo, syncScrollPosition } from '@/lib/scroll';

export function SmoothScroll() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';

    // Sync on load
    syncScrollPosition();

    const onWheel = (e: WheelEvent) => {
      // Allow pinch zoom
      if (e.ctrlKey) return;
      // Allow horizontal scroll (trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      smoothScrollBy(e.deltaY);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['Space', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
      if (!scrollKeys.includes(e.code)) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      e.preventDefault();
      const vh = window.innerHeight;
      switch (e.code) {
        case 'Space':    smoothScrollBy(e.shiftKey ? -vh * 0.8 : vh * 0.8); break;
        case 'PageDown': smoothScrollBy(vh * 0.9); break;
        case 'PageUp':   smoothScrollBy(-vh * 0.9); break;
        case 'ArrowDown': smoothScrollBy(80); break;
        case 'ArrowUp':   smoothScrollBy(-80); break;
        case 'End':      smoothScrollTo(document.documentElement.scrollHeight); break;
        case 'Home':     smoothScrollTo(0); break;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      html.style.scrollBehavior = '';
    };
  }, []);

  return null;
}
