'use client';

import { FREQUENCY_OPTIONS } from '@/constants/programs';
import { Calendar } from 'lucide-react';

interface Props {
    selectedFrequency: string | null;
    selectedLevel: string | null;
    onSelect: (frequency: string) => void;
    stepNumber: number;
}

export function FrequencySelector({ selectedFrequency, selectedLevel, onSelect, stepNumber }: Props) {
    const getRecommendedFrequency = () => {
        if (!selectedLevel) return null;
        return FREQUENCY_OPTIONS.find(opt =>
            opt.recommended.some(level => selectedLevel.includes(level))
        )?.value || null;
    };
    const recommendedFreq = getRecommendedFrequency();

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-gymshock-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                </span>
                <h2 className="text-xl font-semibold text-white">
                    ¿Cuántas veces por semana quieres entrenar?
                </h2>
            </div>
            
            {recommendedFreq && (
                <div className="bg-gymshock-success-500/20 border border-gymshock-success-500/30 rounded-lg p-3 mb-6">
                    <p className="text-gymshock-success-300 text-sm">
                        💡 Recomendado para tu nivel: <strong>{FREQUENCY_OPTIONS.find(f => f.value === recommendedFreq)?.label}</strong>
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FREQUENCY_OPTIONS.map((option) => {
                    const isRecommended = option.value === recommendedFreq;
                    const isSelected = selectedFrequency === option.value;

                    return (
                        <button
                            key={option.value}
                            className={`h-24 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 relative hover:scale-105 ${
                                isSelected
                                    ? "border-gymshock-primary-500 bg-gymshock-primary-500/20 backdrop-blur-md"
                                    : isRecommended
                                        ? "border-gymshock-success-400/60 bg-gymshock-success-400/10 backdrop-blur-md hover:border-gymshock-success-400"
                                        : "border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40"
                            }`}
                            onClick={() => onSelect(option.value)}
                        >
                            {isRecommended && !isSelected && (
                                <div className="absolute -top-2 -right-2 bg-gymshock-success-500 text-white text-xs px-2 py-1 rounded-full">
                                    ⭐
                                </div>
                            )}

                            <Calendar className="h-5 w-5 text-white" />
                            <span className="font-medium text-white text-sm">{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}