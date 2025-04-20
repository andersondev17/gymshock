'use client';

import Exercises from '@/components/exercises/Excercises';
import SearchExercises from '@/components/exercises/SearchExcercises';
import HeroBanner from '@/components/home/HeroBanner';
import { Exercise } from '@/types/exercise';
import { useState } from 'react';

export default function HomePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyPart, setBodyPart] = useState<string>('all');

  return (
    <div  >
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-screen overflow-x-hidden">
        <HeroBanner />
      </section>

      {/* Exercises Section */}
      <section id="exercises" className="py-16 px-4 sm:px-6 lg:px-8">
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
}