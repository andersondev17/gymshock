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

      // UN SOLO TIMELIN
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
    <main className="relative overflow-hidden bg-gymshock-dark-900">
      <section
        id="hero-section"
        className="relative min-h-screen w-screen rounded-[6.5rem] p-2 overflow-hidden"
      >
        <HeroBanner />
        <div
          id="hero-gradient"
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gymshock-dark-300 to-transparent"
        />
      </section>

      <div
        id="separator"
        className="sticky top-[95vh] z-30 w-full pointer-events-none opacity-0"
        style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
      >
        <div className="h-px w-20 bg-gradient-to-r from-gymshock-primary-500/10 via-gymshock-primary-500 to-gymshock-primary-500/10 mx-auto" />
      </div>

      <div
        id="journey-section"
        className="relative bg-gymshock-dark-900 rounded-t-[2.5rem] shadow-gymshock-elevated z-20 opacity-0"
        style={{
          transform: 'translateY(8%)',
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