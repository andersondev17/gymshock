// components/ux/NeuroFlow.tsx - FILOSOFÍA MIDUDEV: Máximo impacto, mínimo código
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { SOUNDS } from '@/constants/onboarding';
import { FlowConfig, interpolateText } from '@/types/onboarding';
import { Dumbbell, Info, MapPin, Target, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface NeuroFlowProps {
    isOpen: boolean;
    currentStep: number;
    userName?: string;
    prediction: string;
    config: FlowConfig;
    onPrediction: (pred: string) => void;
    onComplete: () => void;
    onClose: () => void;
    onNext: () => void;
}

const NeuroFlow = (props: NeuroFlowProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playSound = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(SOUNDS.HAPPY);
            audioRef.current.volume = 0.2;
        }
        audioRef.current.play().catch(() => null);
    };

    // Estado mínimo
    const [showWelcomeReward, setShowWelcomeReward] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // 🎉 WELCOME EFFECT
    useEffect(() => {
        if (props.isOpen && props.currentStep === 0) {
            setTimeout(() => {
                setShowWelcomeReward(true);
                playSound();
                toast.success("🎉 ¡Bienvenido a GymShock!", {
                    description: `Atleta #${props.config.stats.userCount.toLocaleString()} registrado`,
                    duration: 3000,
                });
            }, 1500);
        }
    }, [props.isOpen, props.currentStep]);

    // 🎯 HANDLERS
    const handlePredictionClick = async (value: string) => {
        setIsProcessing(true);
        props.onPrediction(value);

        playSound();
        toast.success(" ¡Muy Bien!", {
            description: "Tu perfil fitness está tomando forma...",
            duration: 2500,
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        setIsProcessing(false);
        props.onNext();
    };

    const handleCompletion = () => {
        
        setTimeout(props.onComplete, 1200);
    };

    // 🎨 HELPERS
    const getIcon = (iconName: string, size = 24) => {
        const icons = { trophy: Trophy, target: Target, clock: Dumbbell };
        const Icon = icons[iconName as keyof typeof icons] || Trophy;
        return <Icon size={size} className="text-white" />;
    };

    const interpolate = (template: string) => interpolateText(template, {
        name: props.userName || 'usuario',
        userCount: props.config.stats.userCount.toLocaleString(),
        country: props.config.country.name,
        flag: props.config.country.flag,
        average: props.config.content.feedback.averageValue,
        recentActivity: props.config.stats.recentActivity
    });

    const step = props.config.steps[props.currentStep];
    if (!step) return null;

    // 📊 PROGRESS CON SHADCN UI REAL
    const progressValue = ((props.currentStep + 1) / props.config.steps.length) * 100;

    return (
        <Dialog open={props.isOpen} onOpenChange={props.onClose}>
            <DialogContent className="max-w-lg bg-white p-0 rounded-2xl border-0 shadow-2xl overflow-hidden">

                <DialogTitle className="sr-only">
                    {step.type === 'welcome' ? 'Bienvenido a GymShock' :
                        step.type === 'prediction' ? 'Evaluación Fitness' :
                            'Crear Plan Personalizado'}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    {step.type === 'welcome' ? 'Proceso de onboarding paso a paso' :
                        step.type === 'prediction' ? 'Responde algunas preguntas para personalizar tu experiencia' :
                            'Completa el proceso para generar tu plan de entrenamiento'}
                </DialogDescription>

                <div className="p-4">
                    <Progress
                        value={progressValue}
                        className="h-2 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-gymshock-primary-600 [&>div]:to-gymshock-energy-500"
                        aria-label={`Paso ${props.currentStep + 1} de ${props.config.steps.length}`}
                    />

                </div>

                {/* 📱 STEP CONTENT */}
                <div className="p-6">
                    {step.type === 'welcome' && (
                        <div className="text-center space-y-6">
                            <div className="relative">
                                <div className={`w-20 h-20 bg-gradient-to-r from-gymshock-primary-600 to-gymshock-energy-500 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${showWelcomeReward ? 'scale-110 animate-pulse' : 'scale-100'
                                    }`}>
                                    {getIcon(props.config.content.welcome.icon, 32)}
                                </div>
                                {showWelcomeReward && (
                                    <div className="absolute -top-2 -right-2 bg-gymshock-energy-400 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                                        +1 🎉
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gymshock-primary-600 to-gymshock-energy-500 bg-clip-text text-transparent">
                                    {interpolate(props.config.content.welcome.greeting)}
                                </h2>

                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gymshock-warning-100 to-gymshock-energy-100 px-6 py-3 rounded-full border border-gymshock-energy-200">
                                    <Trophy size={20} className="text-gymshock-energy-600" />
                                    <span className="font-semibold text-gymshock-dark-800">
                                        {interpolate(props.config.content.welcome.subtitle)}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gymshock-dark-50 p-4 rounded-xl border border-gymshock-dark-200">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Info size={16} className="text-gymshock-primary-600" />
                                    <span className="text-sm font-medium text-gymshock-dark-700">
                                        Prepárate para conocer las últimas novedades, genera plan de entrenamiento y descubre más de +1,300 ejercicios disponibles
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="bg-gradient-to-r from-gymshock-primary-600 to-gymshock-energy-500 hover:from-gymshock-primary-700 hover:to-gymshock-energy-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                    props.onNext();
                                }}
                                aria-label="Continuar al siguiente paso"
                            >
                                <MapPin size={20} className="mr-3" />
                                {interpolate(props.config.content.welcome.locationInfo)}
                            </Button>
                        </div>
                    )}

                    {step.type === 'prediction' && (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-gymshock-social-blue to-gymshock-success-500 rounded-full flex items-center justify-center mx-auto">
                                {getIcon(props.config.content.prediction.icon)}
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-gymshock-dark-900">{props.config.content.prediction.title}</h3>
                                <p className="text-lg text-gymshock-dark-700">{props.config.content.prediction.question}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                                {props.config.content.prediction.options.map((option: number) => (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        disabled={isProcessing}
                                        className="hover:bg-gymshock-social-blue hover:text-white hover:border-gymshock-social-blue transition-all duration-200 py-4 font-bold text-lg border-2 hover:scale-105"
                                        onClick={() => handlePredictionClick(option.toString())}
                                        aria-label={`Seleccionar ${option} repeticiones`}
                                    >
                                        {isProcessing ? (
                                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                                        ) : (
                                            option
                                        )}
                                    </Button>
                                ))}
                            </div>

                            <div className="max-w-xs mx-auto">
                                <input
                                    type="number"
                                    placeholder={props.config.content.prediction.placeholder}
                                    disabled={isProcessing}
                                    className="w-24 px-4 py-3 border-2 border-gymshock-dark-300 rounded-xl text-center focus:border-gymshock-social-blue focus:ring-4 focus:ring-gymshock-social-blue/20 transition-all font-semibold text-lg"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.currentTarget.value && !isProcessing) {
                                            handlePredictionClick(e.currentTarget.value);
                                        }
                                    }}
                                    aria-label="Ingresar número de repeticiones"
                                />
                            </div>

                            <div className="bg-gymshock-warning-50 p-3 rounded-xl border border-gymshock-warning-200">
                                <p className="text-sm text-gymshock-dark-600">
                                    💡 {interpolate(props.config.content.prediction.hint)}
                                </p>
                            </div>
                        </div>
                    )}

                    {step.type === 'urgency' && (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-gymshock-success-500 to-gymshock-success-600 rounded-full flex items-center justify-center mx-auto">
                                {getIcon(props.config.content.urgency.icon)}
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-gymshock-success-600">{props.config.content.urgency.title}</h3>
                                <p className="text-gymshock-dark-600">{props.config.content.urgency.subtitle}</p>
                            </div>

                            <Button
                                variant="gymshock"
                                onClick={handleCompletion}
                                aria-label="Crear mi programa personalizado"
                            >
                                {props.config.content.urgency.ctaText}
                            </Button>

                            <div className="text-sm text-gymshock-dark-500 bg-gymshock-dark-50 p-2 rounded-lg">
                                📋 4 preguntas rápidas • 2 minutos • 100% personalizado
                            </div>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default NeuroFlow;