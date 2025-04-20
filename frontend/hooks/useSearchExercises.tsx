// hooks/useSearchExercises.ts
import { Exercise } from '@/types/exercise';
import { getBodyPartList, searchExercises } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

const DEBOUNCE_DELAY = 300;
const SUGGESTIONS_LIMIT = 5;

export function useSearchExercises(
    setParentExercises: (exercises: Exercise[]) => void,
    setParentBodyPart: (bodyPart: string) => void
) {
    const [searchTerm, setSearchTerm] = useState('');
    const [bodyParts, setBodyParts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<Exercise[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    const handleSuggestionSelect = (exercise: Exercise) => {
        setParentExercises([exercise]);
        setSearchTerm(exercise.name);
        setShowSuggestions(false);
    }

    // Cargar categorías de partes del cuerpo
    useEffect(() => {
        const loadBodyParts = async () => {
            try {
                const data = await getBodyPartList();
                setBodyParts(['all', ...data]);
            } catch (error) {
                setError('Error loading muscle groups');
                console.error('Body parts load error:', error);
            }
        };
        loadBodyParts();
    }, []);

    // Búsqueda con debounce para sugerencias
    useEffect(() => {
        if (searchTerm.length < 2) {
            setSuggestions([]);
            return;
        }

        const debounceSearch = setTimeout(async () => {
            try {
                const results = await searchExercises(searchTerm);
                setSuggestions(results.slice(0, SUGGESTIONS_LIMIT));
                setShowSuggestions(true);
            } catch (error) {
                console.error('Search error:', error);
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(debounceSearch);
    }, [searchTerm]);

    // Resetear índice al cambiar término
    useEffect(() => {
        setActiveSuggestionIndex(-1);
    }, [searchTerm]);

    const handleKeyNavigation = (e: React.KeyboardEvent) => {
        if (suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveSuggestionIndex(prev =>
                    Math.min(prev + 1, suggestions.length - 1)
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestionIndex(prev => Math.max(prev - 1, -1));
                break;
            case 'Enter':
                if (activeSuggestionIndex >= 0) {
                    handleSuggestionSelect(suggestions[activeSuggestionIndex]);
                }
                break;
        }
    };

    // Manejar búsqueda completa
    const executeSearch = async () => {
        if (!searchTerm.trim()) return;

        try {
            setIsLoading(true);
            setError(null);
            setShowSuggestions(false);

            const results = await searchExercises(searchTerm);
            setParentExercises(results);
            setSearchTerm('');
        } catch (error) {
            setError('Error searching exercises');
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        searchTerm,
        bodyParts,
        isLoading,
        error,
        suggestions,
        showSuggestions,
        activeSuggestionIndex,
        setSearchTerm,
        executeSearch,
        handleKeyNavigation,
        handleSuggestionSelect,
        handleBodyPartSelect: (part: string) => {
            setParentBodyPart(part);
            window.scrollTo({ top: 1800, behavior: 'smooth' });
        },
        dismissSuggestions: () => setShowSuggestions(false),

    };
}