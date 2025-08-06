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
        <section ref={sectionRef} className="bg-gymshock-dark-900 min-h-screen relative w-screen overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-[0.02] bg-repeat pointer-events-none" />   
            <div className="absolute top-0 left-0 w-96 h-96 bg-gymshock-primary-600/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gymshock-primary-500/2 rounded-full blur-3xl" /> 
            <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-8">
                        <div className="bg-gymshock-primary-600/20 inline-block px-4 py-1 rounded-full text-gymshock-primary-500 text-sm border border-gymshock-primary-600/30">
                            💪 FITNESS JOURNEY
                        </div>

                        <BlurFadeText 
                            delay={0.2} 
                            className="text-4xl md:text-5xl font-bold text-white" 
                            yOffset={8} 
                            text={title} 
                        />

                        <p className="text-gymshock-dark-300 mb-8 max-w-full sm:max-w-[600px] text-base sm:text-lg leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="benefit-item opacity-0">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                                        <CheckCircle className="text-gymshock-primary-500 mt-1 flex-shrink-0" />
                                        <span className="text-gymshock-dark-200">{benefit.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link href={ctaPrimary.href} className="w-full sm:w-auto">
                                <Button className="gap-2 shadow-lg shadow-gymshock-primary-600/20 w-full hover:scale-105 transition-transform" variant="gymshock">
                                    {ctaPrimary.text}
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={ctaSecondary.href} className="w-full sm:w-auto">
                                <Button 
                                    variant="outline"
                                    className="border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 font-medium text-lg px-6 py-4 rounded-xl w-full transition-all duration-200"
                                >
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