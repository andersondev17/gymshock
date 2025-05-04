
'use client';

import { Button } from '@/components/ui/button';
import { animate } from 'animejs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import BlurFadeText from '../magicui/blur-fade-text';

interface HeroBannerProps {
  className?: string;
}

const BLUR_FADE_DELAY = 0;

const HeroBanner: React.FC<HeroBannerProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && imageRef.current && buttonContainerRef.current) {
      // Animación para la imagen principal
      animate(imageRef.current, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 1200,
        easing: 'easeOutCubic',
        delay: 300,
      });

      // Animación para los botones
      animate(buttonContainerRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: function (el, i) {
          return 1000 + i * 150;
        },
        duration: 800,
        easing: 'easeOutQuad',
      });
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-dvh overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      style={{ minHeight: '700px' }}
    >
      {/* Fondos y formas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[15%] w-20 h-20 rounded-full bg-red-500/20 blur-xl"></div>
        <div className="absolute top-[40%] left-[25%] w-32 h-32 rounded-full bg-blue-500/20 blur-xl"></div>
        <div className="absolute bottom-40 left-[10%] w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
        <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full bg-yellow-500/20 blur-xl"></div>
        <div className="absolute bottom-[20%] right-[30%] w-28 h-28 rounded-full bg-green-500/20 blur-xl"></div>
      </div>
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10 bg-repeat"></div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-2 lg:px-5 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Contenido de texto */}
        <div className="z-10 w-full lg:w-1/2 pt-16 lg:pt-0">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-red-600/20 text-red-500 font-medium text-sm">
            FITNESS REDEFINED
          </div>

          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-3"
            yOffset={8}
            text="TRANSFORM YOUR BODY"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY + 0.1}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 tracking-tight mb-6"
            yOffset={8}
            text="TRANSFORM YOUR LIFE"
          />
          <BlurFadeText
            className="text-base sm:text-lg text-gray-300 mb-8 max-w-full sm:max-w-[600px]"
            delay={BLUR_FADE_DELAY + 0.2}
            text="Discover over 1300+ exercises tailored to your goals. Whether you're a beginner or a pro, find the perfect workout routine to push your limits."
          />

          {/* Botones principales */}
          <div
            ref={buttonContainerRef}
            className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center w-full"
          >
            <Link href="/exercises" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="bg-red-600 hover:bg-red-700 font-medium text-lg px-6 py-4 rounded-xl shadow-lg shadow-red-600/20 w-full"
              >
                Browse Exercises
              </Button>
            </Link>
            <Link href="/exercises" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-900 hover:bg-white/60 font-medium text-lg px-6 py-4 rounded-xl w-full"
              >
                Start Training
              </Button>
            </Link>
          </div>

          {/* Join Athletes - MOBILE/TABLET BELOW BUTTONS, DESKTOP TO THE RIGHT */}
          <div
            className="
              order-last w-full mt-6 
              lg:order-none lg:w-auto lg:mt-0
              flex justify-center lg:justify-start items-center gap-2 text-gray-300
            "
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">MK</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">TS</div>
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">+5</div>
            </div>
            <span className="text-sm">
              Join 10k+ athletes
            </span>
          </div>
        </div>

        {/* Imagen y estadísticas */}
        <div
          ref={imageRef}
          className="relative w-full sm:w-3/4 lg:w-1/2 opacity-0 pt-6 lg:pt-8 mb-8 lg:mb-0"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="relative w-full aspect-square max-w-md sm:max-w-lg mx-auto">
            {/* Daily Progress */}
            <div className="absolute top-2 left-2 sm:top-0 sm:-left-6 bg-white/10 backdrop-blur-lg rounded-xl p-2 sm:p-3 shadow-xl animate-float">
              <div className="text-xs text-gray-300">Daily Progress</div>
              <div className="text-base sm:text-lg font-bold">78%</div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Calories Burned */}
            <div className="hidden lg:block absolute bottom-2 right-2 sm:bottom-8 sm:-right-24 bg-white/10 backdrop-blur-lg rounded-xl p-2 sm:p-3 shadow-xl animate-float-delay">
              <div className="text-xs text-gray-300">Calories Burned</div>
              <div className="text-base sm:text-lg font-bold">1,248</div>
              <div className="flex gap-1 items-center mt-1 text-green-400 text-xs">
                <Image width={40} height={40} alt="Arrow up" className="border rounded-full" src="/assets/images/banner.png" loading="eager" priority placeholder="blur" blurDataURL="data:image/png;base64,..." />
                <span className="text-xs sm:text-sm">12% more than yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default HeroBanner;
