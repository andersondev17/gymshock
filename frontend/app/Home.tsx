'use client';

import Exercises from '@/components/Excercises';
import HeroBanner from '@/components/HeroBanner';
import SearchExercises from '@/components/SearchExcercises';
import { Exercise } from '@/types/exercise';
import { useState } from 'react';

const Home: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyPart, setBodyPart] = useState<string>('all');

  return (
    <main className="min-h-screen">
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
      />
    </main>
  );
};

export default Home;