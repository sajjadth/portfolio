'use client';

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { BlogSection } from '@/components/blog-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';
import { EasterEgg } from '@/components/easter-egg';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <EasterEgg />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
