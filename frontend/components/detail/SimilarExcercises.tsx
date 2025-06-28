'use client';

import { Exercise } from '@/types/exercise';
import { getSimilarExercises } from '@/utils/fetchData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ExerciseCard from '../ui/ExerciseCard';

interface SimilarExercisesProps {
  id: string;
}

const SimilarExercises = ({ id }: SimilarExercisesProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARDS_PER_VIEW = 3;
  const maxIndex = Math.max(0, exercises.length - CARDS_PER_VIEW);

  useEffect(() => {
    if (!id) return;

    getSimilarExercises(id)
      .then(data => {
        setExercises(data);
        setCurrentIndex(0);
      })
      .catch(() => setExercises([]))
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex(prev => {
      if (direction === 'next') return Math.min(prev + 1, maxIndex);
      return Math.max(prev - 1, 0);
    });
  }, [maxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (loading) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Exercises</h3>
        <div className="flex justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500" />
        </div>
      </div>
    );
  }

  if (!exercises.length) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Similar Exercises</h3>
        <p className="text-gray-600">No similar exercises found</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Similar Exercises</h3>
        
        {exercises.length > CARDS_PER_VIEW && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigate('next')}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises
          .slice(currentIndex, currentIndex + CARDS_PER_VIEW)
          .map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        }
      </div>
    </div>
  );
};

export default SimilarExercises;