'use client';

import { Badge } from "@/components/ui/badge";
import type { ExerciseCardProps } from '@/types/exercise';
import { animate } from 'animejs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const [imageError, setImageError] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const fallbackImage = "/assets/images/exercise-placeholder.png";

    // Animación de entrada
    useEffect(() => {
        if (cardRef.current) {
            animate(cardRef.current, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    }, []);

    return (
        <div ref={cardRef} className="opacity-0">
            <Link
                href={`/exercise/${exercise.id}`}
                className="group block h-full"
            >
                <div className="bg-white  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* Image container */}
                    <div className="relative aspect-square w-full overflow-hidden">
                        {!imageError ? (
                            <>
                                <Image
                                    src={exercise.gifUrl}
                                    alt={exercise.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                                    loading="lazy"
                                    onError={() => setImageError(true)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <Image
                                    src={fallbackImage}
                                    alt={`Image not available for ${exercise.name}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="p-4"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        )}
                        
                        {/* View button that appears on hover */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-red-600 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                View Exercise
                            </div>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100">
                                {exercise.bodyPart}
                            </Badge>
                            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100">
                                {exercise.target}
                            </Badge>
                        </div>

                        <h3 className="text-lg font-bold capitalize line-clamp-2 text-gray-800 group-hover:text-red-600 transition-colors">
                            {exercise.name}
                        </h3>

                        <div className="mt-auto pt-3 flex items-center text-sm text-gray-500 capitalize">
                            <div className="flex items-center gap-1">
                                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.2739 9.86847L16.8325 4.9921C16.5254 4.56548 16.0955 4.24144 15.6021 4.06813C15.1087 3.89482 14.5792 3.88277 14.0787 4.03382L7.41532 6.1465C6.97003 6.27168 6.56595 6.50415 6.23456 6.82187C5.90316 7.13958 5.65438 7.53276 5.51087 7.96835C5.36737 8.40394 5.3334 8.86862 5.41259 9.3218C5.49177 9.77499 5.68162 10.2007 5.96509 10.5559L9.40654 15.4323C9.7136 15.8589 10.1435 16.183 10.6369 16.3563C11.1303 16.5296 11.6598 16.5416 12.1604 16.3906L18.8237 14.2779C19.269 14.1527 19.6731 13.9203 20.0045 13.6025C20.3359 13.2848 20.5847 12.8916 20.7282 12.4561C20.8717 12.0205 20.9057 11.5558 20.8265 11.1026C20.7473 10.6494 20.5574 10.2237 20.2739 9.86847V9.86847Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Equipment:</span>
                            </div>
                            <span className="ml-1 font-medium text-gray-600">{exercise.equipment}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ExerciseCard;