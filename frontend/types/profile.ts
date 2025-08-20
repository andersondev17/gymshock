export interface ProfileStats {
    totalWorkouts: number;
    currentStreak: number;
    totalHours: number;
    memberSince: string;
    weeklyProgress: {
        completed: number;
        planned: number;
    };
}
export const GOAL_CONFIGS = {
    muscle_gain: { label: 'Muscle Gain', color: 'bg-purple-100 text-purple-700', icon: '💪' },
    strength: { label: 'Strength', color: 'bg-orange-100 text-orange-700', icon: '🏋️' },
    endurance: { label: 'Endurance', color: 'bg-blue-100 text-blue-700', icon: '🏃' },
    weight_loss: { label: 'Weight Loss', color: 'bg-green-100 text-green-700', icon: '📉' }
} as const;

export const ROLE_CONFIGS = {
    admin: { label: 'Admin', color: 'bg-red-500', icon: '👑' },
    trainer: { label: 'Trainer', color: 'bg-blue-500', icon: '🎯' },
    user: { label: 'Enthusiast', color: 'bg-green-500', icon: '🔥' }
} as const;

export interface FitnessProfile {
    id: string;
    level: string;
    goals: string[];
    timeAvailable: string;
    frequency: string;
    evaluationDate: string;
    hasActiveProgram?: boolean;
    stats?: ProfileStats;
    daysSinceEvaluation?: number;
}
export interface SaveProfileResponse {
    profile: FitnessProfile;
    program: WorkoutProgram;
}
export interface WorkoutExercise {
    exerciseId: string;
    name: string;
    sets: number;
    reps: string;
    rest: string;
    gifUrl?: string;
}

export interface WorkoutDay {
    day: string;
    name: string;
    focus: string[];
    exercises: WorkoutExercise[];
    estimatedDuration: number;
}

export interface WorkoutProgram {
    id: string;
    name: string;
    description: string;
    type: string;
    workoutDays: WorkoutDay[];
    progress?: {
        percentage: number;
        weeksCompleted: number;
        completedCount: number;
        totalWorkouts: number;
    };
    nextWorkout?: WorkoutDay;
}

export interface ProfileData {
    level: string;
    goals: string[];
    timeAvailable: string;
    frequency: string;
}
