// types/exercise.ts

export interface Exercise {
    id: string;
    name: string;
    target: string;
    equipment: string;
    bodyPart: string;
    gifUrl: string;
    exercises: Exercise[];
}
export interface SearchExercisesProps {
    setExercises: (exercises: Exercise[]) => void;
    bodyPart: string;
    setBodyPart: (part: string) => void;
}

export interface HorizontalScrollbarProps {
    data: string[];
    bodyParts: boolean;
    setBodyPart: (part: string) => void;
    bodyPart: string;
}

export interface APIOptions {
    method: 'GET';
    headers: {
        'X-RapidAPI-Host': string;
        'X-RapidAPI-Key': string;
    };
}

export interface Exercise {
    id: string;
    name: string;
    target: string;
    equipment: string;
    bodyPart: string;
    gifUrl: string;
}

export interface ExercisesProps {
    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;
    bodyPart: string;
}

export interface ExerciseCardProps {
    exercise: Exercise;
}