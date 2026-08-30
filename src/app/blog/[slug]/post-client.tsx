'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/posts';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative px-5 py-28 sm:py-32">
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="term-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-emerald-accent transition-colors mb-6"
            >
              <ArrowLeft className="h-3 w-3" />
              cd ../blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="term-chrome"
          >
            <div className="term-chrome-bar">
              <div className="term-chrome-dot bg-red-500/80" />
              <div className="term-chrome-dot bg-yellow-500/80" />
              <div className="term-chrome-dot bg-green-500/80" />
              <span className="ms-2 text-xs text-muted-foreground/60 font-mono truncate flex-1">{post.slug}.md</span>
            </div>

            <div className="bg-card/50 p-5 sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-3 mb-8 text-xs text-muted-foreground font-mono">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-muted/50 px-2.5 py-0.5"
                  >
                    <Tag className="h-2.5 w-2.5 text-emerald-accent" />
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Link
              href="/blog"
              className="font-mono text-sm text-muted-foreground hover:text-emerald-accent transition-colors"
            >
              Back to all posts
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
