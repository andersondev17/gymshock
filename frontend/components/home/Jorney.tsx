'use client';
import { JourneyProps } from '@/types/exercise';
import { animate } from 'animejs';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import BlurFadeText from '../magicui/blur-fade-text';
import { Button } from '../ui/button';
import AppPreview from './AppPreview';

const Journey = ({ title, subtitle, benefits, ctaPrimary, ctaSecondary }: JourneyProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const animationTriggered = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !animationTriggered.current) {
                animate('.benefit-item', {
                    opacity: [0, 1],
                    translateX: [20, 0],
                    delay: (_, i) => i * 150,
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                animationTriggered.current = true;
            }
        }, { threshold: 0.2 });

        sectionRef.current && observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-gymshock-dark-900 min-h-screen relative w-screen">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-8">
                        <div className="bg-gymshock-primary-600/20 inline-block px-4 py-1 rounded-full text-gymshock-primary-500 text-sm">
                            💪 FITNESS JOURNEY
                        </div>

                        <BlurFadeText delay={0.2} className="text-4xl md:text-5xl font-bold text-white" yOffset={8} text={title} />

                        <p className="text-gymshock-dark-400 mb-8 max-w-full sm:max-w-[600px] text-base sm:text-lg">
                            {subtitle}
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="benefit-item opacity-0">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="text-gymshock-primary-500 mt-1 flex-shrink-0" />
                                        <span className="text-gymshock-dark-400">{benefit.text}</span>
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
                    <AppPreview />
                </div>
            </div>
        </section>
    );
};

export default Journey;