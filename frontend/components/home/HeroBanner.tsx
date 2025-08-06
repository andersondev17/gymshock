'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';

const HeroBanner = () => {
  const setupOnce = useRef(false);

  useLayoutEffect(() => {
    if (setupOnce.current) return;
    setupOnce.current = true;

    const initHeroAnimations = async () => {
      const { gsap } = await import('gsap');

      const tl = gsap.timeline({
        ease: "power2.out"
      });

      tl.set("#hero-content", { opacity: 0, y: 30 })
        .set("#hero-image", { opacity: 0, y: 50, scale: 0.9 })
        .set("#hero-buttons", { opacity: 0, y: 20 })
        .set("#hero-floats", { opacity: 0 })
        .to("#hero-content", {
          opacity: 1,
          y: 0,
          duration: 0.8
        })
        .to("#hero-image", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2
        }, "-=0.5")
        .to("#hero-buttons", {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, "-=0.3")
        .to("#hero-floats", {
          opacity: 1,
          duration: 0.8
        }, "-=0.4");
    };

    initHeroAnimations();
  }, []);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-gradient-to-br from-gymshock-dark-800 via-gymshock-dark-900 to-black text-white min-h-[700px]">
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/images/hero.webp")',
        }}
      />
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10 bg-repeat" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-2 lg:px-5 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* Left Content */}
        <div
          id="hero-content"
          className="z-10 w-full lg:w-1/2 pt-16 lg:pt-0"
          style={{ opacity: 0 }}
        >
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-transparent border-gymshock-primary-700 text-gymshock-primary-500 font-medium text-sm">
            FITNESS REDEFINED
          </div>
          <h1
            className="text-[40px] md:text-[60px] lg:text-[120px] font-bold leading-[0.9] tracking-tight"
            style={{
              WebkitTextStroke: '1.5px white',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            WORKOUTS, <span className="text-gymshock-primary-600" style={{ WebkitTextFillColor: '#dc2626', color: '#dc2626' }}>SERIES</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            AND MORE
          </h2>
          <p className="text-base sm:text-lg text-gymshock-dark-300 mb-8 max-w-full sm:max-w-[600px]">
            FREE ANYTIME AND ANYWHERE
          </p>

          {/* Buttons */}
          <div
            id="hero-buttons"
            className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center w-full mb-6"
            style={{ opacity: 0 }}
          >
            <Link href="/exercises" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="gymshock"
                className="border-white font-medium text-lg px-6 py-4 rounded-xl w-full"

              >
                Browse Exercises
              </Button>
            </Link>
            <Link href="/programs" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/60 font-medium text-lg px-6 py-4 rounded-xl w-full"
              >
                Start Training
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex justify-center lg:justify-start items-center gap-2 text-gymshock-dark-300 pb-16">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gymshock-info-500 border-2 border-gymshock-dark-800 flex items-center justify-center text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-gymshock-success-500 border-2 border-gymshock-dark-800 flex items-center justify-center text-xs font-bold">MK</div>
              <div className="w-8 h-8 rounded-full bg-gymshock-warning-500 border-2 border-gymshock-dark-800 flex items-center justify-center text-xs font-bold">TS</div>
              <div className="w-8 h-8 rounded-full bg-gymshock-energy-500 border-2 border-gymshock-dark-800 flex items-center justify-center text-xs font-bold">+5</div>
            </div>
            <span className="text-sm">Join 10k+ athletes</span>
          </div>
        </div>

        {/* Right Image */}
        <div
          id="hero-image"
          className="relative w-full sm:w-3/4 lg:w-1/2 pt-6 lg:pt-8 mb-8 lg:mb-0"
          style={{ opacity: 0 }}
        >
          <div className="relative w-full aspect-square max-w-md sm:max-w-lg mx-auto">
            {/* Floating Cards */}
            <div
              id="hero-floats"
              className="contents"
              style={{ opacity: 0 }}
            >


              <div className="hidden lg:block absolute bottom-2 right-2 sm:bottom-8 sm:-right-24 bg-gymshock-dark-700 backdrop-blur-lg rounded-xl p-2 sm:p-3 shadow-xl">
                <div className="text-xs text-gymshock-dark-300">Calories Burned</div>
                <div className="text-base sm:text-lg font-bold">1,248</div>
                <div className="flex gap-1 items-center mt-1 text-gymshock-success-400 text-xs">
                  <Image
                    width={40}
                    height={40}
                    alt="Progress indicator"
                    className="border rounded-full"
                    src="/assets/images/banner.avif"
                    loading="eager"
                    priority
                  />
                  <span className="text-xs sm:text-sm">12% more than yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gymshock-dark-800 to-transparent" />
    </div>
  );
};

export default HeroBanner;