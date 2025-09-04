'use client';

import { PROGRAM_LEVELS, ProgramLevel } from '@/constants/programs';
import LevelCard from './LevelCard';

interface Props {
    selectedLevel: ProgramLevel | null;
    onSelect: (level: ProgramLevel) => void;
    stepNumber: number;
}

export function LevelSelector({ selectedLevel, onSelect, stepNumber }: Props) {
    return (
        <main className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <header className="flex items-center gap-3 mb-6">
                <span className="bg-gymshock-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                </span>
                <h2 className="text-xl font-semibold text-white">
                    Seleccione su nivel de experiencia
                </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(PROGRAM_LEVELS).map(([key, level]) => (
                    <div
                        key={key}
                        className="animate-in fade-in slide-in-from-bottom-5 fill-mode-both"
                    >
                        <LevelCard
                            levelKey={key as keyof typeof PROGRAM_LEVELS}
                            level={level}
                            isSelected={selectedLevel === key}
                            onSelect={onSelect}
                        />
                    </div>
                ))}
            </section>
        </main>
    );
}