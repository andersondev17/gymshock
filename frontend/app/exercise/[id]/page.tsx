'use client';

import Detail from "@/components/detail/Detail";
import ExcerciseVideos from "@/components/detail/ExcerciseVideos";
import SimilarExcercises from "@/components/detail/SimilarExcercises";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Usamos useParams para obtener el ID de la ruta
  const params = useParams();
  const id = params?.id;

  useEffect(() => {

    const fetchExerciseData = async () => {
      if (!id) {
        setError('Exercise ID not found');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Usamos la API directamente con fetch
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        // Obtenemos los datos y los guardamos en el estado
        const data = await response.json();
        console.log('Exercise data loaded:', data);
        setExerciseDetail(data);
      } catch (err) {
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
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-red-600 hover:underline">
          <ArrowLeft size={18} className="mr-2" /> Back to exercises
        </Link>

        <Detail exerciseDetail={exerciseDetail} />
          <ExcerciseVideos   />
          <SimilarExcercises />
      </div>
    </div>
  );
};

export default ExerciseDetail;