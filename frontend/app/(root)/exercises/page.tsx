'use client';

import Exercises from '@/components/exercises/Excercises';
import SearchExercises from '@/components/exercises/SearchExcercises';
import { Exercise } from '@/types/exercise';
import { useState } from 'react';

const page = () => {
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

export default page