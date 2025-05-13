'use client';

import HeroBanner from '@/components/home/HeroBanner';
import Journey from '@/components/home/Jorney';
import { JOURNEY_PROPS } from '@/constants/index';
import { useLayoutEffect, useRef } from 'react';

export default function HomePage() {
  const setupOnce = useRef(false);

  useLayoutEffect(() => {
    if (setupOnce.current) return;
    setupOnce.current = true;

    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      //UN SOLO TIMELINe
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })
      .to("#hero-section", { scale: 0.95 })
      .to("#hero-gradient", { opacity: 0 }, "<")
      .to("#separator", { scaleX: 1, opacity: 1 }, 0.2)
      .to("#journey-section", { y: 0, opacity: 1 }, 0.4);
    };

    initAnimations();
  }, []);

  return (
    <main className="relative overflow-hidden">
      <section id="hero-section" className="relative min-h-screen w-screen">
        <HeroBanner />
        <div id="hero-gradient" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      <div 
        id="separator"
        className="sticky top-[95vh] z-30 w-full pointer-events-none opacity-0"
        style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
      >
        <div className="h-px w-20 bg-gradient-to-r from-red-500/10 via-red-500 to-red-500/10 mx-auto" />
      </div>

      <div 
        id="journey-section"
        className="relative bg-gray-100 rounded-t-[2.5rem] shadow-xl z-20 opacity-0"
        style={{ 
          transform: 'translateY(8%)',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.1)',
          marginTop: '-6%'
        }}
      >
        <div className="pt-12 pb-24">
          <Journey {...JOURNEY_PROPS} />
        </div>
      </div>
    </main>
  );
}