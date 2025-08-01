'use client';

import { ProgramLevel, VALIDATION_RULES } from '@/constants/programs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useProgramBuilder() {
    const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | null>(null);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const router = useRouter();

    const currentStep = step;

    const isComplete = selectedLevel &&
        selectedGoals.length >= VALIDATION_RULES.MIN_GOALS &&
        selectedTime;

    // FUNCIONES DE NAVEGACIÓN
    const goToStep = useCallback((newStep: number) => {
        setIsTransitioning(true);
        if (newStep < currentStep) {
            setDirection('backward');
        } else {
            setDirection('forward');
        }

        setStep(newStep);

    }, [currentStep]);

    const setLevel = (level: ProgramLevel) => {
        setSelectedLevel(level);
        setError(null);
    };

    const toggleGoal = (goalId: string) => {
        setSelectedGoals(prev => {
            const newGoals = prev.includes(goalId)
                ? prev.filter(g => g !== goalId)
                : [...prev, goalId];

            if (newGoals.length > VALIDATION_RULES.MAX_GOALS) {
                setError(`Máximo ${VALIDATION_RULES.MAX_GOALS} objetivos permitidos`);
                return prev;
            }

            return newGoals;
        });
    };

    const setTime = (time: string) => {
        setSelectedTime(time);
        setError(null);
    };

    const setFrequency = (frequency: string) => {
        setSelectedFrequency(frequency);
        setError(null);
    };
    const createProgram = async () => {
        if (!isComplete) {
            setError('Completa todos los pasos primero');
            return;
        }

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/programs/myprogram');
        } catch (err) {
            setError('Error al crear el programa');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentStep,
        isComplete,
        isLoading,
        error,
        selectedLevel,
        selectedGoals,
        selectedTime,
        selectedFrequency,
        setLevel,
        toggleGoal,
        setTime,
        setFrequency,
        createProgram,
        clearError: () => setError(null),
        direction,
        isTransitioning,
        goToStep,
        canGoBack: currentStep > 1,
        canGoForward: currentStep < 5 &&
            (currentStep === 1 ? !!selectedLevel :
                currentStep === 2 ? selectedGoals.length > 0 :
                    currentStep === 3 ? !!selectedTime :
                        currentStep === 4 ? !!selectedFrequency : false)
    };
}