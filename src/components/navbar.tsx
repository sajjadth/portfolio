'use client';

import { useTheme } from 'next-themes';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useSyncExternalStore } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { smoothScrollTo } from '@/lib/scroll';

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

const emptySub = () => () => {};
function getTrue() { return true; }
function getFalse() { return false; }

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const themeMounted = useSyncExternalStore(emptySub, getTrue, getFalse);
  const isDark = themeMounted && resolvedTheme === 'dark';

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(y);
    }
  };

  const handleNav = (item: typeof navItems[number]) => {
    setMobileOpen(false);
    if (item.id === 'blog') {
      return; // let Link handle it
    }
    scrollTo(item.id);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-accent/30 bg-emerald-accent/10 font-mono text-sm font-bold text-emerald-accent transition-all group-hover:bg-emerald-accent/20 group-hover:border-emerald-accent/50">
            {'>'}_
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            item.id === 'blog' ? (
              <Link
                key={item.id}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted/50 font-mono transition-colors cursor-pointer ${pathname.startsWith('/blog') ? 'text-emerald-accent' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => handleNav(item)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-muted/50 cursor-pointer font-mono"
              >
                {item.label}
              </button>
            )
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col px-5 py-3">
            {navItems.map((item) => (
              item.id === 'blog' ? (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 text-start font-mono transition-colors cursor-pointer ${pathname.startsWith('/blog') ? 'text-emerald-accent' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNav(item)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-muted/50 text-start cursor-pointer font-mono"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
