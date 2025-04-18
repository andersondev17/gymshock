'use client';

import { ExerciseVideosProps, YoutubeVideo } from '@/types/exercise';
import { fetchYoutubeVideos } from '@/utils/fetchData';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ExerciseVideos = ({ name }: ExerciseVideosProps) => {
  const [exerciseVideos, setExerciseVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getExerciseVideos = async () => {
      if (!name) return;

      setLoading(true);
      setError(null);

      try {
        // Obtener videos relacionados con el ejercicio
        const videos = await fetchYoutubeVideos(name);

        if (videos.length > 0) {
          setExerciseVideos(videos);
        } else {
          setError(`No videos found for ${name}`);
        }
      } catch (err) {
        console.error('Error fetching exercise videos:', err);
        setError('Could not load related videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      getExerciseVideos();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-red-600" />
        </div>
      </div>
    );
  }

  if (error || exerciseVideos.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            {error || `No videos found for ${name}. Try searching on YouTube directly.`}
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} exercise`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-red-600 hover:underline"
          >
            Search on YouTube <ExternalLink size={16} className="inline ml-1" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exerciseVideos.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="exercise-video bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-video" style={{ position: 'relative' }}>
              <Image
                src={`${video.thumbnailUrl}?${video.videoId}`}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                placeholder='blur'
                blurDataURL="/assets/images/video-placeholder.png"
                quality={85}
                loading='lazy'
                
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={36} className="text-white" />
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h4>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[70%]">{video.channelName}</p>
                <p className="text-xs text-gray-500">{video.viewCount}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;