'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PROGRAM_LEVELS, ProgramLevel } from '@/constants/programs';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import LevelCard from './LevelCard';
import StepHeader from './StepHeader';

interface Props {
    selectedLevel: ProgramLevel | null;
    onSelect: (level: ProgramLevel) => void;
    stepNumber: number;
}

export default function FitnessLevelSelector({ selectedLevel, onSelect, stepNumber }: Props) {
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
        <Card>
            <CardHeader>
                <StepHeader
                    stepNumber={stepNumber}
                    title="Seleccione su nivel de experiencia"
                />
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
}