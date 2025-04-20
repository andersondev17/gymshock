// components/SearchExercises.tsx
'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSearchExercises } from '@/hooks/useSearchExercises';
import { SearchExercisesProps } from '@/types/exercise';
import { Search } from 'lucide-react';
import React from 'react';
import BlurFadeText from '../magicui/blur-fade-text';

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart
}) => {
  const { searchTerm, bodyParts, isLoading, error, suggestions, showSuggestions, activeSuggestionIndex, setSearchTerm, executeSearch, handleSuggestionSelect, handleBodyPartSelect, dismissSuggestions,    handleKeyNavigation  } = useSearchExercises(setExercises, setBodyPart);

  const handleKeyEvents = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') executeSearch();
    if (e.key === 'Escape') dismissSuggestions();
    handleKeyNavigation(e);
  };

  return (
    <section className="flex flex-col items-center mt-9 justify-center px-4 md:px-0">
      <BlurFadeText
        delay={0.3}
        yOffset={8}
        className="animated-title text-3xl sm:text-5xl xl:text-6xl pb-5"
        text="Awesome Exercises"
        aria-label="Main Title"
      />

      {error && (
        <Alert role="alert" variant="destructive" className="mb-4 max-w-md mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-16 w-full max-w-4xl">
        <Input
          type="text"
          role="searchbox"
          aria-label="Search exercises"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          className="h-16 md:h-[76px] pl-6 w-full bg-white rounded-[40px] font-medium text-base border-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyEvents}
          placeholder="Search Exercises, Muscle Groups..."
          disabled={isLoading}
        />

        <Button
          aria-label={isLoading ? 'Searching exercises' : 'Search exercises'}
          className="search-btn absolute right-2 top-1/2 -translate-y-1/2 h-12 md:h-[56px] w-[80px] md:w-[173px] bg-[#FF2625] text-white"
          onClick={executeSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              <span className="hidden md:inline">Searching...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search size={18} aria-hidden="true" />
              <span className="hidden md:inline">Search</span>
            </span>
          )}
        </Button>

        {showSuggestions && suggestions.length > 0 && (
          <div
            id="suggestions-list"
            role="listbox"
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((exercise, index) => (
              <div
                key={exercise.id}
                role="option"
                aria-selected={index === activeSuggestionIndex}
                className={`px-4 py-2 cursor-pointer ${index === activeSuggestionIndex
                  ? 'bg-red-50'
                  : 'hover:bg-gray-50'
                  }`}
                ref={node => {
                  if (node && index === activeSuggestionIndex) {
                    node.scrollIntoView({ block: 'nearest' });
                  }
                }}
                onClick={() => handleSuggestionSelect(exercise)}
                onKeyDown={(e) => e.key === 'Enter' && handleSuggestionSelect(exercise)}
                tabIndex={0}
              >
                <div className="font-medium">{exercise.name}</div>
                <div className="text-sm text-gray-500">
                  <span className="capitalize">{exercise.bodyPart}</span> • {exercise.equipment}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full max-w-6xl">
        <ScrollArea className="w-full bodyPart-scrollbar">
          <nav aria-label="Muscle groups navigation">
            <div className="flex space-x-4 p-4">
              {bodyParts.map((part) => (
                <Button
                  key={part}
                  aria-pressed={part === bodyPart}
                  variant={part === bodyPart ? "default" : "outline"}
                  className={`px-6 py-8 capitalize transition-all ${part === bodyPart
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "hover:border-red-400"
                    }`}
                  onClick={() => handleBodyPartSelect(part)}
                  disabled={isLoading}
                >
                  {part}
                </Button>
              ))}
            </div>
          </nav>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default SearchExercises;