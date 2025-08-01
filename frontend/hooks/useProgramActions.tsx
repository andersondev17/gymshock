// hooks/useProgramActions.ts - Solo acciones (SRP)
import { ProfileData, programService } from '@/services/programService';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useProgram } from './useProgram';

export function useProgramActions() {
    const state = useProgram();
    const router = useRouter();

    const loadProfile = useCallback(async () => {
        if (!state.user) return;

        state.setLoading(true);
        try {
            const profile = await programService.getProfile();
            state.setProfile(profile);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            state.setLoading(false);
        }
    }, [state]);

    const loadActiveProgram = useCallback(async () => {
        if (!state.user || !state.profile) return;

        state.setLoading(true);
        try {
            const program = await programService.getActiveProgram();
            state.setProgram(program);
        } catch (error) {
            console.error('Error loading program:', error);
        } finally {
            state.setLoading(false);
        }
    }, [state]);

    const saveProfile = useCallback(async (profileData: ProfileData): Promise<boolean> => {
        if (!state.user) {
            toast.error('Debes iniciar sesión para guardar tu programa');
            router.push('/login?redirect=/programs');
            return false;
        }

        state.setLoading(true);
        state.setError(null);

        try {
            const { profile, program } = await programService.saveProfile(profileData);
            state.setProfile(profile);
            state.setProgram(program);
            toast.success('¡Programa personalizado creado!');
            router.push('/programs/myprogram');
            return true;
        } catch (error: any) {
            const message = error.message || 'Error al guardar el perfil';
            state.setError(message);
            toast.error(message);
            return false;
        } finally {
            state.setLoading(false);
        }
    }, [state, router]);

    const generateProgram = useCallback(async (): Promise<boolean> => {
        if (!state.profile) {
            state.setError('Debes completar tu evaluación primero');
            return false;
        }

        state.setLoading(true);
        state.setError(null);

        try {
            const program = await programService.generateProgram();
            state.setProgram(program);
            toast.success('¡Programa generado exitosamente!');

            router.push('/programs/my-program');
            return true;
        } catch (error: any) {
            const message = error.message || 'Error al generar el programa';
            state.setError(message);
            toast.error(message);
            return false;
        } finally {
            state.setLoading(false);
        }
    }, [state, router]);

    const renewEvaluation = useCallback(() => {
        router.push('/programs');
    }, [router]);

    const completeWorkout = useCallback(async (
        workoutDay: string,
        duration: number,
        notes?: string
    ): Promise<boolean> => {
        if (!state.program) return false;

        state.setLoading(true);

        try {
            const result = await programService.completeWorkout(workoutDay, duration, notes);
            state.updateProgramProgress(result.progress, result.nextWorkout);
            toast.success('¡Entrenamiento completado! 💪');
            return true;
        } catch (error: any) {
            toast.error(error.message || 'Error al registrar entrenamiento');
            return false;
        } finally {
            state.setLoading(false);
        }
    }, [state]);

    return {
        ...state,
        loadProfile,
        loadActiveProgram,
        saveProfile,
        generateProgram,
        renewEvaluation,
        completeWorkout
    };
}