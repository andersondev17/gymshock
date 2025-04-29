'use client';


import HeroBanner from '@/components/home/HeroBanner';
import Journey from '@/components/home/Jorney';
import { JOURNEY_PROPS } from '@/constants/index';

export default function HomePage() {

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-screen overflow-x-hidden">
        <HeroBanner />
      </section>

      {/* Journey Section */}
      <Journey {...JOURNEY_PROPS} />
    </main>
  );
}