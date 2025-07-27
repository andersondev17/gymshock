'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TIME_OPTIONS } from '@/constants/programs';
import { Clock } from 'lucide-react';
import StepHeader from './StepHeader';

interface Props {
    selectedTime: string | null;
    onSelect: (time: string) => void;
    stepNumber: number;
}

export default function TimeSelector({ selectedTime, onSelect, stepNumber }: Props) {
    return (
        <Card>
            <CardHeader>
                <StepHeader
                    stepNumber={stepNumber}
                    title="Seleccione tiempo disponible para entrenar" 
                />
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TIME_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            variant={selectedTime === option.value ? "default" : "outline"}
                            className={`h-20 flex flex-col items-center justify-center transition-all hover:scale-105 text-xs md:text-sm xl:text-lg${selectedTime === option.value
                                    ? 'bg-red-600 hover:bg-red-700 ring-2 ring-red-200'
                                    : 'hover:border-red-300'
                                }`}
                            onClick={() => onSelect(option.value)}
                        >
                            <Clock className="h-5 w-5 mb-1 text-xs md:text-sm xl:text-lg" />
                            <span className="font-medium">{option.label}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
