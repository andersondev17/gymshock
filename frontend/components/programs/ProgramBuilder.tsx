'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useProgramBuilder } from '@/hooks/useProgramBuilder';
import gsap from 'gsap';
import { AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import FrequencySelector from './FrequencySelector';
import GoalsSelector from './GoalsSelector';
import LevelSelector from './LevelSelector';
import ProgramSummary from './ProgramSummary';
import TimeSelector from './TimeSelector';

export default function ProgramBuilder() {
    const builder = useProgramBuilder();
    const contentRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: `${(builder.currentStep / 5) * 100}%`,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    }, [builder.currentStep]);

    return (
        <div className="flex flex-col min-h-screen bg-gymshock-dark-900 text-white ">

            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-10 bg-repeat" />
            {/* Progress Bar - GymShock Theme */}
            <div className=" z-50 sticky top-0 bg-gymshock-dark-800 border-b border-gymshock-dark-700">
                <div className="max-w-4xl mx-auto p-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="p-2 rounded hover:bg-gymshock-primary-600/20 transition-colors" aria-label="Cerrar y volver a inicio">
                            <X className="w-6 h-6 text-gymshock-primary-600" />
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => builder.goToStep(builder.currentStep - 1)}
                            disabled={!builder.canGoBack}
                            className="transition-all hover:scale-110 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed text-white disabled:opacity-40"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex-1 h-2 bg-gymshock-dark-700 rounded-full overflow-hidden">
                        <div
                            ref={progressRef}
                            className="h-full bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 rounded-full"
                            style={{ width: '0%' }}
                        />
                    </div>

                    <span className="text-sm font-medium text-gymshock-dark-200">
                        Paso {builder.currentStep} de 5
                    </span>
                </div>
            </div>

            <main className="relative z-10 flex-grow max-w-4xl mx-auto p-2 md:p-6 pb-24 overflow-auto space-y-4">
                  <header className="text-center space-y-4 py-8">
                    
                    <h1
                        className="text-[45px] md:text-[60px] lg:text-[65px] font-bold leading-[0.9] tracking-tight"
                        style={{
                            WebkitTextStroke: '1.5px white',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent'
                        }}
                    >
                        Encuentra tu <span className="text-gymshock-primary-600" style={{ WebkitTextFillColor: '#dc2626', color: '#dc2626' }}>Plan de Entreno</span>
                    </h1>

                    <p className="text-xs md:text-sm lg:text-base text-gymshock-dark-300 max-w-2xl mx-auto">
                        En 4 pasos simples, diseñamos un plan de entrenamiento
                        que se adapte a tu nivel, objetivos y tiempo disponible.
                    </p>
                </header>

                {builder.error && (
                    <Alert variant="destructive" className="mb-6 bg-gymshock-primary-950/50 border-gymshock-primary-800 text-gymshock-primary-200">
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

                <div ref={contentRef} className="space-y-2">
                    {builder.currentStep === 1 && (
                        <LevelSelector
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
                        <FrequencySelector
                            selectedFrequency={builder.selectedFrequency}
                            selectedLevel={builder.selectedLevel}
                            onSelect={builder.setFrequency}
                            stepNumber={4}
                        />
                    )}
                    {builder.currentStep === 5 && (
                        <ProgramSummary
                            level={builder.selectedLevel!}
                            goals={builder.selectedGoals}
                            frequency={builder.selectedFrequency!}
                            time={builder.selectedTime!}
                            onCreate={builder.createProgram}
                            isLoading={builder.isLoading}
                        />
                    )}
                </div>
            </main>

            {/* Footer - Botones GymShock */}
            <footer className="z-50 sticky bottom-0 bg-gymshock-dark-800 border-t border-gymshock-dark-700 p-2">
                <div className="max-w-4xl mx-auto flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => builder.goToStep(builder.currentStep - 1)}
                        disabled={!builder.canGoBack}
                        className="gap-2 border-gymshock-dark-600 text-white hover:bg-white/10 hover:text-white disabled:opacity-40"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    {builder.currentStep < 5 && (
                        <Button
                            variant="gymshock"
                            onClick={() => builder.goToStep(builder.currentStep + 1)}
                            disabled={!builder.canGoForward}
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}