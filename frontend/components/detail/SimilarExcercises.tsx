'use client';

import { Exercise } from '@/types/exercise';
import { getSimilarExercises } from '@/utils/fetchData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ExerciseCard } from '../ui';

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
        <h3 className="text-2xl font-bold mb-6 text-gymshock-primary-50">Similar Exercises</h3>
        <div className="flex justify-center h-40 bg-gymshock-dark-50 rounded-2xl border border-gymshock-dark-200 items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gymshock-primary-600" />
        </div>
      </div>
    );
  }

  if (!exercises.length) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gymshock-dark-900">Similar Exercises</h3>
        <div className="bg-gymshock-dark-50 border border-gymshock-dark-200 p-8 rounded-2xl text-center">
          <p className="text-gymshock-dark-600 text-lg">No similar exercises found</p>
          <p className="text-gymshock-dark-500 text-sm mt-2">Try exploring other exercise categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gymshock-primary-50">
          Similar Exercises 
          <span className="text-gymshock-primary-500   ml-2">({exercises.length})</span>
        </h3>
        
        {exercises.length > CARDS_PER_VIEW && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border-2 border-gymshock-primary-200 hover:border-gymshock-primary-400 hover:bg-gymshock-primary-50 flex items-center justify-center disabled:opacity-50 disabled:hover:border-gymshock-primary-200 disabled:hover:bg-transparent transition-all duration-200 text-gymshock-primary-600"
              aria-label="Previous exercises"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigate('next')}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full border-2 border-gymshock-primary-200 hover:border-gymshock-primary-400 hover:bg-gymshock-primary-50 flex items-center justify-center disabled:opacity-50 disabled:hover:border-gymshock-primary-200 disabled:hover:bg-transparent transition-all duration-200 text-gymshock-primary-600"
              aria-label="Next exercises"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      {exercises.length > CARDS_PER_VIEW && (
        <div className="mb-4">
          <div className="flex justify-center gap-1">
            {Array.from({ length: Math.ceil(exercises.length / CARDS_PER_VIEW) }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / CARDS_PER_VIEW) === index
                    ? 'bg-gymshock-primary-600'
                    : 'bg-gymshock-dark-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

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