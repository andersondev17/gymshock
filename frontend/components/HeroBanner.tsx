import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface HeroBannerProps {
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ className }) => {
  return (
    <section 
      className={cn(
        "relative min-h-[80vh] w-full overflow-hidden bg-background px-6 py-12 md:px-12 lg:px-20",
        className
      )}
    >
      {/* Overlay Text */}
      <div className="absolute right-0 top-0 -z-10 text-[200px] font-bold opacity-5 hidden lg:block">
        Exercise
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 flex flex-col gap-6">
          {/* Heading Section */}
          <span className="text-2xl font-semibold text-red-600">
            Fitness Club
          </span>
          
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Sweat, Smile <br />
            And Repeat
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Check out the most effective exercises personalized to you. Transform your body, transform your life.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="mt-4 w-fit bg-red-600 px-8 py-6 text-lg hover:bg-red-700"
            asChild
          >
            <a href="#exercises">
              Explore Exercises
            </a>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 hidden lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/hero-banner.png"
            alt="Fitness training banner"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;