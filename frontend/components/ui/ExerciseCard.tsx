'use client';

import { Badge } from "@/components/ui/badge";
import type { ExerciseCardProps } from '@/types/exercise';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    const [imageError, setImageError] = useState(false);
    const fallbackImage = "/assets/images/exercise-placeholder.png";

    return (
        <div className="w-full h-full">
            <Link
                href={`/exercise/${exercise.id}`}
                className="group block h-full w-full"
            >
                <div className="bg-gymshock-dark-800/40 backdrop-blur-xl overflow-hidden shadow-gymshock-elevated hover:shadow-gymshock-glow transition-all duration-700 h-full flex flex-col rounded-xl border border-gymshock-dark-700/30 hover:border-gymshock-primary-500/50 hover:scale-[1.02] hover:bg-gymshock-dark-800/60">
                    {/* Image container */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
                        {!imageError ? (
                            <>
                                <Image
                                    src={exercise.gifUrl}
                                    alt={exercise.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                                    loading="lazy"
                                    onError={() => setImageError(true)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gymshock-dark-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gymshock-dark-700/50">
                                <Image
                                    src={fallbackImage}
                                    alt={`Image not available for ${exercise.name}`}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="p-4 opacity-60"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        )}
                        
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-white shadow-gymshock-glow transform group-hover:scale-110 transition-transform duration-300 border border-gymshock-primary-400/30">
                                View Exercise
                            </div>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-gymshock-primary-600/20 text-gymshock-primary-300 hover:bg-gymshock-primary-600/30 border border-gymshock-primary-600/30 font-medium backdrop-blur-sm">
                                {exercise.bodyPart}
                            </Badge>
                            <Badge className="bg-gymshock-energy-600/20 text-gymshock-energy-300 hover:bg-gymshock-energy-600/30 border border-gymshock-energy-600/30 font-medium backdrop-blur-sm">
                                {exercise.target}
                            </Badge>
                        </div>

                        <h3 className="text-lg font-bold capitalize line-clamp-2 text-white group-hover:text-gymshock-primary-300 transition-colors duration-300 mb-3">
                            {exercise.name}
                        </h3>

                        <div className="mt-auto pt-2 flex items-center text-sm text-gymshock-dark-300 capitalize">
                            <div className="flex items-center gap-1.5">
                                <svg className="h-4 w-4 text-gymshock-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.2739 9.86847L16.8325 4.9921C16.5254 4.56548 16.0955 4.24144 15.6021 4.06813C15.1087 3.89482 14.5792 3.88277 14.0787 4.03382L7.41532 6.1465C6.97003 6.27168 6.56595 6.50415 6.23456 6.82187C5.90316 7.13958 5.65438 7.53276 5.51087 7.96835C5.36737 8.40394 5.3334 8.86862 5.41259 9.3218C5.49177 9.77499 5.68162 10.2007 5.96509 10.5559L9.40654 15.4323C9.7136 15.8589 10.1435 16.183 10.6369 16.3563C11.1303 16.5296 11.6598 16.5416 12.1604 16.3906L18.8237 14.2779C19.269 14.1527 19.6731 13.9203 20.0045 13.6025C20.3359 13.2848 20.5847 12.8916 20.7282 12.4561C20.8717 12.0205 20.9057 11.5558 20.8265 11.1026C20.7473 10.6494 20.5574 10.2237 20.2739 9.86847V9.86847Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Equipment:</span>
                            </div>
                            <span className="ml-1.5 font-medium text-gymshock-dark-200">{exercise.equipment}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ExerciseCard;