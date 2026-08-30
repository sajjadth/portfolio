'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/posts';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';

export function BlogListPageClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative px-5 py-28 sm:py-32">
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="term-grid absolute inset-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-emerald-accent transition-colors mb-6"
            >
              <ArrowLeft className="h-3 w-3" />
              cd ~
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-emerald-accent">~$</span>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">All Posts</h1>
            </div>
            <div className="gradient-line w-full" />
            <p className="mt-4 font-mono text-sm text-muted-foreground">ls -la posts/</p>
          </motion.div>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 * i }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="term-chrome transition-all hover:border-emerald-accent/30">
                    <div className="bg-card/40 p-4 sm:p-5 transition-colors group-hover:bg-emerald-accent-muted">
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
                        <span className="text-emerald-accent">~$</span>
                        <span>cat {post.slug}.md</span>
                      </div>
                      <h2 className="text-base font-semibold mb-2 sm:text-lg group-hover:text-emerald-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        {post.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-emerald-accent/70">
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                        <span className="ms-auto text-emerald-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          Read post <ArrowRight className="h-3 w-3 inline" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
