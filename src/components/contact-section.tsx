'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Mail, User, MessageSquare, Terminal } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-emerald-accent">03.</span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact</h2>
          </div>
          <p className="mt-4 font-mono text-sm text-muted-foreground">$ echo &quot;your message&quot; | mail sajjad</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="term-chrome"
        >
          <div className="term-chrome-bar">
            <div className="term-chrome-dot bg-red-500/80" />
            <div className="term-chrome-dot bg-yellow-500/80" />
            <div className="term-chrome-dot bg-green-500/80" />
            <span className="ms-2 text-xs text-muted-foreground/60 font-mono">contact.sh</span>
          </div>

          <div className="bg-card/50 p-5 sm:p-8 space-y-5">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-emerald-accent/20 bg-emerald-accent/5 px-4 py-3 text-sm font-mono text-emerald-accent"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Message delivered successfully.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-mono text-destructive"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                Connection refused. Try again.
              </motion.div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono text-muted-foreground">{'${name}'}</label>
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground/40" />
                  <input
                    id="name"
                    type="text"
                    required
                    className="h-11 w-full rounded-lg border border-border/50 bg-background/80 ps-10 pe-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:border-emerald-accent/50 focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 transition-colors"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono text-muted-foreground">{'${email}'}</label>
                <div className="relative">
                  <Mail className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground/40" />
                  <input
                    id="email"
                    type="email"
                    required
                    className="h-11 w-full rounded-lg border border-border/50 bg-background/80 ps-10 pe-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:border-emerald-accent/50 focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 transition-colors"
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono text-muted-foreground">{'${message}'}</label>
              <div className="relative">
                <MessageSquare className="absolute top-3 start-3 h-4 w-4 text-muted-foreground/40" />
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-border/50 bg-background/80 ps-10 pe-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:border-emerald-accent/50 focus:outline-none focus:ring-2 focus:ring-emerald-accent/20 transition-colors resize-none"
                  placeholder="Your message"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg border border-emerald-accent/30 bg-emerald-accent/8 px-8 py-3.5 text-sm font-mono font-medium text-emerald-accent transition-all hover:bg-emerald-accent/15 hover:border-emerald-accent/50 hover:shadow-lg hover:shadow-emerald-accent/10 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
              <span className="text-foreground/60">./</span>
              <span>contact.sh</span>
              {status === 'sending' && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block h-3.5 w-3.5 border-2 border-emerald-accent/30 border-t-emerald-accent rounded-full"
                />
              )}
            </motion.button>
          </div>
        </motion.form>

      </div>
    </section>
  );
}
