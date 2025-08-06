'use client';

import Detail from "@/components/detail/Detail";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Exercise } from "@/types/exercise";
import { getExerciseById } from "@/utils/fetchData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";

const LazyExerciseVideos = lazy(() => import('@/components/detail/ExcerciseVideos')
  .then(module => ({ default: module.default })));
  
const LazySimilarExercises = lazy(() => import('@/components/detail/SimilarExcercises')
  .then(module => ({ default: module.default })));

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchExerciseData = async () => {
      if (!id) {
        setError('Exercise ID not found');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getExerciseById(id);
        console.log('Exercise data loaded:', data);
        setExerciseDetail(data);
      } catch (err) {
        setError('Failed to load exercise details');
        console.error('Error fetching exercise data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExerciseData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gymshock-dark-900 relative">
        <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] bg-cover bg-center opacity-40 pointer-events-none" />
        <div className="relative flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gymshock-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !exerciseDetail) {
    return (
      <div className="min-h-screen bg-gymshock-dark-900 relative">
        <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] bg-cover bg-center opacity-40 pointer-events-none" />
        <div className="relative text-center py-8">
          <p className="text-lg text-white">{error || 'Exercise details not available'}</p>
          <Link href="/exercises" className="inline-block mt-4">
            <Button variant="outline" className="flex items-center gap-2 font-bold text-white border-gray-600 hover:bg-white/10">
              <ArrowLeft size={16} />
              Back to exercises
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gymshock-dark-900 relative py-14">
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] bg-cover bg-center opacity-40 pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4">
        <Link href="/exercises" className="inline-flex items-center mb-6 text-gymshock-primary-500 hover:text-gymshock-primary-400 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to exercises
        </Link>

        <Suspense fallback={<Skeleton className="h-[400px] w-full bg-gymshock-dark-700/20" />}>
          <Detail exerciseDetail={exerciseDetail} />
          <LazyExerciseVideos name={exerciseDetail.name} />
          <LazySimilarExercises id={exerciseDetail.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExerciseDetail;