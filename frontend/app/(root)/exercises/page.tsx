'use client';

import { ExerciseSkeleton } from '@/components/ui/ExerciseSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Exercise } from '@/types/exercise';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SearchExercises = dynamic(() => import('@/components/exercises/SearchExcercises'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
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
        <section className="py-16 px-4 sm:px-6 lg:px-8">

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

    )
}

export default Page