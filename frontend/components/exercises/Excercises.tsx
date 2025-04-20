// components/Exercises.tsx
import type { ExercisesProps } from '@/types/exercise';
import { getExercises, getExercisesByBodyPart } from '@/utils/fetchData';
import { useEffect, useMemo, useState } from 'react';
import ExerciseCard from '../ui/ExerciseCard';
import PaginationControls from '../ui/PaginationControls';

const Exercises = ({ exercises, setExercises, bodyPart }: ExercisesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  // Empty state
  if (!exercises.length) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No exercises found 😔</p>
        <p className="text-sm text-gray-500 mt-2">Try a different body part or search term</p>
      </div>
    );
  }

  return (
    <div id="exercises-list" className="max-w-7xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Showing Results
          {bodyPart !== 'all' && (
            <span className="text-red-600 ml-2">
              for {bodyPart}
            </span>
          )}
        </h2>
        <p className="text-gray-600 mt-2">Found {exercises.length} exercises</p>
      </div>

      {/* Exercises grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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