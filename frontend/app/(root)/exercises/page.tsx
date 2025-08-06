'use client';

import { ExerciseSkeleton } from '@/components/ui/ExerciseSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Exercise } from '@/types/exercise';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SearchExercises = dynamic(() => import('@/components/exercises/SearchExcercises'), {
    loading: () => <Skeleton className="h-[400px] w-full bg-gymshock-dark-700/20" />,
    ssr: false
});

const Exercises = dynamic(() => import('@/components/exercises/Excercises'), {
    loading: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(6).fill(0).map((_, i) => <ExerciseSkeleton key={i} />)}
    </div>
});
const Page = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [bodyPart, setBodyPart] = useState<string>('all');
    return (
        <div className="min-h-screen bg-gymshock-dark-900 relative">
            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] bg-cover bg-center opacity-40 pointer-events-none" /> 
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <SearchExercises
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                />

                <Exercises
                    exercises={exercises}
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                />
            </section>
        </div>
    );
};

export default Page;