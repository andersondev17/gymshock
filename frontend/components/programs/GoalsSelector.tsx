'use client';

import { FITNESS_GOALS, VALIDATION_RULES } from '@/constants/programs';
import { CheckCircle2 } from 'lucide-react';

interface Props {
    selectedGoals: string[];
    onToggle: (goalId: string) => void;
    stepNumber: number;
}

export default function GoalsSelector({ selectedGoals, onToggle, stepNumber }: Props) {
    return (
        <div className="bg-gymshock-dark-600 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-gymshock-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {stepNumber}
                </span>
                <h2 className="text-xl font-semibold text-white">
                    Seleccione tus objetivos (Puedes elegir varios)
                </h2>
            </div>

            <div className="text-sm text-gymshock-dark-300 mb-4">
                Seleccionados: {selectedGoals.length}/{VALIDATION_RULES.MAX_GOALS}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 text-sm">
                {FITNESS_GOALS.map((goal) => (
                    <button
                        key={goal.id}
                        className={`min-h-[80px] p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${selectedGoals.includes(goal.id)
                                ? "border-gymshock-primary-500 bg-gymshock-primary-500/20 backdrop-blur-md"
                                : "border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40"
                            }`}
                        onClick={() => onToggle(goal.id)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{goal.emoji}</span>
                            <span className="font-medium text-white">{goal.label}</span>
                        </div>
                        {selectedGoals.includes(goal.id) && (
                            <CheckCircle2 className="h-5 w-5 text-gymshock-primary-400" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
