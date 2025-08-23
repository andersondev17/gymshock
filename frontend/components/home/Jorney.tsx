'use client';

import { Exercise, JourneyProps } from '@/types/exercise';
import { getExercises } from '@/utils/fetchData';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BlurFadeText from '../magicui/blur-fade-text';
import { Button } from '../ui/button';
import AppPreview from './AppPreview';

const Journey = ({ title, subtitle, benefits, ctaPrimary, ctaSecondary }: JourneyProps) => {
    const [currentIndex, setCurrentIndex] = useState(1);

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const totalPhotos = 4;
    const nextPhotoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await getExercises({ limit: 4 });
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();
    }, []);

    // 0 % 4 = 0 + 1 => 1
    // 1 % 4 = 1 + 1 => 2
    // 2 % 4 = 2 + 1 => 3
    // 3 % 4 = 3 + 1 => 4
    // 4 % 4 = 0 + 1 => 1
    const handleMiniPhotoClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex % totalPhotos) + 1);
    };

    useGSAP(
        () => {
            if (currentIndex > 1) {
                gsap.set("#next-image", { visibility: "visible" });
                gsap.to("#next-image", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                });
                gsap.from("#current-image", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    );

    const getExerciseGif = (index: number) => exercises[index - 1]?.gifUrl || '';

    return (
        <main
            className="relative min-h-screen w-screen overflow-hidden bg-gymshock-dark-900"
            aria-label="Fitness journey"
        >
            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-35 bg-repeat" />

            <article className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <section className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-gymshock-primary-600/20 text-gymshock-primary-500 px-4 py-2 rounded-full text-sm font-medium border border-gymshock-primary-600/30">
                                <div className="w-2 h-2 bg-gymshock-primary-500 rounded-full animate-pulse" />
                                💪 FITNESS REDEFINED
                            </div>

                            <BlurFadeText
                                delay={0.2}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
                                yOffset={8}
                                text={title}
                            />

                            <p className="text-xl text-gymshock-dark-300 leading-relaxed max-w-lg">
                                {subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="benefit-item">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-gymshock-primary-500/20">
                                        <CheckCircle className="text-gymshock-primary-500 mt-0.5 flex-shrink-0 h-5 w-5" />
                                        <span className="text-gymshock-dark-200 text-sm font-medium">{benefit.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href={ctaPrimary.href} aria-label={ctaPrimary.text}>
                                <Button className="gap-2 bg-gymshock-primary-600 hover:bg-gymshock-primary-700 text-white font-semibold px-8 py-4 text-base shadow-lg shadow-gymshock-primary-600/20 transition-all w-full sm:w-auto group">
                                    {ctaPrimary.text}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href={ctaSecondary.href} aria-label={ctaSecondary.text}>
                                <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 font-semibold px-8 py-4 text-base w-full sm:w-auto">
                                    {ctaSecondary.text}
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* Exercise Preview  */}
                    <aside className="lg:col-span-7 flex justify-center lg:justify-end">
                        <div className="relative w-[400px] h-[500px] lg:w-[480px] lg:h-[600px]">
                            <div
                                id="exercise-frame"
                                className="relative z-10 h-full w-full overflow-hidden rounded-3xl bg-gymshock-dark-700/20 backdrop-blur-sm border border-white/10 shadow-2xl"
                            >
                                {/* Background Exercise */}
                                <Image
                                    src={getExerciseGif(currentIndex === totalPhotos - 1 ? 1 : currentIndex)}
                                    alt="Background exercise"
                                    fill
                                    className="absolute left-0 top-0 object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 size-64 cursor-pointer overflow-hidden rounded-2xl">
                                    <AppPreview>
                                        <div
                                            onClick={handleMiniPhotoClick}
                                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 h-full w-full"
                                        >
                                            <Image
                                                ref={nextPhotoRef}
                                                src={getExerciseGif((currentIndex % totalPhotos) + 1)}
                                                alt="Next exercise preview"
                                                fill
                                                className="origin-center scale-150 object-cover object-center rounded-lg"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                id="current-image"
                                            />
                                        </div>
                                    </AppPreview>
                                </div>

                                {/* Next Exercise Hidden */}
                                <Image
                                    src={getExerciseGif(currentIndex)}
                                    alt="Next exercise"
                                    fill
                                    className="invisible absolute z-20 size-64 object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    id="next-image"
                                />

                                <h2 className="absolute bottom-5 right-5 z-40 text-gymshock-dark-600 font-bold text-lg">
                                    GYM<span className="text-gymshock-primary-500">SHOCK</span>
                                </h2>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
};

export default Journey;