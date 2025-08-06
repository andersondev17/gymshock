'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgramActions } from '@/hooks/useProgramActions';
import { Calendar, CheckCircle, Clock, Dumbbell, RefreshCw, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyProgramPage() {
    const {
        program,
        hasProgram,
        requiresAuth,
        isLoading,
        renewEvaluation,
        loadProfile,
        loadActiveProgram
    } = useProgramActions();
    
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && requiresAuth) {
            router.push('/login?redirect=/programs/my-program');
            return;
        }
        
        if (!requiresAuth) {
            loadProfile();
        }
    }, [requiresAuth, isLoading, router, loadProfile]);

    useEffect(() => {
        if (hasProgram) {
            loadActiveProgram();
        }
    }, [hasProgram, loadActiveProgram]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!hasProgram || !program) {
        return <NoProgramScreen />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <ProgramHeader 
                    program={program} 
                    onRenewEvaluation={renewEvaluation} 
                />
                
                {program.progress && (
                    <ProgressCard progress={program.progress} />
                )}

                {program.nextWorkout && (
                    <NextWorkoutCard workout={program.nextWorkout} />
                )}

                <WeeklyScheduleCard />
            </div>
        </div>
    );
}

// Componentes especializados (SRP)
function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
        </div>
    );
}

function NoProgramScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardContent className="text-center py-12">
                    <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">No tienes un programa activo</h2>
                    <p className="text-gray-600 mb-6">
                        Completa la evaluación para generar tu programa personalizado
                    </p>
                    <Link href="/programs">
                        <Button className="bg-red-600 hover:bg-red-700">
                            Iniciar Evaluación
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

interface ProgramHeaderProps {
    program: { name: string; description: string };
    onRenewEvaluation: () => void;
}

function ProgramHeader({ program, onRenewEvaluation }: ProgramHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {program.name}
                    </h1>
                    <p className="text-gray-600">{program.description}</p>
                </div>
                <Button
                    variant="outline"
                    onClick={onRenewEvaluation}
                    className="gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Renovar Evaluación
                </Button>
            </div>
        </div>
    );
}

interface ProgressCardProps {
    progress: {
        percentage: number;
        completedCount: number;
        totalWorkouts: number;
    };
}

function ProgressCard({ progress }: ProgressCardProps) {
    return (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Progreso del programa
                </span>
                <span className="text-sm text-gray-500">
                    {progress.percentage}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                {progress.completedCount} de {progress.totalWorkouts} entrenamientos completados
            </p>
        </div>
    );
}

interface NextWorkoutCardProps {
    workout: {
        name: string;
        exercises: Array<{
            name: string;
            sets: number;
            reps: string;
            rest: string;
        }>;
        estimatedDuration: number;
    };
}

function NextWorkoutCard({ workout }: NextWorkoutCardProps) {
    return (
        <Card className="mb-8 border-red-200">
            <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-600" />
                    Próximo Entrenamiento: {workout.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid gap-4">
                    {workout.exercises.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} />
                    ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        Duración estimada: {workout.estimatedDuration} min
                    </span>
                    <Button className="bg-red-600 hover:bg-red-700">
                        Empezar Entrenamiento
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

interface ExerciseCardProps {
    exercise: {
        name: string;
        sets: number;
        reps: string;
        rest: string;
    };
}

function ExerciseCard({ exercise }: ExerciseCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-red-600" />
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="font-medium">{exercise.name}</h4>
                <p className="text-sm text-gray-600">
                    {exercise.sets} series × {exercise.reps} reps
                </p>
            </div>
            <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                {exercise.rest} descanso
            </div>
        </div>
    );
}

function WeeklyScheduleCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Tu Semana de Entrenamiento
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => {
                        const isWorkoutDay = index < 5;
                        return (
                            <div
                                key={index}
                                className={`text-center p-4 rounded-lg ${
                                    isWorkoutDay
                                        ? 'bg-red-100 text-red-600 font-medium'
                                        : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                                <div className="text-xs mb-1">{day}</div>
                                {isWorkoutDay ? (
                                    <Dumbbell className="w-5 h-5 mx-auto" />
                                ) : (
                                    <CheckCircle className="w-5 h-5 mx-auto" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}