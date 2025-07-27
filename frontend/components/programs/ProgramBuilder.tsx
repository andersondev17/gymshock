'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useProgramBuilder } from '@/hooks/useProgramBuilder';
import gsap from 'gsap';
import { AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import FitnessLevelSelector from './FitnessLevelSelector';
import GoalsSelector from './GoalsSelector';
import ProgramSummary from './ProgramSummary';
import TimeSelector from './TimeSelector';

export default function ProgramBuilder() {
    const builder = useProgramBuilder();
    const contentRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    //  animación de progreso suave
    useEffect(() => {
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: `${(builder.currentStep / 4) * 100}%`,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    }, [builder.currentStep]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Progress Bar */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b">
                <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">

                    <div className="flex items-center gap-2">
                        <Link href="/" className="p-2 rounded hover:bg-gray-200 transition-colors" aria-label="Cerrar y volver a inicio">
                            <X className="w-6 h-6 text-red-600" />
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => builder.goToStep(builder.currentStep - 1)}
                            disabled={!builder.canGoBack}
                            className="transition-all hover:scale-110"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            ref={progressRef}
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                            style={{ width: '0%' }}
                        />
                    </div>

                    <span className="text-xs md:text-sm font-medium text-gray-600">
                        Paso {builder.currentStep} de 4
                    </span>

                </div>
            </div>


            <main className="flex-grow max-w-4xl mx-auto p-2 md:p-6 pb-24 overflow-auto space-y-8">
                <header className="text-center space-y-3 py-1">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        Encuentra tu <span className="text-red-600">Programa Perfecto</span>
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
                        En 3 pasos simples, crearemos un plan de entrenamiento personalizado
                        que se adapte a tu nivel, objetivos y tiempo disponible.
                    </p>
                </header>

                {builder.error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                            {builder.error}
                            <button
                                onClick={builder.clearError}
                                className="text-sm underline hover:no-underline"
                                aria-label="Cerrar error"
                            >
                                Cerrar
                            </button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Contenedor con animación */}
                <div ref={contentRef} className="space-y-2">
                    {builder.currentStep === 1 && (
                        <FitnessLevelSelector
                            selectedLevel={builder.selectedLevel}
                            onSelect={builder.setLevel}
                            stepNumber={1}
                        />
                    )}

                    {builder.currentStep === 2 && (
                        <GoalsSelector
                            selectedGoals={builder.selectedGoals}
                            onToggle={builder.toggleGoal}
                            stepNumber={2}
                        />
                    )}

                    {builder.currentStep === 3 && (
                        <TimeSelector
                            selectedTime={builder.selectedTime}
                            onSelect={builder.setTime}
                            stepNumber={3}
                        />
                    )}

                    {builder.currentStep === 4 && (
                        <ProgramSummary
                            level={builder.selectedLevel!}
                            goals={builder.selectedGoals}
                            time={builder.selectedTime!}
                            onCreate={builder.createProgram}
                            isLoading={builder.isLoading}
                        />
                    )}
                </div>

                <footer className="sticky bottom-0 bg-white border-t p-4 max-w-4xl mx-auto flex justify-between z-50">
                    <Button
                        variant="outline"
                        onClick={() => builder.goToStep(builder.currentStep - 1)}
                        disabled={!builder.canGoBack}
                        className="gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    {builder.currentStep < 4 && (
                        <Button
                            onClick={() => builder.goToStep(builder.currentStep + 1)}
                            disabled={!builder.canGoForward}
                            className="gap-2 bg-red-600 hover:bg-red-700"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}

                </footer>
            </main>
        </div>
    );
}