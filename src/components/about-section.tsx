'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Globe, Layers, Terminal, Database } from 'lucide-react';

const skills = [
  { key: 'go',        name: 'Go',          desc: 'Backend services, APIs & CLI tools',       icon: <Code2 className="h-5 w-5" /> },
  { key: 'typescript', name: 'TypeScript',   desc: 'Full-stack type-safe development',      icon: <Server className="h-5 w-5" /> },
  { key: 'javascript', name: 'JavaScript',   desc: 'Node.js runtime & front-end',            icon: <Globe className="h-5 w-5" /> },
  { key: 'linux',      name: 'Linux',        desc: 'Server admin, shell scripting & security',icon: <Terminal className="h-5 w-5" /> },
  { key: 'devops',     name: 'DevOps',       desc: 'CI/CD, Docker, monitoring & infra',      icon: <Layers className="h-5 w-5" /> },
  { key: 'database',   name: 'Databases',    desc: 'PostgreSQL, MySQL, Redis & more',        icon: <Database className="h-5 w-5" /> },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-emerald-accent">01.</span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">About</h2>
          </div>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="term-chrome">
              <div className="term-chrome-bar">
                <div className="term-chrome-dot bg-red-500/80" />
                <div className="term-chrome-dot bg-yellow-500/80" />
                <div className="term-chrome-dot bg-green-500/80" />
                <span className="ms-2 text-xs text-muted-foreground/60 font-mono">sajjad@portfolio</span>
              </div>
              <div className="bg-card/50 p-4 space-y-1.5 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-accent">~$</span>
                  <span className="text-foreground/80">cat info.txt</span>
                </div>
                <div className="rounded-lg bg-background/60 border border-border/40 p-3 space-y-1">
                  <InfoLine label="born" value="2001" />
                  <InfoLine label="location" value="Sari, Qaemshahr & Babol, Iran" />
                  <InfoLine label="education" value="Bachelor's in Public Administration" />
                  <InfoLine label="" value="Master's in Human Resource Management" />
                  <InfoLine label="work" value="Remote & On-site" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-accent">sajjad@portfolio:~$</span>
                  <span className="text-foreground/80">uptime</span>
                </div>
                <div className="text-muted-foreground">since 2001 — still running</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Self-taught software engineer who went from curiosity to capability. I architect backend services in Go, build full-stack apps with TypeScript, manage Linux servers, configure databases, and handle DevOps pipelines — from CI/CD to monitoring.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-mono">
              <span className="text-emerald-accent">{'${'}  </span>
              Tech Stack
              <span className="text-emerald-accent">  {'}'}  </span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/40 p-3.5 transition-colors hover:border-emerald-accent/30 hover:bg-emerald-accent-muted"
                >
                  <div className="mb-1.5 text-emerald-accent">{skill.icon}</div>
                  <div className="text-sm font-semibold font-mono">{skill.name}</div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{skill.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      {label && (
        <span className="shrink-0 text-emerald-accent/80 w-20 text-end">{label}:</span>
      )}
      <span className={label ? 'text-muted-foreground' : 'text-muted-foreground ps-[5.25rem]'}>{value}</span>
    </div>
  );
}
