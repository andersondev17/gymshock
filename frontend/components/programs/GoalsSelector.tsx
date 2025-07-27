'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FITNESS_GOALS, VALIDATION_RULES } from '@/constants/programs';
import { CheckCircle2 } from 'lucide-react';
import StepHeader from './StepHeader';

interface Props {
    selectedGoals: string[];
    onToggle: (goalId: string) => void;
    stepNumber: number;
}

export default function GoalsSelector({ selectedGoals, onToggle, stepNumber }: Props) {
    return (
        <Card>
            <CardHeader>
                <StepHeader
                    stepNumber={stepNumber}
                    title="Seleccione tus objetivos (Puedes elegir varios)"
                />
                <div className="text-sm text-gray-500 mb-3">
                    Seleccionados: {selectedGoals.length}/{VALIDATION_RULES.MAX_GOALS}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FITNESS_GOALS.map((goal) => (
                        <Button
                            key={goal.id}
                            variant={selectedGoals.includes(goal.id) ? "default" : "outline"}
                            className={`min-h-[64px] p-4 text-left text-xs md:text-base xl:text-lgjustify-start transition-all duration-150 ease-in-out hover:scale-105
                            ${selectedGoals.includes(goal.id)
                                    ? "border-red-500 bg-red-50 ring-2 ring-red-200 text-black text-bold"
                                    : 'hover:border-red-300'
                                }`}
                            onClick={() => onToggle(goal.id)}
                        >
                            <span className="text-xs md:text-sm xl:text-lg mr-2">{goal.emoji}</span>
                            <div className="flex flex-col items-start">
                                <span className="font-medium">{goal.label}</span>
                                {selectedGoals.includes(goal.id) && (
                                    <CheckCircle2 className="h-5 w-5 mt-1 text-black" />
                                )}
                            </div>
                        </Button>


                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
