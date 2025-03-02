import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type { ExercisesProps } from '@/types/exercise';
import { useEffect, useState } from 'react';
import ExerciseCard from './ui/ExerciseCard';


const Exercises = ({ exercises, setExercises, bodyPart }: ExercisesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const exercisesPerPage = 6;

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const url = bodyPart === 'all' 
          ? 'https://exercisedb.p.rapidapi.com/exercises'
          : `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

        const response = await fetch(url, {
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart, setExercises]);

  const currentExercises = exercises.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500" />
      </div>
    );
  }

  if (!currentExercises.length) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No exercises found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">
        Showing Results
        {bodyPart !== 'all' && (
          <span className="text-red-600 ml-2">
            for {bodyPart}
          </span>
        )}
      </h2>

      <p className="text-gray-600 mb-8">Found {exercises.length} exercises</p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentExercises.map((exercise,id ) => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
          />
        ))}
      </div>

      {exercises.length > exercisesPerPage && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              {[...Array(Math.ceil(exercises.length / exercisesPerPage))].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 1800, behavior: 'smooth' });
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Exercises;