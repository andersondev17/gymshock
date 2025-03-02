'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Exercise, SearchExercisesProps } from '@/types/exercise';
import { exerciseOptions, fetchData } from '@/utils/fetchData';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import BlurFadeText from './magicui/blur-fade-text';

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart
}) => {
  // Estado
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>(['all']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar categorías de partes del cuerpo al iniciar
  useEffect(() => {
    const fetchBodyPartsData = async () => {
      try {
        const bodyPartsData = await fetchData<string[]>(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        );
        
        if (bodyPartsData?.length) {
          setBodyParts(['all', ...bodyPartsData]);
        }
      } catch (err) {
        setError('Failed to load body parts');
        console.error('Error fetching body parts:', err);
      }
    };

    fetchBodyPartsData();
  }, []);

  // Manejar búsqueda de ejercicios
  const handleSearch = async () => {
    if (!search.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const exercisesData = await fetchData<Exercise[]>(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );

      const searchTerm = search.toLowerCase();
      
      const searchedExercises = exercisesData.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.target.toLowerCase().includes(searchTerm) ||
        exercise.equipment.toLowerCase().includes(searchTerm) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm)
      );

      setSearch('');
      setExercises(searchedExercises);
    } catch (err) {
      setError('Failed to search exercises');
      console.error('Error searching exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar tecla Enter para búsqueda
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Seleccionar categoría de parte del cuerpo
  const handleBodyPartSelect = (part: string) => {
    setBodyPart(part);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col items-center mt-9 justify-center px-4 md:px-0">
      {/* Título */}
      <BlurFadeText 
        delay={0.3} 
        yOffset={8}
        className="animated-title text-3xl sm:text-5xl xl:text-6xl pb-5"
        text="Awesome Exercises" 
      />

      {/* Mensaje de error */}
      {error && (
        <Alert variant="destructive" className="mb-4 max-w-md mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Barra de búsqueda */}
      <div className="relative mb-16 w-full max-w-4xl">
        <Input
          type="text"
          className="h-16 md:h-[76px] pl-6 w-full bg-white rounded-[40px] font-medium text-base border-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Exercises, Muscle Groups..."
          disabled={isLoading}
        />
        <Button
          className="search-btn absolute right-2 top-1/2 -translate-y-1/2 h-12 md:h-[56px] w-[80px] md:w-[173px] bg-[#FF2625] text-white"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span className="hidden md:inline">Searching...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search size={18} />
              <span className="hidden md:inline">Search</span>
            </span>
          )}
        </Button>
      </div>

      {/* Categorías de partes del cuerpo */}
      <div className="relative w-full max-w-6xl">
        <ScrollArea className="w-full bodyPart-scrollbar">
          <div className="flex space-x-4 p-4">
            {bodyParts.map((part) => (
              <Button
                key={part}
                variant={part === bodyPart ? "default" : "outline"}
                className={`px-6 py-8 capitalize transition-all ${
                  part === bodyPart 
                    ? "bg-red-600 hover:bg-red-700 text-white bodyPart-card--active" 
                    : "bodyPart-card hover:border-red-400"
                }`}
                onClick={() => handleBodyPartSelect(part)}
                disabled={isLoading}
              >
                {part}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default SearchExercises;