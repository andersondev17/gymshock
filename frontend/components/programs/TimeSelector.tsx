// ===== TimeSelector.tsx =====
'use client';

import { TIME_OPTIONS } from '@/constants/programs';
import { Clock } from 'lucide-react';

interface Props {
    selectedTime: string | null;
    onSelect: (time: string) => void;
    stepNumber: number;
}

export function TimeSelector({ selectedTime, onSelect, stepNumber }: Props) {
    return (
        <main className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <header className="flex items-center gap-3 mb-6">
                <span className="bg-gymshock-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                </span>
                <h2 className="text-xl font-semibold text-white">
                    Seleccione tiempo disponible para entrenar
                </h2>
            </header>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TIME_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        className={`h-20 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 hover:scale-105 ${
                            selectedTime === option.value
                                ? "border-gymshock-primary-500 bg-gymshock-primary-500/20 backdrop-blur-md"
                                : "border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40"
                        }`}
                        onClick={() => onSelect(option.value)}
                    >
                        <Clock className="h-5 w-5 text-white" />
                        <span className="font-medium text-white text-sm">{option.label}</span>
                    </button>
                ))}
            </section>
        </main>
    );
}
