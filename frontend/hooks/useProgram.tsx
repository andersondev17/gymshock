import { useAuth } from '@/context/AuthProvider';
import { FitnessProfile, WorkoutProgram } from '@/types/profile';
import { useCallback, useState } from 'react';

interface ProgramState {
    profile: FitnessProfile | null;
    program: WorkoutProgram | null;
    isLoading: boolean;
    error: string | null;
}

export function useProgram() {
    const { user } = useAuth();

    const [state, setState] = useState<ProgramState>({
        profile: null,
        program: null,
        isLoading: false,
        error: null
    });

    const setLoading = useCallback((loading: boolean) => {
        setState(prev => ({ ...prev, isLoading: loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    const setProfile = useCallback((profile: FitnessProfile | null) => {
        setState(prev => ({ ...prev, profile }));
    }, []);

    const setProgram = useCallback((program: WorkoutProgram | null) => {
        setState(prev => ({ ...prev, program }));
    }, []);

    const updateProgramProgress = useCallback((progress: WorkoutProgram['progress'], nextWorkout?: WorkoutProgram['nextWorkout']) => {
        setState(prev => prev.program ? {
            ...prev,
            program: { ...prev.program, progress, nextWorkout }
        } : prev);
    }, []);

    return {
        ...state,
        user,
        hasProfile: !!state.profile,
        hasProgram: !!state.program,
        requiresAuth: !user,
        setLoading,
        setError,
        setProfile,
        setProgram,
        updateProgramProgress
    };
}