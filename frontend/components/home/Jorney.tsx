'use client';

import { JourneyProps } from '@/types/exercise';
import { animate } from 'animejs';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import BlurFadeText from '../magicui/blur-fade-text';
import { Button } from '../ui/button';
import AppPreview from './AppPreview';

const Journey = ({ title, subtitle, benefits, ctaPrimary, ctaSecondary}: JourneyProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const animationTriggered = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !animationTriggered.current) {
                    animateBenefits();
                    animationTriggered.current = true;
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    const animateBenefits = () => {
        animate('.benefit-item', {
            opacity: [0, 1],
            translateX: [20, 0],
            delay: (el, i) => i * 150,
            duration: 600,
            easing: 'easeOutQuad'
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-screen bg-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content Section */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-4 py-1 rounded-full bg-red-600/20 text-red-500 text-sm">
                            💪 FITNESS JOURNEY
                        </div>

                        <BlurFadeText
                            delay={0.2}
                            className="text-4xl md:text-5xl font-bold text-gray-900"
                            yOffset={8}
                            text={title}
                        />

                        <p className="text-lg text-gray-600 max-w-2xl">
                            {subtitle}
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item opacity-0">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-red-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link href={ctaPrimary.href} className="w-full sm:w-auto">
                                <Button className="gap-2 shadow-sm w-full" variant="default">
                                    {ctaPrimary.text}
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={ctaSecondary.href} className="w-full sm:w-auto">
                                <Button variant="outline" className='gap-2 p-3 rounded-md shadow-red w-full'>
                                    {ctaSecondary.text}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* App Preview Section */}
                    <AppPreview />
                </div>
            </div>
        </section>
    );
};



export default Journey;