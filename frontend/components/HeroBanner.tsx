import { Button } from '@/components/ui/button';
import React from 'react';
import BlurFadeText from './magicui/blur-fade-text';

interface HeroBannerProps {
  className?: string;
}

const BLUR_FADE_DELAY = 0.04;

const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (

    <div className="relative h-dvh w-full overflow-x-hidden">
      <section className="relative flex flex-col lg:flex-row items-center justify-between py-16 px-6">

        {/* Overlay Text */}
        <div className="absolute right-0 top-0 -z-10 text-[200px] font-bold opacity-5 hidden lg:block">
          Exercise
        </div>

        {/* Main Content */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10 gap-6">
            {/* Heading Section */}

            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Transform Your Body`}
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold text-red-600 tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Transform Your Life`}
            />
           
            {/* Subheading */}
            <BlurFadeText
              className="max-w-[600px] md:text-xl  py-5"
              delay={BLUR_FADE_DELAY}
              text={` Check out the most effective exercises personalized to you.`}
            />
           

            {/* CTA Button */}
            <div className="flex gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 ">
                Start  Trial
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {/*  <div className="absolute right-0 top-0 -z-10 h-full w-1/2 hidden lg:block">
          <div className="relative h-full w-full">
            <Image
              src="/assets/images/banner.png"
              alt="Fitness training banner"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default HeroBanner;