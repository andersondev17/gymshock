// components/Exercises.tsx
import { useSearchExercises } from '@/hooks/useSearchExercises';
import type { ExercisesProps } from '@/types/exercise';
import { getExercises, getExercisesByBodyPart } from '@/utils/fetchData';
import { useEffect, useMemo, useState } from 'react';
import { ExerciseCard, PaginationControls } from '../ui';

const Exercises = ({ exercises, setExercises, bodyPart }: ExercisesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { highlightResults } = useSearchExercises(setExercises, () => {});

  // Configuration
  const exercisesPerPage = 6;
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  // Fetch exercises when bodyPart changes
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setCurrentPage(1); // Reset to page 1 when changing filters

      try {
        const data = bodyPart === 'all'
          ? await getExercises()
          : await getExercisesByBodyPart(bodyPart);

        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart, setExercises]);

  // Calculate current page exercises
  const currentExercises = useMemo(() =>
    exercises.slice(
      (currentPage - 1) * exercisesPerPage,
      currentPage * exercisesPerPage
    ),
    [exercises, currentPage, exercisesPerPage]);

  // Handle page change with smooth scroll
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Smooth scroll to exercises list
    const exercisesSection = document.getElementById('exercises-list');
    if (exercisesSection) {
      exercisesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gymshock-primary-500" />
      </div>
    );
  }

  // Empty state
  if (!exercises.length) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-white">No exercises found 😔</p>
        <p className="text-sm text-gymshock-dark-300 mt-2">Try a different body part or search term</p>
      </div>
    );
  }

  return (
    <div 
      id="exercises-list" 
      className={`max-w-7xl mx-auto px-4 py-12 transition-all duration-500 ${
        highlightResults ? 'bg-gymshock-primary-600/10 backdrop-blur-sm rounded-xl' : ''
      }`}
    >
      {/* Header section */}
      <div className={`mb-10 transition-all duration-300 ${
        highlightResults ? 'bg-gymshock-primary-600/20 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-gymshock-primary-600/30' : ''
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              Showing Results
              {bodyPart !== 'all' && (
                <span className="ml-2 bg-gymshock-primary-600/20 text-gymshock-primary-400 px-3 py-1 rounded-full text-lg font-medium border border-gymshock-primary-600/30">
                  {bodyPart}
                </span>
              )}
            </h2>
            <p className="text-gymshock-dark-300">Discover {exercises.length} exercises to enhance your fitness journey</p>
          </div>
        </div>
        <div className="mt-6 h-1 bg-gymshock-dark-700/50 rounded-full w-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 rounded-full transition-all duration-500 shadow-lg shadow-gymshock-primary-500/20"
            style={{ width: `${(exercises.length / 1300) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Exercises grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 ${
        highlightResults ? 'scale-[1.01] transform transition-transform duration-300' : ''
      }`}>
        {currentExercises.map((exercise) => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
          />
        ))}
      </div>

      {/* Pagination */}
      {exercises.length > exercisesPerPage && (
        <div className="mt-10">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Exercises;