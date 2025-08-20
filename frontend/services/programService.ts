import { FitnessProfile, ProfileData, ProfileStats, SaveProfileResponse, WorkoutDay, WorkoutProgram } from '@/types/profile';
import { fetchData } from '@/utils/fetchData';



class ProgramService {
    private readonly endpoint = '/programs';

    async getProfile(): Promise<FitnessProfile | null> {
        try {
            const response = await fetchData<FitnessProfile>(`${this.endpoint}/profile`);
            return response;
        } catch {
            return null;
        }
    }
    async getProfileStats(): Promise<ProfileStats> {
        try {
            const response = await fetchData<ProfileStats>('/programs/stats');
            return response;
        } catch (error) {
            console.error('Error fetching profile stats:', error);
            throw error;
        }
    }

    async saveProfile(data: ProfileData): Promise<SaveProfileResponse> {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}${this.endpoint}/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (!result.success) throw new Error(result.message);

        if (result.data.nextStep === 'generate') {
            // Auto-generar programa después de crear perfil
            const program = await this.generateProgram();
            return {
                profile: result.data.profile,
                program
            };
        }

        return result.data;
    }

    async getActiveProgram(): Promise<WorkoutProgram | null> {
        try {
            const response = await fetchData<WorkoutProgram>(`${this.endpoint}/active`);
            return response;
        } catch {
            return null;
        }
    }

    async generateProgram(): Promise<WorkoutProgram> {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${API_URL}${this.endpoint}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        return result.data;
    }

    async completeWorkout(workoutDay: string, duration: number, notes?: string): Promise<{
        progress: WorkoutProgram['progress'];
        nextWorkout: WorkoutDay;
    }> {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${API_URL}${this.endpoint}/workout/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ workoutDay, duration, notes })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        return result.data;
    }
}

export type { ProfileData };
export const programService = new ProgramService();