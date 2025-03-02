import { Badge } from "@/components/ui/badge";
import type { ExerciseCardProps } from '@/types/exercise';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const [imageError, setImageError] = useState(false);

    return (
        <Link
            href={`/exercise/${exercise.id}`}
            className="exercise-card group hover:-translate-y-1"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                {!imageError ? (
                    <Image
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none">
                        {exercise.bodyPart}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                        {exercise.target}
                    </Badge>
                </div>
                
                <h3 className="text-lg font-bold capitalize line-clamp-2 group-hover:text-red-600 transition-colors">
                    {exercise.name}
                </h3>
                
                <p className="mt-2 text-sm text-gray-600 capitalize">
                    Equipment: {exercise.equipment}
                </p>
            </div>
        </Link>
    );
};

export default ExerciseCard;