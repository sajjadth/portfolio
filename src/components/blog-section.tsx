'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { posts } from '@/lib/posts';

const LATEST_COUNT = 3;

export function BlogSection() {
  const latestPosts = posts.slice(0, LATEST_COUNT);
  const hasMore = posts.length > LATEST_COUNT;

  return (
    <section id="blog" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-emerald-accent">02.</span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Blog</h2>
          </div>
          <p className="mt-4 font-mono text-sm text-muted-foreground">Thoughts from the terminal.</p>
        </motion.div>

        <div className="space-y-4">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="term-chrome transition-all hover:border-emerald-accent/30">
                  <div className="bg-card/40 p-4 sm:p-5 transition-colors group-hover:bg-emerald-accent-muted">
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
                      <span className="text-emerald-accent">~$</span>
                      <span>cat {post.slug}.md</span>
                    </div>
                    <h3 className="text-base font-semibold mb-2 sm:text-lg group-hover:text-emerald-accent transition-colors">
                      {post.title}
                    </h3>
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

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-emerald-accent hover:text-foreground transition-colors"
            >
              ~$ ls -la posts/
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
