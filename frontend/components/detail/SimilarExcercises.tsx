'use client';

import { Exercise } from '@/types/exercise';
import { getSimilarExercises } from '@/utils/fetchData';
import { useEffect, useState } from 'react';
import ExerciseCard from '../ui/ExerciseCard';

interface SimilarExcercisesProps {
  id: string;
}

const SimilarExcercises = ({ id }: SimilarExcercisesProps) => {
  const [similarExercises, setSimilarExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarExercises = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getSimilarExercises(id);
        setSimilarExercises(data);
      } catch (err) {
        console.error('Error fetching similar exercises:', err);
        setError('Failed to load similar exercises');
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarExercises();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Exercises</h3>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500" />
        </div>
      </div>
    );
  }

  if (error || similarExercises.length === 0) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Exercises</h3>
        <p className="text-gray-600">
          {error || 'No similar exercises found'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6">Similar Exercises</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default SimilarExcercises;