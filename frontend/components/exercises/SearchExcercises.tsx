// components/SearchExercises.tsx
'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchExercises } from '@/hooks/useSearchExercises';
import { SearchExercisesProps } from '@/types/exercise';
import { Search } from 'lucide-react';
import React from 'react';
import BlurFadeText from '../magicui/blur-fade-text';

const SearchExercises: React.FC<SearchExercisesProps> = ({ setExercises, bodyPart, setBodyPart }) => {
  const { searchTerm, bodyParts, isLoading, error, suggestions, showSuggestions, activeSuggestionIndex, setSearchTerm, executeSearch, handleSuggestionSelect, handleBodyPartSelect, dismissSuggestions, handleKeyNavigation } = useSearchExercises(setExercises, setBodyPart);

  const handleKeyEvents = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') executeSearch();
    if (e.key === 'Escape') dismissSuggestions();
    handleKeyNavigation(e);
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-0 py-10">
      <BlurFadeText
        delay={0.3}
        yOffset={8}
        className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-4"
        text="Find Your Exercise"
      />

      <p className="text-gymshock-dark-300 text-center max-w-2xl mb-10">
        Discover over 1,300 exercises tailored to your fitness goals. Search by name, muscle group, or equipment.
      </p>

      {error && (
        <Alert role="alert" variant="destructive" className="mb-4 max-w-md mx-auto bg-red-950/20 border-red-800/30 text-red-200 backdrop-blur-sm">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-16 w-full max-w-4xl">
        <div className="absolute inset-0 -z-10 bg-gymshock-dark-700/20 rounded-[40px] blur-xl opacity-50 transform scale-105"></div>

        <div className="relative">
          <div className="relative bg-gymshock-dark-800/90 backdrop-blur-xl rounded-[40px] shadow-lg overflow-hidden border border-gymshock-dark-700/50" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.15)' }}>
            <div className="relative">
              <Input
                type="text"
                role="searchbox"
                aria-label="Search exercises"
                aria-autocomplete="list"
                aria-controls="suggestions-list"
                className="h-16 md:h-[76px] pl-14 w-full bg-transparent text-white placeholder:text-gymshock-dark-400 font-medium text-base md:text-lg border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyEvents}
                placeholder="Search exercises..."
                disabled={isLoading}
              />
            </div>

            {/* Categories section */}
            <div className="pt-1 pb-5 px-4 md:px-6 overflow-x-auto border-t border-gymshock-dark-700/30">
              <nav aria-label="Muscle groups navigation" className="flex space-x-2 md:space-x-3 min-w-max">
                {bodyParts.map((part) => (
                  <Button
                    key={part}
                    aria-pressed={part === bodyPart}
                    variant="ghost"
                    className={`px-3 md:px-4 py-1.5 capitalize text-xs md:text-sm rounded-full transition-all ${part === bodyPart
                      ? "bg-gymshock-primary-600 text-white font-medium hover:bg-gymshock-primary-700 shadow-lg shadow-gymshock-primary-600/20"
                      : "text-gymshock-dark-300 hover:bg-gymshock-dark-700/50 hover:text-white"
                      }`}
                    onClick={() => handleBodyPartSelect(part)}
                    disabled={isLoading}
                  >
                    {part}
                  </Button>
                ))}
              </nav>
            </div>

            <Button
              aria-label={isLoading ? 'Searching exercises' : 'Search exercises'}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-10 md:h-12 w-10 md:w-12 bg-gymshock-primary-600 hover:bg-gymshock-primary-700 text-white rounded-full shadow-md hover:shadow-gymshock-primary-600/30 transition-all duration-300 flex items-center justify-center"
              onClick={executeSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search size={16} className="md:w-5 md:h-5" aria-hidden="true" />
              )}
            </Button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              id="suggestions-list"
              role="listbox"
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-gymshock-dark-800/95 backdrop-blur-xl rounded-xl shadow-xl max-h-60 overflow-y-auto border border-gymshock-dark-700/50"
            >
              {suggestions.map((exercise, index) => (
                <div
                  key={exercise.id}
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                  className={`px-4 md:px-5 py-2 md:py-3 cursor-pointer border-b border-gymshock-dark-700/30 last:border-none transition-colors duration-200 ${index === activeSuggestionIndex
                    ? 'bg-gymshock-primary-600/20 border-gymshock-primary-600/30'
                    : 'hover:bg-gymshock-dark-700/50'
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
                  <div className="font-medium text-sm md:text-base text-white">{exercise.name}</div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gymshock-dark-300 mt-1">
                    <span className="inline-block px-2 py-0.5 bg-gymshock-primary-600/20 text-gymshock-primary-400 rounded-full text-xs capitalize border border-gymshock-primary-600/30">{exercise.bodyPart}</span>
                    <span className="text-gymshock-dark-500">•</span>
                    <span className="capitalize">{exercise.equipment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchExercises;