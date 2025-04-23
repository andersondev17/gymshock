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
export interface ExerciseVideosProps {
    name: string;
}

export interface YoutubeVideo {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    viewCount: string;
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

export interface ExercisesProps {
    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;
    bodyPart: string;
}

export interface ExerciseCardProps {
    exercise: Exercise;
}

export interface ExerciseVideosProps {
    name: string;
    bodyPart?: string;  // Añadimos bodyPart como parámetro opcional
}


interface BenefitItem {
    text: string;
}

export interface JourneyProps {
    title: string;
    subtitle: string;
    benefits: BenefitItem[];
    ctaPrimary: {
        text: string;
        href: string;
    };
    ctaSecondary: {
        text: string;
        href: string;
    };
}
