'use client';

import HeroBanner from '@/components/home/HeroBanner';
import Journey from '@/components/home/Jorney';
import { JOURNEY_PROPS } from '@/constants/index';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [journeyVisible, setJourneyVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setJourneyVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative overflow-hidden">
      <section id="home" className="relative min-h-screen w-screen">
        <HeroBanner />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      <div className="sticky top-[95vh] z-30 w-full pointer-events-none">
        <div className="h-px w-20 bg-gradient-to-r from-red-500/10 via-red-500 to-red-500/10 mx-auto" />
      </div>

      <div className={`
        relative bg-gray-100 rounded-t-[2.5rem] shadow-xl
        transition-transform duration-700 ease-out z-20
        ${journeyVisible ? 'translate-y-0' : 'translate-y-[10%]'}
      `}
        style={{ 
          boxShadow: '0 -8px 30px rgba(0,0,0,0.1)',
          marginTop: '-8%' // Ajuste fino para la superposición controlada
        }}
      >
        <div className="pt-12 pb-24">
          <Journey {...JOURNEY_PROPS} />
        </div>
      </div>
    </main>
  );
}