'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgramBuilder } from '@/hooks/useProgramBuilder';
import { AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import FrequencySelector from './FrequencySelector';
import GoalsSelector from './GoalsSelector';
import LevelSelector from './LevelSelector';
import ProgramSummary from './ProgramSummary';
import TimeSelector from './TimeSelector';

export default function ProgramBuilder() {
    const builder = useProgramBuilder();
    const progressValue = (builder.currentStep / 5) * 100;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Progress bar */}
            <header className="sticky top-0 z-50 bg-gymshock-dark-800/90 backdrop-blur-xl border-b border-gymshock-dark-700/50">
                <div className="max-w-6xl mx-auto px-4  flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Link 
                            href="/" 
                            className="p-2 rounded-lg hover:bg-gymshock-primary-600/20 transition-all duration-200 group" 
                            aria-label="Cerrar y volver a inicio"
                        >
                            <X className="w-6 h-6 text-gymshock-primary-600 group-hover:scale-110 transition-transform" />
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

                    <Progress 
                        value={progressValue}
                        className="flex-1 h-3 bg-gymshock-dark-700/50 border border-gymshock-dark-600/30 [&>div]:bg-gradient-to-r [&>div]:from-gymshock-primary-500 [&>div]:to-gymshock-primary-600 [&>div]:shadow-lg [&>div]:shadow-gymshock-primary-500/20 [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-out overflow-hidden rounded-full"
                    />

                    <span className="text-sm font-medium text-gymshock-dark-200 bg-gymshock-dark-700/50 px-3 py-1 rounded-full">
                        {builder.currentStep}/5
                    </span>
                </div>
            </header>

            <main className="flex-grow max-w-6xl mx-auto px-4 py-4 w-full">
                <header className="text-center space-y-6 mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                        Encuentra tu{' '}
                        <span className="bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 bg-clip-text text-transparent">
                            Plan de Entreno
                        </span>
                    </h1>

                    <p className="text-sm md:text-base text-gymshock-dark-300 max-w-2xl mx-auto leading-relaxed">
                        En 5 pasos simples, diseñamos un plan de entrenamiento 
                        que se adapte a tu nivel, objetivos y tiempo disponible.
                    </p>
                </header>

                {builder.error && (
                    <Alert variant="destructive" className="mb-8 bg-red-950/20 border-red-800/30 text-red-200 backdrop-blur-sm">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                            {builder.error}
                            <button
                                onClick={builder.clearError}
                                className="text-sm underline hover:no-underline transition-all"
                                aria-label="Cerrar error"
                            >
                                Cerrar
                            </button>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-8">
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

            <footer className="sticky bottom-0 z-50 bg-gymshock-dark-800/90 backdrop-blur-xl border-t border-gymshock-dark-700/50">
                <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={() => builder.goToStep(builder.currentStep - 1)}
                        disabled={!builder.canGoBack}
                        className="gap-2 border-gymshock-dark-600/50 text-white hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-40 transition-all duration-200"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    {builder.currentStep < 5 && (
                        <Button
                            onClick={() => builder.goToStep(builder.currentStep + 1)}
                            disabled={!builder.canGoForward}
                            variant="gymshock"
                            className="gap-2"
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