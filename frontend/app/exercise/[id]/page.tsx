'use client';

import Detail from "@/components/detail/Detail";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";
import { getExerciseById } from "@/utils/fetchData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { lazy, useEffect, useState } from "react";

const LazyExerciseVideos = lazy(() => import('@/components/detail/ExcerciseVideos'));
const LazySimilarExercises = lazy(() => import('@/components/detail/SimilarExcercises'));

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !exerciseDetail) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">{error || 'Exercise details not available'}</p>
        <Link href="/" className="inline-block mt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-14">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-red-600 hover:underline">
          <ArrowLeft size={18} className="mr-2" /> Back to exercises
        </Link>

        <Detail exerciseDetail={exerciseDetail} />
        <LazyExerciseVideos name={exerciseDetail.name} />
        <LazySimilarExercises id={exerciseDetail.id} />
      </div>
    </div>
  );
};

export default ExerciseDetail;