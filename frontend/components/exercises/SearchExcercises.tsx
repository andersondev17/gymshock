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

const SearchExercises: React.FC<SearchExercisesProps> = ({
  setExercises,
  bodyPart,
  setBodyPart
}) => {
  const {
    searchTerm,
    bodyParts,
    isLoading,
    error,
    suggestions,
    showSuggestions,
    activeSuggestionIndex,
    setSearchTerm,
    executeSearch,
    handleSuggestionSelect,
    handleBodyPartSelect,
    dismissSuggestions,
    handleKeyNavigation
  } = useSearchExercises(setExercises, setBodyPart);

  const handleKeyEvents = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') executeSearch();
    if (e.key === 'Escape') dismissSuggestions();
    handleKeyNavigation(e);
  };

  const getPlaceholder = () => {
    // determina si estamos en un dispositivo móvil
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return "Search exercises...";
    }
    return "Search by exercise, muscle or equipment...";
  };

  const [placeholder, setPlaceholder] = React.useState(() => getPlaceholder());

  // actualiza placeholder cuando cambie el tamaño de la ventana
  React.useEffect(() => {
    const handleResize = () => {
      setPlaceholder(getPlaceholder());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-0 py-10">
      <BlurFadeText
        delay={0.3}
        yOffset={8}
        className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 text-center mb-4"
        text="Find Your Exercise"
      />

      <p className="text-gray-500 text-center max-w-2xl mb-10">
        Discover over 1,300 exercises tailored to your fitness goals. Search by name, muscle group, or equipment.
      </p>

      {error && (
        <Alert role="alert" variant="destructive" className="mb-4 max-w-md mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-16 w-full max-w-4xl">
        <div className="absolute inset-0 -z-10 bg-white rounded-[40px] blur-xl opacity-50 transform scale-105"></div>

        <div className="relative">
          <div className="relative bg-white rounded-[40px] shadow-lg overflow-hidden" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' }}>
            <div className="relative">
              <Input
                type="text"
                role="searchbox"
                aria-label="Search exercises"
                aria-autocomplete="list"
                aria-controls="suggestions-list"
                className="h-16 md:h-[76px] pl-14 w-full bg-white font-medium text-base md:text-lg border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none outline-none transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyEvents}
                placeholder={placeholder}
                disabled={isLoading}
              />
            </div>

            {/* Categories section - Fully integrated without visual separation */}
            <div className="pt-1 pb-5 px-4 md:px-6 overflow-x-auto border-t-0">
              <nav aria-label="Muscle groups navigation" className="flex space-x-2 md:space-x-3 min-w-max">
                {bodyParts.map((part) => (
                  <Button
                    key={part}
                    aria-pressed={part === bodyPart}
                    variant="ghost"
                    className={`px-3 md:px-4 py-1.5 capitalize text-xs md:text-sm rounded-full transition-all ${part === bodyPart
                        ? "bg-red-100 text-red-600 font-medium hover:bg-red-200"
                        : "text-gray-600 hover:bg-gray-100"
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
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-10 md:h-12 w-10 md:w-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center"
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
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl max-h-60 overflow-y-auto border border-gray-100"
            >
              {suggestions.map((exercise, index) => (
                <div
                  key={exercise.id}
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                  className={`px-4 md:px-5 py-2 md:py-3 cursor-pointer border-b border-gray-50 last:border-none transition-colors duration-200 ${index === activeSuggestionIndex
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
                  <div className="font-medium text-sm md:text-base text-gray-800">{exercise.name}</div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                    <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs capitalize">{exercise.bodyPart}</span>
                    <span className="text-gray-400">•</span>
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