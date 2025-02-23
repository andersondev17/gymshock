'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Exercise, SearchExercisesProps } from '@/types/exercise';
import { exerciseOptions, fetchData } from '@/utils/fetchData';
import React, { useEffect, useState } from 'react';

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart
}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>(['all']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      try {
        const bodyPartsData = await fetchData<string[]>(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        );
        setBodyParts(['all', ...bodyPartsData]);
      } catch (err) {
        setError('Failed to load body parts');
        console.error('Error fetching body parts:', err);
      }
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        setIsLoading(true);
        setError(null);
        
        const exercisesData = await fetchData<Exercise[]>(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );

        const searchedExercises = exercisesData.filter(
          (exercise: Exercise) => 
            exercise.name.toLowerCase().includes(search.toLowerCase()) ||
            exercise.target.toLowerCase().includes(search.toLowerCase()) ||
            exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
            exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
        );

        setSearch('');
        setExercises(searchedExercises);
      } catch (err) {
        setError('Failed to search exercises');
        console.error('Error searching exercises:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-[37px] justify-center p-5">
      <h2 className="font-bold text-[30px] lg:text-[44px] mb-[49px] text-center">
        Awesome Exercises You <br /> Should Know
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-[72px]">
        <Input
          type="text"
          className="h-[76px] w-[350px] lg:w-[1170px] bg-white rounded-[40px] font-bold border-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          disabled={isLoading}
        />
        <Button 
          className="search-btn absolute right-0 h-[56px] w-[80px] lg:w-[173px] bg-[#FF2625] hover:bg-[#FF2625]/90 text-white normal-case text-[14px] lg:text-[20px]"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      <div className="relative w-full p-5">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 p-4">
            {bodyParts.map((part) => (
              <Button
                key={part}
                variant={part === bodyPart ? "default" : "outline"}
                className={`px-6 py-8 capitalize ${
                  part === bodyPart ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={() => {
                  setBodyPart(part);
                  window.scrollTo({ top: 1800,left: 100, behavior: 'smooth' });
                }
                }
                disabled={isLoading}
              >
                {part}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchExercises;