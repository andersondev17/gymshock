'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Exercise, SearchExercisesProps } from '@/types/exercise';
import { fetchData } from '@/utils/fetchData';
import React, { useEffect, useState } from 'react';

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart
}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData<string[]>(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList'
        );
        setBodyParts(['all', ...bodyPartsData]);
      } catch (error) {
        console.error('Error fetching body parts:', error);
        setBodyParts(['all']); // Fallback
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        const exercisesData = await fetchData<Exercise[]>(
          'https://exercisedb.p.rapidapi.com/exercises'
        );

        const searchedExercises = exercisesData.filter(
          (exercise) => {
            const searchTerm = search.toLowerCase();
            return (
              exercise.name.toLowerCase().includes(searchTerm) ||
              exercise.target.toLowerCase().includes(searchTerm) ||
              exercise.equipment.toLowerCase().includes(searchTerm) ||
              exercise.bodyPart.toLowerCase().includes(searchTerm)
            );
          }
        );

        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
        setSearch('');
        setExercises(searchedExercises);
      } catch (error) {
        console.error('Error searching exercises:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-[37px] justify-center p-5">
      <h2 className="font-bold text-[30px] lg:text-[44px] mb-[49px] text-center">
        Awesome Exercises You <br /> Should Know
      </h2>

      <div className="relative mb-[72px]">
        <Input
          type="text"
          className="h-[76px] w-[350px] lg:w-[1170px] bg-white rounded-[40px] font-bold border-none"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
        />
        <Button
          className="search-btn absolute right-0 h-[56px] w-[80px] lg:w-[173px] bg-[#FF2625] hover:bg-[#FF2625]/90 text-white normal-case text-[14px] lg:text-[20px]"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className="relative w-full p-5">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 p-4">
            {bodyParts.map((part) => (
              <Button
                key={part}
                variant={part === bodyPart ? "default" : "outline"}
                className={`px-6 py-8 capitalize ${part === bodyPart ? "bg-red-600 hover:bg-red-700" : ""
                  }`}
                onClick={() => setBodyPart(part)}
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