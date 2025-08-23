'use client';

import { PROGRAM_LEVELS, ProgramLevel } from '@/constants/programs';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import LevelCard from './LevelCard';

interface Props {
    selectedLevel: ProgramLevel | null;
    onSelect: (level: ProgramLevel) => void;
    stepNumber: number;
}

export default function LevelSelector({ selectedLevel, onSelect, stepNumber }: Props) {
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.level-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        }
    }, []);

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-gymshock-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                </span>
                <h2 className="text-xl font-semibold text-white">
                    Seleccione su nivel de experiencia
                </h2>
            </div>
            
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(PROGRAM_LEVELS).map(([key, level]) => (
                    <div key={key} className="level-card">
                        <LevelCard
                            levelKey={key as keyof typeof PROGRAM_LEVELS}
                            level={level}
                            isSelected={selectedLevel === key}
                            onSelect={onSelect}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}